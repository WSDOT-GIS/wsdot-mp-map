const arcGisOnlineId = "1f39f397dfac410381b5d3d7b1a1e334";
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
 * @see {@link https://geo.wa.gov/datasets/1f39f397dfac410381b5d3d7b1a1e334_0}
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
  outFields: ["*"],
  visible: false,
  portalItem: new PortalItem({
    id: arcGisOnlineId,
  }),
  popupEnabled: false,
  renderer,
});
