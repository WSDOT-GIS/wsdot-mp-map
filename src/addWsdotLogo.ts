/**
 * Imports the raw SVG markup from the WSDOT logo SVG file.
 * @returns A Promise that resolves with the WSDOT logo element.
 */
export async function importWsdotLogoSvg(): Promise<SVGSVGElement> {
  const { default: svg } = await import(
    "@wsdot/web-styles/images/wsdot-logo/wsdot-logo-black.svg?raw"
  );

  // Parse the markup into a DOM element.
  const dp = new DOMParser();
  const wsdotLogo = dp.parseFromString(svg, "image/svg+xml")
    .documentElement as unknown as SVGSVGElement;

  return wsdotLogo;
}

/**
 * Asynchronously adds the WSDOT logo SVG to the HTML document.
 * @param parent - The parent element to which the logo will be added.
 * It can be either an HTML element or a CSS selector.
 * @returns A Promise that resolves with the WSDOT logo element.
 * @throws {Error} If the heading element is not found.
 */
export async function addWsdotLogo(parent: string | Element) {
  // Import raw SVG markup from SVG file.
  const wsdotLogo = await importWsdotLogoSvg();

  // Add an id attribute.
  wsdotLogo.id = "wsdot-logo";
  const wsdotLogoClass = "wsdot-logo";
  wsdotLogo.classList.add(wsdotLogoClass);

  // Add the logo to the heading element.
  // Throw an error if the heading element cannot found.
  const parentElement =
    typeof parent === "string" ? document.querySelector(parent) : parent;

  if (!parentElement) {
    throw new Error("Heading element not found");
  }
  // Prepend the logo to the heading element.
  parentElement.prepend(wsdotLogo);
  // Return the logo element.
  return wsdotLogo;
}
