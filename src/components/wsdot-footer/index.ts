import wsdotColorsCss from "../../wsdot-web-styles/css/wsdot-colors.css?raw";
import content from "./content.html?raw";
import css from "./index.css?raw";

/**
 * WSDOT Footer custom element.
 */
export class WsdotFooter extends HTMLElement {
  /**
   * Initializes the WsdotFooter component by creating a Shadow DOM and setting its content.
   * Also sets the year in the footer to the current year and adds CSS stylesheets to the Shadow DOM.
   */
  connectedCallback() {
    // Create the Shadow DOM.
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = content;

    // Set the year in the footer to this year.
    const year = new Date().getFullYear();
    const yearSpan = document.createElement("span");
    yearSpan.textContent = year.toString();
    yearSpan.slot = "year";
    this.append(yearSpan);

    // Add CSS stylesheet to the Shadow DOM.
    const wsdotColorsStylesheet = new CSSStyleSheet();
    wsdotColorsStylesheet.replaceSync(wsdotColorsCss);

    // Add CSS stylesheet to the Shadow DOM.
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(css);
    shadow.adoptedStyleSheets = [wsdotColorsStylesheet, stylesheet];

    // Add disclaimer link
    const disclaimerLink =
      shadow.querySelector<HTMLAnchorElement>(".disclaimer-link");
    if (!disclaimerLink) {
      const message =
        "Could not find a link in the wsdot-footer named 'disclaimer-link'.";
      console.error(message);
    } else {
      disclaimerLink.addEventListener("click", (clickEvent) => {
        const event = new CustomEvent("disclaimer-link-clicked");
        this.dispatchEvent(event);
        clickEvent.preventDefault();
      });
    }
  }
}

customElements.define("wsdot-footer", WsdotFooter);
