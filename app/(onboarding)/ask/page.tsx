"use client";

import { DefaultChatTransport } from "ai";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AskPage() {
  const { error, messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ask",
    }),
  });
  const [input, setInput] = useState<string>("");

  const quickQuestions = [
    "¿Qué becas están disponibles para estudiantes de regiones?",
    "¿Cuáles son los requisitos generales para postular a becas?",
    "¿Hay becas disponibles para estudiantes de bajos recursos?",
  ];

  return (
    <div
      className={"min-h-screen bg-gradient-to-br from-background to-muted/30"}
    >
      <div className={"mx-auto px-4 py-8 max-w-4xl"}>
        {/* Header */}
        <div className={"text-center mb-8"}>
          <h1 className={"text-4xl font-bold text-foreground mb-2"}>
            Ask Chile Becas
          </h1>
          <p className={"text-muted-foreground text-lg"}>
            Pregunta lo que necesites sobre becas y ayuda financiera.
          </p>
        </div>

        {/* Chat Interface */}
        <Card className={"shadow-lg border-0 bg-card/50 backdrop-blur-sm"}>
          <CardHeader className="border-b bg-muted/10">
            <CardTitle
              className={
                "text-center text-lg font-medium flex items-center justify-center gap-2"
              }
            >
              <Bot className={"h-5 w-5 text-primary"} />
              Chat con Chile Becas
            </CardTitle>
          </CardHeader>

          <CardContent className={"p-0"}>
            {/* Messages Container */}
            <div className={"h-[60vh] overflow-y-auto p-6 space-y-4"}>
              {messages.length === 0 && (
                <div className={"text-center py-12"}>
                  <Bot
                    className={"h-12 w-12 text-muted-foreground mx-auto mb-4"}
                  />
                  <h3 className={"text-lg font-medium text-foreground mb-2"}>
                    ¡Hola! Soy tu asistente de becas
                  </h3>
                  <p className={"text-muted-foreground"}>
                    Puedes preguntarme sobre becas, requisitos, procesos de
                    postulación y más. ¿En qué te puedo ayudar hoy?
                  </p>
                  <div className={"flex flex-wrap justify-center gap-2 mt-4"}>
                    <Badge className={"text-xs"} variant={"outline"}>
                      Becas por mérito académico
                    </Badge>
                    <Badge className={"text-xs"} variant={"outline"}>
                      Ayuda financiera
                    </Badge>
                    <Badge className={"text-xs"} variant={"outline"}>
                      Requisitos de postulación
                    </Badge>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 max-w-[80%]",
                    message.role === "user" ? "ml-auto" : "mr-auto",
                  )}
                >
                  {message.role === "assistant" && (
                    <div className={"flex-shrink-0"}>
                      <div
                        className={
                          "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                        }
                      >
                        <Bot className={"h-4 w-4 text-primary"} />
                      </div>
                    </div>
                  )}

                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 max-w-full",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {message.parts.map((part, index) =>
                      part.type === "text" ? (
                        <p
                          className={
                            "text-sm leading-relaxed whitespace-pre-wrap"
                          }
                          key={index}
                        >
                          {part.text}
                        </p>
                      ) : null,
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className={"flex-shrink-0"}>
                      <div
                        className={
                          "w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                        }
                      >
                        <User className={"h-4 w-4 text-secondary-foreground"} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {error && (
                <>
                  <p>
                    Lo sentimos, ha ocurrido un error. Por favor, inténtalo de
                    nuevo más tarde.
                  </p>
                </>
              )}

              {/* Typing Indicator */}
              {status !== "ready" && (
                <div className={"flex gap-3 max-w-[80%] mr-auto"}>
                  <div className={"flex-shrink-0"}>
                    <div
                      className={
                        "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                      }
                    >
                      <Bot className={"h-4 w-4 text-primary"} />
                    </div>
                  </div>
                  <div className={"bg-muted rounded-2xl px-4 py-3"}>
                    <div className={"flex items-center gap-2"}>
                      <Loader2
                        className={"h-4 w-4 animate-spin text-muted-foreground"}
                      />
                      <span className={"text-sm text-muted-foreground"}>
                        Escribiendo...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className={"border-t bg-muted/5 p-4"}>
              <form
                className={"flex gap-3"}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (input.trim()) {
                    sendMessage({ text: input });
                    setInput("");
                  }
                }}
              >
                <div className={"flex-1 relative"}>
                  <Input
                    className={
                      "pr-12 py-3 text-sm bg-background border-input/50 focus:border-primary/50"
                    }
                    disabled={status !== "ready"}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={"Escribe tu pregunta aquí..."}
                    value={input}
                  />
                </div>
                <Button
                  className={"h-10 w-10 shrink-0"}
                  disabled={status !== "ready" || !input.trim()}
                  size={"icon"}
                  type={"submit"}
                >
                  {status !== "ready" ? (
                    <Loader2 className={"h-4 w-4 animate-spin"} />
                  ) : (
                    <Send className={"h-4 w-4"} />
                  )}
                </Button>
              </form>

              <p className={"text-xs text-muted-foreground mt-2 text-center"}>
                Este asistente usa información actualizada sobre becas y ayuda
                financiera
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className={"mt-6 flex flex-wrap justify-center gap-2"}>
          {quickQuestions.map((question, index) => (
            <button
              className={
                "text-xs bg-secondary/50 hover:bg-secondary text-secondary-foreground px-3 py-2 rounded-full transition-colors disabled:opacity-50"
              }
              disabled={status !== "ready"}
              key={index}
              onClick={() => setInput(question)}
            >
              {question.length > 40
                ? `${question.substring(0, 40)}...`
                : question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
