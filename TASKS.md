# VSCI-CODER Master Task List

This file is the execution source of truth for building and running VSCI-CODER.

Status tags:
- TODO: not started
- NEXT: start now
- IN-PROGRESS: currently executing
- BLOCKED: waiting on dependency
- VERIFY: needs proof
- CHECKPOINT: stable milestone reached
- DONE: completed with proof

## Stage 0 - Control Plane and Rules

- DONE: Create ops repo scaffold (README, TASKS, STARTUP-CHECKLIST, SESSION-HANDOFF)
- DONE: Create GitHub repo and push baseline commit
- TODO: Define VSCI-CODER mission in one paragraph (what it does, what it does not do)
- TODO: Define non-negotiable done policy (Applied vs Verified vs User-Confirmed)
- TODO: Define severity model for bugs (S0/S1/S2/S3)
- TODO: Define required evidence format for completion claims
- VERIFY: Verify every task update includes owner, status, and proof line
- CHECKPOINT: Rules and governance are written and stable

## Stage 1 - Agent Identity and Runtime Topology

- NEXT: Finalize standalone VSCI-CODER profile (independent from Operator)
- TODO: Record model routing policy (local-first, Featherless fallback)
- TODO: Record allowed tools and disallowed risky operations
- TODO: Define session bootstrap prompt for VSCI-CODER
- TODO: Define session shutdown handoff requirements
- TODO: Document failure and retry policy (max retries, escalate conditions)
- VERIFY: Run one dry-run session and verify rules are followed end to end
- CHECKPOINT: Standalone identity and runtime behavior locked

## Stage 2 - Workspace and Visibility Automation

- TODO: Confirm Todo Tree view is visible and pinned in Activity Bar
- TODO: Confirm tags are recognized (TODO, NEXT, BLOCKED, VERIFY, CHECKPOINT, DONE)
- TODO: Add saved VS Code workspace profile for VSCI-CODER operations
- TODO: Ensure startup opens repo, terminal, and task files automatically
- TODO: Enable Problems panel and Error Lens visibility defaults
- VERIFY: Restart VS Code and verify the full workspace state is restored
- CHECKPOINT: Workspace opens in ready-to-operate mode with no manual setup

## Stage 3 - Backlog Structure and Intake

- TODO: Define Epic structure (E1 Foundation, E2 Coding Workflow, E3 QA, E4 Delivery, E5 Ops)
- TODO: Add task ID convention (VSCI-001, VSCI-002, ...)
- TODO: Add dependency fields to every task (depends-on, blocks)
- TODO: Add acceptance criteria format to every task
- TODO: Add proof checklist to every task
- TODO: Add risk flag field (low, medium, high)
- VERIFY: Confirm each active task has actionable next step <= 30 minutes
- CHECKPOINT: Backlog is decomposition-ready and execution-safe

## Stage 4 - Coding Execution Workflow

- TODO: Define issue-to-branch workflow
- TODO: Define code-change workflow (analyze, edit, test, verify, summarize)
- TODO: Define review workflow default (bugs first, risks first)
- TODO: Define rollback and containment workflow for bad deploys
- TODO: Define no-silent-failure policy (always surface blockers)
- TODO: Define "no fake done" policy with mandatory evidence
- VERIFY: Execute one real task through full workflow and record timings
- CHECKPOINT: Repeatable coding workflow proven on one complete cycle

## Stage 5 - Quality and Verification Gates

- TODO: Define required pre-merge checks (lint, type-check, tests)
- TODO: Define minimum test expectations by change size
- TODO: Define regression checklist for risky files
- TODO: Define security checklist for dependency and secrets handling
- TODO: Define performance checklist for hot paths
- TODO: Define documentation checklist for user-facing changes
- VERIFY: Run gates on a sample change and store outputs in handoff
- CHECKPOINT: Quality gates enforced and measurable

## Stage 6 - GitHub Operating System

- TODO: Enable branch protection on master/main
- TODO: Require PR for all changes (no direct push after bootstrap)
- TODO: Require status checks before merge
- TODO: Add PR template with proof checklist
- TODO: Add issue templates (bug, task, checkpoint, blocker)
- TODO: Add labels (todo, next, blocked, verify, done, risk:high)
- TODO: Add milestone naming convention by stage
- VERIFY: Open and merge one test PR with full checks passing
- CHECKPOINT: Repo workflow enforces process automatically

## Stage 7 - MCP and Toolchain Reliability

- TODO: Verify local MCP server availability
- TODO: Verify VPS MCP connectivity and auth stability
- TODO: Define tool fallback matrix when a primary tool fails
- TODO: Define timeouts and retry limits per tool class
- TODO: Define incident runbook for auth or connectivity failures
- VERIFY: Simulate tool failure and validate fallback behavior
- CHECKPOINT: Toolchain is resilient under expected faults

## Stage 8 - Delivery and Deployment Discipline

- TODO: Define release cadence (daily/weekly) and cut-off rules
- TODO: Define release checklist (tests, notes, rollback plan)
- TODO: Define environment promotion model (dev -> staging -> prod)
- TODO: Define post-deploy validation checklist
- TODO: Define rollback trigger thresholds and ownership
- VERIFY: Run one dry-run release and one rollback rehearsal
- CHECKPOINT: Delivery flow is safe and repeatable

## Stage 9 - Weekly Operations Loop

- TODO: Add weekly planning ritual (choose top 3 priorities)
- TODO: Add daily execution ritual (select NEXT, execute, verify, handoff)
- TODO: Add weekly review ritual (wins, misses, carryover)
- TODO: Add metric tracking (tasks completed, blocked time, failure retries)
- TODO: Add backlog hygiene ritual (archive DONE, split oversized tasks)
- VERIFY: Complete one full week with metrics captured
- CHECKPOINT: Operational rhythm established

## Immediate NEXT Actions (Do These First)

- NEXT: Complete Stage 1 standalone profile and runtime policy
- NEXT: Fix and verify Stage 2 Todo Tree visibility in your UI
- NEXT: Implement Stage 6 GitHub protections and templates
- NEXT: Run one real task through Stages 4 and 5 with proof

## Blockers

- BLOCKED: None currently

## Proof Log

- DONE: Repo created and pushed -> https://github.com/erpaiintegration/VSCI-CODER-OPS
- DONE: Baseline commit on remote -> 3f6963e
