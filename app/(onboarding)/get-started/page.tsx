import type { Metadata } from "next";

import OnboardingForm from "@/components/onboarding-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default function GetStartedPage() {
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
        <OnboardingForm />
      </CardContent>
    </Card>
  );
}
