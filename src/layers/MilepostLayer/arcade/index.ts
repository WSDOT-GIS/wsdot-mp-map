import AccessControlArcade from "./Access Control.arcade?raw";
import BingMapsArcade from "./Bing Maps.arcade?raw";
import CityArcade from "./City.arcade?raw";
import CountyArcade from "./County.arcade?raw";
import GeoHackArcade from "./GeoHack.arcade?raw";
import GeoURIArcade from "./GeoURI.arcade?raw";
import GoogleStreetViewArcade from "./Google Street View.arcade?raw";
import MilepostLabelArcade from "./Milepost Label.arcade?raw";
import RegionArcade from "./Region.arcade?raw";
import SRViewURLArcade from "./SRView URL.arcade?raw";
import URLArcade from "./URL.arcade?raw";
import Wgs1984CoordinatesArcade from "./WGS 1984 Coordinates.arcade?raw";
import splitRouteIdFunction from "./parts/splitRouteId.function.arcade?raw";
import webMercatorToWgs1984 from "./parts/webMercatorToWgs1984.function.arcade?raw";
import ExpressionInfo from "@arcgis/core/popup/ExpressionInfo";

function replaceVariableValueInArcadeExpression(
  arcade: string,
  variable: string,
  value: string,
) {
  const pattern = String.raw`(?<=var\s+${variable}\s*=\s*).+(?=;)`;
  const regExp = new RegExp(pattern, "g");
  return arcade.replace(regExp, value);
}

const urlBase = window.location.href.split("?")[0];

const expressionInfoProperties = [
  {
    name: "accessControl",
    title: "Access Control",
    expression: AccessControlArcade,
    returnType: "string",
  },

  {
    name: "city",
    title: "City",
    expression: CityArcade,
    returnType: "string",
  },
  {
    name: "county",
    title: "County",
    expression: CountyArcade,
    returnType: "string",
  },

  {
    name: "milepostLabel",
    title: "Milepost Label",
    expression: [splitRouteIdFunction, MilepostLabelArcade].join("\n"),
    returnType: "string",
  },
  {
    name: "region",
    title: "Region",
    expression: [splitRouteIdFunction, RegionArcade].join("\n"),
    returnType: "string",
  },
  {
    name: "bingMaps",
    title: "Bing Maps",
    expression: [webMercatorToWgs1984, BingMapsArcade].join("\n"),
    returnType: "string",
  },
  {
    name: "geoHack",
    title: "GeoHack",
    expression: [webMercatorToWgs1984, GeoHackArcade].join("\n"),
    returnType: "string",
  },
  {
    name: "geoURI",
    title: "GeoURI",
    expression: [webMercatorToWgs1984, GeoURIArcade].join("\n"),
    returnType: "string",
  },
  {
    name: "googleStreetView",
    title: "Google Street View",
    expression: [webMercatorToWgs1984, GoogleStreetViewArcade].join("\n"),
    returnType: "string",
  },
  {
    name: "srViewURL",
    title: "SRView URL",
    expression: [splitRouteIdFunction, SRViewURLArcade].join("\n"),
    returnType: "string",
  },
  {
    name: "webMercatorToWgs1984",
    title: "GPS Coordinates",
    expression: [webMercatorToWgs1984, Wgs1984CoordinatesArcade].join("\n"),
  },
  {
    name: "url",
    title: "URL",
    expression: [
      splitRouteIdFunction,
      replaceVariableValueInArcadeExpression(
        URLArcade,
        "urlBase",
        `"${urlBase}"`,
      ),
    ].join("\n"),
    returnType: "string",
  },
] as const;

export type expressionNames = (typeof expressionInfoProperties)[number]["name"];

/**
 * Makes all properties in T writable.
 */
type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
 * This type definition is a subset of {@link ExpressionInfo}.
 */
export type MilepostExpressionInfo = InstanceType<typeof ExpressionInfo> &
  Writable<(typeof expressionInfoProperties)[number]>;

/**
 * Expression infos for the milepost layer.
 */
export const expressions = expressionInfoProperties.map(
  (info) => new ExpressionInfo(info) as MilepostExpressionInfo,
);

export default expressions;
