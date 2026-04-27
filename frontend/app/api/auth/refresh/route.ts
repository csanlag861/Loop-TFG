import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REFRESH_COOKIE_NAME, setAuthCookies } from "@/features/auth/utils/session-cookie";
import { refreshUrl } from "@/utils/api";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "No refresh token found" }, { status: 401 });
    }

    const response = await fetch(refreshUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Refresh token failed" }, { status: 401 });
    }

    const data = await response.json();
    
    // Update cookies securely server-side
    await setAuthCookies(data.accessToken, data.refreshToken);

    return NextResponse.json({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (error) {
    console.error("Error in refresh route handler:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
