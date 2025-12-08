import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/types/database";

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
  );
