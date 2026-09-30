import React, { useState } from 'react';
import { HallOfShameEntry } from '../types';
import { sounds } from '../utils/audio';

interface SubmitSinModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultScore: number;
  defaultStory: string;
  onSubmit: (entry: HallOfShameEntry) => void;
}

export const SubmitSinModal: React.FC<SubmitSinModalProps> = ({
  isOpen,
  onClose,
  defaultScore,
  defaultStory,
  onSubmit,
}) => {
  const [author, setAuthor] = useState('');
  const [major, setMajor] = useState('');
  const [category, setCategory] = useState('exam');
  const [score, setScore] = useState(defaultScore || 92);
  const [story, setStory] = useState(defaultStory || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !story.trim()) {
      alert('Please enter your alias and what actually happened!');
      return;
    }

    sounds.playClick();
    sounds.playDoomSting(false);

    const newEntry: HallOfShameEntry = {
      id: `shame-user-${Date.now()}`,
      author: author.trim().toUpperCase(),
      major: (major.trim() || 'DESPERATE STUDENT').toUpperCase(),
      category,
      score: Math.min(100, Math.max(1, score)),
      story: story.trim(),
      timeAgo: 'Just now',
      prayers: 1,
      userVoted: true,
    };

    onSubmit(newEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-[#18181b] border-[5px] border-black shadow-[12px_12px_0_#ffd000] max-w-lg w-full p-6 sm:p-8 flex flex-col gap-4 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 bg-[#27272a] hover:bg-[#3f3f46] text-white border-2 border-black px-2.5 py-1 font-mono-brutal text-xs font-bold shadow-[2px_2px_0_#000] cursor-pointer"
        >
          ✕ CLOSE
        </button>

        <div>
          <span className="bg-[#ba1a1a] text-white border-2 border-black px-2.5 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] inline-block mb-1">
            CONFESSIONAL BOOTH
          </span>
          <h3 className="font-anton text-3xl sm:text-4xl uppercase text-white tracking-wide">
            SUBMIT YOUR SINS ☠️
          </h3>
          <p className="font-sans-brutal text-xs text-stone-400">
            Immortalize your academic downfall on the Wall of Infamy.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-brutal text-xs uppercase text-stone-300 font-bold mb-1">
                YOUR ALIAS / NAME:
              </label>
              <input
                type="text"
                required
                maxLength={24}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. COOKED_CHAD"
                className="w-full bg-[#0c0a09] border-2 border-black p-2 font-mono-brutal text-sm text-white focus:outline-none focus:border-[#ffd000]"
              />
            </div>

            <div>
              <label className="block font-mono-brutal text-xs uppercase text-stone-300 font-bold mb-1">
                MAJOR / IDENTITY:
              </label>
              <input
                type="text"
                maxLength={24}
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="e.g. CS MAJOR / PRE-MED"
                className="w-full bg-[#0c0a09] border-2 border-black p-2 font-mono-brutal text-sm text-white focus:outline-none focus:border-[#ffd000]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-brutal text-xs uppercase text-stone-300 font-bold mb-1">
                CATEGORY:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0c0a09] border-2 border-black p-2 font-mono-brutal text-xs text-white uppercase focus:outline-none focus:border-[#ffd000]"
              >
                <option value="exam">EXAM</option>
                <option value="assignment">ASSIGNMENT</option>
                <option value="deadline">DEADLINE</option>
                <option value="money">MONEY</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between font-mono-brutal text-xs uppercase text-stone-300 font-bold mb-1">
                <span>COOKED SCORE:</span>
                <span className="text-[#ff4800]">{score}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full accent-[#ff4800] h-3 bg-black border border-black cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono-brutal text-xs uppercase text-stone-300 font-bold mb-1">
              THE CONFESSION (WHAT HAPPENED?):
            </label>
            <textarea
              required
              rows={3}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Tell your painful truth..."
              className="w-full bg-[#0c0a09] border-2 border-black p-2.5 font-sans-brutal text-sm text-stone-200 focus:outline-none focus:border-[#ff4800] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-[#ffd000] hover:bg-[#ffe600] text-black border-[3px] border-black py-3 font-anton text-xl uppercase tracking-wider shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
          >
            ETCH SINS INTO THE WALL OF INFAMY 🔥
          </button>
        </form>
      </div>
    </div>
  );
};
