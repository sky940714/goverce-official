'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, ChevronDown, ArrowRight, Search, BarChart2, FileText, Zap, Eye, MessageSquare } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const HomePage = () => {
  return (
    <div className="bg-white text-[#1A1A1A] font-sans selection:bg-[#FF6B00] selection:text-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 bg-[#0A0A0A]">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        <motion.div className="z-10 text-center relative max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-10 bg-[#FF6B00]" />
            <span className="text-xs font-black tracking-[0.5em] text-[#FF6B00] uppercase">
              Goverce 創生科技 · GEO 生成式搜尋優化
            </span>
            <div className="h-[1px] w-10 bg-[#FF6B00]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-tight text-white mb-8"
          >
            你的店，<br />
            <span className="text-[#FF6B00]">ChatGPT</span> 說得出來嗎？
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-2xl text-white/70 font-medium leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            消費者問 AI 推薦附近的餐廳，你的競爭對手出現了，但你沒有。
            <br className="hidden md:block" />
            30 秒免費診斷你的 AI 能見度。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/ai-audit"
              className="bg-[#FF6B00] text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#e85f00] transition-all shadow-2xl shadow-[#FF6B00]/30 hover:-translate-y-1 active:scale-[0.98]"
            >
              免費測試 AI 能見度 <ArrowRight size={20} />
            </Link>
            <a
              href="#what-is-geo"
              className="border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:border-white/50 transition-all"
              onClick={e => { e.preventDefault(); document.getElementById('what-is-geo')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              什麼是 GEO？
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 z-10 cursor-pointer"
          onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={36} className="text-white/40" />
        </motion.div>
      </section>

      {/* ── 痛點說明 ── */}
      <section id="problem" className="py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full mb-6">
              <span className="text-red-500 font-black text-xs tracking-widest uppercase">台灣商家的 AI 危機</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
              95% 的台灣商家，<br />
              <span className="text-red-500">AI 幾乎找不到</span>
            </h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              搜尋習慣正在改變。越來越多消費者直接問 ChatGPT、Claude、Perplexity 找推薦，
              而不是打開 Google。但絕大多數商家從未針對這個新時代做過任何優化。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Eye,
                color: 'red',
                title: 'AI 不認識你',
                desc: '你的商家資訊不在 AI 的訓練資料或可引用的公開來源中，AI 系統根本不知道你存在。',
              },
              {
                Icon: Search,
                color: 'orange',
                title: 'AI 不推薦你',
                desc: '就算 AI 認識你，沒有足夠的正向評論與結構化資訊，AI 不會主動把你推薦給消費者。',
              },
              {
                Icon: MessageSquare,
                color: 'yellow',
                title: '別人說不到你',
                desc: '在 Dcard、PTT、部落格、社群上幾乎沒有人討論你，讓 AI 無從驗證你的存在與口碑。',
              },
            ].map(({ Icon, color, title, desc }) => (
              <motion.div
                key={title}
                {...fadeInUp}
                className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  color === 'red' ? 'bg-red-50' : color === 'orange' ? 'bg-[#FF6B00]/10' : 'bg-yellow-50'
                }`}>
                  <Icon size={24} className={
                    color === 'red' ? 'text-red-500' : color === 'orange' ? 'text-[#FF6B00]' : 'text-yellow-500'
                  } />
                </div>
                <h3 className="text-xl font-black mb-3">{title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 免費健檢 CTA ── */}
      <section id="ai-audit-cta" className="py-28 md:py-40 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-4 py-1.5 rounded-full mb-6">
              <span className="text-[#FF6B00] font-black text-xs tracking-widest uppercase">免費工具</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
              先診斷，再決定
            </h2>
            <p className="text-gray-500 text-xl font-medium max-w-xl mx-auto">
              輸入店名，30 秒取得免費 AI 能見度健檢報告
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['完全免費', '不需有官網', '30 秒出報告', 'ChatGPT · Claude · Perplexity 全測'].map(tag => (
                <span key={tag} className="bg-white border border-gray-200 text-gray-600 font-black text-sm px-4 py-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

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
                      cat.s === 'red' ? 'bg-red-500/10 border-red-500/30' : 'bg-yellow-500/10 border-yellow-500/30'
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

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { Icon: Search,    step: '01', text: '輸入店名與地區' },
                { Icon: BarChart2, step: '02', text: 'AI 自動分析能見度' },
                { Icon: FileText,  step: '03', text: '取得改善行動清單' },
              ].map(({ Icon, step, text }) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Icon size={20} className="text-[#FF6B00]" />
                  </div>
                  <p className="text-[10px] font-black text-[#FF6B00] tracking-widest mb-1">{step}</p>
                  <p className="text-sm font-black text-[#1A1A1A] leading-tight">{text}</p>
                </div>
              ))}
            </div>

            <Link
              href="/ai-audit"
              className="w-full bg-[#FF6B00] text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#e85f00] transition-all shadow-2xl shadow-[#FF6B00]/20 hover:-translate-y-1 active:scale-[0.98]"
            >
              免費健檢我的店 <ArrowRight size={22} />
            </Link>
            <p className="text-center text-gray-400 text-xs font-bold mt-4">完全免費 · 不需要有官網 · 約 30 秒</p>
          </motion.div>
        </div>
      </section>

      {/* ── 什麼是 GEO ── */}
      <section id="what-is-geo" className="py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-4 py-1.5 rounded-full mb-6">
              <span className="text-[#FF6B00] font-black text-xs tracking-widest uppercase">GEO 是什麼</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
              SEO 之後的下一步，<br />
              叫做 <span className="text-[#FF6B00]">GEO</span>
            </h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              GEO（Generative Engine Optimization，生成式搜尋優化）是專門針對 ChatGPT、Claude、Perplexity、
              Google AI Overview 等 AI 搜尋引擎的能見度優化技術。
              傳統 SEO 讓你出現在 Google 搜尋結果；GEO 讓 AI 在回答消費者問題時主動提到你。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div {...fadeInUp} className="bg-gray-50 border border-gray-100 rounded-3xl p-10">
              <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-6">傳統 SEO</p>
              <h3 className="text-2xl font-black mb-4">消費者主動搜尋</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-6">
                用戶在 Google 輸入關鍵字 → 看到搜尋結果 → 點擊進入網站。
                你需要優化關鍵字排名，讓自己出現在前幾頁。
              </p>
              <div className="flex flex-wrap gap-2">
                {['關鍵字排名', '反向連結', '網站速度', '結構化資料'].map(t => (
                  <span key={t} className="bg-white border border-gray-200 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-[#0A0A0A] border border-[#FF6B00]/20 rounded-3xl p-10">
              <p className="text-xs font-black tracking-widest text-[#FF6B00] uppercase mb-6">GEO 生成式搜尋優化</p>
              <h3 className="text-2xl font-black text-white mb-4">AI 主動推薦你</h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-6">
                用戶問 AI「推薦附近餐廳」→ AI 直接生成答案並提到你。
                你需要優化 AI 對你的認識，讓你成為 AI 回答中的首選。
              </p>
              <div className="flex flex-wrap gap-2">
                {['AI 實體建立', '知識圖譜優化', '評論口碑管理', '結構化內容'].map(t => (
                  <span key={t} className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div {...fadeInUp} className="bg-[#FF6B00]/5 border border-[#FF6B00]/15 rounded-3xl p-10 text-center">
            <p className="text-[#FF6B00] font-black text-sm tracking-widest uppercase mb-4">Goverce 創生科技的核心服務</p>
            <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              我們專門幫台灣在地商家<br />打造 GEO + SEO 的完整能見度
            </h3>
            <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
              從免費健檢開始，找出你的 AI 能見度缺口，
              再由 Goverce 創生科技的顧問團隊協助你系統性地提升，
              讓你的店同時在 Google 和各大 AI 平台都找得到。
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 顧問服務 CTA ── */}
      <section className="py-28 md:py-40 bg-[#0A0A0A] text-white">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8">
              <Zap size={12} className="text-[#FF6B00]" />
              <span className="text-white font-black text-xs tracking-widest uppercase">健檢後的下一步</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
              知道問題，<br />
              <span className="text-[#FF6B00]">我們幫你修</span>
            </h2>
            <p className="text-gray-400 text-xl font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
              完成免費健檢後，Goverce 創生科技顧問將依照你的分數與缺口，
              提供量身訂製的 GEO 與 SEO 優化方案，協助你的店在 AI 時代真正被找到。
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-16 text-left">
              {[
                { step: '01', title: 'AI 能見度健檢', desc: '免費取得你的 AI 能見度分數與四大面向分析報告。' },
                { step: '02', title: '顧問一對一諮詢', desc: 'Goverce 創生科技顧問分析你的缺口，規劃優先改善項目。' },
                { step: '03', title: 'GEO + SEO 執行', desc: '系統性建立你的 AI 知識圖譜、口碑與結構化內容。' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <p className="text-[#FF6B00] font-black text-xs tracking-widest mb-4">{step}</p>
                  <h3 className="text-xl font-black mb-3">{title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <Link
              href="/ai-audit"
              className="inline-flex items-center gap-3 bg-[#FF6B00] text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-[#e85f00] transition-all shadow-2xl shadow-[#FF6B00]/20 hover:-translate-y-1 active:scale-[0.98]"
            >
              立即免費健檢 <ArrowRight size={22} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0A0A0A] text-white py-20 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
          <div className="max-w-md space-y-4">
            <h2 className="text-4xl font-black italic tracking-tighter">GO<span className="text-[#FF6B00]">VERCE</span></h2>
            <p className="text-gray-500 font-black text-xs tracking-[0.3em] uppercase">創生科技</p>
            <p className="text-gray-400 font-medium leading-relaxed">
              Goverce 創生科技專注於 GEO 生成式搜尋優化與 SEO 服務，
              協助台灣在地商家在 AI 搜尋時代提升數位能見度。
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6B00]">聯絡我們</h4>
            <a
              href="mailto:goverce.714@gmail.com"
              className="flex items-center justify-center md:justify-start gap-4 text-white hover:text-[#FF6B00] transition-colors group"
            >
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#FF6B00]/10 transition-all">
                <Mail size={22} />
              </div>
              <span className="font-mono font-black">goverce.714@gmail.com</span>
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/5 mt-16 pt-10 text-center text-xs font-black opacity-30 tracking-[0.5em]">
          © 2026 GOVERCE 創生科技. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
