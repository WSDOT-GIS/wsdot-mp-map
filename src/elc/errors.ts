import type { DateString, RouteGeometry, RouteLocation } from "./types";

export interface ElcErrorResponse
  extends RouteLocation<DateString, RouteGeometry> {
  /**
   * A unique ID for the ELC location in the request.
   */
  Id?: number;
  /**
   * ARM Calc return code
   * Should never be 0.
   */
  ArmCalcReturnCode: number;
  /**
   * ARM Calc return message that corresponds to {@link ArmCalcReturnCode}.
   * Should never have an empty string.
   */
  ArmCalcReturnMessage: string;
  /**
   * The date of the realignment.
   */
  RealignmentDate?: DateString;
  /**
   * Reference date
   */
  ReferenceDate?: DateString;
  /**
   * Response date
   */
  ResponseDate?: DateString;
  /**
   * Route ID
   */
  Route?: string;
}

/**
 * An error response from the ELC REST SOE.
 * @param elcErrorResponse - error response from the ELC REST SOE
 */
export class ElcError extends Error implements ElcErrorResponse {
  Id?: number;
  ArmCalcReturnCode;
  ArmCalcReturnMessage;
  RealignmentDate;
  ReferenceDate;
  ResponseDate;
  Route;
  Angle;
  Arm;
  Back;
  Decrease;
  Distance;
  EventPoint;
  RouteGeometry;
  Srmp;
  LocatingError;
  constructor(elcErrorResponse: ElcErrorResponse, options?: ErrorOptions) {
    const {
      ArmCalcReturnCode,
      ArmCalcReturnMessage,
      RealignmentDate,
      ReferenceDate,
      ResponseDate,
      Route,
      Angle,
      Arm,
      Back,
      Decrease,
      Distance,
      EventPoint,
      RouteGeometry,
      Srmp,
      LocatingError,
    } = elcErrorResponse;

    let message: string;

    if (LocatingError) {
      message = LocatingError;
    } else {
      message = `${ArmCalcReturnCode.toString()}: ${ArmCalcReturnMessage}`;
    }

    super(message, options);
    this.ArmCalcReturnCode = ArmCalcReturnCode;
    this.ArmCalcReturnMessage = ArmCalcReturnMessage;
    this.RealignmentDate = RealignmentDate;
    this.ReferenceDate = ReferenceDate;
    this.ResponseDate = ResponseDate;
    this.Route = Route ?? undefined;
    this.Angle = Angle;
    this.Arm = Arm;
    this.Back = Back;
    this.Decrease = Decrease;
    this.Distance = Distance;
    this.EventPoint = EventPoint;
    this.RouteGeometry = RouteGeometry;
    this.Srmp = Srmp;
    this.LocatingError = LocatingError;
  }

  override toString() {
    let message = "";

    if (this.Route) {
      message += `${this.Route}${this.Decrease ? " (Decrease)" : ""}`;
    }
    if (this.Srmp != null) {
      message += ` @ ${this.Srmp.toString()}${this.Back ? "B" : ""}`;
    }
    if (this.Arm != null) {
      message += ` (ARM: ${this.Arm.toString()})`;
    }

    if (this.LocatingError) {
      message += ` ${this.LocatingError}`;
    } else if (this.ArmCalcReturnCode !== 0) {
      message += ` ${this.ArmCalcReturnCode.toString()}: ${this.ArmCalcReturnMessage}`;
    }
    return message;
  }
}

/**
 * Checks if the input is an error object.
 * @param input - the input to be checked
 * @returns - true if the input is an error object, false otherwise
 */
export function isErrorObject<T>(
  input: T,
): input is T & { error: Record<string, unknown> } {
  if (!input) {
    return false;
  }
  return (
    typeof input === "object" && "error" in (input as Record<string, unknown>)
  );
}

/**
 * Determines if the input is an {@link ElcErrorResponse}.
 * @param response - Response from ELC call.
 * @returns - Returns true if the input is an {@link ElcErrorResponse}, false otherwise.
 */
export function isElcErrorResponse(
  response: unknown,
): response is ElcErrorResponse {
  if (!(response != null && typeof response === "object")) {
    return false;
  }
  return (
    ("ArmCalcReturnCode" in response && response.ArmCalcReturnCode !== 0) ||
    "LocatingError" in response
  );
}

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
    otherInfo?: Record<string, unknown> & {
      request?: Parameters<typeof fetch>;
      response?: Response;
    },
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
  input: unknown,
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

// Setup hot module reloading.
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      console.log("hot module replacement", newModule);
    }
  });
}
