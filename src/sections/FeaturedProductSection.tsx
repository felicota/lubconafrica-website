import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProductSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLSpanElement>(null);
  const headline2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(headline1Ref.current, 
        { x: '-18vw', opacity: 0 }, 
        { x: 0, opacity: 1, ease: 'none' }, 
        0
      );
      scrollTl.fromTo(headline2Ref.current, 
        { x: '-18vw', opacity: 0 }, 
        { x: 0, opacity: 1, ease: 'none' }, 
        0.1
      );
      scrollTl.fromTo(bodyRef.current, 
        { y: '10vh', opacity: 0 }, 
        { y: 0, opacity: 1, ease: 'none' }, 
        0.14
      );
      scrollTl.fromTo(cardRef.current, 
        { x: '18vw', opacity: 0, scale: 0.96 }, 
        { x: 0, opacity: 1, scale: 1, ease: 'none' }, 
        0.08
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl.fromTo([headline1Ref.current, headline2Ref.current, bodyRef.current], 
        { x: 0, opacity: 1 }, 
        { x: '-12vw', opacity: 0, ease: 'power2.in' }, 
        0.7
      );
      scrollTl.fromTo(cardRef.current, 
        { x: 0, opacity: 1 }, 
        { x: '12vw', opacity: 0, ease: 'power2.in' }, 
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="section-pinned z-40"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/featured_nano_bg.jpg"
          alt="Engine testing environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-navy/65 to-navy/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full px-6 lg:px-[6vw] pt-[18vh]">
        {/* Left Content */}
        <div className="max-w-xl">
          {/* Headline */}
          <h2 className="font-display font-bold leading-[0.95] tracking-tight mb-8">
            <span
              ref={headline1Ref}
              className="block text-[clamp(36px,4.5vw,72px)] text-white"
            >
              Nano
            </span>
            <span
              ref={headline2Ref}
              className="block text-[clamp(36px,4.5vw,72px)] text-white"
            >
              Technology
            </span>
          </h2>

          {/* Body */}
          <div ref={bodyRef}>
            <p className="text-cool-gray text-base lg:text-lg leading-relaxed mb-8">
              Ultra-clean formulations that reduce wear, extend drain intervals, and keep engines cooler under load.
            </p>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
            >
              <FileText size={18} />
              View technical specs
            </Button>
          </div>
        </div>

        {/* Right Floating Card */}
        <div
          ref={cardRef}
          className="hidden lg:block absolute right-[6vw] top-[16vh] w-[36vw] h-[62vh] rounded-xl overflow-hidden card-shadow"
        >
          <img
            src="/nano_oil_bottle_card.jpg"
            alt="Nano Technology Oil"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-mono-label text-gold mb-2">Premium</p>
            <h3 className="font-display font-semibold text-white text-xl mb-1">Nano 5W-40</h3>
            <p className="text-cool-gray text-sm">Full synthetic, low SAPS.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductSection;
