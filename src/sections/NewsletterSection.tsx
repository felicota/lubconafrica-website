import { useState } from 'react';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `New newsletter subscriber — ${email}`,
          from_name: 'Lubcon Africa Website',
          name: name || 'Not provided',
          email,
          message: `New subscriber: ${name || 'Anonymous'} <${email}>`,
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Subscribed! You\'ll receive industry insights from us.');
        setEmail('');
        setName('');
      } else {
        toast.error('Could not subscribe. Please try again.');
      }
    } catch {
      toast.error('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative z-[95] bg-navy border-t border-white/5">
      <div className="px-6 lg:px-[6vw] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">

          {/* Label */}
          <span className="font-mono-label text-gold block mb-3">Stay Informed</span>

          {/* Headline */}
          <h2 className="font-display font-bold text-white text-[clamp(24px,2.8vw,40px)] mb-3">
            Industry Insights in Your Inbox
          </h2>
          <p className="text-white/40 text-sm lg:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Join fleet managers and procurement officers who read our technical guides, product updates and industry news.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-gold sm:w-44 flex-shrink-0"
            />
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-gold flex-1"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full px-6 gap-2 flex-shrink-0 disabled:opacity-60"
            >
              <Send size={15} />
              {submitting ? 'Subscribing…' : 'Subscribe'}
            </Button>
          </form>

          <p className="text-white/20 text-xs mt-4">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  );
}
