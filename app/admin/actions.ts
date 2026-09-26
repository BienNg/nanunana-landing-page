"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverEnv } from "@/lib/env";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  adminSessionValid,
  passwordsMatch,
  signAdminSession,
} from "@/lib/stats/auth";

export async function loginStats(
  _prev: { error: string },
  formData: FormData,
): Promise<{ error: string }> {
  const expected = serverEnv.statsAdmin();
  if (!expected) return { error: "The stats password is not configured." };

  const password = String(formData.get("password") ?? "");
  if (!passwordsMatch(password, expected)) return { error: "Wrong password." };

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, signAdminSession(expected), adminCookieOptions());
  redirect("/admin");
}

export async function logoutStats() {
  const expected = serverEnv.statsAdmin();
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!expected || !adminSessionValid(token, expected)) redirect("/admin");
  jar.set(ADMIN_COOKIE, "", { ...adminCookieOptions(), maxAge: 0 });
  redirect("/admin");
}
