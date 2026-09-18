# Production Control Dashboard

A small factory operations dashboard for tracking production jobs, built as a front-end assignment.

## Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react

## Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open http://localhost:3000

## Component structure

- `app/page.tsx` — owns all state (jobs, selected job, search/filter/sort values) and composes the page
- `components/summary-cards.tsx` — top metrics (total, delayed, due soon, completed), computed from the full job list
- `components/job-filters.tsx` — search input, status filter, sort dropdown (controlled, state lives in the parent)
- `components/jobs-table.tsx` — renders the filtered/sorted job list, handles the empty state
- `components/job-detail-panel.tsx` — side sheet with job details and a status-update dropdown
- `lib/types.ts` — Job and JobStatus types
- `lib/mock-data.ts` — mock job dataset

State is kept simple on purpose — everything lives in `useState` in `page.tsx` and gets passed down as props. Didn't reach for Context or a state library since the data flow is shallow (one page, four components).

## Assumptions

- Mock data dates are set relative to the current date so the "Due Soon" metric actually shows something meaningful in a demo, rather than mock dates that happen to be in the past.
- "Due Soon" = due within 3 days and not already completed.
- Status updates are local-only (in-memory state) — there's no backend, so changes reset on refresh. In a real version this would be a PATCH request to a jobs API.
- Notes are read-only in the detail panel for now — the assignment asked for a status update action specifically, so I prioritized that over building out a full notes editor.

