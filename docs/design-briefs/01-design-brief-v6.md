# CivicPath v6: Design Brief

**For:** Claude Design, revising "CivicPath Workspace v5" into v6.
**Read this whole brief before changing anything.** It is self-contained: it explains the product, the real-world process it models, the problems it must solve, the data model, a ground-up navigation and layout redesign, screen-by-screen specs, the seed data, and an acceptance checklist. Where this brief and v5 disagree, follow this brief.

**What to carry over from v5:** the visual language (Public Sans / IBM Plex Mono, the navy/sand/gold palette, the square-cornered civic style, focus rings, motion restraint), accessibility quality, the demo bar concept, the plan sheet viewer and its comment pins, revision control, the comment → response → verification → decision chain, the coordinated cross-discipline issue (CO-01), the decision register, the meeting scheduler, reset, and the guided tour.

**What to rebuild:** the navigation and page structure (section 6), the data model (section 5), the process content (section 3), the roles (section 6.2), and all seed data (section 8).

---

## Contents

1. What CivicPath is and who it is for
2. How it will be adopted (the pitch the demo must support)
3. Domain primer: how development approval works in an Arizona city
4. The problems CivicPath must solve, mapped to features
5. Data model and status vocabularies
6. Information architecture and navigation (ground-up)
7. Screen specifications
8. Seed data
9. Guided tour script
10. Keep / change / cut from v5
11. Content, tone, and guardrails
12. Acceptance checklist

---

## 1. What CivicPath is and who it is for

**One sentence:** CivicPath is the single system of record for every real property development approval in one city, from first inquiry to certificate of occupancy, built so that the public can see exactly where a project stands and what happens next.

**Core idea.** Today a development project's approvals are scattered across city divisions, county agencies, a private utility, special districts, and several state agencies, each with its own portal, file, clock, and vocabulary. Nobody, including the city, holds the whole picture. CivicPath puts the whole path in one place, in order, with each step's owner, status, deadline, gate, and proof.

**Audiences, in priority order:**

1. **The public as applicant.** Property owners, developers, builders, and their consultants and attorneys. They need: what is required for my project, in what order, who holds each step, what is blocking me, what I must do next, and when I will hear back.
2. **The public as neighbor/resident.** People near a proposed project. They need: what is proposed, where it is in the process, when the public hearings are, how to comment, and what was decided.
3. **City staff.** Planners (case managers), engineers, fire marshal, building plans examiners, utility reviewers. They need: a work queue across all projects, their own review workspace, shared status from other disciplines, and the ability to assemble one consolidated correction request per review cycle.
4. **City leadership.** City manager, development services director, mayor and council. They need: proof that the system works (time per stage against published time frames, review cycles, stalled projects, expiring approvals, workload) and a way to answer constituent questions about any project.

**What CivicPath is not:** it is not a legal determination, not a replacement for the code, and (in the demo) not connected to any real agency. Outside agencies that do not participate are still shown in the path; CivicPath tracks them and holds their documents.

---

## 2. How it will be adopted (the pitch the demo must support)

- Most Arizona cities use council-manager government. Council adopts policy by ordinance; the city manager runs the departments.
- Realistic adoption path: **development services director** (feels the pain daily; operational champion) → **city manager** (approves a pilot on a set of projects) → **council** (adopts citywide by ordinance designating CivicPath as the system of record and requiring city departments to use it).
- Council can require **city departments** to work in CivicPath. It cannot require **outside agencies** to. Those participate by intergovernmental agreement (county agencies, special districts) or by service agreement (a private utility), or are simply tracked (state agencies).
- The demo therefore needs three things a pilot sponsor can show upward: a public experience that is obviously better, a staff experience that saves time, and a leadership dashboard that proves it.

---

## 3. Domain primer: how development approval works in an Arizona city

This section is the knowledge the design must embody. Use it for requirement names, descriptions, sequencing, gates, holders, and help text. Fees and time frames are **sample values modeled on a real mid-sized Arizona city**; label them "sample" in the UI.

### 3.1 The actors

| Actor | Who | Tier in CivicPath |
|---|---|---|
| Planning & Zoning Division (Development Services) | Case manager for the whole project; zoning, site plan, plats, public notice, hearings | City (required) |
| Planning & Zoning Commission | Appointed board; holds hearings, recommends on zoning, approves preliminary plats | City (required) |
| City Council | Adopts zoning/PAD by ordinance; accepts final plats | City (required) |
| City Engineering / Public Works | Traffic, drainage, grading, paving, improvement plans, improvement assurances | City (required) |
| Fire Department (Fire Marshal) | Fire access, hydrants, fire flow, life safety | City (required) |
| Building Safety | Building permits, plan review, inspections, certificate of occupancy | City (required) |
| City Wastewater Utility | Sewer capacity and connections | City (required) |
| Private water utility (designated provider) | Water will-serve, assured water supply commitment, line-extension agreement | Partner (by agreement) |
| County Air Quality District | Dust control permit for earthwork | Partner (by agreement) |
| County Recorder | Records plats, declarations, deeds | Partner (by agreement) |
| Arizona Department of Water Resources (ADWR) | Assured water supply certificates/designations; CAGRD | Tracked (outside agency) |
| Central Arizona Groundwater Replenishment District (CAGRD) | Member-land enrollment and per-unit activation fee | Tracked (outside agency) |
| Arizona Department of Environmental Quality (ADEQ) | Water/sewer approval to construct; construction stormwater permit; environmental restriction releases | Tracked (outside agency) |
| Arizona Department of Transportation (ADOT) | Encroachment permits in state highway right-of-way | Tracked (outside agency) |
| Arizona Department of Real Estate (ADRE) | Subdivision public report required before selling lots/units | Tracked (outside agency) |
| Title company, surveyor, consultants | Title commitment, ALTA survey, studies | Applicant's team |

### 3.2 The eight stages

The path runs in this order. Stages overlap in practice, but the gates in 3.3 are hard.

