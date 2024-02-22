import PopupTemplate from "@arcgis/core/PopupTemplate";
import type Point from "@arcgis/core/geometry/Point";
import type SpatialReference from "@arcgis/core/geometry/SpatialReference";
import type Field from "@arcgis/core/layers/support/Field";
import type MapView from "@arcgis/core/views/MapView";
import type { AttributeValue } from "./common/arcgis/typesAndInterfaces";
import {
  queryCityLimits,
  queryCountyBoundaries,
  querySectionTownship,
} from "./layers";
import {
  objectIdFieldName,
  type AttributesObject,
  type TypedGraphic,
} from "./types";

type FieldProperties = Required<ConstructorParameters<typeof Field>>[0];

let mapView: MapView | undefined;

const fields = [
  {
    name: objectIdFieldName,
    type: "oid",
  },
  {
    name: "Route",
    type: "string",
  },
  {
    name: "Srmp",
    type: "double",
  },
  {
    name: "Back",
    type: "string",
  },
  {
    name: "Township Subdivision",
    type: "string",
  },
  { name: "County", type: "string" },
  {
    name: "City",
    type: "string",
  },
] as FieldProperties[];

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

function createDL({ attributes }: TypedGraphic<Point, MPAttributes>) {
  function createRow(
    key: string,
    value: AttributeValue | Promise<AttributeValue>
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
          const textElement = document.createTextNode(!v ? "" : `${v}`);
          progress.replaceWith(textElement);
        })
        .catch((error) => console.error(error));
    } else {
      dd.textContent = !value ? "" : `${value}`;
    }
    return [dt, dd];
  }
  const dl = document.createElement("dl");
  for (const [key, value] of Object.entries(attributes).filter(
    ([key]) => !["OBJECTID", "Route", "Srmp", "Back"].includes(key)
  )) {
    dl.append(...createRow(key, value));
  }

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
      .catch((error) =>
        console.error("Error querying section/township", error)
      );
    fieldPromises.push(stPromise);
  }

  if (!attributes.City) {
    // query city
    const cityPromise = queryCityLimits(graphic.geometry, mapView);
    cityPromise
      .then(
        (v) =>
          (attributes.City = v
            ? `${v.CityName} (last updated: ${new Date(v.LastUpdate).toLocaleDateString()})`
            : "Outside City Limits")
      )
      .catch((error) => console.error("Error querying city", error));

    fieldPromises.push(cityPromise);
  }
  if (!attributes.County) {
    // query county
    const countyPromise = queryCountyBoundaries(graphic.geometry);
    countyPromise
      .then((county) => (attributes.County = county))
      .catch((error) => console.error("Error querying county", error));
    fieldPromises.push(countyPromise);
  }

  await Promise.allSettled(fieldPromises);

  return createDL(graphic);
}

const popupTemplate = new PopupTemplate({
  title: "{Route} @ {Srmp}{Back}",
  content: createContent,
});

/**
 * Creates the {@link FeatureLayer} that displays located mileposts.
 * @returns - A {@link FeatureLayer}
 */
export async function createMilepostLayer(spatialReference: SpatialReference) {
  const [
    { default: FeatureLayer },
    { default: SimpleRenderer },
    { default: SimpleMarkerSymbol },
    { default: waExtent },
    { default: labelClass },
    { highwaySignBackgroundColor, highwaySignTextColor },
  ] = await Promise.all([
    import("@arcgis/core/layers/FeatureLayer"),
    import("@arcgis/core/renderers/SimpleRenderer"),
    import("@arcgis/core/symbols/SimpleMarkerSymbol"),
    import("./WAExtent"),
    import("./labelClass"),
    import("./colors"),
  ]);
  /**
   * This is the symbol for the point on the route.
   */
  const actualMPSymbol = new SimpleMarkerSymbol({
    color: highwaySignBackgroundColor,
    size: 12,
    style: "circle",
    outline: {
      width: 1,
      color: highwaySignTextColor,
    },
  });

  const renderer = new SimpleRenderer({
    symbol: actualMPSymbol,
  });
  const milepostLayer = new FeatureLayer({
    labelingInfo: [labelClass],
    title: "Mileposts",
    id: "mileposts",
    fields: fields,
    geometryType: "point",
    objectIdField: objectIdFieldName,
    fullExtent: waExtent,
    popupTemplate: popupTemplate,
    renderer,
    spatialReference,
    // Since there are no features at the beginning,
    // need to add an empty array as the source.
    source: [],
    popupEnabled: true,
    hasM: true,
  });

  milepostLayer.on("layerview-create", ({ view }) => {
    mapView = view as MapView;
  });

  return milepostLayer;
}
