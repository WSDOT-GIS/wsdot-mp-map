import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import { suite, expect, test } from "vitest";
import { convertArcGisFeatureSetToGeoJson } from "../src/export";
// TODO: figure out how to import using correct ".geojson" extension.
import geoJsonSample from "./mileposts-sample.geojson.json";
import arcgisSample from "./mileposts-sample.arcgis.json";

suite("ArcGIS to GeoJSON export", () => {
  test("test", () => {
    const featureSet = FeatureSet.fromJSON(arcgisSample);
    const actualGeoJsonFeatureCollection =
      convertArcGisFeatureSetToGeoJson(featureSet);
    expect(actualGeoJsonFeatureCollection).toEqual(geoJsonSample);
  });
});