**Stage 0: Pre-development** (applicant-led; ends when the city pre-application meeting is held and the basic due diligence is in hand)
- Title commitment; review easements, CC&Rs, access. Holder: title company.
- Boundary / ALTA survey and legal description. Holder: surveyor.
- Phase I environmental assessment; release any recorded environmental restrictions. Holder: consultant / ADEQ.
- Confirm General Plan designation and zoning. Holder: Planning.
- **Pre-application meeting** (required before any zoning, site plan, or plat submittal). Holder: Planning, with all disciplines attending.
- Water will-serve / capacity inquiry. Holder: water utility.

**Stage 1: Zoning & entitlement** (legislative; ends when zoning or PAD is adopted, or confirmed already in place)
- General Plan amendment, only if the use or density is inconsistent with the General Plan. Major amendments run on an annual cycle. P&Z recommends; Council adopts.
- Rezoning, or establish / amend a **Planned Area Development (PAD)**. Application, narrative, exhibits. P&Z hearing, then Council ordinance. Sample fee: $2,750.
- **Citizen review:** pre-application letters to owners within 300 ft; neighborhood meeting if required.
- **Public notice:** newspaper, mailed notice to owners within 300 ft, and an on-site sign (4 ft x 8 ft for rezoning), all at least 15 days before the hearing. The applicant posts and removes the sign.
- **Proposition 207 waiver** signed by the owner before final approval (A.R.S. § 12-1134).
- A PAD, once adopted, **does not expire**. Changing unit count, product type, or other listed items triggers a PAD amendment.

**Stage 2: Water** (ends when an assured water supply is demonstrated)
- Within an Active Management Area, a subdivision cannot get final plat approval, and lots/units cannot be sold, without a **100-year assured water supply** (A.R.S. § 45-576). Two routes: a Certificate of Assured Water Supply from ADWR, or a **written commitment of service from a designated provider** (a utility ADWR has designated as having a 100-year supply).
- **CAGRD** member-land enrollment / activation, with a per-unit fee, alongside the water commitment.
- **Line-extension (construction) agreement** with the water utility, which sizes and funds the main extensions.

**Stage 3: Site plan** (administrative, staff-level; ends with site plan approval)
- Site plan submittal: application, narrative, site plan, landscape plan, preliminary utility plan, photometric plan, elevations. Sample fee: $3,300 + $10/acre; minor amendment $1,050.
- Technical reports: traffic impact analysis (sample fee $600), drainage/hydrology, water and sewer reports.
- Reviewed by Planning, Engineering, Fire, Wastewater, and the water utility. This is where most cross-discipline conflicts surface.
- Notice to owners within 300 ft on administrative review.
- Validity: phased multi-building site plans are valid 5 years plus a 1-year extension for good cause; an amendment in substantial compliance is a minor amendment approved administratively.

**Stage 4: Plat** (ends when the final plat is recorded)
- **Preliminary plat:** application, engineering, drainage, grading, title. P&Z approval. Sample fee: $1,800 + $10/lot.
- **Final plat:** consistent with the preliminary plat, improvement assurances in place. Staff review, then Council acceptance. Sample fee: $840 + $10/lot.
- For condominiums: a **condominium plat and recorded declaration** creating the owners' association (A.R.S. § 33-1201 et seq.; plat requirements at § 33-1219).
- **Record** the final plat (and condo plat and declaration) with the County Recorder.
- Optional: designate the plat as a **protected development right plan** to lock approved standards against later code changes (A.R.S. § 9-1201 et seq.; sample: 3 years, extendable to 5).

**Stage 5: Civil & site permits** (ends when site work can legally begin)
- Improvement plans: grading and drainage, paving, water, sewer. Holder: Engineering. Sample fee: $300 per engineering report.
- Geotechnical (soils) report scoped to the actual buildings.
- **Subdivision improvement assurances** (assurance agreement or bond) guaranteeing public improvements (A.R.S. § 9-463.01).
- Grading / clearing permit. Holder: Building Safety / Engineering.
- ADEQ approval to construct for water and sewer facilities.
- ADEQ AZPDES **construction stormwater** coverage: stormwater pollution prevention plan + notice of intent, required for disturbance of 1 acre or more.
- County **dust control permit** before earthwork.
- ADOT **encroachment permit** if any work is in a state highway right-of-way.

**Stage 6: Building** (ends with the certificate of occupancy)
- Building permit application + construction documents. Sample review time: about 20 working days per review cycle.
- Development / impact fees due at permit issuance (A.R.S. § 9-463.05).
- Inspections in code sequence.
- **Certificate of occupancy.**
- Permits expire after **180 days without an inspection** (sample rule); they can often be renewed on the approved plans.

**Stage 7: Sale** (for-sale projects only; ends when the public report issues)
- Notice of intent to subdivide + **subdivision public report** application to ADRE, with disclosures (A.R.S. § 32-2181 et seq.). Sample filing fee: $500.
- ADRE issues a certificate of administrative completeness (about 15 business days), then the public report.
- **No sale before the public report issues** (a sale before it is rescindable). Each buyer must receive the report. Closings only when improvements are complete or assured.

### 3.3 Hard gates (show these as named locks)

| Gate | Rule | Basis |
|---|---|---|
| Pre-application before submittal | No zoning, site plan, or plat application until the pre-application meeting is held | City zoning code (sample) |
| Water before plat | Final plat cannot be approved without an assured water supply | A.R.S. § 45-576 |
| Hearing notice before hearing | Notice published, mailed, and posted at least 15 days before | City zoning code (sample) |
| Prop. 207 waiver before final zoning approval | Owner's waiver signed | A.R.S. § 12-1134 |
| Assurances before recording | Improvement assurances in place before plat recording | A.R.S. § 9-463.01 |
| Plat recorded before public report | ADRE will not issue the report without the recorded plat | A.R.S. § 32-2181 et seq. |
| Public report before sale | No unit may be sold before the report issues | A.R.S. § 32-2181 et seq. |
| Stormwater + dust before ground disturbance | Both in place before any earthwork | ADEQ AZPDES; county air quality rules |
| Approval to construct before water/sewer construction | ADEQ authorization first | ADEQ rules |
| Fees before permit issuance | Impact and permit fees paid | A.R.S. § 9-463.05 |

Show a gate's reason and citation on hover/expand. A gate is different from a soft dependency ("Planning is waiting on Engineering's review"), which is shown as "Waiting on."

### 3.4 Review clocks (Arizona licensing time frames)

This is a real legal requirement and a strong selling point. Design the review clock around it.

