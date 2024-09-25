import Image from "next/image";
import Link from "next/link";
import { SearchIcon, TelescopeIcon, UserPenIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default async function Index() {
  const currentYear = new Date().getFullYear();

  return (
    <main className={"flex flex-col gap-20 bg-blue-100 p-5 lg:gap-24 lg:px-10"}>
      <header className={"flex justify-between w-full max-w-7xl mx-auto"}>
        <div>
          <Link className={"flex items-center gap-1"} href={"/"}>
            <Image
              alt={"PathwayAid logo"}
              height={50}
              src={"logo.svg"}
              width={50}
            />
            <span className={"text-xl font-semibold"}>PathwayAid</span>
          </Link>
        </div>
        <div>
          <Button asChild variant={"secondary"}>
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
        </div>
      </header>
      <section className={"max-w-xl mx-auto lg:max-w-7xl"}>
        <div className={"flex items-center"}>
          <div className={"basis-full text-center lg:basis-1/2 lg:text-left"}>
            <h1 className={"text-3xl font-bold mb-4 lg:text-4xl lg:mb-5"}>
              Find the Right Scholarship for Your Future
            </h1>
            <h2 className={"text-lg mb-4 lg:text-xl lg:mb-5"}>
              Discover personalized scholarship opportunities that match your
              academic goals and financial needs, all in one place
            </h2>
            <Button asChild size={"lg"}>
              <Link href={"/"}>Start your search</Link>
            </Button>
          </div>
          <div className={"hidden lg:block lg:basis-1/2 lg:relative"}>
            <Image
              alt={""}
              className={"mx-auto"}
              height={400}
              src={"/hero-image.png"}
              width={400}
            />
            <div
              className={
                "absolute h-full w-full top-0 bg-gradient-to-t from-transparent from-75% to-blue-100"
              }
            />
          </div>
        </div>
      </section>
      <div className={"max-w-7xl mx-auto"}>
        <h2
          className={
            "text-xl font-semibold text-center mb-5 lg:text-2xl lg:mb-10"
          }
        >
          How it works
        </h2>
        <div className={"flex flex-col gap-5 lg:flex-row"}>
          <div
            className={
              "flex flex-col items-center basis-full lg:basis-1/3 lg:px-2"
            }
          >
            <div className={"flex justify-center mb-3 lg:mb-5"}>
              <UserPenIcon className={"h-10 w-10"} />
            </div>
            <h4
              className={"text-lg font-medium text-center lg:text-xl lg:mb-2"}
            >
              Tell Us About You
            </h4>
            <p className={"text-center max-w-[350px]"}>
              Provide key information like where you&#39;re from and what you
              want to study. This helps us understand your needs and preferences
              to find scholarships that are the perfect fit for you.
            </p>
          </div>
          <div
            className={
              "flex flex-col items-center basis-full lg:basis-1/3 lg:px-2"
            }
          >
            <div className={"flex justify-center mb-3 lg:mb-5"}>
              <SearchIcon className={"h-10 w-10"} />
            </div>
            <h4
              className={"text-lg font-medium text-center lg:text-xl lg:mb-2"}
            >
              Get Matched with Scholarships
            </h4>
            <p className={"text-center max-w-[350px]"}>
              Based on your profile, our app matches you with tailored
              scholarship opportunities. Explore financial aid options that are
              aligned with your academic interests and personal background.
            </p>
          </div>
          <div
            className={
              "flex flex-col items-center basis-full lg:basis-1/3 lg:px-2"
            }
          >
            <div className={"flex justify-center mb-3 lg:mb-5"}>
              <TelescopeIcon className={"h-10 w-10"} />
            </div>
            <h4
              className={"text-lg font-medium text-center lg:text-xl lg:mb-2"}
            >
              Browse and Explore
            </h4>
            <p className={"text-center max-w-[350px]"}>
              Looking for more? You can browse through our extensive scholarship
              directory, giving you the freedom to explore additional
              opportunities beyond your matches.
            </p>
          </div>
        </div>
      </div>
      <div className={"w-full max-w-7xl mx-auto"}>
        <h2
          className={
            "text-xl font-semibold text-center mb-5 lg:text-2xl lg:mb-10"
          }
        >
          Frequently asked questions
        </h2>
        <Accordion className={"max-w-xl mx-auto"} type={"multiple"}>
          <AccordionItem value={"item-1"}>
            <AccordionTrigger className={"text-base"}>
              How does PathwayAid match me with scholarships?
            </AccordionTrigger>
            <AccordionContent className={"text-base"}>
              PathwayAid uses the information you provide — such as where
              you&#39;re from and what you&#39;re interested in studying — to
              match you with scholarships that best fit your academic and
              financial profile. We analyze thousands of opportunities to
              recommend the most relevant options.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={"item-2"}>
            <AccordionTrigger className={"text-base"}>
              Is PathwayAid free to use?
            </AccordionTrigger>
            <AccordionContent className={"text-base"}>
              Yes, PathwayAid is completely free to use for all students. Our
              goal is to help you find the financial aid you need without any
              cost.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={"item-3"}>
            <AccordionTrigger className={"text-base"}>
              How often is the scholarship information updated?
            </AccordionTrigger>
            <AccordionContent className={"text-base"}>
              We regularly update our scholarship database to ensure you have
              access to the latest opportunities. This includes new
              scholarships, updated deadlines, and changes to eligibility
              criteria.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <footer className={"max-w-7xl mx-auto text-sm"}>
        <div
          className={"flex justify-center items-center gap-4 text-sm lg:mb-5"}
        >
          <Link className={"underline underline-offset-4"} href={"/"}>
            Terms of Service
          </Link>
          <Link className={"underline underline-offset-4"} href={"/"}>
            Privacy Policy
          </Link>
        </div>
        <p className={"text-center"}>
          PathwayAid <br />
          Copyright &copy; {currentYear} - All rights reserved
        </p>
      </footer>
    </main>
  );
}
