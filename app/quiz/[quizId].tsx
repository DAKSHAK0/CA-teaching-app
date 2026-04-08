import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { Card } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { fetchQuizBundle } from "@/services/demo-services";
import { useAppStore } from "@/store/app-store";
import { colors, radii, spacing } from "@/theme/tokens";
import { Question, Quiz } from "@/types/models";

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const { submitQuizAttempt } = useAppStore();
  const [quiz, setQuiz] = useState<Quiz | undefined>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!quizId) {
      return;
    }

    fetchQuizBundle(quizId)
      .then((result) => {
        setQuiz(result.quiz);
        setQuestions(result.questions);
      })
      .finally(() => setLoading(false));
  }, [quizId]);

  const currentQuestion = questions[index];
  const isLastQuestion = index === questions.length - 1;

  function handleSubmit() {
    if (!quiz) {
      return;
    }

    const attemptId = submitQuizAttempt(
      quiz.id,
      answers,
      Math.round((Date.now() - startedAt.current) / 1000)
    );
    router.replace(`/results/${attemptId}`);
  }

  return (
    <Screen scroll={false} style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>Exit</Text>
        </Pressable>
        <Text style={styles.mode}>{quiz?.mode === "mock" ? "MOCK" : "QUICK QUIZ"}</Text>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <>
          <View style={styles.progressBlock}>
            <Text style={styles.title}>{quiz?.title}</Text>
            <Text style={styles.subtitle}>
              Question {index + 1} of {questions.length}
            </Text>
            <ProgressBar value={((index + 1) / questions.length) * 100} />
          </View>

          <Card style={styles.questionCard}>
            <Text style={styles.prompt}>{currentQuestion?.prompt}</Text>
            <View style={styles.options}>
              {currentQuestion?.options.map((option) => {
                const selected = answers[currentQuestion.id] === option.id;
                return (
                  <Pressable
                    key={option.id}
                    onPress={() =>
                      setAnswers((current) => ({
                        ...current,
                        [currentQuestion.id]: option.id
                      }))
                    }
                    style={[styles.option, selected && styles.optionSelected]}
                  >
                    <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Card>

          <View style={styles.footer}>
            <PrimaryButton
              label="Previous"
              onPress={() => setIndex((current) => Math.max(0, current - 1))}
              variant="ghost"
              disabled={index === 0}
            />
            <PrimaryButton
              label={isLastQuestion ? "Submit attempt" : "Next question"}
              onPress={() => {
                if (isLastQuestion) {
                  handleSubmit();
                } else {
                  setIndex((current) => current + 1);
                }
              }}
            />
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.sm,
    marginBottom: spacing.lg
  },
  back: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700"
  },
  mode: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  progressBlock: {
    gap: spacing.sm,
    marginBottom: spacing.lg
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14
  },
  questionCard: {
    flex: 1,
    justifyContent: "space-between"
  },
  prompt: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700"
  },
  options: {
    gap: spacing.sm
  },
  option: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.md
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: "rgba(61, 217, 180, 0.14)"
  },
  optionLabel: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  optionLabelSelected: {
    color: colors.primary
  },
  footer: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md
  }
});
