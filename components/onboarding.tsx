"use client";

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GraduationCapIcon,
  PuzzleIcon,
  RocketIcon,
  UserIcon,
} from "lucide-react";
import {
  format,
  getMonth,
  getYear,
  parseISO,
  setMonth,
  setYear,
} from "date-fns";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import ScholarshipCard from "@/components/scholarship-card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MatchFeedback } from "@/components/match-feedback";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  birthYears,
  educationLevels,
  genders,
  graduationYears,
  months,
} from "@/config/form-options";
import { matchScholarships, type MatchResult } from "@/actions/scholarships";
import {
  onboardingSchema,
  type OnboardingSchema,
} from "@/lib/schemas/onboarding-schema";
import type {
  City,
  Country,
  ExtracurricularActivity,
  FieldOfStudy,
  OnboardingProfile,
  State,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const onboardingSteps = [
  {
    fields: [
      "basicInformation.cityId",
      "basicInformation.countryId",
      "basicInformation.dateOfBirth",
      "basicInformation.firstName",
      "basicInformation.gender",
      "basicInformation.lastName",
      "basicInformation.stateId",
    ],
    icon: UserIcon,
    label: "Basic Information",
  },
  {
    fields: [
      "academicBackground.educationLevel",
      "academicBackground.lastAttendedInstitution",
      "academicBackground.fieldOfStudyId",
      "academicBackground.graduationYear",
      "academicBackground.intendedFieldOfStudyId",
    ],
    icon: GraduationCapIcon,
    label: "Academic Background",
  },
  {
    fields: ["extracurricularsIds", "additionalNotes"],
    icon: RocketIcon,
    label: "Career & Personal Interests",
  },
  { icon: PuzzleIcon, label: "Match" },
];

interface OnboardingProps {
  formOptions: {
    cities: City[];
    countries: Country[];
    extracurricularActivities: ExtracurricularActivity[];
    fieldsOfStudy: FieldOfStudy[];
    states: State[];
  };
  matchResult: MatchResult | null;
  onboardingProfile: OnboardingProfile | null;
}

function Onboarding({
  formOptions,
  matchResult,
  onboardingProfile,
}: OnboardingProps) {
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [currentStep, setCurrentStep] = useState<number>(
    onboardingProfile ? 3 : 0,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [match, setMatch] = useState<MatchResult | null>(matchResult);

  const defaultCountry = formOptions.countries.find(
    (country) => country.name === "Chile",
  );
  const form = useForm<OnboardingSchema>({
    defaultValues: {
      academicBackground: {
        educationLevel: onboardingProfile?.education_level ?? undefined,
        fieldOfStudyId: onboardingProfile?.field_of_study?.id,
        graduationYear:
          (onboardingProfile?.graduation_year as number | null) ?? undefined,
        intendedFieldOfStudyId: onboardingProfile?.intended_field_of_study?.id,
        lastAttendedInstitution:
          (onboardingProfile?.last_attended_institution as string | null) ?? "",
      },
      basicInformation: {
        cityId: onboardingProfile?.city?.id,
        dateOfBirth: onboardingProfile?.date_of_birth
          ? parseISO(onboardingProfile.date_of_birth)
          : undefined,
        firstName: onboardingProfile?.first_name ?? "",
        gender: onboardingProfile?.gender ?? undefined,
        lastName: onboardingProfile?.last_name ?? "",
        countryId:
          onboardingProfile?.city?.state.country_id ?? defaultCountry?.id,
        stateId: onboardingProfile?.city?.state.id,
      },
      personalInterests: {
        additionalNotes:
          (onboardingProfile?.additional_notes as string | null) ?? "",
        extracurricularsIds:
          onboardingProfile?.extracurricular_activities?.map(
            (activity) => activity.id,
          ) ?? [],
      },
    },
    resolver: zodResolver(onboardingSchema),
  });
  const educationLevel = form.watch("academicBackground.educationLevel");
  const countryId = form.watch("basicInformation.countryId");
  // Casting to 'unknown' and then to 'string' to resolve a type conflict
  // caused by 'react-hook-form' returning a number type from the schema,
  // while select values are strings.
  const stateId =
    typeof form.watch("basicInformation.stateId") === "string"
      ? parseInt(
          form.watch("basicInformation.stateId") as unknown as string,
          10,
        )
      : form.watch("basicInformation.stateId");

  const handleMonthChange = (month: string) => {
    const date = setMonth(birthDate, months.indexOf(month));
    setBirthDate(date);
  };

  const handleNextStep = async () => {
    const fields = onboardingSteps[currentStep].fields;
    // Validate current step fields before advancing to next step
    const validate = await form.trigger(fields as (keyof OnboardingSchema)[], {
      shouldFocus: true,
    });

    if (!validate) return;

    if (currentStep < onboardingSteps.length - 2) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 0) return;
    setCurrentStep((step) => step - 1);
  };

  const handleYearChange = (year: string) => {
    const date = setYear(birthDate, parseInt(year, 10));
    setBirthDate(date);
  };

  const onSubmit = async (values: OnboardingSchema) => {
    setCurrentStep((step) => step + 1);

    // Skip submission if a match already exists
    if (match !== null) return;

    const response = await matchScholarships(values);

    if (!response.success) {
      setMessage(response.message ?? "An error occurred.");
    }

    setMatch(response.data);
  };

  return (
    <div>
      <Card className={"w-full max-w-2xl mx-auto mb-5"}>
        <CardHeader>
          <CardTitle>Find your perfect scholarship match</CardTitle>
          <CardDescription>
            Tell us a little about yourself! Your responses will help us match
            you with scholarships that align with your background and interests.
            Fields marked with an asterisk (*) are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <nav aria-label={"Form progress"} className={"mb-5"}>
            <ol className={"md:flex md:space-x-4"}>
              {onboardingSteps.map((step, idx) => (
                <li
                  className={cn(
                    "flex flex-col py-4 space-y-4 md:flex-1",
                    idx <= currentStep && "border-t-2 border-t-blue-500",
                    idx !== currentStep && "hidden md:flex",
                  )}
                  key={step.label}
                >
                  <div
                    className={cn(
                      "flex h-20 w-20 rounded-full mx-auto bg-slate-50 justify-center items-center",
                      idx === currentStep && "ring ring-offset-2 ring-blue-500",
                    )}
                  >
                    <step.icon
                      className={cn(
                        "h-8 w-8 text-muted-foreground",
                        idx <= currentStep && "text-blue-500",
                      )}
                    />
                  </div>
                  <span className={"text-center text-sm font-medium"}>
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </nav>

          <Form {...form}>
            <form
              className={"grid grid-cols-1 gap-5 md:grid-cols-2"}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Basic Info step */}
              {currentStep === 0 && (
                <>
                  <FormField
                    control={form.control}
                    name={"basicInformation.firstName"}
                    render={({ field }) => (
                      <FormItem className={"col-span-1 space-y-2"}>
                        <FormLabel>
                          First name<span aria-hidden={true}>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              !!onboardingProfile || form.formState.isSubmitting
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"basicInformation.lastName"}
                    render={({ field }) => (
                      <FormItem className={"col-span-1 space-y-2"}>
                        <FormLabel>
                          Last name<span aria-hidden={true}>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              !!onboardingProfile || form.formState.isSubmitting
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"basicInformation.stateId"}
                    render={({ field }) => (
                      <FormItem className={"col-span-1 space-y-2"}>
                        <FormLabel>
                          State<span aria-hidden={true}>*</span>
                        </FormLabel>
                        <Select
                          defaultValue={field.value?.toString()}
                          disabled={
                            !!onboardingProfile || form.formState.isSubmitting
                          }
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={"Please select a state"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {formOptions.states
                              .filter((state) => state.country_id === countryId)
                              .map((state) => (
                                <SelectItem
                                  key={state.id}
                                  value={state.id.toString()}
                                >
                                  {state.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"basicInformation.cityId"}
                    render={({ field }) => (
                      <FormItem className={"col-span-1 space-y-2"}>
                        <FormLabel>
                          City<span aria-hidden={true}>*</span>
                        </FormLabel>
                        <Select
                          defaultValue={field.value?.toString()}
                          disabled={
                            !!onboardingProfile || form.formState.isSubmitting
                          }
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={"Please select a city"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {formOptions.cities
                              .filter(
                                (city) => !stateId || city.state_id === stateId,
                              )
                              .map((city) => (
                                <SelectItem
                                  key={city.id}
                                  value={city.id.toString()}
                                >
                                  {city.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"basicInformation.dateOfBirth"}
                    render={({ field }) => (
                      <FormItem className={"col-span-1 space-y-2"}>
                        <FormLabel>
                          Date of birth<span aria-hidden={true}>*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger
                            disabled={
                              !!onboardingProfile || form.formState.isSubmitting
                            }
                            asChild
                          >
                            <FormControl>
                              <Button
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !birthDate && "text-muted-foreground",
                                )}
                                variant={"outline"}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon
                                  className={"ml-auto h-4 w-4 opacity-50"}
                                />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            align={"center"}
                            className={"w-auto p-0"}
                          >
                            <div
                              className={"flex flex-row justify-between p-2"}
                            >
                              <Select
                                defaultValue={months[getMonth(birthDate)]}
                                onValueChange={handleMonthChange}
                              >
                                <SelectTrigger className={"w-[110px]"}>
                                  <SelectValue placeholder={"Month"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {months.map((month) => (
                                    <SelectItem key={month} value={month}>
                                      {month}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select
                                defaultValue={getYear(birthDate).toString()}
                                onValueChange={handleYearChange}
                              >
                                <SelectTrigger className={"w-[110px]"}>
                                  <SelectValue placeholder={"Year"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {birthYears.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Calendar
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                              mode={"single"}
                              month={birthDate}
                              onSelect={field.onChange}
                              onMonthChange={setBirthDate}
                              selected={field.value}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"basicInformation.gender"}
                    render={({ field }) => (
                      <FormItem className={"col-span-1 space-y-2"}>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          defaultValue={field.value}
                          disabled={
                            !!onboardingProfile || form.formState.isSubmitting
                          }
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={"Please select a gender"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genders.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {/* Academic Background step */}
              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name={"academicBackground.educationLevel"}
                    render={({ field }) => (
                      <FormItem className={"col-span-1 space-y-2"}>
                        <FormLabel>
                          Current Academic Level
                          <span aria-hidden={true}>*</span>
                        </FormLabel>
                        <Select
                          defaultValue={field.value}
                          disabled={
                            !!onboardingProfile || form.formState.isSubmitting
                          }
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={"Please select an academic level"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {educationLevels.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"academicBackground.lastAttendedInstitution"}
                    render={({ field }) => (
                      <FormItem className={"col-span-1 space-y-2"}>
                        <FormLabel>
                          Current or Most Recent School/Institution
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              !!onboardingProfile || form.formState.isSubmitting
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"academicBackground.graduationYear"}
                    render={({ field }) => (
                      <FormItem className={"col-span-1 space-y-2"}>
                        <FormLabel>Graduation Year</FormLabel>
                        <Select
                          defaultValue={field.value?.toString()}
                          disabled={
                            !!onboardingProfile || form.formState.isSubmitting
                          }
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={"Please select a graduation year"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {graduationYears.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  {educationLevel === "high_school" && (
                    <FormField
                      control={form.control}
                      name={"academicBackground.intendedFieldOfStudyId"}
                      render={({ field }) => (
                        <FormItem className={"col-span-1 space-y-2"}>
                          <FormLabel>Intended Field of Study</FormLabel>
                          <Select
                            defaultValue={field.value?.toString()}
                            disabled={
                              !!onboardingProfile || form.formState.isSubmitting
                            }
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={"Please select a field of study"}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {formOptions.fieldsOfStudy.map((field) => (
                                <SelectItem
                                  key={field.id}
                                  value={field.id.toString()}
                                >
                                  {field.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  )}
                  {educationLevel === "undergraduate" && (
                    <FormField
                      control={form.control}
                      name={"academicBackground.fieldOfStudyId"}
                      render={({ field }) => (
                        <FormItem className={"col-span-1 space-y-2"}>
                          <FormLabel>Field of Study</FormLabel>
                          <Select
                            defaultValue={field.value?.toString()}
                            disabled={
                              !!onboardingProfile || form.formState.isSubmitting
                            }
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={"Please select a field of study"}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {formOptions.fieldsOfStudy.map((field) => (
                                <SelectItem
                                  key={field.id}
                                  value={field.id.toString()}
                                >
                                  {field.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}
              {/* Career & Personal Interests step */}
              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name={"personalInterests.extracurricularsIds"}
                    render={() => (
                      <FormItem
                        className={"col-span-1 space-y-2 md:col-span-2"}
                      >
                        <div>
                          <FormLabel>Extracurricular Activities</FormLabel>
                          <FormDescription>
                            What activities do you enjoy participating in
                            outside of school?
                          </FormDescription>
                        </div>
                        {formOptions.extracurricularActivities.map(
                          (activity) => (
                            <FormField
                              control={form.control}
                              key={activity.id}
                              name={"personalInterests.extracurricularsIds"}
                              render={({ field }) => (
                                <FormItem
                                  className={
                                    "flex flex-row items-start space-x-3 space-y-0"
                                  }
                                  key={activity.id}
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        activity.id,
                                      )}
                                      disabled={
                                        !!onboardingProfile ||
                                        form.formState.isSubmitting
                                      }
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              activity.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== activity.id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className={"text-sm font-normal"}>
                                    {activity.name}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ),
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"personalInterests.additionalNotes"}
                    render={({ field }) => (
                      <FormItem
                        className={"col-span-1 space-y-2 md:col-span-2"}
                      >
                        <FormLabel>
                          Is there anything else you would like to share about
                          your interests or career goals?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className={"min-h-[90px] resize-none"}
                            disabled={
                              !!onboardingProfile || form.formState.isSubmitting
                            }
                            placeholder={"Tell us a little bit about yourself"}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Feel free to describe your goals, interests, or
                          anything you think is important for us to know.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {/* Match results step */}
              {currentStep === 3 && (
                <div
                  className={
                    "col-span-1 flex flex-col justify-center items-center py-5 md:col-span-2"
                  }
                >
                  {form.formState.isSubmitting ? (
                    <div>Loading...</div>
                  ) : (
                    <div>
                      {message && (
                        <p className={"text-center max-w-md"}>{message}</p>
                      )}

                      {match?.match_scholarships &&
                      match.match_scholarships.length > 0 ? (
                        <div>
                          <h2
                            className={"text-center text-xl font-medium mb-4"}
                          >
                            Top results
                          </h2>
                          <ul className={"space-y-3"}>
                            {match.match_scholarships.map((scholarship) => (
                              <li key={scholarship.id}>
                                <ScholarshipCard scholarship={scholarship} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : match?.match_scholarships.length === 0 ? (
                        <p className={"text-center max-w-md md:mx-auto"}>
                          Sorry, we couldn&#39;t find any scholarships that
                          match your profile at the moment.
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              )}
              {/* Onboarding form navigation */}
              <div
                className={"col-span-1 flex justify-between mt-5 md:col-span-2"}
              >
                <Button
                  aria-label={"Go to previous step"}
                  disabled={currentStep === 0}
                  onClick={handlePreviousStep}
                  size={"icon"}
                  type={"button"}
                  variant={"outline"}
                >
                  <ChevronLeftIcon />
                </Button>
                {currentStep === onboardingSteps.length - 2 && (
                  <Button
                    disabled={form.formState.isSubmitting}
                    type={"submit"}
                  >
                    Find my match{" "}
                    <ChevronRightIcon className={"ml-2 h-5 w-5"} />
                  </Button>
                )}
                {currentStep < onboardingSteps.length - 2 && (
                  <Button
                    aria-label={"Go to next step"}
                    onClick={handleNextStep}
                    size={"icon"}
                    type={"button"}
                    variant={"outline"}
                  >
                    <ChevronRightIcon />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <section className={"max-w-md mx-auto"}>
        {match?.match_scholarships && !match.match_feedback.length ? (
          <>
            <p className={"text-sm text-center mb-3"}>
              <span className={"font-semibold"}>Help us improve!</span> We&#39;d
              love your thoughts on your scholarship matches. Click the button
              below to share your feedback.
            </p>
            <MatchFeedback matchResultId={match.id} />
          </>
        ) : match?.match_scholarships ? (
          <p className={"text-sm text-center"}>
            Your feedback has been submitted successfully. Thank you for helping
            us improve!
          </p>
        ) : null}
      </section>
    </div>
  );
}

export { Onboarding };
