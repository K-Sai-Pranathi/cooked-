import { CookInput, CookResult } from '../types';

export function calculateCookScore(input: CookInput): CookResult {
  const {
    category,
    hoursLeft,
    chaosLeft,
    doneAmount,
    targetGrade,
    delusionPercent,
    mood
  } = input;

  const validDone = Math.max(0, doneAmount);
  const validChaos = Math.max(1, chaosLeft);
  const validHours = Math.max(0.2, hoursLeft);

  // Chapters / tasks per hour needed
  const rateNeeded = validChaos / validHours;
  const minutesPerUnit = (validHours * 60) / validChaos;

  // Mood weight
  let moodWeight = 15;
  if (mood === 'delusional') moodWeight = -5;
  if (mood === 'sweating') moodWeight = 12;
  if (mood === 'numb') moodWeight = 22;
  if (mood === 'ascended') moodWeight = 28;

  // Base doom formula
  // Higher rate needed = much higher doom
  let baseScore = (rateNeeded * 16) + (targetGrade * 0.3) - (validDone * 1.8) + moodWeight;

  // Time urgency multipliers
  if (validHours <= 1) baseScore += 25;
  else if (validHours <= 2.5) baseScore += 16;
  else if (validHours <= 5) baseScore += 8;

  // Delusion penalty: high delusion with near zero work is lethal
  if (delusionPercent >= 80 && validDone <= 1 && validChaos >= 10) {
    baseScore += 18;
  }

  // Extreme ratio check (e.g. 16+ remaining with < 3 hours)
  if (rateNeeded >= 4.5) {
    baseScore = Math.max(baseScore, 92);
  }
  if (rateNeeded >= 7 || (validHours <= 1.5 && validChaos >= 12 && validDone <= 1)) {
    baseScore = 100;
  }

  let finalScore = Math.min(100, Math.max(15, Math.round(baseScore)));

  // If inputs are at absolute disaster extremes, guarantee 100
  if (validHours <= 1 && validChaos >= 15) {
    finalScore = 100;
  }

  let title = '';
  let badge = '';
  let badgeColor = '';
  let punchline = '';
  let handwrittenDialogue = '';
  let meterLevel: 'aldente' | 'mediumrare' | 'charred' | 'critical' = 'charred';

  if (finalScore >= 100) {
    meterLevel = 'critical';
    title = '100% COOKED ☠️🔥';
    badge = '🚨 CRITICAL LEVEL: MAXIMUM CHARRED';
    badgeColor = 'bg-[#ba1a1a] text-white';
    punchline = `THERE IS NOTHING LEFT TO CALCULATE. 💀 You require ${minutesPerUnit < 1 ? '< 45 seconds' : `${minutesPerUnit.toFixed(1)} minutes`} per unit.`;
    handwrittenDialogue = 'Bro... you have officially reached maximum cookedness. You are no longer in the pan; you ARE the charcoal.';
  } else if (finalScore >= 90) {
    meterLevel = 'critical';
    title = `${finalScore}% COOKED 🔥`;
    badge = 'STATUS: EXTRA CRISPY DEEP-FRIED ROAST';
    badgeColor = 'bg-[#ba1a1a] text-white';
    punchline = `Math does not math: You require ${minutesPerUnit.toFixed(1)} minutes per unit with zero pauses and zero blinking.`;
    handwrittenDialogue = 'Your comeback story has been officially cancelled by the writers. Start practicing your apologies.';
  } else if (finalScore >= 70) {
    meterLevel = 'charred';
    title = `${finalScore}% COOKED 🔥`;
    badge = 'STATUS: MEDIUM-HIGH ROAST (BURNING EDGES)';
    badgeColor = 'bg-[#ff4800] text-white';
    punchline = `You have ${validHours} hours to cover ${validChaos} units. Feasible only if you consume pure adrenaline.`;
    handwrittenDialogue = 'Bro... this is getting serious. The math is visibly shaking in its boots.';
  } else if (finalScore >= 45) {
    meterLevel = 'mediumrare';
    title = `${finalScore}% COOKED 😰`;
    badge = 'STATUS: SIMMERING POTATO (SAVABLE)';
    badgeColor = 'bg-[#ffd000] text-black';
    punchline = `Lock your phone in an underground safe right now and you might pull off a miraculous ${Math.min(82, targetGrade)}%.`;
    handwrittenDialogue = 'There is still a microscopic sliver of hope. Do not open YouTube or all is lost.';
  } else {
    meterLevel = 'aldente';
    title = `${finalScore}% COOKED 🧊`;
    badge = "STATUS: RAW & UNCOOKED (CHILLIN')";
    badgeColor = 'bg-[#00e297] text-black';
    punchline = `You actually have enough time if you act like a civilized human being.`;
    handwrittenDialogue = 'Why are you even on this website? Go sleep or study at a leisurely pace, nerd.';
  }

  const categoryNoun =
    category === 'exam' ? 'chapter' :
    category === 'assignment' ? 'task' :
    category === 'deadline' ? 'deliverable' :
    category === 'money' ? 'financial disaster dollar' : 'variable';

  const temporalAnalysis = `Temporal Impossibility: You have ${validChaos} ${categoryNoun}s and ${validHours} hours left. That is exactly ${minutesPerUnit < 1 ? 'under 60 seconds' : `${minutesPerUnit.toFixed(1)} minutes`} per ${categoryNoun}, assuming zero bathroom breaks.`;

  // Custom exhibits based on category
  const whyCooked = [
    {
      title: 'Temporal Impossibility',
      desc: temporalAnalysis,
      icon: 'alarm'
    },
    {
      title: 'Dopamine Hostage Crisis',
      desc: 'You opened your browser for a 5-minute study playlist and are currently 38 minutes deep into a documentary on ancient Roman plumbing.',
      icon: 'smart_display'
    },
    {
      title: 'Caffeine Tachycardia',
      desc: 'Your resting pulse is 134 BPM from carbonated energy syrup, yet your cognitive processing speed is matching a 1996 dial-up modem.',
      icon: 'bolt'
    },
    {
      title: 'Hostile Evaluation Matrix',
      desc: category === 'exam'
        ? 'The professor wrote the final exam questions based on footnotes found on page 812 of the textbook they wrote themselves.'
        : category === 'assignment'
        ? 'The rubric was updated 40 minutes ago and requires three external citations in APA 7th edition formatted in hieroglyphics.'
        : 'The universe operates under Murphy’s Law, and you are currently Murphy’s designated favorite victim.',
      icon: 'skull'
    }
  ];

  const howToUncook = [
    {
      title: 'The 80/20 Academic Triage',
      desc: 'Abandon all pride. Identify the 3 core equations or concepts that represent 65% of the grade. Throw the rest into the spiritual void.',
      icon: 'content_cut'
    },
    {
      title: 'Our Lord & Savior on YouTube',
      desc: 'Search for a 14-minute tutorial uploaded 9 years ago by an instructor with a muffled microphone and faint fan noise. Watch at 2.25x speed.',
      icon: 'play_circle'
    },
    {
      title: 'Tactical Ice Facial Shock',
      desc: 'Splash freezing cold tap water on your eyeballs. Place your phone inside a sealed container in another room. Lock the door.',
      icon: 'ac_unit'
    },
    {
      title: 'Aggressive Delusional Gaslighting',
      desc: 'Look directly into the mirror for 30 seconds and forcefully convince your subconscious you personally invented this entire curriculum.',
      icon: 'psychology'
    }
  ];

  return {
    score: finalScore,
    title,
    badge,
    badgeColor,
    punchline,
    handwrittenDialogue,
    meterLevel,
    temporalAnalysis,
    whyCooked,
    howToUncook,
    calculatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    inputSnapshot: input
  };
}
