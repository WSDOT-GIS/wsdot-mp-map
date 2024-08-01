const arcGisOnlineId = "a2050b09baff493aa4ad7848ba2fac00";

const [{ default: TileLayer }, { default: PortalItem }] = await Promise.all([
  import("@arcgis/core/layers/TileLayer"),
  import("@arcgis/core/portal/PortalItem"),
]);

/**
 * Parcels layer
 * @see {@link https://wsdot.maps.arcgis.com/home/item.html?id=9c7f4cd9a1354d8db79c471be957a0d2}
 */
export const parcelsLayer = new TileLayer({
  id: "parcels",
  visible: false,
  portalItem: new PortalItem({
    id: arcGisOnlineId,
  }),
  listMode: "hide-children",
  legendEnabled: false,
});
