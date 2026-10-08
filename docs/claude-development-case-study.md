# Building VITALE with Claude

*Source copy and evidence notes for https://pokekara.online/claude/. Last updated October 2026.*

## Our studio and Claude's role

Pokekara Studio is an independent, bootstrapped game development initiative led by **Anatolii Ushakov** in Ukraine. The studio is not currently separately incorporated. **VITALE: Football Career** is an original mobile football career RPG for iOS and Android, currently in pre-release development.

**Claude Code is the central environment in which our gameplay systems, C# architecture, implementation, testing, review, documentation and creative production work are developed.** Claude contributes to game design, not merely software maintenance. The developer sets the vision, makes product-policy choices and accepts or rejects results.

The studio does **not** claim that VITALE is commercially released, that the Unity presentation is complete, or that there is a deployed player-facing Claude API integration.

## Why this workflow is necessary

A player develops, earns selection, plays minutes, experiences fatigue and form changes, attracts transfers, signs contracts and builds a life within a world that evolves independently. Design decisions connect multiple systems and simulated seasons.

We use Claude to:
- turn gameplay goals into explicit, testable design rules;
- evaluate cross-system architecture, version pins and save-state ownership;
- implement C# simulation systems and diagnostics;
- create deterministic tests, compare world-state fingerprints and analyze failures;
- coordinate bounded implementation and independent code review;
- develop visual direction, UI requirements and Blender/Unity technical-art workflows.

## Game design examples

**Coach authority and player agency.** The intended system lets a coach play a midfielder outside their preferred position when squad needs demand it. Accepting the position may advance secondary-position mastery; requesting to return to the preferred role can create morale consequences if the coach rejects it. The design and authoritative match-position evidence are under active reconciliation, not announced as finished gameplay.

**Wage expectations and popularity.** Contract pricing should reflect current player ability, sporting form, earned reputation, club resources and negotiation context — not merely a small raise on a player's previous contract. This has been an explicit owner-policy decision for ongoing market calibration.

**Football career beyond matches.** The planned experience links training, club selection, personal relationships, media, contracts, money and a persistent world. The game design exists at different stages of implementation and integration; not every described feature is ready.

## Implemented engineering foundations

- **MatchEngine:** deterministic football match simulation and test evidence.
- **WorldEngine:** evolving club, player and competition state with save/reload and resume validation.
- **NPC lifecycle and training:** development, fitness, fatigue, form, recovery and longer-run football-world progression.
- **Transfers and markets:** contract renewals, free agents, loans and club wage commitments, with ongoing economic calibration.
- **Data and validation:** source-data mapping, architecture boundaries, scripted checks, release builds and regression diagnostics.

The three engineering layers are C# simulation, the developing Unity mobile client, and Blender character/visual production. The first is comparatively mature; the latter two remain active workstreams.

## Concrete QA examples

### Persistent development, CPE-NPC

The integrated CPE-NPC work recorded deterministic checks for direct-vs-chunked world advance, continuous vs save/reload/resume runs, legacy fingerprints, calibration artifact comparisons and scoped release validation. These are source-controlled engineering-stage reports.

### Market economy, long-horizon failure

A synthetic 20-club market stress world found that clubs started at 100% wage-budget utilization, preventing renewals. A market remediation corrected that starting defect, but a later deterministic **10-season** calibration discovered structural deflation and underpaid academy-origin players. Instead of claiming completion, the team **blocked integration** pending skill-aware pricing policy. Source evidence is maintained in the RTL market-economy QA reports, including `v3-long-horizon-acceptance.md`.

### Character visual acceptance

Blender tooling can prove topology, file validity and render reproducibility, but those do not guarantee credible human anatomy. Character prototypes failed independent visual gates and were not approved for production. Claude assists with creative direction and development workflows, while the developer retains final visual acceptance.

These are real examples of the value of Claude-led engineering: discover a defect, quantify it, review independently and stop when evidence fails.

## How work proceeds

1. **Founder-directed vision:** Anatolii defines the experience and priorities.
2. **Claude-supported design:** turn ideas into gameplay rules and technical specifications.
3. **Architecture:** analyze dependencies, versioning, persistence, and source boundaries.
4. **Scoped implementation:** work in isolated branches with explicit change permissions.
5. **Deterministic verification:** focused test suites, regression cases, multi-season scenarios and migration checks.
6. **Independent Claude review:** investigate correctness, scope, unintended consequences and economic/visual quality.
7. **Founder acceptance:** accept, remediate or stop. Automated success alone does not constitute a finished product.

## What is not yet released

- No public mobile game, App Store/Google Play listing, measured retention or commercial user base.
- No claim of a production Claude API integration or player-facing generative-AI feature.
- No claim that full Life/Fanbase calibration, Unity scenes, 3D character production or all market rules have passed final acceptance.
- No invented funding, LLC, other legal entity or licensing rights.

## Next steps and why support matters

We are a small bootstrapped project in Ukraine, using Claude Code as a daily engineering and creative work environment. Greater access would make repeated long-horizon QA, design iteration, asset-production assistance and review more affordable. Future Claude API integrations may support internal diagnostics, localization, narrative tooling and QA, but are exploratory.

## Contact

- Developer: Anatolii Ushakov, Ukraine.
- Project/studio profile: https://pokekara.online/studio/
- Technical case study: https://pokekara.online/claude/
- Email: anatolii@pokekara.online and hello@pokekara.online.
