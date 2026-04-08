import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { fetchPracticeCatalog } from "@/services/demo-services";
import { useAppStore } from "@/store/app-store";
import { colors, radii, spacing } from "@/theme/tokens";
import { Quiz } from "@/types/models";

export default function PracticeScreen() {
  const { profile, attempts } = useAppStore();
  const [quickQuizzes, setQuickQuizzes] = useState<Quiz[]>([]);
  const [mocks, setMocks] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPracticeCatalog(profile.selectedSubjectIds)
      .then((result) => {
        setQuickQuizzes(result.quickQuizzes);
        setMocks(result.mocks);
      })
      .finally(() => setLoading(false));
  }, [profile.selectedSubjectIds]);

  return (
    <Screen contentContainerStyle={styles.container}>
      <SectionHeader
        title="Practice engine"
        subtitle="Quick chapter sprints and mock pressure tests with local scoring and answer review."
      />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <>
          <SectionHeader
            title="Quick quizzes"
            subtitle="Fast checks you can finish inside a short mobile session."
          />
          {quickQuizzes.map((quiz) => (
            <Pressable key={quiz.id} onPress={() => router.push(`/quiz/${quiz.id}`)}>
              <Card>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>{quiz.title}</Text>
                  <View style={styles.modePill}>
                    <Text style={styles.modeLabel}>QUICK</Text>
                  </View>
                </View>
                <Text style={styles.cardBody}>{quiz.description}</Text>
                <Text style={styles.meta}>{quiz.questionIds.length} questions - {quiz.durationMinutes} min</Text>
              </Card>
            </Pressable>
          ))}

          <SectionHeader
            title="Mock sprints"
            subtitle="Mixed-paper simulation to test stamina and topic switching."
          />
          {mocks.map((quiz) => (
            <Pressable key={quiz.id} onPress={() => router.push(`/quiz/${quiz.id}`)}>
              <Card style={styles.mockCard}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>{quiz.title}</Text>
                  <View style={[styles.modePill, styles.mockPill]}>
                    <Text style={[styles.modeLabel, styles.mockLabel]}>MOCK</Text>
                  </View>
                </View>
                <Text style={styles.cardBody}>{quiz.description}</Text>
                <Text style={styles.meta}>{quiz.questionIds.length} questions - {quiz.durationMinutes} min</Text>
              </Card>
            </Pressable>
          ))}

          <SectionHeader
            title="Recent attempts"
            subtitle="Fresh results will appear here after you finish practice."
          />
          {attempts.length === 0 ? (
            <Card>
              <Text style={styles.cardTitle}>No attempts yet</Text>
              <Text style={styles.cardBody}>
                Start with a quick sprint. The result screen will generate weak-topic signals automatically.
              </Text>
            </Card>
          ) : (
            attempts.slice(0, 3).map((attempt) => (
              <Pressable key={attempt.id} onPress={() => router.push(`/results/${attempt.id}`)}>
                <Card>
                  <View style={styles.rowBetween}>
                    <Text style={styles.cardTitle}>
                      {attempt.quizId.replace("quiz-", "").replaceAll("-", " ")}
                    </Text>
                    <Text style={styles.meta}>{attempt.accuracy}%</Text>
                  </View>
                  <Text style={styles.cardBody}>
                    {attempt.correctCount}/{attempt.totalQuestions} correct - {Math.round(attempt.timeSpentSec / 60)} min
                  </Text>
                </Card>
              </Pressable>
            ))
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm
  },
  loading: {
    paddingVertical: 40
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    textTransform: "capitalize"
  },
  cardBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  meta: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700"
  },
  modePill: {
    backgroundColor: "rgba(61, 217, 180, 0.14)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill
  },
  modeLabel: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800"
  },
  mockCard: {
    borderColor: colors.gold
  },
  mockPill: {
    backgroundColor: "rgba(244, 184, 96, 0.16)"
  },
  mockLabel: {
    color: colors.gold
  }
});
