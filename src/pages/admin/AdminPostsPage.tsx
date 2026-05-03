import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Post } from '@/types/blog';
import { toast } from 'sonner';
import { PenLine, Plus, Trash2, Eye, EyeOff, ArrowLeft, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPostsPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (!sessionData.session) navigate('/admin');
    });
    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error('Failed to load posts');
    else setPosts(data || []);
    setLoading(false);
  };

  const togglePublish = async (post: Post) => {
    const { error } = await supabase
      .from('posts')
      .update({ published: !post.published })
      .eq('id', post.id);
    if (error) {
      toast.error('Update failed');
    } else {
      toast.success(post.published ? 'Post unpublished' : 'Post published');
      fetchPosts();
    }
  };

  const deletePost = async (post: Post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('posts').delete().eq('id', post.id);
    if (error) toast.error('Delete failed');
    else { toast.success('Post deleted'); fetchPosts(); }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen bg-navy">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-navy/95 backdrop-blur sticky top-0 z-50">
        <div className="px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display font-bold text-white text-lg">
              Lubcon<span className="text-gold"> Africa</span>
            </a>
            <span className="text-white/20">/</span>
            <span className="font-mono-label text-white/50">Blog Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full text-sm px-4 h-9"
            >
              <Link to="/admin/posts/new">
                <Plus size={15} className="mr-1.5" /> New Post
              </Link>
            </Button>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-10 py-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">All Posts</h1>
            <p className="text-white/40 text-sm mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
          </div>
          <Link to="/" className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
            <ArrowLeft size={14} /> Back to site
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
            <PenLine className="w-10 h-10 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 mb-4">No posts yet</p>
            <Button asChild className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full">
              <Link to="/admin/posts/new"><Plus size={15} className="mr-1.5" /> Write first post</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div
                key={post.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-white/20 transition-colors"
              >
                {/* Cover thumbnail */}
                <div className="w-14 h-14 rounded-lg bg-white/10 flex-shrink-0 overflow-hidden">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PenLine size={18} className="text-white/20" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/30 text-xs">{formatDate(post.created_at)}</span>
                    <span className="text-white/20">·</span>
                    <span className="text-white/30 text-xs">{post.category}</span>
                    <span className="text-white/20">·</span>
                    <span className={`text-xs font-medium ${post.published ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {post.published ? '● Live' : '○ Draft'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => togglePublish(post)}
                    title={post.published ? 'Unpublish' : 'Publish'}
                    className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <Link
                    to={`/admin/posts/edit/${post.id}`}
                    className="p-2 rounded-lg text-white/40 hover:text-gold hover:bg-gold/10 transition-colors"
                  >
                    <PenLine size={16} />
                  </Link>
                  <button
                    onClick={() => deletePost(post)}
                    className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
