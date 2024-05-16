import type { ElcError } from "./elc/errors";

/**
 * Creates an error alert element based on the provided ElcError.
 * @param error - The ElcError object containing error details.
 * @returns The created calcite-alert element.
 */
export function createElcErrorAlert(error: ElcError): HTMLCalciteAlertElement {
  /* __PURE__ */ console.group("createElcErrorAlert");
  /* __PURE__ */ console.debug("elc error", error);

  // Create the alert element.
  const cAlert = document.createElement("calcite-alert");
  cAlert.open = true;
  cAlert.autoClose = true;
  cAlert.label = error.message;
  cAlert.kind = "warning";

  // Create the title element.
  const titleElement = document.createElement("div");
  titleElement.slot = "title";
  // Add ARM Calc a/o Locating Error message if they exist.
  let titleContent = [error.ArmCalcReturnMessage, error.LocatingError].filter(
    (s) => !!s,
  ) as string[];
  // Set default message if the array is empty.
  if (titleContent.length === 0) {
    titleContent = ["Error"];
  }
  titleElement.append(...titleContent);
  cAlert.append(titleElement);

  // Create the message element.
  const messageElement = document.createElement("div");
  messageElement.slot = "message";
  messageElement.append(error.toString());

  cAlert.append(messageElement);

  const shell = document.querySelector("calcite-shell");
  shell?.append(cAlert);
  /* __PURE__ */ console.groupEnd();
  return cAlert;
}
