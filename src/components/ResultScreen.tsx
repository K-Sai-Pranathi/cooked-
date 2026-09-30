import React, { useState } from 'react';
import { CookResult } from '../types';
import { sounds } from '../utils/audio';

interface ResultScreenProps {
  result: CookResult;
  onOpenPanic: () => void;
  onSubmitToShame: (score: number, story: string) => void;
  onRecalculate: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onOpenPanic,
  onSubmitToShame,
  onRecalculate,
}) => {
  const [copied, setCopied] = useState(false);
  const is100Percent = result.score >= 100;
  const isHighCooked = result.score >= 90;

  const handleShare = () => {
    sounds.playClick();
    const shareText = `I am officially ${result.score}% COOKED on AM I COOKED? 🔥💀\nVerdict: ${result.badge}\n"${result.punchline}"\nCheck your fate: https://amicooked.dev`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareX = () => {
    sounds.playClick();
    const tweetText = `I just tested my exam/deadline survival on "AM I COOKED?" and scored ${result.score}% COOKED! 🔥💀 Pray for my GPA.`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="results-section"
      className="w-full py-8 transition-all"
    >
      {/* 100% COOKED ULTIMATE BOSS BANNER */}
      {is100Percent && (
        <div className="mb-6 bg-[#ba1a1a] text-white border-[4px] border-black p-3 sm:p-4 shadow-[8px_8px_0_#000] text-center rotate-[-1deg]">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <span className="text-3xl animate-bounce">🚨</span>
            <span className="font-anton text-2xl sm:text-4xl tracking-wider uppercase text-[#ffd000]">
              CRITICAL LEVEL 🚨 FINAL BOSS ENGAGED
            </span>
            <span className="text-3xl animate-bounce">☠️</span>
          </div>
          <p className="font-mono-brutal text-xs sm:text-sm font-bold uppercase mt-1 tracking-widest text-white">
            “You have officially reached maximum cookedness.”
          </p>
        </div>
      )}

      {/* Main Result Card */}
      <div
        className={`w-full bg-[#18181b] border-[5px] border-black p-4 sm:p-8 shadow-[10px_10px_0_#000000] relative overflow-hidden transition-all ${
          is100Percent
            ? 'border-[#ff4800] ring-4 ring-[#ba1a1a] shadow-[0_0_35px_rgba(255,72,0,0.6)]'
            : isHighCooked
            ? 'border-[#ff4800]'
            : ''
        }`}
      >
        {/* Floating background decorative emojis */}
        <div
          aria-hidden="true"
          className="absolute -top-6 -right-6 text-8xl opacity-15 select-none pointer-events-none"
        >
          {is100Percent ? '☠️' : isHighCooked ? '💀' : '😰'}
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-4 text-7xl opacity-15 select-none pointer-events-none"
        >
          🔥
        </div>

        {/* Top Stamp Tag */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div className="bg-[#ffd000] text-black border-2 border-black px-3 py-1 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] rotate-[-2deg]">
            OFFICIAL DOOM REPORT #{Math.floor(Math.random() * 8000 + 1000)}
          </div>
          <div className="bg-[#ba1a1a] text-white border-2 border-black px-3 py-1 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] rotate-[2deg]">
            {is100Percent ? 'VERDICT: CREMATED 🪦' : 'VERDICT: GUILTY ⚖️'}
          </div>
        </div>

        {/* Center Giant Heat Gauge Block */}
        <div className="bg-[#0c0a09] border-[4px] border-black p-5 sm:p-8 mb-6 shadow-[6px_6px_0_#000] text-center relative">
          <span className="font-mono-brutal text-xs sm:text-sm uppercase tracking-widest text-stone-400 font-bold block mb-1">
            MEASURED ROAST INDEX
          </span>

          {/* Huge Number & Cooked Headline */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 flex-wrap">
            <span
              className={`font-anton text-7xl sm:text-8xl md:text-9xl leading-none drop-shadow-[5px_5px_0_#000000] ${
                is100Percent
                  ? 'text-[#ba1a1a] animate-flame-glow'
                  : isHighCooked
                  ? 'text-[#ff4800] animate-flame-glow'
                  : result.score >= 50
                  ? 'text-[#ffd000]'
                  : 'text-[#00e297]'
              }`}
            >
              {result.score}%
            </span>
            <div className="text-left flex flex-col justify-center">
              <span className="font-anton text-4xl sm:text-6xl md:text-7xl uppercase text-white leading-none drop-shadow-[3px_3px_0_#000]">
                COOKED
              </span>
              <span className="text-3xl sm:text-4xl mt-1">
                {is100Percent ? '☠️🔥' : isHighCooked ? '🔥💀' : '😰'}
              </span>
            </div>
          </div>

          {/* Badge */}
          <div className="mt-3 inline-block">
            <span
              className={`border-[2.5px] border-black px-4 py-1.5 font-mono-brutal text-xs sm:text-sm uppercase font-bold shadow-[3px_3px_0_#000] ${result.badgeColor}`}
            >
              {result.badge}
            </span>
          </div>

          {/* Meter Bar */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="flex justify-between font-mono-brutal text-xs text-stone-300 font-bold uppercase mb-1">
              <span>AL DENTE 🧊</span>
              <span>MEDIUM RARE 🥩</span>
              <span>CHARRED ASH 💀</span>
              <span className="text-[#ba1a1a]">TOTAL LOSS ☠️</span>
            </div>
            <div className="w-full h-8 sm:h-9 bg-[#27272a] border-[3px] border-black p-1 shadow-[4px_4px_0_#000] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00e297] via-[#ffd000] via-[#ff4800] to-[#ba1a1a] border-r-2 border-black transition-all duration-1000 ease-out"
                style={{ width: `${result.score}%` }}
              />
            </div>
            <div className="flex justify-between font-mono-brutal text-[11px] text-stone-400 mt-1">
              <span>0% (You're fine)</span>
              <span>50% (Sweating)</span>
              <span>85% (Comeback ruined)</span>
              <span>100% (Eulogy time)</span>
            </div>
          </div>

          {/* Handwritten Dialogue */}
          <div className="mt-6 bg-[#27272a] border-2 border-black p-3 max-w-xl mx-auto -rotate-1 shadow-[3px_3px_0_#000]">
            <p className="font-comic text-base sm:text-lg text-[#ffd000] leading-snug">
              “{result.handwrittenDialogue}”
            </p>
          </div>
        </div>

        {/* Screaming Cartoon Brain Metric Sticker */}
        <div className="border-[3px] border-black bg-[#27272a] p-4 shadow-[5px_5px_0_#000] flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="w-20 h-20 shrink-0 bg-[#0c0a09] border-2 border-black overflow-hidden flex items-center justify-center p-1">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT_xnZWyqtH1Pq5CBP4Jdkrd956lHz275CuCrVkr5JpOR5GQqafb28YR6EKfc_WMqaOfKmTAU2gX1-iafefAx7bU8_KRxgbYbqV180nSJ96rAQRwbBAY9CRXiEN1KvQ3jWTFuqvCfh7ACkPruzjbdl6I2PKqi0DEuV5WIri5CL9Oyaqba2olw1TZoztOKyseDb_4mmGczVI2tJADbsB2nY6CjfxkdUA0mRvWRVYgjAHleaa328Z8Ih"
              alt="Cartoon brain screaming on fire with alarm clock"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-1 text-center sm:text-left">
            <span className="font-mono-brutal text-xs bg-[#ba1a1a] text-white border border-black px-2 py-0.5 self-center sm:self-start font-bold uppercase">
              BRAIN METRIC: FATAL ARITHMETIC
            </span>
            <p className="font-anton text-lg sm:text-xl text-white tracking-wide">
              {result.punchline}
            </p>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="bg-[#ffd000] hover:bg-[#ffe600] text-black border-[3px] border-black py-3 font-anton text-lg uppercase tracking-wide shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              {copied ? 'check_circle' : 'share'}
            </span>
            <span>{copied ? 'COPIED TO CLIPBOARD! 📋' : 'SHARE MY DISASTER'}</span>
          </button>

          {/* Share to X */}
          <button
            type="button"
            onClick={handleShareX}
            className="bg-[#27272a] hover:bg-[#3f3f46] text-white border-[3px] border-black py-3 font-anton text-lg uppercase tracking-wide shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ff4800]">
              send
            </span>
            <span>TWEET ON X 🚀</span>
          </button>

          {/* Submit to Hall of Shame */}
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onSubmitToShame(result.score, result.inputSnapshot.situationText);
            }}
            className="bg-[#ba1a1a] hover:bg-[#d92222] text-white border-[3px] border-black py-3 font-anton text-lg uppercase tracking-wide shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffd000]">
              military_tech
            </span>
            <span>SUBMIT TO SHAME ☠️</span>
          </button>
        </div>

        {/* SOS Emergency Callout */}
        <div className="mt-4 pt-4 border-t-2 border-[#3f3f46] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono-brutal text-xs text-stone-400 text-center sm:text-left">
            Need emergency calming protocol, lo-fi breathing, or academic triage?
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sounds.playPanicSiren();
                onOpenPanic();
              }}
              className="bg-[#e61919] hover:bg-[#ff2424] text-white border-2 border-black px-4 py-1.5 font-mono-brutal text-xs uppercase font-bold shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">e911_emergency</span>
              <span>OPEN SOS PANIC</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onRecalculate();
              }}
              className="bg-[#27272a] hover:bg-[#3f3f46] text-stone-200 border-2 border-black px-3 py-1.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000]"
            >
              RECALCULATE 🔄
            </button>
          </div>
        </div>
      </div>

      {/* EDITORIAL BREAKDOWN CARDS: EXHIBIT A-D & HOW TO UNCOOK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Card 1: 💀 WHY YOU'RE COOKED */}
        <div className="bg-[#18181b] border-[4px] border-black shadow-[7px_7px_0_#000000] p-4 sm:p-6 flex flex-col">
          {/* Card Header Bar */}
          <div className="bg-[#ba1a1a] text-white border-[2.5px] border-black p-3 flex items-center justify-between -mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-4 shadow-[0_3px_0_#000]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">skull</span>
              <span className="font-anton text-xl sm:text-2xl uppercase tracking-wider">
                💀 WHY YOU'RE COOKED
              </span>
            </div>
            <span className="font-mono-brutal text-xs uppercase border border-white px-2 py-0.5 font-bold">
              EXHIBIT A-D
            </span>
          </div>

          <ul className="flex flex-col gap-3">
            {result.whyCooked.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-[#0c0a09] p-3 border-2 border-black shadow-[3px_3px_0_#000]"
              >
                <span className="material-symbols-outlined text-[#ff4800] text-xl shrink-0 mt-0.5">
                  close
                </span>
                <div className="font-sans-brutal text-sm sm:text-base text-stone-200">
                  <strong className="text-white font-bold block sm:inline mr-1">
                    {item.title}:
                  </strong>
                  <span>{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: 🧯 HOW TO UNCOOK (OR DIE TRYING) */}
        <div className="bg-[#18181b] border-[4px] border-black shadow-[7px_7px_0_#000000] p-4 sm:p-6 flex flex-col">
          {/* Card Header Bar */}
          <div className="bg-[#008557] text-white border-[2.5px] border-black p-3 flex items-center justify-between -mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-4 shadow-[0_3px_0_#000]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">fire_extinguisher</span>
              <span className="font-anton text-xl sm:text-2xl uppercase tracking-wider">
                🧯 HOW TO UNCOOK (OR DIE TRYING)
              </span>
            </div>
            <span className="font-mono-brutal text-xs uppercase border border-white px-2 py-0.5 font-bold">
              FIELD GUIDE
            </span>
          </div>

          <ul className="flex flex-col gap-3">
            {result.howToUncook.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-[#0c0a09] p-3 border-2 border-black shadow-[3px_3px_0_#000]"
              >
                <span className="material-symbols-outlined text-[#00e297] text-xl shrink-0 mt-0.5">
                  check_circle
                </span>
                <div className="font-sans-brutal text-sm sm:text-base text-stone-200">
                  <strong className="text-white font-bold block sm:inline mr-1">
                    {item.title}:
                  </strong>
                  <span>{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
