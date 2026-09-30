import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#141210] border-t-[4px] border-black py-12 px-4 sm:px-8 text-stone-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b-2 border-stone-800 pb-8 mb-8">
          {/* Col 1 & 2: Brand and description */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-anton text-3xl text-[#ff4800] uppercase tracking-wider">
                AM I COOKED?
              </span>
              <span className="bg-[#00e297] text-black font-mono-brutal text-xs px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0_#000] rotate-1 font-bold">
                100% CRISPY CERTIFIED
              </span>
            </div>
            <p className="font-sans-brutal text-sm text-stone-400 max-w-lg leading-relaxed">
              The unhinged, meme-powered diagnostic tool for desperate college students, panicked high schoolers, and anyone staring down an exam with 14 tabs of Wikipedia and zero thoughts.
            </p>
          </div>

          {/* Col 3: Doom Metrics */}
          <div className="flex flex-col gap-2">
            <span className="font-mono-brutal text-xs text-[#ffd000] uppercase font-bold tracking-wider">
              LIVE DOOM METRICS
            </span>
            <div className="font-mono-brutal text-xs text-stone-400 flex flex-col gap-1.5">
              <span>CURRENT GLOBAL ANXIETY: 94.8%</span>
              <span>CAFFEINE SATURATION: FATAL</span>
              <span>SURVIVAL ODDS: 1 IN 3</span>
              <span>COFFEE DRIPPED: 418,920 L</span>
            </div>
          </div>

          {/* Col 4: Disclaimer */}
          <div className="flex flex-col gap-2">
            <span className="font-mono-brutal text-xs text-[#ffd000] uppercase font-bold tracking-wider">
              DISCLAIMER
            </span>
            <p className="font-mono-brutal text-xs text-stone-400 leading-normal">
              Not academic advice. If you fail, it is structurally, mathematically, and philosophically what it is. Please do not sue us, we have $4.18 in our bank account.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-brutal text-xs text-stone-400">
          <div>
            © 2026 AM I COOKED LABS. ALL REGRETS RESERVED.
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-[#27272a] border border-black px-2 py-0.5 text-stone-300">
              SERVER STATUS: MEDIUM RARE 🥩
            </span>
            <span className="bg-[#27272a] border border-black px-2 py-0.5 text-[#ff4800] font-bold">
              PRAYER LEVEL: MAXIMUM 🔥
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
