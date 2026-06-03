import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const TOPICS_PATH = path.join(process.cwd(), 'data', 'article-topics.json')
const FALLBACK_DIR = path.join(process.cwd(), 'content', 'blog')

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash'
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const AUTO_PUBLISH = process.env.AUTO_PUBLISH === 'true'
const AUTHOR_NAME = process.env.ARTICLE_AUTHOR_NAME || 'comfindo Management'

async function generateArticle(topic: any) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing")
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })

  const prompt = `SYSTEM INSTRUCTION:
You are an expert Indonesian SEO content writer for a training and consulting company.

Write helpful, reliable, people-first content.
Do not keyword-stuff.
Do not fabricate certification authority claims.
Do not claim comfindo directly issues ISO 9001 certificates unless explicitly provided.
Position comfindo as a training, consulting, and implementation support provider.
Write in professional Indonesian.
Target readers: business owners, HR, operational managers, QA/QC teams, school/company administrators, and decision makers.

ARTICLE REQUIREMENTS:
- Topic Title: ${topic.title}
- Focus Keyword: ${topic.focusKeyword}
- Topic Intent: ${topic.intent}
- Language: Indonesian
- Minimum length: 1000 words
- Maximum length: 1600 words
- Tone: professional, clear, commercially useful
- Content format: Use valid HTML for the content body. (e.g., <h2>, <p>, <ul>). Do NOT use Markdown for the content body.
- Include one H1 (represented as the title field, do not put H1 in content)
- Include H2/H3 sections in the content
- Include FAQ section with 4-6 questions
- Include CTA to consult comfindo in the content
- Include internal link to /training/iso-9001
- Include internal link to /contact
- Include natural keyword placement
- Avoid generic filler
- Avoid fake statistics
- Avoid unverifiable claims
- Avoid saying comfindo is an official ISO certification body

OUTPUT FORMAT:
Return valid JSON only. Do not wrap in markdown blocks like \`\`\`json.
JSON shape:
{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "focusKeyword": "...",
  "seoTitle": "...",
  "seoDescription": "...",
  "content": "...",
  "faq": [
    {
      "question": "...",
      "answer": "..."
    }
  ],
  "internalLinks": [
    {
      "anchor": "...",
      "url": "..."
    }
  ]
}`

  console.log(`Calling Gemini API for topic: ${topic.title}`)
  const result = await model.generateContent(prompt)
  const text = result.response.text()
  
  // Clean potential markdown wrapping
  const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim()
  
  return JSON.parse(cleanedText)
}

function validateArticle(article: any) {
  if (!article.title || !article.slug || !article.content) return false
  if (article.seoTitle?.length > 70) console.warn("SEO Title might be too long")
  if (article.seoDescription?.length > 170) console.warn("SEO Description might be too long")
  
  const contentLower = article.content.toLowerCase()
  if (contentLower.includes("badan sertifikasi resmi")) return false
  if (contentLower.includes("pasti lulus")) return false
  if (contentLower.includes("jaminan sertifikat iso")) return false
  if (contentLower.includes("sertifikat iso 9001 langsung terbit")) return false

  return true
}

async function saveToSupabase(article: any, topic: any) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase credentials missing")
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  
  // Create a combined content string including FAQs
  let finalContent = article.content
  if (article.faq && article.faq.length > 0) {
    finalContent += `<h2>FAQ</h2>`
    article.faq.forEach((f: any) => {
      finalContent += `<h3>${f.question}</h3><p>${f.answer}</p>`
    })
  }

  const payload = {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: finalContent,
    focus_keyword: article.focusKeyword || topic.focusKeyword,
    seo_title: article.seoTitle,
    seo_description: article.seoDescription,
    author_name: AUTHOR_NAME,
    status: AUTO_PUBLISH ? 'published' : 'draft',
    is_published: AUTO_PUBLISH,
    published_at: AUTO_PUBLISH ? new Date().toISOString() : null,
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase.from('blog_posts').insert(payload)
  if (error) {
    throw error
  }
}

function saveToMarkdown(article: any, topic: any) {
  if (!fs.existsSync(FALLBACK_DIR)) {
    fs.mkdirSync(FALLBACK_DIR, { recursive: true })
  }

  const dateStr = new Date().toISOString().split('T')[0]
  const filePath = path.join(FALLBACK_DIR, `${dateStr}-${article.slug}.md`)

  const frontmatter = `---
title: "${article.title}"
slug: "${article.slug}"
excerpt: "${article.excerpt}"
focusKeyword: "${article.focusKeyword || topic.focusKeyword}"
seoTitle: "${article.seoTitle}"
seoDescription: "${article.seoDescription}"
status: "${AUTO_PUBLISH ? 'published' : 'draft'}"
author: "${AUTHOR_NAME}"
createdAt: "${new Date().toISOString()}"
---

${article.content}
`

  fs.writeFileSync(filePath, frontmatter)
  console.log(`Saved markdown fallback to ${filePath}`)
}

async function main() {
  if (!fs.existsSync(TOPICS_PATH)) {
    console.error("Topics file not found")
    process.exit(1)
  }

  const topics = JSON.parse(fs.readFileSync(TOPICS_PATH, 'utf-8'))
  const pendingTopicIndex = topics.findIndex((t: any) => t.status === 'pending')

  if (pendingTopicIndex === -1) {
    console.log("No pending topics found.")
    process.exit(0)
  }

  const topic = topics[pendingTopicIndex]
  let success = false
  let attempts = 0
  let generatedArticle = null

  while (!success && attempts < 2) {
    attempts++
    try {
      generatedArticle = await generateArticle(topic)
      if (validateArticle(generatedArticle)) {
        success = true
      } else {
        console.warn(`Validation failed on attempt ${attempts}`)
      }
    } catch (e) {
      console.error(`Error generating article on attempt ${attempts}:`, e)
    }
  }

  if (!success || !generatedArticle) {
    console.error("Failed to generate a valid article after retries.")
    process.exit(1)
  }

  try {
    console.log("Attempting to save to Supabase...")
    await saveToSupabase(generatedArticle, topic)
    console.log("Saved to Supabase successfully.")
  } catch (supabaseError) {
    console.error("Supabase insert failed, using Markdown fallback:", supabaseError)
    try {
      saveToMarkdown(generatedArticle, topic)
    } catch (mdError) {
      console.error("Markdown fallback also failed:", mdError)
      process.exit(1)
    }
  }

  // Update topic status
  topics[pendingTopicIndex].status = 'generated'
  topics[pendingTopicIndex].generatedAt = new Date().toISOString()
  fs.writeFileSync(TOPICS_PATH, JSON.stringify(topics, null, 2))
  console.log(`Topic updated successfully.`)
}

main().catch(console.error)
