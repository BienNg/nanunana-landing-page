import type { CourseValue, GoalValue } from "@/content/form-options";

/** A validated, normalised lead — what every destination receives. */
export type Lead = {
  id: string;
  createdAt: string; // ISO 8601
  name: string;
  phone: string; // E.164
  phoneRaw: string;
  course?: { value: CourseValue; label: string };
  goal?: { value: GoalValue; label: string };
  message?: string;
  attribution: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    fbclid?: string;
    landingPage?: string;
    referrer?: string;
  };
};

/**
 * A place leads are sent to (Notion, email, later Google Sheets…).
 * The factory returns null when the destination is not configured.
 */
export type LeadDestination = {
  name: string;
  send: (lead: Lead) => Promise<void>;
};

export type LeadDestinationFactory = () => LeadDestination | null;
