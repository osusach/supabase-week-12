import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/get-started"];

export const updateSession = async (request: NextRequest) => {
  try {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // Do not run code between createServerClient and
    // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: If you remove getClaims() and you use server-side rendering
    // with the Supabase client, your users may be randomly logged out.
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    );

    if (isProtectedRoute && !user) {
      const redirectUrl = new URL("/sign-in", request.url);
      redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return supabaseResponse;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
