/**
 * Replaces the title attribute on all Calcite elements with a tooltip.
 *
 * By default, the browser will display the title attribute as a tooltip when
 * the user hovers over the element. However, this can be visually jarring as
 * the browser will display the tooltip in addition to any Calcite tooltips that
 * are already displayed. To avoid this, this function will replace the title
 * attribute with a Calcite tooltip element.
 *
 * This function should be called after all Calcite elements have been rendered.
 * @param parent - The parent element to search for Calcite elements.
 */
export function replaceTitleWithTooltip(parent = document.body) {
	/* __PURE__ */ console.group("replaceTitleWithTooltip");
	try {
		const elementsWithTitles = parent.querySelectorAll<HTMLElement>("[title]");
		/* __PURE__ */ console.debug(
			`Found ${elementsWithTitles.length} elements with titles`,
			elementsWithTitles,
		);
		for (const element of elementsWithTitles) {
			// Skip non-calcite elements.
			if (
				!/^calcite-/i.test(element.tagName) ||
				element.tagName === "CALCITE-COMBOBOX"
			) {
				/* __PURE__ */ console.debug(
					`Skipping non calcite element: ${element.tagName}`,
					element,
				);
				continue;
			}

			const { title } = element;

			const tooltip = document.createElement("calcite-tooltip");
			tooltip.referenceElement = element;
			tooltip.append(title);
			element.removeAttribute("title");
			parent.append(tooltip);
		}
	} finally {
		/* __PURE__ */ console.groupEnd();
	}
}

export default replaceTitleWithTooltip;
