'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight, Mail, User, Phone, Rocket, TrendingUp, Target,
  Users, AlertTriangle, BarChart2, HelpCircle, BookOpen, ChevronDown, CheckCircle2,
} from 'lucide-react';

const PAGE = {
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -20 },
  transition: { duration: 0.35 },
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const INPUT_CLS = 'w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[#1A1A1A] font-bold placeholder-gray-400 focus:outline-none focus:border-[#FF6B00]/70 focus:ring-2 focus:ring-[#FF6B00]/10 transition-all';

const PRICE = 200;

const PERSONAS = [
  { Icon: Rocket,        title: '剛上架 Uber Eats 的新手商家', desc: '不知道從何開始下廣告，怕預算亂花卻沒有訂單' },
  { Icon: AlertTriangle, title: '廣告一直燒錢卻沒有訂單',       desc: '已經有在投廣告，但轉換率低、不知道問題出在哪' },
  { Icon: BarChart2,     title: '想要系統化操作的老闆',         desc: '不想再憑感覺亂試，想學會看數據調整廣告策略' },
];

const OUTLINE = [
  { step: '01', title: '受眾與預算設定',   desc: '搞懂 Uber Eats 廣告後台，設定精準受眾與合理預算配置' },
  { step: '02', title: '廣告素材優化',     desc: '菜單照片、標題文案怎麼寫才會讓人想點進來下單' },
  { step: '03', title: '數據判讀與調整',   desc: '看懂曝光、點擊、轉換率，知道什麼時候該加碼、什麼時候該停損' },
  { step: '04', title: '常見錯誤與避坑指南', desc: '新手最常踩的雷，一次幫你整理起來，少走冤枉路' },
];

const BENEFITS = [
  { Icon: Target,     title: '精準受眾設定',     desc: '教你怎麼設定 Uber Eats 廣告受眾，把預算花在真正會下單的顧客身上' },
  { Icon: TrendingUp, title: '提高曝光排名',     desc: '掌握平台演算法邏輯，讓你的店在搜尋與推薦列表中排到更前面' },
  { Icon: Rocket,     title: '廣告投放實戰步驟', desc: '從零開始，一步步設定第一檔廣告活動，不用懂行銷也能上手' },
  { Icon: Users,      title: '同業實戰案例參考', desc: '參考其他商家怎麼調整廣告策略，少走冤枉路' },
];

const FAQS = [
  { q: '這份 PDF 適合完全沒有行銷經驗的人嗎？', a: '適合。內容以實際操作步驟為主，不需要行銷背景，跟著步驟做就能上手。' },
  { q: '付款後多久可以收到 PDF？', a: '完成付款後系統會立即自動寄送，通常幾秒到一分鐘內就會收到信件，請記得檢查垃圾郵件匣。' },
  { q: '可以開立收據或發票嗎？', a: '如需要收據，付款完成後歡迎直接回覆通知信與我們聯繫。' },
  { q: '內容會不會太簡單或太籠統？', a: '內容聚焦在 Uber Eats 廣告投放的具體操作與判讀方式，附有實際步驟說明，而不是空泛的行銷概念。' },
];

