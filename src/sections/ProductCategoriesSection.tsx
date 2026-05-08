import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, X, CheckCircle2, FlaskConical, Package,
  MessageCircle, Wand2, GitCompare, PlusCircle, MinusCircle, FileDown,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import OilSelectorWizard from '@/components/OilSelectorWizard';
import ProductCompareModal from '@/components/ProductCompareModal';
import { products } from '@/data/products';
import type { Product } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

// ── Product Detail Modal ──────────────────────────────────────
function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const scrollToContact = () => {
    onClose();
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  return (
    <Dialog open={!!product} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent className="bg-navy border border-white/10 text-white max-w-2xl w-full p-0 overflow-hidden rounded-2xl gap-0">
        {product && (
          <>
            <div className="relative h-48 overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
              <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center transition-colors">
                <X size={16} className="text-white" />
              </button>
              <h2 className="absolute bottom-4 left-6 font-display font-bold text-white text-2xl">{product.title}</h2>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              <p className="text-white/70 leading-relaxed">{product.fullDescription}</p>

              <div>
                <h4 className="font-mono-label text-gold mb-3 flex items-center gap-2"><FlaskConical size={13} /> Specifications</h4>
                <div className="space-y-2">
                  {product.specs.map(spec => (
                    <div key={spec.label} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2.5">
                      <span className="text-white/40 text-sm">{spec.label}</span>
                      <span className="text-white font-medium text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono-label text-gold mb-3 flex items-center gap-2"><CheckCircle2 size={13} /> Applications</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.applications.map(app => (
                    <li key={app} className="flex items-start gap-2 text-white/70 text-sm">
                      <span className="text-gold mt-0.5">·</span> {app}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono-label text-gold mb-3 flex items-center gap-2"><Package size={13} /> Available Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {product.containers.map(size => (
                    <span key={size} className="font-mono-label text-xs border border-white/10 text-white/60 rounded-full px-3 py-1">{size}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3 flex-wrap">
              <Button onClick={scrollToContact} className="flex-1 bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full gap-2">
                <MessageCircle size={16} /> Request a Quote
              </Button>
              {product.tds && (
                <a href={product.tds} target="_blank" rel="noopener noreferrer" download>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full gap-2">
                    <FileDown size={16} /> Download TDS
                  </Button>
                </a>
              )}
              <Button onClick={onClose} variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full">Close</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Section ───────────────────────────────────────────────────
const ProductCategoriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selected, setSelected] = useState<Product | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const toggleCompare = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareList(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : prev.length < 3 ? [...prev, title] : prev
    );
  };

  const compareProducts = products.filter(p => compareList.includes(p.title));

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { x: '-6vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%', end: 'top 55%', scrub: true } }
      );
      cardsRef.current.forEach(card => {
        if (!card) return;
        gsap.fromTo(card,
          { y: '10vh', opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 45%', scrub: true } }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="relative z-30 bg-navy py-20 lg:py-32">
      <div className="px-6 lg:px-[6vw]">

        {/* Header */}
        <div ref={headerRef} className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-white text-[clamp(32px,3.6vw,56px)] mb-4">
              Products by Application
            </h2>
            <p className="text-cool-gray text-base lg:text-lg max-w-xl">
              Choose the right fluid for your equipment and environment.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {compareList.length >= 2 && (
              <Button
                onClick={() => setCompareOpen(true)}
                variant="outline"
                className="border-gold/40 text-gold hover:bg-gold/10 rounded-full px-4 gap-2 text-sm"
              >
                <GitCompare size={14} /> Compare ({compareList.length})
              </Button>
            )}
            <Button
              onClick={() => setWizardOpen(true)}
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full px-5 gap-2"
            >
              <Wand2 size={15} /> Find the right oil
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => {
            const inCompare = compareList.includes(product.title);
            return (
              <div
                key={product.title}
                ref={el => { cardsRef.current[index] = el; }}
                onClick={() => setSelected(product)}
                className="group relative bg-navy-light rounded-xl overflow-hidden cursor-pointer hover-lift"
              >
                {/* Compare toggle — top-right corner */}
                <button
                  onClick={e => toggleCompare(product.title, e)}
                  title={inCompare ? 'Remove from compare' : compareList.length >= 3 ? 'Max 3 products' : 'Add to compare'}
                  className={`absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-200 ${
                    inCompare
                      ? 'bg-gold text-navy-dark'
                      : 'bg-black/40 text-white/60 opacity-0 group-hover:opacity-100 hover:bg-white/20'
                  }`}
                >
                  {inCompare
                    ? <><MinusCircle size={11} /> Added</>
                    : <><PlusCircle size={11} /> Compare</>
                  }
                </button>

                {/* Image */}
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-semibold text-white text-xl mb-2 group-hover:text-gold transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-cool-gray text-sm mb-4">{product.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.specs.slice(0, 2).map(spec => (
                      <span key={spec.label} className="font-mono-label text-[10px] bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5">
                        {spec.value.split(' · ')[0]}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-gold text-sm font-medium">
                    <span>Learn more</span>
                    <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating compare bar */}
      {compareList.length >= 2 && !compareOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[990] flex items-center gap-3 bg-navy border border-gold/30 rounded-full px-5 py-3 shadow-2xl">
          <span className="text-white/70 text-sm">{compareList.length} products selected</span>
          <Button onClick={() => setCompareOpen(true)} className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full h-8 px-4 text-xs gap-1.5">
            <GitCompare size={13} /> Compare
          </Button>
          <button onClick={() => setCompareList([])} className="text-white/30 hover:text-white transition-colors text-xs">
            Clear
          </button>
        </div>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
      <OilSelectorWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
      {compareOpen && (
        <ProductCompareModal
          products={compareProducts}
          onClose={() => setCompareOpen(false)}
          onRequestQuote={() => {
            setCompareOpen(false);
            setCompareList([]);
            setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
          }}
        />
      )}
    </section>
  );
};

export default ProductCategoriesSection;
