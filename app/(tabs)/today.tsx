import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { getChapterById } from "@/data/demo-data";
import {
  buildReadinessScore,
  buildRevisionTasks,
  buildWeakTopics,
  formatRelativeWindow,
  getRecommendedAction
} from "@/lib/learning";
import { useAppStore } from "@/store/app-store";
import { colors, radii, spacing } from "@/theme/tokens";

export default function TodayScreen() {
  const { profile, chapterProgress, attempts } = useAppStore();
  const readiness = buildReadinessScore(chapterProgress);
  const recommendedAction = getRecommendedAction(profile.selectedSubjectIds, chapterProgress);
  const revisionTasks = buildRevisionTasks(chapterProgress).filter((task) => {
    const chapter = getChapterById(task.chapterId);
    return chapter ? profile.selectedSubjectIds.includes(chapter.subjectId) : false;
  });
  const weakTopics = buildWeakTopics(chapterProgress)
    .filter((item) => item.chapter && profile.selectedSubjectIds.includes(item.chapter.subjectId))
    .slice(0, 3);

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Today</Text>
          <Text style={styles.title}>Welcome back, {profile.name}.</Text>
          <Text style={styles.subtitle}>Your next best move is already queued.</Text>
        </View>
        <Pressable onPress={() => router.push("/profile")} style={styles.avatar}>
          <Ionicons color={colors.text} name="person-outline" size={18} />
        </Pressable>
      </View>

      <LinearGradient colors={["#113049", "#143640", "#143B33"]} style={styles.hero}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroLabel}>Exam readiness</Text>
            <Text style={styles.heroScore}>{readiness}</Text>
          </View>
          <View style={styles.focusPill}>
            <Text style={styles.focusPillText}>{profile.dailyMinutes} min target</Text>
          </View>
        </View>
        <ProgressBar value={readiness} />
        <Text style={styles.heroCopy}>
          Strongest next action: {recommendedAction.label.toLowerCase()} on {recommendedAction.description}.
        </Text>
        <PrimaryButton
          label={recommendedAction.label}
          onPress={() => {
            if (recommendedAction.chapterId) {
              router.push(`/chapter/${recommendedAction.chapterId}`);
            }
          }}
        />
      </LinearGradient>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{revisionTasks.length}</Text>
          <Text style={styles.statLabel}>Revision tasks</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{weakTopics.length}</Text>
          <Text style={styles.statLabel}>Weak zones</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{attempts.length}</Text>
          <Text style={styles.statLabel}>Attempts logged</Text>
        </Card>
      </View>

      <SectionHeader
        title="Revision queue"
        subtitle="Priority tasks generated from your weak-topic and revision logic."
      />
      {revisionTasks.slice(0, 3).map((task) => (
        <Pressable key={task.id} onPress={() => router.push(`/chapter/${task.chapterId}`)}>
          <Card>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{task.chapterId.replaceAll("-", " ")}</Text>
              <Text style={[styles.priority, task.priority === "high" && styles.priorityHigh]}>
                {task.priority.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.cardBody}>{task.reason}</Text>
            <Text style={styles.cardMeta}>{formatRelativeWindow(task.dueDate)}</Text>
          </Card>
        </Pressable>
      ))}

      <SectionHeader
        title="Weak topics"
        subtitle="Topics most likely to cost marks if ignored this week."
        trailing="Open Insights"
      />
      {weakTopics.map((item) => (
        <Pressable key={item.chapter?.id} onPress={() => router.push(`/chapter/${item.chapter?.id}`)}>
          <Card>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{item.chapter?.title}</Text>
              <Text style={styles.cardMeta}>{item.subject?.code}</Text>
            </View>
            <ProgressBar tone="coral" value={Math.max(10, item.progress.masteryScore)} />
            <Text style={styles.cardBody}>
              Mastery {item.progress.masteryScore}% - Confidence {item.progress.confidence}% - Weak signals {item.progress.weakSignals}
            </Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  hero: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  heroLabel: {
    color: colors.muted,
    fontSize: 13
  },
  heroScore: {
    color: colors.text,
    fontSize: 48,
    fontWeight: "800"
  },
  focusPill: {
    backgroundColor: "rgba(246, 248, 252, 0.12)",
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.pill
  },
  focusPillText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700"
  },
  heroCopy: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  statCard: {
    flex: 1,
    alignItems: "center"
  },
  statValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800"
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    textAlign: "center"
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
  cardMeta: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700"
  },
  priority: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "800"
  },
  priorityHigh: {
    color: colors.coral
  }
});
