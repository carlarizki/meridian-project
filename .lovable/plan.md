# Project Meridian — Case Brief Alignment

## Build

- Consolidate the sidebar into 10 primary modules: Workforce, AI Exposure, Job Model, Capabilities, People, Future Roles, Mobility, Learning, Decision, and Impact.
- Keep the 90-day implementation plan accessible as a resource inside the executive journey, not as another primary module.
- Remove Executive Deck from the application scope; it will be prepared separately in Google Slides.
- Make the central AHA journey explicit: 52,000 enterprise workforce → 6,000 priority job-family employees → 70% automatable work → 4,200 roles’ worth of work → evidence-backed transition portfolio.
- Use one scenario model for exposure and transition totals. The exposure cutoff changes affected work, the fit threshold changes recommendation categories without changing employee scores, and the reskill pass rate changes projected outcomes and economics.
- Separate work exposure from people recommendations, and reconcile the affected 4,200 across direct redeployment, reskill-to-redeploy, longer reskilling, further assessment, and voluntary transition review.
- Show measured versus inferred evidence, confidence, data lineage, and the prototype governance assumption that critical individual recommendations require at least 50% measured evidence.
- Replace automatic approval wording with submission for human review and a clear simulated-queue confirmation.
- Strengthen Impact with pilot-only low/base/high scenarios, visible formulas and assumptions, and clear separation of the Rp3.5B engagement fee from total transformation cost.
- Apply the requested dark-slate executive styling and make mobile navigation usable without spending scope on presentation-only polish.

## Validation

- Verify the AHA journey from exposure through Budi’s evidence, pathway, recommendation, and impact assumptions.
- Verify simulator values update the reconciled portfolio correctly.
- Verify all 10 primary modules, the 90-day resource, mobile navigation, and the human-review submission.
- Confirm the preview builds without errors and has no blank-screen or console failures.

## Technical details

- Keep TanStack Start and the existing single-route prototype architecture.
- Keep all cohort values and scenario calculations in one typed client-safe module so every screen reads the same results.
- Use only case-brief facts, curated sample profiles, and clearly labeled simulated cohort estimates; no live integrations or payroll data.