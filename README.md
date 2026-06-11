# VSCI-CODER Ops

This repo is the practical setup system for a personal coding agent that runs smart, learns, remembers, and ships working code.

## Core Build Files

- TASKS.md: core-first execution backlog
- CODER-CORE-SPEC.md: mission, decision policy, memory and learning guardrails
- SKILLS-MODULES.md: skill stack and runtime module map
- TEST-PLAN.md: 12-test baseline for intelligence, coding quality, and learning
- AGENT-RUNTIME-PROFILE.md: session bootstrap behavior for live execution

## Daily Operation Files

- STARTUP-CHECKLIST.md: fast startup routine
- SESSION-HANDOFF.md: end-of-session resume packet

## Runtime Setup (VPS Ollama)

1. Ensure SSH alias works:
	- `ssh -o BatchMode=yes openclaw-vps "echo SSH_OK"`
2. Ensure Ollama API works on VPS:
	- `ssh -o BatchMode=yes openclaw-vps "curl -s http://127.0.0.1:11434/api/tags"`
3. Install Node dependencies:
	- `npm install`
4. Run health check:
	- `npm run agent:run -- health`
5. Run scenario tests:
	- `npm run agent:test`

## Runtime Commands

- Health: `npm run agent:run -- health`
- Run task: `npm run agent:run -- task "your coding task"`
- Add learning rule:
  - `npm run agent:run -- learn "mistake" "prevention rule"`
- Run 12-case evaluator:
	- `npm run agent:eval`
- Run supervisor improvement loop:
	- `npm run agent:supervise`

## Evaluation Reports

- Latest report: `runtime-data/eval-report-latest.json`
- Historical reports: `runtime-data/eval-report-*.json`
