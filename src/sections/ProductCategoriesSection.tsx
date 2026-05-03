import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, CheckCircle2, FlaskConical, Package, MessageCircle, Wand2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import OilSelectorWizard from '@/components/OilSelectorWizard';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  title: string;
  description: string;
  image: string;
  fullDescription: string;
  specs: { label: string; value: string }[];
  grades: string[];
  applications: string[];
  containers: string[];
}

const products: Product[] = [
  {
    title: 'Automotive Oils',
    description: 'Cars, SUVs, light trucks.',
    image: '/category_automotive.jpg',
    fullDescription:
      'Premium engine oils formulated for petrol and modern turbocharged engines. Provides outstanding wear protection, thermal stability and fuel economy for passenger vehicles across all driving conditions in Nigeria\'s climate.',
    specs: [
      { label: 'API Classification', value: 'SP / SN Plus' },
      { label: 'ACEA Standard', value: 'A3/B4' },
      { label: 'SAE Grades', value: '5W-30 · 10W-40 · 15W-40 · 20W-50' },
    ],
    grades: ['5W-30', '10W-40', '15W-40', '20W-50'],
    applications: [
      'Petrol passenger cars & SUVs',
      'Turbocharged & direct injection engines',
      'Hybrid vehicles',
      'Light commercial vehicles',
    ],
    containers: ['1 Litre', '4 Litre', '5 Litre', '20 Litre', '208 Litre drum'],
  },
  {
    title: 'Heavy-Duty Diesel',
    description: 'Trucks, buses, generators.',
    image: '/category_diesel.jpg',
    fullDescription:
      'Engineered for the demands of high-load diesel engines operating in Nigeria\'s transport, logistics and power generation sectors. Delivers extended drain intervals and robust protection under extreme conditions.',
    specs: [
      { label: 'API Classification', value: 'CK-4 / CJ-4' },
      { label: 'ACEA Standard', value: 'E9' },
      { label: 'SAE Grades', value: '10W-40 · 15W-40 · SAE 40' },
    ],
    grades: ['10W-40', '15W-40', 'SAE 40'],
    applications: [
      'Heavy-duty trucks & articulated lorries',
      'Intercity coaches & mass transit buses',
      'Industrial & standby generators',
      'Mining and construction diesel engines',
    ],
    containers: ['4 Litre', '5 Litre', '20 Litre', '208 Litre drum'],
  },
  {
    title: 'Hydraulic Fluids',
    description: 'Construction, agriculture, mining.',
    image: '/category_hydraulic.jpg',
    fullDescription:
      'High-performance hydraulic fluids providing excellent anti-wear protection, oxidation resistance and water separation for hydraulic systems operating under high pressure and variable temperatures.',
    specs: [
      { label: 'ISO Grade', value: 'HLP 32 · HLP 46 · HLP 68' },
      { label: 'Standard', value: 'DIN 51524 Part 2' },
      { label: 'Viscosity Index', value: '≥ 100' },
    ],
    grades: ['ISO 32', 'ISO 46', 'ISO 68'],
    applications: [
      'Excavators & bulldozers',
      'Agricultural tractors & harvesters',
      'Mining equipment & drilling rigs',
      'Industrial hydraulic presses',
    ],
    containers: ['5 Litre', '20 Litre', '208 Litre drum'],
  },
  {
    title: 'Industrial Greases',
    description: 'Bearings, chassis, open gears.',
    image: '/category_grease.jpg',
    fullDescription:
      'Multi-purpose lithium-complex greases delivering excellent load-carrying capacity, water resistance and high-temperature performance for bearings and general lubrication in industrial and automotive applications.',
    specs: [
      { label: 'NLGI Grade', value: '0 · 1 · 2 · 3' },
      { label: 'Standard', value: 'DIN 51825 KP2K' },
      { label: 'Base Oil', value: 'Mineral / Synthetic' },
    ],
    grades: ['NLGI 0', 'NLGI 1', 'NLGI 2', 'NLGI 3'],
    applications: [
      'Rolling & plain bearings',
      'Chassis & suspension joints',
      'Open gear drives',
      'Wheel bearings & fifth wheels',
    ],
    containers: ['400 g cartridge', '1 kg tub', '5 kg tub', '18 kg pail'],
  },
  {
    title: 'Gear & Transmission',
    description: 'Differentials, gearboxes, axles.',
    image: '/category_gear.jpg',
    fullDescription:
      'Extreme-pressure gear oils formulated to protect differentials, manual gearboxes and axles under the heaviest loads, reducing wear on gear teeth and synchronisers for extended component life.',
    specs: [
      { label: 'API Classification', value: 'GL-4 / GL-5' },
      { label: 'Military Standard', value: 'MIL-L-2105D' },
      { label: 'SAE Grades', value: '75W-90 · 80W-90 · 85W-140 · SAE 90' },
    ],
    grades: ['75W-90', '80W-90', '85W-140', 'SAE 90'],
    applications: [
      'Manual transmissions & synchromesh gearboxes',
      'Rear & front axle differentials',
      'Transfer cases & PTOs',
      'Industrial worm and spur gears',
    ],
    containers: ['1 Litre', '4 Litre', '20 Litre', '208 Litre drum'],
  },
  {
    title: 'Coolants & Chemicals',
    description: 'Heat transfer, cleaning, protection.',
    image: '/category_coolant.jpg',
    fullDescription:
      'Long-life engine coolants and industrial chemicals providing freeze, boil-over and corrosion protection for all metals in modern cooling systems. Ready-to-use and concentrate options available.',
    specs: [
      { label: 'Type', value: 'OAT / HOAT' },
      { label: 'Standard', value: 'ASTM D3306 / BS 6580' },
      { label: 'Temperature Range', value: '-37 °C to +135 °C' },
    ],
    grades: ['Ready-to-use (50/50)', 'Concentrate'],
    applications: [
      'Petrol & diesel engine cooling systems',
      'Aluminium & cast iron engines',
      'Industrial heat exchangers',
      'Radiator flushing & treatment',
    ],
    containers: ['1 Litre', '4 Litre', '20 Litre', '208 Litre drum'],
  },
];

