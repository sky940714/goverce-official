import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://45.32.17.214:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('goverce_token', data.token);
        localStorage.setItem('user_email', data.user.email);
        navigate('/go-core'); // 登入後直達核心方案頁
      } else {
        setError(data.error || '登入失敗，請檢查帳密');
      }
    } catch (err) {
      setError('無法連線至伺服器，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px]"
      >
        {/* Claymorphism Card */}
        <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10">
            <div className="mb-10 text-center">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-indigo-200"
              >
                <Sparkles size={32} />
              </motion.div>
              <h1 className="text-3xl font-black tracking-tighter italic mb-2">
                WELCOME <span className="text-indigo-600">BACK</span>
              </h1>
              <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">您的運算燃料已準備就緒</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email"
                    required
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password"
                    required
                    placeholder="PASSWORD"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-black text-center">
                  {error}
                </motion.p>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#1A1A1A] text-white py-5 rounded-[2rem] font-black text-sm tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>START ENGINE <ArrowRight size={18} /></>}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-gray-400 text-xs font-bold tracking-widest">
                還沒有帳號？{' '}
                <Link to="/register" className="text-indigo-600 underline underline-offset-4 hover:text-indigo-400 transition-colors">
                  立即註冊並領取 1000 PTS
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;