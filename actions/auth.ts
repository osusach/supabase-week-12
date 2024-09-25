"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signInWithGoogle() {
  const supabase = createClient();
  const origin = headers().get("origin");
  const redirectTo = `${origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo,
    },
    provider: "google",
  });

  if (error) {
    console.error("Failed to sign in with Google. Error:", error);
    return {
      message:
        "Something went wrong while signing in with Google. Please try again, or contact support if the issue persists.",
      success: false,
    };
  }

  redirect(data.url);
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Failed to sign out. Error:", error);
    return {
      message:
        "Something went wrong while signing out. Please try again, or contact support if the issue persists.",
      success: false,
    };
  }

  redirect("/sign-in");
}
