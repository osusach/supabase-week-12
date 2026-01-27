import { Filter, MessageSquare, Search } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

const howItWorks = [
  {
    description: "Busca entre decenas de becas disponibles en Chile.",
    icon: Search,
    id: 1,
    title: "Explora",
  },
  {
    description:
      "Ajusta los resultados según tu nivel de estudios, región o tipo de ayuda.",
    icon: Filter,
    id: 2,
    title: "Filtra",
  },
  {
    description:
      "Usa el Asistente de becas para resolver tus dudas en lenguaje natural.",
    icon: MessageSquare,
    id: 3,
    title: "Aprende",
  },
];

export default async function Index() {
  return (
    <div className={"min-h-screen flex flex-col"}>
      <Header />

      {/* Hero Section */}
      <section className={"bg-gradient-to-br from-background to-muted/30"}>
        <div className={"mx-auto w-full max-w-screen-xl px-4 py-20 md:px-8"}>
          <div
            className={
              "mx-auto text-center flex flex-col items-center max-w-3xl"
            }
          >
            <h1
              className={
                "text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
              }
            >
              Encuentra becas fácilmente en un solo lugar
            </h1>
            <p className={"mt-6 text-lg max-w-prose text-muted-foreground"}>
              ChileBecas reúne becas de universidades, fundaciones y organismos
              públicos para que puedas encontrar oportunidades según tu perfil.
            </p>
            <div className={"flex gap-4 mt-8"}>
              <Button asChild size={"lg"}>
                <Link href={"/scholarships"}>Explorar becas</Link>
              </Button>
              <Button asChild size={"lg"} variant={"outline"}>
                <Link href={"/ask"}>Hablar con el asistente</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={"border-t bg-background"}>
        <div className={"mx-auto w-full max-w-screen-xl px-4 py-20 md:px-8"}>
          <h2
            className={"text-center text-3xl font-bold text-foreground mb-12"}
          >
            Cómo funciona ChileBecas
          </h2>
          <div
            className={
              "grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0"
            }
          >
            {howItWorks.map((item) => (
              <div className={"text-center"} key={item.id}>
                <div className={"flex flex-row justify-center"}>
                  <div
                    className={
                      "h-16 w-16 flex flex-row justify-center items-center rounded-full bg-primary/10 text-primary"
                    }
                  >
                    <item.icon className={"h-7 w-7"} />
                  </div>
                </div>
                <div className={"mt-6"}>
                  <h3 className={"text-lg font-semibold text-foreground"}>
                    {item.title}
                  </h3>
                  <p className={"mt-3 text-sm text-muted-foreground"}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={"flex justify-center mt-12"}>
            <Button asChild size={"lg"}>
              <Link href={"/scholarships"}>Ver todas las becas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={"border-t bg-muted/30"}>
        <div className={"mx-auto w-full max-w-screen-xl px-4 py-20 md:px-8"}>
          <div className={"mx-auto max-w-3xl text-center"}>
            <h2 className={"text-3xl font-bold text-foreground mb-6"}>
              Nuestra misión
            </h2>
            <p className={"text-lg text-muted-foreground leading-relaxed"}>
              En ChileBecas queremos que ningún estudiante pierda una
              oportunidad por falta de información. Creamos una plataforma
              simple, gratuita y abierta para que encontrar becas sea más fácil
              que nunca.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