- Arizona cities must publish, for each type of license (which includes permits and administrative approvals), an **administrative completeness** time frame and a **substantive review** time frame, stated separately, which together make the overall time frame (A.R.S. § 9-835).
- If the city does not issue a completeness or deficiency notice within the completeness time frame, the application is deemed administratively complete.
- The clock **pauses** while the city is waiting on the applicant (after a deficiency notice or a correction request) and resumes on resubmittal.
- During substantive review, the city may issue **one comprehensive request for corrections** (plus a supplemental request only in limited circumstances). This is why CivicPath must consolidate all disciplines' comments into **one correction request per cycle**, issued by the case manager, rather than a stream of separate comments.
- If the city misses the time frame (or an agreed extension), it must **refund the review fees**, and other consequences apply for residential applications.
- A 2025 amendment (SB 1353, Laws 2025, ch. 187) adds a window of **10 working days to meet or discuss the correction request with the applicant**, limits denial for "excessive deficiencies," and allows **third-party review** of single-family residential building permits if the city cannot act within 15 working days. Show the 10-day meeting window as a deadline on each correction request. (Confirm scope before external use.)
- Legislative decisions (General Plan amendments, rezoning/PAD) run on **hearing calendars**, not licensing clocks. Show them with scheduled hearing dates instead of a running clock.

Sample published time frames for the demo (label "sample"):

| Approval | Completeness | Substantive (per cycle) |
|---|---|---|
| Site plan | 10 working days | 30 working days |
| Preliminary plat | 10 working days | 30 working days |
| Final plat | 10 working days | 20 working days |
| Improvement plans | 10 working days | 20 working days |
| Building permit (multi-family) | 5 working days | 20 working days |
| Grading permit | 5 working days | 15 working days |

### 3.5 How approvals age (lifecycle)

Approvals do not stay valid forever, and they are often sized to a specific program. CivicPath must track this.

- **Does not expire:** adopted zoning/PAD (but may not fit a changed program).
- **Expires on a schedule:** site plans (sample 5 years + 1), building and grading permits (180 days without inspection), preliminary plats (sample 2 years unless extended), water approvals to construct, county dust permits.
- **Superseded:** replaced by a later approval of the same thing.
- **Scope-bound:** valid only for what it covered. Example: a water approval sized for a commercial corner does not cover 225 homes.

### 3.6 Glossary (use these terms in help text and tooltips)

- **PAD (Planned Area Development):** a custom zoning district adopted by ordinance, with its own permitted uses, density, and standards.
- **Site plan:** the approved layout of buildings, parking, access, landscape, and utilities on a site.
- **Preliminary / final plat:** the map that legally divides land into lots or units; preliminary sets the layout, final is recorded.
- **Condominium declaration:** the recorded document that creates condo units and the owners' association.
- **Assured water supply / designated provider:** Arizona's 100-year water requirement for subdivisions; a designated provider can issue a commitment letter instead of the developer getting its own certificate.
- **CAGRD:** the state groundwater replenishment district; member land pays a per-unit activation fee.
- **Improvement assurances:** a bond or agreement guaranteeing that public improvements will be built.
- **SWPPP / NOI:** the stormwater pollution prevention plan and notice of intent for ADEQ construction stormwater coverage.
- **Public report:** ADRE's disclosure document that must be given to each buyer before sale.
- **Prop. 207 waiver:** the owner's waiver of diminution-in-value claims for a requested land use change.
- **Certificate of occupancy (CO):** the final building approval to occupy.
- **Correction request:** the city's consolidated list of required changes in a review cycle.
- **Case manager:** the planner responsible for coordinating the whole project.

---

## 4. The problems CivicPath must solve, mapped to features

These problems come from a real Arizona project that stalled and restarted (anonymized as the seed project in section 8). Recovering its status took an attorney's file review, a research memo, and a scripted call to the city, and even then several approvals could be described only as "likely done, document not in hand."

| # | Problem | CivicPath feature |
|---|---|---|
| P1 | No one can see the whole path; each agency shows only its own piece | One ordered path across all stages and all agencies, with participant tiers (6.6, 7.4) |
| P2 | The applicant does not know what to do next | Answer-first project overview: next actions, blockers, next deadline (7.3) |
| P3 | Hard legal sequencing is invisible until it bites (no plat without water; no sale without public report) | Named gates with reason and citation (3.3, 5.6) |
| P4 | Approvals quietly expire or are scoped to an old program | Lifecycle state and expiration on every approval; expiring-soon alerts (3.5, 5.7) |
| P5 | After a stall, owner change, or program change, nobody knows what still counts | Restart review: re-use / renew / redo / new / N/A determination per item (5.8, 7.6) |
| P6 | Status claims are unsupported; documents are lost | Evidence level (verified / reported / unknown) and source document on every status; records-gap list (5.9) |
| P7 | Departments issue conflicting comments in separate streams | Cross-discipline coordinated issues and one consolidated correction request per cycle (5.4, 7.8) |
| P8 | Review time is unaccountable | Review clock tied to published time frames, pauses on applicant, refund exposure (3.4, 7.10) |
| P9 | Costs are scattered and surprise late | Fees per requirement; paid / due / estimated totals (5.10) |
| P10 | Neighbors learn about projects late and can't follow them | Public project page with hearings, notices, documents, comment (7.11) |
| P11 | Leadership can't measure or answer for the process | Leadership dashboard (7.12) |
| P12 | Staff juggle projects across disconnected systems | Staff work queue across all projects (7.9) |

---

## 5. Data model and status vocabularies

Model the demo data on these objects. The UI should make these relationships visible.

### 5.1 Objects

