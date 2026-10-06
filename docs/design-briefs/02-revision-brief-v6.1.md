# CivicPath v6.1: Revision Brief

**For:** Claude Design, revising the current CivicPath v6 prototype into v6.1.
**Read all of it before changing anything.** This brief is self-contained. It explains each problem, why it matters in practice, and exactly what to change. Where this brief conflicts with the v6 brief or the current build, follow this brief.

**Scope:** v6.1 is a correction pass, not a redesign. Keep everything listed in section 0. The biggest changes are conceptual: what the system can know (section 1), who can see what (section 2), what the city does versus what the applicant does privately (section 3), and making the case manager's work interactive (section 9).

---

## Contents

0. What to keep
1. The governing principle: show only what the system can know
2. Visibility and privacy model
3. Separate city requirements from the applicant's private work
4. Record source replaces "evidence"
5. Prior-approvals review (replaces "restart review")
6. Corrected statutory mechanics (review clock, correction requests, meetings)
7. Sequencing and data errors to fix
8. Private facts to remove
9. Staff workflows to make interactive
10. Leadership dashboard fixes
11. One canonical registry of sample projects
12. Interface fixes
13. Revised Saguaro Commons seed data
14. Revised guided tour
15. Acceptance checklist

---

## 0. What to keep

Keep these from v6 without change unless a later section says otherwise:

- Visual system, typography, palette, focus states, accessibility quality
- Demo bar with "Viewing as," reset, About
- Global structure: public site, applicant "My projects," staff "My work," leadership dashboard
- Project header + left section rail + breadcrumb
- Approval pages with tabs (Summary, Submittals, Review, Corrections, Decision, Fees, Record)
- Plan sheet viewer with comment pins, revision control, superseded-revision warnings
- Comment → response → verification → recommendation → decision chain
- Coordinated issue CO-01 and the consolidated correction request concept
- Gates rendered as named locks with reason and citation
- Path views (timeline, table, by holder)
- Public hearings calendar, guides, "Start a project" flow
- Simulated "Ask about this project" panel (keep the SIMULATED label)

---

## 1. The governing principle: show only what the system can know

CivicPath is run by the city. A city system knows some things completely, some things only when someone tells it, and many things never. v6 sometimes shows facts that no city would have (why a project stalled, private contract costs, sales activity) or treats the city's own approvals as uncertain. Both would undermine credibility with any planning director or city attorney.

Apply these four rules to every status, event, number, and label in the product:

| Source | What the system can say | How to label it |
|---|---|---|
| **City action** (a city decision, permit, fee receipt, inspection, notice, hearing) | Authoritative. The city made it. | "City record" (or "City record · migrated" for pre-CivicPath records, with the legacy file number) |
| **Filing** (an application, submittal, owner authorization, or upload by the applicant or a partner) | What was filed, by whom, and when it was filed. Not what happened outside. | "Filed by [party] on [date]" |
| **Outside decision** (ADEQ, ADWR, ADOT, ADRE, CAGRD, Recorder, private utility) | Only once someone uploads the decision document and staff verify it | "Outside decision · verified [date]" or "Outside decision · uploaded, pending verification" or "Not on file" |
| **Private business facts** (financing, sales, contract prices, internal reasons, consultants' work) | Nothing. Never displayed in city or public views. | Not shown. The applicant may track these in the private team workspace (section 3). |

Derived facts must come from city data only. The system can say "No applicant activity for 36 months," because that is computed from its own records. It can never say why.

---

## 2. Visibility and privacy model

v6 has no visibility rules, and the public project page currently publishes the correction request and the pre-application meeting notes, contradicting its own footer. Add an explicit model.

### 2.1 Visibility levels

Every project, document, comment, and event carries one of these levels:

| Level | Who sees it | Examples |
|---|---|---|
| **Public** | Anyone, no sign-in | Project index entry; filed applications for hearing items; staff reports; hearing agendas and notices; adopted ordinances; issued decisions and permits; recorded plats |
| **Project team & staff** | The applicant's authorized team plus assigned city staff and participating partners | Submittal sets; correction requests; responses; pre-application notes; review comments once issued |
| **Staff only** | Assigned city staff (and partners within their scope) | Draft review comments; internal discussion; draft correction requests; staff assessments before they are shared |
| **Team only (private)** | The applicant's team only. The city cannot see it. | The private team workspace (section 3) |
| **Confidential** | Named people only, after the city grants a confidentiality request | Economic-development prospects before announcement; security-sensitive plan sheets; proprietary financial or market studies |

Personal contact details of applicants and owners (phone, email, home address) are never public. City staff work contact information may be public.

### 2.2 When a project becomes public

- A project appears in public search and on the public site **only after a formal application is filed and deemed administratively complete**. Pre-application activity is never public.
- Single-family homeowner permits: public index shows address, permit type, status, and dates only; no names.

### 2.3 Public project page: what it shows

- Project name, address, parcel, project number, applicant entity name (public record), case manager (city staff)
- What is proposed, in factual terms taken from the filed application
- Current status in factual terms ("Site plan amendment under staff review. Correction request issued Oct 1, 2026; applicant revising.")
- Approvals on this parcel (city records): what, when, current lifecycle (active / expired)
- Hearings: only hearings that are **scheduled and noticed**. Never tentative or anticipated hearings.
- Notices issued (type and date)
- Public documents only (see 2.1)
- "Get updates"

**Remove from the public page:** the correction request document; pre-application notes; any narrative about stalls, financing, sales, or reasons; tentative hearing dates.

### 2.4 Show visibility in the interface

- Each document row shows a small visibility label (Public / Team & staff / Staff only / Confidential).
- The applicant's "Public page" section is a true preview of what residents see, with a note listing what is not shown.
- Staff see a "Visible to: …" line on draft comments and correction requests.

---

## 3. Separate city requirements from the applicant's private work

v6 tracks the applicant's private due diligence (title date-down, survey recertification, geotechnical report, consultant names, the water line-extension price) as if they were city requirements, and the city's own "next actions" tell the applicant to "Order title date-down." A government system should not track or advise on private transaction work, and the city does not make determinations about it.

### 3.1 City path (the Path, Approvals, gates, clocks)

Contains only approvals that a city department, partner, or outside agency actually issues, plus city-required submittal items attached to a specific application.

- Title reports, surveys, and geotechnical reports appear **only as submittal requirements** inside the specific application that requires them (e.g., "Title report dated within 30 days (sample)" in the preliminary plat's submittal checklist; "Geotechnical report" in the building permit's submittal checklist). They are not stand-alone requirements on the Path.

### 3.2 Private team workspace (new rail section for the applicant persona only)

- Rail item: **Team checklist (private)**. Visible only to the applicant persona. Not in any staff, partner, leadership, or public view.
- Header text: "Private to your team. The city cannot see this checklist."
- Contents (seed): title commitment date-down; ALTA survey recertification; residential geotechnical report; Phase I update; consultant directory (civil engineer, architect, surveyor, title company); optional private budget lines (water line extension estimate, CAGRD estimate). The applicant can add items and link them to city requirements ("needed for PLT-16 submittal").
- The applicant overview splits next actions into **"Required by the city"** and **"Your team checklist"** (the second list is small and clearly labeled private).

### 3.3 Stage changes

- **Stage 0 renamed "Pre-application."** It contains only the city pre-application meeting, the water will-serve (partner), and any recorded restrictions that affect land use (outside decision). Private due diligence moves to the team checklist.
- **Stage 7 renamed "Sale (state)."** The city has no role. Show it as an informational stage: the ADRE public report requirement, its gate on the recorded plat, and a note that CivicPath does not track sales. Remove any implication that the system enforces "no sale before the report." Gate text: "Under state law, units may not be sold until ADRE issues the public report. Shown for information; not tracked by the city."
- Stop showing "Stage X of 7." Show "Stage 3 · Site plan." (There are eight stages, numbered 0–7.)

---

## 4. Record source replaces "evidence"

v6 marks the city's own prior approvals as "Reported · approval letter not on file · expiry unknown," and even cites a "City status email" as evidence. The city issued those approvals; it knows. The "Reported / Unknown" idea came from the applicant's side of a real project and does not apply to a city system.

Replace the Evidence field everywhere with **Record source**:

| Value | Meaning |
|---|---|
| City record | Created in CivicPath |
| City record · migrated | Imported from the city's legacy permitting system at go-live; shows legacy file number (e.g., "Legacy SP-2022-018") |
| Partner record | Issued in CivicPath by a participating partner |
| Outside decision · verified | Uploaded and verified by staff |
| Outside decision · pending verification | Uploaded, not yet verified |
| Not on file | An outside decision the system expects but nobody has uploaded |

- Remove the "Records gaps: X reported · Y unknown" summary. Replace with **"Outside decisions not on file: N"** (applicant-facing) and a staff **"Verify uploads"** queue.
- Remove "Correspondence supports Reported status only" and any use of correspondence as evidence of a city approval.

---

## 5. Prior-approvals review (replaces "restart review")

The idea is right: when a project changes owner or program, someone has to sort out what still counts. But v6 calls the case manager's sorting "recorded decisions" made at the pre-application meeting. In practice, pre-application statements are non-binding by code, and calling them decisions invites vested-rights and estoppel claims. Formal determinations go through formal processes.

### 5.1 Rename and reframe

- Rename **"Restart review"** to **"Prior approvals on this parcel."**
- Each prior approval shows: what it was, the program it was approved for, record source, lifecycle (active / expired / expires on [date] / does not expire), and a **staff assessment** of how it applies to the current application: Carries forward · Renew · Amend · Replace · New requirement · Not applicable · Assessment pending.
- Label every assessment: **"Staff assessment · preliminary and non-binding. Final determinations are made in the decision on each application or by formal interpretation."** (Restore v5's language: "establishes a roadmap, not an entitlement.")
- Show who made each assessment and when.

### 5.2 Formal determinations are separate requirements

Where a question needs a binding answer, it becomes its own requirement handled by the official with authority, with an appeal path. Seed example:

- **ZIN-34 Zoning interpretation:** "Does Ordinance 2022-14 (PAD) limit the project to rental tenure?" Held by the Zoning Administrator (City). Written, appealable to the Board of Adjustment within 15 days (sample). Filed Sep 8, 2026; due Oct 6, 2026 (sample code time frame).
- **ZON-07 PAD amendment** becomes conditional: "Required only if ZIN-34 finds the PAD limits tenure." Status: "Conditional · awaiting ZIN-34."

### 5.3 What triggers the review
The review opens when the city receives a filing that changes the project: a new owner authorization or a new application for a different program. Date events by the filing date, not by the private transaction date.

---

## 6. Corrected statutory mechanics

### 6.1 The correction-meeting window is wrong
v6 shows "10-working-day meeting window closes Oct 16" counted from the date the correction request issued. That misstates the law. Under A.R.S. § 9-835 as amended by Laws 2025, ch. 187 (SB 1353), **within ten working days after a request by the applicant, the municipality must meet or discuss the request for corrections with the applicant.** The clock starts when the applicant asks, not when the city issues.

Change to:
- A **"Request correction meeting"** button on every open correction request.
- Before a request: "You may request a meeting about these corrections at any time. The city must meet within 10 working days of your request (A.R.S. § 9-835)."
- After a request: "Meeting requested [date]. City must meet by [request date + 10 working days]." Show this deadline on the case manager's queue.
- Remove "meeting window closes Oct 16" everywhere.

### 6.2 Correction requests per application
- During substantive review, the city may issue **one comprehensive request for corrections**, with a supplemental request only in limited circumstances, unless the applicant agrees otherwise in writing. Exceeding the limit or the time frame triggers a **refund of all review fees** for that application.
- Each approval shows "Correction requests: 1 of 1 comprehensive" and flags any further request as "Supplemental (requires basis)" or "By written agreement."
- Leadership chart "Review cycles per approval" becomes **"Correction requests per application,"** with applications over the limit highlighted as refund exposure.

### 6.3 Denial for excessive deficiencies (residential)
For residential land development and building applications, the city may deny for excessive substantive deficiencies only if it notified the applicant and owner within 15 working days of submission (or treats the application as withdrawn). Add this as a dated checkpoint on residential applications: "Excessive-deficiency notice deadline: [submission + 15 working days] · not issued."

### 6.4 Units and clock display
- All clock counts in **working days**. Remove mixed units such as "Paused · 3 days" (calendar). Use "Paused 2 working days."
- Show completeness phase and substantive phase separately (keep v6's component).
- Legislative items (General Plan amendment, rezoning, PAD amendment) show hearing dates, not a clock.

### 6.5 Response deadline must come from code
Remove "Response due Dec 1" (no stated basis). Replace with: **"Application expires if no resubmittal within 180 days of the correction request (sample city code)"** and compute the date.

### 6.6 Sample time frames
Keep v6's sample time frames. Add: Zoning interpretation: 20 working days (sample).

---

## 7. Sequencing and data errors to fix

1. **Hearing for an unfiled application.** Remove the Nov 4 P&Z hearing on the Saguaro Commons preliminary plat from every view (public calendar, schedule, public page, notes). The plat has not been filed. A hearing appears only after filing, completeness, scheduling, and notice.
2. **Pre-application after submittal.** The seed has the restart pre-application meeting on Sep 17 but the site plan submittal on Sep 8, violating the pre-application gate. Move the meeting to **Aug 20, 2026**.
3. **Technical reports with their own clocks.** The traffic impact analysis and drainage report are reviewed as part of the site plan submittal, but v6 gives them separate approvals with separate clocks (day 9/30) while their comments are already in the site plan correction request. Make them **submittal components of SPR-13**: listed in SPR-13's submittal checklist and Submittals tab, with report fees, no separate clock, no separate status on the Path. Remove TIA-14 and DRN-15 as Path rows and from staff queues.
4. **Site plan amendment type and fee.** Reconfiguring access and detention for a new program is a major amendment, not minor. Change to **"Major site plan amendment,"** fee **$3,521** ($3,300 + $10/acre × 22.1, sample), paid Sep 8.
5. **Prior site plan status.** The 2023 residential site plan was a city approval. Show it as City record · migrated (Legacy SP-2022-018), approved Mar 14, 2023, **active until Mar 14, 2028** (5-year validity, sample). SPR-13 is an amendment to it.
6. **Missing gates.** Add ASR-22 Improvement assurances → REC-19 Record plat. Grading permit GRD-23 requires both SWP-25 stormwater and DST-26 dust permit before issuance.
7. **Tier of the condominium declaration.** CND-18 is prepared by the applicant's counsel; the city reviews the condominium plat and any PAD-required association provisions; the Recorder records. Holder: "Applicant (prepares) · Planning (reviews plat)." Remove the Partner badge.
8. **Stage progress bar.** Every stage segment must show its own state: Done · In progress · Not started (can start now) · Not started (blocked) · Not applicable. Never fill a stage that has unstarted work. Saguaro at demo start: 0 Done · 1 In progress (ZIN-34) · 2 Not started, can start now · 3 In progress · 4 Not started, blocked · 5 Not started · 6 Not started · 7 Not started (state, informational).
9. **Path stage labels.** Remove "CURRENT" on every early stage. Use the same five stage states.
10. **Overview "Expiring or expired" list.** Limit to approvals that are active and expire within 90 days, plus expirations in the last 30 days. Do not list "scope-limited" items or items already addressed in the prior-approvals review.
11. **Demo date.** Change "today" to **Thursday, October 1, 2026**, so the case manager issues the correction request live in the tour (section 9.1). Recompute every date and counter from this date.

---

## 8. Private facts to remove

Remove every instance of the following from city, staff, leadership, and public views:

| Remove | Replace with |
|---|---|
| "Project stalled · Financing failed" (history event and timeline lane label) | System-observed events only: "No applicant activity Jul 2023 – Aug 2026 (36 months)," "Grading permit expired · 180 days without inspection · Jan 2024," "Building permits expired · Jan 2024." Lane name: **Inactivity** |
| "Ownership changed Jul 15" dated to the private sale | "Owner authorization filed by Ridgeline Residential LLC · Aug 4, 2026 · recorded deed attached" |
| "Program changed Aug 2026" as a business event | "Application filed for a different program: for-sale condominium · Sep 8, 2026" (and the zoning interpretation request filed the same day) |
| Water line-extension "~$433,000" and "estimate pending" | Not shown in city views. Applicant may enter in the private team checklist. |
| CAGRD "quote requested alongside the water commitment" | "Fee set by CAGRD; not collected by the city." |
| Title company, surveyor, and architect names in city views | Only firms whose names appear on sealed plan sheets (civil engineer on C-03, architect on SP-01) may appear, as sheet authors. Consultant directory moves to the team checklist. |
| Notes phrased as the applicant's questions ("Ask whether the 2023 stamped set can be re-used") | Staff assessment language ("Staff assessment: prior improvement plans may be amended; realigned access requires revision.") |
| Leadership stall reasons "Financing," "Owner change," "Applicant unresponsive," "Scope change" (randomly assigned) | Observable categories only (section 10) |
| Public narrative "stalled in 2023, changed owners…" | Factual approvals history (section 2.3) |

---

## 9. Staff workflows to make interactive

The development services director is the champion who would sponsor a pilot. v6 shows the results of staff work but staff cannot do the work. Make these four workflows interactive.

### 9.1 Assemble and issue a correction request (case manager)
- **Demo start state (Oct 1):** SPR-13 R2 is in substantive review, day 9 of 30. Disciplines have **draft** comments (Staff only): Engineering E-03, Fire F-02, Planning P-01 and P-04, Wastewater W-02. Water: "No comments."
- Applicant view at start: "In review · substantive day 9 of 30." No comments visible.
- Case manager (Planning) opens SPR-13 → Corrections → **"Assemble correction request."**
  - Shows all draft comments grouped by discipline and sheet, each with an include toggle and edit.
  - Detects that E-03 and F-02 affect the same element (east access drive) and offers **"Flag as coordinated issue"** → creates CO-01 with owner and participants.
  - Shows a pre-issue checklist: "This is comprehensive request 1 of 1 for this application," "Clock will pause on issue," "Applicant may request a meeting; city must meet within 10 working days of the request," "Application expires if no resubmittal within 180 days."
  - **"Issue correction request"** → CR-01 issued Oct 1, comments change to Team & staff visibility, clock pauses, applicant is notified.
- Disciplines see their drafts move to "Issued in CR-01."

### 9.2 Record a staff assessment (case manager)
- On the prior-approvals page, items marked "Assessment pending" have **"Record assessment."**
- Dialog: assessment value (Carries forward / Renew / Amend / Replace / New / N/A), basis (code section or reason, required), visibility (Team & staff), and the non-binding notice.
- If the question needs a binding answer, the dialog offers **"Route to formal determination"** and creates a requirement such as ZIN-34.

### 9.3 Verify an outside decision (case manager or assigned reviewer)
- Staff queue item: "Verify upload · ROW-27 ADOT encroachment permit" (seed one upload so the flow can be demonstrated).
- Verify view: uploaded document, the fields to confirm (agency, permit number, date, scope, expiration), **Verify** or **Return to applicant with note.**

### 9.4 Respond to a meeting request (case manager)
- When the applicant requests a correction meeting, the case manager's queue shows "Meeting requested · must meet by [date]" and opens v6's existing scheduler.

### 9.5 Sample rows that do not open
Rows for sample projects other than Saguaro Commons and Ironwood Pad should open a simple read-only project summary (name, number, stage, status, approvals list) instead of doing nothing. Label "Sample project · summary only."

---

## 10. Leadership dashboard fixes

- **Stalled projects → "Inactive applications."** Definition: an open application with no applicant action for 180+ days, or permits that expired without inspection. Reason column, observable only:
  - No resubmittal after correction request
  - Permit expired without inspection
  - Awaiting applicant upload of outside decision
  - Applicant requested hold (filed)
  - Withdrawn (filed)
- **Remove** "Owner change," "Financing," "Applicant unresponsive," "Scope change," and any randomly generated reasons.
- **Partner and outside-agency turnaround:** show **partners only** (measured from activity inside CivicPath). Remove state agencies (ADEQ, ADWR/CAGRD, ADRE); the city cannot measure them reliably, and publishing comparisons of state agencies is politically sensitive. If kept at all, state agencies appear in a staff-only note: "Applicant-reported dates; incomplete."
- **Review cycles → Correction requests per application** (section 6.2).
- **Refund exposure:** keep; compute from applications past published time frames or over the correction-request limit.
- **Restarted projects table:** rename "Projects with prior approvals under review"; reason text from filings only ("New owner authorization filed," "Application filed for a different program").
- Keep everything labeled sample data.

---

## 11. One canonical registry of sample projects

v6 shows the same sample project with different numbers, stages, and statuses in different views (for example, Mesa Verde Storage is "CR-2026-002 · Stage 6 Building" in Find projects but a conditional use permit hearing, "CR-2026-019," on the calendar). Define the sample projects once and use this registry in **every** view: Find projects, map, hearings calendar, staff queues, dashboard, and summaries.

| Number | Project | Stage | Current item | Status (as of Oct 1, 2026) | Public? |
|---|---|---|---|---|---|
| CR-2026-004 | Ocotillo Crossing | 5 Civil | Improvement plans | In review · day 4 of 20 | Yes |
| CR-2026-005 | Agave Flats | 5 Civil | Grading permit | In review · day 1 of 15 | Yes |
| CR-2026-006 | Creosote Business Park | 3 Site plan | Site plan, response to CR | Verifying response · day 9 of 20 | Yes |
| CR-2026-009 | Javelina Trail Apartments | 3 Site plan | Site plan | In review · day 27 of 30 · at risk | Yes |
| CR-2026-011 | Sunset Ridge | 1 Zoning | Rezoning R-1 to R-3, 12 ac | Council second reading Oct 21 | Yes |
| CR-2026-012 | Quail Run Estates | 0 Pre-application | Water will-serve | Partner review | No (pre-application) |
| CR-2026-014 | Yucca Lane Duplexes | 3 Site plan | Site plan | Inactive · no resubmittal 190 days after CR | Yes |
| CR-2026-015 | Verde Vista Hotel | 6 Building | Building permit | In review · day 7 of 20 | Yes |
| CR-2026-019 | Mesa Verde Storage | 1 Zoning | Conditional use permit, 4.2 ac | P&Z hearing Oct 14 (noticed Sep 25) | Yes |
| CR-2026-020 | Red Rock Car Wash | 5 Civil | Grading permit | Inactive · permit expired without inspection | Yes |
| CR-2026-021 | Sotol Senior Living | 3 Site plan | Site plan | In review · day 20 of 30 | Yes |
| CR-2026-027 | Palo Brea Phase 2 | 4 Plat | Preliminary plat, 88 lots | P&Z hearing Oct 14 (noticed Sep 25); water commitment in partner review | Yes |
| CR-2026-031 | **Saguaro Commons** | 3 Site plan | Major site plan amendment | Section 13 | Yes |
| CR-2026-044 | **Ironwood Pad** | 6 Building | Building permit, 8,400 sf retail | In review · day 12 of 20 · time frame ends Oct 13 | Yes |

Public hearings calendar (only these): **Oct 14** P&Z: Mesa Verde Storage CUP; Palo Brea Phase 2 preliminary plat. **Oct 21** Council: Sunset Ridge rezoning, second reading. Nothing for Saguaro Commons.

Dashboard counts, queues, and maps must reconcile with this registry plus additional unnamed sample projects as needed to reach the dashboard totals. State that the dashboard includes additional sample projects not individually listed.

---

## 12. Interface fixes

1. **Section rail:** remove the two-letter codes (OV, PA, AP…). Use icons or nothing. Shorten "Corrections · what to fix" to **"Corrections"** for every persona; the applicant's page title can still read "What you need to fix."
2. **Phone width:** collapse the demo bar to one row ("DEMO · Viewing as [select] · ☰"), collapse the site header to logo + menu, and collapse the project header to name + status + stage bar until expanded. Target: content begins within 300 px of the top.
3. **Clock wording:** working days throughout (section 6.4).
4. **Overview "Blocked by gates":** keep; ensure ASR-22 and DST-26 gates appear (section 7.6).
5. **Fees page:** separate **City fees** (paid / estimated / conditional) from **Outside fees (informational, not collected by the city)**. PAD amendment $2,750 is listed as **"Conditional · only if required by ZIN-34,"** not in the estimated total.
6. **Guided tour:** reduce to the 9 steps in section 14 (about 3 minutes). Keep "Explore on my own."
7. **Document list:** add the visibility label column (section 2.4).
8. **Approval page header:** replace Evidence with Record source (section 4); replace Restart determination with Staff assessment (section 5).

---

## 13. Revised Saguaro Commons seed data

**Project:** CR-2026-031 · 1900 N. Ridge Parkway · parcel 501-22-004C · 22.1 ac · applicant/owner Ridgeline Residential LLC (owner authorization filed Aug 4, 2026) · case manager Alex Morgan.

**Proposed (from the filed application):** 225 for-sale condominium units, amending the 2023 build-to-rent site plan.

**History (city-observable events only):**
- Feb 15, 2022 · PAD adopted, Ordinance 2022-14 (City record · migrated)
- Apr 12, 2022 · Environmental restriction release recorded (Outside decision · verified)
- Mar 14, 2023 · Residential site plan approved, Legacy SP-2022-018, build-to-rent program, valid to Mar 14, 2028 (City record · migrated)
- Jun 2023 · Improvement plans approved; grading and building permits issued; impact fees paid (City records · migrated)
- Jan 2024 · Grading and building permits expired, 180 days without inspection (City records · migrated)
- Jul 2023 – Aug 2026 · No applicant activity (derived)
- Aug 4, 2026 · Owner authorization filed by Ridgeline Residential LLC, recorded deed attached
- Aug 20, 2026 · Pre-application meeting held (notes: Team & staff)
- Sep 8, 2026 · Major site plan amendment (R2) filed with traffic and drainage reports; zoning interpretation request (ZIN-34) filed
- Sep 10, 2026 · Notice to owners within 300 ft of administrative site plan review
- Sep 18, 2026 · SPR-13 deemed administratively complete (working day 8 of 10)
- Sep 21, 2026 · Substantive review day 1
- Sep 30, 2026 · Water will-serve issued for 225 units (Partner record)
- Oct 1, 2026 · (tour) CR-01 issued, comprehensive request 1 of 1, clock paused at day 9

**City path:**

| ID | Requirement | Stg | Holder (tier) | Status Oct 1 | Lifecycle | Staff assessment | Record source | Notes |
|---|---|---|---|---|---|---|---|---|
| PRE-04 | Pre-application meeting | 0 | Planning (City) | Held Aug 20 | — | New requirement | City record | Notes: Team & staff; non-binding |
| WTR-05 | Water will-serve | 0 | Cholla Ridge Water (Partner) | Issued Sep 30 | Valid 1 year (sample) | Replace (prior letter covered commercial corner) | Partner record | 225 units |
| ENV-03 | Environmental restriction release | 0 | ADEQ / Recorder (Tracked) | Recorded Apr 12, 2022 | Does not expire | Carries forward | Outside decision · verified | Affects residential use of the land |
| ZON-06 | PAD, Ordinance 2022-14 | 1 | City Council (City) | Adopted Feb 15, 2022 | Does not expire | Carries forward | City record · migrated | 225 units, 10.6 du/ac |
| ZIN-34 | Zoning interpretation: does the PAD limit tenure? | 1 | Zoning Administrator (City) | In review · due Oct 6 | — | — | City record | Written, appealable to Board of Adjustment (15 days, sample) |
| ZON-07 | PAD amendment | 1 | Planning → P&Z → Council (City) | Conditional · awaiting ZIN-34 | — | Assessment pending | — | Legislative; hearing dates, no clock |
| CIT-08 | Citizen review & hearing notice | 1 | Applicant / Planning (City) | Conditional on ZON-07 | — | N/A unless ZON-07 | — | 300-ft letters, newspaper, 4×8 sign, ≥15 days |
| P207-09 | Prop. 207 waiver | 1 | Owner / City (City) | Recorded 2022 | Does not expire | Carries forward | City record · migrated | New waiver only if PAD amended |
| WTR-10 | Assured water supply: designated-provider commitment | 2 | Cholla Ridge Water (Partner) / ADWR (Tracked) | Not started · can start now | — | New requirement | — | Gates PLT-17 (A.R.S. § 45-576) |
| CAG-11 | CAGRD member-land activation | 2 | CAGRD (Tracked) | Not started | — | New requirement | — | Fee set by CAGRD; not collected by the city |
| WTR-12 | Water line-extension agreement | 2 | Cholla Ridge Water (Partner) | Not started | Prior 2021 agreement covered commercial corner only | Replace | Partner record · migrated | No dollar amounts shown |
| SPR-13 | Major site plan amendment, for-sale condominium | 3 | Planning, with Engineering, Fire, Wastewater, Water (City) | In review · substantive day 9 of 30 | Amends SP-2022-018 (active to Mar 14, 2028) | Amend | City record | Includes TIA and drainage report as submittal components; fee $3,521 paid Sep 8; home of CO-01 |
| PLT-16 | Preliminary plat, condominium | 4 | P&Z Commission (City) | Not started · may be filed after SPR-13 decision (sample) | — | New requirement | — | Hearing scheduled only after filing and completeness; noticed ≥15 days before |
| PLT-17 | Final plat | 4 | City Council (City) | Blocked by WTR-10, PLT-16 | — | New requirement | — | |
| CND-18 | Condominium plat & declaration | 4 | Applicant prepares · Planning reviews plat | Not started | — | New requirement | — | Owners' association required before any sale (state law; PAD may add provisions) |
| ASR-22 | Improvement assurances | 4 | Engineering / City Attorney (City) | Not started | — | New requirement | — | Gates REC-19 |
| REC-19 | Record plat & declaration | 4 | County Recorder (Partner) | Blocked by PLT-17, ASR-22 | — | New requirement | — | |
| PDR-33 | Protected development right plan (optional) | 4 | City Council (City) | Not started | — | Optional | — | 3 years, extendable to 5 (sample) |
| CIV-20 | Improvement plans | 5 | Engineering (City) | Not started | Prior plans approved Jun 2023; approval expired Jun 2024 (1 year without construction, sample) | Amend | City record · migrated | Realigned access requires revision |
| GRD-23 | Grading permit | 5 | Building Safety (City) | Expired Jan 2024 | Expired | Renew | City record · migrated | Requires SWP-25 and DST-26 before issuance |
| ATC-24 | ADEQ approval to construct, water & sewer | 5 | ADEQ (Tracked) | Expired; covered commercial corner only | Expired | Replace | Outside decision · verified | |
| SWP-25 | Construction stormwater, SWPPP + NOI | 5 | ADEQ (Tracked) | Not started | — | New requirement | Not on file | Gate: before ground disturbance |
| DST-26 | Dust control permit | 5 | County Air Quality (Partner) | Not started | Prior expired | Replace | Partner record · migrated | Gate: before ground disturbance |
| ROW-27 | ADOT encroachment permit | 5 | ADOT (Tracked) | Uploaded Sep 28 · pending verification | Unknown until verified | Assessment pending | Outside decision · pending verification | Seed for the 9.3 verify flow |
| BLD-28 | Building permits, residential buildings | 6 | Building Safety (City) | Expired Jan 2024 | Expired | Replace (current code cycle applies) | City record · migrated | |
| IMP-29 | Development / impact fees | 6 | Building Safety (City) | Paid Jun 2023 | — | Assessment pending (credit per city code, sample) | City record · migrated | |
| INS-30 | Inspections | 6 | Building Safety (City) | Not started | — | New requirement | — | |
| COO-31 | Certificate of occupancy | 6 | Building Safety (City) | Not started | — | New requirement | — | |
| SAL-32 | ADRE subdivision public report | 7 | ADRE (Tracked, state) | Informational | — | — | — | Not tracked by the city; state law requires it before sale |

Removed from the city path: TTL-01, SRV-02, GEO-21 (moved to team checklist), TIA-14 and DRN-15 (now components of SPR-13). Recompute all counts (Path total, assessment counts, gates, expiring) from this table.

**CR-01 contents (issued in the tour):** E-03 (Engineering, sheet C-03: revised east access drive overlaps Detention Area A; storage falls short), F-02 (Fire, sheet SP-01: revised drive does not meet aerial apparatus turning radius), P-01 (Planning: parking follows product type; show the ratio for for-sale units), P-04 (Planning: show owners' association common-area tracts), W-02 (Wastewater: confirm sewer connection capacity for 225 units). CO-01 links E-03 and F-02; owner: applicant's civil engineer (named on sheet C-03); participants: Engineering, Fire.

**Fees (sample):**
- City fees paid this application: SPR-13 major amendment $3,521; traffic report $600; drainage report $300. **Total $4,421.**
- City fees estimated: preliminary plat $4,050; final plat $3,090; improvement plans $300. **Total $7,440.**
- Conditional: PAD amendment $2,750, only if ZIN-34 requires it.
- Prior applications (history): PAD 2021 $2,750; site plan 2022 $3,521; grading, building, and impact fees 2023 $14,200 (credit per IMP-29).
- Outside fees (informational, not collected by the city): ADRE public report filing fee; CAGRD activation fee. No amounts shown unless the applicant adds them privately.

**Team checklist (private, applicant only):** title commitment date-down (needed for PLT-16 submittal); ALTA survey recertification (needed for PLT-16); residential geotechnical report (needed for BLD-28); Phase I update (lender); consultant directory; private budget lines.

---

## 14. Revised guided tour (9 steps, about 3 minutes)

1. **Resident:** public home → search "Saguaro" → public page. Point out: factual status, approvals on the parcel, no internal documents, no tentative hearings.
2. **Engineering reviewer:** My work → SPR-13 Review → draft E-03 on C-03 (Staff only).
3. **Fire reviewer:** draft F-02 on SP-01.
4. **Case manager:** SPR-13 → Corrections → Assemble correction request → flag CO-01 → issue CR-01 (1 of 1 comprehensive; clock pauses at day 9).
5. **Applicant:** overview → CR-01 → Request correction meeting (city must meet within 10 working days of the request). Point out the private team checklist.
6. **Applicant:** Prior approvals on this parcel → what carries forward; staff assessments are non-binding; the tenure question is routed to a formal zoning interpretation (ZIN-34).
7. **Path:** the water gate chain WTR-10 → PLT-17 → REC-19, and the state-only SAL-32.
8. **Applicant submits coordinated revision R3** → Engineering and Fire verify against R3 → case manager records the site plan decision; clock resumes and completes within the published time frame.
9. **City manager:** dashboard → time frames, correction requests per application, refund exposure, inactive applications (observable reasons only).

---

## 15. Acceptance checklist

**Knowledge and privacy**
- [ ] No view shows financing, sales, private contract amounts, private reasons, or business-transaction dates
- [ ] City approvals never appear as "reported" or "unknown"; record source shown everywhere
- [ ] Outside decisions show verified / pending verification / not on file
- [ ] Visibility label on every document; public page shows only Public items
- [ ] Correction request and pre-application notes are not public
- [ ] Projects appear publicly only after a complete application is filed
- [ ] Applicant contact details never public

**Scope**
- [ ] Private due diligence lives only in the applicant's private team checklist
- [ ] Stage 0 "Pre-application" and Stage 7 "Sale (state)" reframed as specified
- [ ] TIA and drainage are components of SPR-13 with no separate clocks

**Law and sequencing**
- [ ] Correction meeting deadline counts from the applicant's request (10 working days)
- [ ] Correction requests counted against the one-comprehensive-request limit
- [ ] Residential excessive-deficiency notice checkpoint shown
- [ ] All clock values in working days; no unsupported response deadline
- [ ] Pre-application (Aug 20) precedes submittal (Sep 8)
- [ ] No hearing shown for any unfiled application
- [ ] Gates include ASR-22 → REC-19 and DST-26 + SWP-25 → GRD-23
- [ ] Staff assessments labeled non-binding; ZIN-34 formal interpretation exists

**Staff workflows**
- [ ] Case manager can assemble, flag CO-01, and issue CR-01 from discipline drafts
- [ ] Case manager can record a staff assessment and route to formal determination
- [ ] Staff can verify the ROW-27 upload
- [ ] Meeting request appears in the case manager's queue with its deadline
- [ ] Sample rows open a read-only summary

**Consistency and interface**
- [ ] Every sample project matches the registry in section 11 across all views
- [ ] Stage bar shows per-stage state; no "of 7"
- [ ] Dashboard: observable inactivity reasons only; partners-only turnaround
- [ ] Rail without letter codes; "Corrections" label
- [ ] Phone layout: content within 300 px of top
- [ ] Tour is 9 steps
- [ ] Demo date Oct 1, 2026; all dates and counters recomputed