const HeroSection = ({ onBuy }) => (
  <section className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-6 bg-[#0A0A0A]">
    <div
      className="absolute inset-0 z-0 opacity-40"
      style={{
        backgroundImage: "url('/uber-eats-hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

    <div className="z-10 text-center relative max-w-4xl px-4">
      <div className="mb-8 flex items-center justify-center gap-4">
        <div className="h-[1px] w-10 bg-[#FF6B00]" />
        <span className="text-xs font-black tracking-[0.5em] text-[#FF6B00] uppercase">Uber Eats 商家專用</span>
        <div className="h-[1px] w-10 bg-[#FF6B00]" />
      </div>

      <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-white mb-8">
        別再花冤枉錢下廣告<br />
        <span className="text-[#FF6B00]">用對方法讓訂單變多</span>
      </h1>

      <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
        一份專為 Uber Eats 商家寫的行銷下廣告實戰指南（PDF），
        不用懂行銷理論，跟著步驟操作就能開始優化你的廣告成效。
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onBuy}
          className="bg-[#FF6B00] text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#e85f00] transition-all shadow-2xl shadow-[#FF6B00]/30 hover:-translate-y-1 active:scale-[0.98]"
        >
          立即購買 NT$ {PRICE} <ArrowRight size={20} />
        </button>
      </div>
    </div>

    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 z-10 cursor-pointer"
      onClick={() => document.getElementById('personas')?.scrollIntoView({ behavior: 'smooth' })}
    >
      <ChevronDown size={32} className="text-white/40" />
    </motion.div>
  </section>
);

const PersonaSection = () => (
  <section id="personas" className="py-24 md:py-32 bg-white">
    <div className="max-w-6xl mx-auto px-8">
      <motion.div {...fadeInUp} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-4 py-1.5 rounded-full mb-6">
          <span className="text-[#FF6B00] font-black text-xs tracking-widest uppercase">這份指南適合你，如果</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
          你是不是也遇過這些狀況？
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {PERSONAS.map(({ Icon, title, desc }) => (
          <motion.div key={title} {...fadeInUp} className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
              <Icon size={24} className="text-[#FF6B00]" />
            </div>
            <h3 className="text-xl font-black mb-3">{title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const OutlineSection = () => (
  <section className="py-24 md:py-32 bg-[#F5F5F5]">
    <div className="max-w-6xl mx-auto px-8">
      <motion.div {...fadeInUp} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-4 py-1.5 rounded-full mb-6">
          <BookOpen size={12} className="text-[#FF6B00]" />
          <span className="text-[#FF6B00] font-black text-xs tracking-widest uppercase">內容大綱</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
          你將會看到這些內容
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div {...fadeInUp} className="relative mx-auto md:mx-0 w-full max-w-sm aspect-[5/7] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
          <Image
            src="/uber-eats-pdf-cover.jpg"
            alt="Uber Eats 商家行銷下廣告指南 PDF 封面預覽"
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            className="object-cover"
          />
        </motion.div>

        <div className="space-y-5">
          {OUTLINE.map(({ step, title, desc }) => (
            <motion.div key={step} {...fadeInUp} className="flex items-start gap-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <span className="text-[#FF6B00] font-black text-2xl tracking-tighter flex-shrink-0">{step}</span>
              <div>
                <h3 className="font-black text-[#1A1A1A] mb-1">{title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-24 md:py-32 bg-white">
    <div className="max-w-6xl mx-auto px-8">
      <motion.div {...fadeInUp} className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
          你將學會<span className="text-[#FF6B00]">這些能力</span>
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6">
        {BENEFITS.map(({ Icon, title, desc }) => (
          <motion.div key={title} {...fadeInUp} className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-3xl p-8">
            <div className="w-11 h-11 flex-shrink-0 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-2xl flex items-center justify-center">
              <Icon size={18} className="text-[#FF6B00]" />
            </div>
            <div>
              <p className="font-black text-[#1A1A1A] mb-1">{title}</p>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FaqSection = () => (
  <section className="py-24 md:py-32 bg-[#0A0A0A] text-white">
    <div className="max-w-3xl mx-auto px-8">
      <motion.div {...fadeInUp} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
          <HelpCircle size={12} className="text-[#FF6B00]" />
          <span className="text-white font-black text-xs tracking-widest uppercase">常見問題</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
          你可能會想知道
        </h2>
      </motion.div>
      <div className="space-y-4">
        {FAQS.map(({ q, a }) => (
          <motion.div key={q} {...fadeInUp} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="font-black mb-2">{q}</p>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">{a}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section className="py-24 md:py-32 bg-[#F5F5F5]">
    <div className="max-w-xl mx-auto px-8">
      <motion.div {...fadeInUp} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
        <p className="text-gray-400 font-black text-xs tracking-widest uppercase mb-2">PDF 電子檔・付款後立即寄送</p>
        <p className="text-5xl font-black text-[#1A1A1A] mb-1">NT$ {PRICE}</p>
        <p className="text-gray-400 text-sm font-medium mb-6">一次付費，永久保存，可重複閱讀</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['信用卡付款', '付款完成秒寄送', '永久保存可重複閱讀'].map(tag => (
            <span key={tag} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 font-black text-xs px-3 py-1.5 rounded-full">
              <CheckCircle2 size={12} className="text-[#FF6B00]" /> {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const IntroStep = ({ onNext }) => (
  <motion.div {...PAGE}>
    <HeroSection onBuy={onNext} />
    <PersonaSection />
    <OutlineSection />
    <BenefitsSection />
    <FaqSection />
    <PricingSection />
  </motion.div>
);

const InfoStep = ({ onNext, onBack }) => {
  const [form, setForm]       = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const canSubmit = form.name.trim() && form.email.trim();

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || '建立訂單失敗');
      onNext(data);
    } catch (err) {
      setError(err.message || '建立訂單失敗，請稍後再試');
      setLoading(false);
    }
  };

  return (
    <motion.div {...PAGE} className="min-h-screen bg-[#F5F5F5] pt-32 pb-24 px-5">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">填寫收件資訊</h2>
          <p className="text-gray-500 font-medium">PDF 將寄送到你填寫的 Email，完成付款後立即送達</p>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-5">
          <div>
            <label className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2 block">姓名</label>
            <div className="relative">
              <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="王小明" className={`${INPUT_CLS} pl-11`} />
            </div>
          </div>
          <div>
            <label className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2 block">Email（收件用）</label>
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className={`${INPUT_CLS} pl-11`} />
            </div>
          </div>
          <div>
            <label className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2 flex items-center gap-1.5 block">
              電話
              <span className="text-[10px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full normal-case tracking-normal">選填</span>
            </label>
            <div className="relative">
              <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="0912-345-678" className={`${INPUT_CLS} pl-11`} />
            </div>
          </div>
          {error && <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-600 font-bold text-sm text-center">{error}</div>}
          <button onClick={handleSubmit} disabled={!canSubmit || loading}
            className="w-full bg-[#FF6B00] text-white py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 hover:bg-[#e85f00] transition-all disabled:opacity-25 disabled:cursor-not-allowed active:scale-[0.98] mt-2 shadow-lg shadow-[#FF6B00]/20">
            {loading ? '前往付款中…' : <> 前往付款 NT$ {PRICE} <ArrowRight size={18} /> </>}
          </button>
          <button onClick={onBack} className="w-full text-gray-400 py-2 font-bold hover:text-[#1A1A1A] transition-all text-sm">返回上一步</button>
        </div>
      </div>
    </motion.div>
  );
};

const RedirectingStep = ({ checkout }) => {
  useEffect(() => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = checkout.action;
    Object.entries(checkout.params).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  }, [checkout]);

  return (
    <motion.div {...PAGE} className="min-h-screen bg-[#F5F5F5] pt-32 pb-24 px-5 flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
          <div className="w-12 h-12 rounded-full border-2 border-[#FF6B00] border-t-transparent animate-spin mx-auto mb-6" />
          <p className="text-[#1A1A1A] font-black text-lg mb-2">正在導向付款頁面…</p>
          <p className="text-gray-400 text-sm font-medium">請稍候，即將跳轉至綠界安全付款頁</p>
        </div>
      </div>
    </motion.div>
  );
};

const UberEatsAdsPage = () => {
  const [step, setStep]         = useState('intro');
  const [checkout, setCheckout] = useState(null);
  const go = (s) => { setStep(s); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  if (step === 'info') {
    return <InfoStep onBack={() => go('intro')} onNext={(data) => { setCheckout(data); go('redirecting'); }} />;
  }
  if (step === 'redirecting') {
    return <RedirectingStep checkout={checkout} />;
  }
  return <IntroStep onNext={() => go('info')} />;
};

export default UberEatsAdsPage;
