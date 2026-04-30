import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, Zap, ChevronRight, Globe, Rocket,
  User, Terminal, Sparkles, CheckCircle2,
  MousePointer2, BarChart3, Building2, ExternalLink,
  ArrowUpRight, LayoutDashboard
} from 'lucide-react';

const GoCorePage = () => {
  const [diagStep, setDiagStep] = useState(0);
  const [selections, setSelections] = useState({ role: '', volume: '' });
  
  // 定義跳轉目標網址
  const CONSOLE_URL = "https://me.goverce.com";

  const handleEnterConsole = () => {
    window.location.href = CONSOLE_URL;
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const roles = [
    { id: 'personal', label: '個人 / 學生', icon: User, desc: '日常學習或輕量嘗試' },
    { id: 'freelancer', label: '開發者 / 接案', icon: Terminal, desc: '高頻編碼與專案開發' },
    { id: 'enterprise', label: '企業 / 團隊', icon: Building2, desc: '商業運作與穩定產出' },
  ];

  const volumes = [
    { id: 'low', label: '偶爾使用', icon: MousePointer2, desc: '單次除錯或簡單對話' },
    { id: 'mid', label: '每日重度', icon: Zap, desc: '深度整合 IDE 與自動化' },
    { id: 'high', label: '生產環境', icon: BarChart3, desc: '支撐 App 運作或大規模訓練' },
  ];

  const getRecommendation = () => {
    const { role, volume } = selections;
    if (role === 'personal' && volume === 'low') return 'Nano / 銅板價';
    if (role === 'personal' && volume === 'mid') return 'Lite / 嘗鮮包';
    if (role === 'freelancer' && volume === 'low') return 'Lite / 嘗鮮包';
    if (role === 'freelancer' && volume === 'mid') return 'Standard / 開發者';
    if (role === 'enterprise' && volume === 'low') return 'Pro / 專業級';
    if (role === 'enterprise' && volume === 'mid') return 'Whale / 旗艦級';
    if (volume === 'high') return 'Titan / 企業級';
    return 'Standard / 開發者';
  };

  const PriceCard = ({ tier, price, tokens, features, recommended, isMicro }) => {
    const isSuggested = getRecommendation() === tier;
    
    return (
      <div className={`relative p-7 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${
        isSuggested ? 'ring-4 ring-[#FF6B00]/30 border-[#FF6B00] bg-white z-10 scale-105 shadow-2xl' : 
        recommended ? 'border-[#FF6B00] bg-[#FF6B00]/5 shadow-lg' : 'border-gray-100 bg-white shadow-sm'
      }`}>
        {(recommended || isSuggested) && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white px-5 py-1 rounded-full text-[10px] font-black tracking-widest shadow-lg whitespace-nowrap">
            {isSuggested ? 'AI 診斷推薦' : '熱門首選'}
          </div>
        )}
        <div className="mb-6">
          <h4 className="text-xs font-black mb-1 text-gray-400 uppercase tracking-widest">{tier.split(' / ')[0]}</h4>
          <h3 className="text-xl font-black mb-4 text-[#FF6B00] tracking-tight">{tier.split(' / ')[1]}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] font-bold text-gray-400">TWD</span>
            <span className={`${isMicro ? 'text-2xl' : 'text-4xl'} font-black tracking-tighter`}>{price}</span>
          </div>
          <p className="mt-3 text-gray-500 font-bold text-[13px] leading-tight">
            獲得 <span className="text-[#FF6B00] font-black">{tokens}</span> <br/>運算額度
          </p>
        </div>
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600 font-medium">
              <CheckCircle2 size={14} className="text-[#FF6B00] mt-0.5 flex-shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <button 
          onClick={handleEnterConsole}
          className={`w-full py-4 rounded-[1.5rem] font-black text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 ${
          (recommended || isSuggested) ? 'bg-[#FF6B00] text-white hover:shadow-orange-200' : 'bg-black text-white hover:bg-gray-800'
        }`}>
          啟動方案 <ArrowUpRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bg-[#F8F9FF] min-h-screen text-[#1A1A1A] pb-20 font-sans"
    >
      <div className="h-24 md:h-32" />

      <main className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-white shadow-2xl rounded-[2.2rem] flex items-center justify-center text-[#FF6B00] border-4 border-orange-50"
          >
            <Cpu size={40} />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              GO<span className="text-[#FF6B00]">CORE</span> API 加速
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-bold">精準燃料供給，拒絕為多餘的訂閱買單</p>
          </div>
          
          <button 
            onClick={handleEnterConsole}
            className="group relative px-8 py-4 bg-black text-white rounded-2xl font-black text-sm tracking-widest flex items-center gap-3 hover:bg-[#FF6B00] transition-all shadow-2xl active:scale-95"
          >
            <LayoutDashboard size={20} />
            進入開發者控制台
            <div className="absolute -top-2 -right-2 bg-red-500 text-[8px] px-2 py-0.5 rounded-full animate-pulse">LIVE</div>
          </button>
        </div>

        {/* 1. 診斷器區塊 */}
        <motion.section {...fadeInUp} className="mb-24">
          <div className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl shadow-orange-100 border border-orange-50 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="bg-orange-50 text-[#FF6B00] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Efficiency Diagnosis</span>
                <h2 className="text-3xl font-black mt-4">30 秒找到您的最佳預算方案</h2>
              </div>

              <div className="min-h-[280px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {diagStep === 0 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <h3 className="text-lg font-bold text-center text-gray-400 italic">您代表的身份是？</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {roles.map(r => (
                          <button 
                            key={r.id}
                            onClick={() => { setSelections({...selections, role: r.id}); setDiagStep(1); }}
                            className="p-6 bg-gray-50 rounded-[2rem] hover:bg-[#FF6B00] hover:text-white transition-all flex flex-col items-center text-center gap-3 group"
                          >
                            <r.icon size={28} className="group-hover:scale-110 transition-transform text-[#FF6B00] group-hover:text-white" />
                            <div className="space-y-1">
                              <span className="font-black text-md block">{r.label}</span>
                              <span className="text-[10px] opacity-60 font-medium block leading-tight">{r.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {diagStep === 1 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <h3 className="text-lg font-bold text-center text-gray-400 italic">您的 Token 消耗強度？</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {volumes.map(v => (
                          <button 
                            key={v.id}
                            onClick={() => { setSelections({...selections, volume: v.id}); setDiagStep(2); }}
                            className="p-6 bg-gray-50 rounded-[2rem] hover:bg-[#FF6B00] hover:text-white transition-all flex flex-col items-center text-center gap-3 group"
                          >
                            <v.icon size={28} className="group-hover:scale-110 transition-transform text-[#FF6B00] group-hover:text-white" />
                            <div className="space-y-1">
                              <span className="font-black text-md block">{v.label}</span>
                              <span className="text-[10px] opacity-60 font-medium block leading-tight">{v.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setDiagStep(0)} className="block mx-auto text-[12px] font-bold text-gray-400 hover:text-[#FF6B00] underline">返回身份選擇</button>
                    </motion.div>
                  )}

                  {diagStep === 2 && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
                      <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100">
                        <CheckCircle2 size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black mb-2 text-gray-400 uppercase tracking-tighter">系統建議方案</h3>
                        <h4 className="text-4xl font-black tracking-tighter">建議選擇：<span className="text-[#FF6B00] underline decoration-4 underline-offset-8">{getRecommendation()}</span></h4>
                      </div>
                      <p className="text-gray-400 font-medium text-sm max-w-sm mx-auto">此方案能完美匹配您的使用強度，確保 Token 充足且預算不浪費。</p>
                      <div className="flex gap-4 justify-center">
                        <button onClick={() => setDiagStep(0)} className="px-8 py-3 rounded-full border border-gray-200 font-bold text-sm hover:bg-gray-50">重選</button>
                        <button 
                          onClick={() => { document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' }); }}
                          className="bg-[#FF6B00] text-white px-10 py-3 rounded-full font-black text-sm hover:shadow-xl transition-all flex items-center gap-2"
                        >
                          立即查看方案 <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 2. 六大方案區塊 */}
        <div id="pricing" className="mb-40">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">點數不過期 休息也無妨</h2>
            <div className="flex items-center justify-center gap-4 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              <span>單次購買</span> <div className="w-1 h-1 bg-gray-300 rounded-full"/> 
              <span>用多少扣多少</span> <div className="w-1 h-1 bg-gray-300 rounded-full"/> 
              <span>終身有效</span>
            </div>
            <div className="h-1.5 w-12 bg-[#FF6B00] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <PriceCard 
              tier="Nano / 銅板價" 
              price="50" 
              tokens="1,250,000"
              isMicro={true}
              features={["無效期限制", "單次緊急除錯", "全模型支援"]}
            />
            <PriceCard 
              tier="Lite / 嘗鮮包" 
              price="100" 
              tokens="2,500,000"
              features={["超值入門款", "支援 LINE Pay", "適合學生練習"]}
            />
            <PriceCard 
              tier="Standard / 開發者" 
              price="500" 
              tokens="14,000,000"
              recommended={true}
              features={["包含 1M 贈點", "高頻 Coding 首選", "支援 Cursor"]}
            />
            <PriceCard 
              tier="Pro / 專業級" 
              price="1,000" 
              tokens="30,000,000"
              features={["包含 3M 贈點", "多人協作共用", "可開發票報帳"]}
            />
            <PriceCard 
              tier="Whale / 旗艦級" 
              price="5,000" 
              tokens="160,000,000"
              features={["包含 20M 贈點", "優先獨佔節點", "專屬技術窗口"]}
            />
            <PriceCard 
              tier="Titan / 企業級" 
              price="10,000" 
              tokens="350,000,000"
              features={["包含 50M 贈點", "自定義安全審計", "三聯式報帳"]}
            />
          </div>
          
          <div className="mt-12 text-center text-gray-400 font-black text-xs flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-[#FF6B00]" />
            所有方案均需跳轉至控制台進行身份驗證與儲值
          </div>
        </div>

        {/* 附加服務預留區 */}
        <motion.section {...fadeInUp} className="mb-32">
          <div className="relative p-10 md:p-16 bg-[#121212] rounded-[3.5rem] text-white overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00] rounded-full blur-[120px] opacity-20" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">Coming Soon</div>
                <h2 className="text-3xl md:text-5xl font-black italic">一鍵部署 API <br/> 讓開發更極致</h2>
                <p className="text-gray-500 font-medium max-w-md">除了燃料，我們還將提供引擎。未來將開放自動化部署、流量監控與模型微調功能。</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={handleEnterConsole}
                  className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer group"
                >
                  <Rocket size={24} className="group-hover:text-[#FF6B00]" />
                  <span className="text-[10px] font-black uppercase">Deployment</span>
                </div>
                <div 
                  onClick={handleEnterConsole}
                  className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer group"
                >
                  <Globe size={24} className="group-hover:text-[#FF6B00]" />
                  <span className="text-[10px] font-black uppercase">Global Node</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </main>
    </motion.div>
  );
};

export default GoCorePage;