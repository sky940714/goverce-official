import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, ChevronDown, ChevronLeft, ChevronRight, ChevronRight as ArrowRightIcon, Cpu, Sparkles } from 'lucide-react';

// --- 輪播組件 (優化：增加陰影與圓角質感) ---
const ProductCarousel = ({ folder }) => {
  const [index, setIndex] = useState(0);
  
  const images = [
    new URL(`../assets/${folder}/1.jpg`, import.meta.url).href,
    new URL(`../assets/${folder}/2.jpg`, import.meta.url).href,
    new URL(`../assets/${folder}/3.jpg`, import.meta.url).href,
    new URL(`../assets/${folder}/4.jpg`, import.meta.url).href,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextStep = () => setIndex((prev) => (prev + 1) % images.length);
  const prevStep = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-square group overflow-hidden rounded-[2.5rem] bg-gray-50 shadow-2xl border border-gray-100/50 transition-all duration-500 hover:scale-[1.01]">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full object-cover"
          alt={`${folder} preview`}
        />
      </AnimatePresence>

      <button 
        onClick={prevStep}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:bg-[#FF6B00] hover:text-white hidden md:block"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={nextStep}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:bg-[#FF6B00] hover:text-white hidden md:block"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 transition-all duration-300 rounded-full ${i === index ? 'w-8 bg-[#FF6B00]' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const scrollToId = searchParams.get('scroll');
    if (scrollToId) {
      setTimeout(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200); 
    }
  }, [searchParams]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-white text-[#1A1A1A] font-sans selection:bg-[#FF6B00] selection:text-white overflow-x-hidden">
      
      {/* 1. Hero Section (大改優化) */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 bg-[#0A0A0A]">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.7, scale: 1 }} 
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{ 
            backgroundImage: "url('/hero-bg.jpg')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'none' // 已移除灰階
          }}
        />
        
        {/* 深色漸層遮罩，增加文字可讀性 */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/40" />

        <motion.div className="z-10 text-center relative max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-8 flex items-center justify-center gap-4"
          >
            <div className="h-[2px] w-12 bg-[#FF6B00]" />
            <span className="text-2xl md:text-[32px] font-black tracking-[0.4em] text-white drop-shadow-md uppercase">
              創生科技
            </span>
            <div className="h-[2px] w-12 bg-[#FF6B00]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[14rem] font-black tracking-tighter leading-none text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          >
            GO<span className="text-[#FF6B00]">VERCE</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-xl md:text-3xl tracking-[0.5em] font-extrabold text-white/90 uppercase drop-shadow-lg"
          >
            Connecting Future & Life
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 space-y-6"
          >
            <p className="text-lg md:text-2xl font-bold tracking-[0.1em] text-gray-200 leading-relaxed px-4 max-w-3xl mx-auto">
              提供 <span className="text-[#FF6B00] border-b-2 border-[#FF6B00]">AI 自動化工具</span> 研發方案
              <br className="hidden md:block" />
              整合 <span className="text-white font-black">GO EAT</span> 美食配對與 <span className="text-white font-black">GO PRIME</span> 美業服務系統
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 z-10 cursor-pointer"
          onClick={() => document.getElementById('go-eat').scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={48} className="text-[#FF6B00] drop-shadow-lg" />
        </motion.div>
      </section>

      {/* 2. Optimized Products Section */}
      <section className="py-24 md:py-40 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div {...fadeInUp} className="mb-24 md:mb-32 text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight italic">Our Product</h2>
            <p className="text-[#FF6B00] font-black tracking-[0.6em] text-lg mb-8">核心服務體系</p>
            <div className="w-24 md:w-40 h-2 bg-[#FF6B00] mx-auto rounded-full"></div>
          </motion.div>

          {/* GO EAT Section */}
          <section id="go-eat" className="flex flex-col lg:flex-row items-center gap-16 md:gap-24 mb-40 md:mb-60 scroll-mt-32">
            <motion.div {...fadeInUp} className="w-full lg:flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 px-4 py-2 rounded-full">
                <Sparkles size={18} className="text-[#FF6B00]" />
                <span className="text-[#FF6B00] font-black tracking-widest text-sm uppercase">F&B Management</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter">GO EAT | 饗導</h3>
              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-medium">
                專為餐飲與行銷設計的系統。我們重新定義經營邏輯，<span className="text-black font-black underline decoration-[#FF6B00] decoration-4 underline-offset-4">解決客源來源問題</span>，讓美味透過配對精準傳遞。
              </p>
              <div className="flex pt-4">
                <Link 
                  to="/go-eat" 
                  className="w-full md:w-auto text-center bg-[#1A1A1A] text-white px-12 py-6 rounded-full font-black text-lg flex items-center justify-center hover:bg-[#FF6B00] transition-all shadow-2xl hover:-translate-y-1"
                >
                  服務詳細介紹 <ArrowRightIcon size={22} className="ml-3" />
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="w-full lg:flex-1">
              <ProductCarousel folder="goeat" />
            </motion.div>
          </section>

          {/* GO PRIME Section */}
          <section id="go-prime" className="flex flex-col-reverse lg:flex-row items-center gap-16 md:gap-24 mb-40 md:mb-60 scroll-mt-32">
            <motion.div {...fadeInUp} className="w-full lg:flex-1">
              <ProductCarousel folder="goprime" />
            </motion.div>
            <motion.div {...fadeInUp} className="w-full lg:flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
                <span className="text-gray-500 font-black tracking-widest text-sm uppercase">Beauty & Lifestyle</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-right lg:text-left">GO PRIME | 極致</h3>
              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-medium text-right lg:text-left">
                高端美業與生活服務的預約解決方案。透過 AI 排程與行為分析，打造極致的消費動線，實現服務價值的最大化。
              </p>
              <div className="flex justify-end lg:justify-start pt-4">
                <span className="inline-block bg-gray-100 text-gray-400 px-8 py-3 rounded-full font-black uppercase text-sm tracking-[0.2em] border border-gray-200">
                  In Development
                </span>
              </div>
            </motion.div>
          </section>

          {/* GO SOUL Section */}
          <section id="go-soul" className="flex flex-col lg:flex-row items-center gap-16 md:gap-24 mb-40 md:mb-60 scroll-mt-32">
            <motion.div {...fadeInUp} className="w-full lg:flex-1 space-y-8">
              <span className="text-[#FF6B00] font-black tracking-widest text-sm uppercase">Digital Soul</span>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter">GO SOUL | 視界</h3>
              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-medium">
                空間展示的數位革命。運用頂尖 3DGS 技術，僅需手機錄影即可 1:1 還原真實光影與格局。為房產與旅宿業打造沉浸式導覽，讓客戶隨時隨地走進現場，感受最真實的細節與美感。
              </p>
              <div className="flex pt-4">
                <Link 
                  to="/go-soul" 
                  className="w-full md:w-auto text-center bg-[#1A1A1A] text-white px-12 py-6 rounded-full font-black text-lg flex items-center justify-center hover:bg-[#FF6B00] transition-all shadow-2xl hover:shadow-[0_20px_50px_rgba(255,107,0,0.3)] hover:-translate-y-1 active:scale-95"
                >
                  服務詳細介紹 <ArrowRightIcon size={22} className="ml-3" />
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="w-full lg:flex-1">
              <ProductCarousel folder="gosoul" />
            </motion.div>
          </section>

          {/* GO CORE Section */}
          <section id="go-core" className="flex flex-col-reverse lg:flex-row items-center gap-16 md:gap-24 mb-10 scroll-mt-32">
            <motion.div {...fadeInUp} className="w-full lg:flex-1">
              <ProductCarousel folder="gocore" />
            </motion.div>
            <motion.div {...fadeInUp} className="w-full lg:flex-1 space-y-8">
              <span className="text-[#FF6B00] font-black tracking-widest text-sm uppercase">Developer Ecosystem</span>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter">GO CORE | 核心</h3>
              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-medium">
                拒絕訂閱制浪費！透過 <span className="text-black font-black">GO CORE Token</span> 釋放 AI 的無限潛能。這是為工程師與企業設計的強大 API 服務，用多少算多少。
              </p>
              <div className="flex pt-6">
                <Link 
                  to="/go-core" 
                  className="w-full md:w-auto text-center bg-[#FF6B00] text-white px-12 py-6 rounded-full font-black text-xl flex items-center justify-center hover:shadow-[0_15px_40px_rgba(255,107,0,0.4)] hover:scale-105 transition-all active:scale-95"
                >
                  進入主站與方案計算 <Cpu size={24} className="ml-3" />
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </section>

      {/* 3. Vision Section (增強背景質感) */}
      <section className="py-32 md:py-48 px-6 bg-[#0F0F0F] text-white rounded-t-[5rem] md:rounded-t-[15rem] relative z-20 border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 {...fadeInUp} className="text-5xl md:text-8xl font-black mb-12 tracking-widest text-white uppercase italic">Core Vision</motion.h2>
          <motion.p {...fadeInUp} className="text-2xl md:text-3xl font-bold leading-relaxed mb-20 opacity-90 px-4">
            我們相信數據的力量，更相信科技應該服務於人。<br className="hidden md:block" />
            透過 AI 與自動化流程，我們致力於打破傳統商業的高門檻。
          </motion.p>
          
          <motion.div {...fadeInUp} className="bg-white/5 border border-white/10 p-12 md:p-20 rounded-[4rem] backdrop-blur-2xl shadow-inner relative group overflow-hidden">
            <div className="absolute inset-0 bg-[#FF6B00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-3xl md:text-5xl font-black mb-8 text-[#FF6B00] relative z-10">招募夥伴 Join Us</h3>
            <p className="mb-12 text-gray-300 text-xl md:text-2xl font-medium relative z-10">如果你對 AI 應用、開發或餐飲科技有熱忱，歡迎加入我們。</p>
            <button className="relative z-10 w-full md:w-auto bg-white text-black px-16 py-6 rounded-full text-2xl font-black hover:bg-[#FF6B00] hover:text-white transition-all shadow-xl active:scale-95">
              了解職缺
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. Footer (文字加深，層次分明) */}
      <footer className="bg-[#0A0A0A] text-white py-24 md:py-32 px-8 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20 text-center md:text-left">
          <div className="max-w-md space-y-6">
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter">GO<span className="text-[#FF6B00]">VERCE</span></h2>
            <p className="text-gray-400 text-lg md:text-xl font-bold leading-relaxed">
              Founded by Jerry / Skyler.<br/>
              致力於 Goverce 生態系的跨域整合與商業自動化。
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="text-2xl font-black uppercase tracking-[0.3em] text-[#FF6B00]">Connect</h4>
            <div className="flex items-center justify-center md:justify-start gap-6 text-white hover:text-[#FF6B00] transition-colors cursor-pointer group">
              <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#FF6B00]/20 transition-all">
                <Mail size={32} className="group-hover:text-[#FF6B00]" />
              </div>
              <span className="text-xl md:text-3xl font-mono font-black tracking-tight">goverce.714@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-24 pt-12 text-center text-sm font-black opacity-40 tracking-[0.5em]">
          © 2026 GOVERCE ECOSYSTEM. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;