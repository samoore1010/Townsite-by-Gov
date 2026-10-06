# Townsite: project context

Read this together with `CLAUDE.md` (the rules) before doing any work.

## What Townsite is

A single system of record for every real property development approval in one city, from pre-application to certificate of occupancy (or, for for-sale projects, to the state public report). It is built for the public: applicants, property owners, and neighbors can see where a project stands, what happens next, and who has to act. City departments do their reviews inside it, and city leadership gets accountability metrics.

The current build is a **front-end demo** set in a fictional city (Cholla Ridge, Arizona) with fictional people and projects. Its process is modeled on a real mid-sized Arizona city's development code. All local entities are fictional; real state agencies (ADEQ, ADWR, ADOT, ADRE, CAGRD) appear only as outside agencies the system tracks.

The working product name is **Townsite**. The app's header still says "CivicPath"; renaming happens in Claude Design (see "How the design is changed" below), not in code.

## Who it is for, and the pitch

- **Users:** residents/neighbors (occasional), applicants and their consultants (frequent), city reviewers and case managers (daily), city leadership (periodic).
- **Adoption path:** development services director (champion) → city manager (pilot) → city council (adopts citywide by ordinance, requiring city departments to use it). Outside agencies participate by agreement (county, utility) or are tracked (state agencies).

## Settled decisions (do not reopen without the owner)

1. **Show only what the system can know.** City actions are authoritative. Filings are shown as filed, dated at filing. Outside-agency decisions count only once uploaded and verified by staff. Private business facts (financing, sales, contract prices, reasons for stalls) are never shown.
2. **Visibility levels:** Public, Project team & staff, Staff only, Team only (private), Confidential. A project becomes public only after a complete application is filed.
3. **The applicant's private due diligence** (title, survey, geotech, consultants, private budget) lives in a private team checklist the city cannot see, not on the city path.
4. **Staff assessments are non-binding.** Binding questions go to formal, appealable determinations (e.g., a zoning interpretation).
5. **Arizona licensing time frames (A.R.S. § 9-835, as amended by Laws 2025, ch. 187 / SB 1353):** separate completeness and substantive time frames; the clock pauses while waiting on the applicant; one comprehensive correction request per substantive review (limited supplemental requests); the city must meet within 10 working days **after the applicant requests** a meeting about corrections; missed time frames trigger fee refunds. Confirm current statute text before any external use.
6. **Clarity over features.** The interface answers: where are we, what happens next and whose move it is, and what is required. See `docs/design-briefs/04-clarity-redesign-principles.md`, which governs presentation and overrides earlier briefs where they conflict.

## Design history (for reference)

`docs/design-briefs/` holds the briefs given to Claude Design, in order:

1. `01-design-brief-v6.md`: product framing, domain primer (stages, actors, gates, fees, glossary), data model, navigation
2. `02-revision-brief-v6.1.md`: corrections (knowledge rules, visibility, private checklist, prior-approvals review, statutory mechanics, sample-data registry)
3. `03-project-map-addon.md`: project map
4. `04-clarity-redesign-principles.md`: first-principles redesign for clarity (current direction)

These are design inputs. They are implemented in Claude Design, not in this repo's code.

## How the design is changed

Two routes, both governed by `CLAUDE.md`:

- **Imports from Claude Design** must land with 100% fidelity: unpack the new bundle, `npm run test:import` (pixel-identical to the bundle), then approve. See `docs/UNPACKING.md`.
- **Direct changes by a coding agent** are allowed when the owner asks for a specific change. The agent changes only what was asked, shows before/after screenshots from `npm run test:visual`, and updates the approved baselines only after the owner approves. Rejected changes are discarded.

The approved state of the UI is recorded in `design.lock.json` (checksums) and `tests/baselines/` (screenshots). CI fails any push whose screens differ from the approved baselines.

## Current status

- Repo contains the Claude Design export, a dependency-free static server, checksum and visual tests, and CI.
- Fidelity verified: the served app renders pixel-identical to the original artifact for all personas (desktop and phone) and all project workspace sections.
- Next: deploy to Railway (`docs/DEPLOY.md`).
- Later: backend (see `docs/backend-seam.md`), real authentication, multi-user data. Any screen changes those require are designed in Claude Design first.

## Notes

- The repo is public. `design/assets/dc-runtime.js` and `reference/artifact-bundle.html` come from Claude Design; confirm redistribution terms, or make the repo private.
- Nothing in this repo should reference any real client, real project, or real person.
