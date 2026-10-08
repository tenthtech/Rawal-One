import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  getSupabaseConfiguration,
  isLocalJsonFallbackEnabled,
} from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/database.types";

function redirectWithCookies(
  request: NextRequest,
  pathname: string,
  source: NextResponse,
) {
  const response = NextResponse.redirect(new URL(pathname, request.url));

  source.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  ["cache-control", "expires", "pragma"].forEach((header) => {
    const value = source.headers.get(header);
    if (value) response.headers.set(header, value);
  });

  return response;
}

function preventPrivateResponseCaching(response: NextResponse) {
  response.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate, max-age=0",
  );
  response.headers.set("Expires", "0");
  response.headers.set("Pragma", "no-cache");
  return response;
}

export async function proxy(request: NextRequest) {
  const configuration = getSupabaseConfiguration();
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  if (configuration.status !== "configured") {
    if (isLoginRoute || isLocalJsonFallbackEnabled()) {
      return preventPrivateResponseCaching(NextResponse.next({ request }));
    }

    return preventPrivateResponseCaching(
      NextResponse.redirect(new URL("/admin/login", request.url)),
    );
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient<Database>(
    configuration.url,
    configuration.anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headersToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
          Object.entries(headersToSet).forEach(([name, value]) => {
            response.headers.set(name, value);
          });
        },
      },
    },
  );
  const authResult = await supabase.auth.getClaims().catch(() => null);
  const isAuthenticated = Boolean(
    authResult && !authResult.error && authResult.data?.claims.sub,
  );

  if (!isAuthenticated && !isLoginRoute) {
    return preventPrivateResponseCaching(
      redirectWithCookies(request, "/admin/login", response),
    );
  }

  if (isAuthenticated && isLoginRoute) {
    return preventPrivateResponseCaching(
      redirectWithCookies(request, "/admin", response),
    );
  }

  return preventPrivateResponseCaching(response);
}

export const config = {
  matcher: ["/admin/:path*"],
};
