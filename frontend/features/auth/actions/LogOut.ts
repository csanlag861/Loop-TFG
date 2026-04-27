"use server";

import { redirect } from "next/navigation";
import { clearAuthCookies } from "../utils/session-cookie";

export const LogOutAction = async () => {
  await clearAuthCookies();
  redirect("/");
};
