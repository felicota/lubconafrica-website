import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial states
      gsap.set([labelRef.current, headline1Ref.current, headline2Ref.current, subheadlineRef.current, ctaRef.current, cardRef.current], {
        opacity: 0,
      });
      gsap.set(overlayRef.current, { opacity: 1 });

      // Animation sequence
      tl.to(overlayRef.current, { opacity: 0, duration: 0.4 }, 0)
        .fromTo(labelRef.current, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.15)
        .fromTo(headline1Ref.current, { x: '-8vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.45 }, 0.25)
        .fromTo(headline2Ref.current, { x: '-8vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.35)
        .fromTo(subheadlineRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.55)
        .fromTo(ctaRef.current, { y: 18, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.4 }, 0.7)
        .fromTo(cardRef.current, { x: '10vw', opacity: 0, scale: 0.96 }, { x: 0, opacity: 1, scale: 1, duration: 0.55 }, 0.45);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([labelRef.current, headline1Ref.current, headline2Ref.current, subheadlineRef.current, ctaRef.current, cardRef.current], {
              opacity: 1, x: 0, y: 0, scale: 1
            });
          }
        }
      });

      // ENTRANCE (0-30%): Hold - elements already visible
      // Just subtle background scale
      scrollTl.fromTo(section.querySelector('.bg-image'), 
        { scale: 1 }, 
        { scale: 1.03, ease: 'none' }, 
        0
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%): Elements exit
      scrollTl.fromTo([headline1Ref.current, headline2Ref.current], 
        { x: 0, opacity: 1 }, 
        { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
        0.7
      );

      scrollTl.fromTo([subheadlineRef.current, ctaRef.current], 
        { y: 0, opacity: 1 }, 
        { y: '-10vh', opacity: 0, ease: 'power2.in' }, 
        0.7
      );

      scrollTl.fromTo(cardRef.current, 
        { x: 0, opacity: 1 }, 
        { x: '18vw', opacity: 0, ease: 'power2.in' }, 
        0.7
      );

      scrollTl.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 0.12, ease: 'none' }, 
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div className="bg-image absolute inset-0">
        <img
          src="/hero_machinery_bg.jpg"
          alt="Industrial machinery"
          className="w-full h-full object-cover"
        />
        {/* Navy Wash Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/60 to-navy/40" />
      </div>

      {/* Darkening Overlay for Exit */}
      <div ref={overlayRef} className="absolute inset-0 bg-navy pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full w-full px-6 lg:px-[6vw] pt-[10vh]">
        {/* Label */}
        <span
          ref={labelRef}
          className="font-mono-label text-gold block mb-4"
        >
          Industrial Lubricants
        </span>

        {/* Headline */}
        <h1 className="font-display font-bold text-white leading-[0.95] tracking-tight">
          <span
            ref={headline1Ref}
            className="block text-[clamp(44px,5vw,84px)]"
          >
            Precision
          </span>
          <span
            ref={headline2Ref}
            className="block text-[clamp(44px,5vw,84px)]"
          >
            Fluids
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-8 text-cool-gray text-base lg:text-lg max-w-[34vw] leading-relaxed"
        >
          High-performance oils and greases engineered for African operating conditions.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
          <Button
            onClick={scrollToProducts}
            className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
          >
            Explore products
            <ArrowRight size={18} />
          </Button>
          <Button
            onClick={scrollToContact}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
          >
            <MessageCircle size={18} />
            Talk to an expert
          </Button>
        </div>

        {/* Right Floating Card */}
        <div
          ref={cardRef}
          className="hidden lg:block absolute right-[6vw] top-[18vh] w-[34vw] h-[56vh] rounded-xl overflow-hidden card-shadow"
        >
          <img
            src="/hydraulic_oil_card.jpg"
            alt="Hydraulic Oils"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-mono-label text-gold mb-2">Featured</p>
            <h3 className="font-display font-semibold text-white text-xl mb-1">Hydraulic Oils</h3>
            <p className="text-cool-gray text-sm">High stability, long life.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
