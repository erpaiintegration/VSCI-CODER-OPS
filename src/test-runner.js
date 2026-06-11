import { getRuntimeConfig } from "./config.js";
import { MemoryStore } from "./memoryStore.js";
import { OllamaClient } from "./ollamaClient.js";
import { VsciCoderAgent } from "./vsciCoderAgent.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const config = getRuntimeConfig();
  config.requestTimeoutMs = Math.min(config.requestTimeoutMs, 45000);
  const memoryStore = new MemoryStore(config.dataDir);
  const ollamaClient = new OllamaClient(config);
  const agent = new VsciCoderAgent({ config, memoryStore, ollamaClient });
  const results = [];

  // Scenario 1: Health check against VPS-hosted Ollama
  console.log("[test] scenario: health-check");
  const health = await agent.healthCheck();
  assert(health.modelCount > 0, "No models found on VPS Ollama endpoint");
  results.push({ scenario: "health-check", pass: true, details: health });

  // Scenario 2: Execute coding-oriented task response
  console.log("[test] scenario: task-execution");
  const task1 = await agent.runTask("Give 3 short steps for a safe Node.js bugfix with one verify command.");
  assert(task1.ok, `Task execution failed: ${task1.error || "unknown"}`);
  assert(task1.response.length > 40, "Task response too short");
  assert(/verify|test|plan/i.test(task1.response), "Task response missing verification-oriented language");
  results.push({ scenario: "task-execution", pass: true, model: task1.model });

  // Scenario 3: Learning persistence
  console.log("[test] scenario: learning-persistence");
  agent.recordLearning("claimed done without explicit command output", "always include exact command output in proof section");
  const learning = memoryStore.get("learning");
  assert((learning.rules || []).length > 0, "Learning rule not stored");
  results.push({ scenario: "learning-persistence", pass: true, ruleCount: learning.rules.length });

  // Scenario 4: Fallback path simulation by forcing invalid primary model in-memory
  console.log("[test] scenario: fallback-model");
  const originalPrimary = config.primaryModel;
  const invalidPrimary = "nonexistent-model-for-fallback-check";
  config.primaryModel = "nonexistent-model-for-fallback-check";
  const task2 = await agent.runTask("Provide 2 quick checks after refactoring a function.");
  config.primaryModel = originalPrimary;
  assert(task2.ok, "Fallback model did not recover task execution");
  assert(task2.model !== invalidPrimary, "Fallback recovery did not switch away from invalid primary model");
  results.push({ scenario: "fallback-model", pass: true, recoveredModel: task2.model });

  console.log(JSON.stringify({ pass: true, scenarios: results }, null, 2));
}

run().catch((err) => {
  console.error(JSON.stringify({ pass: false, error: err.message || String(err) }, null, 2));
  process.exit(1);
});
