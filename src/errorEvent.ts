import FormatError from "./common/FormatError";
import NotImplementedError from "./common/NotImplementedError";
import { ArcGisError, ElcError } from "./elc/errors";
import { FormatError as RouteUtilsFormatError } from "wsdot-route-utils";

/**
 * Emits an error event with the provided error object. If the error is an instance of ElcError,
 * it dispatches a custom event with the name "elc-error" and the error object as the detail.
 * Otherwise, it dispatches a custom event with the name "error" and the error object as the detail.
 * @param error - The error object to emit.
 * @returns Returns true if the event was dispatched successfully, false otherwise.
 */
export const emitErrorEvent = (error: unknown) => {
  /**
   * The name of the event to dispatch.
   * Defaults to "error" if it is not a more specific type.
   */
  let eventTypeName = "error";
  // Initialize the event detail object.
  let detail: Error;
  // If error parameter is not an instance of Error...
  if (!(error instanceof Error)) {
    // If it is a string, create an Error with the string as the message.
    if (typeof error === "string") {
      detail = new Error(error);
    }
    // Otherwise, create an Error with the JSON stringified error as the message.
    else {
      const message = error == null ? undefined : JSON.stringify(error);
      detail = new Error(message, {
        cause: error,
      });
    }
  }
  // If error parameter is an instance of Error, then set the eventTypeName
  // to match the specifictype of error.
  else {
    detail = error;
    if (error instanceof ElcError) {
      eventTypeName = "elc-error";
    } else if (error instanceof ArcGisError) {
      eventTypeName = "arcgis-error";
    } else if (
      error instanceof FormatError ||
      error instanceof RouteUtilsFormatError
    ) {
      eventTypeName = "format-error";
    } else if (error instanceof NotImplementedError) {
      eventTypeName = "not-implemented-error";
    }
  }

  return window.dispatchEvent(new CustomEvent(eventTypeName, { detail }));
};
