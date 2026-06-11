import { EVAL_CASES } from "./eval-cases.js";
import { runEvaluation } from "./evaluator.js";

const CATEGORY_RULES = {
  intelligence: "Before answering, structure output as plan/actions/verify and avoid vague claims.",
  "risk-awareness": "When risk is destructive or irreversible, require safety checks and explicit user confirmation.",
  coding: "Prefer minimal change sets and include at least one targeted regression check.",
  verification: "Never claim completion without concrete command output, test output, or file-diff evidence.",
  memory: "Treat memory as hints and always re-validate with current workspace/tool evidence.",
  learning: "Record failure pattern, root cause, prevention rule, and retest evidence after each incident.",
};

export async function runSupervisor({ agent, outputDir }) {
  const first = await runEvaluation({ agent, outputDir, cases: EVAL_CASES });

  if (first.report.summary.pass) {
    return {
      pass: true,
      firstReport: first.report,
      secondReport: null,
      learningRulesApplied: [],
      message: "Initial evaluation already passed.",
    };
  }

  const failed = first.report.results.filter((r) => r.score < 2);
  const failedCategories = [...new Set(failed.map((r) => r.category))];

  const learningRulesApplied = [];
  for (const category of failedCategories) {
    const rule = CATEGORY_RULES[category] || "Add explicit verification and fallback behavior.";
    agent.recordLearning(`weak evaluator category: ${category}`, rule);
    learningRulesApplied.push({ category, rule });
  }

  const failedCases = EVAL_CASES.filter((c) => failed.some((f) => f.id === c.id));
  const second = await runEvaluation({ agent, outputDir, cases: failedCases });

  return {
    pass: second.report.summary.pass,
    firstReport: first.report,
    secondReport: second.report,
    learningRulesApplied,
    message: second.report.summary.pass
      ? "Supervisor improvement pass succeeded on failed cases."
      : "Supervisor rerun still has weak cases; manual prompt/module tuning required.",
  };
}
