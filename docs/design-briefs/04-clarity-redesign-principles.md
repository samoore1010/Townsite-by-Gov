# CivicPath: Clarity Redesign from First Principles

**For:** Claude Design. You will review the current build and implement this redesign.
**How to use this document:** Sections 1–4 explain what the product is for and the model of the work it represents. Section 5 derives the design principles from that model. Section 6 gives you a review method to apply to every screen before you change anything. Section 7 works the method through the current screens so you can calibrate. Section 8 states what the redesigned core screens must do. Section 9 is the test.

Do not treat this as a list of cosmetic rules. When a situation is not covered here, decide it by going back to the purpose (section 1) and the model (section 3).

**Unchanged:** the v6.1 corrections stay in force: what the system can know, the visibility levels, the legal mechanics, the case manager workflows, and the sample-data registry. This redesign changes how that substance is presented, not what is true.

---

## 1. Purpose

CivicPath exists to give everyone involved in a development project the same trustworthy answer to one question:

> **Where does this project stand, and what has to happen next for it to move forward?**

Its value is reducing two costs that dominate permitting today: **uncertainty** (people do not know where things stand or what is required) and **coordination** (people do not know who has the next move). Every element on every screen should reduce one of those costs for the person looking at it. An element that does neither is noise, however well designed.

The current build fails this test not because its parts are wrong but because it presents everything it knows at once. Twelve modules on the Overview, each individually reasonable, together make it impossible to find the answer. The redesign is mostly subtraction and ordering.

---

## 2. Who uses it, and the one question each brings

| Person | How often | The question they arrive with | What success looks like |
|---|---|---|---|
| **Resident / neighbor** | Rarely; once or twice per project | "What is being built here, is it decided, and can I have a say?" | Understands the proposal and the next public hearing in under a minute, with no permitting vocabulary |
| **Applicant** (owner, developer, consultant) | Often during active periods | "Is anything waiting on me, what is the city doing, and when will I hear?" | Knows instantly whether they must act, and what is blocking progress |
| **Reviewer** (engineer, fire, utility) | Daily | "What is on my desk and what is due?" | Opens the exact thing to review in one click |
| **Case manager** (planner) | Daily | "What is outstanding across disciplines, and what must I issue or decide?" | Sees every open thread on their projects and can act on it |
| **Leadership** (city manager, council) | Periodically | "Is the process working, and where are the problems?" | Sees performance against published time frames and the exceptions that need attention |

Two consequences follow:

- **Residents and leadership are occasional users.** They need maximum plainness and no learning curve.
- **Staff and applicants are frequent users.** They need speed and a reliable "what is waiting on me," not decoration.

No single screen should try to serve everyone's question at once. Each persona's home answers that persona's question. Shared pages (the project page) put the shared answer first and let each persona go deeper.

---

## 3. The model of the work (what the interface must teach)

Underneath all the detail, a development project is simple:

> A project moves forward through **decisions**. Each decision is **made by someone**, **needs something** submitted to it, and sometimes **cannot be made until another decision is made first**.

At any moment, every decision on a project is in exactly one of four conditions:

| Condition | Meaning | The user's natural question |
|---|---|---|
| **Done** | Decided, or issued | "What has already been settled?" |
| **Now** | Someone is actively working on it, and someone in particular holds it | "Who has it, and when will it be done?" |
| **Next** | Nothing prevents it from starting | "What can start, and who should start it?" |
| **Later** | Something else must happen first | "What is it waiting for?" |

