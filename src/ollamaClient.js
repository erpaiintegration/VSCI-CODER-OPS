import { spawn } from "node:child_process";

function runSshWithInput(host, remoteCommand, input, timeoutMs) {
  return new Promise((resolve, reject) => {
    const proc = spawn("ssh", [host, remoteCommand], { stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) {
        return;
      }
      settled = true;
      proc.kill("SIGKILL");
      reject(new Error(`SSH/Ollama request timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    proc.stdout.on("data", (d) => {
      stdout += d.toString();
    });

    proc.stderr.on("data", (d) => {
      stderr += d.toString();
    });

    proc.on("error", (err) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      reject(err);
    });

    proc.on("close", (code) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(`ssh command failed (${code}): ${stderr.trim() || "no stderr"}`));
        return;
      }
      resolve(stdout);
    });

    if (input) {
      proc.stdin.write(input);
    }
    proc.stdin.end();
  });
}

export class OllamaClient {
  constructor(config) {
    this.config = config;
  }

  async listModels() {
    if (this.config.provider === "ollama-direct") {
      const res = await fetch(`${this.config.ollamaUrl}/api/tags`);
      if (!res.ok) {
        throw new Error(`Ollama tags failed: HTTP ${res.status}`);
      }
      return res.json();
    }

    const maxSeconds = Math.max(5, Math.floor(this.config.requestTimeoutMs / 1000));
    const out = await runSshWithInput(
      this.config.sshHost,
      `curl --max-time ${maxSeconds} -sS ${this.config.ollamaUrl}/api/tags`,
      "",
      this.config.requestTimeoutMs,
    );
    return JSON.parse(out);
  }

  async generate({ model, prompt, system }) {
    const maxSeconds = Math.max(10, Math.floor(this.config.requestTimeoutMs / 1000));
    const payload = {
      model,
      prompt,
      system,
      stream: false,
      options: {
        temperature: 0.1,
        num_predict: 220,
      },
    };

    if (this.config.provider === "ollama-direct") {
      const res = await fetch(`${this.config.ollamaUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Ollama generate failed: HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(`Ollama generate error: ${data.error}`);
      }
      return data;
    }

    const out = await runSshWithInput(
      this.config.sshHost,
      `curl --max-time ${maxSeconds} -sS -X POST ${this.config.ollamaUrl}/api/generate -H 'Content-Type: application/json' -d @-`,
      JSON.stringify(payload),
      this.config.requestTimeoutMs,
    );
    const data = JSON.parse(out);
    if (data.error) {
      throw new Error(`Ollama generate error: ${data.error}`);
    }
    return data;
  }
}
