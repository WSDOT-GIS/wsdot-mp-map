import { objectIdFieldName } from "../../elc/types";
import { popupTemplate } from "./MilepostLayerTemplate";
import Graphic from "@arcgis/core/Graphic";
import Viewpoint from "@arcgis/core/Viewpoint";
import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import type Field from "@arcgis/core/layers/support/Field";
import type FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";

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
  import("../../WAExtent"),
  import("./labelClass"),
  import("../../colors"),
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
    valueType: "unique-identifier",
  },
  {
    name: fieldNames.Route,
    type: "string",
    valueType: "name-or-title",
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
  },
  {
    name: "Township Subdivision",
    type: "string",
  },
  { name: fieldNames.County, type: "string" },
  {
    name: fieldNames.City,
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
    listMode: "hide",
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

    async function openPopup(event: __esri.FeatureLayerEditsEvent & Edits) {
      try {
        let features = event.edits.addFeatures;

        const queryResults = await milepostLayer.queryFeatures({
          objectIds: features.map(
            (f) => f.getAttribute(milepostLayer.objectIdField) as number,
          ),
          returnGeometry: true,
        });

        features = queryResults.features;

        const viewpoint = new Viewpoint({
          targetGeometry: features[0].geometry,
          scale: 1128.4971765,
        });

        await view.goTo(viewpoint, {
          pickClosestTarget: true,
        });
        const location = features[0].geometry as __esri.Point;
        await view.openPopup({
          features: [...features],
          location,
          // fetchFeatures: true,
        });
      } finally {
        /* __PURE__ */ console.groupEnd();
      }
    }

    milepostLayer.on("edits", (event) => {
      if (!isEdits(event)) {
        console.error("Is not a valid edits event", event);
        return;
      } else if (event.edits.addFeatures.length === 0) {
        console.error("No features found in edits event", event);
        return;
      }
      openPopup(event).catch((reason: unknown) => {
        console.error("openPopup failed", reason);
      });
    });

    createHandle.remove();
  });

  return milepostLayer;
}
