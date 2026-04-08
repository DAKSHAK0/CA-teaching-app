import { getChapterById } from "@/data/demo-data";
import { AiMode, AiSession } from "@/types/models";

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export function buildAssistantOpening(mode: AiMode, chapterId: string) {
  const chapter = getChapterById(chapterId);
  if (!chapter) {
    return "Pick a chapter first so I can stay grounded in the syllabus.";
  }

  if (mode === "viva") {
    return `Viva mode is live for ${chapter.title}.\n\nQuestion 1: ${chapter.vivaPrompts[0]}`;
  }

  if (mode === "simplify") {
    return `Quick simplifier for ${chapter.title}:\n\n${bullets(
      chapter.takeaways
    )}\n\nSend any confusing line and I will rephrase it in plain exam language.`;
  }

  return `Doubt solver is ready for ${chapter.title}. Ask your question in your own words and I will answer using chapter logic, common traps, and exam framing.`;
}

export function buildAssistantReply(session: AiSession, prompt: string) {
  const chapter = getChapterById(session.chapterId);
  if (!chapter) {
    return "I lost the chapter context. Please reopen the AI tool from a chapter screen.";
  }

  const cleaned = prompt.trim().toLowerCase();

  if (session.mode === "viva") {
    const scoreLabel = cleaned.length > 60 ? "Strong direction" : "Needs more structure";
    const followUpIndex = Math.min(session.messages.length, chapter.vivaPrompts.length - 1);

    return `${scoreLabel}.\n\nTighten the answer around:\n${bullets(
      chapter.takeaways
    )}\n\nFollow-up: ${chapter.vivaPrompts[followUpIndex]}`;
  }

  if (session.mode === "simplify") {
    return `Simplified:\n\n${chapter.summary}\n\nMemory hooks:\n${bullets(
      chapter.takeaways
    )}\n\nTrap to avoid:\n${chapter.contentBlocks.find((block) => block.type === "pitfall")?.body ?? "Stay close to the rule before jumping to numbers."}`;
  }

  return `Use this answer frame for ${chapter.title}:\n\n1. State the rule in one line.\n2. Apply the facts step by step.\n3. End with a direct conclusion.\n\nChapter anchors:\n${bullets(
    chapter.takeaways
  )}\n\nIf you want, ask the same doubt in short exam-answer format and I will rewrite it as a 4-marker response.`;
}
