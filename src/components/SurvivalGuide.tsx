import React, { useState } from 'react';
import { sounds } from '../utils/audio';

const EXCUSES = [
  '“Dear Professor, Canvas ate my file at 11:59:58 PM because our dorm transformer exploded due to an aggressive squirrel.”',
  '“My laptop entered an unskippable 4-hour Windows 98 update right as I clicked submit. I am attaching a picture of my screen as proof.”',
  '“I experienced a temporary reality displacement where I believed the exam was on Thursday. I am ready to accept any penalty up to and including ritual sacrifice.”',
  '“A glass of water spontaneously defied gravity and landed on my motherboard. My DCF model is currently drying in a bag of jasmine rice.”',
  '“I contracted spontaneous acute amnesia regarding calculus. Doctors say the only cure is a 48-hour extension.”',
];

export const SurvivalGuide: React.FC = () => {
  const [currentExcuse, setCurrentExcuse] = useState(EXCUSES[0]);
  const [copiedExcuse, setCopiedExcuse] = useState(false);

  const handleGenerateExcuse = () => {
    sounds.playClick();
    const next = EXCUSES[Math.floor(Math.random() * EXCUSES.length)];
    setCurrentExcuse(next);
  };

  const handleCopyExcuse = () => {
    sounds.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentExcuse);
      setCopiedExcuse(true);
      setTimeout(() => setCopiedExcuse(false), 2000);
    }
  };

  return (
    <section id="survival-guide" className="w-full py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b-4 border-black pb-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#008557] text-white border-2 border-black px-2.5 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] rotate-1">
            FIELD RECOVERY MANUAL
          </span>
          <span className="font-mono-brutal text-xs text-stone-400">
            SEC. 404: CRISIS RESCUE
          </span>
        </div>
        <h2 className="font-anton text-5xl sm:text-6xl uppercase text-white tracking-tight leading-none drop-shadow-[4px_4px_0_#000]">
          SURVIVAL GUIDE 🧯
        </h2>
        <p className="font-anton text-lg sm:text-xl uppercase text-[#ffd000] tracking-wide mt-2">
          “HOW TO UNCOOK YOURSELF (OR DIE TRYING).”
        </p>
      </div>

      {/* Grid of 4 Survival Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Module 1: The 80/20 Triage */}
        <div className="bg-[#18181b] border-[3px] border-black p-5 shadow-[6px_6px_0_#000] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-anton text-xl text-[#00e297] uppercase">
                01. THE 80/20 ACADEMIC TRIAGE
              </span>
              <span className="text-2xl">✂️</span>
            </div>
            <p className="font-sans-brutal text-sm text-stone-300 leading-relaxed mb-3">
              When time is measured in single-digit hours, perfection is your enemy. Identify the <strong>three formulas, theorems, or arguments</strong> that comprise 60% of past exams. Ignore everything else. You are studying for a C-, not a Nobel Prize.
            </p>
          </div>
          <div className="bg-[#0c0a09] border border-black p-2.5 font-mono-brutal text-xs text-[#ffd000]">
            RULE: Any slide with more than 6 bullet points is forbidden to read.
          </div>
        </div>

        {/* Module 2: The YouTube Guru Speedrun */}
        <div className="bg-[#18181b] border-[3px] border-black p-5 shadow-[6px_6px_0_#000] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-anton text-xl text-[#ffd000] uppercase">
                02. OUR LORD &amp; SAVIOR (YOUTUBE 2.25X)
              </span>
              <span className="text-2xl">📺</span>
            </div>
            <p className="font-sans-brutal text-sm text-stone-300 leading-relaxed mb-3">
              Close the 800-page textbook. Search YouTube for an instructor recording with a faint ceiling fan humming in the background and a muffled condenser mic. Watch at 2.25x speed with closed captions enabled. They will explain 4 months of semester in 14 minutes.
            </p>
          </div>
          <div className="bg-[#0c0a09] border border-black p-2.5 font-mono-brutal text-xs text-[#00e297]">
            PRO TIP: Check the comment section from 4 years ago for summarized timecodes.
          </div>
        </div>

        {/* Module 3: Chemical Stabilization */}
        <div className="bg-[#18181b] border-[3px] border-black p-5 shadow-[6px_6px_0_#000] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-anton text-xl text-[#ff4800] uppercase">
                03. CHEMICAL STABILIZATION
              </span>
              <span className="text-2xl">☕</span>
            </div>
            <p className="font-sans-brutal text-sm text-stone-300 leading-relaxed mb-3">
              Do not consume the 5th energy drink. Caffeine has an inverted U-curve: past 400mg, cognitive speed drops while heart palpitations skyrocket. Drink 1 large glass of ice water for every coffee. Eat one piece of bread. Ground yourself.
            </p>
          </div>
          <div className="bg-[#0c0a09] border border-black p-2.5 font-mono-brutal text-xs text-[#ff4800]">
            WARNING: If you can hear colors, discontinue caffeine immediately.
          </div>
        </div>

        {/* Module 4: The Stoic Acceptance */}
        <div className="bg-[#18181b] border-[3px] border-black p-5 shadow-[6px_6px_0_#000] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-anton text-xl text-[#ba1a1a] uppercase">
                04. STOIC “IT IS WHAT IT IS”
              </span>
              <span className="text-2xl">🧘</span>
            </div>
            <p className="font-sans-brutal text-sm text-stone-300 leading-relaxed mb-3">
              Remember: In 5 years, not a single employer, spouse, or human being on Earth will ask what you got on Chapter 4 of Macroeconomics. You will walk in, do your absolute best with your 14 minutes of study, and walk out alive.
            </p>
          </div>
          <div className="bg-[#0c0a09] border border-black p-2.5 font-mono-brutal text-xs text-stone-300">
            MANTRA: "Whatever happens, my bed will still be there tomorrow night."
          </div>
        </div>
      </div>

      {/* Emergency 11:58 PM Email Excuse Generator */}
      <div className="bg-[#27272a] border-[4px] border-black p-6 shadow-[8px_8px_0_#000]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="font-anton text-2xl uppercase text-white tracking-wide flex items-center gap-2">
            <span>📮</span> 11:58 PM PROFESSOR EXCUSE GENERATOR
          </span>
          <span className="bg-[#ffd000] text-black border border-black px-2 py-0.5 font-mono-brutal text-xs uppercase font-bold">
            UNVERIFIED PLAUSIBILITY
          </span>
        </div>

        <div className="bg-[#0c0a09] border-2 border-black p-4 mb-4">
          <p className="font-sans-brutal text-base sm:text-lg text-[#ffd000] italic">
            {currentExcuse}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleGenerateExcuse}
            className="bg-[#ff4800] hover:bg-[#ff5e00] text-white border-2 border-black px-4 py-2 font-anton text-base uppercase tracking-wider shadow-[3px_3px_0_#000] cursor-pointer"
          >
            🎲 REROLL EXCUSE
          </button>
          <button
            type="button"
            onClick={handleCopyExcuse}
            className="bg-[#ffd000] hover:bg-[#ffe600] text-black border-2 border-black px-4 py-2 font-anton text-base uppercase tracking-wider shadow-[3px_3px_0_#000] cursor-pointer"
          >
            {copiedExcuse ? 'COPIED TO CLIPBOARD! 📋' : 'COPY EXCUSE TEXT'}
          </button>
        </div>
      </div>
    </section>
  );
};
