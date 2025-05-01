import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

// Regex to validate kebab-case format (e.g. my-action-name)
const KEBAB_CASE_REGEX = /^[a-z]+(-[a-z]+)*$/;

// Base action client with error handling and metadata validation
export const actionClient = createSafeActionClient({
  // Handle server errors and return user-friendly messages
  handleServerError(e) {
    if (e instanceof Error) {
      console.error("An error occurred in the action", {
        message: e.message,
      });

      return e.message;
    }
  },
  // Validate action metadata to ensure kebab-case naming
  defineMetadataSchema() {
    return z.object({
      actionName: z
        .string()
        .regex(KEBAB_CASE_REGEX, "Name must be in kebab-case format. Example: my-action-name"),
    });
  },
});

/**
 * Utility to handle action errors.
 * Logs the error message and returns a standardized error response.
 */
export function actionError(message: string, error: string) {
  console.error(message);
  return { data: null, error };
}

/**
 * Utility to handle successful action responses.
 */
export function actionSuccess<T>(data: T) {
  return { data, error: null };
}
