import { NextResponse } from "next/server";
import { setAuthCookies } from "@/features/auth/utils/session-cookie";
import { basePath, homePath, landingPath } from "@/utils/paths";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const refreshToken = searchParams.get("refreshToken");

  if (token && refreshToken) {
    await setAuthCookies(token, refreshToken);

    return NextResponse.redirect(new URL(homePath(), basePath()));
  }

  return NextResponse.redirect(new URL(landingPath(), basePath()));
}
