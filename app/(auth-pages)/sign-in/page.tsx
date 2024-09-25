"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/actions/auth";

export default function Login() {
  return (
    <div className={"flex justify-center items-center min-h-screen p-5"}>
      <div
        className={
          "flex flex-col items-center gap-4 max-w-md border border-gray-300 rounded-lg p-5 lg:p-10 text-center"
        }
      >
        <h1 className={"text-2xl font-semibold lg:text-3xl"}>Sign in</h1>
        <p>Continue with</p>
        <Button
          onClick={async () => {
            await signInWithGoogle();
          }}
        >
          Google
        </Button>
        <p className={"text-sm"}>
          By continuing, you agree to our{" "}
          <Link className={"underline underline-offset-4"} href={"/legal"}>
            Terms of Service
          </Link>{" "}
          and confirm that you have read our{" "}
          <Link className={"underline underline-offset-4"} href={"/privacy"}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
