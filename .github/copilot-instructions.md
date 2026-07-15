# Copilot Instructions for AI Agents

## Project Overview
This is a Playwright-based end-to-end testing project for web applications. The workspace is organized to support accessibility and smoke testing across multiple browsers.

## Architecture & Structure
- **Tests are located in `tests/`**
  - `ay11/` for accessibility tests (e.g., `accessibility.spec.ts`)
  - `smoke/` for general smoke tests (e.g., `homepage.spec.ts`)
- **Test results and reports**
  - `test-results/` contains per-browser test output and error context
  - `playwright-report/` contains HTML and markdown reports for test runs
- **Configuration**
  - `playwright.config.ts` configures browsers, test settings, and reporting
  - `package.json` defines dependencies and scripts

## Developer Workflows
- **Run all tests:**
  ```sh
  npx playwright test
  ```
- **Run a specific test file:**
  ```sh
  npx playwright test tests/smoke/homepage.spec.ts
  ```
- **View test reports:**
  Open `playwright-report/index.html` in a browser after a test run.
- **Debugging:**
  Use Playwright's `--debug` or `--headed` flags for interactive debugging.

## Conventions & Patterns
- **Test files use TypeScript and Playwright's test runner.**
- **Accessibility tests follow a pattern:**
  - Each browser's results are stored in a separate folder under `test-results/`
  - Error context is documented in `error-context.md` files
- **Reporting:**
  - Markdown files in `playwright-report/data/` summarize test outcomes
- **No custom build steps; tests run directly via Playwright.**

## Integration Points
- **External dependencies:**
  - Playwright (core dependency)
  - TypeScript (for test authoring)
- **No backend or service integration detected.**

## Examples
- See `tests/ay11/accessibility.spec.ts` for accessibility test structure
- See `tests/smoke/homepage.spec.ts` for smoke test structure

## Quick Start
1. Install dependencies:
   ```sh
   npm install
   ```
2. Run tests:
   ```sh
   npx playwright test
   ```
3. View reports:
   Open `playwright-report/index.html`

---
_If any conventions or workflows are unclear, please provide feedback for further refinement._
