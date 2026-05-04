import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import BuiltForAfricaSection from './sections/BuiltForAfricaSection';
import ProductCategoriesSection from './sections/ProductCategoriesSection';
import FeaturedProductSection from './sections/FeaturedProductSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import InnovationSection from './sections/InnovationSection';
import IndustrySolutionsSection from './sections/IndustrySolutionsSection';
import QualitySection from './sections/QualitySection';
import CertificationsSection from './sections/CertificationsSection';
import DistributionSection from './sections/DistributionSection';
import ContactSection from './sections/ContactSection';
import BlogPreviewSection from './sections/BlogPreviewSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const skipSnap = useRef(false);

  // Cross-page scroll (e.g. /blog → #contact).
  // Set the flag BEFORE the GSAP snap initialises (500ms) so snap skips itself,
  // then scroll at 600ms when the DOM is ready.
  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) return;
    skipSnap.current = true;
    const timer = setTimeout(() => {
      const el = document.querySelector(scrollTo) as HTMLElement | null;
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'instant' });
    }, 600);
    return () => clearTimeout(timer);
  }, [location.state]);

  useEffect(() => {
    ScrollTrigger.refresh();

    const setupGlobalSnap = () => {
      // Skip snap when we are programmatically scrolling to a section
      if (skipSnap.current) return;

      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            return pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-navy">
      <div className="noise-overlay" />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <BuiltForAfricaSection />
        <ProductCategoriesSection />
        <FeaturedProductSection />
        <CapabilitiesSection />
        <InnovationSection />
        <IndustrySolutionsSection />
        <QualitySection />
        <CertificationsSection />
        <DistributionSection />
        <BlogPreviewSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
