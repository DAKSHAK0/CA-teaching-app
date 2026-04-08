export type ExamStage = "CA Inter" | "CA Final";
export type QuizMode = "quick" | "mock";
export type ChapterStatus =
  | "not_started"
  | "reading"
  | "practicing"
  | "revising"
  | "stable";
export type ContentBlockType = "concept" | "framework" | "exam_angle" | "pitfall";
export type AiMode = "viva" | "doubt" | "simplify";

export interface Subject {
  id: string;
  code: string;
  title: string;
  tagline: string;
  examStage: ExamStage;
  chapterIds: string[];
  accent: string;
}

export interface ContentBlock {
  type: ContentBlockType;
  title: string;
  body: string;
  bullets: string[];
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  summary: string;
  takeaways: string[];
  vivaPrompts: string[];
  contentBlocks: ContentBlock[];
  quickQuizId: string;
}

export interface Quiz {
  id: string;
  subjectId: string;
  chapterId?: string;
  title: string;
  description: string;
  mode: QuizMode;
  durationMinutes: number;
  questionIds: string[];
}

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  quizId: string;
  subjectId: string;
  chapterId: string;
  prompt: string;
  conceptTag: string;
  difficulty: "easy" | "medium" | "hard";
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
}

export interface UserProfile {
  name: string;
  examStage: ExamStage;
  selectedSubjectIds: string[];
  dailyMinutes: number;
  onboardingComplete: boolean;
}

export interface ChapterProgress {
  chapterId: string;
  status: ChapterStatus;
  masteryScore: number;
  confidence: number;
  weakSignals: number;
  lastStudiedAt?: string;
  lastQuizAt?: string;
}

export interface TopicTally {
  chapterId: string;
  correct: number;
  total: number;
  accuracy: number;
}

export interface QuizQuestionResult {
  questionId: string;
  selectedOptionId: string | null;
  correct: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  timeSpentSec: number;
  createdAt: string;
  questionResults: QuizQuestionResult[];
  topicTallies: TopicTally[];
}

export interface RevisionTask {
  id: string;
  chapterId: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  reason: string;
  estimatedMinutes: number;
}

export interface AiMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

export interface AiSession {
  id: string;
  mode: AiMode;
  chapterId: string;
  messages: AiMessage[];
}
