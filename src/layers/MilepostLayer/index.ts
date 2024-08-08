import { objectIdFieldName } from "../../elc/types";
import type { MilepostExpressionInfo } from "./arcade";
import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import type Field from "@arcgis/core/layers/support/Field";

type FieldProperties = Required<ConstructorParameters<typeof Field>>[0];

export const enum fieldNames {
  Route = "Route",
  Srmp = "Srmp",
  Back = "Back",
  Direction = "Direction",
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

const actionButtonProperties: __esri.ActionButtonProperties[] = [
  {
    active: false,
    title: "Copy coordinates",
    visible: true,
    type: "button",
    icon: "copy-to-clipboard",
    id: "copy",
  },
];

async function createActionButtons() {
  const [{ default: Collection }, { default: ActionButton }] =
    await Promise.all([
      import("@arcgis/core/core/Collection"),
      import("@arcgis/core/support/actions/ActionButton"),
    ]);
  return new Collection<InstanceType<typeof ActionButton>>(
    actionButtonProperties.map((ap) => new ActionButton(ap)),
  );
}

/**
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @param spatialReference - The {@link SpatialReference} of the layer.
 * @returns - A {@link FeatureLayer}
 */
export async function createMilepostLayer(spatialReference: SpatialReference) {
  const [
    { default: FeatureLayer },
    { default: FieldInfo },
    { default: waExtent },
    { default: labelClass },
  ] = await Promise.all([
    import("@arcgis/core/layers/FeatureLayer"),
    import("@arcgis/core/popup/FieldInfo"),
    import("../../WAExtent"),
    import("./labelClass"),
  ]);

  /**
   * A function that creates and adds field information for an expression.
   * @param milepostExpressionInfo - The expression information to create the field info for.
   * @returns The created field info.
   */
  function createAndAddFieldInfoForExpression(
    milepostExpressionInfo: MilepostExpressionInfo,
  ) {
    const fieldInfo = new FieldInfo({
      fieldName: `expression/${milepostExpressionInfo.name}`,
      visible: !["webMercatorToWgs1984", "milepostLabel"].includes(
        milepostExpressionInfo.name,
      ),
    });
    return fieldInfo;
  }

  /**
   * Creates a popup template for the milepost layer by hiding certain fields and adding arcade expressions.
   * @returns The created popup template.
   */
  function createPopupTemplate() {
    const popupTemplate = milepostLayer.createPopupTemplate({
      // Hide all of the initial fields.
      // These fields are already displayed in the popup's title.
      visibleFieldNames: new Set(),
    });

    createActionButtons()
      .then((actions) => {
        popupTemplate.actions = actions;
      })
      .catch((error: unknown) => {
        console.error("Error adding action buttons", error);
      });

    // Import the Arcade expressions, add them to the popup template, and then
    // add them to the popup template's fieldInfos array.
    import("./arcade")
      .then(({ default: arcadeExpressions }) => {
        popupTemplate.expressionInfos = arcadeExpressions;

        // Append expressions to the PopupTemplate's fieldInfos array.
        for (const xi of arcadeExpressions) {
          const fieldInfo = createAndAddFieldInfoForExpression(xi);
          popupTemplate.fieldInfos.push(fieldInfo);
        }
        popupTemplate.title =
          "{Route} ({Direction}) @ {expression/milepostLabel}";
      })
      .catch((error: unknown) => {
        console.error("Error adding Arcade expressions", error);
      });

    return popupTemplate;
  }
  /**
   * This is the symbol for the point on the route.
   */
  const milepostLayer = new FeatureLayer({
    labelingInfo: [labelClass],
    title: "Mileposts",
    id: "mileposts",
    listMode: "hide",
    fields: fields,
    geometryType: "point",
    objectIdField: objectIdFieldName,
    fullExtent: waExtent,
    spatialReference,
    // Since there are no features at the beginning,
    // need to add an empty array as the source.
    source: [],
    popupEnabled: true,
    hasM: true,
  });

  createRenderer()
    .then((renderer) => {
      milepostLayer.renderer = renderer;
    })
    .catch((error: unknown) => {
      console.error("Error creating renderer", error);
    });

  milepostLayer.popupTemplate = createPopupTemplate();

  return milepostLayer;
}
async function createRenderer() {
  const [
    { default: SimpleMarkerSymbol },
    { default: SimpleRenderer },
    { highwaySignBackgroundColor, highwaySignTextColor },
  ] = await Promise.all([
    import("@arcgis/core/symbols/SimpleMarkerSymbol"),
    import("@arcgis/core/renderers/SimpleRenderer"),
    import("../../colors"),
  ]);
  const actualMPSymbol = new SimpleMarkerSymbol({
    color: highwaySignBackgroundColor,
    size: 12,
    style: "circle",
    outline: {
      width: 1,
      color: highwaySignTextColor,
    },
  });

  const renderer = new SimpleRenderer({
    symbol: actualMPSymbol,
  });
  return renderer;
}
