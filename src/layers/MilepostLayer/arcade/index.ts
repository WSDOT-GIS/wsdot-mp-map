import AccessControlArcade from "./Access Control.arcade?raw";
import BingMapsArcade from "./Bing Maps.arcade?raw";
import CityArcade from "./City.arcade?raw";
import CountyArcade from "./County.arcade?raw";
import GeoHackArcade from "./GeoHack.arcade?raw";
import GeoURIArcade from "./GeoURI.arcade?raw";
import GoogleStreetViewArcade from "./Google Street View.arcade?raw";
import LRSArcade from "./LRS Date.arcade?raw";
import MilepostLabelArcade from "./Milepost Label.arcade?raw";
import RegionArcade from "./Region.arcade?raw";
import SRViewURLArcade from "./SRView URL.arcade?raw";
import URLArcade from "./URL.arcade?raw";
import ExpressionInfo from "@arcgis/core/popup/ExpressionInfo";

const expressionInfoProperties = [
  {
    name: "expression/accessControl",
    title: "Access Control",
    expression: AccessControlArcade,
    returnType: "string",
  },
  {
    name: "expression/bingMaps",
    title: "Bing Maps",
    expression: BingMapsArcade,
    returnType: "string",
  },
  {
    name: "expression/city",
    title: "City",
    expression: CityArcade,
    returnType: "string",
  },
  {
    name: "expression/county",
    title: "County",
    expression: CountyArcade,
    returnType: "string",
  },
  {
    name: "expression/geoHack",
    title: "GeoHack",
    expression: GeoHackArcade,
    returnType: "string",
  },
  {
    name: "expression/geoURI",
    title: "GeoURI",
    expression: GeoURIArcade,
    returnType: "string",
  },
  {
    name: "expression/googleStreetView",
    title: "Google Street View",
    expression: GoogleStreetViewArcade,
    returnType: "string",
  },
  {
    name: "expression/lrsDate",
    title: "LRS Date",
    expression: LRSArcade,
    returnType: "string",
  },
  {
    name: "expression/milepostLabel",
    title: "Milepost Label",
    expression: MilepostLabelArcade,
    returnType: "string",
  },
  {
    name: "expression/region",
    title: "Region",
    expression: RegionArcade,
    returnType: "string",
  },
  {
    name: "expression/srViewURL",
    title: "SRView URL",
    expression: SRViewURLArcade,
    returnType: "string",
  },
  {
    name: "expression/url",
    title: "URL",
    expression: URLArcade,
    returnType: "string",
  },
] as const;

export type expressionNames = (typeof expressionInfoProperties)[number]["name"];

export type ValidExpressionName = `expression/${string}`;

/**
 * Checks if the given name is a valid expression name.
 * @param name - The name to be checked.
 * @returns Returns true if the name is a valid expression name, otherwise false.
 */
export function isExpressionName(name: string): name is ValidExpressionName {
  return name.startsWith("expression/");
}

/**
 * Makes all properties in T writable.
 */
type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
 * This type definition is a subset of {@link ExpressionInfo}.
 */
type MilepostExpressionInfo = InstanceType<typeof ExpressionInfo> &
  Writable<(typeof expressionInfoProperties)[number]>;

/**
 * Expression infos for the milepost layer.
 */
export const expressions = expressionInfoProperties.map(
  (info) => new ExpressionInfo(info) as MilepostExpressionInfo,
);

export default expressions;
