import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(leftRef.current,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        { x: '6vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `New quote request from ${formData.name} — LUBCON Africa`,
          from_name: 'LUBCON Africa Website',
          ...formData,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Message sent! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Could not send message. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-[100] bg-navy py-20 lg:py-32"
    >
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-5">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M150,100 Q200,80 250,100 Q300,120 350,100 Q400,80 450,100 Q500,120 550,100 Q600,80 650,100 Q700,120 750,100 Q800,80 850,100"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <circle cx="200" cy="150" r="3" fill="white" />
          <circle cx="400" cy="200" r="3" fill="white" />
          <circle cx="600" cy="180" r="3" fill="white" />
          <circle cx="800" cy="220" r="3" fill="white" />
        </svg>
      </div>

      <div className="relative px-6 lg:px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div ref={leftRef}>
            <h2 className="font-display font-bold text-white text-[clamp(32px,3.6vw,56px)] mb-6">
              Get in Touch
            </h2>
            <p className="text-cool-gray text-base lg:text-lg leading-relaxed max-w-lg mb-10">
              Tell us what you're running. We'll recommend the right product and delivery plan.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="font-mono-label text-white/40 block mb-1">Email</span>
                  <a href="mailto:info@lubconafrica.com" className="text-white hover:text-gold transition-colors">
                    info@lubconafrica.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="font-mono-label text-white/40 block mb-1">Phone</span>
                  <a href="tel:+2348061563148" className="text-white hover:text-gold transition-colors">
                    +234 806 156 3148
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="font-mono-label text-white/40 block mb-1">Address</span>
                  <span className="text-white leading-relaxed">
                    Lubcon Avenue, Adewole Industrial Layout,<br />
                    Ilorin, Kwara State, Nigeria
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="font-mono-label text-white/40 block mb-1">Hours</span>
                  <span className="text-white">Mon–Fri 08:00–17:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className="bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono-label text-white/40 block mb-2">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-mono-label text-white/40 block mb-2">Company</label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono-label text-white/40 block mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-mono-label text-white/40 block mb-2">Phone</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-label text-white/40 block mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gold hover:bg-gold-light text-navy-dark font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {submitting ? 'Sending…' : 'Request a quote'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
