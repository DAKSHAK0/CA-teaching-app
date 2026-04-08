import {
  Chapter,
  ChapterProgress,
  Quiz,
  Subject,
  UserProfile
} from "@/types/models";

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const defaultProfile: UserProfile = {
  name: "Aspirant",
  examStage: "CA Inter",
  selectedSubjectIds: ["financial-reporting", "taxation", "audit-ethics"],
  dailyMinutes: 90,
  onboardingComplete: false
};

export const subjects: Subject[] = [
  {
    id: "financial-reporting",
    code: "FR",
    title: "Financial Reporting",
    tagline: "Recognition, presentation, and exam-ready adjustments.",
    examStage: "CA Final",
    chapterIds: ["fr-revenue-recognition", "fr-consolidation-basics"],
    accent: "#5CC7FF"
  },
  {
    id: "taxation",
    code: "TAX",
    title: "Taxation",
    tagline: "Residential status, GST logic, and computation traps.",
    examStage: "CA Inter",
    chapterIds: ["tax-residential-status", "tax-gst-itc"],
    accent: "#F4B860"
  },
  {
    id: "audit-ethics",
    code: "AUD",
    title: "Audit & Ethics",
    tagline: "Standards, reporting judgment, and answer framing.",
    examStage: "CA Inter",
    chapterIds: ["audit-evidence", "audit-caro-reporting"],
    accent: "#7BE495"
  }
];

