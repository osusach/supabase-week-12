import dotenv from "dotenv";
import path from "path";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

// Environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;

if (!OPENAI_API_KEY || !SUPABASE_SECRET_KEY || !SUPABASE_URL) {
  console.error("Missing required environment variables:");
  console.error("- OPENAI_API_KEY:", OPENAI_API_KEY ? "✓" : "✗");
  console.error("- SUPABASE_SECRET_KEY:", SUPABASE_SECRET_KEY ? "✓" : "✗");
  console.error("- SUPABASE_URL:", SUPABASE_URL ? "✓" : "✗");
  process.exit(1);
}

interface ScholarshipInfo {
  application: string | null;
  eligibility: string | null;
  institution: string | null;
  name: string | null;
  overview: string | null;
  renewal: string | null;
  selection: string | null;
}

const embeddings = new OpenAIEmbeddings({
  apiKey: OPENAI_API_KEY,
  model: "text-embedding-3-small",
});

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

export const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "documents",
});

const scholarshipSchema = z.object({
  application: z.nullable(z.string()).describe("Application process details"),
  eligibility: z
    .nullable(z.string())
    .describe("Eligibility criteria for the scholarship"),
  institution: z
    .nullable(z.string())
    .describe("The institution offering the scholarship"),
  name: z.nullable(z.string()).describe("The name of the scholarship"),
  overview: z
    .nullable(z.string())
    .describe("A brief overview of the scholarship"),
  renewal: z.nullable(z.string()).describe("Renewal conditions"),
  selection: z.nullable(z.string()).describe("Selection process details"),
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert extraction algorithm.
    Only extract relevant information from the text.
    If you do not know the value of an attribute asked to extract,
    return null for the attribute's value.`,
  ],
  ["human", "{text}"],
]);

const llm = new ChatOpenAI({
  apiKey: OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0,
});
const structured_llm = llm.withStructuredOutput(scholarshipSchema, {
  name: "scholarship_extractor",
});

async function extractScholarshipInfo(
  rawText: string,
): Promise<ScholarshipInfo> {
  const prompt = await promptTemplate.invoke({ text: rawText });
  const result = await structured_llm.invoke(prompt);

  return {
    application: result.application,
    eligibility: result.eligibility,
    institution: result.institution,
    name: result.name,
    overview: result.overview,
    renewal: result.renewal,
    selection: result.selection,
  };
}

async function processScholarshipDocument(
  content: string,
  metadata: {
    institution: string | null;
    scholarship_name: string | null;
    section: string;
  },
) {
  try {
    const processedMetadata = {
      institution: metadata.institution || "Unknown Institution",
      scholarship_name: metadata.scholarship_name || "Unknown Scholarship",
      section: metadata.section,
    };

    const document = new Document({
      metadata: processedMetadata,
      pageContent: content,
    });

    await vectorStore.addDocuments([document]);
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
}

(async () => {
  try {
    // Read the scholarship.txt content
    const fs = await import("fs/promises");
    const path = await import("path");

    const scholarshipPath = path.join(process.cwd(), "scholarship.txt");
    const scholarshipContent = await fs.readFile(scholarshipPath, "utf-8");

    console.log("Reading scholarship content from:", scholarshipPath);

    // Extract structured information
    const result = await extractScholarshipInfo(scholarshipContent);
    console.log("Extraction result:", result);

    // Process each section and store in vector store
    for (const section of [
      "application",
      "eligibility",
      "overview",
      "renewal",
      "selection",
    ]) {
      const sectionContent = result[section as keyof ScholarshipInfo];

      if (!sectionContent) {
        console.log(`Skipping empty section: ${section}`);
        continue;
      }

      await processScholarshipDocument(sectionContent, {
        institution: result.institution,
        scholarship_name: result.name,
        section,
      });
    }

    console.log("Extraction and processing completed");
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  }
})();
