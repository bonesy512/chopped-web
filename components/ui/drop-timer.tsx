'use client';

import { useState, useEffect } from 'react';

// Target: next 02:00 AM PST
function getNextDropTime(): Date {
  const now = new Date();
  // Convert to PST (UTC-8)
  const pstOffset = -8 * 60;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const pstNow = new Date(utcMs + pstOffset * 60000);

  const target = new Date(pstNow);
  target.setHours(2, 0, 0, 0);

  // If 02:00 AM PST has already passed today, advance to tomorrow
  if (pstNow >= target) {
    target.setDate(target.getDate() + 1);
  }

  // Convert PST target back to UTC for comparison
  const targetUTC = new Date(target.getTime() - pstOffset * 60000);
  return targetUTC;
}

export function DropTimer() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const target = getNextDropTime();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setIsLive(true);
        setTimeLeft({ h: 0, m: 0, s: 0 });
        return;
      }

      setIsLive(false);
      const totalSeconds = Math.floor(diff / 1000);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      setTimeLeft({ h, m, s });
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
        NEXT DROP: 02:00 PST
      </span>
      <div className="flex items-center gap-2 text-4xl sm:text-6xl font-mono tabular-nums">
        <div className="flex flex-col items-center">
          <span className="text-white border border-border px-4 py-3 bg-black min-w-[4rem] text-center">
            {pad(timeLeft.h)}
          </span>
          <span className="text-xs text-muted-foreground mt-1">HRS</span>
        </div>
        <span className="text-[#FF0000] pb-6 font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-white border border-border px-4 py-3 bg-black min-w-[4rem] text-center">
            {pad(timeLeft.m)}
          </span>
          <span className="text-xs text-muted-foreground mt-1">MIN</span>
        </div>
        <span className="text-[#FF0000] pb-6 font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-white border border-border px-4 py-3 bg-black min-w-[4rem] text-center">
            {pad(timeLeft.s)}
          </span>
          <span className="text-xs text-muted-foreground mt-1">SEC</span>
        </div>
      </div>
    </div>
  );
}
