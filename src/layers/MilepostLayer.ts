import Graphic from "@arcgis/core/Graphic";
import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import type Field from "@arcgis/core/layers/support/Field";
import type FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";
import { objectIdFieldName } from "../elc/types";
import { popupTemplate } from "./MilepostLayerTemplate";

const [
  { default: FeatureLayer },
  { default: SimpleRenderer },
  { default: SimpleMarkerSymbol },
  { default: waExtent },
  { default: labelClass },
  { highwaySignBackgroundColor, highwaySignTextColor },
] = await Promise.all([
  import("@arcgis/core/layers/FeatureLayer"),
  import("@arcgis/core/renderers/SimpleRenderer"),
  import("@arcgis/core/symbols/SimpleMarkerSymbol"),
  import("../WAExtent"),
  import("./labelClass"),
  import("../colors"),
]);

type FieldProperties = Required<ConstructorParameters<typeof Field>>[0];

export const enum fieldNames {
  Route = "Route",
  Srmp = "Srmp",
  Back = "Back",
  TownshipSubdivision = "Township Subdivision",
  County = "County",
  City = "City",
}

const fields = [
  {
    name: objectIdFieldName,
    type: "oid",
  },
  {
    name: "Route",
    type: "string",
  },
  {
    name: "Direction",
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
  },
  {
    name: "Srmp",
    type: "double",
  },
  {
    name: "Back",
    type: "string",
  },
  {
    name: "Township Subdivision",
    type: "string",
  },
  { name: "County", type: "string" },
  {
    name: "City",
    type: "string",
  },
] as FieldProperties[];

/**
 * Esri's type defs for {@link __esri.FeatureLayerEditsEvent} don't match the actual properties of the event object.
 * The type definition has an "editedFeatureResult" with an "adds" property which
 * contains an array of the added {@link Graphic|features}. However, in reality the "editedFeatureResult"
 * property does not exist in the event object.
 *
 * Instead there is an "edits" property which has an "addFeatures" property that contains the
 * added features (Graphic objects).
 *
 * Note that additional properties also exist but this app is not using them so they are not documented here.
 * @example
 * ```typescript
 * const { editedFeatures: editedFeatureResult } = event;
 * const { adds } = editedFeatureResult.editedFeatures;
 *
 * if (adds) {
 *   layerView.view
 *     .openPopup({
 *       features: adds,
 *     })
 *     .catch((reason) => console.error("openPopup failed", reason));
 * }
 * ```
 */
interface Edits extends Record<string, unknown> {
  edits: {
    addFeatures: Graphic[];
  };
}
/**
 * Checks if the input item is of type {@link Edits}.
 * @param item - the input item to be checked
 * @returns - `true` if the input item is of type
 * {@link Edits}, `false` otherwise.
 */
function isEdits(item: unknown): item is Edits {
  return (
    !!item &&
    typeof item === "object" &&
    "edits" in item &&
    !!item.edits &&
    typeof item.edits === "object" &&
    "addFeatures" in item.edits
  );
}

/**
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @param spatialReference - The {@link SpatialReference} of the layer.
 * @returns - A {@link FeatureLayer}
 */
export function createMilepostLayer(spatialReference: SpatialReference) {
  /**
   * This is the symbol for the point on the route.
   */
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
  const milepostLayer = new FeatureLayer({
    labelingInfo: [labelClass],
    title: "Mileposts",
    id: "mileposts",
    fields: fields,
    geometryType: "point",
    objectIdField: objectIdFieldName,
    fullExtent: waExtent,
    popupTemplate: popupTemplate,
    renderer,
    spatialReference,
    // Since there are no features at the beginning,
    // need to add an empty array as the source.
    source: [],
    popupEnabled: true,
    hasM: true,
  });

  const createHandle = milepostLayer.on("layerview-create", (createEvent) => {
    const layerView = createEvent.layerView as FeatureLayerView;
    const { view } = layerView;

    milepostLayer.on("edits", (event) => {
      if (isEdits(event) && event.edits.addFeatures.length) {
        const features = event.edits.addFeatures;
        // Zoom to the features that were just added.
        view.goTo(features).catch((reason: unknown) => {
          console.error("goTo failed", reason);
        });

        // TODO: When the popup opens, it does not show the content.
        // The openPopup code will commented-out until this can be fixed.
        // At that point the view.goTo will no longer be needed.

        // layerView.view
        //   .openPopup({
        //     features,
        //     shouldFocus: true,
        //     updateLocationEnabled: true,
        //   })
        //   .catch((reason) => console.error("openPopup failed", reason));
      }
    });

    createHandle.remove();
  });

  return milepostLayer;
}
