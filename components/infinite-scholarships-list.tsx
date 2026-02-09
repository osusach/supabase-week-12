"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { fetchMoreScholarships } from "@/actions/scholarships";
import { DirectoryScholarshipCard } from "@/components/directory-scholarship-card";
import type { Scholarship } from "@/lib/queries/scholarships";

interface InfiniteScholarshipsListProps {
  filters: {
    benefits?: string[];
    institutions?: string[];
    search?: string;
    studyLevels?: string[];
  };
  initialScholarships: Scholarship[];
  initialTotal: number;
}

export function InfiniteScholarshipsList({
  filters,
  initialScholarships,
  initialTotal,
}: InfiniteScholarshipsListProps) {
  const [hasMore, setHasMore] = useState<boolean>(
    initialScholarships.length < initialTotal,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [scholarships, setScholarships] =
    useState<Scholarship[]>(initialScholarships);
  const [total, setTotal] = useState<number>(initialTotal);

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasMore && !isLoading) {
        loadMore();
      }
    },
    rootMargin: "100px",
    threshold: 0,
  });

  // Reset when filters change
  useEffect(() => {
    setHasMore(initialScholarships.length < initialTotal);
    setPage(1);
    setScholarships(initialScholarships);
    setTotal(initialTotal);
  }, [initialScholarships, initialTotal]);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const result = await fetchMoreScholarships(filters, nextPage);

      setHasMore(scholarships.length + result.data.length < result.total);
      setPage(nextPage);
      setScholarships((prev) => [...prev, ...result.data]);
    } catch (error) {
      console.error("Error loading more scholarships:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {scholarships.length > 0 && (
        <div className={"mb-6"}>
          <p className={"text-sm text-muted-foreground"}>
            Mostrando {scholarships.length} de {total}{" "}
            {total === 1 ? "beca" : "becas"}
          </p>
        </div>
      )}

      {scholarships.length > 0 ? (
        <>
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

          {/* Loading trigger and indicator */}
          {hasMore && (
            <div ref={ref} className={"mt-8 text-center py-4"}>
              <p className={"text-sm text-muted-foreground"}>
                {isLoading ? "Cargando becas..." : ""}
              </p>
            </div>
          )}
        </>
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
    </>
  );
}
