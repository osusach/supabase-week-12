import type { Metadata } from "next";

import OnboardingForm from "@/components/onboarding-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchFormOptions, fetchOnboardingMatch } from "@/lib/data";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default async function GetStartedPage() {
  const [cities, countries, extracurricularActivities, fieldsOfStudy, states] =
    await fetchFormOptions();
  const { matchResult, onboardingProfile } = await fetchOnboardingMatch();

  return (
    <Card className={"w-full max-w-2xl mx-auto"}>
      <CardHeader>
        <CardTitle>Find your perfect scholarship match</CardTitle>
        <CardDescription>
          Tell us a little about yourself! Your responses will help us match you
          with scholarships that align with your background and interests.
          Fields marked with an asterisk (*) are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OnboardingForm
          formOptions={{
            cities,
            countries,
            extracurricularActivities,
            fieldsOfStudy,
            states,
          }}
          matchResult={matchResult}
          onboardingProfile={onboardingProfile}
        />
      </CardContent>
    </Card>
  );
}
