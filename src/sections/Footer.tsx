import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: 'Automotive Oils', href: '#products' },
      { label: 'Heavy-Duty Diesel', href: '#products' },
      { label: 'Hydraulic Fluids', href: '#products' },
      { label: 'Industrial Greases', href: '#products' },
    ],
    industries: [
      { label: 'Mining', href: '#industries' },
      { label: 'Transport', href: '#industries' },
      { label: 'Agriculture', href: '#industries' },
      { label: 'Power Generation', href: '#industries' },
    ],
    support: [
      { label: 'Technical Specs', href: '#quality' },
      { label: 'Safety Data Sheets', href: '#quality' },
      { label: 'Certificates', href: '#quality' },
      { label: 'FAQs', href: '#contact' },
    ],
    company: [
      { label: 'About Us', href: '#built-for-africa' },
      { label: 'Careers', href: '#contact' },
      { label: 'News', href: '#innovation' },
      { label: 'Contact', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-[110] bg-navy-dark border-t border-white/10">
      <div className="px-6 lg:px-[6vw] py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display text-2xl font-bold text-white tracking-tight inline-block mb-4"
            >
              Lubcon<span className="text-gold"> Africa</span>
            </a>
            <p className="text-cool-gray text-sm leading-relaxed max-w-xs mb-6">
              Nigeria's first indigenous lubricant company, powering industries since 1991.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-gold hover:text-navy-dark transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-mono-label text-gold mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-cool-gray text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-mono-label text-gold mb-4">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-cool-gray text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-mono-label text-gold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-cool-gray text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono-label text-gold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-cool-gray text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Lubcon Africa. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 text-sm hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 text-sm hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 text-sm hover:text-white transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
