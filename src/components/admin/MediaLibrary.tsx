import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, Images, Loader2 } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

interface StorageFile {
  name: string;
  url: string;
}

export default function MediaLibrary({ open, onClose, onSelect }: Props) {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);

    const fetchFiles = async () => {
      // Fetch from both folders used by the editor
      const [coversRes, inlineRes] = await Promise.all([
        supabase.storage.from('lubcon-blog-images').list('covers', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } }),
        supabase.storage.from('lubcon-blog-images').list('inline', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } }),
      ]);

      const allFiles: StorageFile[] = [];

      for (const item of coversRes.data ?? []) {
        if (!item.name.startsWith('.')) {
          const { data } = supabase.storage.from('lubcon-blog-images').getPublicUrl(`covers/${item.name}`);
          allFiles.push({ name: item.name, url: data.publicUrl });
        }
      }
      for (const item of inlineRes.data ?? []) {
        if (!item.name.startsWith('.')) {
          const { data } = supabase.storage.from('lubcon-blog-images').getPublicUrl(`inline/${item.name}`);
          allFiles.push({ name: item.name, url: data.publicUrl });
        }
      }

      if ((coversRes.error || inlineRes.error)) {
        setError('Could not load images from storage.');
      } else {
        setFiles(allFiles);
      }
      setLoading(false);
    };

    fetchFiles();
  }, [open]);

  const handleSelect = (url: string) => {
    onSelect(url);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={o => { if (!o) onClose(); }}>
      <DialogContent className="bg-navy border border-white/10 text-white max-w-3xl w-full p-0 overflow-hidden rounded-2xl gap-0">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Images size={16} className="text-gold" />
            <span className="font-mono-label text-gold">Media Library</span>
            {files.length > 0 && (
              <span className="text-white/30 text-xs ml-1">({files.length} images)</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
          >
            <X size={14} className="text-white/60" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center h-40 gap-2 text-white/40">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Loading images…</span>
            </div>
          )}

          {error && !loading && (
            <p className="text-red-400 text-sm text-center py-10">{error}</p>
          )}

          {!loading && !error && files.length === 0 && (
            <p className="text-white/30 text-sm text-center py-10">
              No images uploaded yet. Upload a cover image or inline image on any post first.
            </p>
          )}

          {!loading && files.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {files.map(file => (
                <button
                  key={file.url}
                  onClick={() => handleSelect(file.url)}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-gold/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-200 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-gold/90 px-2 py-0.5 rounded">
                      Use this
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
}
