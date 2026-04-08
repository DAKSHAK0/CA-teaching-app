import { Question } from "@/types/models";

export const questions: Question[] = [
  {
    id: "q-fr-rev-1",
    quizId: "quiz-fr-revenue",
    subjectId: "financial-reporting",
    chapterId: "fr-revenue-recognition",
    prompt: "Which step of the revenue model focuses on separating distinct promises in the contract?",
    conceptTag: "performance_obligations",
    difficulty: "easy",
    options: [
      { id: "a", label: "Identify the contract" },
      { id: "b", label: "Identify performance obligations" },
      { id: "c", label: "Determine transaction price" },
      { id: "d", label: "Recognize revenue" }
    ],
    correctOptionId: "b",
    explanation: "Distinct promises are assessed when identifying performance obligations."
  },
  {
    id: "q-fr-rev-2",
    quizId: "quiz-fr-revenue",
    subjectId: "financial-reporting",
    chapterId: "fr-revenue-recognition",
    prompt: "Variable consideration is constrained mainly to avoid:",
    conceptTag: "variable_consideration",
    difficulty: "medium",
    options: [
      { id: "a", label: "Double taxation" },
      { id: "b", label: "Future revenue reversal" },
      { id: "c", label: "Contract termination" },
      { id: "d", label: "Inventory write-off" }
    ],
    correctOptionId: "b",
    explanation: "The constraint exists to prevent significant reversal of recognized revenue later."
  },
  {
    id: "q-fr-rev-3",
    quizId: "quiz-fr-revenue",
    subjectId: "financial-reporting",
    chapterId: "fr-revenue-recognition",
    prompt: "A billing milestone without transfer of control should usually mean:",
    conceptTag: "transfer_of_control",
    difficulty: "medium",
    options: [
      { id: "a", label: "Revenue must be recognized immediately" },
      { id: "b", label: "Revenue is optional" },
      { id: "c", label: "Revenue should generally not be recognized yet" },
      { id: "d", label: "Only disclosure is required" }
    ],
    correctOptionId: "c",
    explanation: "Control transfer, not billing timing, drives recognition."
  },
  {
    id: "q-fr-con-1",
    quizId: "quiz-fr-consolidation",
    subjectId: "financial-reporting",
    chapterId: "fr-consolidation-basics",
    prompt: "Consolidation begins when the investor has:",
    conceptTag: "control",
    difficulty: "easy",
    options: [
      { id: "a", label: "More than 20 percent ownership" },
      { id: "b", label: "Control over the investee" },
      { id: "c", label: "A board observer seat" },
      { id: "d", label: "Any dividend entitlement" }
    ],
    correctOptionId: "b",
    explanation: "Control, not a single ownership percentage threshold, is the decisive factor."
  },
  {
    id: "q-fr-con-2",
    quizId: "quiz-fr-consolidation",
    subjectId: "financial-reporting",
    chapterId: "fr-consolidation-basics",
    prompt: "Which item is eliminated in consolidation?",
    conceptTag: "elimination_entries",
    difficulty: "easy",
    options: [
      { id: "a", label: "Only external receivables" },
      { id: "b", label: "Only goodwill" },
      { id: "c", label: "Intra-group balances and transactions" },
      { id: "d", label: "All non-current assets" }
    ],
    correctOptionId: "c",
    explanation: "Intra-group balances and profits are eliminated to avoid overstatement."
  },
  {
    id: "q-fr-con-3",
    quizId: "quiz-fr-consolidation",
    subjectId: "financial-reporting",
    chapterId: "fr-consolidation-basics",
    prompt: "Goodwill is broadly the excess of consideration plus NCI over:",
    conceptTag: "goodwill",
    difficulty: "medium",
    options: [
      { id: "a", label: "Book value of revenue" },
      { id: "b", label: "Fair value of identifiable net assets" },
      { id: "c", label: "Taxable profit of the subsidiary" },
      { id: "d", label: "Paid-up share capital only" }
    ],
    correctOptionId: "b",
    explanation: "Goodwill compares purchase-side measures against fair value of identifiable net assets."
  },
  {
    id: "q-tax-res-1",
    quizId: "quiz-tax-residential",
    subjectId: "taxation",
    chapterId: "tax-residential-status",
    prompt: "The first step in residential status classification is to decide whether the assessee is:",
    conceptTag: "basic_conditions",
    difficulty: "easy",
    options: [
      { id: "a", label: "Resident or non-resident" },
      { id: "b", label: "RNOR or resident" },
      { id: "c", label: "Taxable or exempt" },
      { id: "d", label: "Domestic or foreign" }
    ],
    correctOptionId: "a",
    explanation: "Resident versus non-resident is the first level decision."
  },
  {
    id: "q-tax-res-2",
    quizId: "quiz-tax-residential",
    subjectId: "taxation",
    chapterId: "tax-residential-status",
    prompt: "RNOR status is checked after:",
    conceptTag: "additional_conditions",
    difficulty: "medium",
    options: [
      { id: "a", label: "Deciding resident status" },
      { id: "b", label: "Computing GST" },
      { id: "c", label: "Filing return" },
      { id: "d", label: "Calculating deductions" }
    ],
    correctOptionId: "a",
    explanation: "RNOR is a sub-classification of resident status."
  },
  {
    id: "q-tax-res-3",
    quizId: "quiz-tax-residential",
    subjectId: "taxation",
    chapterId: "tax-residential-status",
    prompt: "Residential status mainly affects:",
    conceptTag: "scope_of_income",
    difficulty: "easy",
    options: [
      { id: "a", label: "Share capital structure" },
      { id: "b", label: "Scope of taxable income" },
      { id: "c", label: "Audit reporting format" },
      { id: "d", label: "Depreciation rate" }
    ],
    correctOptionId: "b",
    explanation: "Residential status governs how wide the taxable income net extends."
  },
  {
    id: "q-tax-gst-1",
    quizId: "quiz-tax-gst",
    subjectId: "taxation",
    chapterId: "tax-gst-itc",
    prompt: "Which is not by itself enough to claim ITC?",
    conceptTag: "eligibility_conditions",
    difficulty: "medium",
    options: [
      { id: "a", label: "Possession of invoice" },
      { id: "b", label: "Receipt of goods or services" },
      { id: "c", label: "Tax actually paid" },
      { id: "d", label: "All of the above conditions together are needed" }
    ],
    correctOptionId: "a",
    explanation: "A valid invoice alone is not sufficient; the full condition set must be satisfied."
  },
  {
    id: "q-tax-gst-2",
    quizId: "quiz-tax-gst",
    subjectId: "taxation",
    chapterId: "tax-gst-itc",
    prompt: "Blocked credits require the student to check:",
    conceptTag: "blocked_credits",
    difficulty: "easy",
    options: [
      { id: "a", label: "Whether the invoice is laminated" },
      { id: "b", label: "Whether the category is specifically disallowed" },
      { id: "c", label: "Whether the supplier is listed company" },
      { id: "d", label: "Whether the payment is above one lakh" }
    ],
    correctOptionId: "b",
    explanation: "Blocked credits are category-based statutory disallowances."
  },
  {
    id: "q-tax-gst-3",
    quizId: "quiz-tax-gst",
    subjectId: "taxation",
    chapterId: "tax-gst-itc",
    prompt: "For demo exam logic, the clean sequence is:",
    conceptTag: "itc_checklist",
    difficulty: "medium",
    options: [
      { id: "a", label: "Claim first, verify later" },
      { id: "b", label: "Check invoice, then blocked credits, then business use" },
      { id: "c", label: "Check full eligibility, then scan for blocked credit and personal use" },
      { id: "d", label: "Only check return filing" }
    ],
    correctOptionId: "c",
    explanation: "A full-condition check followed by disallowance scan is the safest structure."
  },
  {
    id: "q-aud-ev-1",
    quizId: "quiz-audit-evidence",
    subjectId: "audit-ethics",
    chapterId: "audit-evidence",
    prompt: "Sufficiency of audit evidence refers to:",
    conceptTag: "sufficiency",
    difficulty: "easy",
    options: [
      { id: "a", label: "Quantity of evidence" },
      { id: "b", label: "Legal admissibility only" },
      { id: "c", label: "Presentation style" },
      { id: "d", label: "Audit fee level" }
    ],
    correctOptionId: "a",
    explanation: "Sufficiency deals with quantity, while appropriateness deals with quality."
  },
  {
    id: "q-aud-ev-2",
    quizId: "quiz-audit-evidence",
    subjectId: "audit-ethics",
    chapterId: "audit-evidence",
    prompt: "Which evidence is generally more reliable?",
    conceptTag: "reliability",
    difficulty: "easy",
    options: [
      { id: "a", label: "Internal memo with no corroboration" },
      { id: "b", label: "Oral representation alone" },
      { id: "c", label: "External confirmation" },
      { id: "d", label: "Undated worksheet" }
    ],
    correctOptionId: "c",
    explanation: "Independent external evidence usually carries higher reliability."
  },
  {
    id: "q-aud-ev-3",
    quizId: "quiz-audit-evidence",
    subjectId: "audit-ethics",
    chapterId: "audit-evidence",
    prompt: "A good audit answer usually starts with:",
    conceptTag: "assertions",
    difficulty: "medium",
    options: [
      { id: "a", label: "Procedure names only" },
      { id: "b", label: "The relevant assertion" },
      { id: "c", label: "Audit fee planning" },
      { id: "d", label: "Management bonus structure" }
    ],
    correctOptionId: "b",
    explanation: "Assertions should guide the procedure and the rationale."
  },
  {
    id: "q-aud-caro-1",
    quizId: "quiz-audit-caro",
    subjectId: "audit-ethics",
    chapterId: "audit-caro-reporting",
    prompt: "The strongest CARO answer sequence is:",
    conceptTag: "clause_workflow",
    difficulty: "easy",
    options: [
      { id: "a", label: "Clause, procedure, finding, reporting line" },
      { id: "b", label: "Finding, joke, conclusion, note" },
      { id: "c", label: "Memorize only the clause heading" },
      { id: "d", label: "State a conclusion without procedure" }
    ],
    correctOptionId: "a",
    explanation: "That sequence shows full reporting logic instead of rote memory."
  },
  {
    id: "q-aud-caro-2",
    quizId: "quiz-audit-caro",
    subjectId: "audit-ethics",
    chapterId: "audit-caro-reporting",
    prompt: "Why is precise clause wording important?",
    conceptTag: "reporting_precision",
    difficulty: "medium",
    options: [
      { id: "a", label: "It sounds more formal only" },
      { id: "b", label: "It links the facts to the reporting requirement correctly" },
      { id: "c", label: "It increases fee realization" },
      { id: "d", label: "It removes the need for evidence" }
    ],
    correctOptionId: "b",
    explanation: "Clause-specific wording prevents vague or incomplete reporting."
  },
  {
    id: "q-aud-caro-3",
    quizId: "quiz-audit-caro",
    subjectId: "audit-ethics",
    chapterId: "audit-caro-reporting",
    prompt: "Students commonly underperform in CARO because they:",
    conceptTag: "reporting_sentence",
    difficulty: "easy",
    options: [
      { id: "a", label: "Write too many reporting conclusions" },
      { id: "b", label: "Memorize headings but cannot convert facts into reporting language" },
      { id: "c", label: "Use too many tables" },
      { id: "d", label: "Revise too often" }
    ],
    correctOptionId: "b",
    explanation: "The missed step is usually converting findings into the reporting sentence."
  },
  {
    id: "q-mock-1",
    quizId: "quiz-mock-01",
    subjectId: "financial-reporting",
    chapterId: "fr-revenue-recognition",
    prompt: "In revenue recognition, transfer of control matters because it determines:",
    conceptTag: "transfer_of_control",
    difficulty: "medium",
    options: [
      { id: "a", label: "When to recognize revenue" },
      { id: "b", label: "When to declare dividend" },
      { id: "c", label: "When to calculate GST only" },
      { id: "d", label: "When to appoint auditor" }
    ],
    correctOptionId: "a",
    explanation: "Revenue follows transfer of control."
  },
  {
    id: "q-mock-2",
    quizId: "quiz-mock-01",
    subjectId: "financial-reporting",
    chapterId: "fr-consolidation-basics",
    prompt: "A parent consolidates a subsidiary primarily because it has:",
    conceptTag: "control",
    difficulty: "easy",
    options: [
      { id: "a", label: "Control" },
      { id: "b", label: "An expense claim" },
      { id: "c", label: "A debenture" },
      { id: "d", label: "Tax refund" }
    ],
    correctOptionId: "a",
    explanation: "Control drives consolidation."
  },
  {
    id: "q-mock-3",
    quizId: "quiz-mock-01",
    subjectId: "taxation",
    chapterId: "tax-residential-status",
    prompt: "RNOR can be checked only after the assessee is found to be:",
    conceptTag: "additional_conditions",
    difficulty: "easy",
    options: [
      { id: "a", label: "Resident" },
      { id: "b", label: "Non-resident" },
      { id: "c", label: "Exempt" },
      { id: "d", label: "Audited" }
    ],
    correctOptionId: "a",
    explanation: "RNOR is a resident sub-category."
  },
  {
    id: "q-mock-4",
    quizId: "quiz-mock-01",
    subjectId: "taxation",
    chapterId: "tax-gst-itc",
    prompt: "Which statement best matches a safe ITC exam approach?",
    conceptTag: "itc_checklist",
    difficulty: "medium",
    options: [
      { id: "a", label: "Invoice alone is enough" },
      { id: "b", label: "Check all conditions, then blocked credits" },
      { id: "c", label: "Claim everything and reverse later" },
      { id: "d", label: "Only check return filing" }
    ],
    correctOptionId: "b",
    explanation: "A full eligibility check followed by blocked credit scan is safer."
  },
  {
    id: "q-mock-5",
    quizId: "quiz-mock-01",
    subjectId: "audit-ethics",
    chapterId: "audit-evidence",
    prompt: "Appropriateness of evidence is mainly about:",
    conceptTag: "appropriateness",
    difficulty: "medium",
    options: [
      { id: "a", label: "Formatting" },
      { id: "b", label: "Quality and relevance" },
      { id: "c", label: "Audit fee" },
      { id: "d", label: "Board composition" }
    ],
    correctOptionId: "b",
    explanation: "Appropriateness covers relevance and reliability."
  },
  {
    id: "q-mock-6",
    quizId: "quiz-mock-01",
    subjectId: "audit-ethics",
    chapterId: "audit-caro-reporting",
    prompt: "A solid CARO conclusion should be supported by:",
    conceptTag: "audit_support",
    difficulty: "medium",
    options: [
      { id: "a", label: "Guesswork" },
      { id: "b", label: "Audit work and factual findings" },
      { id: "c", label: "Only management optimism" },
      { id: "d", label: "Prior year notes only" }
    ],
    correctOptionId: "b",
    explanation: "Reporting conclusions need evidence-backed factual support."
  },
];
