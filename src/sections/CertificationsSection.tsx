import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    logo: '/iso_logo.jpeg',
    code: 'ISO 9001:2015',
    body: 'International Organisation for Standardisation',
    description:
      'Certified Quality Management System — confirms that every batch of Lubcon Africa products is manufactured, tested and delivered under a rigorously audited process that meets global quality standards.',
    tag: 'Quality Management',
  },
  {
    logo: '/son_logo.png',
    code: 'SON Certified',
    body: 'Standards Organisation of Nigeria',
    description:
      'Certified by the Standards Organisation of Nigeria — confirms that Lubcon Africa products meet the mandatory national standards for industrial and automotive lubricants sold and distributed in Nigeria.',
    tag: 'National Standards',
  },
];

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', end: 'top 55%', scrub: true },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 50%', scrub: true },
            delay: i * 0.05,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[85] bg-navy-dark py-20 lg:py-28 border-t border-b border-white/5"
    >
      <div className="px-6 lg:px-[6vw]">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="font-mono-label text-gold block mb-3">Compliance & Trust</span>
          <h2 className="font-display font-bold text-white text-[clamp(28px,3vw,48px)]">
            Internationally Certified
          </h2>
          <p className="text-white/40 text-sm lg:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Every product that leaves our facility is backed by independently audited certifications.
          </p>
        </div>

        {/* Certification cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <div
              key={cert.code}
              ref={el => { cardsRef.current[i] = el; }}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden group hover:border-gold/30 transition-colors duration-300"
            >
              {/* Background glow */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/10 transition-colors duration-500" />

              {/* Logo — white background so colours render correctly */}
              <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center mb-6 p-3 shadow-lg">
                <img
                  src={cert.logo}
                  alt={cert.code}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Tag */}
              <span className="font-mono-label text-xs text-gold/70 block mb-2">
                {cert.tag}
              </span>

              {/* Code */}
              <h3 className="font-display font-bold text-white text-2xl mb-1">
                {cert.code}
              </h3>

              {/* Issuing body */}
              <p className="text-white/30 text-xs mb-4 font-mono-label">
                {cert.body}
              </p>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-4" />

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {cert.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust footnote */}
        <p className="text-center text-white/20 text-xs mt-10 font-mono-label">
          Certifications independently audited and renewed annually
        </p>
      </div>
    </section>
  );
};

export default CertificationsSection;
