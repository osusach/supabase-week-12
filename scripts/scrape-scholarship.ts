import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import * as cheerio from "cheerio";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("Missing required environment variable: OPENAI_API_KEY");
  process.exit(1);
}

// CLI args
const [url, universityCode] = process.argv.slice(2);

if (!url || !universityCode) {
  console.error(
    "Usage: npx tsx scripts/scrape-scholarship.ts <url> <university-code>",
  );
  console.error(
    "Example: npx tsx scripts/scrape-scholarship.ts https://uchile.cl/dbe/bab uch",
  );
  process.exit(1);
}

const scholarshipContentSchema = z.object({
  content: z
    .string()
    .describe(
      "The scholarship content exactly as it appears on the page. Remove any remaining navigation, breadcrumbs, sidebars, social media buttons, footers, or promotional boilerplate. Preserve every section that is actually present — do not add, rename, or reorganize sections, and do not summarize.",
    ),
  scholarship_name: z.string().describe("The official scholarship name"),
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are extracting scholarship content from a Chilean university webpage.

Your only job is to clean and preserve — not transform.

Rules:
- Keep every section that exists on the page (dates, requirements, processes, renewal conditions, contact info, etc.)
- Preserve the exact section names and order as they appear
- Remove ONLY: navigation menus, breadcrumbs, sidebars, social media buttons, footers, related links panels, and promotional boilerplate unrelated to this scholarship
- Do NOT add sections, headings, or structure that is not in the original
- Do NOT summarize, rewrite, or infer information
- If a page has just one paragraph with no sections, the output should be just that paragraph
- Output plain text`,
  ],
  [
    "human",
    `URL: {url}

Page content:
{text}`,
  ],
]);

const llm = new ChatOpenAI({
  apiKey: OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0,
});

const structuredLlm = llm.withStructuredOutput(scholarshipContentSchema, {
  name: "scholarship_content_extractor",
});

function extractStructuredText($: cheerio.CheerioAPI): string {
  // Remove boilerplate elements
  $(
    "script, style, nav, header, footer, aside, [role='navigation'], [role='banner'], [role='contentinfo'], .breadcrumb, .breadcrumbs, .sidebar",
  ).remove();

  const lines: string[] = [];

  function walk(el: ReturnType<typeof $>[0]) {
    if (el.type === "text") {
      const text = "data" in el ? String(el.data).trim() : "";
      if (text) lines.push(text);
      return;
    }

    if (el.type !== "tag") return;

    const tag = "tagName" in el ? String(el.tagName).toLowerCase() : "";

    if (/^h[1-6]$/.test(tag)) {
      const text = $(el).text().trim();
      if (text) lines.push(`\n\n${text}\n`);
      return;
    }

    if (tag === "p") {
      const text = $(el).text().trim();
      if (text) lines.push(`\n\n${text}`);
      return;
    }

    if (tag === "li") {
      const text = $(el).text().trim();
      if (text) lines.push(`\n- ${text}`);
      return;
    }

    if (tag === "br") {
      lines.push("\n");
      return;
    }

    $(el)
      .contents()
      .each((_, child) => walk(child));
  }

  $("body")
    .contents()
    .each((_, el) => walk(el));

  return lines
    .join("")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function scrapeScholarship(url: string, universityCode: string) {
  console.log(`Fetching: ${url}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const html = await response.text();

  console.log("Parsing HTML...");
  const $ = cheerio.load(html);
  const pageText = extractStructuredText($);

  console.log("Extracting scholarship content with AI...");
  const prompt = await promptTemplate.invoke({ url, text: pageText });
  const result = await structuredLlm.invoke(prompt);

  console.log(`Title: ${result.scholarship_name}`);

  const filename = result.scholarship_name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const finalContent = `${url}\n\n${result.content}`;

  const outputDir = path.join(process.cwd(), "scholarships", universityCode);
  await fs.mkdir(outputDir, { recursive: true });

  const filePath = path.join(outputDir, `${filename}.txt`);

  let exists = false;
  try {
    await fs.access(filePath);
    exists = true;
  } catch {
    // file doesn't exist
  }
  if (exists) {
    console.warn(`Warning: overwriting existing file: ${filePath}`);
  }

  await fs.writeFile(filePath, finalContent, "utf-8");

  console.log(`Saved: ${filePath}`);
  return filePath;
}

(async () => {
  try {
    await scrapeScholarship(url, universityCode);
    console.log("\nDone.");
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  }
})();
