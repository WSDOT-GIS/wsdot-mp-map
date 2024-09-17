import { ElcError } from "./elc/errors";

/**
 * Creates an error alert element based on the provided ElcError.
 * @param error - The ElcError object containing error details.
 * @returns The created calcite-alert element.
 */
export function createElcErrorDialog(error: ElcError) {
  // Create the alert element.
  const cDialog = document.createElement("calcite-dialog");
  cDialog.open = true;
  cDialog.kind = "warning";
  cDialog.placement = "center";

  if (error.routeLocation) {
    cDialog.heading = `Error locating ${error.routeLocation}`;
    const p = document.createElement("p");
    p.append("There was an error locating ", error.routeLocation, ".");
    cDialog.append(p);
  } else {
    cDialog.heading = "Error";
  }

  if (error.ArmCalcReturnCode !== 0) {
    const armCalcAlert = document.createElement("calcite-block");
    armCalcAlert.heading = `ARM Calc Error #${error.ArmCalcReturnCode}`;
    armCalcAlert.iconStart = "calculator";
    armCalcAlert.open = true;
    armCalcAlert.append(error.ArmCalcReturnMessage);
    cDialog.append(armCalcAlert);
  }

  if (error.LocatingError) {
    const locatingAlert = document.createElement("calcite-block");
    locatingAlert.heading = "Locating Error";
    locatingAlert.iconStart = "exclamation-mark-triangle";
    locatingAlert.open = true;
    locatingAlert.append(error.LocatingError);
    cDialog.append(locatingAlert);
  }

  const hostId = "route-input-form-panel";
  const hostBlock = document.querySelector<HTMLCalcitePanelElement>(
    `#${hostId}`,
  );

  hostBlock?.append(cDialog);

  // Remove the dialog when it is closed, as it is no longer needed.
  cDialog.addEventListener("calciteDialogClose", () => {
    cDialog.remove();
  });

  return cDialog;
}

/**
 * Creates an HTMLCalciteAlertElement with the given error message or Error object.
 * If the error is an instance of ElcError, it calls createElcErrorAlert instead.
 * @param error - The error message or Error object.
 * @param alertProperties - Additional properties to set on the HTMLCalciteAlertElement.
 * @returns The created HTMLCalciteAlertElement.
 */
export function createErrorAlert(
  error: string | Error,
  alertProperties?: Partial<HTMLCalciteAlertElement>,
) {
  // If the error is an ElcError, create an alert with the error message.
  if (error instanceof ElcError) {
    return createElcErrorDialog(error);
  }
  const cAlert = document.createElement("calcite-alert");
  cAlert.open = true;
  cAlert.autoClose = true;

  const titleElement = document.createElement("div");
  titleElement.slot = "title";
  let title: Node | string;
  if (alertProperties?.title) {
    title = alertProperties.title;
  } else if (typeof error === "string") {
    title = error;
  } else {
    title = error.name;
  }
  titleElement.append(title);
  cAlert.append(titleElement);

  const message = typeof error === "string" ? error : error.message;
  const messageElement = document.createElement("div");
  messageElement.slot = "message";
  messageElement.append(
    ...message.split("\n").map((s) => {
      const p = document.createElement("p");
      p.textContent = s;
      return p;
    }),
  );

  cAlert.append(messageElement);

  cAlert.label = message;
  cAlert.append(message);
  cAlert.kind = "warning";
  const shell = document.querySelector("calcite-shell");
  shell?.append(cAlert);
  return cAlert;
}
