import React, { useState } from 'react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  onOpenPanic: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPanic,
  onNavigate,
  activeSection,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);

  const handleToggleSound = () => {
    const nextState = sounds.toggle();
    setSoundEnabled(nextState);
  };

  const handleNavClick = (id: string) => {
    sounds.playClick();
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0f0c0a] border-b-[3px] border-[#1c1b1b] shadow-[0_4px_0_#000000]">
      {/* Top Warning Marquee */}
      <div className="bg-[#ffd000] border-b-2 border-black py-1 overflow-hidden select-none">
        <div className="animate-marquee font-mono-brutal text-xs text-black tracking-widest uppercase font-bold flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#ac2e00]">warning</span>
            BREAKING: BRO HAS 4 HOURS AND 18 CHAPTERS LEFT
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#ff4800]">local_fire_department</span>
            84,209 BRAINS COOKED TODAY
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#ba1a1a]">crisis_alert</span>
            PANIC BUTTON ACTIVE
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px]">sentiment_very_dissatisfied</span>
            IT IS WHAT IT IS
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#ac2e00]">coffee</span>
            EXAM PROTOCOL CRITICAL: COFFEE LEVEL 99.8%
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#ff4800]">bolt</span>
            PROFESSOR DOES NOT CURVE
          </span>
          <span>•</span>
          {/* Loop repeat */}
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#ac2e00]">warning</span>
            BREAKING: BRO HAS 4 HOURS AND 18 CHAPTERS LEFT
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#ff4800]">local_fire_department</span>
            84,209 BRAINS COOKED TODAY
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#ba1a1a]">crisis_alert</span>
            PANIC BUTTON ACTIVE
          </span>
          <span>•</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="h-16 md:h-18 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 text-left group"
          >
            <span className="font-anton text-2xl sm:text-3xl uppercase tracking-wider text-[#ff5e00] drop-shadow-[2px_2px_0_#000000] group-hover:scale-105 transition-transform inline-block">
              AM I COOKED?
            </span>
            <span className="hidden sm:inline-block bg-[#ffd000] text-black border-2 border-black font-mono-brutal text-[10px] px-1.5 py-0.5 shadow-[2px_2px_0_#000] -rotate-3 font-bold uppercase">
              v2.4 EXAM ED.
            </span>
          </button>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => handleNavClick('calculator')}
            className={`font-mono-brutal text-xs uppercase px-3 py-1.5 border-2 transition-all ${
              activeSection === 'calculator'
                ? 'bg-[#ff4800] text-white border-black shadow-[2px_2px_0_#000]'
                : 'text-stone-300 border-transparent hover:text-white hover:border-stone-700'
            }`}
          >
            Cook-O-Meter
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="font-mono-brutal text-xs uppercase px-3 py-1.5 border-2 border-transparent text-stone-300 hover:text-white hover:border-stone-700 transition-all"
          >
            Calculate
          </button>
          <button
            onClick={() => handleNavClick('hall-of-shame')}
            className={`font-mono-brutal text-xs uppercase px-3 py-1.5 border-2 transition-all ${
              activeSection === 'hall-of-shame'
                ? 'bg-[#ffd000] text-black border-black shadow-[2px_2px_0_#000]'
                : 'text-stone-300 border-transparent hover:text-white hover:border-stone-700'
            }`}
          >
            Hall of Shame ☠️
          </button>
          <button
            onClick={() => handleNavClick('survival-guide')}
            className="font-mono-brutal text-xs uppercase px-3 py-1.5 border-2 border-transparent text-stone-300 hover:text-white hover:border-stone-700 transition-all"
          >
            Survival Guide 🧯
          </button>
        </nav>

        {/* Right CTA & Sound Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            className="bg-[#1c1917] hover:bg-[#292524] text-stone-300 border-2 border-[#44403c] p-1.5 sm:px-2.5 sm:py-1 font-mono-brutal text-xs uppercase shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffd000]">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
            <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'MUTED'}</span>
          </button>

          {/* SOS Panic Button */}
          <button
            onClick={() => {
              sounds.playPanicSiren();
              onOpenPanic();
            }}
            className="bg-[#e61919] hover:bg-[#ff2424] text-white border-2 border-black px-2.5 sm:px-3 py-1 font-mono-brutal text-xs uppercase font-bold shadow-[3px_3px_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] animate-pulse">
              e911_emergency
            </span>
            <span>SOS PANIC</span>
          </button>
        </div>
      </div>
    </header>
  );
};
