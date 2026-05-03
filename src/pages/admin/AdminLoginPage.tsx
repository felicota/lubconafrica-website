import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ADMIN_EMAIL = 'secretfelicotaita@gmail.com';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    setLoading(false);
    if (error) {
      toast.error('Incorrect password. Please try again.');
    } else {
      navigate('/admin/posts');
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="font-display text-2xl font-bold text-white">
            Lubcon<span className="text-gold"> Africa</span>
          </a>
          <p className="text-white/40 text-sm mt-2 font-mono-label">Admin Panel</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-6 mx-auto">
            <Lock className="w-5 h-5 text-gold" />
          </div>
          <h1 className="text-white font-display text-xl font-semibold text-center mb-6">
            Sign in to continue
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-mono-label text-white/40 block mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-gold pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-full py-3"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        </div>

        <p className="text-white/20 text-xs text-center mt-6">
          <a href="/" className="hover:text-white/50 transition-colors">← Back to site</a>
        </p>
      </div>
    </div>
  );
}
