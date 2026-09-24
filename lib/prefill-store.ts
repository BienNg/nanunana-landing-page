"use client";

import { useSyncExternalStore } from "react";
import {
  courseValues,
  goalValues,
  prefillParams,
  type CourseValue,
  type GoalValue,
} from "@/content/form-options";

/**
 * Tiny store that lets any CTA pre-select a course/goal in the consultation
 * form (the form stays mounted during in-page navigation, so it can't rely on
 * reading the URL again). `nonce` changes on every request so repeated clicks
 * on the same CTA still re-apply the value.
 */
export type Prefill = { course?: CourseValue; goal?: GoalValue; nonce: number };

let state: Prefill = { nonce: 0 };
const listeners = new Set<() => void>();
const serverSnapshot: Prefill = { nonce: 0 };

export function setPrefill(p: { course?: CourseValue; goal?: GoalValue }) {
  state = { ...p, nonce: state.nonce + 1 };
  listeners.forEach((l) => l());
}

export function usePrefill() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => serverSnapshot,
  );
}

const isCourse = (v: string | null): v is CourseValue =>
  !!v && (courseValues as readonly string[]).includes(v);
const isGoal = (v: string | null): v is GoalValue =>
  !!v && (goalValues as readonly string[]).includes(v);

/** Reads ?khoa=…&muc-tieu=… from a URL (unknown values are ignored). */
export function prefillFromSearch(search: string) {
  const params = new URLSearchParams(search);
  const course = params.get(prefillParams.course);
  const goal = params.get(prefillParams.goal);
  return {
    course: isCourse(course) ? course : undefined,
    goal: isGoal(goal) ? goal : undefined,
  };
}