export const chapters: Chapter[] = [
  {
    id: "fr-revenue-recognition",
    subjectId: "financial-reporting",
    title: "Revenue Recognition",
    order: 1,
    estimatedMinutes: 35,
    summary: "Apply the five-step model without losing the exam narrative.",
    takeaways: [
      "Identify the contract and performance obligations first.",
      "Variable consideration is constrained until reversal risk drops.",
      "Timing of transfer matters more than invoice timing."
    ],
    vivaPrompts: [
      "Walk me through the five-step revenue recognition model.",
      "Why is variable consideration constrained under the standard?",
      "How would you explain over-time recognition in an exam answer?"
    ],
    contentBlocks: [
      {
        type: "concept",
        title: "Five-step frame",
        body: "Every answer should move from contract identification to allocation and recognition. That structure itself earns marks.",
        bullets: [
          "Step 1: identify the contract",
          "Step 2: identify performance obligations",
          "Step 3: determine transaction price",
          "Step 4: allocate the price",
          "Step 5: recognize revenue on transfer"
        ]
      },
      {
        type: "exam_angle",
        title: "High-scoring answer pattern",
        body: "Start with the governing principle, apply the facts to one step at a time, and end with a clear journal or conclusion line.",
        bullets: [
          "Name the standard logic first",
          "Do not jump directly to numbers",
          "State whether control transfers over time or at a point in time"
        ]
      },
      {
        type: "pitfall",
        title: "Common trap",
        body: "Students often treat billing milestones as revenue triggers. The standard focuses on transfer of control, not billing convenience.",
        bullets: [
          "Invoice date is not enough",
          "Collection risk does not equal performance completion",
          "Reassess variable consideration carefully"
        ]
      }
    ],
    quickQuizId: "quiz-fr-revenue"
  },
  {
    id: "fr-consolidation-basics",
    subjectId: "financial-reporting",
    title: "Consolidation Basics",
    order: 2,
    estimatedMinutes: 40,
    summary: "Control, goodwill, and elimination entries in a clean exam flow.",
    takeaways: [
      "Control drives consolidation, not just ownership percentage.",
      "Eliminate intra-group balances before adjusting profits.",
      "Goodwill depends on consideration, NCI measurement, and net assets."
    ],
    vivaPrompts: [
      "How do you determine whether a parent controls an investee?",
      "What are the main elimination entries in consolidation?",
      "Explain how goodwill is computed in a simple acquisition."
    ],
    contentBlocks: [
      {
        type: "concept",
        title: "Control first",
        body: "Control means power over relevant activities plus exposure to variable returns and the ability to affect those returns.",
        bullets: [
          "Power over relevant activities",
          "Exposure to variable returns",
          "Link between power and returns"
        ]
      },
      {
        type: "framework",
        title: "Working note order",
        body: "A clean consolidation answer usually becomes easier when you calculate net assets, NCI, goodwill, and eliminations in that order.",
        bullets: [
          "Net assets at acquisition",
          "Post-acquisition movement",
          "NCI share",
          "Goodwill",
          "Intra-group eliminations"
        ]
      },
      {
        type: "pitfall",
        title: "Common trap",
        body: "Many answers miss unrealized profit elimination after getting the acquisition working correct. That can drag the final answer below average.",
        bullets: [
          "Check inventory movement",
          "Check intercompany balances",
          "Check dividends within the group"
        ]
      }
    ],
    quickQuizId: "quiz-fr-consolidation"
  },
  {
    id: "tax-residential-status",
    subjectId: "taxation",
    title: "Residential Status",
    order: 1,
    estimatedMinutes: 25,
    summary: "Turn day-count confusion into a repeatable residency framework.",
    takeaways: [
      "Apply basic conditions before additional conditions.",
      "Resident but not ordinarily resident is a second-level classification.",
      "Residential status changes scope of taxable income."
    ],
    vivaPrompts: [
      "What is the sequence for determining residential status?",
      "When does an individual become RNOR?",
      "Why does residential status matter for taxable scope?"
    ],
    contentBlocks: [
      {
        type: "framework",
        title: "Decision ladder",
        body: "Count the stay days, apply the basic resident conditions, then check the additional conditions to decide ordinary residence.",
        bullets: [
          "First decide resident or non-resident",
          "Then decide resident ordinary or resident not ordinary",
          "Only then expand the taxable scope"
        ]
      },
      {
        type: "exam_angle",
        title: "Fast presentation",
        body: "Examiners reward clarity. A table with condition, facts, conclusion usually works better than a long paragraph.",
        bullets: [
          "Mention the relevant previous years",
          "Show stay days clearly",
          "Give the final category explicitly"
        ]
      },
      {
        type: "pitfall",
        title: "Common trap",
        body: "Students often mix up resident classification with taxability of foreign income. They are connected, but they are not the same step.",
        bullets: [
          "Finish status first",
          "Then analyze income scope",
          "Do not collapse the two issues"
        ]
      }
    ],
    quickQuizId: "quiz-tax-residential"
  },
  {
    id: "tax-gst-itc",
    subjectId: "taxation",
    title: "GST Input Tax Credit",
    order: 2,
    estimatedMinutes: 30,
    summary: "Use a strict eligibility checklist before claiming ITC.",
    takeaways: [
      "Eligibility depends on business use and valid tax documents.",
      "Blocked credits require separate attention even if tax is paid.",
      "Time limits matter as much as invoice completeness."
    ],
    vivaPrompts: [
      "State the conditions for claiming input tax credit.",
      "What are blocked credits under GST?",
      "How do you present an ITC denial in exam language?"
    ],
    contentBlocks: [
      {
        type: "concept",
        title: "ITC conditions",
        body: "Start with the statutory checklist before considering exceptions and reversals.",
        bullets: [
          "Possession of invoice",
          "Receipt of goods or services",
          "Tax actually paid to government",
          "Return filed by recipient"
        ]
      },
      {
        type: "framework",
        title: "Disallowance scan",
        body: "After checking eligibility, run a second scan for blocked credits and personal-use leakage.",
        bullets: [
          "Motor vehicle restrictions",
          "Food and membership restrictions",
          "Personal consumption exclusion"
        ]
      },
      {
        type: "pitfall",
        title: "Common trap",
        body: "Students often stop after finding a valid invoice. ITC is not documentation-only; it is a full-condition test.",
        bullets: [
          "Invoice is necessary, not sufficient",
          "Check business purpose",
          "Check blocked category"
        ]
      }
    ],
    quickQuizId: "quiz-tax-gst"
  },
  {
    id: "audit-evidence",
    subjectId: "audit-ethics",
    title: "Audit Evidence",
    order: 1,
    estimatedMinutes: 30,
    summary: "Link evidence quality to assertion risk and procedure design.",
    takeaways: [
      "Sufficiency is quantity; appropriateness is quality.",
      "External evidence is usually more reliable than internal evidence.",
      "Assertions should drive the audit procedure, not the other way around."
    ],
    vivaPrompts: [
      "Differentiate sufficiency and appropriateness of evidence.",
      "Which evidence is more reliable and why?",
      "How do assertions affect procedure selection?"
    ],
    contentBlocks: [
      {
        type: "concept",
        title: "Quality and quantity",
        body: "Students remember the words but lose marks in application. Tie evidence choice to the risk and assertion involved.",
        bullets: [
          "High-risk items need stronger evidence",
          "Independent external evidence carries more weight",
          "Quantity alone cannot fix poor quality"
        ]
      },
      {
        type: "exam_angle",
        title: "How to write it",
        body: "State the assertion, name the procedure, then justify why the evidence is sufficient and appropriate.",
        bullets: [
          "Assertion first",
          "Procedure second",
          "Reliability reasoning third"
        ]
      },
      {
        type: "pitfall",
        title: "Common trap",
        body: "Answers often list procedures without linking them to assertions. That makes the response descriptive but not analytical.",
        bullets: [
          "Avoid generic procedure dumping",
          "Use assertion names",
          "Justify reliability"
        ]
      }
    ],
    quickQuizId: "quiz-audit-evidence"
  },
  {
    id: "audit-caro-reporting",
    subjectId: "audit-ethics",
    title: "CARO Reporting",
    order: 2,
    estimatedMinutes: 28,
    summary: "Understand reporting clauses as an audit reporting workflow, not a memory test.",
    takeaways: [
      "CARO clauses require targeted reporting procedures.",
      "The report wording should follow the clause requirement precisely.",
      "Documentation should support each reporting conclusion."
    ],
    vivaPrompts: [
      "How would you approach a CARO clause in an exam answer?",
      "Why is clause-specific wording important in reporting?",
      "What audit work supports a CARO reporting conclusion?"
    ],
    contentBlocks: [
      {
        type: "framework",
        title: "Clause workflow",
        body: "A strong answer maps clause, procedure, factual finding, and reporting conclusion in sequence.",
        bullets: [
          "Identify the specific clause",
          "Mention the relevant audit work",
          "State the factual result",
          "Write the reporting conclusion"
        ]
      },
      {
        type: "exam_angle",
        title: "What earns marks",
        body: "Examiners look for precise linkage between facts and clause wording. Broad audit language does not substitute for clause logic.",
        bullets: [
          "Use the clause language carefully",
          "Tie it to audit evidence",
          "Avoid vague observations"
        ]
      },
      {
        type: "pitfall",
        title: "Common trap",
        body: "Students memorize clause headings but cannot convert facts into a reporting sentence. Practice that conversion directly.",
        bullets: [
          "Do not stop at theory",
          "Write the reporting line",
          "Support it with facts"
        ]
      }
    ],
    quickQuizId: "quiz-audit-caro"
  }
];

