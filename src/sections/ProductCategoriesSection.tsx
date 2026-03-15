import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: 'Automotive Oils',
    description: 'Cars, SUVs, light trucks.',
    image: '/category_automotive.jpg',
  },
  {
    title: 'Heavy-Duty Diesel',
    description: 'Trucks, buses, generators.',
    image: '/category_diesel.jpg',
  },
  {
    title: 'Hydraulic Fluids',
    description: 'Construction, agriculture, mining.',
    image: '/category_hydraulic.jpg',
  },
  {
    title: 'Industrial Greases',
    description: 'Bearings, chassis, open gears.',
    image: '/category_grease.jpg',
  },
  {
    title: 'Gear & Transmission',
    description: 'Differentials, gearboxes, axles.',
    image: '/category_gear.jpg',
  },
  {
    title: 'Coolants & Chemicals',
    description: 'Heat transfer, cleaning, protection.',
    image: '/category_coolant.jpg',
  },
];

const ProductCategoriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      // Cards animation - staggered by row
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: '10vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 45%',
              scrub: true,
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative z-30 bg-navy py-20 lg:py-32"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <h2 className="font-display font-bold text-white text-[clamp(32px,3.6vw,56px)] mb-4">
            Products by Application
          </h2>
          <p className="text-cool-gray text-base lg:text-lg max-w-xl">
            Choose the right fluid for your equipment and environment.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.title}
              ref={el => { cardsRef.current[index] = el; }}
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
                <p className="text-cool-gray text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex items-center text-gold text-sm font-medium">
                  <span>Learn more</span>
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoriesSection;
