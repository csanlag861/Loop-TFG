import { NextResponse } from "next/server";
import { setAuthCookies } from "@/features/auth/utils/session-cookie";
import { homePath, landingPath } from "@/utils/paths";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const refreshToken = searchParams.get("refreshToken");

  if (token && refreshToken) {
    await setAuthCookies(token, refreshToken);

    return NextResponse.redirect(new URL(homePath(), "http://localhost:3001"));
  }

  return NextResponse.redirect(new URL(landingPath(), "http://localhost:3001"));
}
