import { Control, ControlOptions, type Map as LeafletMap } from "leaflet";
import { createRouteInputForm, srmpSubmitEventName } from "./index";

const preventSubmit: EventListenerOrEventListenerObject = (ev: Event) =>
  ev.preventDefault();

/**
 * A user control for entering an milepost location
 * along a route.
 */
export class SrmpControl extends Control {
  private _mpForm: ReturnType<typeof createRouteInputForm>;
  public get mpForm(): ReturnType<typeof createRouteInputForm> {
    return this._mpForm;
  }

  /**
   *
   */
  constructor(options: ControlOptions) {
    super(options);
    this._mpForm = createRouteInputForm();
  }

  /**
   * @inheritdoc
   * @see {@link https://leafletjs.com/reference.html#control-onadd}
   */
  onAdd(/*map: LeafletMap*/): HTMLElement {
    this.mpForm.addEventListener(srmpSubmitEventName, preventSubmit);
    return this.mpForm;
  }

  /**
   * @inheritdoc
   * @see {@link https://leafletjs.com/reference.html#control-onremove}
   */
  onRemove(map: LeafletMap): void {
    this.mpForm.removeEventListener(srmpSubmitEventName, preventSubmit);
    if (super.onRemove) {
      super.onRemove(map);
    }
  }
}

export default SrmpControl;
