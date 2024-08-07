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
    expression: RegionArcade,
    returnType: "string",
  },
  {
    name: "bingMaps",
    title: "Bing Maps",
    expression: BingMapsArcade,
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
    expression: GeoURIArcade,
    returnType: "string",
  },
  {
    name: "googleStreetView",
    title: "Google Street View",
    expression: GoogleStreetViewArcade,
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

if (import.meta.env.DEV) {
  interface ErrorObject {
    message: string;
    columnNumber?: number;
    declaredRootClass?: "esri.arcade.arcadecompilationerror";
    fileName?: string;
    lineNumber?: number;
    loc: unknown;
    stack: string;
  }

  interface ErrorAndExpression {
    error: ErrorObject;
    expressionInfo?: __esri.ExpressionInfoProperties;
  }

  function isErrorObject(input: unknown): input is ErrorAndExpression {
    if (typeof input !== "object" || input == null) {
      return false;
    }
    return "error" in input && "expressionInfo" in input;
  }

  function createArcadeErrorAlert(errorAndExpression: ErrorAndExpression) {
    function errorToList<
      T extends ErrorObject | __esri.ExpressionInfoProperties,
    >(error: T) {
      const dl = document.createElement("dl");
      for (const [key, value] of Object.entries(error) as [
        keyof T,
        T[keyof T],
      ][]) {
        if (value == null) {
          continue;
        }
        const dt = document.createElement("dt");
        dt.append(typeof key === "string" ? key : key.toString());
        const dd = document.createElement("dd");
        dd.append(value.toString());

        dl.appendChild(dt);
        dl.appendChild(dd);
      }
      return dl;
    }

    const { error, expressionInfo } = errorAndExpression;

    const [errorList, expList] = ([error, expressionInfo] as const).map((o) =>
      o != null ? errorToList(o) : null,
    );

    const alert = document.createElement("calcite-alert");
    alert.kind = "danger";
    alert.open = true;

    const bodyDiv = document.createElement("div");
    bodyDiv.slot = "message";

    if (errorList) {
      const heading = document.createElement("h2");
      heading.append("Arcade Error");
      bodyDiv.append(heading, errorList);
    }
    if (expList) {
      const heading = document.createElement("h2");
      heading.append("Arcade Expression Info");
      bodyDiv.append(heading, expList);
    }

    alert.appendChild(bodyDiv);

    return alert;
  }

  const handleArcadeMessages: __esri.LogInterceptor = (
    level,
    module,
    ...args: unknown[]
  ) => {
    if (
      level !== "error" ||
      !/arcade/i.test(module) ||
      args.length < 2 ||
      args[1] == null ||
      typeof args[1] !== "object"
    ) {
      return false;
    }

    if (isErrorObject(args[1])) {
      const errorObject = args[1];
      const alert = createArcadeErrorAlert(errorObject);
      // Remove the alert from the document once it has been closed.
      alert.addEventListener("close", () => {
        document.body.removeChild(alert);
      });
      document.body.append(alert);
      // return true;
    }

    return false;
  };

  import("@arcgis/core/config")
    .then((config) => {
      config.default.log.interceptors.push(handleArcadeMessages);
    })
    .catch((reason: unknown) => {
      console.error("Failed to set log interceptor", reason);
    });
}
export default expressions;
