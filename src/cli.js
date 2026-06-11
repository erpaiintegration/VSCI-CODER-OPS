import { getRuntimeConfig } from "./config.js";
import { MemoryStore } from "./memoryStore.js";
import { OllamaClient } from "./ollamaClient.js";
import { VsciCoderAgent } from "./vsciCoderAgent.js";
import { runEvaluation } from "./evaluator.js";
import { runSupervisor } from "./supervisor.js";

function parseArgs(argv) {
  const args = { cmd: "help" };
  const [cmd, ...rest] = argv;
  args.cmd = cmd || "help";
  args.rest = rest;
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = getRuntimeConfig();
  const memoryStore = new MemoryStore(config.dataDir);
  const ollamaClient = new OllamaClient(config);
  const agent = new VsciCoderAgent({ config, memoryStore, ollamaClient });

  if (args.cmd === "health") {
    const health = await agent.healthCheck();
    console.log(JSON.stringify(health, null, 2));
    return;
  }

  if (args.cmd === "task") {
    const taskText = args.rest.join(" ").trim();
    if (!taskText) {
      throw new Error("Usage: npm run agent:run -- task <your task>");
    }

    const result = await agent.runTask(taskText);
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (args.cmd === "learn") {
    const [mistake, ...ruleParts] = args.rest;
    const preventionRule = ruleParts.join(" ").trim();
    if (!mistake || !preventionRule) {
      throw new Error("Usage: npm run agent:run -- learn <mistake> <prevention rule>");
    }

    agent.recordLearning(mistake, preventionRule);
    console.log(JSON.stringify({ ok: true, mistake, preventionRule }, null, 2));
    return;
  }

  if (args.cmd === "eval") {
    const out = await runEvaluation({
      agent,
      outputDir: config.dataDir,
    });
    console.log(
      JSON.stringify(
        {
          pass: out.report.summary.pass,
          summary: out.report.summary,
          reportPath: out.reportPath,
          latestPath: out.latestPath,
        },
        null,
        2,
      ),
    );
    return;
  }

  if (args.cmd === "supervise") {
    const out = await runSupervisor({
      agent,
      outputDir: config.dataDir,
    });
    console.log(
      JSON.stringify(
        {
          pass: out.pass,
          message: out.message,
          firstSummary: out.firstReport?.summary,
          secondSummary: out.secondReport?.summary || null,
          learningRulesApplied: out.learningRulesApplied,
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log("Usage:");
  console.log("  npm run agent:run -- health");
  console.log("  npm run agent:run -- task <task text>");
  console.log("  npm run agent:run -- learn <mistake> <prevention rule>");
  console.log("  npm run agent:run -- eval");
  console.log("  npm run agent:run -- supervise");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
