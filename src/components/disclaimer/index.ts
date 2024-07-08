import content from "./content.html?raw";

/**
 * Creates the disclaimer modal
 * @returns The disclaimer modal
 */
export function createModal() {
  const modal = document.createElement("calcite-modal");
  modal.setAttribute("aria-labelledby", "modal-title");

  modal.innerHTML = content;
  return modal;
}

/**
 * Sets up a link to open a modal when it is clicked.
 * @param link - The link that will open the modal when clicked.
 * @param modal - The modal that will be opened. If omitted, a new
 * one will be created and appended to the document.
 * @returns The link and the modal.
 */
export function setupDisclaimerLink(
  link: HTMLElement,
  modal?: HTMLCalciteModalElement,
) {
  if (!modal) {
    modal = createModal();
    document.body.appendChild(modal);
  }
  if (/WSDOT-FOOTER/i.test(link.tagName)) {
    // Setup disclaimer modal
    link.addEventListener("disclaimer-link-clicked", () => {
      modal.open = true;
    });
  } else {
    // Setup disclaimer modal
    link.addEventListener("click", (e) => {
      modal.open = true;
      e.preventDefault();
    });
  }

  return {
    modal,
    link,
  };
}
