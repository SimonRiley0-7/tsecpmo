export enum Speaker {
  NONE = 'NONE',
  SUPPORT = 'SUPPORT',
  OPPOSE = 'OPPOSE',
  JUDGE = 'JUDGE',
  SYSTEM = 'SYSTEM'
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING', // Backend processing
  PLAYING = 'PLAYING',     // Acting out the script
  FINISHED = 'FINISHED',
  ERROR = 'ERROR'
}

export interface WordTimestamp {
  word: string;
  start_time: number;
  end_time: number;
}

// Backend factor structure
export interface Factor {
  id: string;
  name: string;
  description: string;
  evidence?: string[];
}

// Debate turn from backend
export interface DebateTurn {
  role: 'support' | 'oppose';
  factorId: string;
  turn: number;
  thesis: string;
  reasoning: string;
  evidence?: string[];
  concessions?: string[];
}

// Synthesis per factor from backend
export interface SynthesisPerFactor {
  factorId: string;
  factorName: string;
  summarySupport: string;
  summaryOppose: string;
  verdict: string;
  recommendations?: string[];
}

// Final synthesis from backend
export interface Synthesis {
  overallSummary: string;
  whatWorked: string[];
  whatFailed: string[];
  rootCauses: string[];
  recommendations: string[];
  perFactor: SynthesisPerFactor[];
}

// Extended DialogueStep with metadata for UI
export interface DialogueStep {
  speaker: Speaker;
  text: string;
  reasoning?: string;
  // Audio data (populated after TTS processing)
  audioUrl?: string;
  timestamps?: WordTimestamp[];
  // Metadata for UI display
  factorInfo?: {
    factorId: string;
    factorName: string;
    roundNumber?: number;
    totalRounds?: number;
  };
  stepType?: 'factor-announcement' | 'debate-turn' | 'verdict' | 'factor-complete';
}

export interface CourtSession {
  topic: string;
  transcript: DialogueStep[];
  verdict: string;
}

export interface PixelArtProps {
  isActive: boolean;
  className?: string;
}