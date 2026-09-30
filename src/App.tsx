import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MainCookCard } from './components/MainCookCard';
import { ResultScreen } from './components/ResultScreen';
import { HallOfShame } from './components/HallOfShame';
import { SurvivalGuide } from './components/SurvivalGuide';
import { PanicModal } from './components/PanicModal';
import { SubmitSinModal } from './components/SubmitSinModal';
import { Footer } from './components/Footer';
import { CookInput, CookResult, HallOfShameEntry } from './types';
import { DOOM_PRESETS } from './data/presets';
import { getShameEntries, saveShameEntries } from './data/shameData';
import { calculateCookScore } from './utils/calculator';
import { sounds } from './utils/audio';

const INITIAL_INPUT: CookInput = {
  situationText: 'Exam in 4 hours on 16 chapters. Have opened 2. Resting pulse is 132 BPM.',
  category: 'exam',
  delusionPercent: 70,
  hoursLeft: 4.5,
  chaosLeft: 16,
  doneAmount: 2,
  targetGrade: 70,
  mood: 'numb',
};

export default function App() {
  const [input, setInput] = useState<CookInput>(INITIAL_INPUT);
  const [result, setResult] = useState<CookResult>(() => calculateCookScore(INITIAL_INPUT));
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [isSubmitSinOpen, setIsSubmitSinOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const shakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shameEntries, setShameEntries] = useState<HallOfShameEntry[]>(() => getShameEntries());
  const [defaultSinStory, setDefaultSinStory] = useState('');
  const [defaultSinScore, setDefaultSinScore] = useState(95);

  useEffect(() => {
    return () => {
      if (shakeTimerRef.current) {
        clearTimeout(shakeTimerRef.current);
      }
    };
  }, []);

  const triggerFireEmbers = (is100 = false) => {
    try {
      confetti({
        particleCount: is100 ? 120 : 60,
        spread: is100 ? 100 : 70,
        origin: { y: 0.6 },
        colors: ['#ff4800', '#ffd000', '#ba1a1a', '#ffffff', '#000000'],
      });
    } catch {
      // ignore
    }
  };

  const triggerShake100 = () => {
    // Clear any pending timeout
    if (shakeTimerRef.current) {
      clearTimeout(shakeTimerRef.current);
    }
    // Increment shakeKey to force a fresh animation execution
    setShakeKey((prev) => prev + 1);
    setIsShaking(true);

    // Stop after exactly 1.5 seconds (1500ms)
    shakeTimerRef.current = setTimeout(() => {
      setIsShaking(false);
      shakeTimerRef.current = null;
    }, 1500);
  };

  const handleCookMe = () => {
    setIsCalculating(true);
    sounds.playClick();
    sounds.playSizzle();

    setTimeout(() => {
      const calculated = calculateCookScore(input);
      setResult(calculated);
      setIsCalculating(false);

      const is100 = calculated.score >= 100;
      sounds.playDoomSting(is100);

      triggerFireEmbers(is100);

      if (is100) {
        triggerShake100();
      } else {
        // If not 100%, ensure no shake is running
        if (shakeTimerRef.current) {
          clearTimeout(shakeTimerRef.current);
          shakeTimerRef.current = null;
        }
        setIsShaking(false);
      }

      // Smooth scroll to result
      const elem = document.getElementById('results-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  const handleRandomCook = () => {
    sounds.playClick();
    const preset = DOOM_PRESETS[Math.floor(Math.random() * DOOM_PRESETS.length)];
    const newInput: CookInput = {
      situationText: preset.situation,
      category: preset.category,
      delusionPercent: preset.delusion,
      hoursLeft: preset.hours,
      chaosLeft: preset.remain,
      doneAmount: preset.done,
      targetGrade: preset.target,
      mood: preset.mood,
    };
    setInput(newInput);

    // Immediately calculate
    const calculated = calculateCookScore(newInput);
    setResult(calculated);

    const is100 = calculated.score >= 100;
    sounds.playDoomSting(is100);
    triggerFireEmbers(is100);

    if (is100) {
      triggerShake100();
    } else {
      if (shakeTimerRef.current) {
        clearTimeout(shakeTimerRef.current);
        shakeTimerRef.current = null;
      }
      setIsShaking(false);
    }

    const elem = document.getElementById('results-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVotePrayers = (id: string) => {
    setShameEntries((prev) => {
      const updated = prev.map((entry) => {
        if (entry.id === id) {
          const wasVoted = !!entry.userVoted;
          return {
            ...entry,
            prayers: wasVoted ? entry.prayers - 1 : entry.prayers + 1,
            userVoted: !wasVoted,
          };
        }
        return entry;
      });
      saveShameEntries(updated);
      return updated;
    });
  };

  const handleOpenSubmitSinModal = (score?: number, story?: string) => {
    setDefaultSinScore(score ?? result?.score ?? 95);
    setDefaultSinStory(story ?? input.situationText);
    setIsSubmitSinOpen(true);
  };

  const handleAddNewSin = (newEntry: HallOfShameEntry) => {
    setShameEntries((prev) => {
      const updated = [newEntry, ...prev];
      saveShameEntries(updated);
      return updated;
    });
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      key={isShaking ? `shake-run-${shakeKey}` : 'static-screen'}
      onAnimationEnd={() => setIsShaking(false)}
      className={`min-h-screen bg-[#0c0a09] bg-grunge-dots text-stone-100 flex flex-col ${
        isShaking ? 'animate-shake-100' : ''
      }`}
    >
      {/* Brutalist Navigation Bar */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPanic={() => setIsPanicOpen(true)}
      />

      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section with Large Stickers and Frying Pan Mascot */}
        <div id="hero">
          <HeroSection
            onCookMeClick={() => {
              const calcEl = document.getElementById('calculator');
              if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
            }}
            onRandomClick={handleRandomCook}
          />
        </div>

        {/* Hazard Ticker Band */}
        <div className="w-full bg-[#ff4800] text-black py-2 border-y-[3px] border-black flex items-center justify-center font-mono-brutal text-xs sm:text-sm uppercase tracking-wider font-bold select-none overflow-hidden">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <span>⚡ WARNING: DO NOT DRINK 5TH MONSTER ENERGY DRINK ⚡</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">STUDY TRIAGE IN PROGRESS</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">THE PROFESSOR DOES NOT CURVE</span>
            <span className="hidden lg:inline">•</span>
            <span className="hidden lg:inline">COGNITIVE PROCESSING: 14.2 BAUD</span>
          </div>
        </div>

        {/* Interactive Main Cooking Form + Live Result Showcase Area */}
        <section className="w-full px-4 sm:px-8 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: The Crisp-O-Matic 3000 Input Card */}
            <div className="lg:col-span-7">
              <MainCookCard
                input={input}
                onChangeInput={setInput}
                onCookMe={handleCookMe}
                onRandomCook={handleRandomCook}
                isCalculating={isCalculating}
              />
            </div>

            {/* Right Column: Live Result Showcase */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Quick Result Preview Box */}
              <div className="bg-[#18181b] border-[4px] border-black p-5 shadow-[7px_7px_0_#000] relative">
                <div className="bg-[#ffd000] text-black border-2 border-black px-2.5 py-0.5 font-mono-brutal text-xs uppercase font-bold shadow-[2px_2px_0_#000] inline-block mb-3">
                  DIAGNOSTIC RADAR
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-anton text-5xl sm:text-6xl text-[#ff4800] drop-shadow-[3px_3px_0_#000]">
                    {result.score}%
                  </span>
                  <span className="font-anton text-2xl text-white uppercase">
                    {result.score >= 100 ? 'CHARRED ☠️' : 'COOKED 🔥'}
                  </span>
                </div>

                {/* Meter preview */}
                <div className="w-full h-5 bg-[#0c0a09] border-2 border-black p-0.5 mb-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00e297] via-[#ffd000] to-[#ba1a1a] transition-all duration-500"
                    style={{ width: `${result.score}%` }}
                  />
                </div>

                <p className="font-sans-brutal text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                  {result.punchline}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('results-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#27272a] hover:bg-[#3f3f46] text-white border-2 border-black py-2 font-anton text-base uppercase tracking-wide shadow-[3px_3px_0_#000] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>VIEW FULL REPORT &amp; EXHIBITS</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </button>
              </div>

              {/* Fake Warning Status Box from prompt */}
              <div className="bg-[#ffd000] text-black border-[3.5px] border-black p-4 shadow-[6px_6px_0_#000] -rotate-1">
                <div className="flex items-center gap-2 font-anton text-xl uppercase mb-1">
                  <span>🚨</span> COOKING STATUS
                </div>
                <p className="font-sans-brutal text-sm font-bold leading-snug">
                  “Your situation has been forwarded to absolutely nobody.”
                </p>
                <div className="mt-2 pt-2 border-t-2 border-black flex justify-between font-mono-brutal text-xs">
                  <span>100% SCIENTIFICALLY UNNECESSARY</span>
                  <span>ZERO GRACE PERIOD</span>
                </div>
              </div>

              {/* Second Funny Mascot Card */}
              <div className="bg-[#18181b] border-[3px] border-black p-4 shadow-[5px_5px_0_#000] flex items-center gap-3">
                <div className="text-4xl select-none">🫠</div>
                <div>
                  <span className="font-mono-brutal text-xs text-[#ffd000] uppercase font-bold block">
                    CURRENT CONSENSUS
                  </span>
                  <p className="font-comic text-xs text-stone-300">
                    “Unfortunately, the math is structurally not on your side.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Results Section: Giant Heat Meter, 100% Final Boss State, Exhibits A-D, Field Guide */}
          <ResultScreen
            result={result}
            onOpenPanic={() => setIsPanicOpen(true)}
            onSubmitToShame={(score, story) => handleOpenSubmitSinModal(score, story)}
            onRecalculate={() => {
              const calcEl = document.getElementById('calculator');
              if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>

        {/* Hall of Shame Leaderboard */}
        <HallOfShame
          entries={shameEntries}
          onVotePrayers={handleVotePrayers}
          onOpenSubmitSin={() => handleOpenSubmitSinModal()}
        />

        {/* Survival Guide */}
        <SurvivalGuide />
      </main>

      {/* Footer */}
      <Footer />

      {/* SOS Panic Modal */}
      <PanicModal
        isOpen={isPanicOpen}
        onClose={() => setIsPanicOpen(false)}
      />

      {/* Submit Sin Modal */}
      <SubmitSinModal
        isOpen={isSubmitSinOpen}
        onClose={() => setIsSubmitSinOpen(false)}
        defaultScore={defaultSinScore}
        defaultStory={defaultSinStory}
        onSubmit={handleAddNewSin}
      />
    </div>
  );
}
