/**
 * An object containing properties named "lat" and "lng" that are numbers.
 */
export interface LatLngLiteral {
	/**
	 * The latitude of the point.
	 */
	lat: number;
	/**
	 * The longitude of the point.
	 */
	lng: number;
}

/**
 * A tuple of latitude and longitude.
 */
export type LatLngTuple = [lat: number, lng: number];

export type LatLngExpression =
	| Readonly<LatLngTuple>
	| LatLngLiteral
	| LatLngTuple;
