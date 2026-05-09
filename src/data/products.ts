export interface Product {
  title: string;
  description: string;
  image: string;
  tds?: string;
  fullDescription: string;
  specs: { label: string; value: string }[];
  grades: string[];
  applications: string[];
  containers: string[];
}

export const products: Product[] = [
  {
    title: 'Automotive Oils',
    description: 'Cars, SUVs, light trucks.',
    image: '/lubcon_nano_automative_products_img.webp',
    tds: '/lubcon_super_resurs_tds-automotive-oils.pdf',
    fullDescription:
      "Premium engine oils formulated for petrol and modern turbocharged engines. Provides outstanding wear protection, thermal stability and fuel economy for passenger vehicles across all driving conditions in Nigeria's climate.",
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
    image: '/lubcon_dieselube_hd_50.webp',
    tds: '/lubcon_dieselube_15W40_tds-heavy-duty-diesel.pdf',
    fullDescription:
      "Engineered for the demands of high-load diesel engines operating in Nigeria's transport, logistics and power generation sectors. Delivers extended drain intervals and robust protection under extreme conditions.",
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
    title: 'VMPAUTO Products',
    description: 'Partner brand — engine oils, RESURS treatments & specialty greases.',
    image: '/lubcon-vmpauto_product_lineup.webp',
    fullDescription:
      "VMPAUTO is a Russian research and production company with 28 years of innovation in lubricants — a Lubcon Africa partner brand available exclusively in Nigeria through us. Their QuadroSynthetic engine oil (PAO + VHVI + ESTER formulation, API SP, ILSAC GF-6A) achieves a viscosity index of 200 — 15% higher than most competitors — for outstanding cold-start protection and reduced engine wear. The RESURS treatment line restores friction surfaces, decarbonises engines and equalises compression. Fully synthetic transmission oils carry Scania STO 2:0A certification, and specialty greases — MC Blue (drop point +350°C) and MC Rubin (water-resistant) — cover the most demanding bearing applications.",
    specs: [
      { label: 'Innovation Heritage', value: '28 years · 4,000 recipes · 35 patents' },
      { label: 'Engine Oil Standards', value: 'API SP / SN · ACEA A3/B4 · ILSAC GF-6A' },
      { label: 'Viscosity Index', value: 'Up to 200 VI (industry avg. 170)' },
    ],
    grades: ['0W-20 Modern (API SP)', '5W-30 / 10W-40 (API SN)', 'Diesel 10W-40 (CI-4)', 'RESURS Treatments', 'MC Blue / MC Rubin Greases'],
    applications: [
      'Modern turbocharged & high-performance petrol engines',
      'Heavy-duty diesel trucks and long-haul fleet vehicles',
      'Engine decarbonization & compression restoration',
      'Scania-certified transmission & differential lubrication',
      'High-temperature and water-resistant bearing greases',
    ],
    containers: ['1 Litre', '4 Litre', '20 Litre', 'Various treatment sizes'],
  },
  {
    title: 'Industrial Greases',
    description: 'Bearings, chassis, open gears.',
    image: '/category_grease.webp',
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
    image: '/category_gear.webp',
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
    image: '/category_coolant.webp',
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
