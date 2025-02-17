import Image from "next/image";
import Link from "next/link";
import { PuzzleIcon, TelescopeIcon, UserPenIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    answer:
      "ChileBecas utiliza la información que proporcionas, como tu lugar de origen y lo que te interesa estudiar, para recomendarte becas que mejor se ajusten a tu perfil académico y financiero. Analizamos miles de oportunidades para ofrecerte las opciones más relevantes.",
    id: 0,
    question: "¿Cómo me conecta ChileBecas con becas?",
  },
  {
    answer:
      "Sí, ChileBecas es completamente gratuito para todos los estudiantes. Nuestro objetivo es ayudarte a encontrar la ayuda financiera que necesitas sin ningún costo.",
    id: 1,
    question: "¿ChileBecas es gratuito?",
  },
  {
    answer:
      "Actualizamos nuestra base de datos de becas regularmente para que siempre tengas acceso a las últimas oportunidades. Esto incluye nuevas becas, cambios en fechas límite y actualizaciones en los criterios de elegibilidad.",
    id: 2,
    question: "¿Con qué frecuencia se actualiza la información sobre becas?",
  },
];

const features = [
  {
    description:
      "Comparte información clave como de dónde eres y qué quieres estudiar. Esto nos ayuda a entender tus necesidades y preferencias para encontrar becas que se adapten perfectamente a ti.",
    icon: UserPenIcon,
    id: 0,
    title: "Cuéntanos sobre ti",
  },
  {
    description:
      "Basándonos en tu perfil, nuestra plataforma te conecta con oportunidades de becas personalizadas. Explora opciones de ayuda financiera que se alineen con tus intereses académicos y tu trayectoria personal.",
    icon: PuzzleIcon,
    id: 1,
    title: "Recibe becas a tu medida",
  },
  {
    description:
      "¿Quieres más opciones? Revisa nuestro amplio directorio de becas y encuentra oportunidades adicionales más allá de tus coincidencias personalizadas.",
    icon: TelescopeIcon,
    id: 2,
    title: "Explora y descubre (Próximamente)",
  },
];

export default async function Index() {
  return (
    <>
      <header className={"bg-white"}>
        <div className={"mx-auto w-full max-w-screen-xl px-2.5 md:px-20"}>
          <div className={"flex flex-row justify-between items-center h-16"}>
            <div>
              <Link className={"flex flex-row items-center gap-1"} href={"/"}>
                <Image
                  alt={"ChileBecas logo"}
                  height={40}
                  src={"/logo.svg"}
                  width={40}
                />
                <span className={"text-xl font-semibold"}>ChileBecas</span>
              </Link>
            </div>
            <div>
              <Button asChild variant={"outline"}>
                <Link href={"/sign-in"}>Iniciar sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className={"mx-auto w-full max-w-screen-xl px-2.5 py-20 md:px-20"}>
        <div
          className={"mx-auto text-center flex flex-col items-center max-w-3xl"}
        >
          <h1
            className={
              "text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            }
          >
            Encuentra la beca ideal para tu futuro
          </h1>
          <p className={"mt-6 text-lg max-w-prose text-muted-foreground"}>
            Descubre oportunidades de becas personalizadas que se ajustan a tus
            metas académicas y necesidades financieras, todo en un solo lugar.
          </p>
          <Button asChild className={"mt-6"} size={"lg"}>
            <Link href={"/get-started"}>Encuentra tu beca</Link>
          </Button>
        </div>
      </div>
      {/* Features */}
      <section className={"border-t border-b border-gray-200 bg-gray-50"}>
        <div className={"mx-auto w-full max-w-screen-xl px-2.5 py-20 md:px-20"}>
          <div
            className={
              "grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0"
            }
          >
            {features.map((feature) => (
              <div
                className={
                  "text-center md:flex md:flex-row md:items-start md:text-left lg:block lg:text-center"
                }
                key={feature.id}
              >
                <div
                  className={"flex flex-row justify-center md:flex-shrink-0"}
                >
                  <div
                    className={
                      "h-16 w-16 flex flex-row justify-center items-center rounded-full bg-blue-100 text-blue-900 lg:h-20 lg:w-20"
                    }
                  >
                    {<feature.icon className={"h-6 w-6 lg:h-7 lg:w-7"} />}
                  </div>
                </div>
                <div className={"mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6"}>
                  <h3 className={"text-base font-medium text-gray-900"}>
                    {feature.title}
                  </h3>
                  <p className={"mt-3 text-sm text-muted-foreground"}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section>
        <div className={"mx-auto w-full max-w-screen-xl px-2.5 py-20 md:px-20"}>
          <h2 className={"text-center text-xl font-medium sm:text-2xl"}>
            Preguntas frecuentes
          </h2>
          <Accordion
            className={"mx-auto mt-6 max-w-screen-sm"}
            collapsible
            type={"single"}
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id.toString()}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <footer className={"bg-white h-16"}>
        <div className={"mx-auto w-full max-w-screen-xl px-2.5 md:px-20"}>
          <div className={"flex flex-row justify-center items-center gap-4"}>
            <a
              className={"underline underline-offset-2"}
              href={"https://github.com/osusach/supabase-week-12"}
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
