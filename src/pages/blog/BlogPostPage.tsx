import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Post } from '@/types/blog';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';

const readTime = (content: string) => Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200));
const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error || !data) { navigate('/blog'); return; }
      setPost(data);
      setLoading(false);

      // fetch related posts (same category, exclude current)
      const { data: rel } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .eq('category', data.category)
        .neq('id', data.id)
        .limit(3);
      setRelated(rel || []);
    })();
  }, [slug, navigate]);

  if (loading) return (
    <div className="relative bg-navy min-h-screen">
      <div className="noise-overlay" />
      <Navigation alwaysScrolled />
      <div className="pt-32 px-6 lg:px-[6vw] max-w-3xl mx-auto">
        <div className="h-8 bg-white/5 rounded animate-pulse mb-4 w-2/3" />
        <div className="h-4 bg-white/5 rounded animate-pulse mb-2" />
        <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
      </div>
    </div>
  );

  if (!post) return null;

  return (
    <div className="relative bg-navy min-h-screen">
      <div className="noise-overlay" />
      <Navigation alwaysScrolled />

      {/* Cover image */}
      {post.cover_image && (
        <div className="relative h-64 lg:h-96 overflow-hidden">
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        </div>
      )}

      {/* Article */}
      <article className="relative px-6 lg:px-[6vw] max-w-3xl mx-auto pb-24">
        <div className={post.cover_image ? '-mt-24 relative z-10' : 'pt-32'}>
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span className="font-mono-label text-xs bg-gold/20 text-gold border border-gold/20 rounded-full px-3 py-1">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-white text-[clamp(28px,3.5vw,52px)] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{readTime(post.content)} min read</span>
            </div>
            <span>By {post.author}</span>
          </div>

          {/* Rendered content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-2 items-center">
              <Tag size={14} className="text-white/30" />
              {post.tags.map(tag => (
                <span key={tag} className="font-mono-label text-xs border border-white/10 text-white/40 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="px-6 lg:px-[6vw] pb-24 max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-white text-2xl mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(r => (
              <Link
                key={r.id}
                to={`/blog/${r.slug}`}
                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-300"
              >
                <div className="relative h-36 overflow-hidden bg-white/5">
                  {r.cover_image
                    ? <img src={r.cover_image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="w-full h-full flex items-center justify-center"><span className="text-white/10 text-3xl font-display font-bold">{r.title.charAt(0)}</span></div>
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-white text-sm leading-snug group-hover:text-gold transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="text-white/30 text-xs mt-2 flex items-center gap-1">
                    <Clock size={11} />{readTime(r.content)} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