export const quizzes: Quiz[] = [
  {
    id: "quiz-fr-revenue",
    subjectId: "financial-reporting",
    chapterId: "fr-revenue-recognition",
    title: "Revenue Recognition Sprint",
    description: "3 exam-style checks on the five-step model and variable consideration.",
    mode: "quick",
    durationMinutes: 6,
    questionIds: ["q-fr-rev-1", "q-fr-rev-2", "q-fr-rev-3"]
  },
  {
    id: "quiz-fr-consolidation",
    subjectId: "financial-reporting",
    chapterId: "fr-consolidation-basics",
    title: "Consolidation Basics Sprint",
    description: "Control, goodwill, and elimination entry basics.",
    mode: "quick",
    durationMinutes: 6,
    questionIds: ["q-fr-con-1", "q-fr-con-2", "q-fr-con-3"]
  },
  {
    id: "quiz-tax-residential",
    subjectId: "taxation",
    chapterId: "tax-residential-status",
    title: "Residential Status Sprint",
    description: "3 rapid checks on status classification logic.",
    mode: "quick",
    durationMinutes: 5,
    questionIds: ["q-tax-res-1", "q-tax-res-2", "q-tax-res-3"]
  },
  {
    id: "quiz-tax-gst",
    subjectId: "taxation",
    chapterId: "tax-gst-itc",
    title: "GST ITC Sprint",
    description: "Eligibility, blocked credits, and time-limit logic.",
    mode: "quick",
    durationMinutes: 5,
    questionIds: ["q-tax-gst-1", "q-tax-gst-2", "q-tax-gst-3"]
  },
  {
    id: "quiz-audit-evidence",
    subjectId: "audit-ethics",
    chapterId: "audit-evidence",
    title: "Audit Evidence Sprint",
    description: "Evidence sufficiency, reliability, and assertions.",
    mode: "quick",
    durationMinutes: 5,
    questionIds: ["q-aud-ev-1", "q-aud-ev-2", "q-aud-ev-3"]
  },
  {
    id: "quiz-audit-caro",
    subjectId: "audit-ethics",
    chapterId: "audit-caro-reporting",
    title: "CARO Reporting Sprint",
    description: "Clause workflow and reporting precision.",
    mode: "quick",
    durationMinutes: 5,
    questionIds: ["q-aud-caro-1", "q-aud-caro-2", "q-aud-caro-3"]
  },
  {
    id: "quiz-mock-01",
    subjectId: "multi",
    title: "Mock Sprint 01",
    description: "A mixed mock with timing pressure across FR, Tax, and Audit.",
    mode: "mock",
    durationMinutes: 18,
    questionIds: [
      "q-mock-1",
      "q-mock-2",
      "q-mock-3",
      "q-mock-4",
      "q-mock-5",
      "q-mock-6"
    ]
  }
];

