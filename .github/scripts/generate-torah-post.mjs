#!/usr/bin/env node
// Fetches the current week's Torah portion from Hebcal and generates a blog post via Claude API.
// Runs every Friday via GitHub Actions; commits directly to main.

import { readFileSync, writeFileSync } from 'fs'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
if (!ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is not set.')
  process.exit(1)
}

// ── 1. Fetch current parasha from Hebcal ──────────────────────────────────────
// Using Phoenix, AZ (zip 85001) as the location context.
const hebcalUrl = 'https://www.hebcal.com/shabbat?cfg=json&zip=85001&m=50&b=18&M=on&lg=s'
console.log('Fetching parasha from Hebcal…')
const hebcalRes = await fetch(hebcalUrl)
if (!hebcalRes.ok) {
  console.error(`Hebcal API error: ${hebcalRes.status}`)
  process.exit(1)
}
const hebcalData = await hebcalRes.json()

const parashaItem = hebcalData.items?.find((item) => item.category === 'parashat')
if (!parashaItem) {
  console.error('No parasha found in Hebcal response. This may be a holiday week.')
  console.log('Hebcal items:', JSON.stringify(hebcalData.items?.map((i) => i.category)))
  process.exit(0) // Exit cleanly — no post this week
}

const parashaFullName = parashaItem.title // e.g. "Parashat Beha'alotcha"
const parashaRef = parashaItem.memo || '' // e.g. "Numbers 8:1 - 12:16"
console.log(`Parasha: ${parashaFullName} (${parashaRef})`)

// ── 2. Build slug ─────────────────────────────────────────────────────────────
const slug =
  'parashat-' +
  parashaFullName
    .toLowerCase()
    .replace(/^parashat\s+/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// ── 3. Check for duplicate ────────────────────────────────────────────────────
const blogPostsPath = 'src/data/blog-posts.ts'
let blogPostsContent = readFileSync(blogPostsPath, 'utf8')

if (blogPostsContent.includes(`slug: '${slug}'`)) {
  console.log(`Post for "${slug}" already exists — skipping.`)
  process.exit(0)
}

// ── 4. Generate post content via Claude ───────────────────────────────────────
const today = new Date().toISOString().split('T')[0]

const userPrompt = `You are writing a weekly blog post for The Way of Yeshua Ministries — a Messianic Christian ministry that believes Yeshua (Jesus) is the Messiah foretold in the Torah and the whole of Scripture. The ministry honors both the Torah and the New Testament as the complete Word of God, and reads the Old Testament through the lens of its fulfillment in Yeshua.

Write a blog post for this week's Torah portion: **${parashaFullName}** (${parashaRef}).

The ministry's voice is pastoral, warm, and personally engaging — like a letter from a pastor to their congregation. Existing posts open with "Shalom and blessings, beloved," use Hebrew terms naturally (Yeshua, HaShem, moedim, Shalom, Torah, etc.), and weave Old and New Testament Scripture together throughout.

CRITICAL REQUIREMENT — New Testament connections:
Every major theme or section MUST include at least one New Testament reference showing how Yeshua or the Apostolic writings illuminate, fulfill, or apply the Torah passage. This is non-negotiable. Examples of how to do this:
- Show how Yeshua quotes or fulfills the passage (Matthew, Luke, John)
- Connect a Torah theme to Paul's letters (Romans, Galatians, Hebrews, Colossians)
- Tie it to the book of Revelation or the Apostolic writings (Acts, James, Peter)
- Show how the Torah passage is a "shadow" with the substance in Messiah (Colossians 2:16-17, Hebrews 10:1)
Include a minimum of 4–5 distinct New Testament references spread across the post.

Return ONLY a valid JSON object — no markdown, no commentary outside the JSON:

{
  "title": "Parashat [Name]: [Short subtitle capturing the main theme]",
  "excerpt": "One or two sentences summarising the post. No HTML.",
  "body": [
    "Paragraph 1 as a string",
    "Paragraph 2 as a string"
  ]
}

Rules for body paragraphs:
- 8–12 paragraphs total
- HTML entities for special characters: &mdash; &rsquo; &ldquo; &rdquo; &hellip; &ndash;
- <strong>bold</strong> and <em>italic</em> where helpful
- Section headings: <strong>Heading</strong><br /> at the start of a paragraph
- Scripture quotations in <em>italics</em> followed by the reference in em-dashes: &mdash; Genesis 1:1
- Bullet points: &nbsp;&nbsp;&bull; text<br />&nbsp;&nbsp;&bull; text (all in one paragraph string)
- Phone link: <a href="tel:5203024034" class="text-[#C9A24B] hover:underline">(520) 302-4034</a>
- Email link: <a href="mailto:Info@thewayofyeshuaministries.org" class="text-[#C9A24B] hover:underline">Info@thewayofyeshuaministries.org</a>
- Second-to-last paragraph: invite readers to reach out, including the phone and email links above
- Final paragraph: a blessing — "Shabbat Shalom" or similar, with a closing Hebrew/ministry phrase`

console.log('Calling Claude API…')
const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: userPrompt }],
  }),
})

if (!claudeRes.ok) {
  const err = await claudeRes.text()
  console.error(`Claude API error ${claudeRes.status}: ${err}`)
  process.exit(1)
}

const claudeData = await claudeRes.json()
const rawText = claudeData.content?.[0]?.text ?? ''

let postData
try {
  // Strip any accidental markdown code fences
  const jsonStr = rawText
    .replace(/^```(?:json)?\s*/m, '')
    .replace(/\s*```\s*$/m, '')
    .trim()
  postData = JSON.parse(jsonStr)
} catch (e) {
  console.error('Failed to parse Claude response as JSON.')
  console.error('Raw response:', rawText)
  process.exit(1)
}

if (!postData.title || !postData.excerpt || !Array.isArray(postData.body)) {
  console.error('Claude response missing required fields (title / excerpt / body).')
  process.exit(1)
}

// ── 5. Build the TypeScript blog post entry ───────────────────────────────────
const bodyLines = postData.body.map((p) => `      ${JSON.stringify(p)},`).join('\n')

const newPostEntry = `  {
    slug: '${slug}',
    title: ${JSON.stringify(postData.title)},
    date: '${today}',
    excerpt:
      ${JSON.stringify(postData.excerpt)},
    body: [
${bodyLines}
    ],
  },`

// Insert at top of the array
blogPostsContent = blogPostsContent.replace(
  'export const blogPosts: BlogPost[] = [\n',
  `export const blogPosts: BlogPost[] = [\n${newPostEntry}\n`
)

writeFileSync(blogPostsPath, blogPostsContent)
console.log(`✓ Blog post written: ${slug}`)
console.log(`  Title: ${postData.title}`)
