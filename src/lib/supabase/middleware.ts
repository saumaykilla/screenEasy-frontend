import { createServerClient } from "@supabase/ssr";
import {
  NextResponse,
  type NextRequest,
} from "next/server";

export async function updateSession(
  request: NextRequest
) {
  let supabaseResponse =
    NextResponse.next(
      {
        request,
      }
    );

  // If the env vars are not set, skip middleware check. You can remove this once you setup the project.

  const supabase =
    createServerClient(
      process
        .env
        .NEXT_PUBLIC_SUPABASE_URL!,
      process
        .env
        .NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies:
          {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(
              cookiesToSet
            ) {
              cookiesToSet.forEach(
                ({
                  name,
                  value,
                }) =>
                  request.cookies.set(
                    name,
                    value
                  )
              );
              supabaseResponse =
                NextResponse.next(
                  {
                    request,
                  }
                );
              cookiesToSet.forEach(
                ({
                  name,
                  value,
                  options,
                }) =>
                  supabaseResponse.cookies.set(
                    name,
                    value,
                    options
                  )
              );
            },
          },
      }
    );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser();

  // Debug logging
  console.log('Middleware - Path:', request.nextUrl.pathname, 'User:', user?.id ? 'authenticated' : 'not authenticated');

  // Skip middleware logic for auth callback route - let it handle its own redirect
  if (request.nextUrl.pathname === '/auth/callback') {
    console.log('Middleware - Skipping auth callback route');
    return supabaseResponse;
  }

  const publicRoutes = ["/", "/auth"];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // If user is not authenticated and trying to access protected route
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If user is authenticated, check if they have a profile
  if (user) {
    // Check if user has a profile in the database
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    console.log('Middleware - Profile check:', profile ? 'has profile' : 'no profile');

    // If authenticated user is on landing page, redirect based on profile status
    // if (request.nextUrl.pathname === "/") {
    //   const url = request.nextUrl.clone();
    //   if (profile) {
    //     url.pathname = "/dashboard";
    //     console.log('Middleware - Redirecting authenticated user with profile to dashboard');
    //   } else {
    //     url.pathname = "/onboarding";
    //     console.log('Middleware - Redirecting authenticated user without profile to onboarding');
    //   }
    //   return NextResponse.redirect(url);
    // }

    // If no profile and not on onboarding page, redirect to onboarding
    if (!profile && request.nextUrl.pathname !== "/onboarding") {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }

    // If has profile and on onboarding page, redirect to dashboard
    if (profile && request.nextUrl.pathname === "/onboarding") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // If authenticated user tries to access auth pages, redirect to dashboard
    if (request.nextUrl.pathname.startsWith("/auth")) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}