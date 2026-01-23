import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "access_token";

export const setSessionCookie = async (
  sessionToken: string,
) => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    attributes: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60*60*8,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};
