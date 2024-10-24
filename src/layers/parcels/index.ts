import { parcelsLayer as regridLayer } from "./regrid";
import { parcelsLayer as waTechParcelsLayer } from "./watech";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

/**
 * Creates a group layer for parcels.
 * @returns A promise that resolves to the created group layer.
 */
export function createParcelsGroupLayer(): GroupLayer {
  const groupLayer = new GroupLayer({
    title: "Parcels",
    visibilityMode: "exclusive",
    visible: false,
  });
  waTechParcelsLayer.visible = true;

  const waTechErrorHandler = waTechParcelsLayer.on(
    "layerview-create-error",
    (event) => {
      const { error } = event;
      console.error(
        `Error creating WA Tech Parcels layer: ${error.message}`,
        event,
      );
      waTechErrorHandler.remove();
    },
  );

  groupLayer.addMany([waTechParcelsLayer, regridLayer]);
  return groupLayer;
}
