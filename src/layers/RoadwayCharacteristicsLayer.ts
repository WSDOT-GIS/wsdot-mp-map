import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Sublayer from "@arcgis/core/layers/support/Sublayer";

/**
 * Roadway Characteristics Map Service URL
 */
const rcServiceUrl = new URL(
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/RoadwayCharacteristicData/MapServer/"
);

/**
 * Mapping of sublayer title to corresponding IDs
 */
const sublayersMapping = new Map([
  ["Acceleration Lanes", 0],
  ["Access Control", 1],
  ["Divided Highway", 2],
  ["Lane Information", 3],
  ["Legal Speed Limits", 4],
  ["Medians", 5],
  ["At Grade Railroad Crossings", 6],
  ["Roadway Width", 7],
  ["Rural Urban", 8],
  ["Shoulder", 9],
  ["Special Use Lanes", 10],
  ["Surface Type", 11],
  ["Turn Lanes", 12],
  ["Tunnels", 13],
]);

/**
 * Only sublayers with a title matching this Regexp will be visible by default.
 */
const visibleSublayersRe = /Access\s*Control/i;

/**
 * Loops through the map and yields {@link Sublayer} objects.
 */
function* createSublayers() {
  for (const [title, id] of sublayersMapping) {
    yield new Sublayer({
      id,
      title,
      // Only Access Control should be visible.
      visible: visibleSublayersRe.test(title),
      listMode: "hide",
    });
  }
}

/**
 * Roadway characteristics layer.
 */
export const roadwayCharacteristicDataLayer = new MapImageLayer({
  title: "Access Control",
  url: rcServiceUrl.toString(),
  sublayers: [...createSublayers()],
});

export default roadwayCharacteristicDataLayer;
