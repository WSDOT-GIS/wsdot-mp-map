import { Milepost } from "wsdot-route-utils";

export class MilepostInput extends HTMLElement {
  declare value: `${number}` | `${number}B`;

  public get valueAsMilepost(): Milepost | null {
    if (this.milepostInput.value) {
      return new Milepost(this.milepostInput.valueAsNumber, this.backInput.checked);
    }
    return null;
  }

  protected milepostInput: HTMLInputElement;
  protected backInput: HTMLInputElement;
  protected backLabel: HTMLLabelElement;

  /**
   * Creates a new instance of this custom element
   */
  constructor() {
    super();

    this.milepostInput = document.createElement("input");
    this.milepostInput.type = "number";
    this.milepostInput.min = `${0}`;
    this.milepostInput.step = `${0.01}`;

    this.backInput = document.createElement("input");
    this.backInput.type = "checkbox";

    this.backLabel = document.createElement("label");
    this.backLabel.textContent = "back mileage";

    const shadowRoot = this.attachShadow({
      mode: "closed",
    });


    shadowRoot.append(this.milepostInput, this.backInput, this.backLabel);
  }
}

customElements.define("milepost-input", MilepostInput);

export default MilepostInput;
