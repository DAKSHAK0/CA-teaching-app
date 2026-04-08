import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { getChapterById, getQuestionsForQuiz, getQuizById } from "@/data/demo-data";
import { useAppStore } from "@/store/app-store";
import { colors, radii, spacing } from "@/theme/tokens";

export default function ResultScreen() {
  const { attemptId } = useLocalSearchParams<{ attemptId: string }>();
  const { attempts } = useAppStore();

  const attempt = attempts.find((item) => item.id === attemptId);
  const quiz = attempt ? getQuizById(attempt.quizId) : undefined;
  const questionSet = quiz ? getQuestionsForQuiz(quiz.id) : [];
  const weakest = attempt?.topicTallies.slice().sort((left, right) => left.accuracy - right.accuracy)[0];

  if (!attempt || !quiz) {
    return (
      <Screen contentContainerStyle={styles.container}>
        <Text style={styles.title}>Result not found</Text>
      </Screen>
    );
  }

  return (
    <Screen contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.replace("/(tabs)/practice")}>
        <Text style={styles.back}>Back to practice</Text>
      </Pressable>

      <View style={styles.hero}>
        <Text style={styles.heroLabel}>Attempt complete</Text>
        <Text style={styles.heroScore}>{attempt.accuracy}%</Text>
        <Text style={styles.heroCopy}>
          {attempt.correctCount}/{attempt.totalQuestions} correct in {Math.round(attempt.timeSpentSec / 60)} minutes.
        </Text>
        <ProgressBar value={Math.max(8, attempt.accuracy)} tone={attempt.accuracy >= 70 ? "primary" : "gold"} />
      </View>

      {weakest ? (
        <Card>
          <Text style={styles.cardTitle}>Primary repair zone</Text>
          <Text style={styles.cardBody}>{getChapterById(weakest.chapterId)?.title}</Text>
          <Text style={styles.meta}>{weakest.accuracy}% topic accuracy</Text>
          <PrimaryButton
            label="Revise this chapter"
            onPress={() => router.push(`/chapter/${weakest.chapterId}`)}
          />
        </Card>
      ) : null}

      <Card>
        <Text style={styles.cardTitle}>Question review</Text>
        {attempt.questionResults.map((result, index) => {
          const question = questionSet.find((item) => item.id === result.questionId);
          const selected = question?.options.find((item) => item.id === result.selectedOptionId)?.label;
          const correct = question?.options.find((item) => item.id === question.correctOptionId)?.label;

          return (
            <View key={result.questionId} style={styles.reviewItem}>
              <Text style={styles.questionNumber}>Q{index + 1}</Text>
              <Text style={styles.cardBody}>{question?.prompt}</Text>
              <Text style={styles.meta}>{result.correct ? "Correct" : "Incorrect"}</Text>
              <Text style={styles.answerLine}>Your answer: {selected ?? "Skipped"}</Text>
              <Text style={styles.answerLine}>Correct answer: {correct}</Text>
              <Text style={styles.explanation}>{question?.explanation}</Text>
            </View>
          );
        })}
      </Card>

      <View style={styles.actions}>
        <PrimaryButton label="Retry quiz" onPress={() => router.replace(`/quiz/${quiz.id}`)} variant="secondary" />
        <PrimaryButton label="Go to insights" onPress={() => router.replace("/(tabs)/insights")} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm
  },
  back: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700"
  },
  hero: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  heroLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1
  },
  heroScore: {
    color: colors.text,
    fontSize: 44,
    fontWeight: "800"
  },
  heroCopy: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800"
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700"
  },
  cardBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  meta: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700"
  },
  reviewItem: {
    gap: 6,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  questionNumber: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "800"
  },
  answerLine: {
    color: colors.text,
    fontSize: 13
  },
  explanation: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  actions: {
    gap: spacing.sm
  }
});
