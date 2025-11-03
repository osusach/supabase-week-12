import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { NextRequest } from "next/server";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createUIMessageStreamResponse, type UIMessage } from "ai";
import { toUIMessageStream } from "@ai-sdk/langchain";
import type { Document } from "@langchain/core/documents";

import { selfQueryRetriever } from "@/utils/supabase/vector-store";

const model = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

export async function POST(req: NextRequest) {
  const {
    messages,
  }: {
    messages: UIMessage[];
  } = await req.json();

  const messageHistory = messages.map((msg) =>
    msg.role === "user"
      ? new HumanMessage(
          msg.parts
            .map((part) => (part.type === "text" ? part.text : ""))
            .join(""),
        )
      : new AIMessage(
          msg.parts
            .map((part) => (part.type === "text" ? part.text : ""))
            .join(""),
        ),
  );

  // Format conversation history for prompts
  const conversationHistory = messageHistory
    .slice(0, -1)
    .map((msg) =>
      msg instanceof HumanMessage
        ? `Usuario: ${msg.content}`
        : `Asistente: ${msg.content}`,
    )
    .join("\n");

  // Get the last user message
  const lastMessage = messageHistory[messageHistory.length - 1] as HumanMessage;
  const question = lastMessage.content;

  const standaloneQuestionTemplate = `Given a conversation history (if any) and a question, convert it to a standalone question.
    Conversation history: {conv_history}
    Question: {question}
    Standalone question:`;
  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    standaloneQuestionTemplate,
  );
  const answerTemplate = `You are a virtual assistant that answers questions about scholarships and financial aid.
    Always respond in Spanish. Use only the information provided in the context and conversation history to generate
    your answer. If the answer is clearly found in the context, explain it in a concise, clear, and helpful way. If
    the answer is not in the context, find the answer in the conversation history if possible. If you really don't
    know the answer, respond exactly with: "Lo siento, no tengo esa información en este momento. Por favor envíanos
    tu pregunta por correo electrónico para que podamos ayudarte mejor.". Do not invent or guess information.
    Context: {context}
    Conversation history: {conv_history}
    Question: {question}
    Answer:`;
  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  const standaloneQuestionChain = standaloneQuestionPrompt
    .pipe(model)
    .pipe(new StringOutputParser());
  const retrieverChain = RunnableSequence.from([
    (input) => input.standalone_question,
    selfQueryRetriever,
    (input) => ({
      context: input.map((doc: Document) => JSON.stringify(doc)).join("\n\n"),
    }),
  ]);
  const answerChain = answerPrompt.pipe(model).pipe(new StringOutputParser());
  const chain = RunnableSequence.from([
    {
      original_input: new RunnablePassthrough(),
      standalone_question: standaloneQuestionChain,
    },
    {
      context: retrieverChain,
      conv_history: ({ original_input }) => original_input.conv_history,
      question: ({ original_input }) => original_input.question,
    },
    answerChain,
  ]);

  const response = await chain.stream({
    conv_history: conversationHistory,
    question: question,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream(response),
  });
}
