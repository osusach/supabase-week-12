import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Scholarship } from "@/lib/queries/scholarships";

const BENEFIT_TYPE_LABELS: Record<string, string> = {
  tuition: "Arancel",
  housing: "Alojamiento",
  maintenance: "Manutención",
  other: "Otro",
};

interface DirectoryScholarshipCardProps {
  scholarship: Scholarship;
}

export function DirectoryScholarshipCard({
  scholarship,
}: DirectoryScholarshipCardProps) {
  const { name, overview, benefit_types, url, institution } = scholarship;

  // Use institution logo or fallback to default placeholder
  const logoSrc = institution?.image_url
    ? institution.image_url
    : "/institutions/fallback.png";

  return (
    <Card
      className={
        "flex flex-col h-full shadow-none hover:shadow-md transition-shadow duration-200"
      }
    >
      <CardHeader className={"space-y-3"}>
        {/* Institution Logo and Name */}
        <div className={"flex items-center gap-3"}>
          <div
            className={
              "relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-muted"
            }
          >
            <Image
              src={logoSrc}
              alt={institution?.name || "Institución"}
              fill
              className={"object-contain p-1"}
              sizes={"48px"}
            />
          </div>
          <div className={"flex-1 min-w-0"}>
            <p className={"text-sm font-medium text-muted-foreground truncate"}>
              {institution?.name || "Sin institución"}
            </p>
          </div>
        </div>

        {/* Scholarship Name */}
        <CardTitle className={"text-lg leading-tight line-clamp-2"}>
          {name}
        </CardTitle>

        {/* Overview */}
        {overview && (
          <CardDescription className={"text-sm line-clamp-3"}>
            {overview}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className={"flex-1"}>
        {/* Benefit Type Badges */}
        {benefit_types && benefit_types.length > 0 && (
          <div className={"flex flex-wrap gap-2"}>
            {benefit_types.map((type) => (
              <Badge key={type} variant="secondary" className={"text-xs"}>
                {BENEFIT_TYPE_LABELS[type] || type}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className={"pt-0"}>
        {url ? (
          <Button asChild variant={"outline"} className={"w-full"} size={"sm"}>
            <Link href={url} target="_blank" rel="noopener noreferrer">
              Ver sitio oficial
              <ExternalLink className={"ml-2 h-4 w-4"} />
            </Link>
          </Button>
        ) : (
          <Button variant={"outline"} className={"w-full"} size={"sm"} disabled>
            Sin enlace disponible
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
