import wsdotLogo from "../../wsdot-web-styles/images/wsdot-logo/wsdot-logo-white.svg";
import content from "./content.html?raw";
import css from "./index.css?raw";

console.log(wsdotLogo);

export class WsdotHeader extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = content;
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(css);
    shadow.adoptedStyleSheets = [stylesheet];
    const img = shadow.querySelector("img");
    if (img) {
      img.src = wsdotLogo;
    }
  }
}

customElements.define("wsdot-header", WsdotHeader);
