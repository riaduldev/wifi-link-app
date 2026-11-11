"use server";

import { headers } from "next/headers";
import {
  handleConnectionRequest,
  handleContactMessage,
  handleCoverageRequest,
  handleSupportTicket,
} from "@/lib/request-handlers";
import type { ActionState } from "./request-state";

/**
 * Thin Server Action wrappers. All validation, rate limiting and delivery
 * live in `src/lib/request-handlers.ts` so they can be tested directly.
 */

async function clientKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "anonymous";
  return ip;
}

export async function submitConnectionRequest(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return handleConnectionRequest(formData, await clientKey());
}

export async function submitCoverageRequest(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return handleCoverageRequest(formData, await clientKey());
}

export async function submitSupportTicket(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return handleSupportTicket(formData, await clientKey());
}

export async function submitContactMessage(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return handleContactMessage(formData, await clientKey());
}
