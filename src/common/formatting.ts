// https://geohack.toolforge.org/geohack.php?params=47.4965%3B-122.3248
// https://geohack.toolforge.org/geohack.php?params=47.49654884262268%3B-122.32481234040759
import type { LatLngTuple } from "./types";

const fractionDigits = 6;

/**
 * Yields an HTML data element for each lat/lng tuple
 * @param items - One or more {@link LatLngTuple|LatLngTuples}
 * @yields - A `<data>` element.
 */
function* createCoordinateDataElements(...items: LatLngTuple) {
  for (const [index, item] of items.entries()) {
    const data = document.createElement("data");
    data.value = data.title = item.toString();
    data.textContent = item.toFixed(fractionDigits);
    const latOrLng = index === 0 ? "latitude" : "longitude";
    data.classList.add(`p-${latOrLng}`, latOrLng);
    yield data;
  }
}

/**
 * Creates an [h-geo](https://microformats.org/wiki/h-geo)
 * representation of the input {@link LatLngTuple}.
 * Output will also be backward compatible with the earlier
 * [Geo](https://microformats.org/wiki/geo) format.
 * @param latLng - A latitude,longitude value.
 * @param tagName - The HTML tag name to use.
 * @param format - Determines which order to display the coordinates in.
 * @returns - An [h-geo](https://microformats.org/wiki/h-geo) representation.
 * @example
 * ```ts
 * import { createGeoMicroformat } from "../common/formatting";
 * const geo = createGeoMicroformat(
 *    [45.618118664637244, -122.67503545489325],
 *    "li", "latlng"
 * );
 * ```
 * Will result in:
 * ```html
 * <li class="h-geo geo">
 *    <data
 *      title="-122.67503545489325"
 *      value="-122.67503545489325"
 *      class="p-longitude longitude">
 *      -122.675035
 *    </data>,
 *    <data
 *      title="45.618118664637244"
 *      value="45.618118664637244"
 *      class="p-latitude latitude">
 *      45.618119
 *    </data>
 * </li>
 * ```
 */
export function createGeoMicroformat<
  T extends keyof HTMLElementTagNameMap = "span",
>(latLng: LatLngTuple, tagName: T, format: "xy" | "latlng" = "xy") {
  const geoSpan = document.createElement(tagName);
  geoSpan.classList.add("h-geo", "geo");
  const [yElement, xElement] = createCoordinateDataElements(...latLng);
  if (format === "xy") {
    geoSpan.append(xElement, ",", yElement);
  } else {
    geoSpan.append(yElement, ",", xElement);
  }
  return geoSpan;
}
