import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '@/lib/supabase';
import type { Post } from '@/types/blog';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const readTime = (content: string) => Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200));
const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function BlogPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from('posts')
      .select('id, slug, title, excerpt, cover_image, category, content, created_at, author, published, tags, author_image, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data: postData }) => setPosts(postData || []));
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%', end: 'top 55%', scrub: true } }
      );
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 50%', scrub: true }, delay: i * 0.05 }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [posts]);

  if (posts.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative z-[90] bg-navy py-20 lg:py-28">
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-12">
          <div>
            <span className="font-mono-label text-gold block mb-3">From the Blog</span>
            <h2 className="font-display font-bold text-white text-[clamp(28px,3vw,48px)]">
              Latest Insights
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden sm:flex border-white/20 text-white hover:bg-white/10 rounded-full gap-2"
          >
            <Link to="/blog">
              All Articles <ArrowRight size={15} />
            </Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <div
              key={post.id}
              ref={el => { cardsRef.current[i] = el; }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full block"
              >
                {/* Cover */}
                <div className="relative h-44 overflow-hidden bg-white/5">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/10 to-transparent">
                      <span className="text-gold/20 text-5xl font-display font-bold">{post.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                  <span className="absolute top-3 left-3 font-mono-label text-xs bg-gold/20 text-gold border border-gold/20 rounded-full px-2.5 py-0.5">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-white leading-snug group-hover:text-gold transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <Clock size={11} />
                      <span>{readTime(post.content)} min · {formatDate(post.created_at)}</span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile "all articles" CTA */}
        <div className="sm:hidden mt-8 text-center">
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full gap-2">
            <Link to="/blog">All Articles <ArrowRight size={15} /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
