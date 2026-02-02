import { ScholarshipFilters } from "@/components/filters/scholarship-filters";
import { SearchFilter } from "@/components/filters/search-filter";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InfiniteScholarshipsList } from "@/components/infinite-scholarships-list";
import { getScholarships } from "@/lib/queries/scholarships";

interface ScholarshipsPageProps {
  searchParams: Promise<{
    benefits?: string;
    institutions?: string;
    search?: string;
    study_levels?: string;
  }>;
}

export default async function ScholarshipsPage({
  searchParams,
}: ScholarshipsPageProps) {
  const params = await searchParams;

  // Parse filter parameters from URL
  const searchQuery = params.search || undefined;
  const selectedBenefits = params.benefits?.split(",") || [];
  const selectedInstitutions = params.institutions?.split(",") || [];
  const selectedStudyLevels = params.study_levels?.split(",") || [];

  // Prepare filters object
  const filters = {
    benefits: selectedBenefits.length > 0 ? selectedBenefits : undefined,
    institutions:
      selectedInstitutions.length > 0 ? selectedInstitutions : undefined,
    search: searchQuery,
    studyLevels:
      selectedStudyLevels.length > 0 ? selectedStudyLevels : undefined,
  };

  // Fetch initial scholarships data (first page)
  const result = await getScholarships(filters, 1, 12);

  const scholarships = result.success ? result.data : [];
  const total = result.success ? result.total : 0;

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
              {/* Search Bar */}
              <div className={"mb-6"}>
                <SearchFilter />
              </div>

              <InfiniteScholarshipsList
                initialScholarships={scholarships}
                initialTotal={total}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
