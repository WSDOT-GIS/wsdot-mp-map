import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import { enumerateQueryResponseAttributes, query } from "./common";
import type { AttributesObject } from "./types";

/**
 * Queries the WSDOT Data Library feature service and updates
 * the input graphic's attributes with the response data.
 * @param graphic - A graphic.
 * @returns
 */
export async function queryDataLibrary(graphic: Graphic) {
  const geometry = graphic.geometry as Point;
  const { x, y, spatialReference } = geometry;
  const queryResponse = await query([x, y], undefined, spatialReference.wkid);
  /* @__PURE__ */ console.debug("data library query response", queryResponse);
  if (!graphic.attributes) {
    /* @__PURE__ */ console.warn(
      'Graphic\'s "attributes" property is null but is expected to be an object.'
    );
  }
  const output: AttributesObject =
    (graphic.attributes as AttributesObject) || {};
  for (const [key, value] of enumerateQueryResponseAttributes(queryResponse)) {
    output[key] = value;
  }

  return output;
}
