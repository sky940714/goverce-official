import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Zap, ChevronRight, Globe, Rocket,
  User, Terminal, Sparkles, CheckCircle2,
  Building2, ArrowUpRight, LayoutDashboard, Code2, 
  Bot, MessageSquare, Laptop, Command,
  TimerOff, CreditCard, Infinity as InfinityIcon, ZapOff,
  Camera, Gift, MessageCircle
} from 'lucide-react';

const GoCorePage = () => {
  const [diagStep, setDiagStep] = useState(0);
  const [selections, setSelections] = useState({ role: '', usage: '', tool: '' });
  
  const CONSOLE_URL = "https://me.goverce.com";
  const LINE_URL = "https://lin.ee/NOt2H1p"; // 您的官方 LINE 連結

  const handleEnterConsole = () => window.location.href = CONSOLE_URL;
  const handleOpenLine = () => window.open(LINE_URL, '_blank');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const roles = [
    { id: 'student', label: '學生 / 愛好者', icon: User, desc: '日常學習、做作業或輕量嘗試' },
    { id: 'pro', label: '工程師 / 接案者', icon: Terminal, desc: '靠 AI 提升開發與接案速度' },
    { id: 'team', label: '中小企業 / 團隊', icon: Building2, desc: '多人共用、開發產品或營運' },
  ];

  const usages = [
    { id: 'chat', label: '單純對話與問答', icon: MessageSquare, desc: '查資料、寫文案、請 AI 抓 Bug' },
    { id: 'coding', label: 'IDE 輔助寫程式', icon: Code2, desc: '補全代碼、重構架構或寫測試' },
    { id: 'agent', label: '跑自動化 / 產品後端', icon: Bot, desc: '跑小龍蝦 (Crayfish) 或串接 App' },
  ];

  const tools = [
    { id: 'web', label: '官方網頁版', icon: Globe, desc: '習慣用 GPT-4o / Claude 3.5' },
    { id: 'editor', label: 'AI 編輯器', icon: Laptop, desc: '綁定 Cursor 或 Windsurf' },
    { id: 'cli', label: '終端機指令工具', icon: Command, desc: '使用 Claude Code 自動化流程' },
  ];

  const getRecommendation = () => {
    const { role, usage, tool } = selections;
    if (usage === 'agent' || role === 'team') return 'Whale / 旗艦級';
    if (tool === 'cli' || tool === 'editor') return 'Standard / 開發者';
    if (usage === 'coding') return 'Pro / 專業級';
    if (role === 'student' && usage === 'chat') return 'Nano / 銅板價';
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
            {isSuggested ? '為您推薦' : '熱門首選'}
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
        <button onClick={handleEnterConsole} className={`w-full py-4 rounded-[1.5rem] font-black text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 ${(recommended || isSuggested) ? 'bg-[#FF6B00] text-white hover:shadow-orange-200' : 'bg-black text-white hover:bg-gray-800'}`}>
          進入控制台 <ArrowUpRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#F8F9FF] min-h-screen text-[#1A1A1A] pb-20 font-sans">
      <div className="h-24 md:h-32" />
      <main className="max-w-7xl mx-auto px-6">
        
        {/* 1. Hero Section */}
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 bg-white shadow-2xl rounded-[2.2rem] flex items-center justify-center text-[#FF6B00] border-4 border-orange-50">
            <Cpu size={40} />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">GO<span className="text-[#FF6B00]">CORE</span> API</h1>
            <p className="text-lg md:text-xl text-gray-400 font-bold">為開發者設計的加速方案：比訂閱更彈性，比官方更親民</p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            {/* 限時活動提示標籤 */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-4 py-1.5 rounded-full flex items-center gap-2"
            >
              <Gift size={14} className="text-[#FF6B00] animate-bounce" />
              <span className="text-[11px] font-black tracking-widest text-[#FF6B00]">限時活動：截圖診斷結果回傳 LINE 即領 100 萬額度</span>
            </motion.div>

            <button onClick={handleEnterConsole} className="group relative px-8 py-4 bg-black text-white rounded-2xl font-black text-sm tracking-widest flex items-center gap-3 hover:bg-[#FF6B00] transition-all shadow-2xl active:scale-95">
              <LayoutDashboard size={20} /> 進入開發者控制台
              <div className="absolute -top-2 -right-2 bg-red-500 text-[8px] px-2 py-0.5 rounded-full animate-pulse">LIVE</div>
            </button>
          </div>
        </div>

        {/* 2. 重點強調：痛點直擊 */}
        <motion.section {...fadeInUp} className="mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 bg-white rounded-[2.5rem] border border-orange-50 shadow-sm hover:shadow-md transition-all">
            <TimerOff className="text-[#FF6B00] mb-4" size={32} />
            <h4 className="text-xl font-black mb-2">守護開發心流</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">不再受限於官方 4 小時一次的次數限制，讓思考不中斷。</p>
          </div>
          <div className="p-8 bg-white rounded-[2.5rem] border border-orange-50 shadow-sm hover:shadow-md transition-all">
            <CreditCard className="text-[#FF6B00] mb-4" size={32} />
            <h4 className="text-xl font-black mb-2">用多少，算多少</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">拒絕訂閱制浪費。用不完的額度永遠都在，休息一個月也無妨。</p>
          </div>
          <div className="p-8 bg-white rounded-[2.5rem] border border-orange-50 shadow-sm hover:shadow-md transition-all">
            <ZapOff className="text-[#FF6B00] mb-4" size={32} />
            <h4 className="text-xl font-black mb-2">告別停機焦慮</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">多模型自由切換，不再擔心官方網站高流量時段無法運作。</p>
          </div>
          <div className="p-8 bg-white rounded-[2.5rem] border border-orange-50 shadow-sm hover:shadow-md transition-all">
            <InfinityIcon className="text-[#FF6B00] mb-4" size={32} />
            <h4 className="text-xl font-black mb-2">在地支持與發票</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">台灣在地加速器，支持多元支付並提供合法三聯式發票報帳。</p>
          </div>
        </motion.section>

        {/* 3. 診斷器 */}
        <motion.section {...fadeInUp} className="mb-32">
          <div className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl shadow-orange-100 border border-orange-50 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="bg-orange-50 text-[#FF6B00] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Efficiency Diagnosis</span>
                <h2 className="text-3xl font-black mt-4 italic">找到最適合您的燃料方案</h2>
              </div>

              <div className="min-h-[280px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {diagStep === 0 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <h3 className="text-lg font-bold text-center text-gray-400">01. 請問您的身份是？</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {roles.map(r => (
                          <button key={r.id} onClick={() => { setSelections({...selections, role: r.id}); setDiagStep(1); }} className="p-6 bg-gray-50 rounded-[2rem] hover:bg-[#FF6B00] hover:text-white transition-all flex flex-col items-center text-center gap-3 group">
                            <r.icon size={32} className="text-[#FF6B00] group-hover:text-white" />
                            <div>
                              <span className="font-black text-md block">{r.label}</span>
                              <span className="text-[10px] opacity-60 font-medium block">{r.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {diagStep === 1 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <h3 className="text-lg font-bold text-center text-gray-400">02. 您通常拿 AI 來做什麼？</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {usages.map(u => (
                          <button key={u.id} onClick={() => { setSelections({...selections, usage: u.id}); setDiagStep(2); }} className="p-6 bg-gray-50 rounded-[2rem] hover:bg-[#FF6B00] hover:text-white transition-all flex flex-col items-center text-center gap-3 group">
                            <u.icon size={32} className="text-[#FF6B00] group-hover:text-white" />
                            <div>
                              <span className="font-black text-md block">{u.label}</span>
                              <span className="text-[10px] opacity-60 font-medium block">{u.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setDiagStep(0)} className="block mx-auto text-xs font-bold text-gray-400 hover:text-[#FF6B00] underline">返回上一步</button>
                    </motion.div>
                  )}
                  {diagStep === 2 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <h3 className="text-lg font-bold text-center text-gray-400">03. 您目前最依賴哪個工具？</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tools.map(t => (
                          <button key={t.id} onClick={() => { setSelections({...selections, tool: t.id}); setDiagStep(3); }} className="p-6 bg-gray-50 rounded-[2rem] hover:bg-[#FF6B00] hover:text-white transition-all flex flex-col items-center text-center gap-3 group">
                            <t.icon size={32} className="text-[#FF6B00] group-hover:text-white" />
                            <div>
                              <span className="font-black text-md block">{t.label}</span>
                              <span className="text-[10px] opacity-60 font-medium block">{t.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setDiagStep(1)} className="block mx-auto text-xs font-bold text-gray-400 hover:text-[#FF6B00] underline">返回上一步</button>
                    </motion.div>
                  )}
                  {diagStep === 3 && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
                      <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="text-4xl font-black tracking-tighter">建議選擇：<span className="text-[#FF6B00] underline decoration-4 underline-offset-8">{getRecommendation()}</span></h4>
                      
                      {/* 回傳 LINE 領點活動區塊 */}
                      <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 max-w-sm mx-auto space-y-4">
                        <div className="flex items-center justify-center gap-2 text-[#FF6B00]">
                          <Camera size={20} />
                          <span className="text-sm font-black tracking-widest uppercase italic">Bonus Reward</span>
                        </div>
                        <p className="text-[13px] font-bold text-gray-500 leading-relaxed">
                          現在截圖此結果頁面並私訊官方 LINE，<br/>立即領取 <span className="text-[#FF6B00] font-black">1,000,000 PTS</span> 測試額度！
                        </p>
                        <button 
                          onClick={handleOpenLine}
                          className="w-full bg-[#06C755] text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#06C755]/20"
                        >
                          <MessageCircle size={18} /> 立即私訊官方 LINE
                        </button>
                      </div>

                      <div className="flex gap-4 justify-center">
                        <button onClick={() => setDiagStep(0)} className="px-8 py-3 rounded-full border border-gray-200 font-bold text-sm hover:bg-gray-50">重新測試</button>
                        <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} className="bg-[#FF6B00] text-white px-10 py-3 rounded-full font-black text-sm flex items-center gap-2 shadow-lg shadow-orange-100">查看方案詳情 <ChevronRight size={16} /></button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. 方案區塊 */}
        <div id="pricing" className="mb-40">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">彈性儲值 ‧ 極致效能</h2>
            <div className="h-1.5 w-12 bg-[#FF6B00] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <PriceCard tier="Nano / 銅板價" price="50" tokens="1,250,000" isMicro={true} features={["無效期限制", "適合單次 Debug", "API 請求優化"]} />
            <PriceCard tier="Lite / 嘗鮮包" price="100" tokens="2,500,000" features={["學生/個人首選", "支援日常問答", "學習型開發使用"]} />
            <PriceCard tier="Standard / 開發者" price="500" tokens="14,000,000" recommended={true} features={["Cursor 深度整合", "包含 1M 贈點", "高頻代碼生成"]} />
            <PriceCard tier="Pro / 專業級" price="1,000" tokens="30,000,000" features={["Claude Code 首選", "包含 3M 贈點", "支持多人協作"]} />
            <PriceCard tier="Whale / 旗艦級" price="5,000" tokens="160,000,000" features={["Agent 自動化運作", "包含 20M 贈點", "低延遲專屬節點"]} />
            <PriceCard tier="Titan / 企業級" price="10,000" tokens="350,000,000" features={["三聯式報帳支援", "包含 50M 贈點", "專屬技術窗口"]} />
          </div>
          
          <div className="mt-12 text-center text-gray-400 font-black text-xs flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-[#FF6B00]" />
              <span>所有方案均需跳轉至控制台進行身份驗證與儲值</span>
            </div>
            <p className="text-[#FF6B00] opacity-80">新戶專屬：加入官方 LINE 並傳送診斷截圖，系統將自動派發 1,000,000 PTS 測試額度。</p>
          </div>
        </div>

        {/* 5. 底部 */}
        <motion.section {...fadeInUp} className="mb-32">
          <div className="relative p-10 md:p-16 bg-[#121212] rounded-[3.5rem] text-white overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00] rounded-full blur-[120px] opacity-20" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black italic italic">未來 ‧ 引擎</h2>
                <p className="text-gray-500 font-medium max-w-md">除了 API 燃料，我們正在研發更強大的運算引擎，讓自動化部署與模型微調變得前所未有的簡單。</p>
              </div>
              <button onClick={handleEnterConsole} className="px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black text-sm tracking-[0.2em] transition-all">
                DISCOVER GOCORE LABS
              </button>
            </div>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default GoCorePage;