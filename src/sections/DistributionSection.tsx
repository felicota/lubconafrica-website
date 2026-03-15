import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  'Shell', 'Total', 'Mobil', 'Castrol', 'Valvoline', 'BP'
];

const distributionPoints = [
  { x: 25, y: 35, name: 'Lagos' },
  { x: 35, y: 40, name: 'Abuja' },
  { x: 45, y: 30, name: 'Kano' },
  { x: 55, y: 45, name: 'Port Harcourt' },
  { x: 65, y: 35, name: 'Onitsha' },
  { x: 75, y: 50, name: 'Ibadan' },
];

const DistributionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const partnersRef = useRef<HTMLDivElement>(null);

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

      // Map card animation
      gsap.fromTo(mapRef.current,
        { x: '6vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      // Map dots animation
      dotsRef.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 60%',
              end: 'top 40%',
              scrub: true,
            }
          }
        );
      });

      // Partners animation
      gsap.fromTo(partnersRef.current,
        { y: '3vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: partnersRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="distribution"
      className="relative z-[90] bg-navy py-20 lg:py-32"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <div ref={headerRef}>
            <h2 className="font-display font-bold text-white text-[clamp(32px,3.6vw,56px)] mb-6">
              Distribution Network
            </h2>
            <p className="text-cool-gray text-base lg:text-lg leading-relaxed max-w-lg mb-8">
              A reliable supply chain that keeps your operations moving—wherever you are.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center text-gold hover:text-gold-light transition-colors duration-300"
            >
              <span className="font-medium">Find a distributor</span>
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>

          {/* Right Map Card */}
          <div
            ref={mapRef}
            className="relative bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8"
          >
            {/* Map Visualization */}
            <div className="relative h-64 lg:h-80 bg-navy-light/50 rounded-lg overflow-hidden">
              {/* Simplified Africa Map Background */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full opacity-20"
              >
                <path
                  d="M20,20 Q30,15 40,20 Q50,25 60,20 Q70,15 80,25 Q85,40 80,55 Q75,70 65,80 Q50,90 35,80 Q20,70 15,55 Q10,40 20,20"
                  fill="currentColor"
                  className="text-white"
                />
              </svg>

              {/* Distribution Points */}
              {distributionPoints.map((point, index) => (
                <div
                  key={point.name}
                  ref={el => { dotsRef.current[index] = el; }}
                  className="absolute"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <div className="relative">
                    <div className="w-3 h-3 bg-gold rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-gold rounded-full animate-ping opacity-50" />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/70 whitespace-nowrap">
                      {point.name}
                    </span>
                  </div>
                </div>
              ))}

              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                  <span className="font-mono-label text-white/60">Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div ref={partnersRef} className="mt-16 pt-8 border-t border-white/10">
          <span className="font-mono-label text-white/40 block mb-6">Trusted By</span>
          <div className="flex flex-wrap gap-8 lg:gap-12 items-center">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-white/30 font-display font-semibold text-lg lg:text-xl hover:text-white/50 transition-colors duration-300"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistributionSection;
