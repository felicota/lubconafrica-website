import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, MessageCircle, FlaskConical } from 'lucide-react';

// ── Step definitions ──────────────────────────────────────────

const STEP1 = [
  { id: 'engine_petrol',  label: 'Petrol Engine',       icon: '⛽', hint: 'Cars, SUVs, light trucks' },
  { id: 'engine_diesel',  label: 'Diesel Engine',        icon: '🚛', hint: 'Trucks, buses, generators' },
  { id: 'hydraulic',      label: 'Hydraulic System',     icon: '🏗️', hint: 'Construction, farm, mining' },
  { id: 'gearbox',        label: 'Gearbox / Differential', icon: '⚙️', hint: 'Manual box, axles, transfer' },
  { id: 'bearing',        label: 'Bearings & Joints',    icon: '🔩', hint: 'Chassis, open gears, hubs' },
  { id: 'cooling',        label: 'Cooling System',       icon: '🌡️', hint: 'Radiator, heat exchangers' },
];

const STEP2: Record<string, { id: string; label: string; hint: string }[]> = {
  engine_petrol: [
    { id: 'car',        label: 'Passenger Car / SUV',       hint: 'Daily driver, family vehicle' },
    { id: 'light_comm', label: 'Light Commercial Vehicle',  hint: 'Pickup, minibus, small van' },
    { id: 'high_perf',  label: 'High-Performance / Sport',  hint: 'Turbocharged, modified engine' },
  ],
  engine_diesel: [
    { id: 'truck',      label: 'Truck / Articulated Lorry', hint: 'Long-haul, intercity transport' },
    { id: 'bus',        label: 'Bus / Mass Transit',         hint: 'City bus, intercity coach' },
    { id: 'generator',  label: 'Generator / Power Unit',     hint: 'Standby or prime power' },
    { id: 'agri',       label: 'Agricultural Tractor',       hint: 'Farm tractor, combine' },
  ],
  hydraulic: [
    { id: 'agri_hyd',   label: 'Agricultural Equipment',    hint: 'Tractor hydraulics, harvesters' },
    { id: 'construction', label: 'Construction Equipment',  hint: 'Excavator, bulldozer, crane' },
    { id: 'mining',     label: 'Mining Equipment',           hint: 'Drill rigs, loaders' },
    { id: 'industrial', label: 'Industrial Machinery',       hint: 'Presses, injection moulding' },
  ],
  gearbox: [
    { id: 'light_gear', label: 'Passenger Car / Light Van',  hint: 'Manual gearbox, FWD axle' },
    { id: 'heavy_gear', label: 'Heavy Vehicle / Truck',       hint: 'Multi-speed gearbox, rear axle' },
    { id: 'ind_gear',   label: 'Industrial Gear Drive',       hint: 'Worm gear, spur gear, reducer' },
  ],
  bearing: [
    { id: 'auto_bear',  label: 'Automotive (Wheel / Chassis)', hint: 'Wheel bearings, ball joints' },
    { id: 'ind_bear',   label: 'Industrial Bearings',           hint: 'Rolling element, plain bearings' },
    { id: 'heavy_bear', label: 'Heavy-Load / Open Gears',       hint: 'Mining, quarry, open gear drives' },
  ],
  cooling: [
    { id: 'petrol_cool', label: 'Petrol Engine Cooling',    hint: 'Cars, SUVs, light vehicles' },
    { id: 'diesel_cool', label: 'Diesel Engine Cooling',    hint: 'Trucks, buses, generators' },
    { id: 'ind_cool',    label: 'Industrial Heat Exchanger', hint: 'Process cooling, factory plant' },
  ],
};

const STEP3 = [
  { id: 'normal',   label: 'Normal Use',              hint: 'Moderate load, regular maintenance' },
  { id: 'heavy',    label: 'Heavy Load / High Stress', hint: 'Maximum payload, uphill, towing' },
  { id: 'extreme',  label: 'Extreme Heat / Dusty',     hint: 'Nigerian summer, mining, desert roads' },
];

// ── Recommendation engine ─────────────────────────────────────

interface Recommendation {
  product: string;
  grade: string;
  classification: string;
  reason: string;
  image: string;
}

