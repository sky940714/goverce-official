import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, CheckCircle2, Loader2, ChevronLeft } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('密碼兩次輸入不一致');
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://45.32.17.214:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('註冊成功！系統已撥入 1000 贈點。');
        navigate('/login');
      } else {
        setError(data.error || '註冊失敗');
      }
    } catch (err) {
      setError('伺服器連線異常');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-[480px]"
      >
        <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-100">
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-gray-300 hover:text-indigo-600 transition-colors mb-8 text-xs font-black tracking-widest">
            <ChevronLeft size={16} /> 返回登入
          </button>

          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tighter italic mb-3">
              JOIN <span className="text-[#FF6B00]">GOVERCE</span>
            </h1>
            <p className="text-gray-400 font-bold text-sm leading-relaxed">
              開啟您的智慧商業生態。註冊即領取 <span className="text-indigo-600">1,000</span> 免費運算點數。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-4 focus:ring-[#FF6B00]/10 transition-all outline-none"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="password"
                required
                placeholder="CREATE PASSWORD"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-4 focus:ring-[#FF6B00]/10 transition-all outline-none"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="relative">
              <CheckCircle2 className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="password"
                required
                placeholder="CONFIRM PASSWORD"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-4 focus:ring-[#FF6B00]/10 transition-all outline-none"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            {error && <p className="text-red-500 text-xs font-black text-center">{error}</p>}

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-5 rounded-[2.2rem] font-black text-sm tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>CREATE ACCOUNT <UserPlus size={18} /></>}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-[10px] text-gray-300 font-bold tracking-widest leading-loose">
            點擊註冊代表您同意 Goverce 的<br/> 服務條款 與 隱私權政策
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;