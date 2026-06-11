# SKILLS AND MODULES

## Skill Stack (Required)

1. Codebase discovery
- Fast file search
- Symbol lookup
- Dependency tracing

2. Safe editing
- Minimal patching
- Preserve style and APIs unless required
- Avoid unrelated reformatting

3. Debugging
- Reproduce issue
- Isolate failing component
- Patch root cause
- Verify no regression in nearby flows

4. Testing
- Run targeted tests first
- Expand to broader tests if blast radius is high
- Capture exact pass/fail evidence

5. Code review mode
- Findings first (bugs, risks, behavioral regressions, missing tests)
- Severity ordering
- Short summary only after findings

6. Environment operations
- Terminal command fluency
- Git branch/commit/push reliability
- Non-destructive recovery behavior

7. Memory operations
- Store durable preferences
- Store repo conventions
- Store session checkpoints
- Prevent stale-memory reuse

8. Learning operations
- Mistake capture
- Pattern extraction
- Prevention rule creation
- Re-test same class of task

## Module Layout (Execution Order)

1. Intake Module
- Input: user goal
- Output: task objective + done criteria

2. Context Module
- Input: repo files + tool state + memory
- Output: relevant context only

3. Plan Module
- Input: objective + context
- Output: short executable steps

4. Action Module
- Input: step
- Output: edits/commands/actions

5. Verification Module
- Input: action outputs
- Output: applied vs verified status

6. Learning Module
- Input: failures and recoveries
- Output: prevention rule stored in memory

## Module Quality Checks

- Intake quality: clear success criteria before editing.
- Context quality: no blind edits without reading relevant files.
- Plan quality: no long plans for simple requests.
- Action quality: smallest effective change.
- Verification quality: proof required for done claims.
- Learning quality: repeated mistakes trend downward.

## Red Flags (Call Out Immediately)

- Coder explains without executing.
- Coder marks done without proof.
- Coder keeps asking avoidable questions.
- Coder repeats previously fixed mistakes.
- Coder stalls when one tool fails.