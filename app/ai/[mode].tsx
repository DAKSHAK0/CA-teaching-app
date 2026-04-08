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
import { getChapterById } from "@/data/demo-data";
import { useAppStore } from "@/store/app-store";
import { colors, spacing } from "@/theme/tokens";
import { AiMode } from "@/types/models";

export default function AiModeScreen() {
  const params = useLocalSearchParams<{ mode: AiMode; chapterId?: string }>();
  const { aiSessions, sendAiMessage, startAiSession } = useAppStore();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!params.mode || !params.chapterId) {
      return;
    }

    const createdId = startAiSession(params.mode, params.chapterId);
    setSessionId(createdId);
  }, [params.chapterId, params.mode, startAiSession]);

  const session = sessionId ? aiSessions[sessionId] : undefined;
  const chapter = params.chapterId ? getChapterById(params.chapterId) : undefined;

  async function handleSend() {
    if (!sessionId || !input.trim()) {
      return;
    }

    setSending(true);
    const prompt = input;
    setInput("");
    await sendAiMessage(sessionId, prompt);
    setSending(false);
  }

  return (
    <Screen scroll={false} style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Text style={styles.mode}>{params.mode?.toUpperCase()}</Text>
      </View>

      <Text style={styles.title}>{chapter?.title}</Text>
      <Text style={styles.subtitle}>Context-aware demo session with local scripted intelligence.</Text>

      {!session ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <>
          <View style={styles.messages}>
            {session.messages.map((message) => (
              <Card
                key={message.id}
                style={message.role === "user" ? styles.userMessage : styles.assistantMessage}
              >
                <Text style={styles.messageRole}>{message.role === "user" ? "You" : "AI coach"}</Text>
                <Text style={styles.messageText}>{message.text}</Text>
              </Card>
            ))}
          </View>

          <View style={styles.composer}>
            <TextInput
              multiline
              onChangeText={setInput}
              placeholder={
                params.mode === "viva"
                  ? "Speak your answer..."
                  : params.mode === "doubt"
                    ? "Ask your doubt..."
                    : "Paste the concept to simplify..."
              }
              placeholderTextColor={colors.muted}
              style={styles.input}
              textAlignVertical="top"
              value={input}
            />
            <PrimaryButton
              disabled={sending || !input.trim()}
              label={sending ? "Thinking..." : "Send"}
              onPress={handleSend}
            />
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.sm,
    marginBottom: spacing.md
  },
  back: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700"
  },
  mode: {
    color: colors.gold,
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
    marginBottom: spacing.md
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  messages: {
    flex: 1,
    gap: spacing.sm
  },
  assistantMessage: {
    backgroundColor: colors.surface
  },
  userMessage: {
    backgroundColor: colors.surfaceAlt
  },
  messageRole: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800"
  },
  messageText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  composer: {
    gap: spacing.sm,
    marginTop: spacing.md
  },
  input: {
    minHeight: 110,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    padding: spacing.md,
    fontSize: 14
  }
});
