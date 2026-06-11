# VSCI-CODER Core Build Plan

This is a personal, core-first setup plan to make the coder run smart, learn, remember, and code at expert level.
Admin workflow is intentionally moved to the end.

Status tags:
- TODO: not started
- NEXT: start now
- IN-PROGRESS: currently executing
- BLOCKED: waiting on dependency
- VERIFY: needs proof
- DONE: completed with proof

## Core Track A - Brain and Decision Quality

- DONE: Standalone VSCI-CODER repo created and connected
- NEXT: Finalize coder mission and hard boundaries in CODER-CORE-SPEC.md
- TODO: Define reasoning policy (when to ask, when to act, when to stop)
- TODO: Define confidence policy (what requires verification before claiming success)
- TODO: Define model routing policy (local-first, Featherless overflow)
- VERIFY: Run 5 decision scenarios and score pass/fail
- DONE-CRITERIA: Coder takes useful action without fake certainty

## Core Track B - Memory and Learning Loop

- NEXT: Implement memory schema (session, repo, user)
- TODO: Define what is worth remembering vs what must expire
- TODO: Add memory update triggers (on failure, on fix, on preference)
- TODO: Add anti-drift rule (never trust memory without current evidence)
- TODO: Add learning loop (capture mistake -> pattern -> prevention step)
- VERIFY: Re-run a prior task in a new session and confirm memory reuse
- DONE-CRITERIA: Coder resumes context and improves after mistakes

## Core Track C - Coding Expertise Stack

- NEXT: Finalize required skill modules in SKILLS-MODULES.md
- TODO: Define default code workflow (inspect -> edit -> validate -> summarize)
- TODO: Define bugfix workflow (reproduce -> isolate -> patch -> regressions)
- TODO: Define review workflow (findings first: bugs, risks, missing tests)
- TODO: Define testing workflow (smoke, focused, full depending on blast radius)
- VERIFY: Complete 3 coding tasks with tests and clean outcomes
- DONE-CRITERIA: Coder reliably ships working changes, not just plans

## Core Track D - Tooling and Execution Reliability

- NEXT: Validate local terminal + git + editor tool chain in one run
- TODO: Validate MCP access paths needed for your day-to-day tasks
- TODO: Define fallback behavior when tools fail (retry, alternate tool, escalate)
- TODO: Define timeout and stop conditions to avoid tool thrashing
- VERIFY: Simulate 2 tool failures and confirm graceful recovery
- DONE-CRITERIA: Coder keeps making progress under partial tool failures

## Core Track E - Testing the Coder Itself

- NEXT: Create an eval set of 12 representative tasks in TEST-PLAN.md
- TODO: Run baseline test pass and capture scores
- TODO: Patch weakest 3 behaviors
- TODO: Run second pass and compare improvement
- VERIFY: Improvement >= 30 percent on weak categories
- DONE-CRITERIA: Coder shows measurable learning and reliability gains

## Deferred Track - Admin and Governance (Later)

- TODO-LATER: Branch protections, PR templates, issue templates
- TODO-LATER: Label systems, milestones, reporting dashboards
- TODO-LATER: Full process governance and audit formatting

## What Will Break If We Skip It

- BLOCKED-RISK: If memory has no anti-drift rule, coder can repeat outdated assumptions
- BLOCKED-RISK: If tests are skipped, coder may sound smart but ship regressions
- BLOCKED-RISK: If tool fallback is undefined, coder stalls on routine failures

## Immediate NEXT (In Order)

- NEXT: Complete CODER-CORE-SPEC.md mission, boundaries, and confidence policy
- NEXT: Complete SKILLS-MODULES.md with concrete modules and load order
- NEXT: Complete TEST-PLAN.md and run baseline tests

## Proof Log

- DONE: Repo created and pushed -> https://github.com/erpaiintegration/VSCI-CODER-OPS
- DONE: Baseline scaffold commit -> 3f6963e
- DONE: Core-first task refactor commit -> pending
