import React, { useState } from 'react';
import { HallOfShameEntry } from '../types';
import { sounds } from '../utils/audio';

interface HallOfShameProps {
  entries: HallOfShameEntry[];
  onVotePrayers: (id: string) => void;
  onOpenSubmitSin: () => void;
}

export const HallOfShame: React.FC<HallOfShameProps> = ({
  entries,
  onVotePrayers,
  onOpenSubmitSin,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredEntries = entries.filter((e) => {
    if (filterCategory === 'all') return true;
    return e.category.toLowerCase() === filterCategory.toLowerCase();
  });

  return (
    <section id="hall-of-shame" className="w-full py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b-4 border-black pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#ba1a1a] text-white border-2 border-black px-2.5 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] -rotate-1">
              WALL OF INFAMY
            </span>
            <span className="font-mono-brutal text-xs text-stone-400">
              LIVE SUBMISSIONS (N={entries.length})
            </span>
          </div>

          <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl uppercase text-white tracking-tight leading-none drop-shadow-[4px_4px_0_#000]">
            HALL OF SHAME ☠️
          </h2>

          <p className="font-anton text-lg sm:text-xl uppercase text-[#ffd000] tracking-wide mt-2">
            “Where the cooked come to compete.”
          </p>

          <p className="font-sans-brutal text-stone-300 text-sm sm:text-base max-w-2xl mt-1">
            Real desperate souls currently getting turned to charcoal by the semester. Congratulations. You're suffering competitively.
          </p>
        </div>

        {/* Submit Sins CTA */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenSubmitSin();
            }}
            className="bg-[#ffd000] hover:bg-[#ffe600] text-black border-[3.5px] border-black px-6 py-3 font-anton text-xl sm:text-2xl uppercase tracking-wide shadow-[5px_5px_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[7px_7px_0_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">add_circle</span>
            <span>SUBMIT YOUR SINS 📝</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <span className="font-mono-brutal text-xs uppercase text-stone-400 font-bold mr-1 shrink-0">
          FILTER CRISIS:
        </span>
        {[
          { id: 'all', label: 'ALL SINS' },
          { id: 'exam', label: 'EXAMS' },
          { id: 'assignment', label: 'ASSIGNMENTS' },
          { id: 'deadline', label: 'DEADLINES' },
          { id: 'money', label: 'MONEY' },
        ].map((tab) => {
          const isSelected = filterCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sounds.playClick();
                setFilterCategory(tab.id);
              }}
              className={`px-3 py-1 border-2 border-black font-mono-brutal text-xs uppercase font-bold shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#ff4800] text-white shadow-[3px_3px_0_#000]'
                  : 'bg-[#27272a] text-stone-300 hover:bg-[#3f3f46]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* EMPTY STATE: Shown when there are no real user submissions */}
      {entries.length === 0 ? (
        <div className="bg-[#18181b] border-[4px] border-black p-8 sm:p-14 shadow-[8px_8px_0_#000000] text-center flex flex-col items-center justify-center gap-4 my-6 relative overflow-hidden">
          <div className="absolute top-3 right-3 bg-[#00e297] text-black border-2 border-black px-2.5 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] rotate-2">
            ZERO CASUALTIES REGISTERED
          </div>

          <div className="text-6xl sm:text-7xl animate-bounce my-2 select-none">
            😇
          </div>

          <h3 className="font-anton text-2xl sm:text-4xl uppercase tracking-wide text-[#ffd000]">
            “😇 Nobody is cooked yet… be the first.”
          </h3>

          <p className="font-sans-brutal text-sm sm:text-base text-stone-300 max-w-lg leading-relaxed">
            The Wall of Infamy currently stands pristine and unblemished. Has everyone actually studied, or are you all just living in blissful denial?
          </p>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenSubmitSin();
            }}
            className="mt-2 bg-[#ff4800] hover:bg-[#ff5e00] text-white border-[3.5px] border-black px-7 py-3.5 font-anton text-xl sm:text-2xl uppercase tracking-wider shadow-[6px_6px_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[8px_8px_0_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
            <span>SUBMIT THE FIRST DISASTER 🔥</span>
          </button>
        </div>
      ) : filteredEntries.length === 0 ? (
        /* Filter Empty State */
        <div className="bg-[#18181b] border-[3px] border-black p-8 shadow-[5px_5px_0_#000] text-center flex flex-col items-center justify-center gap-3 my-6">
          <span className="text-4xl">🧐</span>
          <h4 className="font-anton text-xl uppercase text-[#ffd000]">
            NO SINS IN THIS CATEGORY YET
          </h4>
          <p className="font-sans-brutal text-xs sm:text-sm text-stone-300 max-w-md">
            No one has confessed to an {filterCategory.toUpperCase()} crisis so far. Be the first to grace this category!
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onOpenSubmitSin()}
              className="bg-[#ff4800] text-white border-2 border-black px-4 py-2 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000]"
            >
              CONFESS AN {filterCategory.toUpperCase()}
            </button>
            <button
              onClick={() => setFilterCategory('all')}
              className="bg-[#27272a] text-stone-200 border-2 border-black px-4 py-2 font-mono-brutal text-xs uppercase font-bold"
            >
              VIEW ALL SINS
            </button>
          </div>
        </div>
      ) : (
        /* Grid of Real User Shame Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEntries.map((entry, idx) => {
            const isExtreme = entry.score >= 95;
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : null;

            return (
              <div
                key={entry.id || idx}
                className={`bg-[#18181b] border-[3px] border-black p-5 shadow-[5px_5px_0_#000000] flex flex-col justify-between hover:translate-y-[-2px] transition-transform relative ${
                  idx === 0 ? 'border-[#ffd000] shadow-[6px_6px_0_#ffd000]' : ''
                }`}
              >
                {medal && (
                  <div className="absolute top-2 right-2 text-3xl select-none opacity-20 pointer-events-none">
                    {medal}
                  </div>
                )}

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="font-mono-brutal text-[10px] bg-[#27272a] border border-black px-2 py-0.5 text-stone-300 uppercase font-bold flex items-center gap-1">
                      {medal && <span>{medal}</span>}
                      <span>{entry.major || entry.category.toUpperCase()}</span>
                    </span>
                    <span
                      className={`border-2 border-black px-2.5 py-0.5 font-anton text-base uppercase shadow-[2px_2px_0_#000] ${
                        isExtreme
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#ff4800] text-white'
                      }`}
                    >
                      {entry.score}% {entry.score >= 100 ? 'CHARRED' : 'COOKED'}
                    </span>
                  </div>

                  <h3 className="font-anton text-xl uppercase text-white tracking-wide">
                    {entry.author}: {entry.major}
                  </h3>

                  <p className="font-sans-brutal text-sm text-stone-300 leading-relaxed bg-[#0c0a09] border border-black p-3">
                    "{entry.story}"
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-black mt-4 flex items-center justify-between font-mono-brutal text-xs text-stone-400">
                  <span>⏰ {entry.timeAgo}</span>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      onVotePrayers(entry.id);
                    }}
                    className={`font-bold flex items-center gap-1 px-3 py-1 border-2 border-black shadow-[2px_2px_0_#000] transition-all cursor-pointer ${
                      entry.userVoted
                        ? 'bg-[#ff4800] text-white'
                        : 'bg-[#27272a] text-[#ff4800] hover:bg-[#3f3f46]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      local_fire_department
                    </span>
                    <span>{entry.prayers} prayers</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
