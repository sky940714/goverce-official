'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Mail, RotateCcw, Clock } from 'lucide-react';

const PAGE = {
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS  = 15000;

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const tradeNo = searchParams.get('trade_no');
  const [state, setState] = useState('checking'); // checking | paid | pending_timeout | failed | not_found
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!tradeNo) { setState('not_found'); return; }

    let cancelled = false;

    const poll = async () => {
      try {
        const res = await fetch(`/api/checkout/status?trade_no=${encodeURIComponent(tradeNo)}`);
        if (res.status === 404) { if (!cancelled) setState('not_found'); return; }
        const data = await res.json();

        if (data.status === 'paid') {
          if (!cancelled) setState('paid');
          return;
        }
        if (data.status === 'failed') {
          if (!cancelled) setState('failed');
          return;
        }

        if (Date.now() - startedAt.current > POLL_TIMEOUT_MS) {
          if (!cancelled) setState('pending_timeout');
          return;
        }

        setTimeout(poll, POLL_INTERVAL_MS);
      } catch {
        if (Date.now() - startedAt.current > POLL_TIMEOUT_MS) {
          if (!cancelled) setState('pending_timeout');
        } else {
          setTimeout(poll, POLL_INTERVAL_MS);
        }
      }
    };

    poll();
    return () => { cancelled = true; };
  }, [tradeNo]);

  return (
    <motion.div {...PAGE} className="w-full max-w-sm mx-auto text-center">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
        {state === 'checking' && (
          <>
            <div className="w-12 h-12 rounded-full border-2 border-[#FF6B00] border-t-transparent animate-spin mx-auto mb-6" />
            <p className="text-[#1A1A1A] font-black text-lg mb-2">付款確認中，請稍候…</p>
            <p className="text-gray-400 text-sm font-medium">通常幾秒內就會完成</p>
          </>
        )}

        {state === 'paid' && (
          <>
            <div className="w-14 h-14 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={26} className="text-green-600" />
            </div>
            <p className="text-[#1A1A1A] font-black text-xl mb-3">付款成功！</p>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-2">
              PDF 已寄至你的信箱，請至收件匣（含垃圾郵件）查收
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-4 py-2 rounded-full">
              <Mail size={14} className="text-[#FF6B00]" />
              <span className="text-[#FF6B00] font-black text-xs">已寄出</span>
            </div>
          </>
        )}

        {state === 'pending_timeout' && (
          <>
            <div className="w-14 h-14 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <p className="text-[#1A1A1A] font-black text-lg mb-2">處理中</p>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              付款確認完成後會自動寄送 PDF，如 10 分鐘後仍未收到，請直接回覆通知信與我們聯絡
            </p>
          </>
        )}

        {(state === 'failed' || state === 'not_found') && (
          <>
            <p className="text-[#1A1A1A] font-black text-lg mb-3">付款未完成</p>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
              交易未成功，若已被扣款請聯絡我們協助處理，或重新嘗試購買
            </p>
            <Link href="/uber-eats-ads"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-[#e85f00] transition-all active:scale-[0.98]">
              <RotateCcw size={14} /> 重新購買
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
};

const SuccessPage = () => (
  <div className="min-h-screen bg-[#F5F5F5] pt-32 pb-24 px-5 flex items-center">
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  </div>
);

export default SuccessPage;
