import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { fetchSubjects } from "@/services/demo-services";
import { useAppStore } from "@/store/app-store";
import { colors, spacing } from "@/theme/tokens";
import { Subject } from "@/types/models";

export default function StudyScreen() {
  const { chapterProgress, profile } = useAppStore();
  const [catalog, setCatalog] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects()
      .then((items) => setCatalog(items.filter((subject) => profile.selectedSubjectIds.includes(subject.id))))
      .finally(() => setLoading(false));
  }, [profile.selectedSubjectIds]);

  return (
    <Screen contentContainerStyle={styles.container}>
      <SectionHeader
        title="Study system"
        subtitle="Subject-first navigation with chapter depth, notes, and focused practice entry points."
      />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        catalog.map((subject) => {
          const chapterStats = subject.chapterIds.map((chapterId) => chapterProgress[chapterId]).filter(Boolean);
          const mastery =
            chapterStats.length === 0
              ? 0
              : Math.round(
                  chapterStats.reduce((sum, item) => sum + item.masteryScore, 0) / chapterStats.length
                );
          const completed = chapterStats.filter((item) => item.status === "stable").length;

          return (
            <Pressable key={subject.id} onPress={() => router.push(`/subject/${subject.id}`)}>
              <Card>
                <View style={styles.rowBetween}>
                  <View style={styles.subjectMeta}>
                    <Text style={[styles.subjectCode, { color: subject.accent }]}>{subject.code}</Text>
                    <Text style={styles.subjectTitle}>{subject.title}</Text>
                  </View>
                  <Text style={styles.subjectStage}>{subject.examStage}</Text>
                </View>
                <Text style={styles.subjectTagline}>{subject.tagline}</Text>
                <ProgressBar value={Math.max(6, mastery)} />
                <View style={styles.rowBetween}>
                  <Text style={styles.footerText}>{subject.chapterIds.length} chapters</Text>
                  <Text style={styles.footerText}>{completed} stable</Text>
                </View>
              </Card>
            </Pressable>
          );
        })
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
  subjectMeta: {
    flex: 1,
    gap: 2
  },
  subjectCode: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1
  },
  subjectTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700"
  },
  subjectStage: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  subjectTagline: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  footerText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600"
  }
});
