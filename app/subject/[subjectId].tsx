import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { fetchSubjectDetail } from "@/services/demo-services";
import { useAppStore } from "@/store/app-store";
import { colors, spacing } from "@/theme/tokens";
import { Chapter, Subject } from "@/types/models";

export default function SubjectDetailScreen() {
  const { subjectId } = useLocalSearchParams<{ subjectId: string }>();
  const { chapterProgress } = useAppStore();
  const [subject, setSubject] = useState<Subject | undefined>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) {
      return;
    }

    fetchSubjectDetail(subjectId)
      .then((result) => {
        setSubject(result.subject);
        setChapters(result.chapters);
      })
      .finally(() => setLoading(false));
  }, [subjectId]);

  return (
    <Screen contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>Back</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <>
          <Text style={styles.code}>{subject?.code}</Text>
          <Text style={styles.title}>{subject?.title}</Text>
          <Text style={styles.subtitle}>{subject?.tagline}</Text>

          {chapters.map((chapter, index) => {
            const progress = chapterProgress[chapter.id];
            return (
              <Pressable key={chapter.id} onPress={() => router.push(`/chapter/${chapter.id}`)}>
                <Card>
                  <View style={styles.rowBetween}>
                    <Text style={styles.chapterIndex}>Chapter {index + 1}</Text>
                    <Text style={styles.meta}>{chapter.estimatedMinutes} min</Text>
                  </View>
                  <Text style={styles.chapterTitle}>{chapter.title}</Text>
                  <Text style={styles.chapterSummary}>{chapter.summary}</Text>
                  <ProgressBar value={Math.max(8, progress?.masteryScore ?? 4)} />
                  <View style={styles.rowBetween}>
                    <Text style={styles.meta}>Status: {progress?.status?.replace("_", " ") ?? "not started"}</Text>
                    <Text style={styles.meta}>{progress?.masteryScore ?? 0}% mastery</Text>
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </>
      )}
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
  code: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  chapterIndex: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "800"
  },
  chapterTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  chapterSummary: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600"
  }
});
