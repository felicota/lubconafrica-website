import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BuiltForAfricaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLSpanElement>(null);
  const headline2Ref = useRef<HTMLSpanElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
        { y: '18vh', opacity: 0 }, 
        { y: 0, opacity: 1, ease: 'none' }, 
        0
      );
      scrollTl.fromTo(headline2Ref.current, 
        { y: '18vh', opacity: 0 }, 
        { y: 0, opacity: 1, ease: 'none' }, 
        0.08
      );
      scrollTl.fromTo(subheadlineRef.current, 
        { y: '6vh', opacity: 0 }, 
        { y: 0, opacity: 1, ease: 'none' }, 
        0.12
      );
      scrollTl.fromTo(ctaRef.current, 
        { y: '4vh', scale: 0.96, opacity: 0 }, 
        { y: 0, scale: 1, opacity: 1, ease: 'none' }, 
        0.18
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl.fromTo([headline1Ref.current, headline2Ref.current], 
        { y: 0, opacity: 1 }, 
        { y: '-14vh', opacity: 0, ease: 'power2.in' }, 
        0.7
      );
      scrollTl.fromTo([subheadlineRef.current, ctaRef.current], 
        { y: 0, opacity: 1 }, 
        { y: '-8vh', opacity: 0, ease: 'power2.in' }, 
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToCapabilities = () => {
    const element = document.querySelector('#capabilities');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="built-for-africa"
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/workshop_workers_bg.jpg"
          alt="African workers in workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-navy/70 to-navy/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <h2 className="font-display font-bold text-center leading-[0.95] tracking-tight">
          <span
            ref={headline1Ref}
            className="block text-[clamp(40px,5vw,80px)] text-white"
          >
            Built for
          </span>
          <span
            ref={headline2Ref}
            className="block text-[clamp(40px,5vw,80px)] text-gold"
          >
            Africa
          </span>
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-8 text-cool-gray text-base lg:text-lg text-center max-w-[52vw] leading-relaxed"
        >
          Formulated for heat, dust, and heavy loads. Proven across industries.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-10">
          <Button
            onClick={scrollToCapabilities}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
          >
            See our capabilities
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BuiltForAfricaSection;
