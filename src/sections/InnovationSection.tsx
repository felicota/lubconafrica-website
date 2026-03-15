import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { FlaskConical } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InnovationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLSpanElement>(null);
  const headline2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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
        0.1
      );
      scrollTl.fromTo(bodyRef.current, 
        { y: '6vh', opacity: 0 }, 
        { y: 0, opacity: 1, ease: 'none' }, 
        0.16
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl.fromTo([headline1Ref.current, headline2Ref.current], 
        { y: 0, opacity: 1 }, 
        { y: '-14vh', opacity: 0, ease: 'power2.in' }, 
        0.7
      );
      scrollTl.fromTo(bodyRef.current, 
        { opacity: 1 }, 
        { opacity: 0, ease: 'power2.in' }, 
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="innovation"
      className="section-pinned z-[60]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lab_testing_bg.jpg"
          alt="Laboratory testing"
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
            Innovation
          </span>
          <span
            ref={headline2Ref}
            className="block text-[clamp(40px,5vw,80px)] text-gold"
          >
            in Every Drop
          </span>
        </h2>

        {/* Body */}
        <div ref={bodyRef} className="mt-10 text-center">
          <p className="text-cool-gray text-base lg:text-lg max-w-[52vw] leading-relaxed mb-8">
            We test for oxidation, wear, and viscosity stability—so you don't have to.
          </p>
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 mx-auto"
          >
            <FlaskConical size={18} />
            Explore R&D
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
