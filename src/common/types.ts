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

export type LatLngExpression = LatLngLiteral | LatLngTuple;

export function isLatLngTuple(latLng: LatLngLiteral): false;
export function isLatLngTuple(latLng: LatLngTuple): true;
export function isLatLngTuple(latLng: unknown): latLng is LatLngTuple;
/**
 * Detects if the input value is a {@link LatLngTuple}.
 * @param latLng - A {@link LatLngExpression}
 * @returns Returns true if it is a {@link LatLngTuple}, false otherwise.
 */
export function isLatLngTuple(latLng: unknown): latLng is LatLngTuple {
  return (
    Array.isArray(latLng) &&
    typeof latLng[0] === "number" &&
    typeof latLng[1] === "number"
  );
}

/**
 * Converts the given coordinates to a tuple of latitude and longitude.
 * @param coordinates - The coordinates to be converted.
 * @returns The converted latitude and longitude tuple.
 */
export const convertToLatLngTuple = (coordinates: LatLngExpression) => {
  return isLatLngTuple(coordinates)
    ? coordinates
    : ([coordinates.lat, coordinates.lng] as const);
};
