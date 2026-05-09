import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { BLOG_CATEGORIES } from '@/types/blog';
import { toast } from 'sonner';
import { ArrowLeft, Upload, X, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RichEditor from '@/components/editor/RichEditor';
import MediaLibrary from '@/components/admin/MediaLibrary';

const generateSlug = (title: string) =>
  title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function PostEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('General');
  const [tagsInput, setTagsInput] = useState('');
  const [author, setAuthor] = useState('LUBCON Africa Team');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mediaLibOpen, setMediaLibOpen] = useState(false);
  const [mediaLibTarget, setMediaLibTarget] = useState<'cover' | 'editor'>('cover');
  const [editorImageResolver, setEditorImageResolver] = useState<((url: string) => void) | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (!sessionData.session) navigate('/admin');
    });
    if (isEditing && id) loadPost(id);
  }, [id, isEditing, navigate]);

  const loadPost = async (postId: string) => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
    if (error || !data) { toast.error('Post not found'); navigate('/admin/posts'); return; }
    setTitle(data.title);
    setSlug(data.slug);
    setSlugTouched(true);
    setExcerpt(data.excerpt || '');
    setCategory(data.category || 'General');
    setTagsInput((data.tags || []).join(', '));
    setAuthor(data.author || 'LUBCON Africa Team');
    setContent(data.content || '');
    setCoverImage(data.cover_image || null);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugTouched) setSlug(generateSlug(val));
  };

  const uploadCoverImage = async (file: File) => {
    setCoverUploading(true);
    const ext = file.name.split('.').pop();
    const path = `covers/${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from('lubcon-blog-images').upload(path, file, { contentType: file.type, upsert: true });
    setCoverUploading(false);
    if (error) {
      toast.error(`Upload failed: ${error.message}`);
      console.error('Cover upload error:', error);
      return;
    }
    const { data: urlData } = supabase.storage.from('lubcon-blog-images').getPublicUrl(data.path);
    setCoverImage(urlData.publicUrl);
  };

  const handleCoverDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadCoverImage(file);
  };

  const handleSave = async (publish: boolean) => {
    if (!title.trim()) { toast.error('Title is required'); return; }
    if (!slug.trim()) { toast.error('Slug is required'); return; }
    setSaving(true);

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const payload = { title, slug, excerpt, category, tags, author, content, cover_image: coverImage, published: publish };

    let error;
    if (isEditing && id) {
      ({ error } = await supabase.from('posts').update(payload).eq('id', id));
    } else {
      ({ error } = await supabase.from('posts').insert([payload]));
    }
    setSaving(false);

    if (error) {
      toast.error(error.message.includes('unique') ? 'A post with this slug already exists.' : 'Save failed. Please try again.');
    } else {
      toast.success(publish ? 'Post published!' : 'Draft saved.');
      navigate('/admin/posts');
    }
  };

  const handleEditorImageUpload = useCallback(async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const path = `inline/${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from('lubcon-blog-images').upload(path, file, { contentType: file.type, upsert: true });
    if (error) throw new Error('Image upload failed');
    const { data: urlData } = supabase.storage.from('lubcon-blog-images').getPublicUrl(data.path);
    return urlData.publicUrl;
  }, []);

  const handleMediaLibSelect = (url: string) => {
    if (mediaLibTarget === 'cover') {
      setCoverImage(url);
    } else if (editorImageResolver) {
      editorImageResolver(url);
      setEditorImageResolver(null);
    }
    setMediaLibOpen(false);
  };

  const handleBrowseForEditor = useCallback((): Promise<string> => {
    return new Promise(resolve => {
      setEditorImageResolver(() => resolve);
      setMediaLibTarget('editor');
      setMediaLibOpen(true);
    });
  }, []);

  return (
    <div className="min-h-screen bg-navy">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-navy/95 backdrop-blur sticky top-0 z-50">
        <div className="px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/posts" className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
              <ArrowLeft size={15} /> All Posts
            </Link>
            <span className="text-white/20">/</span>
            <span className="font-mono-label text-white/50">{isEditing ? 'Edit Post' : 'New Post'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleSave(false)}
              disabled={saving}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-full text-sm h-9 px-4"
            >
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full text-sm h-9 px-4"
            >
              {saving ? 'Saving…' : 'Publish'}
            </Button>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-10 py-10 max-w-4xl mx-auto space-y-8">

        {/* Title */}
        <div>
          <label className="font-mono-label text-white/40 block mb-2">Post Title *</label>
          <Input
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="e.g. Choosing the Right Engine Oil for Your Fleet"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-gold text-lg h-12"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="font-mono-label text-white/40 block mb-2">URL Slug *</label>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-sm">/blog/</span>
            <Input
              value={slug}
              onChange={e => { setSlug(e.target.value); setSlugTouched(true); }}
              placeholder="auto-generated-from-title"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-gold font-mono text-sm"
            />
          </div>
        </div>

        {/* Category + Author row */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="font-mono-label text-white/40 block mb-2">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full h-10 rounded-md border border-white/10 bg-white/5 text-white text-sm px-3 focus:outline-none focus:border-gold"
            >
              {BLOG_CATEGORIES.map(c => <option key={c} value={c} className="bg-navy">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="font-mono-label text-white/40 block mb-2">Author</label>
            <Input
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="LUBCON Africa Team"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-gold"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="font-mono-label text-white/40 block mb-2">Excerpt <span className="text-white/20">(shown on blog cards)</span></label>
          <Textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="Short summary of the post — 1–2 sentences…"
            rows={3}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-gold resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="font-mono-label text-white/40 block mb-2">Tags <span className="text-white/20">(comma separated)</span></label>
          <Input
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            placeholder="e.g. SAE 40, diesel, fleet, engine oil"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-gold"
          />
        </div>

        {/* Cover Image */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-mono-label text-white/40">Cover Image</label>
            <button
              type="button"
              onClick={() => { setMediaLibTarget('cover'); setMediaLibOpen(true); }}
              className="flex items-center gap-1.5 text-xs text-gold/70 hover:text-gold transition-colors"
            >
              <Images size={13} /> Browse library
            </button>
          </div>
          {coverImage ? (
            <div className="relative rounded-xl overflow-hidden h-48 bg-white/5">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              <button
                onClick={() => setCoverImage(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-gold/40 hover:bg-gold/5 transition-colors">
              {coverUploading ? (
                <span className="text-white/40 text-sm">Uploading…</span>
              ) : (
                <>
                  <Upload size={20} className="text-white/30 mb-2" />
                  <span className="text-white/30 text-sm">Click to upload cover image</span>
                  <span className="text-white/20 text-xs mt-1">JPG, PNG, WebP — or browse library above</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleCoverDrop} className="hidden" />
            </label>
          )}
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="font-mono-label text-white/40 block mb-2">Content</label>
          <RichEditor
            content={content}
            onChange={setContent}
            onImageUpload={handleEditorImageUpload}
            onBrowseLibrary={handleBrowseForEditor}
          />
        </div>

        {/* Bottom action bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <Button
            onClick={() => handleSave(false)}
            disabled={saving}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full"
          >
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full"
          >
            {saving ? 'Saving…' : 'Publish Post'}
          </Button>
        </div>
      </main>

      <MediaLibrary
        open={mediaLibOpen}
        onClose={() => setMediaLibOpen(false)}
        onSelect={handleMediaLibSelect}
      />
    </div>
  );
}
