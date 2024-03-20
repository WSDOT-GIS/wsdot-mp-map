// const sampleErrors = [
//   {
//     ArmCalcReturnCode: 286,
//     ArmCalcReturnMessage: "Invalid SR, Invalid RDWY Type requested",
//     RealignmentDate: "1/1/1900",
//     ReferenceDate: "2/13/2024",
//     ResponseDate: "12/31/2022",
//     Route: "",
//   },
//   {
//     ArmCalcReturnCode: 272,
//     ArmCalcReturnMessage: "SR, RRT, RRQ, or SRMP/ARM not found on file",
//     RealignmentDate: "1/1/1900",
//     ReferenceDate: "2/13/2024",
//     ResponseDate: "12/31/2022",
//     Route: "",
//   },
// ];

import type { DateString } from "./types";

export interface ElcErrorResponse {
  Id?: number;
  ArmCalcReturnCode: Omit<number, 0>;
  ArmCalcReturnMessage: Omit<string, "">;
  RealignmentDate?: DateString;
  ReferenceDate?: DateString;
  ResponseDate?: DateString;
  Route?: "";
}

/**
 * Checks if the input is an error object.
 * @param input - the input to be checked
 * @returns - true if the input is an error object, false otherwise
 */
export function isErrorObject(
  input: unknown
): input is { [key: string]: unknown; error: Record<string, unknown> } {
  if (!input) {
    return false;
  }
  return (
    typeof input === "object" &&
    input !== null &&
    "error" in (input as Record<string, unknown>)
  );
}

/**
 * Determines if the input is an {@link ElcErrorResponse}.
 * @param response - Response from ELC call.
 * @returns - Returns true if the input is an {@link ElcErrorResponse}, false otherwise.
 */
export const isElcErrorResponse = (
  response: unknown
): response is ElcErrorResponse => {
  if (!(response != null && typeof response === "object")) {
    return false;
  }
  return "ArmCalcReturnCode" in response && response.ArmCalcReturnCode !== 0;
};

/**
 * The error object from an ArcGIS error response.
 * {
 *    code: 500,
 *    message: "Extension not found",
 *    details: []
 * }
 */
export interface ArcGisErrorObject<T = unknown> {
  code: number;
  message: string;
  details: T[];
}

/**
 * The error response from an ArcGIS service.
 * @example
 * ```json
 * {
 *     error: {
 *       code: 500,
 *       message: "Extension not found",
 *       details: []
 *     },
 * }
 * ```
 */
export interface ArcGisErrorResponse {
  error: ArcGisErrorObject;
}

/**
 * Represents an error received from an ArcGIS service. This class extends
 * the JavaScript Error object to include specific properties related to
 * the ArcGIS error structure, such as a numerical code and an array of details.
 */
export class ArcGisError extends Error implements ArcGisErrorObject {
  /**
   * The error code for the ArcGIS error
   * Usually corresponds to an HTTP error code.
   * (E.g., 500 for a server error or 402 for an invalid request)
   */
  public readonly code: Response["status"];
  public readonly details;
  /**
   * Creates an error object from an ArcGIS error response
   * @param arcGisErrorResponse - error response from ArcGIS
   * @param otherInfo - additional information
   */
  constructor(
    arcGisErrorResponse: ArcGisErrorResponse,
    otherInfo?: Record<string, undefined> & {
      request?: Parameters<typeof fetch>;
      response?: Response;
    }
  ) {
    super(arcGisErrorResponse.error.message, {
      cause: otherInfo
        ? { arcGisErrorResponse, ...otherInfo }
        : arcGisErrorResponse,
    });
    this.code = arcGisErrorResponse.error.code;
    this.details = arcGisErrorResponse.error.details;
  }
}

/**
 * Check if the input is an {@link ArcGisErrorResponse}.
 * @param input - the value to check
 * @returns - `true` if the input is an {@link ArcGisErrorResponse}, `false` otherwise.
 */
export const isArcGisErrorResponse = (
  input: unknown
): input is ArcGisErrorResponse =>
  typeof input === "object" && input !== null && "error" in input;

/**
 * Checks if the input is an instance of ArcGisError.
 * @param input - the input to be checked
 * @returns `true` if the input is an instance of ArcGisError, `false` otherwise
 */
export const isArcGisError = (input: unknown): input is ArcGisError =>
  input != null &&
  typeof input === "object" &&
  ["code", "message", "details"].every((key) => key in input);
