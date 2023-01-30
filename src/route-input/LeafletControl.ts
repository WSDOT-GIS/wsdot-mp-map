import { Control, type Map as LeafletMap } from "leaflet";
import NotImplementedError from "../NotImplementedError";

export class SrmpControl extends Control {
  /**
   * @inheritdoc
   */
  constructor(args: ConstructorParameters<typeof Control>) {
    const [options] = args;
    super(options);
    options?.position;
  }

  onAdd(map: LeafletMap): HTMLElement {
    throw new NotImplementedError();
  }

  onRemove(map: LeafletMap): void {
    throw new NotImplementedError();
  }
}
