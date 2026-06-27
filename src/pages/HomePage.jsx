import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ChevronDown, ArrowRight, Search, BarChart2, FileText } from 'lucide-react';

const HomePage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: 'easeOut' },
  };

  return (
    <div className="bg-white text-[#1A1A1A] font-sans selection:bg-[#FF6B00] selection:text-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 bg-[#0A0A0A]">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
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
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 z-10 cursor-pointer"
          onClick={() => document.getElementById('ai-audit-cta').scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={48} className="text-[#FF6B00] drop-shadow-lg" />
        </motion.div>
      </section>

      {/* ── AI Audit CTA ── */}
      <section id="ai-audit-cta" className="py-28 md:py-40 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-8">

          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-4 py-1.5 rounded-full mb-6">
              <span className="text-[#FF6B00] font-black text-xs tracking-widest uppercase">免費工具</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-6 leading-tight">
              你的店，<br className="md:hidden" />AI 找得到嗎？
            </h2>
            <p className="text-gray-500 text-xl md:text-2xl font-medium max-w-xl mx-auto">
              輸入店名，30 秒取得免費 AI 能見度健檢報告
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
            {/* Feature tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['完全免費', '不需有官網', '30 秒出報告', 'ChatGPT · Claude · Perplexity 全測'].map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-600 font-black text-sm px-4 py-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Mock report preview */}
            <div className="bg-[#0A0A0A] rounded-3xl p-8 mb-8 shadow-2xl border border-white/5">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-red-500/40 bg-red-500/10 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-black text-red-400 leading-none">32</span>
                  <span className="text-gray-600 text-xs font-bold mt-1">/100</span>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-black tracking-widest uppercase mb-1">AI 能見度分數</p>
                  <p className="text-white font-black text-lg md:text-xl leading-tight">嚴重不足，AI 幾乎找不到你</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'AI 認不認識你',   score: 8,  max: 25, s: 'red'    },
                  { label: 'AI 找不找得到你', score: 5,  max: 25, s: 'red'    },
                  { label: '別人怎麼說你',     score: 14, max: 25, s: 'yellow' },
                  { label: '內容寫得清不清楚', score: 5,  max: 25, s: 'red'    },
                ].map(cat => (
                  <div
                    key={cat.label}
                    className={`rounded-xl p-3 border ${
                      cat.s === 'red'
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                  >
                    <p className="text-white text-xs font-bold mb-2 leading-snug">{cat.label}</p>
                    <p className={`text-xl font-black ${cat.s === 'red' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {cat.score}<span className="text-gray-600 text-xs font-bold">/{cat.max}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works — 3 steps */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { Icon: Search,   step: '01', text: '輸入店名與地區' },
                { Icon: BarChart2, step: '02', text: 'AI 自動分析能見度' },
                { Icon: FileText,  step: '03', text: '取得改善行動清單' },
              ].map(({ Icon, step, text }) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-[#FF6B00]" />
                  </div>
                  <p className="text-[10px] font-black text-[#FF6B00] tracking-widest mb-1">{step}</p>
                  <p className="text-sm font-black text-[#1A1A1A] leading-tight">{text}</p>
                </div>
              ))}
            </div>

            <Link
              to="/ai-audit"
              className="w-full bg-[#1A1A1A] text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#FF6B00] transition-all shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
            >
              免費健檢我的店 <ArrowRight size={22} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section id="vision" className="py-32 md:py-48 px-6 bg-[#0F0F0F] text-white relative z-20 border-t border-white/5 rounded-t-[5rem] md:rounded-t-[15rem]">
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

      {/* ── Footer ── */}
      <footer id="footer" className="bg-[#0A0A0A] text-white py-24 md:py-32 px-8 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20 text-center md:text-left">
          <div className="max-w-md space-y-6">
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter">GO<span className="text-[#FF6B00]">VERCE</span></h2>
            <p className="text-gray-400 text-lg md:text-xl font-bold leading-relaxed">
              Founded by Jerry / Skyler.<br />
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
};

export default HomePage;