- **City**: name, departments, published time frames, fee schedule.
- **Participant (agency/department)**: name, tier (City / Partner / Tracked), contact, what it decides.
- **Person**: name, role, participant. Fictional.
- **Project**: name, address, parcel(s), case manager, applicant/owner, program (what is being built), current stage, overall status.
- **Parcel**: parcel number, acreage, legal description status.
- **Program**: a version of what the project intends to build (e.g., "Commercial," "Build-to-rent, 225 units," "For-sale condominium, 225 units"). A project can have several programs over time; exactly one is current.
- **Ownership record**: owner entity, from/to dates.
- **Requirement (approval)**: the central object. One per approval the project needs (e.g., "PAD," "Site plan," "Final plat," "Dust permit"). Fields: ID, title, stage, holder (participant), tier, type (legislative / administrative / ministerial / outside), status, lifecycle, expiration, restart determination, evidence, source document, gates (in/out), soft dependencies, fee, published time frame, clock, conditions, history.
- **Submittal**: a version of the application package for a requirement (R1, R2, R3...), with documents and date.
- **Review**: one discipline's review of one submittal (Engineering on site plan R2), with comments and a recommendation.
- **Comment**: discipline, sheet/location, text, severity, status.
- **Correction request**: the case manager's consolidated set of comments from one review cycle, issued to the applicant once. Has an issue date, a 10-working-day meeting window, a clock pause, and a response due.
- **Response**: the applicant's answer to each comment, tied to a resubmittal.
- **Coordinated issue**: a problem spanning disciplines (e.g., CO-01), with an owner, participating disciplines, and linked comments.
- **Decision**: approve / approve with conditions / deny; decided by; date; reviewed submittal; conditions; expiration.
- **Condition**: a requirement attached to a decision, tracked to satisfaction.
- **Gate**: from requirement A to requirement B, with rule text and citation.
- **Hearing**: body (P&Z / Council), date, agenda item, notice status, outcome.
- **Notice**: type (newspaper / mailed 300 ft / sign), date, proof.
- **Meeting**: pre-application, correction-request meeting, coordination meeting.
- **Fee**: amount, basis (e.g., $10/lot), status (estimated / due / paid / refunded).
- **Document**: title, type, version, author, date, evidence role, linked requirements.
- **Event**: dated activity-log entry.

### 5.2 Requirement status (where it is in its own process)

| Status | Meaning |
|---|---|
| Not started | Nothing submitted |
| Needs determination | The city must decide whether it applies |
| Submitted | Waiting on completeness review (clock: completeness) |
| In review | Substantive review (clock running) |
| Corrections issued | Correction request out; clock paused, waiting on applicant |
| Scheduled for hearing | Legislative item on a P&Z/Council calendar |
| Approved | Decision issued (may carry conditions) |
| Issued / Recorded | Permit issued or document recorded |
| Denied / Withdrawn | Closed without approval |
| Not applicable | Determined not to apply |

### 5.3 Blocked state
Separate from status: a requirement is **Blocked by gate** (hard) or **Waiting on** (soft), with the blocking item named.

### 5.4 Review comment flow (keep v5's chain, add consolidation)
Comment drafted by discipline → included in correction request → applicant response → reviewer verification (accepted / not accepted, against a specific submittal) → discipline recommendation → requirement decision.

### 5.5 Participant tier
**City (required)**, **Partner (by agreement)**, **Tracked (outside agency)**. Tracked items are updated by the applicant uploading the agency's decision and the case manager verifying it.

### 5.6 Gate display
Lock icon + "Requires: [item]" + reason + citation. Unlocks visibly when satisfied.

### 5.7 Lifecycle
**Active** (with "Expires [date]" or "Does not expire") · **Expiring** (within 90 days; amber with days remaining) · **Expired** · **Superseded** · **Scope-limited** (with note of what it covered).

### 5.8 Restart determination
Shown only when a project has a prior program or prior owner. **Re-use** (valid, carries forward) · **Renew** (renew on approved plans) · **Update** (re-submit with revisions) · **Redo** (start over) · **New** (first required by the current program) · **N/A** · **Pending** (city has not decided). Each shows who made the determination and when.

### 5.9 Evidence
**Verified** (decision document on file; link) · **Reported** (indicated by correspondence or a third party; no decision document on file) · **Unknown** (needs confirmation from the holder). Every approval also shows its source document title.

### 5.10 Fees
**Estimated** · **Due** · **Paid** · **Refund owed** (clock missed). All amounts labeled "sample."

---

## 6. Information architecture and navigation (ground-up)

### 6.1 Assessment of v5's navigation

v5 is a single-project workspace with a top tab bar whose tabs change by role: Home/Desk, Roadmap/Requirements, Meetings, Plans/Plan review, Responses, Decisions, Documents, Activity/Record; requirement details open in a side drawer. What works: the answer-first home ("what your review unlocks"), scoped confidentiality, and anchoring comments to plan sheets. What does not work for v6:

1. **There is no level above one project.** A system of record needs a public front door, an applicant's list of projects, a staff queue across all projects, and a city-wide view.
2. **Tabs are organized by object type, not by the user's task.** Work on one approval (the site plan) is split across Roadmap, Plans, Responses, Decisions, and Documents. Users have to reassemble it.
3. **Home and Roadmap duplicate each other**, both listing requirements.
4. **The same content has different names by role** (Home/Desk, Roadmap/Requirements, Plans/Plan review, Activity/Record). Use one set of nouns for everyone and vary the content, not the labels.
5. **The drawer has become the real approval page.** Drawers are for quick peeks; doing the work of an approval (submittals, review, corrections, decision, fees) needs a full page.
6. **The response matrix is project-level**, but it belongs to one review cycle of one approval.
7. **No public or neighbor path, no leadership view, no cross-project work queue.**

### 6.2 Personas in the demo bar ("Viewing as")

Replace v5's five roles with seven personas. Each lands on its own home.

| Persona | Person (fictional) | Lands on |
|---|---|---|
| Resident | (anonymous) | Public home |
| Applicant | Dana Whitfield, Development Manager, Ridgeline Residential LLC | My projects |
| Case manager (Planning) | Alex Morgan, Senior Planner | My work |
| Engineering reviewer | Taylor Chen, Development Engineer | My work |
| Fire reviewer | Casey Rivera, Deputy Fire Marshal | My work |
| Water utility reviewer (partner) | Sam Patel, New Development Coordinator, Cholla Ridge Water Company | My work |
| City leadership | Jordan Ellis, City Manager | Dashboard |

### 6.3 Global structure (sitemap)

