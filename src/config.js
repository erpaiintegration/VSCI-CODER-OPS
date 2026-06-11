import path from "node:path";

export function getRuntimeConfig() {
  return {
    provider: process.env.VSCI_PROVIDER || "ollama-ssh",
    sshHost: process.env.VPS_SSH_HOST || "openclaw-vps",
    ollamaUrl: process.env.VPS_OLLAMA_URL || "http://127.0.0.1:11434",
    primaryModel: process.env.VSCI_PRIMARY_MODEL || "qwen2.5-coder:7b",
    fallbackModel: process.env.VSCI_FALLBACK_MODEL || "openclaw-coder:latest",
    requestTimeoutMs: Number(process.env.VSCI_TIMEOUT_MS || 120000),
    dataDir: process.env.VSCI_DATA_DIR || path.join(process.cwd(), "runtime-data"),
  };
}
