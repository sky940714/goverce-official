'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAuditPage = pathname.startsWith('/ai-audit');
  const forceDark = isAuditPage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showDarkBg = forceDark || scrolled;

  return (
    <nav
      style={{
        backgroundColor: showDarkBg ? '#1A1A1A' : 'transparent',
        backdropFilter: showDarkBg ? 'blur(20px)' : 'none',
      }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        showDarkBg
          ? 'py-4 shadow-2xl border-b border-white/5'
          : 'py-10 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-10 flex justify-between items-center">
        <Link href="/" className="z-[101]">
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

        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/ai-audit"
            className="flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-2.5 rounded-full font-black text-sm tracking-widest hover:bg-[#e85f00] transition-all shadow-lg shadow-[#FF6B00]/20 hover:scale-105 active:scale-95"
          >
            免費 AI 健檢
          </Link>
        </div>

        <button
          className="lg:hidden z-[101] p-3 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
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
            <Link
              href="/ai-audit"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between border-b border-white/5 pb-8"
            >
              <span className="text-5xl font-black italic text-white uppercase tracking-tighter">AI 健檢</span>
              <span className="text-2xl font-bold text-[#FF6B00]">免費</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
