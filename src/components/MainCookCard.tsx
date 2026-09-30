import React from 'react';
import { CategoryType, CookInput, MoodType } from '../types';
import { sounds } from '../utils/audio';

interface MainCookCardProps {
  input: CookInput;
  onChangeInput: (newInput: CookInput) => void;
  onCookMe: () => void;
  onRandomCook: () => void;
  isCalculating: boolean;
}

const CATEGORIES: { id: CategoryType; label: string; icon: string }[] = [
  { id: 'exam', label: 'EXAM', icon: '📚' },
  { id: 'assignment', label: 'ASSIGNMENT', icon: '📝' },
  { id: 'deadline', label: 'DEADLINE', icon: '⏰' },
  { id: 'money', label: 'MONEY', icon: '💸' },
  { id: 'random', label: 'RANDOM', icon: '🎯' },
];

const MOODS: { id: MoodType; label: string; emoji: string }[] = [
  { id: 'delusional', label: 'Delusional Optimism', emoji: '🤡' },
  { id: 'sweating', label: 'Sweating Bullets', emoji: '😭' },
  { id: 'numb', label: 'Clinically Numb', emoji: '💀' },
  { id: 'ascended', label: 'Spirit Realm Ascended', emoji: '🔥' },
];

export const MainCookCard: React.FC<MainCookCardProps> = ({
  input,
  onChangeInput,
  onCookMe,
  onRandomCook,
  isCalculating,
}) => {
  const updateField = <K extends keyof CookInput>(key: K, value: CookInput[K]) => {
    onChangeInput({
      ...input,
      [key]: value,
    });
  };

  const getDelusionLabel = (val: number) => {
    if (val <= 20) return "I'M DONE 🪦";
    if (val <= 45) return 'PANICKING 😰';
    if (val <= 65) return 'MAYBE? 🤔';
    if (val <= 85) return 'BLIND HOPE 🤞';
    return 'I GOT THIS 😎';
  };

  return (
    <div
      id="calculator"
      className="w-full bg-[#18181b] border-[4px] border-black p-4 sm:p-7 shadow-[8px_8px_0_#000000] relative overflow-hidden"
    >
      {/* Decorative Stamp Tag */}
      <div className="absolute top-2 right-2 sm:right-4 rotate-3 bg-[#ffd000] text-black border-2 border-black px-2 sm:px-3 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000]">
        THE CRISP-O-MATIC 3000™
      </div>

      {/* Card Header Bar */}
      <div className="bg-[#ffd000] border-[3px] border-black p-3 -mt-4 -mx-4 sm:-mt-7 sm:-mx-7 mb-6 shadow-[0_4px_0_#000000] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl text-black">
            calculate
          </span>
          <span className="font-anton text-2xl sm:text-3xl uppercase tracking-wider text-black">
            SO... WHAT HAPPENED? 👀
          </span>
        </div>
        <span className="hidden sm:inline-block bg-white text-black border-2 border-black px-2 py-0.5 font-mono-brutal text-xs uppercase font-bold">
          DIAGNOSTIC v2.4
        </span>
      </div>

      {/* Category Buttons Row */}
      <div className="mb-6">
        <label className="block font-mono-brutal text-xs uppercase text-stone-300 font-bold mb-2">
          SELECT YOUR FLAVOR OF DISASTER:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = input.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sounds.playClick();
                  updateField('category', cat.id);
                }}
                className={`py-2 px-3 border-[2.5px] border-black font-anton text-base sm:text-lg uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ff4800] text-white shadow-[4px_4px_0_#000000] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-[#27272a] text-stone-200 hover:bg-[#3f3f46] shadow-[2px_2px_0_#000000]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Situation Input Textarea */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1.5">
          <label className="font-mono-brutal text-xs uppercase text-stone-300 font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#ff4800]">
              warning
            </span>
            TELL US HOW YOU MESSED UP...
          </label>
          <span className="font-mono-brutal text-[11px] text-stone-400">
            {input.situationText.length} CHARS OF REGRET
          </span>
        </div>
        <div className="relative">
          <textarea
            value={input.situationText}
            onChange={(e) => updateField('situationText', e.target.value)}
            rows={3}
            placeholder="e.g. Exam in 4 hours, haven't opened the lecture slides, professor wrote the textbook, currently watching ancient Roman plumbing..."
            className="w-full bg-[#0c0a09] border-[3px] border-black text-stone-100 p-3 font-sans-brutal text-sm sm:text-base shadow-[4px_4px_0_#000000] focus:outline-none focus:border-[#ff4800] focus:shadow-[4px_4px_0_#ff4800] transition-all resize-none"
          />
          <div className="absolute right-2 bottom-2 text-xl pointer-events-none opacity-40">
            📝💀
          </div>
        </div>
      </div>

      {/* Delusion Slider */}
      <div className="mb-6 bg-[#27272a] border-[3px] border-black p-3.5 shadow-[4px_4px_0_#000000]">
        <div className="flex justify-between items-center mb-2">
          <label className="font-mono-brutal text-xs uppercase text-[#ffd000] font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            HOW DELUSIONAL ARE YOU?
          </label>
          <span className="bg-[#ff4800] text-white border-2 border-black px-2.5 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000]">
            {input.delusionPercent}% — {getDelusionLabel(input.delusionPercent)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={input.delusionPercent}
          onChange={(e) => updateField('delusionPercent', Number(e.target.value))}
          className="w-full accent-[#ff4800] h-3 bg-black border-2 border-black cursor-pointer"
        />
        <div className="flex justify-between font-mono-brutal text-[11px] text-stone-400 mt-1">
          <span>0% ("I'M DONE 🪦")</span>
          <span>50% ("MAYBE? 🤔")</span>
          <span>100% ("I GOT THIS 😎")</span>
        </div>
      </div>

      {/* Chapters / Chaos inputs row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Work Done */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono-brutal text-xs uppercase text-stone-200 font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#00e297]">
              check_circle
            </span>
            HOW MUCH DID YOU ACTUALLY DO? 😭
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              value={input.doneAmount}
              onChange={(e) => updateField('doneAmount', Math.max(0, Number(e.target.value)))}
              className="w-full bg-[#0c0a09] border-[3px] border-black text-stone-100 px-3 py-2 font-anton text-2xl shadow-[4px_4px_0_#000] focus:outline-none focus:border-[#00e297]"
            />
            <span className="absolute right-3 top-2.5 font-mono-brutal text-xs text-stone-400 font-bold uppercase">
              {input.category === 'money' ? 'DOLLARS' : 'UNITS'}
            </span>
          </div>
        </div>

        {/* Chaos Remaining */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono-brutal text-xs uppercase text-stone-200 font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">
              menu_book
            </span>
            HOW MUCH CHAOS IS LEFT? 💀
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={200}
              value={input.chaosLeft}
              onChange={(e) => updateField('chaosLeft', Math.max(1, Number(e.target.value)))}
              className="w-full bg-[#0c0a09] border-[3px] border-black text-stone-100 px-3 py-2 font-anton text-2xl shadow-[4px_4px_0_#000] focus:outline-none focus:border-[#ff4800]"
            />
            <span className="absolute right-3 top-2.5 font-mono-brutal text-xs text-stone-400 font-bold uppercase">
              {input.category === 'money' ? 'DOLLARS' : 'UNITS'}
            </span>
          </div>
        </div>
      </div>

      {/* Time Left Slider */}
      <div className="mb-6 bg-[#27272a] border-[3px] border-black p-3.5 shadow-[4px_4px_0_#000000]">
        <div className="flex justify-between items-center mb-2">
          <label className="font-mono-brutal text-xs uppercase text-[#ffd000] font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">hourglass_bottom</span>
            HOW MUCH TIME DO YOU HAVE LEFT? ⏰
          </label>
          <span className="bg-[#ff4800] text-white border-2 border-black px-2.5 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000]">
            {input.hoursLeft} {input.hoursLeft === 1 ? 'HOUR' : 'HOURS'}
          </span>
        </div>
        <input
          type="range"
          min={0.5}
          max={48}
          step={0.5}
          value={input.hoursLeft}
          onChange={(e) => updateField('hoursLeft', Number(e.target.value))}
          className="w-full accent-[#ff4800] h-3 bg-black border-2 border-black cursor-pointer"
        />
        <div className="flex justify-between font-mono-brutal text-[11px] text-stone-400 mt-1">
          <span>30 MINS (RIP 🪦)</span>
          <span>12 HOURS (SURVIVAL SWEAT)</span>
          <span>48 HOURS (FALSE SENSE OF COMFORT)</span>
        </div>
      </div>

      {/* Grade Goal Target Pills */}
      <div className="mb-6">
        <label className="block font-mono-brutal text-xs uppercase text-stone-300 font-bold mb-2">
          PASSING THRESHOLD / GRADE GOAL:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { val: 50, label: '50% (Survival)' },
            { val: 70, label: '70% (C-Vibes)' },
            { val: 85, label: '85% (Ambitious)' },
            { val: 95, label: '95% (Delusion)' },
          ].map((grade) => {
            const isSelected = input.targetGrade === grade.val;
            return (
              <button
                key={grade.val}
                type="button"
                onClick={() => {
                  sounds.playClick();
                  updateField('targetGrade', grade.val);
                }}
                className={`p-2 border-[2.5px] border-black text-center font-mono-brutal text-xs uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ffd000] text-black font-bold shadow-[3px_3px_0_#000000]'
                    : 'bg-[#0c0a09] text-stone-300 hover:bg-[#27272a]'
                }`}
              >
                {grade.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood Buttons Grid */}
      <div className="mb-8">
        <label className="block font-mono-brutal text-xs uppercase text-stone-300 font-bold mb-2">
          CURRENT EMOTIONAL &amp; MENTAL STATE:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MOODS.map((m) => {
            const isSelected = input.mood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  sounds.playClick();
                  updateField('mood', m.id);
                }}
                className={`p-2.5 border-[2.5px] border-black text-left font-mono-brutal text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ff4800] text-white font-bold shadow-[4px_4px_0_#000000]'
                    : 'bg-[#27272a] text-stone-300 hover:bg-[#3f3f46] shadow-[2px_2px_0_#000]'
                }`}
              >
                <span className="text-xl">{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Big Action Buttons Cluster */}
      <div className="flex flex-col gap-3">
        {/* Main HUGE COOK ME button */}
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            sounds.playSizzle();
            onCookMe();
          }}
          disabled={isCalculating}
          className="w-full bg-[#ff4800] hover:bg-[#ff5e00] text-white border-[4px] border-black py-4 sm:py-5 font-anton text-3xl sm:text-4xl uppercase tracking-wider shadow-[8px_8px_0_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-3 cursor-pointer group"
        >
          {isCalculating ? (
            <>
              <span className="material-symbols-outlined text-[32px] animate-spin text-[#ffd000]">
                autorenew
              </span>
              <span>CALCULATING YOUR MISTAKES...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[34px] text-[#ffd000] group-hover:scale-110 transition-transform">
                crisis_alert
              </span>
              <span>🔥 COOK ME</span>
            </>
          )}
        </button>

        <p className="text-center font-comic text-stone-400 text-sm">
          “Go on. Ruin your day.”
        </p>

        {/* Separate Random Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onRandomCook();
            }}
            className="w-full bg-[#ffd000] hover:bg-[#ffe600] text-black border-[3.5px] border-black py-3 font-anton text-xl sm:text-2xl uppercase tracking-wide shadow-[5px_5px_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[7px_7px_0_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">casino</span>
            <span>🎲 RANDOMLY COOK ME</span>
          </button>
          <p className="text-center font-mono-brutal text-stone-400 text-xs mt-1">
            “Let the website decide your fate.”
          </p>
        </div>
      </div>
    </div>
  );
};
