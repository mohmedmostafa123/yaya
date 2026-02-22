
export enum UserType {
  DEAF = 'deaf',
  MUTE = 'mute',
  DEAF_MUTE = 'deaf_mute'
}

export enum AppMode {
  DAILY = 'daily',
  SKILLS_DEVELOPMENT = 'skills_development'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface UserProfile {
  name: string;
  type: UserType;
  mode: AppMode;
  wakeWord: string;
  theme: Theme;
  enableSounds: boolean;
  voiceSettings: {
    rate: number;
    pitch: number;
    lang: string;
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: number;
}

export interface SkillsDevelopmentTestResults {
  mathScore: number;
  readingScore: number;
  writingScore: number;
  computerSkills: string[];
  behaviorScore: number;
  summary?: string;
}

// Visualizer Types
export interface SignInfo {
  letter: string;
  imageUrl: string;
}

export interface WordHistory {
  word: string;
  timestamp: number;
}

export interface GeminiContext {
  conceptSignDescription: string;
  mnemonic: string;
  isCommonPhrase: boolean;
}

export interface IncidentLogEntry {
  id: string;
  text: string;
  timestamp: number;
  category?: string;
  reporterName: string;
}
