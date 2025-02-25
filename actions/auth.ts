"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signInWithGoogle({ nextUrl }: { nextUrl?: string } = {}) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  // Redirect config
  const baseUrl = `${origin}/auth/callback`;
  const searchParams = new URLSearchParams();

  if (nextUrl) {
    searchParams.append("next_url", nextUrl);
  }

  const queryString = searchParams.toString();
  const redirectTo = queryString ? `${baseUrl}?${queryString}` : baseUrl;

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
  const supabase = await createClient();
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
