import type { ConsultationField } from "./consultation";

export type FieldErrors = Partial<Record<ConsultationField, string>>;

/** State returned by the consultation Server Action (useActionState). */
export type ConsultationState =
  | { status: "idle" }
  | { status: "success"; course?: string; goal?: string }
  | { status: "invalid"; fieldErrors: FieldErrors; values: Record<string, string> }
  | {
      status: "error";
      reason: "rate_limited" | "captcha" | "delivery";
      message: string;
      values: Record<string, string>;
    };

export const initialConsultationState: ConsultationState = { status: "idle" };
