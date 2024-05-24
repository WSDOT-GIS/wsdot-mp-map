/**
 * Asynchronously adds the WSDOT logo SVG to the HTML document.
 * @returns A Promise that resolves with the WSDOT logo element.
 * @throws {Error} If the heading element is not found.
 */
export async function addWsdotLogo() {
  // Import raw SVG markup from SVG file.
  const { default: svg } = await import(
    "@wsdot/web-styles/images/wsdot-logo/wsdot-logo-black.svg?raw"
  );
  // Parse the markup into a DOM element.
  const dp = new DOMParser();
  const wsdotLogo = dp.parseFromString(svg, "image/svg+xml").documentElement;

  // Add an id attribute.
  wsdotLogo.id = "wsdot-logo";

  // Add the logo to the heading element.
  // Throw an error if the heading element cannot found.
  const headingSelector = "h2";
  const headingElement = document.body.querySelector(headingSelector);
  if (!headingElement) {
    throw new Error("Heading element not found");
  }
  // Prepend the logo to the heading element.
  headingElement.prepend(wsdotLogo);
  // Return the logo element.
  return wsdotLogo;
}
