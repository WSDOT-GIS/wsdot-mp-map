import { test } from "vitest";
import Basemap from "@arcgis/core/Basemap";
import { satelliteBasemap } from "../src/basemaps";
import Collection from "@arcgis/core/core/Collection";

test("satelliteBasemap should be an instance of Basemap", (t) => {
  t.expect(satelliteBasemap).is.instanceOf(Basemap);
});

test("satelliteBasemap should have reference layers added to it", (t) => {
  const { referenceLayers, baseLayers } = satelliteBasemap;
  t.expect(referenceLayers).toBeInstanceOf(Collection);
  t.expect(referenceLayers).toHaveLength(2); // Adjust the length based on the number of reference layers added
  t.expect(baseLayers).toBeInstanceOf(Collection);
  t.expect(baseLayers.length).toBeGreaterThanOrEqual(0);
  // Add more specific assertions based on your requirements
});
