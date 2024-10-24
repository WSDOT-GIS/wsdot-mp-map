import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import { describe, test } from "vitest";
import { convertArcGisFeatureSetToGeoJson } from "../src/export";
import arcgisSample from "./mileposts-sample.arcgis.json";
// TODO: figure out how to import using correct ".geojson" extension.
import geoJsonSample from "./mileposts-sample.geojson.json";

describe.concurrent("ArcGIS to GeoJSON export", () => {
	test("test", ({ expect }) => {
		const featureSet = FeatureSet.fromJSON(arcgisSample);
		const actualGeoJsonFeatureCollection =
			convertArcGisFeatureSetToGeoJson(featureSet);
		expect(actualGeoJsonFeatureCollection).toEqual(geoJsonSample);
	});
});
