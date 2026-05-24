import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "access_token";
export const REFRESH_COOKIE_NAME = "refresh_token";

export const setAuthCookies = async (
  accessToken: string,
  refreshToken: string,
) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: accessToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 15,
  });

  cookieStore.set({
    name: REFRESH_COOKIE_NAME,
    value: refreshToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete(REFRESH_COOKIE_NAME);
};
