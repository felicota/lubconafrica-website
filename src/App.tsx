import { useEffect, useRef } from 'react';
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
import DistributionSection from './sections/DistributionSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();
    
    // Setup global snap for pinned sections
    const setupGlobalSnap = () => {
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

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-navy">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Built for Africa */}
        <BuiltForAfricaSection />
        
        {/* Section 3: Product Categories */}
        <ProductCategoriesSection />
        
        {/* Section 4: Featured Product */}
        <FeaturedProductSection />
        
        {/* Section 5: Capabilities */}
        <CapabilitiesSection />
        
        {/* Section 6: Innovation */}
        <InnovationSection />
        
        {/* Section 7: Industry Solutions */}
        <IndustrySolutionsSection />
        
        {/* Section 8: Quality */}
        <QualitySection />
        
        {/* Section 9: Distribution */}
        <DistributionSection />
        
        {/* Section 10: Contact */}
        <ContactSection />
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
