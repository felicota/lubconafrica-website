import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: '150+',
    label: 'SKUs',
    description: 'Oils, greases, and specialty fluids.',
  },
  {
    number: '6',
    label: 'Plants',
    description: 'Strategically located across the region.',
  },
  {
    number: '24h',
    label: 'Dispatch',
    description: 'Reliable logistics, reduced downtime.',
  },
];

const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { x: '-4vw', opacity: 0 },
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

      // Decorative line
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
          }
        }
      );

      // Stats animation
      statsRef.current.forEach((stat) => {
        if (!stat) return;
        gsap.fromTo(stat,
          { y: '6vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              end: 'top 55%',
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
      id="capabilities"
      className="relative z-50 bg-off-white py-20 lg:py-32"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div ref={headerRef}>
            <h2 className="font-display font-bold text-navy text-[clamp(32px,3.6vw,56px)] mb-6">
              Built to Perform
            </h2>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed max-w-lg">
              From blending to delivery, we control quality at every step—so your equipment stays protected.
            </p>
            
            {/* Decorative Line */}
            <div 
              ref={lineRef}
              className="mt-8 h-1 w-24 bg-gold origin-left"
            />
          </div>

          {/* Right Stats */}
          <div className="space-y-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                ref={el => { statsRef.current[index] = el; }}
                className="flex items-start gap-6 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="font-display font-bold text-gold text-[clamp(36px,4vw,56px)] leading-none">
                  {stat.number}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-navy text-lg mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
