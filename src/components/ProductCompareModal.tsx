import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, Check } from 'lucide-react';
import type { Product } from '@/data/products';

interface Props {
  products: Product[];
  onClose: () => void;
  onRequestQuote: () => void;
}

const rows = [
  {
    label: 'Classification',
    render: (p: Product) => p.specs[0]?.value ?? '—',
  },
  {
    label: 'Standard',
    render: (p: Product) => p.specs[1]?.value ?? '—',
  },
  {
    label: 'Grades Available',
    render: (p: Product) => (
      <div className="flex flex-wrap gap-1">
        {p.grades.map(g => (
          <span key={g} className="font-mono-label text-[10px] bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5">
            {g}
          </span>
        ))}
      </div>
    ),
  },
  {
    label: 'Applications',
    render: (p: Product) => (
      <ul className="space-y-1">
        {p.applications.map(a => (
          <li key={a} className="flex items-start gap-1.5 text-white/60 text-xs">
            <Check size={11} className="text-gold mt-0.5 flex-shrink-0" />{a}
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: 'Container Sizes',
    render: (p: Product) => (
      <div className="flex flex-wrap gap-1">
        {p.containers.map(c => (
          <span key={c} className="font-mono-label text-[10px] border border-white/10 text-white/40 rounded-full px-2 py-0.5">
            {c}
          </span>
        ))}
      </div>
    ),
  },
];

export default function ProductCompareModal({ products, onClose, onRequestQuote }: Props) {
  const cols = products.length;

  return (
    <Dialog open={cols >= 2} onOpenChange={o => { if (!o) onClose(); }}>
      <DialogContent className="bg-navy border border-white/10 text-white p-0 rounded-2xl overflow-hidden gap-0 max-w-5xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="font-display font-bold text-white text-lg">Product Comparison</h2>
            <p className="text-white/30 text-xs mt-0.5">Comparing {cols} products</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
          <table className="w-full min-w-[600px]">
            {/* Product headers */}
            <thead className="sticky top-0 z-10 bg-navy">
              <tr>
                <th className="w-28 min-w-[112px] p-4 text-left border-b border-white/10 border-r border-white/5">
                  <span className="font-mono-label text-white/30 text-xs">Feature</span>
                </th>
                {products.map(p => (
                  <th key={p.title} className="p-4 border-b border-white/10 border-r border-white/5 last:border-r-0">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-display font-semibold text-white text-sm text-center leading-tight">
                        {p.title}
                      </span>
                      <span className="text-white/30 text-xs">{p.description}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                  <td className="p-4 border-r border-white/5 align-top">
                    <span className="font-mono-label text-white/40 text-xs">{row.label}</span>
                  </td>
                  {products.map(p => (
                    <td key={p.title} className="p-4 border-r border-white/5 last:border-r-0 align-top text-white/80 text-sm">
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between gap-3">
          <p className="text-white/30 text-xs hidden sm:block">
            Need help choosing? Our team will recommend the best fit for your equipment.
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <Button onClick={onClose} variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full text-sm">
              Close
            </Button>
            <Button
              onClick={onRequestQuote}
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full gap-2 text-sm"
            >
              <MessageCircle size={15} /> Request a Quote
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
