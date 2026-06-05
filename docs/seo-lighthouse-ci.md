# Comfindo SEO Engine: Lighthouse CI Guardrail

## Overview
Step 8 of the Comfindo SEO Growth Engine automates Lighthouse CI (PageSpeed-style performance auditing) for important Comfindo public pages. 

The workflow ensures performance, accessibility, best practices, and SEO scores stay high. It prevents regressions and generates actionable tasks when scores drop.

## How It Works
1. **Health Check (`scripts/seo/check-urls.ts`)**: The workflow first checks if the target URLs are live (HTTP 200). If a URL is missing (404), it skips it and generates a low/medium priority SEO task in Supabase.
2. **Lighthouse CI (`lighthouserc-dynamic.json`)**: It audits only the live pages.
3. **Parse Results (`scripts/seo/parse-lighthouse-results.ts`)**: It parses the `.lighthouseci` reports.
4. **Supabase Storage**: Results are saved into `seo_lighthouse_reports`.
5. **Task Generation**: If scores fall below thresholds (e.g., performance < 0.70), it inserts tasks into `seo_tasks`.
6. **Telegram Notification**: Sends a brief summary report if credentials are set.

## Target URLs
Currently tracked pages:
- `https://www.comfindo.co.id/`
- `https://www.comfindo.co.id/training`
- `https://www.comfindo.co.id/blog`
- `https://www.comfindo.co.id/contact`
- `https://www.comfindo.co.id/services`
- `https://www.comfindo.co.id/training/iso-9001`
- `https://www.comfindo.co.id/training/sertifikasi-iso-9001`

To add or remove URLs, edit `scripts/seo/check-urls.ts`. 

## Github Secrets Required
Ensure the following are set in GitHub Actions Secrets:
- `SUPABASE_URL` (Required)
- `SUPABASE_SERVICE_ROLE_KEY` (Required - Never expose in frontend)
- `TELEGRAM_BOT_TOKEN` (Optional - for Telegram reporting)
- `TELEGRAM_CHAT_ID` (Optional)

## Lighthouse Score Thresholds
- **Performance**: < 0.70 (Medium Task), < 0.40 (High Task)
- **Accessibility**: < 0.85 (Medium Task)
- **Best Practices**: < 0.85 (Medium Task)
- **SEO**: < 0.90 (Medium Task), < 0.80 (High Task)
- **LCP**: > 2500 ms (Task)
- **CLS**: > 0.1 (Task)
- **TBT**: > 300 ms (Task)

## How to Run Manually
You can trigger the workflow from the **Actions** tab in GitHub by selecting "Lighthouse CI Performance Guardrail" and clicking **Run workflow**.

Alternatively, run locally:
```bash
npm install -D @lhci/cli tsx
npx tsx scripts/seo/check-urls.ts
npm run lhci:autorun -- --config=./lighthouserc-dynamic.json
npx tsx scripts/seo/parse-lighthouse-results.ts
```
*(Make sure to set `.env.local` with Supabase secrets for the scripts to work).*

## Viewing Reports
Lighthouse JSON and HTML reports are uploaded as GitHub Actions **artifacts** and can be downloaded from the workflow run summary. Structured metric history is available in the `seo_lighthouse_reports` table via Supabase or Admin Dashboard.
