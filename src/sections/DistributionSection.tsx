import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowRight } from 'lucide-react';
import { distributors } from '@/data/distributors';

gsap.registerPlugin(ScrollTrigger);

// Custom DivIcon markers — avoids Vite bundler icon path issues
const hqIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:18px;height:18px;border-radius:50%;
    background:#D4A23A;border:3px solid #fff;
    box-shadow:0 0 0 3px rgba(212,162,58,0.4);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -12],
});

const hubIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:12px;height:12px;border-radius:50%;
    background:#fff;border:2px solid rgba(255,255,255,0.6);
    box-shadow:0 0 0 2px rgba(255,255,255,0.2);
  "></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  popupAnchor: [0, -10],
});

const DistributionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { x: '-4vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%', end: 'top 55%', scrub: true } }
      );
      gsap.fromTo(mapRef.current,
        { x: '6vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out', scrollTrigger: { trigger: mapRef.current, start: 'top 80%', end: 'top 50%', scrub: true } }
      );
      gsap.fromTo(partnersRef.current,
        { y: '3vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: partnersRef.current, start: 'top 90%', end: 'top 70%', scrub: true } }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="distribution" className="relative z-[90] bg-navy py-20 lg:py-32">
      <div className="px-6 lg:px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div ref={headerRef}>
            <span className="font-mono-label text-gold block mb-3">Nationwide Coverage</span>
            <h2 className="font-display font-bold text-white text-[clamp(32px,3.6vw,56px)] mb-6">
              Distribution Network
            </h2>
            <p className="text-cool-gray text-base lg:text-lg leading-relaxed max-w-lg mb-6">
              From our headquarters in Ilorin, LUBCON Africa products reach fleets, factories and farms across Nigeria through a growing network of distribution hubs.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="font-display font-bold text-gold text-3xl block">{distributors.length - 1}</span>
                <span className="text-white/40 text-sm">Distribution hubs</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="font-display font-bold text-gold text-3xl block">6</span>
                <span className="text-white/40 text-sm">Geopolitical zones</span>
              </div>
            </div>

            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center text-gold hover:text-gold-light transition-colors duration-300 font-medium"
            >
              Become a distributor
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>

          {/* Right — Leaflet Map */}
          <div ref={mapRef} className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="h-72 lg:h-96">
              <MapContainer
                center={[9.0, 8.0]}
                zoom={5}
                scrollWheelZoom={false}
                className="w-full h-full"
                style={{ background: '#0B1F3F' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {distributors.map(d => (
                  <Marker
                    key={d.name}
                    position={[d.lat, d.lng]}
                    icon={d.isHQ ? hqIcon : hubIcon}
                  >
                    <Popup className="lubcon-popup">
                      <div className="text-center p-1">
                        {d.isHQ && (
                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block mb-0.5">Headquarters</span>
                        )}
                        <strong className="text-sm block">{d.city}</strong>
                        <span className="text-xs text-gray-500">{d.state}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 px-5 py-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold border-2 border-white/60" />
                <span className="font-mono-label text-white/40 text-[10px]">HQ — Ilorin</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white border border-white/40" />
                <span className="font-mono-label text-white/40 text-[10px]">Distribution hub</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div ref={partnersRef} className="mt-16 pt-8 border-t border-white/10">
          <span className="font-mono-label text-white/40 block mb-6">Compatible With</span>
          <div className="flex flex-wrap gap-8 lg:gap-12 items-center">
            {['Shell', 'Total', 'Mobil', 'Castrol', 'Valvoline', 'BP'].map(p => (
              <span key={p} className="text-white/30 font-display font-semibold text-lg lg:text-xl hover:text-white/50 transition-colors duration-300">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistributionSection;
