import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/theme/tokens";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  trailing?: string;
}

export function SectionHeader({ title, subtitle, trailing }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {trailing ? <Text style={styles.trailing}>{trailing}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing.md
  },
  copy: {
    flex: 1,
    gap: 4
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  trailing: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700"
  }
});
