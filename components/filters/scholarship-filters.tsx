import { BenefitTypeFilter } from "@/components/filters/benefit-type-filter";
import { InstitutionFilter } from "@/components/filters/institution-filter";
import { StudyLevelFilter } from "@/components/filters/study-level-filter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInstitutions } from "@/lib/queries/institutions";
import {
  getScholarshipCountsByBenefit,
  getScholarshipCountsByInstitution,
  getScholarshipCountsByStudyLevel,
} from "@/lib/queries/scholarships";

export async function ScholarshipFilters() {
  // Fetch institutions and counts in parallel
  const [institutions, institutionCounts, benefitCounts, studyLevelCounts] =
    await Promise.all([
      getInstitutions(),
      getScholarshipCountsByInstitution(),
      getScholarshipCountsByBenefit(),
      getScholarshipCountsByStudyLevel(),
    ]);

  // Filter out institutions with zero scholarships
  const institutionsWithScholarships = institutions.filter(
    (inst) => institutionCounts[inst.id] > 0,
  );

  // Calculate total scholarships (sum of institution counts since each scholarship belongs to one institution)
  const totalScholarships = Object.values(institutionCounts).reduce(
    (sum, count) => sum + count,
    0,
  );

  return (
    <div className={"sticky top-4"}>
      <Card className={"shadow-none"}>
        <CardHeader>
          <CardTitle className={"text-lg"}>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion
            className={"space-y-0"}
            defaultValue={["benefit-type", "institution", "study-level"]}
            type={"multiple"}
          >
            <AccordionItem value={"institution"}>
              <AccordionTrigger className={"text-sm font-medium py-3"}>
                Institución
              </AccordionTrigger>
              <AccordionContent className={"pb-4"}>
                <InstitutionFilter
                  counts={institutionCounts}
                  institutions={institutionsWithScholarships}
                  totalScholarships={totalScholarships}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value={"benefit-type"}>
              <AccordionTrigger className={"text-sm font-medium py-3"}>
                Tipo de Beneficio
              </AccordionTrigger>
              <AccordionContent className={"pb-4"}>
                <BenefitTypeFilter
                  counts={benefitCounts}
                  totalScholarships={totalScholarships}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value={"study-level"}>
              <AccordionTrigger className={"text-sm font-medium py-3"}>
                Nivel de estudio
              </AccordionTrigger>
              <AccordionContent className={"pb-4"}>
                <StudyLevelFilter
                  counts={studyLevelCounts}
                  totalScholarships={totalScholarships}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
