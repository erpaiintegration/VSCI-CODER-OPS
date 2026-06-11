import fs from "node:fs";
import path from "node:path";

const FILES = {
  user: "user-memory.json",
  repo: "repo-memory.json",
  session: "session-memory.json",
  learning: "learning-memory.json",
};

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
}

export class MemoryStore {
  constructor(dataDir) {
    this.dataDir = dataDir;
    ensureDir(this.dataDir);
  }

  file(scope) {
    return path.join(this.dataDir, FILES[scope]);
  }

  get(scope) {
    if (scope === "learning") {
      return readJson(this.file(scope), { rules: [], mistakes: [] });
    }

    if (scope === "session") {
      return readJson(this.file(scope), { activeTask: "", notes: [], history: [] });
    }

    return readJson(this.file(scope), { facts: [] });
  }

  set(scope, value) {
    writeJson(this.file(scope), value);
  }

  addFact(scope, fact) {
    const data = this.get(scope);
    if (!data.facts.includes(fact)) {
      data.facts.push(fact);
      this.set(scope, data);
    }
  }

  addSessionHistory(entry) {
    const data = this.get("session");
    data.history.push({
      at: new Date().toISOString(),
      ...entry,
    });
    data.history = data.history.slice(-40);
    this.set("session", data);
  }

  setActiveTask(task) {
    const data = this.get("session");
    data.activeTask = task;
    this.set("session", data);
  }

  addLearning(mistake, preventionRule) {
    const learning = this.get("learning");
    learning.mistakes.push({ at: new Date().toISOString(), mistake });
    learning.rules.push({ at: new Date().toISOString(), rule: preventionRule });
    learning.mistakes = learning.mistakes.slice(-50);
    learning.rules = learning.rules.slice(-50);
    this.set("learning", learning);
  }
}
