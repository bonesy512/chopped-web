'use client';

import { useState, useEffect } from 'react';
import { getDropState, formatDropDate, DROP_TIME_LABEL } from '@/lib/drop';

export function DropTimer() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isLive, setIsLive] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const { next, isLive: live } = getDropState(now);
      setLabel(formatDropDate(next));

      if (live) {
        setIsLive(true);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      setIsLive(false);
      const diff = next.getTime() - now.getTime();
      const totalSeconds = Math.max(0, Math.floor(diff / 1000));
      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      setTimeLeft({ d, h, m, s });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  if (isLive) {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#FF0000] tracking-widest animate-pulse">
          ▮ DROP LIVE
        </span>
        <div className="text-5xl sm:text-7xl font-mono text-[#FF0000] tracking-widest border border-[#FF0000] px-8 py-4 shadow-[0_0_30px_rgba(255,0,0,0.4)]">
          LIVE
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xs font-mono text-muted-foreground tracking-widest">
        NEXT DROP: {label} — {DROP_TIME_LABEL}
      </span>
      <div className="flex items-center gap-2 text-3xl sm:text-5xl font-mono tabular-nums">
        <div className="flex flex-col items-center">
          <span className="text-white border border-border px-3 py-2 sm:px-4 sm:py-3 bg-black min-w-[3.5rem] sm:min-w-[4rem] text-center">
            {pad(timeLeft.d)}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">DAY</span>
        </div>
        <span className="text-[#FF0000] pb-5 sm:pb-6 font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-white border border-border px-3 py-2 sm:px-4 sm:py-3 bg-black min-w-[3.5rem] sm:min-w-[4rem] text-center">
            {pad(timeLeft.h)}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">HRS</span>
        </div>
        <span className="text-[#FF0000] pb-5 sm:pb-6 font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-white border border-border px-3 py-2 sm:px-4 sm:py-3 bg-black min-w-[3.5rem] sm:min-w-[4rem] text-center">
            {pad(timeLeft.m)}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">MIN</span>
        </div>
        <span className="text-[#FF0000] pb-5 sm:pb-6 font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-white border border-border px-3 py-2 sm:px-4 sm:py-3 bg-black min-w-[3.5rem] sm:min-w-[4rem] text-center">
            {pad(timeLeft.s)}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">SEC</span>
        </div>
      </div>
    </div>
  );
}
