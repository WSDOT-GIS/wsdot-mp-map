import Extent from "@arcgis/core/geometry/Extent";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

/**
 * The extent of WA.
 * @see {https://epsg.io/1416-area}
 */
export const waExtent = new Extent({
  xmin: -124.79,
  ymin: 45.54,
  xmax: -116.91,
  ymax: 49.05,
  spatialReference: SpatialReference.WGS84,
});

export default waExtent;
