import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { subjects } from "@/data/demo-data";
import { useAppStore } from "@/store/app-store";
import { colors, spacing } from "@/theme/tokens";

export default function ProfileScreen() {
  const { profile, resetDemo } = useAppStore();

  return (
    <Screen contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>Back</Text>
      </Pressable>

      <Text style={styles.title}>Profile & demo settings</Text>
      <Text style={styles.subtitle}>This build uses local mock services and on-device progress so it feels complete without a backend.</Text>

      <Card>
        <Text style={styles.cardTitle}>{profile.name}</Text>
        <Text style={styles.cardBody}>{profile.examStage}</Text>
        <Text style={styles.cardBody}>{profile.dailyMinutes} minutes planned each day</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Active subjects</Text>
        <View style={styles.subjectList}>
          {subjects
            .filter((subject) => profile.selectedSubjectIds.includes(subject.id))
            .map((subject) => (
              <View key={subject.id} style={styles.subjectRow}>
                <View style={[styles.dot, { backgroundColor: subject.accent }]} />
                <Text style={styles.cardBody}>{subject.title}</Text>
              </View>
            ))}
        </View>
      </Card>

      <PrimaryButton label="Reset demo data" onPress={resetDemo} variant="secondary" />
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
  subjectList: {
    gap: spacing.sm
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999
  }
});
