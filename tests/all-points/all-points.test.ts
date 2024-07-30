import {
  getNearestMilepost,
  NearestMilepostError,
} from "../../src/layers/mp-service-layer";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { writeFile } from "node:fs/promises";
import { suite, expect, test } from "vitest";

suite("all-points", () => {
  test("all-points", async () => {
    expect(getNearestMilepost).toBeDefined();
    const inputPoint = new Point({
      x: -122.29193564534154,
      y: 47.34345774504132,
      spatialReference: new SpatialReference({ wkid: 4326 }),
    });
    const response = await getNearestMilepost({
      geometry: inputPoint,
      distance: 300,
      units: "feet",
    });

    const { distances, errors } = response;

    const distanceTable = distances.map((d) => {
      return {
        distance: d.distance,
        ...(d.feature.attributes as object),
      };
    });

    if (distanceTable.length) {
      console.table(distanceTable);
    }
    if (errors.length) {
      const errorOutput = errors.map((e) => {
        if (e instanceof NearestMilepostError) {
          const { feature, inputParams, message, name } = e;
          const {
            geometry: inputPoint,
            units,
            outSpatialReference,
          } = inputParams;
          const { x: inputX, y: inputY, spatialReference: inSR } = inputPoint;
          const { attributes, geometry } = feature as unknown as {
            attributes: object;
            geometry: Point;
          };
          const { x: outX, y: outY, spatialReference: outSR } = geometry;
          const outputObject = {
            name,
            message,
            units,
            outSpatialReference,
            ...attributes,
            in: [inputX, inputY, inSR.wkid],
            out: [outX, outY, outSR.wkid],
          };
          return outputObject;
        } else if (e instanceof Error) {
          return e.message;
        }
        return e;
      });
      await writeFile("./errors.json", JSON.stringify(errorOutput, null, 2));
    }

    expect(distances).to.have.length.greaterThanOrEqual(1);
    expect(errors).to.be.toBeFalsy();
  });
});
