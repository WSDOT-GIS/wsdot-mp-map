/**
 * Used for working with [GeoHack](https://www.mediawiki.org/wiki/GeoHack) URLs.
 * @see {@link https://www.mediawiki.org/wiki/GeoHack GeoHack docs} for more information.
 */
import type {
	LatLngExpression,
	LatLngLiteral,
	LatLngTuple,
} from "../../common/types";

function isLatLngTuple(
	latLng: Readonly<LatLngTuple>,
): latLng is Readonly<LatLngTuple>;
function isLatLngTuple(latLng: LatLngTuple): latLng is LatLngTuple;
function isLatLngTuple(latLng: LatLngLiteral): false;
function isLatLngTuple(
	latLng: LatLngExpression,
): latLng is LatLngTuple | Readonly<LatLngTuple>;
/**
 * Detects if the input value is a {@link LatLngTuple}.
 * @param latLng - A {@link LatLngExpression}
 * @returns Returns true if it is a {@link LatLngTuple}, false otherwise.
 */
function isLatLngTuple(
	latLng: LatLngExpression,
): latLng is LatLngTuple | Readonly<LatLngTuple> {
	return (
		Array.isArray(latLng) &&
		typeof latLng[0] === "number" &&
		typeof latLng[1] === "number"
	);
}

/**
 * > The following are types GeoHack recognizes along with the calculated default scale.
 * > | type:                                          | ratio          | m / pixel | {scale}  | {mmscale} | {span} | {altitude} | {zoom} | {osmzoom} |
 * > |------------------------------------------------|----------------|-----------|----------|-----------|--------|------------|--------|-----------|
 * > | country, satellite                             | 1 : 10,000,000 | 3528      | 10000000 | 10000000  | 10.0   | 1430       | 1      | 5         |
 * > | state                                          | 1 : 3,000,000  | 1058      | 3000000  | 4000000   | 3.0    | 429        | 3      | 7         |
 * > | adm1st                                         | 1 : 1,000,000  | 353       | 1000000  | 1000000   | 1.0    | 143        | 4      | 9         |
 * > | adm2nd (default)                               | 1 : 300,000    | 106       | 300000   | 200000    | 0.3    | 42         | 5      | 11        |
 * > | adm3rd, city, mountain, isle, river, waterbody | 1 : 100,000    | 35.3      | 100000   | 100000    | 0.1    | 14         | 6      | 12        |
 * > | event, forest, glacier                         | 1 : 50,000     | 17.6      | 50000    | 50000     | 0.05   | 7          | 7      | 13        |
 * > | airport                                        | 1 : 30,000     | 10.6      | 30000    | 25000     | 0.03   | 4          | 7      | 14        |
 * > | camera, edu, pass, landmark, railwaystation    | 1 : 10,000     | 3.53      | 10000    | 10000     | 0.01   | 1          | 8      | 15        |
 */
type GeoHackType =
	| "country"
	| "satellite"
	| "state"
	| "adm1st"
	| "adm2nd"
	| "adm3rd"
	| "city"
	| "mountain"
	| "isle"
	| "river"
	| "waterbody"
	| "event"
	| "forest"
	| "glacier"
	| "airport"
	| "camera"
	| "edu"
	| "pass"
	| "landmark"
	| "railwaystation";

/**
 * > Coordinates, optionally followed by other location-related parameters (underscore-separated, in a `key:value` fomat). Example: `1.292836_N_103.856878_E_type:landmark_dim:500`
 * >
 * > The coordinates are in one of the formats `D_M_S_N_D_M_S_E`, `D_M_N_D_M_E`, `D_N_D_E`, or `D;D` where `D` is degrees, `M` is minutes, `S` is seconds, and `NS/EWO` are the directions. Decimal numbers are accepted, especially for the last position.
 * >
 * > _TODO Document me_: boxed range syntax `D_N_D_E_to_D_N_D_E`
 * >
 * > Restrictions:
 * >
 * > - Should be compatible with MediaWiki titles: a 255 byte length limit, `< > [ ] |` are invalid, and spaces and underscore are treated the same.
 * > - `&` causes problems if it not percent encoded in the URL.
 * > - Avoid non-ASCII characters, as some browsers incorrectly handle copying and pasting.
 * > - Avoid the equal sign (=) since it causes issues with unnamed template parameters (e.g., {{[Coord](https://en.wikipedia.org/wiki/en:Template:Coord "w:en:Template:Coord")}})
 * > - The characters `& < > "` are escaped in the HTML to prevent exploits.
 */