export const seededProgress: Record<string, ChapterProgress> = {
  "fr-revenue-recognition": {
    chapterId: "fr-revenue-recognition",
    status: "stable",
    masteryScore: 74,
    confidence: 68,
    weakSignals: 1,
    lastStudiedAt: daysAgo(1),
    lastQuizAt: daysAgo(2)
  },
  "fr-consolidation-basics": {
    chapterId: "fr-consolidation-basics",
    status: "practicing",
    masteryScore: 49,
    confidence: 41,
    weakSignals: 3,
    lastStudiedAt: daysAgo(4),
    lastQuizAt: daysAgo(5)
  },
  "tax-residential-status": {
    chapterId: "tax-residential-status",
    status: "revising",
    masteryScore: 58,
    confidence: 52,
    weakSignals: 2,
    lastStudiedAt: daysAgo(3),
    lastQuizAt: daysAgo(4)
  },
  "tax-gst-itc": {
    chapterId: "tax-gst-itc",
    status: "reading",
    masteryScore: 36,
    confidence: 31,
    weakSignals: 4,
    lastStudiedAt: daysAgo(6),
    lastQuizAt: daysAgo(8)
  },
  "audit-evidence": {
    chapterId: "audit-evidence",
    status: "not_started",
    masteryScore: 0,
    confidence: 18,
    weakSignals: 0
  },
  "audit-caro-reporting": {
    chapterId: "audit-caro-reporting",
    status: "not_started",
    masteryScore: 0,
    confidence: 14,
    weakSignals: 0
  }
};

export const seededNotes: Record<string, string> = {
  "fr-revenue-recognition":
    "Always separate performance obligations before doing numbers. Mention transfer of control explicitly in the conclusion.",
  "tax-residential-status":
    "Make a day-count table first. That prevents silly mistakes under time pressure."
};

export function getSubjectById(subjectId: string) {
  return subjects.find((subject) => subject.id === subjectId);
}

export function getChapterById(chapterId: string) {
  return chapters.find((chapter) => chapter.id === chapterId);
}

export function getQuizById(quizId: string) {
  return quizzes.find((quiz) => quiz.id === quizId);
}
