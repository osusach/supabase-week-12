import dotenv from "dotenv";
import path from "path";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
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

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

const benefitTypeEnum = z.enum(["tuition", "housing", "maintenance", "other"]);

const scholarshipSchema = z.object({
  name: z.string().describe("The official name of the scholarship"),
  institution_name: z
    .string()
    .describe(
      "The institution offering the scholarship (e.g., 'Universidad de Chile')",
    ),
  overview: z
    .string()
    .describe(
      "A brief 2-3 sentence overview of the scholarship, highlighting key benefits and eligibility",
    ),
  benefit_types: z
    .array(benefitTypeEnum)
    .describe(
      "Array of benefit types. Use 'tuition' for tuition/arancel coverage, 'housing' for residency/accommodation, 'maintenance' for monthly stipends, 'other' for anything else. A scholarship can have multiple benefit types.",
    ),
  url: z
    .string()
    .regex(
      /^https?:\/\/.+/,
      "URL must start with http:// or https:// and contain a domain",
    )
    .describe(
      "The official URL of the scholarship that must be explicitly mentioned in the text",
    ),
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert extraction algorithm.
    Only extract relevant information from the text.
    If you do not know the value of an attribute asked to extract,
    return null for the attribute's value.
    
    For benefit_types, carefully analyze what the scholarship provides:
    - 'tuition': if it covers arancel, matrícula, or tuition fees
    - 'housing': if it provides residencia, alojamiento, or housing
    - 'maintenance': if it provides monthly money, manutención, or living stipend
    - 'other': for any other benefits not covered above
    
    A scholarship can have multiple benefit types.
    
    For the overview, create a brief 1-2 sentence summary in Spanish (maximum 120 characters).
    Focus ONLY on the core benefit and target audience. Be concise and direct.
    This will be displayed as a preview, so it must be punchy and informative.
    Example format: "Cubre [beneficio] para [audiencia objetivo]."
    The overview MUST be written in Spanish.`,
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

async function extractScholarshipInfo(rawText: string) {
  const prompt = await promptTemplate.invoke({ text: rawText });
  const result = await structured_llm.invoke(prompt);

  return {
    name: result.name,
    institution_name: result.institution_name,
    overview: result.overview,
    benefit_types: result.benefit_types,
    url: result.url,
  };
}

async function getInstitutionId(institutionName: string): Promise<number> {
  const { data, error } = await supabaseClient
    .from("institutions")
    .select("id")
    .eq("name", institutionName)
    .single();

  if (error || !data) {
    throw new Error(
      `Institution "${institutionName}" not found in database. Error: ${error?.message}`,
    );
  }

  return data.id;
}

async function insertScholarship(
  extraction: Awaited<ReturnType<typeof extractScholarshipInfo>>,
  institutionId: number,
): Promise<void> {
  const { error } = await supabaseClient.from("scholarships").insert({
    name: extraction.name,
    institution_id: institutionId,
    overview: extraction.overview,
    benefit_types: extraction.benefit_types,
    url: extraction.url,
  });

  if (error) {
    throw new Error(`Failed to insert scholarship: ${error.message}`);
  }
}

(async () => {
  try {
    // Read the scholarship.txt content
    const fs = await import("fs/promises");
    const path = await import("path");

    const scholarshipPath = path.join(
      process.cwd(),
      "scholarships",
      "beca-de-apoyo-preescolar.txt",
    );
    const scholarshipContent = await fs.readFile(scholarshipPath, "utf-8");

    console.log("Reading scholarship content from:", scholarshipPath);

    // Extract structured information
    console.log("Extracting scholarship information...");
    const result = await extractScholarshipInfo(scholarshipContent);
    console.log("Extraction result:", JSON.stringify(result, null, 2));

    // Get institution ID
    console.log(`Looking up institution: ${result.institution_name}`);
    const institutionId = await getInstitutionId(result.institution_name);
    console.log(`Institution ID: ${institutionId}`);

    // Insert into database
    console.log("Inserting scholarship into database...");
    await insertScholarship(result, institutionId);

    console.log("Scholarship successfully added to database.");
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  }
})();
