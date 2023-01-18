import { request } from "@esri/arcgis-rest-request";
import type { Feature, Field } from "arcgis-rest-api";
import { gpsWkid } from "../constants";
import type PointRouteLocation from "../RouteLocationExtensions";

export enum layerDefStringFormat {
  simple = 0,
  json = 1,
  includeOutFields = 2,
}

export class LayerDef {
  constructor(
    public layerId: number,
    public where: string,
    public outFields?: string[]
  ) {}
}

export const defaultUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/DataLibrary/DataLibrary/FeatureServer";

export async function query(
  xy: [number, number],
  featureServiceUrl: string = defaultUrl
) {
  const response = await request(featureServiceUrl, {
    params: {
      geometry: xy.join(","),
      inSR: gpsWkid,
      spatialRel: "esriSpatialRelWithin",
      returnGeometry: false,
      f: "json",
    },
  });

  return response;
}
