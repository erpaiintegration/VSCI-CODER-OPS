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

  const failed = first.report.results.filter((r) => r.score < 2);
  if (failed.length === 0) {
    return {
      pass: first.report.summary.pass,
      firstReport: first.report,
      secondReport: null,
      learningRulesApplied: [],
      message: "No weak categories detected; second corrective pass not required.",
    };
  }

  const failedCategories = [...new Set(failed.map((r) => r.category))];

  const learningRulesApplied = [];
  for (const category of failedCategories) {
    const rule = CATEGORY_RULES[category] || "Add explicit verification and fallback behavior.";
    agent.recordLearning(`weak evaluator category: ${category}`, rule);
    learningRulesApplied.push({ category, rule });
  }

  const failedCases = EVAL_CASES.filter((c) => failed.some((f) => f.id === c.id));
  const second = await runEvaluation({ agent, outputDir, cases: failedCases });

  const finalPass = first.report.summary.pass && second.report.summary.pass;

  return {
    pass: finalPass,
    firstReport: first.report,
    secondReport: second.report,
    learningRulesApplied,
    message: finalPass
      ? "Supervisor corrective pass completed; threshold met after two-pass cycle."
      : "Supervisor corrective pass completed, but quality target still not met.",
  };
}
