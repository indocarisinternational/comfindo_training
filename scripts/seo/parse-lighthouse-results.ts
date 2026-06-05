import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const LIGHTHOUSE_DIR = path.join(process.cwd(), '.lighthouseci');

async function parseAndStoreResults() {
  if (!fs.existsSync(LIGHTHOUSE_DIR)) {
    console.error(`Lighthouse directory not found: ${LIGHTHOUSE_DIR}`);
    return;
  }

  const files = fs.readdirSync(LIGHTHOUSE_DIR).filter((f) => f.endsWith('.json'));
  if (files.length === 0) {
    console.log('No Lighthouse JSON reports found.');
    return;
  }

  const results = [];

  for (const file of files) {
    const rawData = fs.readFileSync(path.join(LIGHTHOUSE_DIR, file), 'utf8');
    const report = JSON.parse(rawData);

    // Some LHCI formats wrap the report in an array or object
    const finalUrl = report.finalUrl || report.requestedUrl;
    if (!finalUrl) continue;

    const categories = report.categories || {};
    const audits = report.audits || {};

    const performance = categories.performance?.score || 0;
    const accessibility = categories.accessibility?.score || 0;
    const bestPractices = categories['best-practices']?.score || 0;
    const seo = categories.seo?.score || 0;

    const lcp = audits['largest-contentful-paint']?.numericValue || 0;
    const cls = audits['cumulative-layout-shift']?.numericValue || 0;
    const tbt = audits['total-blocking-time']?.numericValue || 0;
    const fcp = audits['first-contentful-paint']?.numericValue || 0;
    const speedIndex = audits['speed-index']?.numericValue || 0;

    // Supabase Insert
    const { error: insertError } = await supabase.from('seo_lighthouse_reports').insert({
      page_url: finalUrl,
      performance_score: performance,
      accessibility_score: accessibility,
      best_practices_score: bestPractices,
      seo_score: seo,
      lcp: lcp,
      cls: cls,
      tbt: tbt,
      fcp: fcp,
      speed_index: speedIndex,
      // Store full JSON if needed, but it might be large. We'll store a subset or null for now
      // report_json: report 
    });

    if (insertError) {
      console.error(`Failed to insert report for ${finalUrl}:`, insertError);
    } else {
      console.log(`Saved report for ${finalUrl}`);
    }

    results.push({
      url: finalUrl,
      performance,
      accessibility,
      bestPractices,
      seo,
      lcp,
      cls,
      tbt
    });

    await generateTasks(finalUrl, { performance, accessibility, bestPractices, seo, lcp, cls, tbt });
  }

  await sendTelegramReport(results);
}

async function generateTasks(url: string, metrics: any) {
  const tasks = [];

  if (metrics.performance < 0.70) {
    tasks.push({
      title: `Low Performance Score on ${url}`,
      type: 'pagespeed',
      priority: metrics.performance < 0.40 ? 'high' : 'medium',
      description: `Performance score is ${metrics.performance}. Please review Lighthouse report.`,
    });
  }

  if (metrics.seo < 0.90) {
    tasks.push({
      title: `Low SEO Score on ${url}`,
      type: 'technical',
      priority: metrics.seo < 0.80 ? 'high' : 'medium',
      description: `SEO score is ${metrics.seo}. Please review Lighthouse report.`,
    });
  }

  if (metrics.accessibility < 0.85) {
    tasks.push({
      title: `Accessibility Issues on ${url}`,
      type: 'technical',
      priority: 'medium',
      description: `Accessibility score is ${metrics.accessibility}.`,
    });
  }

  if (metrics.bestPractices < 0.85) {
    tasks.push({
      title: `Best Practices Issues on ${url}`,
      type: 'technical',
      priority: 'medium',
      description: `Best practices score is ${metrics.bestPractices}.`,
    });
  }

  if (metrics.lcp > 2500) {
    tasks.push({
      title: `Improve LCP on ${url}`,
      type: 'pagespeed',
      priority: 'medium',
      description: `LCP is ${metrics.lcp}ms, which is above the 2.5s threshold.`,
    });
  }

  if (metrics.cls > 0.1) {
    tasks.push({
      title: `Fix layout shift on ${url}`,
      type: 'pagespeed',
      priority: 'medium',
      description: `CLS is ${metrics.cls}, which is above the 0.1 threshold.`,
    });
  }

  if (metrics.tbt > 300) {
    tasks.push({
      title: `Reduce JavaScript blocking time on ${url}`,
      type: 'pagespeed',
      priority: 'medium',
      description: `TBT is ${metrics.tbt}ms, which is above the 300ms threshold.`,
    });
  }

  for (const task of tasks) {
    // Check if task exists and is open
    const { data: existingTasks } = await supabase
      .from('seo_tasks')
      .select('id')
      .eq('title', task.title)
      .eq('page_url', url)
      .eq('status', 'open')
      .limit(1);

    if (!existingTasks || existingTasks.length === 0) {
      const { error } = await supabase.from('seo_tasks').insert({
        title: task.title,
        task_type: task.type,
        priority: task.priority,
        status: 'open',
        description: task.description,
        page_url: url,
      });

      if (error) {
        console.error(`Failed to insert task: ${task.title}`, error);
      } else {
        console.log(`Created task: ${task.title}`);
      }
    }
  }
}

async function sendTelegramReport(results: any[]) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not found. Skipping report.');
    return;
  }

  const totalPages = results.length;
  if (totalPages === 0) return;

  const avgPerformance = (results.reduce((acc, curr) => acc + curr.performance, 0) / totalPages).toFixed(2);
  const avgSeo = (results.reduce((acc, curr) => acc + curr.seo, 0) / totalPages).toFixed(2);
  
  let weakestPage = results[0];
  for (const res of results) {
    if (res.performance < weakestPage.performance) {
      weakestPage = res;
    }
  }

  // Count high priority tasks created today
  const today = new Date().toISOString().split('T')[0];
  const { data: highPriorityTasks, error } = await supabase
    .from('seo_tasks')
    .select('id, title')
    .eq('priority', 'high')
    .gte('created_at', today);

  const numHighPriorityTasks = highPriorityTasks ? highPriorityTasks.length : 0;
  
  const topIssue = highPriorityTasks && highPriorityTasks.length > 0 ? highPriorityTasks[0].title : 'None';

  const message = `
Comfindo SEO Engine — Lighthouse CI Report

Pages audited:
${totalPages}

Average Performance:
${avgPerformance}

Average SEO:
${avgSeo}

Weakest page:
${weakestPage.url} (${weakestPage.performance})

High priority tasks created:
${numHighPriorityTasks}

Top issue:
${topIssue}

Next:
Review Admin → SEO Engine → Tasks / Reports.
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send Telegram report', await response.text());
    } else {
      console.log('Sent Telegram report successfully.');
    }
  } catch (err) {
    console.error('Error sending Telegram report:', err);
  }
}

parseAndStoreResults().catch(console.error);
