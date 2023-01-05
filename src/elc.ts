// https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe/Find%20Route%20Locations?f=json&locations={{route_locations}}&referenceDate=2017-12-31&outSR=2927&lrsYear=Current

export const mapServiceUrl = new URL(
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/"
);

export const elcSoeUrl = new URL("exts/ElcRestSoe/", mapServiceUrl);

export const findRouteLocationsUrl = new URL(
  "Find Route Locations/",
  elcSoeUrl
);

export const findNearestRouteLocationsUrl = new URL(
  "Find Nearest Route Locations",
  elcSoeUrl
);

export interface ElcLocation {
  Angle: number;
  Arm: number;
  ArmCalcReturnCode: number;
  ArmCalcReturnMessage: string | null;
  Back: boolean;
  Decrease: boolean;
  Distance: number;
  EventPoint: {
    x: number;
    y: number;
  };
  Id: 0;
  RealignmentDate: number;
  ReferenceDate: number;
  ResponseDate: number;
  Route: string;
  RouteGeometry: {
    __type: "Point:#Wsdot.Geometry.Contracts";
    spatialReference: {
      wkid: number;
    };
    x: number;
    y: number;
  };
  Srmp: number;
}

export async function FindRouteLocations(
  coords: number[],
  inSR = 4326,
  outSR = 4326
): Promise<ElcLocation[]> {
  if (coords.length < 2 || coords.length % 2 !== 0) {
    throw new Error(
      `Input array must have two or more elements and have an even number of elements.\n${
        coords ?? "null"
      }`
    );
  }

  const requestUrl = new URL(findNearestRouteLocationsUrl);

  requestUrl.searchParams.set("f", "json");
  requestUrl.searchParams.set(
    "coordinates",
    encodeURIComponent(JSON.stringify(coords))
  );
  requestUrl.searchParams.set("inSR", inSR.toString());
  requestUrl.searchParams.set("outSR", outSR.toString());

  const response = await fetch(requestUrl);
  const responseJson = await response.json();

  if (Object.prototype.hasOwnProperty.call(responseJson, "error")) {
    throw responseJson.error;
  }

  return responseJson;
}
