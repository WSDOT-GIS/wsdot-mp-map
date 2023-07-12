import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import "@fontsource/overpass";
import { createMPSymbol, defaultSymbol } from "./MilepostIcon";
import waExtent from "./WAExtent";
import { isMilepostFeature, objectIdFieldName } from "./types";

const renderer = new SimpleRenderer({
  symbol: defaultSymbol,
});

async function updateSymbols(
  this: FeatureLayer,
  event: __esri.FeatureLayerEditsEvent
): Promise<void> {
  console.log("mp on edits", this);

  const { addedFeatures, updatedFeatures } = event;

  if (!addedFeatures.length && !updatedFeatures.length) {
    return;
  }

  const edits =
    addedFeatures.length && updatedFeatures.length
      ? addedFeatures.concat(updatedFeatures)
      : addedFeatures.length
      ? addedFeatures
      : updatedFeatures;

  const features = edits.map((edit) => {
    const { objectId } = edit;

    const currentGraphic = this.queryFeatures({
      objectIds: [objectId],
    }).then((featureSet) =>
      featureSet.features.length ? featureSet.features[0] : undefined
    );
    return currentGraphic;
  });

  for await (const feature of features) {
    if (!feature || !isMilepostFeature(feature)) {
      continue;
    }

    const symbol = createMPSymbol(feature);
    feature.symbol = symbol;
  }
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
] as __esri.FieldProperties[];

/**
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @returns - A {@link FeatureLayer}
 */
export function createMilepostLayer(spatialReference: SpatialReference) {
  const milepostLayer = new FeatureLayer({
    // labelingInfo,
    title: "Mileposts",
    id: "mileposts",
    fields: fields,
    geometryType: "point",
    objectIdField: objectIdFieldName,
    fullExtent: waExtent,
    renderer,
    spatialReference,
    source: [],
    popupEnabled: true,
    hasM: true,
  });

  milepostLayer.on("edits", updateSymbols);

  return milepostLayer;
}
