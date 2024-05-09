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
  let detail: Error;
  if (!(error instanceof Error)) {
    if (typeof error === "string") {
      detail = new Error(error);
    } else {
      const message = error == null ? undefined : JSON.stringify(error);
      detail = new Error(message, {
        cause: error,
      });
    }
  } else {
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