And one attribute matters more than any other for an open decision: **whose move it is** (the applicant's, the city's, or an outside party's). Permitting staff call this "ball in court." Most frustration in permitting comes from not knowing whose move it is.

**This is the organizing model of the entire interface.** Done / Now / Next / Later, plus whose move it is, answers the core question (where it stands, what happens next) without requiring the user to learn tiers, gates, record sources, or stage numbers.

### 3.1 The journey versus the work

The eight stages (Pre-application through Sale) are a **story** of the journey: useful for orientation ("roughly how far along is this?") and for teaching residents how development works. But the actual work is a **network**: zoning, water, site plan, and civil items move in parallel and unlock each other out of stage order.

The current progress bar tries to make the story carry the work. Stages show "Done, In progress, Not started, Done, Not started, In progress" side by side, which reads as incoherent. **Resolve it by giving each its own job:**

- **Stages = orientation only.** One compact indicator: how far along the journey the project is (the furthest stage with active work), named once.
- **Done / Now / Next / Later = the work.** This is where parallel activity, blockers, and owners live.

Never ask the stage indicator to show parallel status.

### 3.2 Internal concepts stay internal unless they change an action

The data model has necessary internal concepts: participant tier, record source, gate, staff assessment, lifecycle, visibility level. These keep the system correct. They are **not** things a user should have to read and decode. Surface a concept **only when it changes what the user does or believes**, and then in plain consequence-language. For example:

- Tier "Tracked" becomes: "Decided by ADEQ (a state agency). Upload their approval here when you receive it."
- Gate becomes: "Can't start until the water commitment is issued."
- Record source "City record · migrated" is not shown at all unless someone is checking provenance; then it sits in Details.

---

## 4. The constraints of this audience

- **Government context means trust is the product.** Calm, consistent, plain, and accurate beats clever. A resident or council member who senses noise, gimmicks, or uncertainty will distrust the information itself.
- **Many users are not permitting experts and are not frequent software users.** Assume no domain vocabulary and modest patience.
- **Staff are experts but overloaded.** For them, speed and predictability matter more than richness.
- **Accessibility is a legal and ethical baseline,** not an enhancement: plain language, sufficient contrast, status never conveyed by color alone, keyboard and screen-reader support, and layouts that work on a phone.

---

## 5. Design principles (each derived from sections 1–4)

Each principle has a reason and a test. Use the tests during review.

### P1. Answer first
**Reason:** Users arrive with one question (section 2). **Rule:** Each screen has one primary question; its answer is the first and visually strongest thing on the screen. Everything else is ordered by how often this persona needs it. **Test:** In a five-second look, can an unfamiliar person say where the project stands and what happens next?

### P2. Always say whose move it is
**Reason:** Coordination cost (section 1) and "ball in court" (section 3). **Rule:** Every open item shows who must act and, when one exists, by when. Separate "Your turn" from "Waiting on others." **Test:** For any open item on screen, can the user say who holds it?

### P3. Disclose by frequency and audience
**Reason:** Occasional versus frequent users (section 2). **Rule:** Sort every piece of information into one of four places:
1. **Surface:** needed by most users of this persona most of the time
2. **One click:** needed sometimes (a linked page, a tab, an expandable row)
3. **Details:** rarely needed or expert-only (a collapsed "Details" area)
4. **Not shown to this persona**

**Test:** Is anything on the surface that most visitors of this persona would not need on most visits?

### P4. Each fact has one home
**Reason:** Repetition multiplies reading without adding meaning. **Rule:** Every fact (status, deadline, fee, blocker) has one canonical place. Elsewhere it appears only as a short reference or link. Never state the same thing in a header, a hero, a list, and a sidebar. **Test:** Does any fact appear twice on one screen?

### P5. Visual weight follows importance and urgency
**Reason:** Attention is finite. Emphasis means something only if it is rare. **Rule:**
- At most **one** emphasized element per screen region, and one primary button per screen.
- **Color carries meaning only:** four status treatments (Done, Now, Next, Later), plus one accent reserved for "your turn." No decorative color, no color-coded badge families.
- At most one label or badge per item.
- **Type does the hierarchy:** a small, consistent scale in sentence case. Monospace only for IDs, dates, and amounts in metadata. No uppercase letter-spaced labels as a default style.

**Test:** Squint at the screen. Does exactly one thing stand out, and is it the answer?

### P6. The user's language, not the system's
**Reason:** Sections 3.2 and 4. **Rule:** Lead with plain names ("Preliminary plat"), not IDs ("PLT-16"). Translate internal concepts into consequences. IDs appear only in small metadata and staff tables. **Test:** Could a resident read the screen without a glossary?

### P7. Show nothing that is empty
**Reason:** Empty states consume attention and suggest something is missing. **Rule:** Hide empty fields, empty modules, dashes, "No source document," "Nothing in this filter," and tabs with no content. If a whole section is empty for this project, it does not appear. **Test:** Is any visible element saying "nothing"?

### P8. Earned features only
**Reason:** Section 1, and your instruction that nothing is added for its own sake. **Rule:** An element or feature earns a place only if it does one of these:
- (a) answers this persona's primary question
- (b) is necessary to complete a task the persona came to do
- (c) is required for legal accuracy or trust (a disclaimer, a notice, a visibility label)

Alternate views, layer toggles, extra filters, comparison modes, and conversational panels that do none of these are removed, not hidden. **Test:** For each element, can you name which of (a), (b), or (c) it serves?

### P9. Consistency over novelty
**Reason:** Trust (section 4), and frequent users rely on predictability. **Rule:** The same kind of thing looks and behaves the same everywhere: one item row pattern, one status vocabulary, one page structure for every decision. No bespoke widget for a single case. **Test:** Does any component appear in only one place with its own visual language?

---

## 6. Review method: apply this before changing anything

You will be reviewing and implementing. Do the review explicitly, and keep the result as a working record.

**Step 1: State the screen's purpose.** For each screen and each persona that sees it, write the one primary question (P1).

**Step 2: Inventory every element.** List every block, label, badge, button, chart, and control on the screen.

**Step 3: Classify each element** with this table:

| Element | Which question it answers (Where / What's next / Who / What's required / Task / Legal-trust / None) | How often this persona needs it (Most visits / Sometimes / Rarely / Never) | Already stated elsewhere on screen? | Decision |
|---|---|---|---|---|

Decision rules:
- None → **Remove** (P8)
- Already stated → **Remove or make it a link to the canonical home** (P4)
- Most visits → **Surface** (P3)
- Sometimes → **One click** (P3)
- Rarely → **Details** (P3)
- Never for this persona → **Not shown** (P3)
- Empty for this project → **Not shown** (P7)

**Step 4: Order what remains on the surface** by the persona's question: the answer first, then whose move it is, then what is required, then orientation.

**Step 5: Apply the visual rules** (P5, P6, P9) to what remains.

**Step 6: Test** with section 9 before moving on.

Do this for: Project overview (applicant, staff, resident versions), Steps (formerly Path), Decision page (formerly approval page), Staff "My work," Resident public project page, Leadership dashboard.

---

## 7. Calibration: the method applied to the current screens

These are worked examples so your classifications match intent. They are not the whole job.

### 7.1 Applicant Overview (current build)

| Element | Answers | Frequency | Duplicate? | Decision |
|---|---|---|---|---|
| Header ID line (CR number, legacy SP number, parcel) | None for applicant on most visits | Rarely | — | Details |
| Header status "Site plan approved · plat next" | Where | Most | Repeated in hero | Keep here as the one status sentence; remove elsewhere |
| Case manager name and contact | Who (city contact) | Sometimes | — | Keep, small, secondary column |
| "Next deadline: — / Decided within the published time frame" | None (empty) | — | — | Not shown (P7) |
| Eight-segment stage bar with labels and state under every segment | Where (orientation) | Most, as orientation only | Conflicts with work lists | Replace with compact journey indicator naming only the current stage (section 3.1) |
| Navy hero "Next: preliminary plat and the water commitment" | What's next | Most | Duplicates "Your next actions" | Merge into one "Your turn" block |
| Map with five-layer legend panel and scroll arrows | Where (identity of the land) | Sometimes | — | Keep a small static map as identity; remove the layer panel from Overview (P8) |
| "Your next actions" | What's next / Who | Most | — | Becomes the "Your turn" block |
| Team checklist (private) | Task (applicant's own) | Sometimes | — | One-line link with count |
| "Blocked by gates" (3) | What's next (why later) | Sometimes | Overlaps with next actions | Becomes "Later" items with "Can't start until …" |
| "Expiring or expired · 0 … no active approval expires" | None (empty) | — | — | Not shown (P7); appears only when something expires |
| Prior-approvals chip row (7 colored chips) | What's required (restart context) | Rarely after the restart review | — | One click (its own page), linked from History |
| "Outside decisions not on file: 2" | What's required / Task | Sometimes | — | Show as a "Your turn" item ("Upload ADOT approval") only when it actually needs the applicant |
| Fees block | What's required ($) | Sometimes | Fees page exists | One click (Fees page) |
| Upcoming list | What's next (dates) | Most | Partly duplicates actions | Merge dates into the Now / Next items |
| "Ask about this project · simulated" | None of (a)–(c) | — | — | Remove (P8) |

**Result:** the Overview surface becomes five things: status sentence, journey indicator, **Your turn**, **Waiting on others**, **Coming up later**, with a small map and the contact in a secondary column.

### 7.2 Decision page (PLT-16, not started)

- Four metadata columns (Lifecycle "—", Staff assessment, Record source "No source document", Fee): three are empty or rarely needed, so they move to Details or are hidden (P3, P7). The fee belongs in "What you'll need."
- Seven tabs on a decision with no submittal: show only the tabs with content (P7). For a not-started decision, there are no tabs, just one page.
- "Gates out · Nothing waits on this approval": empty, so hidden (P7).
- The navy "What this is / Why it's required / What it unlocks" block is good content but is styled as the loudest thing on the page. The loudest thing should be the status and the action ("Not started. You can file now. [Start application]"); the explanation is supporting text (P1, P5).
- "Satisfied" gate rendered as a large green panel: a satisfied prerequisite is Done. It needs one line, not a panel (P5).

### 7.3 Path (current)

- Horizontal stage columns with a scrollbar treat the work as a linear left-to-right journey, which it is not (section 3.1), and they hide most of the content off-screen.
- Six filter chips plus three view modes: P8 (exploration). Keep one control at most.
- "Nothing in this filter" boxes: P7.
- The separate "Hard gates" panel restates information already on the blocked items: P4.
- **Result:** one vertical list organized by Done / Now / Next / Later (section 3), each item showing plain name, who holds it, and either an expected date (Now), "can start" (Next), or "waiting for X" (Later). Stage appears as a quiet group label or secondary text for orientation.

---

## 8. What the redesigned core screens must do

These are outcomes, derived from the model. Choose the specific layout using your design judgment, the principles, and the existing visual system.

### 8.1 Project overview (shared structure; content differs by persona)
- **One status sentence** in plain language, then a **compact journey indicator** naming the current stage only.
- **Your turn** (applicant view only; omitted if empty): what the applicant must do, the due date if any, and one primary button.
- **Waiting on others:** what is Now, who holds it, when to expect it.
- **Coming up later:** what is Next or Later, with "can start" or "waiting for …" in one line each. Collapsed beyond the first few items.
- **Small static map** as the identity of the land.
- **Contact** for the case manager.
- Staff see the same structure with their own items emphasized. Residents see the public version (8.5).

### 8.2 Steps (formerly Path)
The complete Done / Now / Next / Later list for the project, every item following the same row pattern. Done is collapsed by default. This is the only place the full list lives.

### 8.3 Decision page (one structure for every decision)
In order:
1. What it is, in one sentence
2. Status and whose move it is, with the one primary action
3. What is needed (submittal checklist and fee)
4. What must happen first (only if not satisfied)
5. What happens after
6. Review activity (submittals, comments, corrections, decision), shown only once it exists
7. Details (ID, legal reference, record source, staff view, time frame), collapsed

### 8.4 Staff "My work"
A single list of items whose move is this person's, sorted by due date, each opening the exact item and step. Items waiting on others are a secondary, collapsed group. This is the staff equivalent of "Your turn."

### 8.5 Resident project page
What is proposed, where, its status in one sentence, whether a decision is still open, the next public hearing and how to participate, and decisions made. Nothing internal, no IDs, no stage numbers beyond the journey indicator.

### 8.6 Leadership dashboard
Answers "is the process working, and where are the problems": a small number of measures against published time frames, then the exceptions list (late, over correction limits, inactive), each linking to the item. Charts only where a single number cannot carry the meaning.

### 8.7 Visual system adjustments
- Status treatments: Done, Now, Next, Later, plus one "your turn" accent. Text label always present.
- Type: three or four sizes, sentence case. Monospace limited to IDs, dates, and amounts in metadata.
- Remove decorative fills, color-coded badge families, and uppercase letter-spaced labels as the default label style.
- Keep the civic, calm character of the existing palette.

---

## 9. Tests (run on every redesigned screen)

1. **Five-second test (P1):** an unfamiliar person can say where the project stands and what happens next.
2. **Whose-move test (P2):** every open item visibly shows who holds it.
3. **Squint test (P5):** exactly one thing stands out, and it is the answer or the user's action.
4. **Duplicate test (P4):** no fact appears twice on a screen.
5. **Empty test (P7):** nothing visible says "nothing," "—," or "none."
6. **Earned test (P8):** every element maps to (a) the persona's question, (b) a task, or (c) legal/trust; you can name which.
7. **Glossary test (P6):** a resident could use the screen without knowing what a gate, tier, or record source is.
8. **Consistency test (P9):** every decision page and every item row uses the same structure.
9. **Phone test:** the answer and the user's action are visible without scrolling on a phone.

When you deliver, include the inventory tables from section 6 for each screen (a short version is fine), so the decisions behind the redesign can be reviewed.