export interface GeoHackParams {
	coordinates: LatLngExpression;
	/**
	 * Set the relative map scale as 1:N. The OGC's "standard rendering pixel
	 * size" of 0.28 mm × 0.28 mm (90.7 dpi) is assumed and derived for all size
	 * calculations. Since the actual value can vary significantly
	 * (e.g. iPhone4) it is recommended to use the display independent {@link dim}.
	 */
	scale?: number;

	/**
	 * @see {@link GeoHackType}
	 */
	type?: GeoHackType;

	/**
	 * The size of the object in meters.
	 */
	dim?: number;
}

export interface GeoHackOptions {
	language?: string;
	pagename?: string;
	params: GeoHackParams;
}

/**
 * Converts the given coordinates to a tuple of latitude and longitude.
 * @param coordinates - The coordinates to be converted.
 * @returns The converted latitude and longitude tuple.
 */
const convertToLatLngTuple = (
	coordinates: LatLngExpression,
): Readonly<LatLngTuple> =>
	isLatLngTuple(coordinates)
		? coordinates
		: ([coordinates.lat, coordinates.lng] as const);

/**
 * Generates an iterator that yields each key-value pair in the given GeoHackParams object
 * as a string in the format "key:value".
 * @param params - The object containing the key-value pairs to be enumerated.
 * @yields A string in the format "key:value".
 */
function* enumerateGeoHackParams(params: GeoHackParams) {
	const { coordinates } = params;
	yield convertToLatLngTuple(coordinates).join(";");
	for (const [key, value] of Object.entries(params) as Iterable<
		[keyof GeoHackParams, GeoHackParams[keyof GeoHackParams]]
	>) {
		if (value == null || key === "coordinates") {
			continue;
		}
		let newValue: string;
		if (typeof value === "string") {
			newValue = value;
		} else if (typeof value === "number") {
			newValue = value.toString();
		} else {
			continue;
		}
		yield [key, newValue].join(":") as `${string}:${string}`;
	}
}

function* enumerateGeoHackOptions(options: GeoHackOptions) {
	for (const [key, value] of Object.entries(options) as Iterable<
		[keyof GeoHackOptions, GeoHackOptions[keyof GeoHackOptions]]
	>) {
		if (value == null) {
			continue;
		}
		if (typeof value === "string") {
			yield [key, value] as const;
			continue;
		}
		if (key === "params" && typeof value === "object") {
			yield [key, [...enumerateGeoHackParams(value)].join("_")] as const;
		}
	}
}

/**
 * Creates a [GeoHack](https://www.mediawiki.org/wiki/GeoHack) URL.
 * @param options - GeoHack options, including the coordinates.
 * @param geohackUrl - The URL to GeoHack. You do not need to change this unless they move their website.
 * @returns - A GeoHack URL
 * @example
 * const url = createGeoHackUrl([45.6448,-122.6617]);
 * // Returned URL will be "https://geohack.toolforge.org/geohack.php?params=45.6448;-122.6617"
 */
export function createGeoHackUrl(
	options: GeoHackOptions,
	geohackUrl = "https://geohack.toolforge.org/geohack.php",
) {
	const outUrl = new URL(geohackUrl);
	for (const [key, value] of enumerateGeoHackOptions(options)) {
		outUrl.searchParams.set(key, value);
	}

	return outUrl;
}
