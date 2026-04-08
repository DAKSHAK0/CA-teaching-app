import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { getChapterById } from "@/data/demo-data";
import {
  buildRevisionTasks,
  buildSubjectHealth,
  buildWeakTopics,
  formatRelativeWindow
} from "@/lib/learning";
import { useAppStore } from "@/store/app-store";
import { colors, spacing } from "@/theme/tokens";

export default function InsightsScreen() {
  const { chapterProgress, profile } = useAppStore();
  const weakTopics = buildWeakTopics(chapterProgress)
    .filter((item) => item.chapter && profile.selectedSubjectIds.includes(item.chapter.subjectId))
    .slice(0, 4);
  const subjectHealth = buildSubjectHealth(chapterProgress).filter((item) =>
    profile.selectedSubjectIds.includes(item.subject.id)
  );
  const revisionTasks = buildRevisionTasks(chapterProgress)
    .filter((task) => {
      const chapter = getChapterById(task.chapterId);
      return chapter ? profile.selectedSubjectIds.includes(chapter.subjectId) : false;
    })
    .slice(0, 4);

  return (
    <Screen contentContainerStyle={styles.container}>
      <SectionHeader
        title="Insights"
        subtitle="Weak-topic detection, revision debt, and subject health in one view."
      />

      <Card>
        <Text style={styles.blockTitle}>Subject health</Text>
        {subjectHealth.map((item) => (
          <View key={item.subject.id} style={styles.metricBlock}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{item.subject.title}</Text>
              <Text style={styles.meta}>{item.mastery}% mastery</Text>
            </View>
            <ProgressBar value={Math.max(5, item.mastery)} />
            <Text style={styles.cardBody}>Confidence {item.confidence}%</Text>
          </View>
        ))}
      </Card>

      <SectionHeader
        title="Weak topics"
        subtitle="These are the chapters most likely to need repair before the next exam push."
      />
      {weakTopics.map((item) => (
        <Pressable key={item.chapter?.id} onPress={() => router.push(`/chapter/${item.chapter?.id}`)}>
          <Card>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{item.chapter?.title}</Text>
              <Text style={styles.meta}>{item.subject?.code}</Text>
            </View>
            <ProgressBar tone="coral" value={Math.max(8, item.progress.masteryScore)} />
            <Text style={styles.cardBody}>
              Mastery {item.progress.masteryScore}% - Confidence {item.progress.confidence}% - Weak signals {item.progress.weakSignals}
            </Text>
          </Card>
        </Pressable>
      ))}

      <SectionHeader
        title="Revision planner"
        subtitle="Automatically generated from mastery, confidence, and recent practice."
      />
      {revisionTasks.map((task) => (
        <Card key={task.id}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>{task.chapterId.replaceAll("-", " ")}</Text>
            <Text style={styles.meta}>{task.priority.toUpperCase()}</Text>
          </View>
          <Text style={styles.cardBody}>{task.reason}</Text>
          <Text style={styles.footer}>{formatRelativeWindow(task.dueDate)}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm
  },
  blockTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700"
  },
  metricBlock: {
    gap: 8
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  cardTitle: {
    color: colors.text,
    fontSize: 15,
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
  footer: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "700"
  }
});
