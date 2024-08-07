import { objectIdFieldName } from "../../elc/types";
import arcadeExpressions from "./arcade";
import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import type Field from "@arcgis/core/layers/support/Field";

type FieldProperties = Required<ConstructorParameters<typeof Field>>[0];

export const enum fieldNames {
  Route = "Route",
  Srmp = "Srmp",
  Back = "Back",
  Direction = "Direction",
  // TownshipSubdivision = "Township Subdivision",
  // County = "County",
  // City = "City",
}

const fields = [
  {
    name: objectIdFieldName,
    type: "oid",
    valueType: "unique-identifier",
  },
  {
    name: fieldNames.Route,
    type: "string",
    valueType: "name-or-title",
  },
  {
    name: fieldNames.Direction,
    type: "string",
    domain: {
      type: "coded-value",
      codedValues: [
        {
          code: "I",
          name: "Increase",
        },
        {
          code: "D",
          name: "Decrease",
        },
      ],
      name: "Direction",
    },
    defaultValue: "I",
    valueType: "type-or-category",
  },
  {
    name: fieldNames.Srmp,
    type: "double",
    valueType: "measurement",
  },
  {
    name: fieldNames.Back,
    type: "string",
    valueType: "binary",
  },
] as FieldProperties[];

/**
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @param spatialReference - The {@link SpatialReference} of the layer.
 * @returns - A {@link FeatureLayer}
 */
export async function createMilepostLayer(spatialReference: SpatialReference) {
  const [
    { default: FeatureLayer },
    { default: FieldInfo },
    { default: SimpleRenderer },
    { default: waExtent },
    { default: labelClass },
    { highwaySignBackgroundColor, highwaySignTextColor },
  ] = await Promise.all([
    import("@arcgis/core/layers/FeatureLayer"),
    import("@arcgis/core/popup/FieldInfo"),
    import("@arcgis/core/renderers/SimpleRenderer"),
    import("../../WAExtent"),
    import("./labelClass"),
    import("../../colors"),
  ]);
  /**
   * This is the symbol for the point on the route.
   */
  const actualMPSymbol = await import(
    "@arcgis/core/symbols/SimpleMarkerSymbol"
  ).then(
    ({ default: SimpleMarkerSymbol }) =>
      new SimpleMarkerSymbol({
        color: highwaySignBackgroundColor,
        size: 12,
        style: "circle",
        outline: {
          width: 1,
          color: highwaySignTextColor,
        },
      }),
  );

  const renderer = new SimpleRenderer({
    symbol: actualMPSymbol,
  });
  const milepostLayer = new FeatureLayer({
    labelingInfo: [labelClass],
    title: "Mileposts",
    id: "mileposts",
    listMode: "hide",
    fields: fields,
    geometryType: "point",
    objectIdField: objectIdFieldName,
    fullExtent: waExtent,
    renderer,
    spatialReference,
    // Since there are no features at the beginning,
    // need to add an empty array as the source.
    source: [],
    popupEnabled: true,
    hasM: true,
  });

  const popupTemplate = milepostLayer.createPopupTemplate();

  // Set certain fields to be hidden in the popup.
  for (const element of [
    fieldNames.Route,
    fieldNames.Srmp,
    fieldNames.Back,
    fieldNames.Direction,
  ]) {
    const fieldInfo = popupTemplate.fieldInfos.find(
      (fi) => fi.fieldName === (element as string),
    );

    if (fieldInfo) {
      fieldInfo.visible = false;
    }
  }

  popupTemplate.expressionInfos = arcadeExpressions;

  // Append expressions to the PopupTemplate's fieldInfos array.
  for (const xi of arcadeExpressions) {
    popupTemplate.fieldInfos.push(
      new FieldInfo({
        fieldName: `expression/${xi.name}`,
      }),
    );
  }

  milepostLayer.popupTemplate = popupTemplate;

  popupTemplate.title = "{Route} ({Direction}) @ {expression/milepostLabel}";

  return milepostLayer;
}
