# Mind Map Sprint Automation

## Sprint Goal

Stabilize `/mind-map` interaction quality and improve perceived liveliness while keeping build stable.

## Current Status Snapshot

- Done: scoped mind-map lint passes (`npx eslint src/components/MindMapVisualizer.tsx src/components/MindMapClient.tsx src/lib/mind-map.ts`) as of 2026-05-09 20:27 +08:00.
- Done: TypeScript compile check passes (`npx tsc --noEmit`) as of 2026-05-09 20:27 +08:00.
- Done: production build passes (`npm run build`) as of 2026-05-09 20:27 +08:00.
- Done: built `/mind-map` route returns HTTP 200 from `next start` on localhost as of 2026-05-09 19:22 +08:00.
- Done: interaction-risk static scan rechecked drag, zoom reveal, reset, timer cleanup, selected state, layer filtering, and displayed node/link position sync on 2026-05-09 20:27 +08:00.
- Done: SVG click and zoom handlers are now explicitly removed on visualizer cleanup to reduce remount interaction risk.
- Done: progressive reveal model and panel redesign are implemented.
- Done: drag interaction robustness and motion polish have a static risk pass; node and link positions share the same displayed position map during drag.
- In progress: browser-level interaction verification for drag, zoom reveal, and reset. Automated Playwright/Puppeteer smoke tests are blocked because neither dependency is installed in this app and the in-app browser tool is not exposed in this session.
- Blocked this run: temporary `next start` HTTP smoke was not rerun because background server lifecycle commands were rejected by the shell policy.
- Debt: repo-wide lint has historical failures outside mind-map scope.
- Resolved: production build no longer depends on `next/font/google`; font CSS now uses local/system fallback families.

## Active Sprint Backlog

1. `P0` Verify drag runtime behavior in browser and confirm links stay synced while dragging.
2. `P1` Verify reveal levels still map correctly during live zoom gestures.
3. `P1` Confirm subtle floating motion does not create jitter or layout drift in browser.
4. `P2` Keep selected/hovered visual states readable at all zoom levels.
5. `P2` Track historical lint debt separately from new regressions.

## Automated Loop

Run this loop every cycle:

1. Read `git status --short` and identify touched files.
2. Run scoped validation on touched UI files:
   - `npx eslint src/components/MindMapVisualizer.tsx src/components/MindMapClient.tsx src/lib/mind-map.ts`
3. Run integration validation:
   - `npm run build`
4. If validation fails:
   - Fix only files related to the failing behavior.
   - Re-run step 2 and step 3.
5. If validation passes:
   - Update sprint snapshot with `done / pending / risks`.

## Definition Of Done For This Sprint

- Dragging nodes does not throw runtime errors.
- Node position and edge position stay consistent during drag.
- Floating motion is subtle (no layout drift, no jitter).
- Build passes.
- Scoped lint on touched mind-map files passes.

## Reporting Format

Each cycle should output:

- `Done`
- `Pending`
- `Risks`
- `Next Action`
