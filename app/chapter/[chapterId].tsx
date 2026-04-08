import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { Card } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { fetchChapterDetail } from "@/services/demo-services";
import { useAppStore } from "@/store/app-store";
import { colors, spacing } from "@/theme/tokens";
import { Chapter, Subject } from "@/types/models";

export default function ChapterDetailScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const { chapterProgress, personalNotes, savePersonalNote } = useAppStore();
  const [chapter, setChapter] = useState<Chapter | undefined>();
  const [subject, setSubject] = useState<Subject | undefined>();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chapterId) {
      return;
    }

    fetchChapterDetail(chapterId)
      .then((result) => {
        setChapter(result.chapter);
        setSubject(result.subject);
        setNote(personalNotes[chapterId] ?? "");
      })
      .finally(() => setLoading(false));
  }, [chapterId, personalNotes]);

  const progress = chapterId ? chapterProgress[chapterId] : undefined;

  return (
    <Screen contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>Back</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <>
          <Text style={styles.subjectCode}>{subject?.code}</Text>
          <Text style={styles.title}>{chapter?.title}</Text>
          <Text style={styles.subtitle}>{chapter?.summary}</Text>

          <Card>
            <Text style={styles.cardTitle}>Chapter state</Text>
            <Text style={styles.cardBody}>Status: {progress?.status?.replace("_", " ") ?? "not started"}</Text>
            <Text style={styles.cardBody}>Mastery: {progress?.masteryScore ?? 0}%</Text>
            <Text style={styles.cardBody}>Confidence: {progress?.confidence ?? 0}%</Text>
          </Card>

          <Card>
            <Text style={styles.cardTitle}>Exam anchors</Text>
            {chapter?.takeaways.map((item) => (
              <Text key={item} style={styles.bullet}>- {item}</Text>
            ))}
          </Card>

          {chapter?.contentBlocks.map((block) => (
            <Card key={block.title}>
              <Text style={styles.blockTag}>{block.type.replace("_", " ").toUpperCase()}</Text>
              <Text style={styles.cardTitle}>{block.title}</Text>
              <Text style={styles.cardBody}>{block.body}</Text>
              {block.bullets.map((item) => (
                <Text key={item} style={styles.bullet}>- {item}</Text>
              ))}
            </Card>
          ))}

          <Card>
            <Text style={styles.cardTitle}>Personal note</Text>
            <TextInput
              multiline
              onChangeText={setNote}
              placeholder="Capture a memory hook, pitfall, or answer framework..."
              placeholderTextColor={colors.muted}
              style={styles.noteInput}
              textAlignVertical="top"
              value={note}
            />
            <PrimaryButton
              label="Save note"
              onPress={() => {
                if (chapterId) {
                  savePersonalNote(chapterId, note);
                }
              }}
              variant="secondary"
            />
          </Card>

          <View style={styles.actionRow}>
            <PrimaryButton
              label="Take quick quiz"
              onPress={() => {
                if (chapter?.quickQuizId) {
                  router.push(`/quiz/${chapter.quickQuizId}`);
                }
              }}
            />
            <PrimaryButton
              label="Open AI viva"
              onPress={() => {
                if (chapterId) {
                  router.push(`/ai/viva?chapterId=${chapterId}`);
                }
              }}
              variant="secondary"
            />
          </View>
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
  subjectCode: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
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
  bullet: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20
  },
  blockTag: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1
  },
  noteInput: {
    minHeight: 140,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    padding: spacing.md,
    fontSize: 14
  },
  actionRow: {
    gap: spacing.sm
  }
});
