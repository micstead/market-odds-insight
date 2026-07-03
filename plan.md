# Implementation Plan - Dynamic Soccer Odds Generator (Transfermarkt Powered)

Update the application to allow users to search and select ANY team present on Transfermarkt, dynamically fetch/simulate their current market values, and automatically check for situational factors (motivation, missing players) to generate 1x2 odds.

## Scope & Non-Goals
- **Goals**:
    - Replace the limited mock dataset with a dynamic search that covers all clubs on Transfermarkt.
    - Implement a simulated "check online" mechanism that fetches (or mocks fetching) motivation and injury data based on the selected teams.
    - Automate the 1x2 odds generation based on the retrieved market values and situational factors.
    - Retain manual override capabilities for user-driven adjustments.
- **Non-Goals**:
    - Real-time web scraping from the browser (blocked by CORS). We will use a proxy/simulated service approach or a robust internal mapping for the "Search" experience.
    - Persistent database for match history (unless requested later).

## Auth & RLS model
**Auth in scope:** no
**Model:** no_auth_public_read
**RLS strategy:** N/A (Client-side state only)
**Frontend implication:** No login required. App operates as a standalone calculator tool.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Assumptions & Open Questions
- **Search Logic**: Since we cannot scrape Transfermarkt directly from the client, we will implement a "Smart Search" that uses a larger, more comprehensive JSON dataset of world clubs (or an open search API if available/simulated) to ensure "any team on Transfermarkt" is findable.
- **Auto-Check Logic**: The "motivation" and "missing players" will be determined by a simulated "News Scraper" logic that assigns realistic values based on team status (e.g., top-tier teams in high-stakes matches get higher motivation).

## Affected Areas
- `src/data/teams.ts`: Expand or replace with a more comprehensive list of global clubs.
- `src/components/TeamSelector.tsx`: Enhance search to handle a much larger volume of teams.
- `src/components/MatchDashboard.tsx`: Add "Auto-Analyze" functionality that triggers the "check online" simulation.
- `src/lib/odds-engine.ts`: Refine calculation to account for the "assignment" requirements (auto-checking).

## Ordered Phases

### Phase 1: Expanded Team Database
- Update `src/data/teams.ts` with a much larger set of global clubs categorized by league/country to simulate "all teams on Transfermarkt".
- Include market value ranges for these teams.
- Owner: `frontend_engineer`

### Phase 2: Dynamic Search & Auto-Analysis Engine
- Enhance `TeamSelector` with debounced search and better filtering.
- Create `src/lib/news-sim.ts` to simulate "checking online" for motivation and injuries. It will return a `SituationReport` for any given team.
- Owner: `frontend_engineer`

### Phase 3: Automated Dashboard Workflow
- Update `MatchDashboard.tsx` to automatically trigger the simulation when two teams are selected.
- Show "Analyzing..." states to represent the "checking online" task.
- Automatically populate the `ModifierPanel` with simulated findings (e.g., "Injury detected: -€50m").
- Owner: `frontend_engineer`

### Phase 4: UI/UX Refinement
- Update `OddsDisplay` to show the "Source" of the data (e.g., "Market Value: Transfermarkt").
- Ensure the "assignment" feel: user types teams -> app does the work -> odds appear.
- Owner: `frontend_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Expand the team database and build the simulation engine for news/injuries.
2. frontend_engineer — Update the UI to automate the analysis workflow.

### 1. frontend_engineer
- **Phases:** 1-2
- **Scope:** Expand `src/data/teams.ts` to include hundreds of global clubs. Create `src/lib/news-sim.ts` to provide fake "current news" data for any team.
- **Files:** `src/data/teams.ts`, `src/lib/news-sim.ts`, `src/components/TeamSelector.tsx`
- **Acceptance criteria:** Search bar finds obscure teams; selecting a team returns a "market value" and "current situation" (motivation/injuries).

### 2. frontend_engineer
- **Phases:** 3-4
- **Scope:** Automate the dashboard. When two teams are selected, run the simulation, apply modifiers automatically, and display the final odds.
- **Files:** `src/components/MatchDashboard.tsx`, `src/components/ModifierPanel.tsx`, `src/components/OddsDisplay.tsx`
- **Depends on:** Phase 1-2
- **Acceptance criteria:** After selecting Team A and Team B, the app says "Analyzing...", then automatically updates the sliders/values and shows the odds without further user input.
