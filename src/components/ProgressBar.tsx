import React from "react";
import { StyleSheet, View } from "react-native";

import { colors, radii } from "@/theme/tokens";

export function ProgressBar({
  value,
  tone = "primary"
}: {
  value: number;
  tone?: "primary" | "gold" | "coral";
}) {
  return (
    <View style={styles.track}>
      <View
        style={[
          styles.fill,
          { width: `${Math.max(4, Math.min(100, value))}%` },
          tone === "primary" && { backgroundColor: colors.primary },
          tone === "gold" && { backgroundColor: colors.gold },
          tone === "coral" && { backgroundColor: colors.coral }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: radii.pill
  }
});
