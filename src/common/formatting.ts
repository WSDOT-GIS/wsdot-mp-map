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
 * @returns - An [h-geo](https://microformats.org/wiki/h-geo) representation.
 */
export function createGeoMicroformat(
  latLng: LatLngTuple,
  tagName: keyof HTMLElementTagNameMap
) {
  const geoSpan = document.createElement(tagName);
  geoSpan.classList.add("h-geo", "geo");
  let isFirst = true;
  for (const dataElement of createCoordinateDataElements(...latLng)) {
    if (!isFirst) {
      geoSpan.append(",");
    }
    geoSpan.append(dataElement);
    isFirst = false;
  }
  return geoSpan;
}
