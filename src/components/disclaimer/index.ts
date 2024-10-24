/**
 * Sets up a link to open a modal when it is clicked.
 * @param link - The link that will open the modal when clicked.
 * @param dialog - The modal that will be opened. If omitted, a new
 * one will be created and appended to the document.
 * @returns The link and the modal.
 */
export function setupDisclaimerLink(
	link: HTMLElement,
	dialog?: HTMLCalciteDialogElement,
) {
	if (!dialog) {
		dialog =
			document.body.querySelector<HTMLCalciteDialogElement>(
				"#disclaimer-dialog",
			) ?? undefined;
	}
	if (!dialog) {
		throw new Error("Could not find disclaimer dialog.");
	}
	if (/WSDOT-FOOTER/i.test(link.tagName)) {
		// Setup disclaimer modal
		link.addEventListener("disclaimer-link-clicked", () => {
			dialog.open = true;
		});
	} else {
		// Setup disclaimer modal
		link.addEventListener("click", (e) => {
			dialog.open = true;
			e.preventDefault();
		});
	}

	return {
		modal: dialog,
		link,
	};
}
