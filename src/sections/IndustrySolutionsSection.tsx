import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    title: 'Mining & Earthmoving',
    image: '/mining_truck_img.jpg',
  },
  {
    title: 'Transport & Logistics',
    image: '/transport_fleet_img.jpg',
  },
  {
    title: 'Power & Agriculture',
    image: '/power_agri_img.jpg',
  },
];

const IndustrySolutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Collage container
      gsap.fromTo(collageRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: collageRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      // Images animation
      imagesRef.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(img,
          { y: '4vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true,
            }
          }
        );
      });

      // Gold underlines
      linesRef.current.forEach((line) => {
        if (!line) return;
        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              end: 'top 60%',
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
      id="industries"
      className="relative z-[70] bg-navy py-20 lg:py-32"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <div ref={headerRef}>
            <h2 className="font-display font-bold text-white text-[clamp(32px,3.6vw,56px)] mb-6">
              Industry Solutions
            </h2>
            <p className="text-cool-gray text-base lg:text-lg leading-relaxed max-w-lg">
              We match the right product to your operating conditions—mining, transport, power, or agriculture.
            </p>
          </div>

          {/* Right Collage */}
          <div ref={collageRef} className="space-y-4">
            {industries.map((industry, index) => (
              <div
                key={industry.title}
                ref={el => { imagesRef.current[index] = el; }}
                className="relative rounded-xl overflow-hidden group"
              >
                <div className="relative h-40 lg:h-48 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
                </div>
                
                {/* Caption */}
                <div className="absolute bottom-4 left-4">
                  <div 
                    ref={el => { linesRef.current[index] = el; }}
                    className="h-1 w-12 bg-gold mb-2 origin-left"
                  />
                  <span className="font-mono-label text-white/80">
                    {industry.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutionsSection;
