import React from 'react';
import { sounds } from '../utils/audio';

interface HeroSectionProps {
  onCookMeClick: () => void;
  onRandomClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCookMeClick,
  onRandomClick,
}) => {
  return (
    <section className="relative w-full pt-28 pb-12 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Large Emoji Stickers (Asymmetrical & Floating) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-4 right-10 md:right-1/3 text-7xl md:text-9xl opacity-30 md:opacity-40 animate-float-1 filter drop-shadow-[0_10px_20px_rgba(255,72,0,0.5)] z-0"
      >
        🔥
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-40 left-4 md:left-8 text-6xl md:text-8xl opacity-25 md:opacity-35 animate-float-2 z-0"
      >
        💀
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-8 right-8 md:right-16 text-6xl md:text-7xl opacity-30 animate-float-3 z-0"
      >
        😭
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-12 left-1/2 -translate-x-1/2 text-5xl opacity-20 rotate-12 z-0"
      >
        🚨
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-2 left-1/4 text-6xl opacity-30 -rotate-12 animate-float-1 z-0"
      >
        🫠
      </div>

      {/* Warning Top Banner Ribbon */}
      <div className="flex justify-center mb-6 z-10 relative">
        <div className="bg-[#ffd000] text-black border-[3px] border-black px-4 py-1.5 font-mono-brutal text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0_#000000] rotate-[-1deg] text-center inline-flex items-center gap-2">
          <span>⚠️ WARNING: RESULTS MAY CAUSE EMOTIONAL DAMAGE ⚠️</span>
        </div>
      </div>

      {/* Floating Brutalist Badge Stickers */}
      <div className="hidden lg:flex justify-between items-center px-4 mb-2 pointer-events-none z-10 relative">
        <div className="bg-[#1c1917] text-[#ffd000] border-2 border-black px-3 py-1 font-mono-brutal text-xs uppercase shadow-[3px_3px_0_#000] rotate-[-3deg] pointer-events-auto">
          🚨 COOKING STATUS: DISASTER IMMINENT
        </div>
        <div className="bg-[#ba1a1a] text-white border-2 border-black px-3 py-1 font-mono-brutal text-xs uppercase shadow-[3px_3px_0_#000] rotate-[3deg] pointer-events-auto">
          🔥 CORE TEMP: 450°C
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative">
        {/* Left Column: Huge Titles, Microcopy, CTAs */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Badge Chips Cluster */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#ffd000] text-black border-2 border-black px-2.5 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] -rotate-1">
              ⚠️ OFFICIAL EMERGENCY DIAGNOSTIC
            </span>
            <span className="bg-[#00e297] text-black border-2 border-black px-2.5 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] rotate-2">
              EST. 3:42 AM PANIC LAB
            </span>
            <span className="bg-[#e61919] text-white border-2 border-black px-2 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000]">
              COFFEE: 99.8%
            </span>
          </div>

          {/* Main Huge Title */}
          <div className="flex flex-col mt-2 select-none">
            <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-none drop-shadow-[4px_4px_0_#ffd000]">
              AM I
            </h2>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="font-anton text-7xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-[#ff4800] leading-none -rotate-1 drop-shadow-[6px_6px_0_#000000] animate-flame-glow">
                COOKED?
              </h1>
              <span className="text-5xl sm:text-6xl md:text-7xl leading-none select-none animate-bounce">
                🔥💀
              </span>
            </div>
          </div>

          {/* Subtitles from prompt */}
          <div className="flex flex-col gap-1.5 border-l-4 border-[#ff4800] pl-4 my-1">
            <p className="font-anton text-xl sm:text-2xl uppercase tracking-wide text-[#ffd000]">
              “How bad is it? LET'S CALCULATE.”
            </p>
            <p className="font-sans-brutal text-base sm:text-lg text-stone-300 font-medium">
              Tell us your problems. We'll turn them into a percentage.
            </p>
            <p className="font-mono-brutal text-xs text-stone-400">
              Our battle-tested doom algorithms will calculate precisely how charred, crispy, and thoroughly sautéed your academic or life career is right now.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => {
                sounds.playClick();
                sounds.playSizzle();
                onCookMeClick();
              }}
              className="bg-[#ff4800] hover:bg-[#ff5e00] text-white border-[3.5px] border-black px-6 sm:px-8 py-3.5 sm:py-4 font-anton text-2xl sm:text-3xl uppercase tracking-wide shadow-[6px_6px_0_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-3 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[28px] text-[#ffd000]">
                local_fire_department
              </span>
              <span>🔥 COOK ME NOW</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onRandomClick();
              }}
              className="bg-[#ffd000] hover:bg-[#ffe600] text-black border-[3.5px] border-black px-5 sm:px-6 py-3.5 sm:py-4 font-mono-brutal text-sm sm:text-base uppercase font-bold shadow-[5px_5px_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[7px_7px_0_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">casino</span>
              <span>🎲 RANDOM DOOM</span>
            </button>
          </div>

          {/* Microcopy disclaimer stickers from prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <div className="bg-[#18181b] border-2 border-[#3f3f46] p-2 flex items-center gap-2 text-xs font-mono-brutal text-stone-300">
              <span className="text-[#ffd000] text-base">🚨</span>
              <span>
                <strong>COOKING STATUS:</strong> Forwarded to absolutely nobody.
              </span>
            </div>
            <div className="bg-[#18181b] border-2 border-[#3f3f46] p-2 flex items-center gap-2 text-xs font-mono-brutal text-stone-300">
              <span className="text-[#00e297] text-base">🧪</span>
              <span>
                <strong>100% scientifically</strong> unnecessary.
              </span>
            </div>
          </div>

          {/* Tags Cluster */}
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs font-mono-brutal text-stone-400">
            <span className="bg-[#27272a] border border-[#3f3f46] px-2 py-0.5">🤡 CERTIFIED CLOWN</span>
            <span className="bg-[#27272a] border border-[#3f3f46] px-2 py-0.5">😭 CRYING IN LIBRARY</span>
            <span className="bg-[#27272a] border border-[#3f3f46] px-2 py-0.5">🧯 ZERO EXTINGUISHER</span>
            <span className="bg-[#27272a] border border-[#3f3f46] px-2 py-0.5">📚 800-PAGE SLAB</span>
          </div>
        </div>

        {/* Right Column: Hero Mascot in Frying Pan */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px] bg-[#ffd000] border-[4px] border-black p-3 sm:p-4 shadow-[8px_8px_0_#000000] rotate-1 hover:rotate-0 transition-transform">
            {/* Top Bar on Specimen */}
            <div className="w-full bg-black text-[#ffd000] px-3 py-1 font-mono-brutal text-xs uppercase flex items-center justify-between font-bold mb-2">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                SPECIMEN #4092
              </span>
              <span>CRISP STATUS: MAXIMUM</span>
            </div>

            {/* Comic Image with Panicked Student in Pan */}
            <div className="w-full bg-[#1c1917] border-[3px] border-black overflow-hidden relative group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrdDGlGAgQneFkfD7aBcdsh2QNbI2BLoXlZeXRCo1vc7p1VgAiQ7mHk80zVlqrJJsfIi3SUI9sCDCpZTMuPEHzZUg2sI8pZchm3NGojjkqGscc-q843FfDDhWhwsoA4v5XuVnQg6L7G3RefmO4qu_NDzMDcwBgKBrnwr2Spe7Yc87jngZCox-oTjZN5O5HLOj-eXSNvNVtUxZmf4kBAEW6q6jqXjBJ3Jjzx0e0cnczDuVvU3krsG5q"
                alt="Panicked student sitting in flaming frying pan with coffee flying"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Comic Speech Bubble */}
              <div className="absolute top-3 right-3 bg-white text-black border-[3px] border-black px-3 py-1 font-anton text-lg uppercase shadow-[3px_3px_0_#000] rotate-[4deg]">
                THIS IS FINE 🔥
              </div>
            </div>

            {/* Bottom Warning Bar */}
            <div className="mt-2 bg-[#ff4800] text-white border-[2px] border-black px-3 py-1 flex items-center justify-between font-mono-brutal text-xs uppercase font-bold">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">device_thermostat</span>
                CORE TEMP: 450°C
              </span>
              <span>SURVIVAL: OPTIONAL</span>
            </div>

            {/* Sub-label */}
            <p className="font-comic text-xs text-black mt-2 text-center font-bold">
              "Results not legally recognized by parents, professors, or common sense."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
