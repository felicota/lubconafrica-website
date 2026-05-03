import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Post } from '@/types/blog';
import { BLOG_CATEGORIES } from '@/types/blog';
import { ArrowRight, Search, Clock } from 'lucide-react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';

const readTime = (content: string) => Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200));
const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const BlogCard = ({ post }: { post: Post }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col"
  >
    <div className="relative h-48 overflow-hidden bg-white/5">
      {post.cover_image ? (
        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white/10 text-5xl font-display font-bold">{post.title.charAt(0)}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
      <span className="absolute top-3 left-3 font-mono-label text-xs bg-gold/20 text-gold border border-gold/20 rounded-full px-3 py-1">
        {post.category}
      </span>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-display font-semibold text-white text-lg leading-snug group-hover:text-gold transition-colors line-clamp-2 mb-2">
        {post.title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">{post.excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/30 text-xs">
          <Clock size={12} />
          <span>{readTime(post.content)} min read</span>
          <span>·</span>
          <span>{formatDate(post.created_at)}</span>
        </div>
        <ArrowRight size={15} className="text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </div>
  </Link>
);

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data: postData }) => { setPosts(postData || []); setLoading(false); });
  }, []);

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const categories = ['All', ...BLOG_CATEGORIES.filter(c => posts.some(p => p.category === c))];

  return (
    <div className="relative bg-navy min-h-screen">
      <div className="noise-overlay" />
      <Navigation alwaysScrolled />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-[6vw]">
        <div className="max-w-2xl">
          <span className="font-mono-label text-gold block mb-4">Knowledge Base</span>
          <h1 className="font-display font-bold text-white text-[clamp(36px,4vw,64px)] leading-tight mb-4">
            Industry Insights &amp; Guides
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Technical articles, product guides, and expertise from the LUBCON Africa team.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-[6vw] pb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono-label text-xs rounded-full px-4 py-1.5 border transition-all ${
                  activeCategory === cat
                    ? 'bg-gold text-navy-dark border-gold'
                    : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="w-full h-9 bg-white/5 border border-white/10 rounded-full pl-8 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 lg:px-[6vw] pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-72 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => <BlogCard key={post.id} post={post} />)}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
