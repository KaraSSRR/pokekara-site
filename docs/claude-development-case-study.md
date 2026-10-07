# How Pokekara Builds VITALE with Claude

*This is the long-form source copy for <https://pokekara.online/claude/>. Edit this file first, then update `claude/index.html` to match. The public page is a condensed version of this text.*

---

## Summary

Pokekara Studio is an independent game studio building **VITALE: Football Career**, a simulation-driven mobile football career RPG for iOS and Android. VITALE is in active development and has not been released yet.

Claude is part of how VITALE is engineered. We use it to multiply what our engineers can do, inside a development process that humans control. People decide what we build. Claude helps us analyse, implement, test and review how we build it.

**AI-assisted engineering, human-controlled product.**

What this case study does not claim:

- AI did not make our game.
- Claude does not replace engineers.
- VITALE does not currently ship end-user AI features.

---

## 1. Why Claude

VITALE is a persistent football world, not a collection of separate screens. Its systems feed one another:

> player development → squad selection → minutes played → fatigue and form → performance → market interest → transfer opportunities → career trajectory

A change at the start of that chain can surface several systems later, sometimes many simulated seasons later. You cannot treat a change as an isolated feature.

For a small team, the hardest part is rarely writing a single feature. It is holding the whole system in view while changing one part of it. Claude helps with exactly that. It can:

- read across a large repository;
- trace how state and logic flow between systems;
- reason about the consequences of a change before the code changes;
- then help implement, test and review the change itself.

This lets a small independent studio take on engineering problems that would normally need more engineering capacity.

## 2. Where Claude fits in VITALE

VITALE is built in three layers:

1. **Simulation systems** decide what happens: MatchEngine, WorldEngine, career systems, competitions, transfers and the data pipeline.
2. **The Unity mobile client** shows it: a portrait, one-thumb interface and selected 3D scenes.
3. **Blender production** gives it a face: characters and high-impact career moments, prepared as mobile-ready assets for the Unity client.

Claude works on the engineering side of that picture:

- **Simulation systems** are where it does most of its work: architecture, implementation, tests and review.
- **Data and tooling** covers pipelines, validation rules, diagnostics and internal tools.
- **QA** covers regression analysis and deterministic checks.

Game design, creative direction, scope and acceptance stay with people.

## 3. The workflow

Every meaningful change follows the same path:

**Product direction → Architecture → Implementation → Automated testing → Independent review → Human acceptance**

Humans own the first and last steps. Claude takes part in the steps between them.

| Humans own | Claude assists with |
|---|---|
| Product direction and game design | Repository-scale analysis |
| Final architecture decisions | Implementation |
| Scope: what is in and what is out | Refactoring |
| Final acceptance of every change | Test creation |
| | Regression analysis |
| | Code review |
| | Technical documentation |
| | Decomposing large engineering objectives |

## 4. Architecture reasoning

Before implementation starts, Claude analyses the relevant parts of the repository and answers questions such as:

- Which systems does this change involve?
- Where does the relevant state live, and who reads or writes it?
- What depends on the code we are about to change?
- Which invariants must hold? Determinism, for example, or persistence compatibility.

The output is a concrete map of the change, not just a plan to start typing. Claude may propose options and trade-offs, but a human makes the decision. We record architecture decisions so that the next change builds on an explicit foundation rather than on someone's memory.

## 5. Implementation

We break large objectives into **bounded tasks**. Each task has a brief:

```
OBJECTIVE    One bounded change, stated plainly
CONTEXT      Systems and files involved
CONSTRAINTS  Determinism holds · no unrelated changes
TESTS        New behaviour covered · existing suite passes
ACCEPTANCE   Review complete · human sign-off
```

Claude implements against the brief, not against an open-ended request. Bounded changes are easier to review, test and revert, and they keep Claude focused on the part of the system the task is about.

## 6. Test generation

We write tests alongside the code, and treat them as part of the change. Claude helps with:

- unit tests for individual rules;
- scenario tests for simulation behaviour that spans several steps;
- edge cases that are easy to overlook.

Because the systems interact, many of the most valuable tests check outcomes across systems. For example, a test can confirm that a change to fatigue does not quietly break selection logic further down the chain.

## 7. Regression analysis

When a change touches shared systems, Claude helps us work out what could regress and why. It reads test output and diagnostic logs that are too long to inspect comfortably by hand. It then groups failures by their likely cause and points to where behaviour diverged.

A green test run is not the goal. The goal is to understand whether each changed result is:

- a bug;
- an intended consequence of the change; or
- a sign that a test itself needs updating.

A human makes that judgement.

## 8. Independent review

Implementation and review are separate steps. A review pass:

- starts from a fresh context;
- reads the diff against the original brief;
- is asked explicitly to challenge assumptions, looking for missed edge cases, unintended side effects, scope creep, and code that does something other than what the brief asked for.

We verify findings before acting on them, and a human decides which findings matter.

## 9. Deterministic validation

VITALE's MatchEngine is a headless simulation designed to be deterministic: the same inputs and the same seed produce the same result. That property makes the simulation testable and keeps it balanceable over the long term.

We use determinism as a safety net:

- If a change should not affect outcomes, we check that it doesn't.
- If a change should affect outcomes, we measure the difference instead of judging it by eye.

Claude helps write these checks and helps interpret any differences in the results.

## 10. Data tooling

A football world depends on a lot of structured data: player identity and roster data, physical profiles, clubs and competitions. Claude helps us build and maintain the pipelines that shape, validate and load this data. It also helps write the validation rules that catch inconsistencies before they reach the simulation.

## 11. Multi-agent development workflows

We split larger objectives across focused Claude sessions, each with its own role:

- exploring the codebase;
- implementing a bounded task;
- running verification;
- reviewing a change made in a different session.

Separate roles keep each context small, and they mean the agent that reviews a change is never the one that wrote it. A human coordinates the work, sets the scope of each task and integrates the results.

## 12. Human acceptance

Nothing ships because a model said it was done. Every change ends with a human decision on three questions:

- Does it do what the product needs?
- Is the evidence convincing?
- Does it fit where VITALE is going?

Product direction, design taste and final acceptance stay with humans.

## 13. Future Claude and API use

Today we use Claude inside our engineering process. VITALE does not currently ship any end-user AI features. Areas we are exploring for the future:

- **Internal engineering automation:** turning routine engineering tasks into repeatable, reviewable workflows.
- **Simulation diagnostics:** explaining why a match, season or career unfolded the way it did.
- **QA analysis:** triaging large test and balancing runs into actionable findings.
- **Narrative and content tooling:** helping writers produce and maintain career content at scale.
- **Localization workflows:** supporting translation and consistency checks across languages.
- **Developer intelligence:** summarising large diagnostic outputs into the items that need attention.

Any player-facing use would go through the same human-controlled design, review and acceptance process described above.

---

## Contact

- Partnerships, investment, and questions about how we work: anatolii@pokekara.online
- General enquiries: hello@pokekara.online
