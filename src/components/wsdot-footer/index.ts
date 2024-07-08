import wsdotColorsCss from "../../wsdot-web-styles/css/wsdot-colors.css?raw";
import content from "./content.html?raw";

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
    const slot = shadow.querySelector<HTMLSlotElement>("slot[name='year']");
    if (slot) {
      const year = new Date().getFullYear();
      slot.innerText = year.toString();
    } else {
      const message = "Could not find a slot in the wsdot-footer named 'year'.";
      const event = new ErrorEvent("error", { message });
      this.dispatchEvent(event);
      console.error(message);
    }

    // Add CSS stylesheet to the Shadow DOM.
    const wsdotColorsStylesheet = new CSSStyleSheet();
    wsdotColorsStylesheet.replaceSync(wsdotColorsCss);

    // Add CSS stylesheet to the Shadow DOM.
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(`
      :host {
        display: block;
        background-color: var(--wsdot-logo-green);
        color: white;
      }
    footer>ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        text-align: center;
    }

    footer>ul>li {
        display: inline-flex;
        margin: 0.2rem;
        padding-left: 12.8px;
        padding-right: 12.8px;
    }
    `);
    shadow.adoptedStyleSheets = [wsdotColorsStylesheet, stylesheet];

    // Add disclaimer link
    const disclaimerLink =
      shadow.querySelector<HTMLAnchorElement>(".disclaimer-link");
    if (!disclaimerLink) {
      const message =
        "Could not find a link in the wsdot-footer named 'disclaimer-link'.";
      console.error(message);
    } else {
      /* __PURE__ */ console.debug("disclaimerLink", disclaimerLink);
      disclaimerLink.addEventListener("click", (clickEvent) => {
        const event = new CustomEvent("disclaimer-link-clicked");
        this.dispatchEvent(event);
        clickEvent.preventDefault();
      });
    }
  }
}

customElements.define("wsdot-footer", WsdotFooter);
