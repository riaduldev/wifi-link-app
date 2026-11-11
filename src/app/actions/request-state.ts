import type { FieldErrors } from "@/lib/validation";

/** Outcome of a public request form. */
export type RequestStatus =
  /** Nothing submitted yet. */
  | "idle"
  /** The request was accepted by the configured backend. */
  | "delivered"
  /**
   * The form validated correctly, but no backend is connected yet, so the
   * request was NOT stored. The UI must say so honestly and offer a
   * manual hand-off (phone / WhatsApp / email).
   */
  | "not-connected"
  /** The request could not be completed. */
  | "error";

export type ActionState = {
  status: RequestStatus;
  message: string;
  errors: FieldErrors;
  /** Human readable reference id, when one could be generated. */
  reference?: string;
};

export const initialActionState: ActionState = {
  status: "idle",
  message: "",
  errors: {},
};
