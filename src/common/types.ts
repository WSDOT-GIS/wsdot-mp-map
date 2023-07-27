export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export type LatLngTuple = [lat: number, lng: number];

export type LatLngExpression = /*LatLng*/ LatLngLiteral | LatLngTuple;
