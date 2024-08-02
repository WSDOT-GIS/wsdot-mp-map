/**
 * Creates a group layer for parcels.
 * @returns A promise that resolves to the created group layer.
 */
export async function createParcelsGroupLayer() {
  const { default: GroupLayer } = await import(
    "@arcgis/core/layers/GroupLayer"
  );
  const groupLayer = new GroupLayer({
    title: "Parcels",
    visibilityMode: "exclusive",
    visible: false,
  });
  const watechPromise = import("./watech").then((result) => {
    const { parcelsLayer } = result;
    parcelsLayer.visible = true;
    return parcelsLayer;
  });
  const regridPromise = import("./regrid").then(
    (result) => result.parcelsLayer,
  );
  [watechPromise, regridPromise].forEach((layer, i) => {
    groupLayer.add(layer, i);
  });
  return groupLayer;
}
