const Extent = await $arcgis.import("@arcgis/core/geometry/Extent");
const SpatialReference = await $arcgis.import("@arcgis/core/geometry/SpatialReference");

/**
 * The extent of WA.
 * @see {https://epsg.io/1416-area}
 */
export const waExtent = new Extent({
	spatialReference: SpatialReference.WebMercator,
	xmin: -13891559.256092377,
	ymin: 5706937.852318744,
	xmax: -13014361.668641392,
	ymax: 6283349.610269844,
});

export default waExtent;
