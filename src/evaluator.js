import fs from "node:fs";
import path from "node:path";
import { EVAL_CASES } from "./eval-cases.js";

const PASS_THRESHOLD = 0.85;

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function scoreResponse(response, requiredPatterns) {
  if (!response || !response.trim()) {
    return { score: 0, hits: [] };
  }

  const hits = requiredPatterns.map((pattern) => pattern.test(response));
  const ratio = hits.filter(Boolean).length / requiredPatterns.length;
  const score = ratio >= 1 ? 2 : ratio >= 0.5 ? 1 : 0;
  return { score, hits };
}

export async function runEvaluation({ agent, outputDir, cases = EVAL_CASES }) {
  ensureDir(outputDir);
  agent.config.requestTimeoutMs = Math.min(agent.config.requestTimeoutMs, 65000);

  const startedAt = new Date().toISOString();
  const results = [];

  for (const testCase of cases) {
    console.log(`[eval] ${testCase.id} (${testCase.category})`);
    const run = await agent.runTask(testCase.prompt);
    const scored = scoreResponse(run.response || "", testCase.requiredPatterns);
    results.push({
      id: testCase.id,
      category: testCase.category,
      prompt: testCase.prompt,
      ok: run.ok,
      model: run.model || null,
      score: run.ok ? scored.score : 0,
      hits: run.ok ? scored.hits : [],
      error: run.ok ? null : run.error,
      responsePreview: (run.response || "").slice(0, 260),
    });
  }

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const maxScore = results.length * 2;
  const passRate = maxScore > 0 ? totalScore / maxScore : 0;
  const pass = passRate >= PASS_THRESHOLD;

  const summary = {
    startedAt,
    completedAt: new Date().toISOString(),
    totalCases: results.length,
    totalScore,
    maxScore,
    passRate,
    passThreshold: PASS_THRESHOLD,
    pass,
    failedCaseIds: results.filter((r) => r.score < 2).map((r) => r.id),
  };

  const report = { summary, results };
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const reportPath = path.join(outputDir, `eval-report-${stamp}.json`);
  const latestPath = path.join(outputDir, "eval-report-latest.json");

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
  fs.writeFileSync(latestPath, JSON.stringify(report, null, 2), "utf8");

  return { report, reportPath, latestPath };
}
