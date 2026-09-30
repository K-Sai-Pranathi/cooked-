import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';

interface PanicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PanicModal: React.FC<PanicModalProps> = ({ isOpen, onClose }) => {
  const [breathPhase, setBreathPhase] = useState<'INHALE' | 'HOLD' | 'EXHALE'>('INHALE');
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases: INHALE (4s) -> HOLD (4s) -> EXHALE (4s)
        if (breathPhase === 'INHALE') {
          setBreathPhase('HOLD');
          return 4;
        } else if (breathPhase === 'HOLD') {
          setBreathPhase('EXHALE');
          return 4;
        } else {
          setBreathPhase('INHALE');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, breathPhase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-[#18181b] border-[5px] border-black shadow-[12px_12px_0_#ba1a1a] max-w-lg w-full p-6 sm:p-8 flex flex-col gap-5 text-center relative rotate-[-0.5deg]">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 bg-[#ba1a1a] hover:bg-[#d92222] text-white border-2 border-black px-2.5 py-1 font-mono-brutal text-xs font-bold shadow-[2px_2px_0_#000] cursor-pointer"
        >
          ✕ CLOSE
        </button>

        {/* Top Icon */}
        <div className="text-6xl animate-bounce my-1 select-none">
          🧯🔥
        </div>

        {/* Title */}
        <div>
          <span className="bg-[#ffd000] text-black border-2 border-black px-3 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] inline-block mb-2">
            CRISIS TRIAGE DEPLOYED
          </span>
          <h3 className="font-anton text-3xl sm:text-4xl uppercase text-[#ff4800] tracking-wide leading-none">
            EMERGENCY PROTOCOL ACTIVATED
          </h3>
        </div>

        {/* Tactical Breathing Bubble */}
        <div className="bg-[#0c0a09] border-[3px] border-black p-5 shadow-[4px_4px_0_#000] flex flex-col items-center justify-center">
          <span className="font-mono-brutal text-xs uppercase text-stone-400 font-bold mb-2">
            TACTICAL ANTI-PANIC PACER
          </span>
          <div
            className={`w-28 h-28 rounded-full border-4 border-[#00e297] flex flex-col items-center justify-center transition-all duration-1000 ${
              breathPhase === 'INHALE'
                ? 'scale-110 bg-[#00e297]/20 shadow-[0_0_20px_#00e297]'
                : breathPhase === 'HOLD'
                ? 'scale-110 bg-[#ffd000]/20 border-[#ffd000] shadow-[0_0_20px_#ffd000]'
                : 'scale-90 bg-stone-800 border-stone-500'
            }`}
          >
            <span className="font-anton text-2xl uppercase text-white tracking-wide">
              {breathPhase}
            </span>
            <span className="font-mono-brutal text-xl font-bold text-[#ffd000]">
              {counter}s
            </span>
          </div>
          <p className="font-comic text-xs text-stone-300 mt-3">
            {breathPhase === 'INHALE' && 'Inhale caffeine & quiet confidence...'}
            {breathPhase === 'HOLD' && 'Hold it. You survived worse semesters.'}
            {breathPhase === 'EXHALE' && 'Exhale the existential dread.'}
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-2 text-left font-sans-brutal text-xs sm:text-sm text-stone-200 bg-[#27272a] p-3 border-2 border-black">
          <div className="flex items-center gap-2">
            <span className="bg-[#ff4800] text-white px-1.5 py-0.5 font-mono-brutal text-xs font-bold">1</span>
            <span><strong>Put your phone in another room.</strong> Seriously. Put it in a drawer.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#ff4800] text-white px-1.5 py-0.5 font-mono-brutal text-xs font-bold">2</span>
            <span><strong>Breathe.</strong> It is structurally, philosophically what it is.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#ff4800] text-white px-1.5 py-0.5 font-mono-brutal text-xs font-bold">3</span>
            <span><strong>Five minutes of study now</strong> beats 8 hours of self-loathing tomorrow.</span>
          </div>
        </div>

        {/* Motivational Banner */}
        <div className="bg-[#ffd000] text-black border-2 border-black p-2.5 font-mono-brutal text-xs uppercase font-bold shadow-[3px_3px_0_#000]">
          “NOBODY ASKS YOUR GPA IN FIVE YEARS. GET UP AND FIGHT, KING.”
        </div>

        {/* Back to battle button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="bg-[#ff4800] hover:bg-[#ff5e00] text-white border-[3.5px] border-black py-3 font-anton text-2xl uppercase tracking-wider shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          BACK TO BATTLE 🔥
        </button>
      </div>
    </div>
  );
};
