# Project Meridian Pilot Correction Plan

## Scope
Reframe the prototype as one validated pilot for 6,000 Field Metering & Manual Operations employees, following the uploaded fix list, 24-record sample, and 12 acceptance scenarios.

## Changes
1. Replace the 13-item platform tour with five journey stages: Overview, Roster/People, Employee Detail, Decision Engine, and Economics/Impact.
2. Load all 24 supplied pilot employees into a filterable roster. Preserve the active decision filter when opening and returning from employee detail.
3. Use one ordered decision-rules table as the source of truth for employee recommendations and the visible rules explanation.
4. Show the exact five-category population split: Redeploy 1,200; Reskill → Redeploy 1,800; Reskill 1,500; Further Assessment 900; Voluntary Transition Review 600.
5. Make evidence confidence and employee-specific evidence trails visible. Low/Unknown evidence forces Further Assessment and displays insufficient data instead of invented fit or feasibility.
6. Merge role, capability, and learning content into Employee Detail tabs, centered on the selected employee.
7. Replace the economics with the reconciled model: Rp108.6B versus Rp50.4B, saving 53.6%; retain the Oracle payroll exclusion.
8. Remove all residual org-wide figures and labels, including 52,000, 14 job families, Rp3.5T, and Surplus Review.
9. Produce a self-contained offline HTML export alongside the live prototype, then verify the 12 supplied scenarios on desktop and mobile.

## Technical details
- Keep state shared at the app level for selected employee and roster filter.
- Derive decisions by first-match rule evaluation; do not store decision labels in employee records.
- Package the rendered prototype into one HTML file with embedded styles and scripts for offline use.
