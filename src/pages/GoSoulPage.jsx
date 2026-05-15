import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, Home, Palmtree, Car, 
  ChevronRight, Zap, CheckCircle2, Building
} from 'lucide-react';

const GoSoulPage = () => {
  const navigate = useNavigate();
  
  // 💡 定義你的官方 LINE 連結
  const LINE_URL = "https://lin.ee/NOt2H1p";

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const handleLineClick = () => {
    window.open(LINE_URL, '_blank');
  };

  const targetAudiences = [
    { name: "房屋房仲", icon: <Home size={28} />, zh: "房產仲介 / 租屋平台" },
    { name: "旅宿業者", icon: <Palmtree size={28} />, zh: "民宿 / 飯店 / 露營區" },
    { name: "汽車通路", icon: <Car size={28} />, zh: "品牌展間 / 二手車商" },
    { name: "室內設計", icon: <Building size={28} />, zh: "裝潢紀錄 / 作品集" },
  ];

  const caseStudies = [
    { title: "精品建案 3D 導覽", client: "台北高端建商", img: null },
    { title: "奢華山景民宿", client: "宜蘭特色旅宿", img: null },
    { title: "超跑展間虛擬體驗", client: "知名跑車經銷", img: null },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen text-[#1A1A1A] font-sans pb-20 md:pb-32 overflow-x-hidden"
    >
      {/* --- 1. Hero Section --- */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2.5 }}
          style={{ 
            backgroundImage: "url('/gosoul-hero-bg.jpg')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-white" />

        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-10 pt-28 md:pt-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="flex-1 space-y-6 md:space-y-10 text-center lg:text-left">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter text-white drop-shadow-2xl"
              >
                簡單拍，<br/>
                還原<span className="text-[#FF6B00]">真實世界</span>
              </motion.h1>
              <motion.p className="text-lg md:text-2xl text-gray-200 font-bold leading-relaxed max-w-2xl drop-shadow-md mx-auto lg:mx-0 opacity-90">
                僅需手機拍攝。我們利用頂尖運算技術，將實體空間轉化為網頁即開即看的數位體驗。
              </motion.p>
              
              <div className="flex justify-center lg:justify-start pt-4">
                <button 
                  onClick={handleLineClick}
                  className="w-full sm:w-auto bg-[#FF6B00] text-white px-8 md:px-12 py-5 md:py-6 rounded-full font-black text-lg md:text-xl flex items-center justify-center gap-3 hover:shadow-[0_20px_50px_rgba(255,107,0,0.4)] hover:scale-105 transition-all shadow-xl active:scale-95"
                >
                  立即預約掃描服務 <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full aspect-square bg-black rounded-[2.5rem] md:rounded-[4rem] overflow-hidden group shadow-2xl border border-white/5">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                <source src="/gosoul-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. 服務對象區 --- */}
      <section className="py-20 md:py-32 bg-gray-50/30">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 text-center mb-12 md:mb-16">
          <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-5 py-1.5 rounded-full font-black tracking-widest text-xs md:text-sm uppercase mb-4 inline-block italic border border-[#FF6B00]/20 shadow-sm">
            Target Audience
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1A1A1A]">我們服務的對象</h2>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-6 md:px-10 mb-20 md:mb-24">
          {targetAudiences.map((audience, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-xl group"
            >
              <div className="bg-gray-50 p-5 md:p-6 rounded-2xl mb-5 md:mb-6 text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
                {audience.icon}
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-2 text-[#1A1A1A]">{audience.name}</h4>
              <p className="text-gray-400 font-bold text-xs md:text-sm">{audience.zh}</p>
            </motion.div>
          ))}
        </div>

        {/* 跑馬燈 */}
        <div className="relative overflow-hidden py-8 md:py-10 bg-white border-y border-gray-100">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-8 whitespace-nowrap"
            style={{ width: "fit-content" }}
          >
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((num, i) => (
              <div key={i} className="w-[300px] md:w-[450px] h-[200px] md:h-[280px] flex-shrink-0 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100">
                <img 
                  src={`/assets/gosoul/marquee-n${num}.jpg`} 
                  className="w-full h-full object-cover" 
                  alt={`Scan Preview ${num}`} 
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 3. 實例案例區 --- */}
      <section className="py-24 md:py-40 max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-20 gap-6 md:gap-8 text-center md:text-left">
          <div className="space-y-3 md:space-y-4">
             <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[#1A1A1A]">實例案例</h2>
             <div className="h-1.5 w-20 md:w-24 bg-[#FF6B00] rounded-full mx-auto md:mx-0" />
             <p className="text-lg md:text-xl text-gray-400 font-bold italic uppercase tracking-widest">CLIENT CASES</p>
          </div>
          <p className="text-gray-500 font-bold max-w-md text-base md:text-lg leading-relaxed">
            GO SOUL 已成功協助多家企業完成空間轉型。從豪宅銷售到超跑展間，我們提供最穩定的採集方案。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {caseStudies.map((item, i) => (
            <motion.div {...fadeInUp} key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 md:mb-8 shadow-xl">
                {item.img ? (
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center space-y-4">
                      <div className="p-4 bg-white rounded-2xl shadow-sm">
                          <Camera size={32} className="text-[#FF6B00] animate-pulse" />
                      </div>
                      <p className="text-gray-400 font-black tracking-widest text-xs md:text-sm uppercase">檔案建構中</p>
                    </div>
                )}
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 z-20">
                    <span className="bg-white text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full font-black text-[10px] md:text-xs shadow-lg uppercase">
                    Case Study 0{i+1}
                    </span>
                </div>
              </div>
              <h4 className="text-2xl md:text-3xl font-black mb-2 md:mb-3 text-[#1A1A1A]">{item.title}</h4>
              <p className="text-[#FF6B00] font-black tracking-widest text-xs md:text-sm italic">{item.client}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 4. 技術優勢 --- */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-10">
        <div className="bg-[#1A1A1A] rounded-[3rem] md:rounded-[5rem] p-8 md:p-32 border border-white/5 relative overflow-hidden text-white shadow-3xl">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF6B00]/10 blur-[80px] md:blur-[120px] rounded-full" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-6 md:space-y-10 text-center lg:text-left">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter italic leading-tight text-white uppercase">為什麼選擇<br/>GO SOUL？</h2>
              <div className="h-1.5 md:h-2 w-20 md:w-24 bg-[#FF6B00] rounded-full mx-auto lg:mx-0"></div>
              <p className="text-lg md:text-2xl text-gray-400 font-bold leading-relaxed">
                相對於傳統 3D 建模需要數週時間與高額成本，我們提供的是<span className="text-white border-b border-[#FF6B00]">秒級別的流暢體驗</span>與極致的材質還原度。
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-white">
              {[
                { title: "網頁即開即看", desc: "點擊連結即刻進入 3D 空間。支援手機與電腦，讓看房、訂房不再有技術隔閡" },
                { title: "拍攝高效簡單", desc: "房仲或民宿業者僅需使用手機錄影即可完成素材採集。不影響現場營運，隨時隨地都能啟動數位轉型" },
                { title: "極致寫實光影", desc: "完整捕捉民宿的暖色燈光與房屋的窗外採光。真實還原材質細節，有效降低現場落差" },
                { title: "24 小時交付", desc: "高效 AI 運算，最快 24 小時內交付 3D 模型。助您抓住銷售黃金期，讓物件最短時間內上線" }
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <CheckCircle2 className="text-[#FF6B00]" size={28} />
                  <h5 className="text-xl md:text-2xl font-black tracking-tight text-white">{item.title}</h5>
                  <p className="text-gray-400 font-bold text-sm md:text-lg leading-snug opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default GoSoulPage;