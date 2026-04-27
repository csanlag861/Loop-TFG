import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshUrl } from "@/utils/api";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (refreshToken) {
    let shouldRefresh = false;

    if (!token) {
      shouldRefresh = true;
    } else {
      try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const exp = decodedPayload.exp * 1000;
        
        // If token expires in less than 1 minute, refresh it ahead of time!
        if (Date.now() > exp - 60000) {
          shouldRefresh = true;
        }
      } catch (e) {
        shouldRefresh = true; // If token is malformed, try refresh
      }
    }

    if (shouldRefresh) {
      try {
        const response = await fetch(refreshUrl(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          const requestHeaders = new Headers(request.headers);
          requestHeaders.set('Authorization', `Bearer ${data.accessToken}`);
          
          const res = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });
          
          res.cookies.set({
            name: "access_token",
            value: data.accessToken,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 15,
          });

          res.cookies.set({
            name: "refresh_token",
            value: data.refreshToken,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });

          return res;
        } else {
          // If refresh fails, clear everything and go to landing page (/)
          const res = NextResponse.redirect(new URL("/", request.url));
          res.cookies.delete("access_token");
          res.cookies.delete("refresh_token");
          return res;
        }
      } catch (error) {
        // Network error during refresh, let it pass and let fetcher handle it or redirect
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except public assets and internal nextjs files
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|login|register).*)'],
};