```
Public (Resident persona, no sign-in)
├─ Public home: search by address / parcel / project number; map; "Start a project"
├─ Find projects (map + list)
│   └─ Public project page
├─ Hearings & notices (calendar)
├─ Start a project (guided scoping → generated path)
└─ Guides (plain-language explanations of each stage)

Applicant workspace
├─ My projects
└─ Project workspace (see 6.4)

Staff workspace (case manager and reviewers)
├─ My work (queue across all projects)
├─ Projects (search all)
├─ Calendar (meetings, hearings, my deadlines)
└─ Project workspace (see 6.4; scoped to role)

Leadership
├─ Dashboard (city-wide)
├─ Projects (search all; read-only)
└─ Project workspace (read-only, shared-status level)
```

### 6.4 Project workspace (the core page structure)

**Layout:** a persistent **project header** across the top and a **left section rail** on desktop. Replace v5's top tab bar. Reasons: there are more sections than fit as tabs, the header must stay visible as context, and the rail can show counts and alerts per section.

**Project header** (always visible, compact on scroll):
- Project name, address, parcel number, project number
- Current program ("For-sale condominium · 225 units") with a "Program changed" marker if applicable
- **Stage spine**: eight segments (0–7), each showing done / current / upcoming / blocked, clickable to filter the path
- Case manager (name + contact), current overall status, next deadline

**Section rail** (same nouns for every persona; content scoped by role):

1. **Overview**: where it stands, what's next
2. **Path**: every requirement across all eight stages
3. **Approvals**: list of requirements that have an application/decision; each opens its approval page (6.5)
4. **Corrections**: open correction requests and coordinated issues across approvals (applicants see "What you need to fix")
5. **Schedule**: meetings, hearings, deadlines, clocks
6. **Documents**: the project record library with evidence and versions
7. **Fees**: estimated / due / paid / refunds
8. **History**: project timeline (programs, owners, approvals, stalls, restarts) and full activity log
9. **Public page**: preview of what residents see

Reviewers see the same rail; items outside their scope show shared status only, with a lock note ("Detail held by Fire").

### 6.5 Approval page (replaces the drawer as the place where work happens)

Route: Project → Approvals → [Approval]. Keep a drawer only for quick peeks from the Path table, with an "Open approval" button.

**Approval header:** ID and title · stage · holder with tier badge · status · blocked/gate state · review clock · lifecycle and expiration · restart determination · evidence.

