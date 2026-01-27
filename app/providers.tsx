"use client";

import { PostHogProvider as PHProvider } from "@posthog/react";
import posthog from "posthog-js";
import { useEffect } from "react";

function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2025-11-30",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <PostHogProvider>{children}</PostHogProvider>;
}
