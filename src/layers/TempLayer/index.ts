import { objectIdFieldName } from "../../elc/types";

const [
  { default: Collection },
  { default: SpatialReference },
  { default: FeatureLayer },
  { default: Field },
  { default: SimpleRenderer },
  { loadingSymbol },
] = await Promise.all([
  import("@arcgis/core/core/Collection"),
  import("@arcgis/core/geometry/SpatialReference"),
  import("@arcgis/core/layers/FeatureLayer"),
  import("@arcgis/core/layers/support/Field"),
  import("@arcgis/core/renderers/SimpleRenderer"),
  import("./loadingSymbol"),
]);

/**
 * This layer is used for showing the user where the clicked
 * before the ELC call has completed. Once the ELC call has
 * completed, a graphic will be added to the milepost layer
 * and the corresponding graphic should be removed from
 * this layer.
 */
export const tempLayer = new FeatureLayer({
  renderer: new SimpleRenderer({
    symbol: loadingSymbol,
  }),
  title: "Temporary Layer",
  geometryType: "point",
  legendEnabled: false,
  listMode: "hide",
  spatialReference: SpatialReference.WebMercator,
  id: "tempLayer",
  fields: [
    new Field({
      name: objectIdFieldName,
      alias: "Object ID",
      type: "oid",
    }),
    new Field({
      name: "MilepostId",
      alias: "Milepost ID",
      type: "string",
      valueType: "unique-identifier",
    }),
  ],
  source: new Collection([]),
});
