import { getScholarships } from "@/lib/queries/scholarships";

import { ScholarshipFilters } from "@/components/filters/scholarship-filters";
import { DirectoryScholarshipCard } from "@/components/directory-scholarship-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

interface ScholarshipsPageProps {
  searchParams: Promise<{
    institutions?: string;
    benefits?: string;
  }>;
}

export default async function ScholarshipsPage({
  searchParams,
}: ScholarshipsPageProps) {
  const params = await searchParams;

  // Parse filter parameters from URL
  const selectedInstitutions = params.institutions?.split(",") || [];
  const selectedBenefits = params.benefits?.split(",") || [];

  // Fetch scholarships data
  const result = await getScholarships({
    institutions:
      selectedInstitutions.length > 0 ? selectedInstitutions : undefined,
    benefits: selectedBenefits.length > 0 ? selectedBenefits : undefined,
  });

  const scholarships = result.success ? result.data : [];

  return (
    <div className={"min-h-screen flex flex-col"}>
      <Header />

      {/* Hero Section */}
      <section
        className={"bg-gradient-to-br from-background to-muted/30 border-b"}
      >
        <div
          className={
            "mx-auto w-full max-w-screen-xl px-4 py-16 md:px-8 md:py-20"
          }
        >
          <div className={"max-w-3xl"}>
            <h1
              className={
                "text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              }
            >
              Directorio de Becas
            </h1>
            <p className={"mt-6 text-lg text-muted-foreground"}>
              Explora becas disponibles y filtra por institución o tipo de
              beneficio.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={"flex-1 bg-background"}>
        <div
          className={
            "mx-auto w-full max-w-screen-xl px-4 py-12 md:px-8 md:py-16"
          }
        >
          <div className={"grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8"}>
            {/* Filters Sidebar */}
            <aside className={"lg:col-span-1"}>
              <ScholarshipFilters />
            </aside>
            {/* Scholarships Grid */}
            <div className={"lg:col-span-3"}>
              <div className={"mb-6"}>
                <p className={"text-sm text-muted-foreground"}>
                  {scholarships.length}{" "}
                  {scholarships.length === 1
                    ? "beca encontrada"
                    : "becas encontradas"}
                </p>
              </div>

              {scholarships.length > 0 ? (
                <div
                  className={
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
                  }
                >
                  {scholarships.map((scholarship) => (
                    <DirectoryScholarshipCard
                      key={scholarship.id}
                      scholarship={scholarship}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className={
                    "flex flex-col items-center justify-center text-center py-16 px-4"
                  }
                >
                  <div className={"max-w-md"}>
                    <p className={"text-lg font-medium text-foreground mb-2"}>
                      No se encontraron becas
                    </p>
                    <p className={"text-sm text-muted-foreground"}>
                      Intenta ajustar los filtros para ver más resultados.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
