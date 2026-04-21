import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Rocket, Store, TrendingUp, Users2, CheckCircle2, 
  Tent, Utensils, Building2, ChevronRight 
} from 'lucide-react';

const GoEatPage = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  // 合作對象卡片組件
  const PartnerCard = ({ icon: Icon, title, desc }) => (
    <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:border-[#FF6B00] transition-all group">
      <div className="bg-[#FF6B00]/5 p-4 rounded-2xl group-hover:bg-[#FF6B00]/10 transition-colors">
        <Icon className="text-[#FF6B00]" size={28} />
      </div>
      <div>
        <h4 className="font-bold text-lg break-keep">{title}</h4>
        <p className="text-sm text-gray-400 font-light">{desc}</p>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bg-white min-h-screen text-[#1A1A1A] font-sans pb-20"
    >
      {/* 頂部導覽 */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md px-6 py-5 border-b border-gray-50 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors tracking-widest text-xs uppercase font-medium">
          <ArrowLeft size={18} /> 返回官網
        </button>
        <h2 className="font-black italic tracking-tighter text-2xl">GO<span className="text-[#FF6B00]">EAT</span></h2>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-24 md:pt-32">
        
        {/* 1. Hero Section: 招商導向與身份矩陣 */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          
          {/* 左側：文案區 */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-block bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase">
              Partnership Program
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-tight break-keep">
              告別高額抽成<br/>
              <span className="text-[#FF6B00]">掌控</span>您的數位店面
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              專為微型餐飲與夜市品牌打造的智慧管理生態。我們不抽成您的美味利潤，而是透過 AI 技術為您找尋更精準的在地客源。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <a href="https://eats.goverce.com/merchant/login" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center bg-black text-white px-10 py-4 md:py-5 rounded-full font-bold hover:bg-[#FF6B00] transition-all shadow-xl shadow-gray-100">
                立即入駐夥伴 <Rocket size={18} className="ml-2" />
              </a>
            </div>
          </div>

          {/* 右側：歡迎加入區塊 (替代原本圖片) */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-gray-50/50 p-8 md:p-10 rounded-[3rem] border border-gray-100 space-y-6">
              <div className="text-center lg:text-left mb-4">
                <h3 className="text-2xl font-black tracking-tight">我們歡迎以下加入</h3>
                <div className="h-1.5 w-10 bg-[#FF6B00] mt-2 mx-auto lg:mx-0"></div>
              </div>
              
              <div className="space-y-4">
                <PartnerCard 
                  icon={Tent} 
                  title="文創市集" 
                  desc="短期快閃、活動合作夥伴" 
                />
                <PartnerCard 
                  icon={Utensils} 
                  title="傳統攤商" 
                  desc="夜市經營、街頭美食經營者" 
                />
                <PartnerCard 
                  icon={Building2} 
                  title="實體店家" 
                  desc="街邊店、品牌門店、連鎖品牌" 
                />
              </div>
              
              <p className="text-center text-gray-400 text-xs tracking-widest pt-2">
                *提供跨域整合方案，不論規模大小皆可申請
              </p>
            </div>
          </div>
        </div>

        {/* 2. 核心價值區塊 */}
        <motion.div {...fadeInUp} className="bg-gray-50 rounded-[3rem] p-10 md:p-20 mb-32 border border-gray-50">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-black mb-4 break-keep">為什麼選擇 GO EAT？</h2>
            <p className="text-gray-400 tracking-widest text-sm uppercase">解決餐飲業數位轉型的所有痛點</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <TrendingUp className="text-[#FF6B00]" />, title: "利潤極大化", desc: "拒絕主流平台 30-35% 的高額抽成。在 GO EAT，您的每一分收入都完整歸於您的職人工藝。" },
              { icon: <Users2 className="text-[#FF6B00]" />, title: "私域流量經營", desc: "完整的會員管理系統，讓夜市過客變成忠實熟客，不再被第三方平台綁架數據。" },
              { icon: <Rocket className="text-[#FF6B00]" />, title: "AI 自動化行銷", desc: "不需要懂廣告投放，我們的 AI 引擎會自動將您的商品推送至鄰近的 GOVERCE 用戶。" }
            ].map((item, i) => (
              <div key={i} className="space-y-4 text-center md:text-left px-4">
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 mx-auto md:mx-0">{item.icon}</div>
                <h4 className="text-2xl font-bold break-keep">{item.title}</h4>
                <p className="text-gray-500 leading-loose font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. 商家功能模組 */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 order-2 md:order-1 w-full px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  "雲端即時接單系統", "多種支付格式整合",
                  "AI 智慧菜單優化", "商家數據儀表板",
                  "LINE/數位會員卡", "夜市專屬營運模式"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                    <CheckCircle2 className="text-[#FF6B00] shrink-0" size={20} />
                    <span className="font-medium text-gray-700 break-keep">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-6 order-1 md:order-2 text-center md:text-left px-4">
              <h2 className="text-3xl md:text-4xl font-black italic underline decoration-[#FF6B00] decoration-4 underline-offset-8">專為實體商家設計。</h2>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed break-keep">
                我們深知傳統市場與微型餐廳的忙碌。GO EAT 的後台界面以「三秒內完成操作」為核心邏輯，讓您在高峰時段也能從容應對。
              </p>
            </div>
          </div>
        </div>

        {/* 4. 入駐流程 */}
        <motion.div {...fadeInUp} className="bg-black text-white rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 relative overflow-hidden text-center mx-4 md:mx-0">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-16 break-keep">僅需三步，啟動數位成長</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "01", title: "線上申請", desc: "填寫基本資料與店鋪資訊" },
                { step: "02", title: "審核設置", desc: "一對一顧問協助設定" },
                { step: "03", title: "正式上線", desc: "啟動您的智慧商業生態" }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="text-5xl md:text-6xl font-black text-[#FF6B00]/30">{item.step}</div>
                  <h4 className="text-xl md:text-2xl font-bold">{item.title}</h4>
                  <p className="opacity-50 font-light text-sm md:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 md:mt-20">
              <a href="https://eats.goverce.com/merchant/login" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#FF6B00] text-white px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all">
                開始您的商業進階 <Store size={20} className="ml-2" />
              </a>
            </div>
          </div>
        </motion.div>

      </main>
    </motion.div>
  );
};

export default GoEatPage;