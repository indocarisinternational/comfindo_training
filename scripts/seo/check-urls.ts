import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

const TARGET_URLS = [
  'https://www.comfindo.co.id/',
  'https://www.comfindo.co.id/training',
  'https://www.comfindo.co.id/blog',
  'https://www.comfindo.co.id/contact',
  'https://www.comfindo.co.id/services',
  'https://www.comfindo.co.id/training/iso-9001',
  'https://www.comfindo.co.id/training/sertifikasi-iso-9001'
];

async function checkUrls() {
  const validUrls = [];

  for (const url of TARGET_URLS) {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        validUrls.push(url);
      } else if (response.status === 404) {
        console.log(`URL ${url} returned 404. Skipping.`);
        if (supabase) {
          const title = `Missing Page: ${url}`;
          const { data: existing } = await supabase
            .from('seo_tasks')
            .select('id')
            .eq('title', title)
            .eq('status', 'open')
            .limit(1);

          if (!existing || existing.length === 0) {
            await supabase.from('seo_tasks').insert({
              title,
              task_type: 'technical',
              priority: 'medium',
              status: 'open',
              description: `The URL ${url} returned a 404 error during Lighthouse CI prep. Please verify if it should exist.`,
              page_url: url
            });
            console.log(`Created seo_task for missing URL: ${url}`);
          }
        }
      } else {
         console.log(`URL ${url} returned ${response.status}. Skipping.`);
      }
    } catch (error) {
      console.error(`Failed to fetch ${url}:`, error);
    }
  }

  if (validUrls.length === 0) {
    console.warn("No valid URLs found! Lighthouse CI might fail.");
  }

  const lhciConfig = {
    ci: {
      collect: {
        url: validUrls,
        numberOfRuns: 1,
        settings: {
          preset: 'desktop'
        }
      },
      assert: {
        assertions: {
          'categories:performance': ['warn', { minScore: 0.70 }],
          'categories:accessibility': ['warn', { minScore: 0.85 }],
          'categories:best-practices': ['warn', { minScore: 0.85 }],
          'categories:seo': ['warn', { minScore: 0.90 }]
        }
      },
      upload: {
        target: 'filesystem',
        outputDir: './.lighthouseci',
        reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%'
      }
    }
  };

  fs.writeFileSync('lighthouserc-dynamic.json', JSON.stringify(lhciConfig, null, 2));
  console.log(`Wrote lighthouserc-dynamic.json with ${validUrls.length} URLs.`);
}

checkUrls().catch(console.error);
