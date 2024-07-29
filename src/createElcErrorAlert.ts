import { ElcError } from "./elc/errors";

/**
 * Creates an error alert element based on the provided ElcError.
 * @param error - The ElcError object containing error details.
 * @returns The created calcite-alert element.
 */
export function createElcErrorAlert(error: ElcError): HTMLCalciteAlertElement {
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
  return cAlert;
}

/**
 * Creates an HTMLCalciteAlertElement with the given error message or Error object.
 * If the error is an instance of ElcError, it calls createElcErrorAlert instead.
 * @param error - The error message or Error object.
 * @param alertProperties - Additional properties to set on the HTMLCalciteAlertElement.
 * @returns The created HTMLCalciteAlertElement.
 */
export function createErrorAlert<E extends Error>(
  error: string | E,
  alertProperties?: Partial<HTMLCalciteAlertElement>,
): HTMLCalciteAlertElement {
  // If the error is an ElcError, create an alert with the error message.
  if (error instanceof ElcError) {
    return createElcErrorAlert(error);
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

// Setup hot module reloading.
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      console.log("hot module replacement", newModule);
    }
  });
}
