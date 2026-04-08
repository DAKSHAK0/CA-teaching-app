import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useAppStore } from "@/store/app-store";
import { colors } from "@/theme/tokens";

export default function IndexScreen() {
  const { bootstrapped, profile } = useAppStore();

  if (!bootstrapped) {
    return (
      <View style={styles.loading}>
        <Text style={styles.title}>CA Prep OS</Text>
        <Text style={styles.copy}>Booting your mobile exam-prep system...</Text>
        <ActivityIndicator color={colors.primary} size="small" />
      </View>
    );
  }

  if (!profile.onboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)/today" />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 24
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800"
  },
  copy: {
    color: colors.muted,
    fontSize: 14,
    textAlign: "center"
  }
});