**Approval tabs:**
1. **Summary**: what this approval is (plain language), what it unlocks, gates in and out, submittal requirements checklist, conditions, related approvals.
2. **Submittals**: versions (R1, R2, R3) with documents and dates; current vs superseded.
3. **Review**: the plan viewer (v5's sheet viewer and pins) with comments by discipline, filterable by discipline and status.
4. **Corrections**: correction requests for this approval; the response matrix for each cycle (v5's matrix, moved here).
5. **Decision**: decision record, conditions and their satisfaction, expiration; superseded decisions.
6. **Fees**: line items.
7. **Record**: activity for this approval.

Tracked (outside-agency) approvals use a simpler page: Summary, Agency decision (uploaded document + verification), Record.

### 6.6 Where outside agencies live
Outside-agency requirements sit **in the Path in sequence**, with a Partner or Tracked badge and the gates that connect them. Remove v5's separate "Also needed before the building permit, not in CivicPath" list.

### 6.7 Navigation rules
- Breadcrumb on every page below the workspace home: Projects › Saguaro Commons › Approvals › Site plan.
- Every requirement ID is a link everywhere it appears.
- Counts on rail items show only actionable items for the current persona.
- Deep links from notifications go to the exact approval tab and comment.
- "Viewing as" switches persona and lands on that persona's home; preserve the current project if the persona can see it.

### 6.8 Responsive behavior
- **≥1280 px:** rail 232 px; content max width 1120 px; approval Review tab uses three panes (sheet list 200 px · sheet canvas fluid · comment panel 380 px).
- **768–1279 px:** rail collapses to icons with labels on hover; Review tab becomes two panes (canvas · comments), sheet list in a dropdown.
- **<768 px:** project header collapses to name + stage spine; rail becomes a "Sections" button opening a bottom sheet; Review shows the comment list with sheet thumbnails, tap to open the sheet full-screen. Public pages are designed mobile-first.

---

## 7. Screen specifications

ASCII layouts are structural guides, not visual designs.

### 7.1 Public home (Resident)

```
[City of Cholla Ridge · CivicPath]                         [Sign in]
 Find a project or start your own
 [ Search address, parcel, or project number ............ ] [Search]
 [ Start a project → ]   [ Hearings & notices → ]   [ How approval works → ]

 Projects near you (map)                 | Upcoming public hearings
 ● pins by stage                         | Oct 14 · P&Z · Saguaro Commons prelim. plat
                                          | Oct 21 · Council · ...
 How development approval works: 8-stage strip with one line each
```

### 7.2 Start a project (guided scoping)
Steps: address → what you want to build (type, units, for-sale or rental, acreage) → existing approvals you know of → **generated path**: the requirements that apply, in order, with holders, sample fees, published time frames, and gates, plus "Request a pre-application meeting." Label the result "Preliminary; confirmed at pre-application."

### 7.3 Project overview (Applicant)

```
Where Saguaro Commons stands
┌ Now ──────────────────────────────────────────────┐
│ Stage 3 · Site plan · Corrections issued Oct 2    │
│ Clock paused (waiting on you) · Meeting window    │
│ closes Oct 16                                     │
└───────────────────────────────────────────────────┘
Your next actions (3)                 Blocking you (2)
1 Respond to site plan correction     🔒 Final plat ← Assured water supply
  request (CO-01 + 4 comments)        🔒 Public report ← Plat recorded
2 Submit water commitment request
3 Order title date-down               Expiring soon (1)
                                      Survey certification · 41 days
Restart review: 4 re-use · 3 renew · 3 update · 6 redo · 12 new · 1 N/A · 4 pending
Records gaps: 7 reported · 3 unknown → [Review gaps]
Fees: $1,950 paid · $7,640 estimated · 2 quotes pending (sample)
Upcoming: Oct 9 correction meeting · Oct 14 P&Z (none for this project) ...
[Ask about this project] (simulated)
```

### 7.4 Path (all requirements)
Three switchable views, same data:
- **Timeline** (default for applicant): eight stage columns left to right; requirement cards stacked; gate arrows between cards; tier badge on each card.
- **Table** (default for staff): columns: Stage · ID · Requirement · Held by + tier · Status · Blocked/Waiting · Clock · Lifecycle/expiry · Restart determination · Evidence · Fee · Target. Filters for each column. Saved filters: "Blocking me," "Expiring 90 days," "Records gaps," "Outside agencies."
- **By holder**: grouped by participant, for coordination calls.

### 7.5 Approval page
See 6.5. The Summary tab leads with a plain-language box: "What this is · Why it's required · What it unlocks · What you need to submit."

### 7.6 Restart review (new; reached from Overview and History)
Purpose: answer "what carries forward, what renews, what must be redone, and what is new" for a project with prior approvals.

```
Restart review · Program changed: Build-to-rent → For-sale condominium (Aug 2026)
Owner changed: Hollister Ridge LLC → Ridgeline Residential LLC (Jul 2026)
[Re-use 4] [Renew 3] [Update 3] [Redo 6] [New 12] [N/A 1] [Pending 4]
Table: Requirement · Prior approval (date, program) · Lifecycle · Evidence ·
       Determination · By / date · Note
```
The case manager makes determinations at the restart pre-application meeting. Each determination is a recorded decision.

### 7.7 History
A horizontal **project timeline** (years) with lanes: Programs · Ownership · Approvals · Stalls/restarts. Below it, the full activity log, filterable.

### 7.8 Corrections (project level) and correction request
- Project-level list: open correction requests by approval, coordinated issues, and their due dates.
- **Correction request page:** issued by the case manager; contains every comment from every discipline for that cycle, grouped by discipline and sheet; shows the clock pause, the 10-working-day meeting window with a "Schedule correction meeting" button, the response due date, and "Submit coordinated response" (one resubmittal package answers all comments).
- **Staff side:** disciplines draft comments; the case manager sees a "Draft correction request" assembling them, can flag conflicts between disciplines (creating a coordinated issue like CO-01), and issues the request once.

### 7.9 My work (staff queue)

```
My work · Taylor Chen · Engineering          [All projects ▾] [Due ▾]
Due today (2) · This week (5) · Clock at risk (1) · Waiting on applicant (7)
Table: Project · Approval · Submittal · Task (review / verify response /
       draft comments) · Clock (days left of published) · Coordinated issues
```
Clicking a row opens that approval's Review tab at the right submittal.

### 7.10 Review clock component
Bar showing completeness phase and substantive phase against the published time frame; segments where the clock was paused (waiting on applicant) shown hatched; days used / days allowed; "Refund exposure if missed: $X (sample)." Legislative items show the next hearing date instead.

### 7.11 Public project page (Resident)
Project summary in plain language, map placeholder, what's proposed (units, type, acreage), current stage on the stage spine, upcoming hearings (body, date, time, location, how to attend, how to comment), notices issued (with dates), public documents (applications, staff reports, decisions), decisions to date, and "Get updates." No internal comments, no draft documents.

### 7.12 Leadership dashboard (City Manager)

```
Development activity · City of Cholla Ridge (sample data)
[Active projects 42] [Approvals in review 61] [Median days to site plan 74]
[Within published time frames 88%] [Refund exposure $6,450] [Stalled 5]
Charts: Median days per stage vs published · Review cycles per approval
        Approvals expiring in 90 days · Workload by department
        Partner/outside agency turnaround · Projects by stage (map)
Table: Projects past time frame / stalled, with reason and owner
```
Every number links to the list behind it.

---

## 8. Seed data

### 8.1 City
- **City of Cholla Ridge, Arizona** (fictional). Population about 70,000, fast-growing, within an Active Management Area. Council-manager government.
- **Mesquite County** (fictional): Air Quality District, Recorder.
- City divisions: Development Services (Planning & Zoning, Building Safety), Public Works / Engineering, Fire Department, Wastewater Utility, City Clerk.
- Partner: **Cholla Ridge Water Company** (fictional private utility; designated provider with a 100-year assured water supply designation as of March 2026).
- Tracked: ADWR, CAGRD, ADEQ, ADOT, ADRE (real agency names; shown for illustration).
- Demo "today": **October 5, 2026**.

### 8.2 Flagship project: Saguaro Commons (restart)
- **Project number:** CR-2026-031 (restart of CR-2021-117)
- **Address:** 1900 N. Ridge Parkway, Cholla Ridge (fictional). Parcel 501-22-004C, 22.1 acres, residential portion of a larger site whose commercial corner (a powersports dealership) was approved in 2020 and built.
- **Applicant / owner:** Ridgeline Residential LLC (since July 2026). Prior owners: Hollister Ridge LLC (2021–2026, the BTR developer's entity), and before that the original commercial landowner.
- **Programs:** (1) Commercial business park, 2015–2020 · (2) Build-to-rent, 225 attached rental homes, 2021–2023 · (3) **For-sale condominium, 225 units, current (Aug 2026)**.
- **History lane events:**
  - Nov 2015: traffic study (commercial program)
  - Mar 2020: commercial corner site plan approved; dealership built
  - Jul 2021: residential parcel split off and sold
  - Feb 2022: PAD adopted, Ord. 2022-14, 225 units, 10.6 du/ac
  - Mar–Apr 2022: environmental restriction (pesticide contamination from a former airfield) removed of record after remediation
  - Jun 2022: land deeded to development entity
  - 2022–2023: residential site plan approved (per correspondence); civil plans accepted; site permits pulled; building plan review nearly complete
  - Jul 2023: financing fails; project stalls
  - Jul 2026: sold to Ridgeline Residential LLC
  - Aug 2026: program changed to for-sale condominium; restart pre-application held Sep 17, 2026
  - Oct 2, 2026: site plan amendment correction request issued (cycle 1)

**Requirements** (ID · title · stage · holder/tier · status · lifecycle · determination · evidence · fee/notes):

| ID | Requirement | Stg | Holder (tier) | Status | Lifecycle | Restart | Evidence | Notes |
|---|---|---|---|---|---|---|---|---|
| TTL-01 | Title commitment date-down | 0 | Title company (applicant team) | In progress | 2022 commitment superseded | Update | Verified (Oct 2022 commitment) | Must coordinate recorded cross-access/drainage covenants with condo declaration |
| SRV-02 | ALTA survey & legal description | 0 | Surveyor (applicant team) | Approved | Expiring (certification 41 days) | Re-use | Verified | 2021 legal description, 22.1 ac |
| ENV-03 | Environmental restriction release | 0 | ADEQ (tracked) | Recorded | Does not expire | Re-use | Verified (recorded amendment + ADEQ letter) | Disclose in public report |
| PRE-04 | Restart pre-application meeting | 0 | Planning (city) | Approved (held Sep 17) | — | New | Verified (meeting notes) | Set determinations below |
| WTR-05 | Water will-serve | 0 | Cholla Ridge Water (partner) | Submitted | — | Redo | Verified | Prior will-serve was commercial-scope |
| ZON-06 | PAD (Ord. 2022-14) | 1 | Council (city) | Approved | Does not expire | Re-use | Verified (ordinance) | Open question: does PAD text limit to rentals? |
| ZON-07 | PAD amendment | 1 | Planning → P&Z → Council (city) | Needs determination | — | Pending | — | Required only if PAD text limits tenure or units/product change |
| CIT-08 | Citizen review & hearing notice | 1 | Applicant / Planning (city) | Not applicable (unless ZON-07) | — | N/A | — | 300-ft letters, newspaper, sign ≥15 days |
| P207-09 | Prop. 207 waiver | 1 | Owner / City (city) | Recorded | Does not expire | Re-use | Verified (2022 waiver) | New waiver only if PAD amended |
| WTR-10 | Assured water supply: designated-provider commitment letter | 2 | Cholla Ridge Water (partner) / ADWR (tracked) | Not started | — | New | — | ~45 business days; **gates PLT-17** |
| CAG-11 | CAGRD member-land activation | 2 | CAGRD (tracked) | Not started | — | New | Reported (inclusion noted in title) | Per-unit fee; quote with WTR-10 |
| WTR-12 | Water line-extension agreement | 2 | Cholla Ridge Water (partner) | Not started | Expired; scope-limited (commercial corner, ~$433,000) | Redo | Verified (2021 agreement) | New agreement sized for 225 units |
| SPR-13 | Residential site plan (amendment for condo program) | 3 | Planning (city), with Engineering, Fire, Wastewater, Water | **Corrections issued** (R2, Oct 2) | Prior approval: Reported, expiry unknown | Update | Reported (2023 correspondence; approval letter not on file) | Home of CO-01; clock paused |
| TIA-14 | Traffic impact analysis | 3 | Engineering (city) | In review | Prior: scope-limited (2015 commercial) | Redo | Verified (2015 study) | Sample fee $600 |
| DRN-15 | Drainage report update | 3 | Engineering (city) | In review | Prior: preliminary only | Update | Verified (prelim. report) | Sample fee $300 |
| PLT-16 | Preliminary plat (condominium) | 4 | P&Z (city) | Not started | — | New | — | Sample fee $1,800 + $10/lot |
| PLT-17 | Final plat | 4 | Council (city) | Blocked by gate (WTR-10) | — | New | — | Sample fee $840 + $10/lot |
| CND-18 | Condominium plat & declaration | 4 | Applicant counsel / Recorder (partner) | Not started | — | New | — | Owners' association required before any sale |
| REC-19 | Record plat & declaration | 4 | Mesquite County Recorder (partner) | Blocked by gate (PLT-17, ASR-22) | — | New | — | |
| CIV-20 | Improvement plans | 5 | Engineering (city) | Not started | Prior: Reported (accepted 2023) | Renew | Reported | Ask whether 2023 stamped set can be re-used |
| GEO-21 | Geotechnical report (residential scope) | 5 | Applicant consultant | Needs determination | — | Pending | Unknown (2018 report covers commercial only) | |
| ASR-22 | Improvement assurances | 5 | Engineering / City Attorney (city) | Not started | — | New | — | Gates REC-19 |
| GRD-23 | Grading permit | 5 | Building Safety (city) | Expired | Expired (180 days, no inspection) | Renew | Reported (2023 status email) | |
| ATC-24 | ADEQ approval to construct (water/sewer) | 5 | ADEQ (tracked) | Expired | Expired; scope-limited | Redo | Verified (2021 letter) | |
| SWP-25 | Construction stormwater (SWPPP + NOI) | 5 | ADEQ (tracked) | Not started | Prior coverage expired | Redo | Unknown | Gate: before ground disturbance |
| DST-26 | Dust control permit | 5 | Mesquite County Air Quality (partner) | Not started | Prior expired | Redo | Unknown | Gate: before ground disturbance |
| ROW-27 | ADOT encroachment permit | 5 | ADOT (tracked) | Needs determination | Unknown | Pending | Reported (in process 2023) | Water main crosses state highway ROW |
| BLD-28 | Building permits (residential buildings) | 6 | Building Safety (city) | Expired | Expired | Renew | Reported (pulled 2023) | Current code cycle applies |
| IMP-29 | Development / impact fees | 6 | Building Safety (city) | Needs determination | — | Pending | Reported (paid 2023) | Credit for prior payment? |
| INS-30 | Inspections | 6 | Building Safety (city) | Not started | — | New | — | |
| COO-31 | Certificate of occupancy | 6 | Building Safety (city) | Not started | — | New | — | |
| SAL-32 | ADRE public report | 7 | ADRE (tracked) | Blocked by gate (REC-19) | — | New | — | Gate: before any sale; sample fee $500 |
| PDR-33 | Protected development right plan (optional) | 4 | Council (city) | Not started | — | New (optional) | — | Locks standards 3 yrs, extendable to 5 |

Adjust counts in 7.3 to match whatever the final seed data produces.

**CO-01 (coordinated issue, in SPR-13 cycle 1):** The condo program reconfigured the east access drive. Engineering comment E-03 (sheet C-03): the revised drive overlaps the detention basin; storage volume falls short. Fire comment F-02 (sheet SP-01): the revised drive does not meet the turning radius for the aerial apparatus. Planning flags the two as one coordinated issue owned by the applicant's civil engineer, with Engineering and Fire participating. Water utility does not see it. Keep v5's mechanics: one coordinated revision (R3) answers both; each reviewer verifies against R3; each discipline records its recommendation; Planning records the site plan decision.

**Other SPR-13 comments in the same correction request:** Planning P-01 (parking count must follow product type; for-sale units use the same ratio), Planning P-04 (show owners' association common-area tracts), Wastewater W-02 (confirm sewer connection point capacity for 225 units). Keep the set small but enough to show consolidation.

**Fees (sample):** paid in 2022–2023 under the prior program (PAD, site plan, permits) shown as history; current: site plan amendment $1,050 paid; TIA $600 paid; drainage report $300 paid; preliminary plat $4,050 estimated; final plat $3,090 estimated; ADRE $500 estimated; CAGRD per-unit fee "quote pending"; water line extension "estimate pending (prior commercial-only agreement ~$433,000)."

### 8.3 Second project: Ironwood Pad (clean, new)
- CR-2026-044 · 1.9-acre retail pad · new build, no history · applicant: Ironwood Retail Partners (fictional).
- Moves cleanly: Stage 0 done; zoning already in place (N/A); site plan approved Sep 2026 within time frame; building permit **In review**, day 14 of 20 substantive working days. Shows the clock running, no restart review, and a normal path.

### 8.4 City-wide sample data (dashboard and queue)
About 40 active projects across stages; 5 stalled; 3 past published time frame; refund exposure ~$6,450; 7 approvals expiring within 90 days. Taylor Chen's queue: 9 items across 6 projects, one at risk.

### 8.5 Public hearing calendar (sample)
Oct 14 P&Z (two unrelated projects), Oct 21 Council (one), Nov 4 P&Z (Saguaro Commons preliminary plat, tentative).

---

## 9. Guided tour script

1. **Resident:** Public home → search "Saguaro" → public project page (stage, hearings, documents). Point: the public can see it.
2. **Applicant:** My projects → Saguaro Commons overview. Point: next actions, blockers, deadlines on one screen.
3. **History → Restart review.** Point: a stalled project's approvals sorted into re-use / renew / update / redo / new, with evidence. "This used to take an attorney's file review."
4. **Path (timeline):** follow the water gate: WTR-10 locks PLT-17, which locks REC-19, which locks SAL-32. Point: legal sequencing is visible.
5. **Corrections → SPR-13 correction request:** one consolidated request, clock paused, 10-day meeting window. Open CO-01.
6. **Switch to Engineering:** My work queue → SPR-13 Review tab → E-03 on sheet C-03.
7. **Applicant submits coordinated revision R3** → Engineering and Fire verify against R3 → Planning records the site plan decision. Clock shows resumed and completed within the time frame.
8. **Switch to City Manager:** dashboard → time frames, refund exposure, stalled projects → click into Saguaro Commons.

---

## 10. Keep / change / cut from v5

**Keep:** visual system; demo bar; reset; tour mechanics; plan sheet viewer and pins; revision handling and "superseded revision" warning; comment → response → verification → decision chain; CO-01 mechanics; decision register content; meeting scheduler (format, staff calendars, agenda); simulated "Ask about this project" panel; disclaimers.

**Change:**
- Single-project tabs → global structure + project header + left rail + approval pages (section 6)
- Role-specific tab names → one set of nouns for everyone
- Drawer as the work surface → approval page (drawer only for quick peek)
- Project-level response matrix → per-approval, per-cycle, inside the correction request
- Five stages → eight stages (section 3.2)
- Outside agencies in a side list → in the path with tier badges and gates
- Separate comments per discipline → consolidated correction request per cycle
- Roles → seven personas (6.2)
- Pinal County setting → fictional City of Cholla Ridge, fictional county

**Cut:** all Pinal County copy, addresses, phone numbers, staff, source links, and portal references; the county time-frame citation (A.R.S. § 11-1605, which applies to counties); the "Also needed before the building permit, not in CivicPath" list.

---

## 11. Content, tone, and guardrails

- **Plain language first.** Every requirement has a one-line plain description ("A map that legally divides the land into condo units") before any technical detail. Technical terms get tooltips from the glossary.
- **Answer first.** Every page opens with the answer to the user's main question for that page (where it stands, what's next, what's blocking).
- **Show the proof.** Any status claim shows its evidence level and source.
- **Statutes** appear as short citations in gate and help text, never as the lead.
- **Fictional:** the city, county, utility, companies, people, addresses, parcel numbers, ordinance numbers, and all project data are fictional. No real city's name, seal, branding, staff, or addresses. Real state agencies may appear as tracked agencies; never imply they use or endorse CivicPath.
- **Labels:** sample fees, sample time frames, and sample dashboard data are labeled "sample." Keep the disclaimers: "Illustrative workflow. Not a legal or permitting determination. Not affiliated with any government."
- **Accessibility:** keep v5's standard (focus states, aria labels, color is never the only signal; every status chip has text).

---

## 12. Acceptance checklist

Before calling v6 done, confirm each:

- [ ] Seven personas in "Viewing as," each landing on its own home
- [ ] Public home, public project page, and hearings calendar exist and work on mobile
- [ ] Applicant "My projects" lists both seed projects
- [ ] Project header with stage spine on every project page; left rail with the nine sections
- [ ] Same section names for every persona
- [ ] Path has timeline, table, and by-holder views with the listed filters
- [ ] Every requirement shows holder + tier badge, status, lifecycle, evidence; restart determination on Saguaro Commons
- [ ] Gates render as named locks with reason and citation; the water → final plat → recording → public report chain is visible and unlocks in sequence when satisfied
- [ ] Approval page with Summary, Submittals, Review, Corrections, Decision, Fees, Record; drawer used only as a peek
- [ ] Correction request consolidates all disciplines' comments for one cycle, pauses the clock, shows the 10-working-day meeting window, and takes one coordinated response
- [ ] CO-01 works end to end as in v5, inside SPR-13
- [ ] Review clock shows completeness and substantive phases, paused segments, and refund exposure; legislative items show hearing dates instead
- [ ] Restart review page with determination counts and table
- [ ] History timeline with program, ownership, approval, and stall lanes
- [ ] Fees page with estimated / due / paid totals, labeled sample
- [ ] Staff "My work" queue across projects
- [ ] Leadership dashboard with the listed metrics, each linking to its list
- [ ] No Pinal County or other real-local-government copy remains; all local entities fictional
- [ ] Tour runs the eight steps in section 9
