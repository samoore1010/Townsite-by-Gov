# Project map add-on (v6.1)

Add a project map that shows the subject land from day one and gains layers as filings come in, so the map itself shows how far along a project is. Build it as inline SVG on a drawn, stylized base map of the fictional City of Cholla Ridge. No real map tiles or real geography.

## Layers (bottom to top)

| # | Layer | Source label | Appears when | Visibility |
|---|---|---|---|---|
| 1 | Base: streets, names, north arrow, scale bar | City GIS | Always | Public |
| 2 | Zoning / General Plan tint, labeled | City GIS · zoning | Always | Public |
| 3 | Subject parcel (bold) + neighbor parcels (hairline) | County Assessor GIS · approximate · not a survey | Always | Public |
| 4 | 300-ft notice radius (dashed) | City notice area | Always | Public |
| 5 | Approved site plan | City record + approval date | An approved site plan exists | Public |
| 6 | Proposed site plan (dashed, lighter) | Filed [date] · R# · under review | Site plan application under review | Team & staff |
| 7 | Preliminary plat lines | Filed [date] · under review | Preliminary plat filed | Team & staff until hearing noticed, then Public |
| 8 | Recorded plat + "RECORDED" stamp | County Recorder · recorded [date] | Final plat recorded | Public |
| 9 | Review pins | Review comments | Comments issued | Team & staff (drafts: staff only) |

Rules: every legend entry shows source and date; never draw a layer with no filing behind it; never use the applicant's private survey; persona and visibility decide what renders.

## Seed geometry

- **Saguaro Commons:** 22.1-acre irregular parcel fronting N. Ridge Parkway (west); "SR 187" along the north edge; built commercial corner at the southwest (separate parcel); zoning PAD (parcel), C-2 (corner), R-1 (west), vacant/Urban Development (east). Layer 5 = 2023 build-to-rent site plan (Legacy SP-2022-018). Layer 6 = amendment R2 (Sep 8, 2026) with the realigned east drive clipping Detention Area A. CO-01 pin there once CR-01 issues.
- **Ironwood Pad:** 1.9-acre C-2 pad on E. Mesquite Road; layer 5 = approved site plan, one 8,400 sf building.
- **Other registry projects:** parcel and zoning only.

## Placement

- Overview and public page: small static map (parcel + approved plan only); "View map" opens the full map.
- Full map: at most three legend groups (parcel and zoning, approved plans, proposed plans for team and staff).
- Cards: thumbnail parcel outline.
- Public home and Find projects: city map with public projects colored by stage.

## Labels and accessibility

- Footer on every map: "Illustrative map of a fictional city. Parcel lines are approximate (County Assessor GIS) and are not a survey. Not for construction."
- Proposed layers tagged "PROPOSED · UNDER REVIEW" on the map.
- Text alternative listing visible layers and pins. Phone: full width, about 260 px tall.

Note: the clarity redesign principles (04) take precedence. Keep the map simple; no layer toggle panels on overview screens.
