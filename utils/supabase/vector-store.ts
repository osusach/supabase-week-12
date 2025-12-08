import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SelfQueryRetriever } from "langchain/retrievers/self_query";
import { SupabaseTranslator } from "@langchain/community/structured_query/supabase";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import type { AttributeInfo } from "langchain/chains/query_constructor";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLISHABLE_KEY!,
);

export const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  queryName: "match_documents",
  tableName: "documents",
});

const retriever = vectorStore.asRetriever();

const attributeInfo: AttributeInfo[] = [
  {
    name: "institution",
    description: "The institution offering the scholarship",
    type: "string",
  },
  {
    name: "section",
    description:
      "The section of the scholarship information (e.g., selection, renewal)",
    type: "string",
  },
  {
    name: "scholarship_name",
    description: "The name of the scholarship",
    type: "string",
  },
];

const selfQueryRetriever = SelfQueryRetriever.fromLLM({
  attributeInfo,
  documentContents: "Sections of scholarship information",
  llm,
  structuredQueryTranslator: new SupabaseTranslator(),
  vectorStore,
});

export { retriever, selfQueryRetriever };