function getRecommendation(s1: string, s2: string, s3: string): Recommendation {
  // Petrol engine
  if (s1 === 'engine_petrol') {
    if (s2 === 'high_perf')
      return { product: 'VMPAUTO Modern', grade: '0W-20 / 5W-30', classification: 'API SP · ILSAC GF-6A · QuadroSynthetic', reason: "VMPAUTO's flagship QuadroSynthetic (PAO + VHVI + ESTER + AN) with 300 ppm Moly — viscosity index of 200 vs. the industry average of 170. Built for turbocharged, direct-injection and high-performance petrol engines demanding the very best protection from cold start to redline. Available through Lubcon Africa.", image: '/lubcon-vmpauto_product_lineup.webp' };
    if (s3 === 'heavy')
      return { product: 'Automotive Oils', grade: '5W-30 / 10W-40', classification: 'API SP · ACEA A3/B4', reason: 'Low-viscosity full-synthetic blend for turbocharged petrol engines under heavy load — maximum wear protection at high RPM with excellent thermal stability.', image: '/lubcon_nano_automative_products_img.webp' };
    if (s3 === 'extreme')
      return { product: 'Automotive Oils', grade: '20W-50', classification: 'API SN Plus', reason: 'Higher viscosity grade maintains oil film integrity in extreme heat and dusty Nigerian conditions — ideal for older or high-mileage engines.', image: '/lubcon_nano_automative_products_img.webp' };
    return { product: 'Automotive Oils', grade: '10W-40 / 15W-40', classification: 'API SN Plus · ACEA A3/B4', reason: "All-round grade for petrol passenger cars and light commercials under normal driving conditions in Nigeria's climate.", image: '/lubcon_nano_automative_products_img.webp' };
  }

  // Diesel engine
  if (s1 === 'engine_diesel') {
    if ((s2 === 'truck' || s2 === 'bus') && (s3 === 'heavy' || s3 === 'extreme'))
      return { product: 'VMPAUTO Diesel', grade: '10W-40', classification: 'API CI-4/SL · ACEA E4/E7', reason: "VMPAUTO's synthetic VHVI+AN formulation extends oil life by 30% over semi-synthetics. Alkylated naphthalenes prevent deposit and sludge formation — proven on long Nigerian haulage routes under maximum payload and heat. Available through Lubcon Africa.", image: '/lubcon-vmpauto_product_lineup.webp' };
    if (s2 === 'generator')
      return { product: 'Heavy-Duty Diesel', grade: 'SAE 40', classification: 'API CK-4', reason: 'Monograde SAE 40 is the standard choice for stationary diesel generators — excellent thermal stability and oxidation resistance for continuous operation.', image: '/lubcon_dieselube_hd_50.webp' };
    if (s2 === 'agri')
      return { product: 'Heavy-Duty Diesel', grade: '15W-40', classification: 'API CJ-4 · ACEA E9', reason: 'Multigrade 15W-40 handles the cold-start demands of agricultural tractors while protecting under full field load.', image: '/lubcon_dieselube_hd_50.webp' };
    if (s3 === 'extreme')
      return { product: 'Heavy-Duty Diesel', grade: 'SAE 40 / 15W-40', classification: 'API CK-4 · ACEA E9', reason: 'Heavy SAE grade for trucks operating under extreme heat and maximum payload — maintains oil pressure and protects against deposit build-up.', image: '/lubcon_dieselube_hd_50.webp' };
    return { product: 'Heavy-Duty Diesel', grade: '15W-40', classification: 'API CK-4 · ACEA E9', reason: 'Industry-standard 15W-40 for trucks and buses — extended drain intervals, strong detergency and proven protection across Nigerian routes.', image: '/lubcon_dieselube_hd_50.webp' };
  }

  // Hydraulic
  if (s1 === 'hydraulic') {
    if (s2 === 'industrial' || s3 === 'heavy')
      return { product: 'Hydraulic Fluids', grade: 'ISO 68', classification: 'DIN 51524 HLP', reason: 'ISO 68 higher viscosity grade for slow-moving industrial hydraulic systems under high pressure and heavy continuous load.', image: '/lubcon-vmpauto_product_lineup.webp' };
    if (s2 === 'mining' || s3 === 'extreme')
      return { product: 'Hydraulic Fluids', grade: 'ISO 46', classification: 'DIN 51524 HLP', reason: 'ISO 46 balances flow at high temperatures with anti-wear performance for mining equipment operating in hot, dusty environments.', image: '/lubcon-vmpauto_product_lineup.webp' };
    return { product: 'Hydraulic Fluids', grade: 'ISO 46', classification: 'DIN 51524 HLP', reason: 'ISO 46 is the most widely specified hydraulic grade for agricultural and construction equipment — optimal flow and wear protection.', image: '/lubcon-vmpauto_product_lineup.webp' };
  }

  // Gearbox
  if (s1 === 'gearbox') {
    if (s2 === 'heavy_gear' && (s3 === 'heavy' || s3 === 'extreme'))
      return { product: 'VMPAUTO Gear Oil', grade: '75W-140', classification: 'API GL-5 · Scania STO 2:0A', reason: 'Fully synthetic PAO+ESTER gear oil certified to Scania STO 2:0A — passed 100 hours of KRL shear testing. Maximum film strength for heavily loaded truck differentials and axles under Nigerian road stress. Available through Lubcon Africa.', image: '/lubcon-vmpauto_product_lineup.webp' };
    if (s2 === 'heavy_gear')
      return { product: 'Gear & Transmission', grade: '85W-140', classification: 'API GL-5 · MIL-L-2105D', reason: 'High-viscosity EP gear oil for heavily loaded truck differentials and axles — maximum film strength under shock loading.', image: '/category_gear.webp' };
    if (s2 === 'ind_gear')
      return { product: 'Gear & Transmission', grade: 'SAE 90', classification: 'API GL-5', reason: 'Monograde SAE 90 for industrial gear drives — excellent load-carrying capacity for worm gears, reducers and spur gear systems.', image: '/category_gear.webp' };
    return { product: 'Gear & Transmission', grade: '80W-90', classification: 'API GL-4 / GL-5', reason: 'Versatile 80W-90 multigrade for passenger car manual gearboxes and light axles — smooth synchroniser operation and reliable EP protection.', image: '/category_gear.webp' };
  }

  // Bearings
  if (s1 === 'bearing') {
    if (s2 === 'ind_bear' && (s3 === 'heavy' || s3 === 'extreme'))
      return { product: 'VMPAUTO MC Blue', grade: 'NLGI 2/3', classification: 'Lithium Complex · Drop Point +350°C', reason: 'High-temperature lithium complex grease with a welding load of 2,933 N and an operating range of -40°C to +180°C. Drop point of +350°C is the highest in its class — built for industrial bearings in continuous high-temperature service. Available through Lubcon Africa.', image: '/lubcon-vmpauto_product_lineup.webp' };
    if (s2 === 'heavy_bear' || s3 === 'heavy' || s3 === 'extreme')
      return { product: 'Industrial Greases', grade: 'NLGI 3', classification: 'DIN 51825 KP3K', reason: 'Stiff NLGI 3 grease for open gear drives and heavily loaded bearings in mining and quarrying — resists being flung off and withstands shock loads.', image: '/category_grease.webp' };
    if (s2 === 'ind_bear')
      return { product: 'Industrial Greases', grade: 'NLGI 2', classification: 'DIN 51825 KP2K', reason: 'Standard NLGI 2 lithium-complex grease for rolling element bearings in industrial plant — excellent water resistance and high-temperature stability.', image: '/category_grease.webp' };
    return { product: 'Industrial Greases', grade: 'NLGI 2', classification: 'DIN 51825 KP2K', reason: 'NLGI 2 multi-purpose grease for wheel bearings, ball joints and chassis lubrication — the most widely used grade for automotive applications.', image: '/category_grease.webp' };
  }

  // Cooling
  return { product: 'Coolants & Chemicals', grade: 'OAT — Ready-to-use', classification: 'ASTM D3306 · BS 6580', reason: 'Long-life OAT coolant pre-mixed 50/50 for year-round protection from -37°C to +135°C — compatible with all metals including aluminium engines.', image: '/category_coolant.webp' };
}

