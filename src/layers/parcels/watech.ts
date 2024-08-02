const arcGisOnlineId = "96bd481859444ddd9c9f2a4d0d729570";
const parcelIdField = "PARCEL_ID_NR";

const [
  { default: FeatureLayer },
  { default: PortalItem },
  { default: LabelClass },
  { labelSymbol },
  { renderer },
] = await Promise.all([
  import("@arcgis/core/layers/FeatureLayer"),
  import("@arcgis/core/portal/PortalItem"),
  import("@arcgis/core/layers/support/LabelClass"),
  import("./label"),
  import("./renderer"),
]);

/**
 * Parcels layer
 * @see {@link https://wsdot.maps.arcgis.com/home/item.html?id=96bd481859444ddd9c9f2a4d0d729570}
 */
export const parcelsLayer = new FeatureLayer({
  id: "parcels",
  title: "Parcels From geo.wa.gov",
  minScale: 9027.977411,
  labelsVisible: true,
  labelingInfo: [
    new LabelClass({
      labelExpressionInfo: {
        expression: `$feature.${parcelIdField}`,
        title: "Parcel ID",
      },
      minScale: 1128.497176,
      symbol: labelSymbol,
      useCodedValues: true,
    }),
  ],
  displayField: parcelIdField,
  // TODO: Specify fields to include instead of returning all of them. Probably only need PARCEL_ID_NR.
  outFields: ["*"],
  // visible: false,
  portalItem: new PortalItem({
    id: arcGisOnlineId,
  }),
  popupEnabled: false,
  renderer,
});
