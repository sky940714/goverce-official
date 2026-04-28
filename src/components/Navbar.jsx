import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 監聽捲動，改變導覽列背景透明度
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 處理點擊導覽項目的邏輯
  const handleNavClick = (id) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      // 如果不在首頁，先跳轉回首頁並帶上參數
      navigate(`/?scroll=${id}`);
    } else {
      // 如果在首頁，直接捲動
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
      scrolled ? 'py-4 bg-white/70 backdrop-blur-lg border-b border-gray-100' : 'py-6 bg-transparent'
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm font-bold tracking-widest text-gray-500 hover:text-[#FF6B00] transition-colors"
            >
              {link.name}
            </button>
          ))}
          <Link 
            to="/go-core" 
            className="ml-4 bg-black text-white px-6 py-2.5 rounded-full text-xs font-black tracking-widest hover:bg-[#FF6B00] transition-all shadow-lg shadow-gray-200"
          >
            GET TOKENS
          </Link>
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
            className="absolute top-0 left-0 w-full h-screen bg-white z-[100] flex flex-col justify-center items-center gap-8 px-10"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-4xl font-black italic tracking-tighter hover:text-[#FF6B00] transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Link 
              to="/go-core"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center bg-[#FF6B00] text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-2"
            >
              BUY TOKENS <ChevronRight />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;