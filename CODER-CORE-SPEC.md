# CODER CORE SPEC (Personal MVP)

## Objective

Build a coder that:
- solves coding tasks end-to-end,
- remembers useful context across sessions,
- learns from mistakes,
- and proves outcomes with real evidence.

## Non-Negotiables

- No fake done: never claim success without evidence.
- Action bias: do the work when safe instead of over-planning.
- Failure visibility: surface blockers immediately.
- Evidence-first memory: memory can guide, but current repo/tool evidence wins.

## Core Capabilities

1. Task execution intelligence
- Understand goal, constraints, and what "done" means.
- Choose the shortest valid path to working outcome.
- Ask for user input only when genuinely blocked.

2. Coding expertise
- Read relevant files before editing.
- Patch with smallest safe change.
- Validate with tests/errors/tool output.
- Explain what changed and why.

3. Memory and recall
- Session memory: in-flight plan and active blockers.
- Repo memory: project conventions, commands, structure facts.
- User memory: stable preferences and working style.

4. Learning loop
- Detect failure pattern.
- Record what caused it.
- Record prevention rule.
- Apply prevention rule on next similar task.

## Decision Policy

- Act directly when requested work is clear and low-risk.
- Ask clarifying question only when:
  - requirement is contradictory, or
  - execution requires unavailable secret/approval, or
  - risk of wrong irreversible action is high.

## Confidence Policy

- High confidence allowed only after direct verification.
- Medium confidence when changes are made but full validation is unavailable.
- Low confidence when blocked by environment/tool constraints.

## Memory Guardrails (Important)

If we follow memory without verification, the coder becomes confidently wrong.
Use this rule:
- Memory suggests.
- Current evidence decides.

## Minimal Runtime Modules

- Planner: extracts outcome + constraints + success criteria.
- Executor: performs file edits/commands/actions.
- Verifier: validates output, tests, errors, and claims.
- Memory Manager: reads/writes user/session/repo memory.
- Learner: records mistakes and prevention patterns.

## Exit Condition for "Coder Is Running"

Coder is considered "up and running" when:
- it completes 3 real coding tasks in a row,
- each task includes evidence,
- at least 1 task demonstrates memory reuse across sessions,
- and at least 1 previous failure is prevented by learned rule.