// ── Wizard component ──────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function OilSelectorWizard({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [s1, setS1] = useState('');
  const [s2, setS2] = useState('');
  const [s3, setS3] = useState('');

  const reset = () => { setStep(1); setS1(''); setS2(''); setS3(''); };
  const handleClose = () => { reset(); onClose(); };

  const pick1 = (id: string) => { setS1(id); setS2(''); setStep(2); };
  const pick2 = (id: string) => { setS2(id); setStep(3); };
  const pick3 = (id: string) => { setS3(id); setStep(4); };

  const result = step === 4 ? getRecommendation(s1, s2, s3) : null;

  const scrollToContact = () => {
    handleClose();
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const stepLabels = ['What are you lubricating?', 'What\'s your application?', 'Operating conditions?', 'Your recommendation'];

  return (
    <Dialog open={open} onOpenChange={o => { if (!o) handleClose(); }}>
      <DialogContent className="bg-navy border border-white/10 text-white max-w-xl w-full p-0 overflow-hidden rounded-2xl gap-0">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FlaskConical size={16} className="text-gold" />
              <span className="font-mono-label text-gold">Oil Selector</span>
            </div>
            {/* Step dots */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className={`rounded-full transition-all duration-300 ${
                  n < step ? 'w-4 h-2 bg-gold' :
                  n === step ? 'w-4 h-2 bg-gold/80' :
                  'w-2 h-2 bg-white/15'
                }`} />
              ))}
            </div>
          </div>
          <h2 className="font-display font-bold text-white text-xl">
            {stepLabels[step - 1]}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">

          {/* Step 1 */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {STEP1.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => pick1(opt.id)}
                  className="text-left bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/5 rounded-xl p-4 transition-all duration-200 group"
                >
                  <span className="text-2xl block mb-2">{opt.icon}</span>
                  <span className="font-semibold text-white text-sm block group-hover:text-gold transition-colors">{opt.label}</span>
                  <span className="text-white/40 text-xs mt-0.5 block">{opt.hint}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-2.5">
              {(STEP2[s1] || []).map(opt => (
                <button
                  key={opt.id}
                  onClick={() => pick2(opt.id)}
                  className="w-full text-left bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/5 rounded-xl px-5 py-4 transition-all duration-200 group flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-white text-sm block group-hover:text-gold transition-colors">{opt.label}</span>
                    <span className="text-white/40 text-xs mt-0.5 block">{opt.hint}</span>
                  </div>
                  <ArrowRight size={16} className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-2.5">
              {STEP3.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => pick3(opt.id)}
                  className="w-full text-left bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/5 rounded-xl px-5 py-4 transition-all duration-200 group flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-white text-sm block group-hover:text-gold transition-colors">{opt.label}</span>
                    <span className="text-white/40 text-xs mt-0.5 block">{opt.hint}</span>
                  </div>
                  <ArrowRight size={16} className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Step 4 — Result */}
          {step === 4 && result && (
            <div className="space-y-5">
              {/* Product card */}
              <div className="relative rounded-xl overflow-hidden h-36">
                <img src={result.image} alt={result.product} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="font-mono-label text-[10px] text-gold">Recommended Product</span>
                  <h3 className="font-display font-bold text-white text-xl">{result.product}</h3>
                </div>
              </div>

              {/* Grade + classification */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-4">
                  <span className="font-mono-label text-white/40 block mb-1">Grade</span>
                  <span className="text-gold font-semibold">{result.grade}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <span className="font-mono-label text-white/40 block mb-1">Classification</span>
                  <span className="text-white font-medium text-sm">{result.classification}</span>
                </div>
              </div>

              {/* Why this product */}
              <div className="bg-gold/5 border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={14} className="text-gold" />
                  <span className="font-mono-label text-gold">Why this product</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{result.reason}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
          {step === 4 ? (
            <>
              <Button
                onClick={scrollToContact}
                className="flex-1 bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full gap-2"
              >
                <MessageCircle size={16} /> Request this Product
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-full gap-1.5"
              >
                <RotateCcw size={14} /> Start over
              </Button>
            </>
          ) : step > 1 ? (
            <>
              <Button
                onClick={() => setStep(s => s - 1)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-full gap-1.5"
              >
                <ArrowLeft size={14} /> Back
              </Button>
              <span className="text-white/20 text-xs ml-auto">Step {step} of 3</span>
            </>
          ) : (
            <span className="text-white/30 text-sm">Select an option above to continue</span>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
}
