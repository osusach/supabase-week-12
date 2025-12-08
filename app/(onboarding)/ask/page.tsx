import type { Metadata } from "next";

import { Header } from "@/components/header";
import { ChatWindow } from "@/components/chat-window";

export const metadata: Metadata = {
  description:
    "Hazle preguntas al Asistente de Becas de ChileBecas. Descubre becas para estudiantes de regiones, mujeres, extranjeros y más.",
  title: "Asistente de Becas",
};

export default function AskPage() {
  return (
    <div
      className={"min-h-screen bg-gradient-to-br from-background to-muted/30"}
    >
      <Header />

      <div className={"mx-auto px-4 py-8 max-w-4xl"}>
        {/* Page Header */}
        <div className={"text-center mb-8"}>
          <h1 className={"text-4xl font-bold text-foreground mb-2"}>
            Asistente de Becas
          </h1>
          <p className={"text-muted-foreground text-lg"}>
            Pregunta lo que necesites sobre becas y ayuda financiera.
          </p>
        </div>

        <ChatWindow />
      </div>
    </div>
  );
}
