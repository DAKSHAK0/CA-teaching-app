import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  defaultProfile,
  getQuestionsForQuiz,
  getQuizById,
  seededNotes,
  seededProgress
} from "@/data/demo-data";
import { buildAssistantOpening, buildAssistantReply } from "@/lib/demo-ai";
import { scoreQuiz, updateProgressFromAttempt } from "@/lib/learning";
import { AiMode, AiSession, ChapterProgress, QuizAttempt, UserProfile } from "@/types/models";

const STORAGE_KEY = "ca-prep-os-demo-state";

interface PersistedState {
  profile: UserProfile;
  chapterProgress: Record<string, ChapterProgress>;
  personalNotes: Record<string, string>;
  attempts: QuizAttempt[];
  aiSessions: Record<string, AiSession>;
}

interface AppStoreContextValue extends PersistedState {
  bootstrapped: boolean;
  completeOnboarding: (input: {
    name: string;
    examStage: UserProfile["examStage"];
    selectedSubjectIds: string[];
    dailyMinutes: number;
  }) => void;
  savePersonalNote: (chapterId: string, note: string) => void;
  submitQuizAttempt: (
    quizId: string,
    answers: Record<string, string | null>,
    timeSpentSec: number
  ) => string;
  startAiSession: (mode: AiMode, chapterId: string) => string;
  sendAiMessage: (sessionId: string, prompt: string) => Promise<void>;
  resetDemo: () => void;
}

const defaultState: PersistedState = {
  profile: defaultProfile,
  chapterProgress: seededProgress,
  personalNotes: seededNotes,
  attempts: [],
  aiSessions: {}
};

const AppStoreContext = createContext<AppStoreContextValue | null>(null);

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(defaultState);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    async function hydrate() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as PersistedState;
          setState({
            profile: parsed.profile ?? defaultState.profile,
            chapterProgress: parsed.chapterProgress ?? defaultState.chapterProgress,
            personalNotes: parsed.personalNotes ?? defaultState.personalNotes,
            attempts: parsed.attempts ?? [],
            aiSessions: parsed.aiSessions ?? {}
          });
        }
      } finally {
        setBootstrapped(true);
      }
    }

    hydrate();
  }, []);

  useEffect(() => {
    if (!bootstrapped) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {
      return;
    });
  }, [bootstrapped, state]);

  const value = useMemo<AppStoreContextValue>(
    () => ({
      ...state,
      bootstrapped,
      completeOnboarding(input) {
        setState((current) => ({
          ...current,
          profile: {
            name: input.name.trim() || "Aspirant",
            examStage: input.examStage,
            selectedSubjectIds: input.selectedSubjectIds,
            dailyMinutes: input.dailyMinutes,
            onboardingComplete: true
          }
        }));
      },
      savePersonalNote(chapterId, note) {
        setState((current) => ({
          ...current,
          personalNotes: {
            ...current.personalNotes,
            [chapterId]: note
          }
        }));
      },
      submitQuizAttempt(quizId, answers, timeSpentSec) {
        const quiz = getQuizById(quizId);
        if (!quiz) {
          return "";
        }

        const attempt = scoreQuiz(quiz, getQuestionsForQuiz(quizId), answers, timeSpentSec);

        setState((current) => ({
          ...current,
          attempts: [attempt, ...current.attempts].slice(0, 20),
          chapterProgress: updateProgressFromAttempt(current.chapterProgress, attempt)
        }));

        return attempt.id;
      },
      startAiSession(mode, chapterId) {
        const sessionId = `session-${mode}-${Date.now()}`;
        const opening = buildAssistantOpening(mode, chapterId);

        setState((current) => ({
          ...current,
          aiSessions: {
            ...current.aiSessions,
            [sessionId]: {
              id: sessionId,
              mode,
              chapterId,
              messages: [
                {
                  id: `${sessionId}-opening`,
                  role: "assistant",
                  text: opening
                }
              ]
            }
          }
        }));

        return sessionId;
      },
      async sendAiMessage(sessionId, prompt) {
        const trimmed = prompt.trim();
        if (!trimmed) {
          return;
        }

        const userMessage = {
          id: `${sessionId}-user-${Date.now()}`,
          role: "user" as const,
          text: trimmed
        };

        setState((current) => {
          const session = current.aiSessions[sessionId];
          if (!session) {
            return current;
          }

          return {
            ...current,
            aiSessions: {
              ...current.aiSessions,
              [sessionId]: {
                ...session,
                messages: [...session.messages, userMessage]
              }
            }
          };
        });

        await wait(420);

        setState((current) => {
          const session = current.aiSessions[sessionId];
          if (!session) {
            return current;
          }

          const reply = buildAssistantReply(session, trimmed);

          return {
            ...current,
            aiSessions: {
              ...current.aiSessions,
              [sessionId]: {
                ...session,
                messages: [
                  ...session.messages,
                  {
                    id: `${sessionId}-assistant-${Date.now()}`,
                    role: "assistant",
                    text: reply
                  }
                ]
              }
            }
          };
        });
      },
      resetDemo() {
        setState(defaultState);
        AsyncStorage.removeItem(STORAGE_KEY).catch(() => {
          return;
        });
      }
    }),
    [bootstrapped, state]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within AppStoreProvider.");
  }

  return context;
}
