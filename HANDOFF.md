# Deployment Handoff: JavaHouseCoffeeWebsite

## Project Overview
A React + Vite + TypeScript + Tailwind CSS website built using Google AI Studio, deployed to GitHub Pages.

**Live URL:** https://rcclayton.github.io/JavaHouseCoffeeWebsite/
**GitHub Repo:** https://github.com/rcclayton/JavaHouseCoffeeWebsite

---

## Problems Encountered & How They Were Fixed

### 1. Blank white page (local)
**Cause:** `node_modules` was missing — dependencies had never been installed.
**Fix:** Run `npm install` before `npm run dev`.

### 2. Blank white page (GitHub Pages)
**Cause:** GitHub Pages serves static files only. It cannot run TypeScript or React source code directly. The built output (`dist/`) was gitignored and never deployed.
**Fix:** Set up a GitHub Actions workflow to build the project and deploy the output automatically on every push.

### 3. Vite base path
**Cause:** When deploying to a GitHub Pages project site (not a root domain), Vite needs to know the repo name as the base URL path, otherwise assets 404.
**Fix:** Set `base` in `vite.config.ts` to read from an environment variable with a fallback of `'/'`:
```ts
base: process.env.VITE_BASE_PATH ?? '/',
```
Then pass `VITE_BASE_PATH=/JavaHouseCoffeeWebsite/` only in the GitHub Actions build step (see Step 3 below). Netlify and other root-domain hosts get `'/'` by default — no extra config needed.

### 6. Blank page on Netlify (after GitHub Pages was working)
**Cause:** `base: '/JavaHouseCoffeeWebsite/'` was hardcoded in `vite.config.ts`. Netlify serves from the root, so all asset paths were wrong.
**Fix:** Use the `VITE_BASE_PATH` env var approach described in problem #3 above. Set it in the GitHub Actions workflow; leave it unset on Netlify.

### 4. GitHub Actions push rejected
**Cause:** The stored GitHub OAuth token was missing the `workflow` scope, which is required to push files inside `.github/workflows/`.
**Fix:** Run `gh auth refresh -s workflow` to re-authenticate with the correct scope.

### 5. GitHub Actions workflow failed
**Cause:** The workflow used `cache: npm` in `actions/setup-node`, which requires a `package-lock.json`. This project has no lock file (it's gitignored and was never committed).
**Fix:** Removed `cache: npm` from the workflow.

---

## How to Repeat This on a New Website

### Step 1 — Install & run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

### Step 2 — Add the Vite base path
In `vite.config.ts`, use an environment variable instead of a hardcoded path. This lets GitHub Pages and Netlify (or any root-domain host) each get the right value:
```ts
export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_PATH ?? '/',
    plugins: [react(), tailwindcss()],
    // ...
  };
});
```

### Step 3 — Create the GitHub Actions workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install

      - run: npm run build
        env:
          VITE_BASE_PATH: /YOUR-REPO-NAME/

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Step 4 — Configure GitHub Pages
In your GitHub repo: **Settings → Pages → Source → GitHub Actions**

### Step 5 — Ensure the workflow scope is set
```bash
gh auth status
# Check that 'workflow' appears in Token scopes.
# If not, run:
gh auth refresh -s workflow
```

### Step 6 — Push
```bash
git add .
git commit -m "feat: Add GitHub Pages deploy workflow"
git push origin main
```

Watch the deploy at: `https://github.com/YOUR-USERNAME/YOUR-REPO/actions`

Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## Notes
- AI Studio projects include a `GEMINI_API_KEY` reference in `vite.config.ts` as boilerplate. If the app doesn't actually call the Gemini API, you don't need to set this secret — just leave it out of the workflow.
- `dist/` and `node_modules/` are gitignored, which is correct. The Actions workflow handles building on GitHub's servers.
- No `package-lock.json` exists in this project. Do not use `cache: npm` in the workflow unless you add one.
