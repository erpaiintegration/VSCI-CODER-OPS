export class VsciCoderAgent {
  constructor({ config, memoryStore, ollamaClient }) {
    this.config = config;
    this.memoryStore = memoryStore;
    this.ollamaClient = ollamaClient;
  }

  async healthCheck() {
    const tags = await this.ollamaClient.listModels();
    const modelNames = (tags.models || []).map((m) => m.name);

    return {
      provider: this.config.provider,
      sshHost: this.config.sshHost,
      modelCount: modelNames.length,
      models: modelNames,
      primaryAvailable: modelNames.includes(this.config.primaryModel),
      fallbackAvailable: modelNames.includes(this.config.fallbackModel),
    };
  }

  buildSystemPrompt() {
    const user = this.memoryStore.get("user");
    const repo = this.memoryStore.get("repo");
    const learning = this.memoryStore.get("learning");

    return [
      "You are VSCI-CODER, a senior software engineering agent.",
      "Rules:",
      "- Return practical implementation steps.",
      "- Call out risks and verification checks.",
      "- Do not claim done without evidence.",
      "- Keep output concise and execution oriented.",
      "User facts:",
      ...(user.facts || []).map((f) => `- ${f}`),
      "Repo facts:",
      ...(repo.facts || []).map((f) => `- ${f}`),
      "Learned prevention rules:",
      ...(learning.rules || []).slice(-8).map((r) => `- ${r.rule}`),
    ].join("\n");
  }

  async runTask(taskText) {
    this.memoryStore.setActiveTask(taskText);
    const system = this.buildSystemPrompt();

    const tryModels = [this.config.primaryModel, this.config.fallbackModel];
    let lastError = null;

    for (const model of tryModels) {
      try {
        const result = await this.ollamaClient.generate({
          model,
          system,
          prompt: `Task:\n${taskText}\n\nOutput format:\n1) Plan\n2) Actions\n3) Verify`,
        });

        this.memoryStore.addSessionHistory({
          task: taskText,
          model,
          status: "ok",
          responsePreview: (result.response || "").slice(0, 180),
        });

        return {
          ok: true,
          model,
          response: result.response || "",
        };
      } catch (err) {
        lastError = err;
        this.memoryStore.addSessionHistory({
          task: taskText,
          model,
          status: "error",
          error: String(err.message || err),
        });
      }
    }

    return {
      ok: false,
      error: String(lastError?.message || lastError || "unknown model error"),
    };
  }

  recordLearning(mistake, preventionRule) {
    this.memoryStore.addLearning(mistake, preventionRule);
  }
}
