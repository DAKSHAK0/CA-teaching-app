import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { Card } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { subjects } from "@/data/demo-data";
import { useAppStore } from "@/store/app-store";
import { colors, radii, spacing } from "@/theme/tokens";
import { ExamStage } from "@/types/models";

const dailyMinuteOptions = [45, 60, 90, 120];
const examStages: ExamStage[] = ["CA Inter", "CA Final"];

export default function OnboardingScreen() {
  const { completeOnboarding } = useAppStore();
  const [name, setName] = useState("Aspirant");
  const [examStage, setExamStage] = useState<ExamStage>("CA Inter");
  const [dailyMinutes, setDailyMinutes] = useState(90);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(
    subjects.map((subject) => subject.id)
  );

  function toggleSubject(subjectId: string) {
    setSelectedSubjectIds((current) =>
      current.includes(subjectId)
        ? current.filter((id) => id !== subjectId)
        : [...current, subjectId]
    );
  }

  function handleContinue() {
    completeOnboarding({
      name,
      examStage,
      selectedSubjectIds,
      dailyMinutes
    });
    router.replace("/(tabs)/today");
  }

  return (
    <Screen contentContainerStyle={styles.container}>
      <LinearGradient colors={["#0B1A29", "#0F2A39", "#123C42"]} style={styles.hero}>
        <Text style={styles.kicker}>CA Prep OS</Text>
        <Text style={styles.title}>A focused mobile exam-prep system for the next serious attempt.</Text>
        <Text style={styles.subtitle}>
          Set your study rhythm, subjects, and target intensity. The app will turn that into a daily prep flow.
        </Text>
      </LinearGradient>

      <Card>
        <Text style={styles.sectionTitle}>Your prep identity</Text>
        <TextInput
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor={colors.muted}
          style={styles.input}
          value={name}
        />

        <Text style={styles.fieldLabel}>Exam stage</Text>
        <View style={styles.row}>
          {examStages.map((stage) => (
            <Pressable
              key={stage}
              onPress={() => setExamStage(stage)}
              style={[styles.chip, examStage === stage && styles.chipActive]}
            >
              <Text style={[styles.chipLabel, examStage === stage && styles.chipLabelActive]}>
                {stage}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Pick your active subjects</Text>
        <Text style={styles.helper}>Keep all three selected if you want the full demo flow.</Text>
        <View style={styles.subjectList}>
          {subjects.map((subject) => {
            const active = selectedSubjectIds.includes(subject.id);
            return (
              <Pressable
                key={subject.id}
                onPress={() => toggleSubject(subject.id)}
                style={[styles.subjectCard, active && styles.subjectCardActive]}
              >
                <View style={[styles.subjectDot, { backgroundColor: subject.accent }]} />
                <View style={styles.subjectCopy}>
                  <Text style={styles.subjectCode}>{subject.code}</Text>
                  <Text style={styles.subjectTitle}>{subject.title}</Text>
                  <Text style={styles.subjectTagline}>{subject.tagline}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Daily session target</Text>
        <View style={styles.row}>
          {dailyMinuteOptions.map((value) => (
            <Pressable
              key={value}
              onPress={() => setDailyMinutes(value)}
              style={[styles.minuteChip, dailyMinutes === value && styles.minuteChipActive]}
            >
              <Text
                style={[styles.minuteLabel, dailyMinutes === value && styles.minuteLabelActive]}
              >
                {value} min
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <PrimaryButton
        disabled={selectedSubjectIds.length === 0}
        label="Launch my prep OS"
        onPress={handleContinue}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm
  },
  hero: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  fieldLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    marginTop: spacing.sm
  },
  helper: {
    color: colors.muted,
    fontSize: 13
  },
  input: {
    minHeight: 52,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.md,
    fontSize: 15
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: "rgba(61, 217, 180, 0.15)"
  },
  chipLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700"
  },
  chipLabelActive: {
    color: colors.primary
  },
  subjectList: {
    gap: spacing.sm
  },
  subjectCard: {
    flexDirection: "row",
    gap: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md
  },
  subjectCardActive: {
    borderColor: colors.primary
  },
  subjectDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 5
  },
  subjectCopy: {
    flex: 1,
    gap: 2
  },
  subjectCode: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800"
  },
  subjectTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700"
  },
  subjectTagline: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  minuteChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border
  },
  minuteChipActive: {
    backgroundColor: colors.primary
  },
  minuteLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700"
  },
  minuteLabelActive: {
    color: colors.background
  }
});
