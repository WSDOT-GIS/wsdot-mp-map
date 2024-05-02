import type { AttributeValue } from "../common/arcgis/typesAndInterfaces";
import type { AttributesObject, TypedGraphic } from "../types";
import BingMapsUrl from "../urls/bing";
import { OpenStreetMapUrl } from "../urls/osm";
import type { Point } from "@arcgis/core/geometry";

const [
  { createGeoMicroformat },
  { GeoUrl },
  { createGeoHackUrl },
  { GoogleUrl },
  { queryCityLimits },
  { queryCountyBoundaries },
  { querySectionTownship },
  { default: PopupTemplate },
  { webMercatorToGeographic },
] = await Promise.all([
  import("../common/formatting"),
  import("../urls/GeoUri"),
  import("../urls/geohack"),
  import("../urls/google"),
  import("./CityLimitsLayer"),
  import("./CountyBoundariesLayer"),
  import("./LandSurveyLayer"),
  import("@arcgis/core/PopupTemplate"),
  import("@arcgis/core/geometry/support/webMercatorUtils"),
]);

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
    value: AttributeValue | Promise<AttributeValue> | string | Node,
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
    ([key]) =>
      !["OBJECTID", "Route", "Srmp", "Back", "Direction"].includes(key),
  )) {
    dl.append(...createRow(key, value));
  }

  return dl;
}

function createAnchor(
  options: Pick<HTMLAnchorElement, "target" | "text"> & {
    href?: HTMLAnchorElement["href"] | URL;
  },
  anchor?: HTMLAnchorElement,
) {
  if (!anchor) {
    anchor = document.createElement("a");
    if (options.href) {
      anchor.href =
        typeof options.href === "string" ? options.href : options.href.href;
    }
    anchor.target = options.target;
    anchor.rel = "noopener noreferrer external";
    anchor.text = options.text;
  }
  return anchor;
}

/**
 * Create a {@link HTMLDetailsElement} element with links to external
 * mapping applications.
 * @param graphic - A graphic with a point geometry.
 * @returns HTML details element with links to external mapping applications.
 */
function createCoordsDetails(graphic: TypedGraphic<Point, MPAttributes>) {
  const point = webMercatorToGeographic(graphic.geometry) as Point;
  const { x, y } = point;

  /**
   * Create the list element with links to external mapping applications.
   */
  const list = document.createElement("ul");
  list.classList.add("map-links-list");

  const a = createXYLink([x, y], "xy");
  const li = document.createElement("li");
  li.appendChild(a);
  list.append(li);

  /**
   * Create a list item with an anchor element and add it to the list.
   * @param options - The options for creating the anchor element.
   */
  function createLI(options: Parameters<typeof createAnchor>[0]) {
    const li = document.createElement("li");
    const a = createAnchor(options);
    li.appendChild(a);
    list.appendChild(li);
  }

  createLI({
    href: GoogleUrl.fromLatLng(y, x),
    text: "Google Maps",
    target: "google-maps",
  });

  createLI({
    href: new BingMapsUrl([y, x]),
    text: "Bing Maps",
    target: "bing-maps",
  });

  createLI({
    href: new OpenStreetMapUrl({
      search: {
        mlat: y,
        mlon: x,
      },
    }),
    text: "OpenStreetMap",
    target: "openstreetmap",
  });

  createLI({
    href: createGeoHackUrl({
      params: {
        coordinates: [y, x] as const,
      },
      pagename: `${graphic.attributes.Route} ${graphic.attributes.Srmp.toString()}${graphic.attributes.Back ? "B" : ""}`,
    }),
    text: "GeoHack",
    target: "geohack",
  });

  createLI({
    href: new GeoUrl({ x, y }),
    text: "GeoURI",
    target: "geouri",
  });

  return list;
}

function copyXYToClipboard(this: HTMLAnchorElement, event: MouseEvent) {
  const lng = this.querySelector<HTMLDataElement>(
    "data.longitude[value]",
  )?.value;
  const lat = this.querySelector<HTMLDataElement>(
    "data.latitude[value]",
  )?.value;
  if (lng && lat) {
    navigator.clipboard
      .writeText(`${lat},${lng}`)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((error: unknown) => {
        alert(
          `There was an error copying the coordinates to the clipboard: ${JSON.stringify(error)}`,
        );
      });
  }
  event.preventDefault();
}

/**
 * The {@link createXYLink} function takes the first and third
 * arguments from {@link createGeoMicroformat}
 */
type GeoMF = Parameters<typeof createGeoMicroformat>;

/**
 * Creates an anchor element with a geo-microformat that represents a link to a coordinate on a map.
 * @param latLng - The latitude and longitude coordinates of the link.
 * @param format - The format of the coordinate pair.
 * @returns - The anchor element with the geo-microformat and click event listener.
 */
function createXYLink(latLng: GeoMF[0], format: GeoMF[2] = "xy") {
  const a = createGeoMicroformat(latLng, "a", format);
  const [x, y] =
    format === "xy" ? [latLng[0], latLng[1]] : [latLng[1], latLng[0]];
  a.href = new GeoUrl({ x, y }).href;
  a.addEventListener("click", copyXYToClipboard);
  return a;
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
            : "Outside City Limits"),
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

  const output = document.createElement("div");
  output.append(createCoordsDetails(graphic));
  output.append(createDL(graphic));
  return output;
}

export const popupTemplate = new PopupTemplate({
  title: "{Route} ({Direction}) @ {Srmp}{Back}",
  content: createContent,
});
