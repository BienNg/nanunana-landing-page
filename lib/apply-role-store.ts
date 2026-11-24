"use client";

import { useSyncExternalStore } from "react";

/**
 * Lets an "Ứng tuyển" button pre-select a position in the application form on
 * the same page. `nonce` changes on every click so the same button re-applies.
 */
export type ApplyRolePrefill = { role?: string; nonce: number };

let state: ApplyRolePrefill = { nonce: 0 };
const serverSnapshot: ApplyRolePrefill = { nonce: 0 };
const listeners = new Set<() => void>();

export function setApplyRole(role: string) {
  state = { role, nonce: state.nonce + 1 };
  listeners.forEach((l) => l());
}

export function useApplyRole() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => serverSnapshot,
  );
}

/** Set right before submitting; the success page fires the conversion only if present. */
export const APPLICATION_SENT_KEY = "nanunana:application-sent";

export function markApplicationSent(role: string) {
  try {
    sessionStorage.setItem(APPLICATION_SENT_KEY, role);
  } catch {}
}

export function clearApplicationSent() {
  try {
    sessionStorage.removeItem(APPLICATION_SENT_KEY);
  } catch {}
}

/** Returns the role and removes the flag, so a reload does not count twice. */
export function takeApplicationSent(): string | null {
  try {
    const role = sessionStorage.getItem(APPLICATION_SENT_KEY);
    if (role !== null) sessionStorage.removeItem(APPLICATION_SENT_KEY);
    return role;
  } catch {
    return null;
  }
}
