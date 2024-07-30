import fields from "./fields";
import type Graphic from "@arcgis/core/Graphic";
import type Point from "@arcgis/core/geometry/Point";
import { distance as getDistance } from "@arcgis/core/geometry/geometryEngineAsync";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Query from "@arcgis/core/rest/support/Query";

interface DistanceAndFeature {
  distance: number;
  feature: Graphic;
}

const url = import.meta.env.VITE_ALL_STATE_ROUTE_POINTS_URL;

export const mpServiceLayer = new FeatureLayer({
  url,
  definitionExpression: "RelRouteType IN ('', 'SP', 'CO', 'AR')",
});

export type ValidFieldNames = (typeof fields)[number]["name"];

export interface NearestMilepostParameters extends __esri.QueryProperties {
  geometry: Point;
  units?: Exclude<__esri.QueryProperties["units"], "us-nautical-miles">;
  outFields?: ValidFieldNames[];
}

const defaultSearchRadius = parseFloat(import.meta.env.VITE_MP_SEARCH_RADIUS);
const defaultSearchRadiusUnits = import.meta.env.VITE_MP_SEARCH_RADIUS_UNITS;

/**
 * Checks if the input has a property named "message" of type string.
 * @param input - The input to be checked.
 * @returns Returns true if the input has a property named "message" of type string, otherwise false.
 */
function hasMessage(input: unknown): input is { message: string } {
  return (
    input != null &&
    typeof input === "object" &&
    "message" in input &&
    typeof input.message === "string"
  );
}

export class NearestMilepostError extends Error {
  constructor(
    public readonly inputParams: NearestMilepostParameters,
    public readonly feature: Graphic,
    public readonly sourceError: unknown,
    message?: string,
  ) {
    const eMessage = hasMessage(sourceError) ? sourceError.message : undefined;
    super(message ?? eMessage, {
      cause: sourceError,
    });
    this.name = "NearestMilepostError";
  }
}

/**
 * Get the mileposts nearest to the input point.
 * @param params - Specifies input point and search radius.
 * @returns - The nearest milepost, or an array of mileposts if they are the same distance away.
 */
export async function getNearestMilepost(params: NearestMilepostParameters) {
  // Set default values for distance and units if not provided.
  if (params.distance == null) {
    params.distance = defaultSearchRadius;
  }
  if (!params.units) {
    params.units = defaultSearchRadiusUnits;
  }
  if (!params.outFields) {
    params.outFields = [
      "RouteID",
      "Direction",
      "SRMP",
      "AheadBackInd",
      "ARM",
      "Azimuth",
      "Northing",
      "Easting",
      "Longitude",
      "Latitude",
      "LRS_Date",
      "StateRouteNumber",
      "RelRouteType",
      "RelRouteQual",
    ];
  }

  const queryParameters = {
    ...params,
    ...{
      outSpatialReference: params.geometry.spatialReference,
      returnGeometry: true,
    },
  };
  const query = new Query(queryParameters);
  const response = await mpServiceLayer.queryFeatures(query);

  const inputPoint = params.geometry;

  /**
   * Get the distance from the input point to each of the returned features,
   * then return only the closest one, or multiples if they are the same distance away.
   * @param features - The features to calculate distances to the input point.
   * @returns - An array of objects, each with a feature and the distance away from the input point.
   */
  async function getDistances(features: Graphic[]) {
    /* __PURE__ */ console.group("getDistances");
    // /* __PURE__ */ console.debug(
    //   `There are ${features.length} features to get distances for.`,
    //   { features: features.map((f) => f.toJSON() as unknown) },
    // );

    let distances: DistanceAndFeature[];
    let errors: unknown[] | undefined;
    try {
      // Initialize an array for getDistance promises.
      const distancePromises = [];
      // Call the function to get distances for each feature,
      // then store the promise in the distancePromises array.
      for (const f of features) {
        const { units } = params;
        const distancePromise = getDistance(inputPoint, f.geometry, units)
          .then((d) => ({ distance: d, feature: f }))
          .catch((e: unknown) => {
            throw new NearestMilepostError(params, f, e);
          });
        distancePromises.push(distancePromise);
      }
      // Wait for the promises to resolve.
      const allResponses = await Promise.allSettled(distancePromises);
      distances = allResponses
        .filter((v) => v.status === "fulfilled")
        .map((v) => v.value);
      errors = allResponses
        .filter((v) => v.status === "rejected")
        .map((v) => v.reason as unknown);
    } finally {
      /* __PURE__ */ console.groupEnd();
    }
    return { distances, errors };
  }

  return getDistances(response.features);
}
