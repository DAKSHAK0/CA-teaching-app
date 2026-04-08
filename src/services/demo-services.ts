import {
  chapters,
  getChapterById,
  getQuestionsForQuiz,
  getQuizById,
  getSubjectById,
  quizzes,
  subjects
} from "@/data/demo-data";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchSubjects() {
  await wait(320);
  return subjects;
}

export async function fetchSubjectDetail(subjectId: string) {
  await wait(320);
  return {
    subject: getSubjectById(subjectId),
    chapters: chapters
      .filter((chapter) => chapter.subjectId === subjectId)
      .sort((left, right) => left.order - right.order)
  };
}

export async function fetchChapterDetail(chapterId: string) {
  await wait(260);
  const chapter = getChapterById(chapterId);
  return {
    chapter,
    subject: chapter ? getSubjectById(chapter.subjectId) : undefined
  };
}

export async function fetchQuizBundle(quizId: string) {
  await wait(220);
  return {
    quiz: getQuizById(quizId),
    questions: getQuestionsForQuiz(quizId)
  };
}

export async function fetchPracticeCatalog(subjectIds: string[]) {
  await wait(280);
  return {
    quickQuizzes: quizzes.filter(
      (quiz) => quiz.mode === "quick" && subjectIds.includes(quiz.subjectId)
    ),
    mocks: quizzes.filter((quiz) => quiz.mode === "mock")
  };
}
