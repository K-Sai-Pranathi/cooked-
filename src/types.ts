export type CategoryType = 'exam' | 'assignment' | 'deadline' | 'money' | 'random';

export type MoodType = 'delusional' | 'sweating' | 'numb' | 'ascended';

export interface CookInput {
  situationText: string;
  category: CategoryType;
  delusionPercent: number; // 0 to 100
  hoursLeft: number; // 0.5 to 72
  chaosLeft: number; // e.g. 1 to 50
  doneAmount: number; // e.g. 0 to 50
  targetGrade: number; // 50, 70, 85, 95
  mood: MoodType;
}

export interface CookResult {
  score: number; // 0 to 100
  title: string;
  badge: string;
  badgeColor: string;
  punchline: string;
  handwrittenDialogue: string;
  meterLevel: 'aldente' | 'mediumrare' | 'charred' | 'critical';
  temporalAnalysis: string;
  whyCooked: Array<{ title: string; desc: string; icon: string }>;
  howToUncook: Array<{ title: string; desc: string; icon: string }>;
  calculatedAt: string;
  inputSnapshot: CookInput;
}

export interface HallOfShameEntry {
  id: string;
  rank?: number;
  author: string;
  major: string;
  category: string;
  score: number;
  story: string;
  timeAgo: string;
  prayers: number;
  userVoted?: boolean;
}

export interface PresetScenario {
  id: string;
  name: string;
  tag: string;
  situation: string;
  category: CategoryType;
  done: number;
  remain: number;
  hours: number;
  target: number;
  mood: MoodType;
  delusion: number;
}
