import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { chapters } from "@/data/demo-data";
import { colors, spacing } from "@/theme/tokens";

const defaultChapter = chapters[0];

export default function AiScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <SectionHeader
        title="AI practice"
        subtitle="Context-aware demo tools built around the chapter you are studying, not a generic chatbot."
      />

      <Pressable onPress={() => router.push(`/ai/viva?chapterId=${defaultChapter.id}`)}>
        <Card>
          <Text style={styles.title}>AI viva</Text>
          <Text style={styles.body}>Oral-exam style questioning with feedback and follow-up prompts for {defaultChapter.title}.</Text>
        </Card>
      </Pressable>

      <Pressable onPress={() => router.push(`/ai/doubt?chapterId=${chapters[2].id}`)}>
        <Card>
          <Text style={styles.title}>Doubt solver</Text>
          <Text style={styles.body}>Ask a doubt in your own words and get a structured answer using the chapter rule, application flow, and exam framing.</Text>
        </Card>
      </Pressable>

      <Pressable onPress={() => router.push(`/ai/simplify?chapterId=${chapters[4].id}`)}>
        <Card>
          <Text style={styles.title}>Quick simplifier</Text>
          <Text style={styles.body}>Convert dense theory into memory hooks, plain-language summaries, and exam-safe phrasing.</Text>
        </Card>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  body: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  }
});
