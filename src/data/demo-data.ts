export * from "./catalog";
export * from "./questions";

import { questions } from "./questions";

export function getQuestionsForQuiz(quizId: string) {
  return questions.filter((question) => question.quizId === quizId);
}
