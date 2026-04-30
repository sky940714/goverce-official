import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, ChevronDown, ChevronLeft, ChevronRight, ChevronRight as ArrowRightIcon, Cpu } from 'lucide-react';

// --- 輪播組件 ---
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
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextStep = () => setIndex((prev) => (prev + 1) % images.length);
  const prevStep = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-square group overflow-hidden rounded-[2rem] bg-gray-50 shadow-inner border border-gray-100">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
          alt={`${folder} preview`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset }) => {
            if (offset.x > 100) prevStep();
            else if (offset.x < -100) nextStep();
          }}
        />
      </AnimatePresence>

      <button 
        onClick={prevStep}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextStep}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hidden md:block"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all rounded-full ${i === index ? 'w-6 bg-[#FF6B00]' : 'w-1.5 bg-black/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [searchParams] = useSearchParams();

  // 處理導覽列跨頁跳轉後的捲動
  useEffect(() => {
    const scrollToId = searchParams.get('scroll');
    if (scrollToId) {
      setTimeout(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // 稍微延遲確保組件已掛載
    }
  }, [searchParams]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="bg-white text-[#1A1A1A] font-sans selection:bg-[#FF6B00] selection:text-white overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }} 
          transition={{ duration: 2 }}
          style={{ 
            backgroundImage: "url('/hero-bg.jpg')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)' 
          }}
        />

        <motion.div className="z-10 text-center relative max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-4"
          >
            <span className="text-xl md:text-[40px] font-light tracking-[0.6em] md:tracking-[1.2em] text-gray-400 ml-[0.6em] md:ml-[1.2em] uppercase">
              創生科技
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="text-6xl md:text-[12rem] font-black tracking-tighter leading-none break-words"
          >
            GO<span className="text-[#FF6B00]">VERCE</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-lg md:text-2xl tracking-[0.2em] md:tracking-[0.4em] font-light text-gray-400 uppercase"
          >
            Connecting Future & Life
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-10 flex flex-col items-center"
          >
            <div className="h-[1px] w-12 bg-[#FF6B00] mb-6 opacity-60"></div>
            <p className="text-sm md:text-base font-extralight tracking-[0.1em] md:tracking-[0.2em] text-gray-500 leading-loose px-4">
              提供 <span className="text-black font-normal">AI 自動化工具</span> 研發方案
              <br className="md:hidden" />
              整合 <span className="text-black font-normal">GO EAT</span> 智慧餐飲與 <span className="text-black font-normal">GO PRIME</span> 極致服務系統
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 z-10"
        >
          <ChevronDown size={32} className="text-[#FF6B00]" />
        </motion.div>
      </section>

      {/* 2. Optimized Products Section */}
      <section className="py-20 md:py-32 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="mb-16 md:mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Our Product</h2>
            <p className="text-gray-400 font-light tracking-[0.4em] mb-6">我們的服務</p>
            <div className="w-16 md:w-20 h-1.5 bg-[#FF6B00] mx-auto"></div>
          </motion.div>

          {/* GO EAT Section */}
          <section id="go-eat" className="flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-32 md:mb-48 scroll-mt-32">
            <motion.div {...fadeInUp} className="w-full md:flex-1 space-y-6">
              <span className="text-[#FF6B00] font-bold tracking-widest text-xs md:text-sm uppercase">F&B Management</span>
              <h3 className="text-4xl md:text-5xl font-black">GO EAT | 饗導</h3>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
                專為餐飲與行銷設計的系統。我們重新定義經營邏輯，解決客源來源問題，讓美味透過配對精準傳遞。
              </p>
              <div className="flex pt-2">
                <Link 
                  to="/go-eat" 
                  className="w-full md:w-auto text-center bg-[#1A1A1A] text-white px-10 py-5 rounded-full font-bold flex items-center justify-center hover:bg-[#FF6B00] transition-all"
                >
                  服務詳細介紹 <ArrowRightIcon size={18} className="ml-2" />
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="w-full md:flex-1">
              <ProductCarousel folder="goeat" />
            </motion.div>
          </section>

          {/* GO PRIME Section */}
          <section id="go-prime" className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 mb-32 md:mb-48 scroll-mt-32">
            <motion.div {...fadeInUp} className="w-full md:flex-1">
              <ProductCarousel folder="goprime" />
            </motion.div>
            <motion.div {...fadeInUp} className="w-full md:flex-1 space-y-6">
              <span className="text-[#FF6B00] font-bold tracking-widest text-xs md:text-sm uppercase">Beauty & Lifestyle</span>
              <h3 className="text-4xl md:text-5xl font-black">GO PRIME | 極致</h3>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
                高端美業與生活服務的預約解決方案。透過 AI 排程與行為分析，打造極致的消費動線，實現服務價值的最大化。
              </p>
              <div className="pt-2">
                <span className="inline-block bg-gray-100 text-gray-400 px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest">In Development</span>
              </div>
            </motion.div>
          </section>

          {/* GO SOUL Section */}
          <section id="go-soul" className="flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-32 md:mb-48 scroll-mt-32">
            <motion.div {...fadeInUp} className="w-full md:flex-1 space-y-6">
              <span className="text-[#FF6B00] font-bold tracking-widest text-xs md:text-sm uppercase">Digital Soul</span>
              <h3 className="text-4xl md:text-5xl font-black">GO SOUL | 靈魂</h3>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
                數位生活美學的先行者。探索軟體與心靈的連結，讓科技不再冰冷，而是富有靈魂的陪伴。
              </p>
              <div className="pt-2 text-[#FF6B00] font-bold italic">
                Coming into your life soon...
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="w-full md:flex-1">
              <ProductCarousel folder="gosoul" />
            </motion.div>
          </section>

          {/* GO CORE Section - Token & API (已優化橘色版) */}
          <section id="go-core" className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 mb-10 scroll-mt-32">
            <motion.div {...fadeInUp} className="w-full md:flex-1">
              <ProductCarousel folder="gocore" />
            </motion.div>
            <motion.div {...fadeInUp} className="w-full md:flex-1 space-y-6">
              <span className="text-[#FF6B00] font-bold tracking-widest text-xs md:text-sm uppercase">Developer Ecosystem</span>
              <h3 className="text-4xl md:text-5xl font-black">GO CORE | 核心</h3>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
                拒絕訂閱制浪費！透過 GO CORE Token 釋放 AI 的無限潛能。這是為工程師與企業設計的強大 API 服務，用多少算多少，讓開發更純粹。
              </p>
              <div className="flex pt-4">
                <Link 
                  to="/go-core" 
                  className="w-full md:w-auto text-center bg-[#FF6B00] text-white px-10 py-5 rounded-full font-bold flex items-center justify-center hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:scale-105 transition-all"
                >
                  進入主站與方案計算 <Cpu size={18} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </section>

      {/* 3. Vision Section */}
      <section className="py-24 md:py-32 px-6 bg-[#1A1A1A] text-white rounded-t-[3rem] md:rounded-t-[10rem] relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-black mb-8 md:mb-10 tracking-widest text-white uppercase">Core Vision</motion.h2>
          <motion.p {...fadeInUp} className="text-lg md:text-2xl font-light leading-relaxed mb-12 md:mb-16 opacity-80 px-4">
            我們相信數據的力量，更相信科技應該服務於人。<br className="hidden md:block" />
            透過 AI 與自動化流程，我們致力於打破傳統商業的高門檻。
          </motion.p>
          
          <motion.div {...fadeInUp} className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] backdrop-blur-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#FF6B00]">招募夥伴 Join Us</h3>
            <p className="mb-8 md:mb-10 text-gray-400 text-sm md:text-lg">如果你對 AI 應用、開發或餐飲科技有熱忱，歡迎加入我們。</p>
            <button className="w-full md:w-auto bg-[#FF6B00] text-white px-10 py-4 md:py-5 rounded-full text-lg font-bold hover:scale-105 active:scale-95 transition-all">
              了解職缺
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-[#1A1A1A] text-white py-16 md:py-20 px-6 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16 text-center md:text-left">
          <div className="max-w-md">
            <h2 className="text-4xl font-black mb-6 tracking-tighter italic">GO<span className="text-[#FF6B00]">VERCE</span></h2>
            <p className="opacity-50 text-sm md:text-base leading-relaxed">
              Founded by Jerry / Skyler.<br/>
              致力於 Goverce 生態系的跨域整合與商業自動化。
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-6 uppercase tracking-widest text-white">Connect</h4>
            <div className="flex items-center justify-center md:justify-start gap-4 text-[#FF6B00] hover:text-white transition-colors cursor-pointer group">
              <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#FF6B00]">
                <Mail size={24} className="group-hover:text-white" />
              </div>
              <span className="text-sm md:text-lg font-mono">goverce.714@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-10 text-center text-[10px] opacity-30 tracking-widest">
          © 2026 GOVERCE ECOSYSTEM. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;