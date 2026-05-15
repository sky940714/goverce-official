import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Wallet, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 💡 調整滾動後的背景顏色
  const navBaseColor = "#1A1A1A"; 

  const isGoCorePage = location.pathname === '/go-core';
  const CONSOLE_LOGIN_URL = "https://me.goverce.com/login";
  const LINE_URL = "https://lin.ee/NOt2H1p";

  useEffect(() => {
    const token = localStorage.getItem('goverce_token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('goverce_token');
    localStorage.removeItem('user_email');
    setIsLoggedIn(false);
    navigate('/');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // 判斷滾動超過 50px 才觸發變色，符合 USPACE 體感
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    if (id === 'line') {
      window.open(LINE_URL, '_blank');
      return;
    }
    if (location.pathname !== '/') {
      navigate(`/?scroll=${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'GoEat', zh: '吃啥', id: 'go-eat' },
    { name: 'GoPrime', zh: '美業配對', id: 'go-prime' },
    { name: 'GoSoul', zh: '空間掃描', id: 'go-soul' },
    { name: 'GoCore', zh: '一站式API', id: 'go-core' },
    { name: '更多資訊', zh: 'INFO', id: 'footer' },
  ];

  return (
    <nav 
      style={{ 
        // 核心修改：在頂端時透明 (transparent)，下滑後變色
        backgroundColor: scrolled ? navBaseColor : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none'
      }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? 'py-4 shadow-2xl border-b border-white/5' 
          : 'py-10 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-10 flex justify-between items-center">
        
        <Link to="/" className="z-[101]">
          <motion.h2 
            className="text-3xl md:text-4xl font-black italic tracking-tighter flex items-center gap-2 text-white"
            whileHover={{ scale: 1.02 }}
          >
            GO<span className="text-[#FF6B00]">VERCE</span>
            <span className="not-italic text-[10px] bg-[#FF6B00] text-white px-2 py-0.5 rounded font-bold tracking-widest uppercase">
              Official
            </span>
          </motion.h2>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="group px-5 py-2 flex items-center transition-all"
              >
                <span className="text-[17px] font-black tracking-tight text-white group-hover:text-[#FF6B00]">
                  {link.name}
                </span>
                {/* 漸層分隔線優化 */}
                <div className="mx-4 h-4 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <span className="text-[14px] font-medium text-gray-400 group-hover:text-white transition-colors">
                  {link.zh}
                </span>
              </button>
            ))}

            <button
              onClick={() => handleNavClick('line')}
              className="ml-8 flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#06C755] text-white text-[15px] font-black tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#06C755]/20"
            >
              <MessageCircle size={20} fill="white" />
              官方賴
            </button>
          </div>

          {isGoCorePage && (
            <div className="flex items-center gap-6 ml-10 border-l border-white/10 pl-10">
              {!isLoggedIn ? (
                <a href={CONSOLE_LOGIN_URL} className="text-[15px] font-black text-white hover:text-[#FF6B00] transition-colors tracking-widest">
                  LOGIN
                </a>
              ) : (
                <div className="flex items-center gap-5 text-white">
                  <div className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10">
                    <Wallet size={20} className="text-[#FF6B00]" />
                    <span className="text-[14px] font-black tracking-widest">1,000 PTS</span>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-all">
                    <LogOut size={24} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="lg:hidden z-[101] p-3 text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 1, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed top-0 left-0 w-full h-screen bg-[#0A0A0A] z-[100] flex flex-col pt-40 px-12"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="flex items-center justify-between border-b border-white/5 pb-8"
                >
                  <span className="text-5xl font-black italic text-white uppercase tracking-tighter">{link.name}</span>
                  <span className="text-2xl font-bold text-[#FF6B00]">{link.zh}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;