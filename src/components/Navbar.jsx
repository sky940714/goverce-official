import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, LogOut, Wallet, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isGoCorePage = location.pathname === '/go-core';
  const CONSOLE_LOGIN_URL = "https://me.goverce.com/login";
  const LINE_URL = "https://lin.ee/NOt2H1p"; // 您的官方 LINE 連結

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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
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
    { name: 'GO EAT', id: 'go-eat' },
    { name: 'GO PRIME', id: 'go-prime' },
    { name: 'GO SOUL', id: 'go-soul' },
    { name: 'GO CORE', id: 'go-core' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="z-[101]">
          <motion.h2 
            className="text-2xl font-black italic tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            GO<span className="text-[#FF6B00]">VERCE</span>
          </motion.h2>
        </Link>

        {/* Desktop Links & Auth */}
        <div className="hidden md:flex items-center gap-8">
          <div className={`flex items-center gap-6 ${isGoCorePage ? 'pr-6 border-r border-gray-100' : ''}`}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-[13px] font-bold tracking-widest text-gray-400 hover:text-[#FF6B00] transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* 右側功能區：包含 LINE 與 Auth */}
          <div className="flex items-center gap-5">
            {/* 官方 LINE 連結 (桌面版) */}
            <motion.a
              href={LINE_URL}
              target="_blank"
              rel="noreferrer"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF6B00]/30 text-[#FF6B00] text-[11px] font-black tracking-widest hover:bg-[#FF6B00] hover:text-white transition-all shadow-sm"
            >
              <MessageCircle size={14} />
              OFFICIAL LINE
            </motion.a>

            {isGoCorePage && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-5"
              >
                {!isLoggedIn ? (
                  <>
                    <a 
                      href={CONSOLE_LOGIN_URL}
                      className="text-sm font-black tracking-widest text-gray-900 hover:text-[#FF6B00] transition-colors"
                    >
                      LOGIN
                    </a>
                    <a 
                      href={CONSOLE_LOGIN_URL} 
                      className="bg-black text-white px-7 py-2.5 rounded-full text-[11px] font-black tracking-[0.2em] hover:bg-[#FF6B00] transition-all shadow-xl shadow-gray-200 active:scale-95"
                    >
                      REGISTER
                    </a>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 group">
                      <Wallet size={16} className="text-[#FF6B00]" />
                      <span className="text-[11px] font-black tracking-widest">1,000 <span className="text-gray-400 font-bold">PTS</span></span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="安全登出"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-[101] p-2 text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-white z-[100] flex flex-col justify-center items-center px-10"
          >
            {/* 官方 LINE 連結 (手機版置頂) */}
            <motion.a
              href={LINE_URL}
              target="_blank"
              rel="noreferrer"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mb-12 flex items-center gap-3 bg-[#06C755] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg"
            >
              <MessageCircle size={24} />
              私訊官方 LINE 領取額度
            </motion.a>

            <div className="flex flex-col items-center gap-8 mb-12">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-4xl font-black italic tracking-tighter hover:text-[#FF6B00] transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {isGoCorePage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full space-y-4 max-w-xs"
              >
                {!isLoggedIn ? (
                  <>
                    <a 
                      href={CONSOLE_LOGIN_URL}
                      onClick={() => setIsOpen(false)}
                      className="w-full py-5 bg-[#FF6B00] text-white rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-2xl shadow-[#FF6B00]/20"
                    >
                      立即註冊 <ChevronRight />
                    </a>
                    <a 
                      href={CONSOLE_LOGIN_URL}
                      onClick={() => setIsOpen(false)}
                      className="w-full py-5 bg-gray-50 text-gray-900 rounded-2xl font-black text-xl flex items-center justify-center"
                    >
                      登入帳號
                    </a>
                  </>
                ) : (
                  <button 
                    onClick={handleLogout}
                    className="w-full py-5 bg-red-50 text-red-500 rounded-2xl font-black text-xl flex items-center justify-center gap-2"
                  >
                    <LogOut /> 安全登出
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;