function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <Dialog open={!!product} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent className="bg-navy border border-white/10 text-white max-w-2xl w-full p-0 overflow-hidden rounded-2xl gap-0">
        {product && (
          <>
            {/* Cover image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
              <h2 className="absolute bottom-4 left-6 font-display font-bold text-white text-2xl">
                {product.title}
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">

              {/* Description */}
              <p className="text-white/70 leading-relaxed">{product.fullDescription}</p>

              {/* Spec badges */}
              <div>
                <h4 className="font-mono-label text-gold mb-3 flex items-center gap-2">
                  <FlaskConical size={13} /> Specifications
                </h4>
                <div className="space-y-2">
                  {product.specs.map(spec => (
                    <div key={spec.label} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2.5">
                      <span className="text-white/40 text-sm">{spec.label}</span>
                      <span className="text-white font-medium text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h4 className="font-mono-label text-gold mb-3 flex items-center gap-2">
                  <CheckCircle2 size={13} /> Applications
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.applications.map(app => (
                    <li key={app} className="flex items-start gap-2 text-white/70 text-sm">
                      <span className="text-gold mt-0.5">·</span> {app}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Container sizes */}
              <div>
                <h4 className="font-mono-label text-gold mb-3 flex items-center gap-2">
                  <Package size={13} /> Available Sizes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.containers.map(size => (
                    <span
                      key={size}
                      className="font-mono-label text-xs border border-white/10 text-white/60 rounded-full px-3 py-1"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
              <Button
                onClick={scrollToContact}
                className="flex-1 bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full gap-2"
              >
                <MessageCircle size={16} /> Request a Quote
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-full"
              >
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

const ProductCategoriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { x: '-6vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%', end: 'top 55%', scrub: true } }
      );

      cardsRef.current.forEach((card) => {
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
          <Button
            onClick={() => setWizardOpen(true)}
            className="flex-shrink-0 bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full px-5 gap-2"
          >
            <Wand2 size={15} /> Find the right oil
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.title}
              ref={el => { cardsRef.current[index] = el; }}
              onClick={() => setSelected(product)}
              className="group relative bg-navy-light rounded-xl overflow-hidden cursor-pointer hover-lift"
            >
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

                {/* Spec pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.specs.slice(0, 2).map(spec => (
                    <span
                      key={spec.label}
                      className="font-mono-label text-[10px] bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5"
                    >
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
          ))}
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
      <OilSelectorWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </section>
  );
};

export default ProductCategoriesSection;
