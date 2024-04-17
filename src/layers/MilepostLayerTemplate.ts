import type Graphic from "@arcgis/core/Graphic";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { on } from "@arcgis/core/core/reactiveUtils";
import Point from "@arcgis/core/geometry/Point";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import type MapView from "@arcgis/core/views/MapView";
import GeoUrl from "../common/GeoUri";
import type { AttributeValue } from "../common/arcgis/typesAndInterfaces";
import { createGeoMicroformat } from "../common/formatting";
import { GoogleUrl } from "../common/google";
import type { AttributesObject, TypedGraphic } from "../types";
import { queryCityLimits } from "./CityLimitsLayer";
import { queryCountyBoundaries } from "./CountyBoundariesLayer";
import { querySectionTownship } from "./LandSurveyLayer";

interface MPAttributes extends AttributesObject {
  oid: number;
  Route: string;
  Srmp: number;
  Back: string;
  "Township Subdivision": string | null;
  County: string | null;
  City: string | null;
}

interface TemplateTarget {
  graphic: TypedGraphic<Point, MPAttributes>;
}

/**
 * Creates a definition list (dl) element based on the attributes provided, excluding specific keys.
 * @param graphic - object containing attributes
 * @returns HTML dl element containing key-value pairs of attributes
 */
function createDL(graphic: TypedGraphic<Point, MPAttributes>) {
  const { attributes } = graphic;

  /**
   * Create a row for a key-value pair, handling promises and non-promises.
   * @param key - the key for the key-value pair
   * @param value - the value for the key-value pair, which can be a promise or non-promise
   * @returns - an array containing the created `<dt>` and `<dd>` elements
   */
  function createRow(
    key: string,
    value: AttributeValue | Promise<AttributeValue> | string | Node
  ) {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = key;
    if (value instanceof Promise) {
      const progress = document.createElement("progress");
      progress.textContent = `Loading ${key}...`;
      dd.append(progress);
      value
        .then((v) => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          const textElement = document.createTextNode(!v ? "" : `${v}`);
          progress.replaceWith(textElement);
        })
        .catch((error: unknown) => {
          console.error(error);
        });
    } else if (value instanceof Node || typeof value === "string") {
      dd.append(value);
    } else {
      dd.textContent = !value ? "" : value.toString();
    }
    return [dt, dd] as const;
  }
  const dl = document.createElement("dl");
  for (const [key, value] of Object.entries(attributes).filter(
    ([key]) => !["OBJECTID", "Route", "Srmp", "Back", "Direction"].includes(key)
  )) {
    dl.append(...createRow(key, value));
  }

  const point = webMercatorToGeographic(graphic.geometry) as Point;
  const { x, y } = point;
  const geoSpan = createGeoMicroformat([y, x], "span");
  const geoUrl = new GeoUrl({ x, y });
  const geoLink = document.createElement("a");
  geoLink.href = geoUrl.href;
  geoLink.append(geoSpan);
  dl.append(...createRow("Coordinates", geoLink));

  return dl;
}

async function createContent(target: TemplateTarget) {
  const { graphic } = target;
  const { attributes } = graphic;

  /**
   * This array will hold promises, which will be all awaited at the end.
   */
  const fieldPromises: ReturnType<
    | typeof querySectionTownship
    | typeof queryCityLimits
    | typeof queryCountyBoundaries
  >[] = [];

  if (!attributes["Township Subdivision"]) {
    const stPromise = querySectionTownship({
      geometry: graphic.geometry,
    });
    stPromise
      .then((v) => {
        if (v) {
          attributes["Township Subdivision"] = v;
        }
      })
      .catch((error: unknown) => {
        console.error("Error querying section/township", error);
      });
    fieldPromises.push(stPromise);
  }

  if (!attributes.City) {
    // query city
    const cityPromise = queryCityLimits(graphic.geometry);
    cityPromise
      .then(
        (v) =>
          (attributes.City = v
            ? `${v.CityName} (last updated: ${new Date(v.LastUpdate).toLocaleDateString()})`
            : "Outside City Limits")
      )
      .catch((error: unknown) => {
        console.error("Error querying city", error);
      });

    fieldPromises.push(cityPromise);
  }
  if (!attributes.County) {
    // query county
    const countyPromise = queryCountyBoundaries(graphic.geometry);
    countyPromise
      .then((county) => (attributes.County = county))
      .catch((error: unknown) => {
        console.error("Error querying county", error);
      });
    fieldPromises.push(countyPromise);
  }

  await Promise.allSettled(fieldPromises);

  return createDL(graphic);
}

const googleActionButton = new ActionButton({
  title: "Google Maps",
  id: "google",
});

export const popupTemplate = new PopupTemplate({
  actions: [googleActionButton],
  title: "{Route} ({Direction}) @ {Srmp}{Back}",
  content: createContent,
});

/**
 * Sets up popup actions for the view.
 * @param view - a view
 */
export const setupActions = (view: MapView) => {
  const handleTriggerAction: __esri.PopupTriggerActionEventHandler = (
    event
  ) => {
    /* __PURE__ */ console.debug("popup action triggered", event);
    if (event.action.id === "google") {
      openGoogleMaps(view.popup.selectedFeature);
    }
  };
  on(() => view.popup, "trigger-action", handleTriggerAction);
};

function openGoogleMaps(feature: Graphic) {
  const geometry = feature.geometry;
  if (geometry instanceof Point) {
    const { x, y } = webMercatorToGeographic(geometry) as Point;
    const url = GoogleUrl.fromLatLng(y, x);
    window.open(url, "LocateMP-Google", "noreferrer,popup=yes");
  }
}
