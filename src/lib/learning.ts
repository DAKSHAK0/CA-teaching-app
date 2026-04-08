import { chapters, getChapterById, getSubjectById, subjects } from "@/data/demo-data";
import {
  ChapterProgress,
  Question,
  Quiz,
  QuizAttempt,
  RevisionTask,
  TopicTally
} from "@/types/models";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function formatShortDate(value?: string) {
  if (!value) {
    return "Not yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short"
  }).format(new Date(value));
}

export function formatRelativeWindow(value?: string) {
  if (!value) {
    return "Not scheduled";
  }

  const diffDays = Math.round((new Date(value).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) {
    return "Due now";
  }
  if (diffDays === 1) {
    return "Due tomorrow";
  }
  return `Due in ${diffDays} days`;
}

export function scoreQuiz(
  quiz: Quiz,
  questions: Question[],
  answers: Record<string, string | null>,
  timeSpentSec: number
) {
  let correctCount = 0;
  const chapterStats: Record<string, { correct: number; total: number }> = {};

  const questionResults = questions.map((question) => {
    const selectedOptionId = answers[question.id] ?? null;
    const correct = selectedOptionId === question.correctOptionId;

    if (correct) {
      correctCount += 1;
    }

    if (!chapterStats[question.chapterId]) {
      chapterStats[question.chapterId] = { correct: 0, total: 0 };
    }
    chapterStats[question.chapterId].total += 1;
    if (correct) {
      chapterStats[question.chapterId].correct += 1;
    }

    return {
      questionId: question.id,
      selectedOptionId,
      correct
    };
  });

  const topicTallies: TopicTally[] = Object.entries(chapterStats).map(([chapterId, stat]) => ({
    chapterId,
    correct: stat.correct,
    total: stat.total,
    accuracy: Math.round((stat.correct / stat.total) * 100)
  }));

  return {
    id: `attempt-${Date.now()}`,
    quizId: quiz.id,
    score: correctCount,
    totalQuestions: questions.length,
    correctCount,
    accuracy: Math.round((correctCount / questions.length) * 100),
    timeSpentSec,
    createdAt: new Date().toISOString(),
    questionResults,
    topicTallies
  } satisfies QuizAttempt;
}

export function updateProgressFromAttempt(
  previous: Record<string, ChapterProgress>,
  attempt: QuizAttempt
) {
  const next = { ...previous };

  for (const tally of attempt.topicTallies) {
    const current = next[tally.chapterId] ?? {
      chapterId: tally.chapterId,
      status: "reading" as const,
      masteryScore: 0,
      confidence: 20,
      weakSignals: 0
    };

    const mastery = clamp(Math.round(current.masteryScore * 0.65 + tally.accuracy * 0.35), 0, 100);
    const confidence = clamp(
      current.confidence + (tally.accuracy >= 70 ? 6 : tally.accuracy >= 50 ? 1 : -5),
      5,
      95
    );

    next[tally.chapterId] = {
      ...current,
      status:
        mastery >= 75
          ? "stable"
          : mastery >= 55
            ? "revising"
            : mastery >= 30
              ? "practicing"
              : "reading",
      masteryScore: mastery,
      confidence,
      weakSignals: clamp(current.weakSignals + (tally.accuracy < 60 ? 1 : -1), 0, 6),
      lastStudiedAt: attempt.createdAt,
      lastQuizAt: attempt.createdAt
    };
  }

  return next;
}

export function buildRevisionTasks(progressMap: Record<string, ChapterProgress>) {
  const tasks: RevisionTask[] = [];

  for (const chapter of chapters) {
    const progress = progressMap[chapter.id];
    if (!progress || progress.status === "not_started") {
      continue;
    }

    const gap = progress.masteryScore < 45 ? 1 : progress.masteryScore < 70 ? 3 : 5;
    const anchor = progress.lastQuizAt ?? progress.lastStudiedAt ?? new Date().toISOString();
    const dueDate = new Date(new Date(anchor).getTime() + gap * 24 * 60 * 60 * 1000).toISOString();

    tasks.push({
      id: `task-${chapter.id}`,
      chapterId: chapter.id,
      dueDate,
      priority:
        progress.weakSignals >= 3 || progress.masteryScore < 45
          ? "high"
          : progress.masteryScore < 70
            ? "medium"
            : "low",
      reason:
        progress.weakSignals >= 3
          ? "Repeated errors detected in practice."
          : progress.masteryScore < 60
            ? "Retention is still below safe exam level."
            : "Scheduled spaced revision.",
      estimatedMinutes: chapter.estimatedMinutes > 30 ? 20 : 15
    });
  }

  return tasks.sort(
    (left, right) => new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime()
  );
}

export function buildWeakTopics(progressMap: Record<string, ChapterProgress>) {
  return Object.values(progressMap)
    .map((progress) => ({
      progress,
      chapter: getChapterById(progress.chapterId),
      subject: getChapterById(progress.chapterId)
        ? getSubjectById(getChapterById(progress.chapterId)!.subjectId)
        : undefined
    }))
    .filter((item) => item.chapter && item.subject)
    .sort((left, right) => {
      const leftScore = left.progress.masteryScore - left.progress.weakSignals * 10;
      const rightScore = right.progress.masteryScore - right.progress.weakSignals * 10;
      return leftScore - rightScore;
    });
}

export function buildSubjectHealth(progressMap: Record<string, ChapterProgress>) {
  return subjects.map((subject) => {
    const related = subject.chapterIds.map((chapterId) => progressMap[chapterId]).filter(Boolean);
    return {
      subject,
      mastery:
        related.length === 0
          ? 0
          : Math.round(related.reduce((sum, item) => sum + item.masteryScore, 0) / related.length),
      confidence:
        related.length === 0
          ? 0
          : Math.round(related.reduce((sum, item) => sum + item.confidence, 0) / related.length)
    };
  });
}

export function getRecommendedAction(
  selectedSubjectIds: string[],
  progressMap: Record<string, ChapterProgress>
) {
  const overdueTask = buildRevisionTasks(progressMap).find((task) => {
    const chapter = getChapterById(task.chapterId);
    return (
      chapter &&
      selectedSubjectIds.includes(chapter.subjectId) &&
      new Date(task.dueDate).getTime() <= Date.now()
    );
  });

  if (overdueTask) {
    const chapter = getChapterById(overdueTask.chapterId);
    return {
      label: "Revise overdue chapter",
      description: chapter?.title ?? "Revision task",
      chapterId: overdueTask.chapterId
    };
  }

  const weakest = buildWeakTopics(progressMap).find((item) =>
    selectedSubjectIds.includes(item.chapter!.subjectId)
  );
  if (weakest?.chapter) {
    return {
      label: "Repair weak topic",
      description: weakest.chapter.title,
      chapterId: weakest.chapter.id
    };
  }

  const nextUnread = chapters.find((chapter) => {
    const progress = progressMap[chapter.id];
    return selectedSubjectIds.includes(chapter.subjectId) && (!progress || progress.status === "not_started");
  });

  return {
    label: "Start next chapter",
    description: nextUnread?.title ?? "Continue prep system",
    chapterId: nextUnread?.id
  };
}

export function buildReadinessScore(progressMap: Record<string, ChapterProgress>) {
  const items = Object.values(progressMap);
  if (items.length === 0) {
    return 0;
  }

  const blended =
    items.reduce(
      (sum, item) => sum + item.masteryScore * 0.7 + item.confidence * 0.3 - item.weakSignals * 4,
      0
    ) / items.length;

  return clamp(Math.round(blended), 0, 100);
}
