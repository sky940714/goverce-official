import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Circle, Lock,
  Phone, Mail, Clock, ChevronRight, Zap,
  Calendar, ArrowRight, RotateCcw, MapPin, Upload, X, ImageIcon,
} from 'lucide-react';

// ── Constants ────────────────────────────────────────────────

const STATUS_STYLE = {
  red:    { color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',    dot: 'bg-red-500',    label: '需要改善' },
  yellow: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-500', label: '尚可' },
  green:  { color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200',  dot: 'bg-green-500',  label: '良好' },
};

const PROCESS_STEPS = [
  { id: 'places',   label: '正在查詢 Google 商家資料', ms: 2200 },
  { id: 'ai',       label: '正在測試 AI 搜尋能見度',   ms: 3000 },
  { id: 'mentions', label: '正在掃描第三方平台提及',   ms: 2000 },
  { id: 'scoring',  label: '正在計算分析結果',         ms: 1500 },
];

const ACTION_CONFIG = {
  today:     { Icon: Zap,          label: '今天就能做', cls: 'text-green-700  border-green-200  bg-green-50'  },
  thisMonth: { Icon: Calendar,     label: '這個月該做', cls: 'text-yellow-700 border-yellow-200 bg-yellow-50' },
  later:     { Icon: ChevronRight, label: '之後再做',   cls: 'text-gray-500  border-gray-200   bg-gray-50'   },
};

const PAGE = {
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -20 },
  transition: { duration: 0.35 },
};

const INPUT_CLS = 'w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[#1A1A1A] font-bold placeholder-gray-400 focus:outline-none focus:border-[#FF6B00]/70 focus:ring-2 focus:ring-[#FF6B00]/10 transition-all';

// ── Step 1 : Input ───────────────────────────────────────────

const InputStep = ({ onNext }) => {
  const [name, setName]   = useState('');
  const [area, setArea]   = useState('');
  const [image, setImage] = useState(null); // { base64, mimeType, preview }
  const fileInputRef      = useRef(null);

  const canSubmit = name.trim() && area.trim();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage({
        base64:   reader.result.split(',')[1],
        mimeType: file.type,
        preview:  reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    onNext({ name: name.trim(), area: area.trim(), image });
  };

  return (
    <motion.div {...PAGE} className="w-full max-w-xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-4 py-1.5 rounded-full mb-6">
          <span className="text-[#FF6B00] font-black text-xs tracking-widest uppercase">免費 AI 健檢</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1A1A1A] mb-4 leading-tight">
          AI 搜不到你的店？<br />
          <span className="text-[#FF6B00]">30 秒找出原因</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg">輸入商家資訊，立即取得 AI 能見度報告</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2 block">店名</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="例：老王牛肉麵"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2 block">地區 / 縣市</label>
            <input
              value={area}
              onChange={e => setArea(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="例：台北市大安區"
              className={INPUT_CLS}
            />
          </div>

          {/* 選填截圖 */}
          <div>
            <label className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2 flex items-center gap-1.5 block">
              Google Maps 截圖
              <span className="text-[10px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full normal-case tracking-normal">選填・分析更準確</span>
            </label>

            {!image ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-7 flex flex-col items-center gap-2 text-gray-400 hover:border-[#FF6B00]/40 hover:text-[#FF6B00]/60 transition-all bg-gray-50 hover:bg-[#FF6B00]/5"
              >
                <Upload size={22} />
                <span className="font-bold text-sm">點擊上傳截圖</span>
                <span className="text-xs">JPG / PNG · 最大 5MB</span>
              </button>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                <img src={image.preview} alt="preview" className="w-full max-h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all"
                >
                  <X size={14} className="text-white" />
                </button>
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/50 rounded-full px-3 py-1">
                  <ImageIcon size={11} className="text-white" />
                  <span className="text-white text-[11px] font-bold">截圖已上傳</span>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-6 w-full bg-[#FF6B00] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#e85f00] transition-all disabled:opacity-25 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg shadow-[#FF6B00]/20"
        >
          開始健檢 <ArrowRight size={20} />
        </button>
        <p className="text-center text-gray-400 text-xs font-bold mt-4 tracking-wide">完全免費 · 不需要有官網 · 約 30 秒</p>
      </div>
    </motion.div>
  );
};

// ── Step 2 : Confirm ─────────────────────────────────────────

const ConfirmStep = ({ business, onConfirm, onBack }) => (
  <motion.div {...PAGE} className="w-full max-w-sm mx-auto text-center">
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
      <div className="w-16 h-16 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
        <MapPin size={28} className="text-[#FF6B00]" />
      </div>
      <p className="text-gray-400 font-black text-xs tracking-widest uppercase mb-4">確認商家資訊</p>
      <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">{business.name}</h2>
      <p className="text-gray-500 font-bold text-lg mb-6">{business.area}</p>

      {business.image && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100">
          <img src={business.image.preview} alt="Google Maps 截圖" className="w-full max-h-36 object-cover" />
          <div className="py-2 px-3 bg-green-50 border-t border-green-100 flex items-center justify-center gap-1.5">
            <CheckCircle2 size={13} className="text-green-600" />
            <span className="text-green-700 text-xs font-black">已附上 Google Maps 截圖</span>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <button onClick={onConfirm} className="w-full bg-[#FF6B00] text-white py-4 rounded-2xl font-black text-base hover:bg-[#e85f00] transition-all active:scale-[0.98] shadow-md shadow-[#FF6B00]/20">
          對，就是這家！
        </button>
        <button onClick={onBack} className="w-full text-gray-400 py-3 font-bold hover:text-[#1A1A1A] transition-all text-sm">
          不對，重新輸入
        </button>
      </div>
    </div>
  </motion.div>
);

// ── Step 3 : Processing ──────────────────────────────────────

const ProcessingStep = ({ business, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [done, setDone]             = useState([]);
  const [apiError, setApiError]     = useState('');

  useEffect(() => {
    const animPromise = new Promise(resolve => {
      let idx = 0;
      const advance = () => {
        if (idx >= PROCESS_STEPS.length) { resolve(); return; }
        setCurrentIdx(idx);
        setTimeout(() => {
          setDone(prev => [...prev, idx]);
          idx++;
          advance();
        }, PROCESS_STEPS[idx].ms);
      };
      advance();
    });

    const body = {
      name: business.name,
      area: business.area,
      ...(business.image && {
        imageBase64:  business.image.base64,
        imageMimeType: business.image.mimeType,
      }),
    };

    const apiPromise = fetch('/api/audit/run', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    }).then(r => {
      if (!r.ok) throw new Error('伺服器錯誤');
      return r.json();
    });

    Promise.all([animPromise, apiPromise])
      .then(([, result]) => setTimeout(() => onComplete(result), 400))
      .catch(err => setApiError(err.message || '分析失敗，請稍後再試'));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div {...PAGE} className="w-full max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">正在分析「{business.name}」</h2>
        <p className="text-gray-500 font-medium">
          {business.image ? '已附上截圖，分析更精準 · 約需 30 秒' : '請稍候，約需 30 秒'}
        </p>
      </div>

      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 text-red-600 font-bold text-sm text-center">
          {apiError}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-7">
        {PROCESS_STEPS.map((step, i) => {
          const isCompleted = done.includes(i);
          const isCurrent   = currentIdx === i && !isCompleted;
          return (
            <div key={step.id} className="flex items-center gap-5">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                {isCompleted ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-8 h-8 bg-green-50 border border-green-200 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={15} className="text-green-600" />
                  </motion.div>
                ) : isCurrent ? (
                  <div className="w-8 h-8 rounded-full border-2 border-[#FF6B00] border-t-transparent animate-spin" />
                ) : (
                  <Circle size={28} className="text-gray-200" />
                )}
              </div>
              <span className={`font-bold text-base transition-colors ${
                isCompleted ? 'text-green-500 line-through decoration-green-300'
                : isCurrent  ? 'text-[#1A1A1A]'
                : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// ── Step 4 : Summary (free) ──────────────────────────────────

const SummaryStep = ({ result, onUnlock }) => {
  const totalPct    = result.total / 100;
  const totalStatus = totalPct >= 0.7 ? 'green' : totalPct >= 0.4 ? 'yellow' : 'red';
  const ts          = STATUS_STYLE[totalStatus];

  return (
    <motion.div {...PAGE} className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 mb-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className={`w-36 h-36 rounded-full border-4 ${ts.border} ${ts.bg} flex flex-col items-center justify-center`}>
              <span className={`text-5xl font-black leading-none ${ts.color}`}>{result.total}</span>
              <span className="text-gray-400 text-sm font-bold mt-1">/100</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-gray-400 text-xs font-black tracking-widest uppercase mb-2">「{result.business.name}」的 AI 能見度分數</p>
            <h2 className={`text-2xl md:text-3xl font-black mb-3 ${ts.color}`}>
              {result.total < 40 ? '嚴重不足，AI 幾乎找不到你' : result.total < 70 ? '有待加強，AI 偶爾找得到' : 'AI 能見度良好'}
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed">
              {result.total < 40
                ? '你的店在 AI 搜尋中幾乎是隱形的。當消費者問 ChatGPT「推薦附近的餐廳」，你的競爭對手出現了，但你沒有。'
                : '你的店在部分 AI 平台可被找到，但仍有明顯優化空間。'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.values(result.scores).map(cat => {
          const s = STATUS_STYLE[cat.status];
          return (
            <div key={cat.label} className={`rounded-2xl p-5 border ${s.bg} ${s.border}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-[#1A1A1A] text-xs leading-snug">{cat.label}</span>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`} />
              </div>
              <div className="flex items-end gap-1.5">
                <span className={`text-3xl font-black ${s.color}`}>{cat.score}</span>
                <span className="text-gray-400 text-xs font-bold mb-1">/{cat.max}</span>
              </div>
              <p className={`text-xs font-black mt-1 ${s.color}`}>{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="relative rounded-3xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
        <div className="p-6 space-y-3 opacity-30 pointer-events-none select-none bg-white">
          {['詳細問題說明與原因分析', '每個分類的具體改善步驟', '今天就能做的行動清單', '競爭對手 AI 能見度比較'].map(t => (
            <div key={t} className="h-10 bg-gray-100 rounded-xl" />
          ))}
        </div>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3 rounded-3xl">
          <div className="w-12 h-12 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-2xl flex items-center justify-center">
            <Lock size={22} className="text-[#FF6B00]" />
          </div>
          <p className="text-[#1A1A1A] font-black text-base">留下聯絡方式，免費解鎖</p>
          <p className="text-gray-400 text-xs font-medium">顧問將在你偏好的時段致電說明改善方案</p>
        </div>
      </div>

      <button onClick={onUnlock} className="w-full bg-[#FF6B00] text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#e85f00] transition-all active:scale-[0.98] shadow-lg shadow-[#FF6B00]/20">
        免費解鎖完整報告 <ArrowRight size={22} />
      </button>
      <p className="text-center text-gray-400 text-xs font-bold mt-3">不收費 · 顧問僅致電說明，不強迫購買</p>
    </motion.div>
  );
};

// ── Step 5 : Lead form ───────────────────────────────────────

const LeadFormStep = ({ slug, onSubmit }) => {
  const [form, setForm]       = useState({ email: '', phone: '', time: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const canSubmit = form.email && form.phone && form.time;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/audit/lead', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ slug, email: form.email, phone: form.phone, callback_time: form.time }),
      });
      if (!res.ok) throw new Error('送出失敗');
      onSubmit(form);
    } catch {
      setError('送出失敗，請稍後再試或直接聯絡我們');
    } finally {
      setLoading(false);
    }
  };

  const TIMES = [
    { id: 'morning',   label: '早上 9–12 點'  },
    { id: 'afternoon', label: '下午 12–18 點' },
    { id: 'evening',   label: '晚上 18–21 點' },
  ];

  return (
    <motion.div {...PAGE} className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">解鎖完整報告</h2>
        <p className="text-gray-500 font-medium">顧問將在你選定的時段致電，說明改善方案</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-5">
        <div>
          <label className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2 block">Email</label>
          <div className="relative">
            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className={`${INPUT_CLS} pl-11`} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2 block">電話</label>
          <div className="relative">
            <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="0912-345-678" className={`${INPUT_CLS} pl-11`} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-gray-400 tracking-widest uppercase mb-3 flex items-center gap-2 block">
            <Clock size={11} /> 偏好接電話時段
          </label>
          <div className="grid grid-cols-3 gap-2">
            {TIMES.map(t => (
              <button
                key={t.id}
                onClick={() => setForm({ ...form, time: t.id })}
                className={`py-3 px-2 rounded-xl font-black text-xs transition-all ${
                  form.time === t.id
                    ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20'
                    : 'bg-gray-50 border border-gray-200 text-gray-500 hover:text-[#1A1A1A] hover:border-gray-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-600 font-bold text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          className="w-full bg-[#FF6B00] text-white py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 hover:bg-[#e85f00] transition-all disabled:opacity-25 disabled:cursor-not-allowed active:scale-[0.98] mt-2 shadow-lg shadow-[#FF6B00]/20"
        >
          {loading ? '送出中…' : <> 查看完整報告 <ArrowRight size={18} /> </>}
        </button>
        <p className="text-center text-gray-400 text-xs font-bold">資料僅供顧問聯繫使用，不作其他用途</p>
      </div>
    </motion.div>
  );
};

// ── Step 6 : Full report ─────────────────────────────────────

const ReportStep = ({ result, onRestart }) => (
  <motion.div {...PAGE} className="w-full max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
        className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 size={30} className="text-green-600" />
      </motion.div>
      <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">「{result.business.name}」完整報告</h2>
      <p className="text-gray-500 font-medium">AI 能見度健檢已完成 · 總分 {result.total}/100</p>
    </div>

    <div className="space-y-3 mb-5">
      {Object.values(result.scores).map(cat => {
        const s = STATUS_STYLE[cat.status];
        return (
          <div key={cat.label} className={`rounded-2xl p-6 border ${s.bg} ${s.border}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-black text-[#1A1A1A]">{cat.label}</span>
              <span className={`font-black text-xl ${s.color}`}>
                {cat.score}<span className="text-gray-400 text-sm font-bold">/{cat.max}</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium leading-relaxed">{cat.detail}</p>
          </div>
        );
      })}
    </div>

    <div className="space-y-3 mb-8">
      {Object.entries(result.actions).map(([key, items]) => {
        const { Icon, label, cls } = ACTION_CONFIG[key];
        return (
          <div key={key} className={`rounded-2xl p-6 border ${cls}`}>
            <div className="flex items-center gap-2 mb-4">
              <Icon size={14} />
              <span className="font-black text-xs tracking-widest uppercase">{label}</span>
            </div>
            <ul className="space-y-2.5">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                  <span className="mt-0.5 w-5 h-5 rounded-full border border-current flex-shrink-0 flex items-center justify-center text-[10px] font-black">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>

    <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-2xl p-6 text-center mb-5">
      <p className="text-[#1A1A1A] font-black text-lg mb-2">顧問將盡快與你聯繫</p>
      <p className="text-gray-600 font-medium text-sm leading-relaxed">
        GOVERCE GEO 顧問會在你選定的時段致電，為你量身規劃完整改善方案。
      </p>
    </div>

    <button onClick={onRestart} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-gray-200 text-gray-400 font-black text-sm hover:text-[#1A1A1A] hover:border-gray-300 transition-all bg-white">
      <RotateCcw size={14} /> 幫另一家店分析
    </button>
  </motion.div>
);

// ── Main ─────────────────────────────────────────────────────

const AuditPage = () => {
  const [step, setStep]         = useState('input');
  const [business, setBusiness] = useState(null);
  const [result, setResult]     = useState(null);

  const go = (s) => setStep(s);

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-32 pb-24 px-5">
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <InputStep key="input" onNext={b => { setBusiness(b); go('confirm'); }} />
        )}
        {step === 'confirm' && (
          <ConfirmStep key="confirm" business={business} onConfirm={() => go('processing')} onBack={() => go('input')} />
        )}
        {step === 'processing' && (
          <ProcessingStep key="processing" business={business} onComplete={r => { setResult(r); go('summary'); }} />
        )}
        {step === 'summary' && (
          <SummaryStep key="summary" result={result} onUnlock={() => go('leadform')} />
        )}
        {step === 'leadform' && (
          <LeadFormStep key="leadform" slug={result?.slug} onSubmit={() => go('report')} />
        )}
        {step === 'report' && (
          <ReportStep key="report" result={result} onRestart={() => { setBusiness(null); setResult(null); go('input'); }} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuditPage;
