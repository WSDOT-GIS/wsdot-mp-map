import type { LatLngTuple } from "../../common/types";
import { BingMapsPoint, isValidBingMapsPointOptions } from "./BingMapsPoint";

/**
 * Defines the map view.
 */

export enum BingMapsStyle {
  /**
   * Display an aerial view of the map.
   */
  Aerial = "a",
  /**
   * Display a road view of the map.
   */
  Road = "r",
  /**
   * Display an aerial view of the map with labels.
   */
  AerialWithLabels = "h",
  /**
   * Use this value to display a bird's eye (oblique) view of the map.
   */
  Oblique = "o",
  /**
   * Display a bird's eye (oblique) with labels view of the map.
   */
  ObliqueWithLabels = "b",
}

export enum BingMapsDirection {
  North = 0,
  East = 90,
  South = 180,
  West = 270,
}

/**
 * Defines the options for creating a Bing maps search URL.
 */
export interface IBingMapsOptions {
  /**
   * Center Point for the map
   */
  cp?: LatLngTuple;
  /**
   * Zoom Level
   *
   * > Defines the zoom level of the map view. Valid values are 1-20.
   * > This parameter is ignored when a search parameter, such as ss
   * > or where1, is specified. A table of search parameters is
   * > provided below.
   */
  lvl?: number;

  /**
   * Defines the map view. Valid values for this parameter include:
   *
   * - a: Display an aerial view of the map.
   * - r: Display a road view of the map.
   * - h: Display an aerial view of the map with labels.
   * - o: Use this value to display a bird's eye (oblique) view of the map.
   * - b: Display a bird's eye (oblique) with labels view of the map.
   */
  style?: BingMapsStyle;

  /**
   * Specifies the ID of the bird's eye (oblique) image tile to display.
   * You can use this parameter with a lvl value of 1 or 2 and a dir
   * value to view different formats of the map image.
   */
  scene?: number;

  /**
   * Specifies the direction that the camera is pointing in degrees.
   * Valid values
   * - 0 for North
   * - 90 for East
   * - 180 for South
   * - 270 for West.
   */
  dir?: BingMapsDirection;

  /**
   * Specifies whether traffic information is included on the map.
   * Omitting the trfc parameter produces the same results as trfc=0
   */
  trfc?: boolean | 0 | 1;

  /**
   * A marker
   */
  sp?: BingMapsPoint;
}

/**
 * Defines the options for creating a Bing maps search URL.
 */
export interface SearchOptions {
  [key: `where${number}`]: string;
  where?: string;
  ss?: string;
}

/**
 * Returns a {@link BingMapsPoint} if the given value is an
 * instance of {@link BingMapsPoint} or if it is a
 * valid {@link BingMapsPointOptions} object.
 * @param value - The value to check.
 * @returns - The {@link BingMapsPoint} instance if the value
 * is an instance of {@link BingMapsPoint} or a valid
 * {@link BingMapsPointOptions} object, otherwise null.
 */
export const tryGetBingMapsPoint = (value: object) => {
  let p: BingMapsPoint | null = null;
  if (value instanceof BingMapsPoint) {
    p = value;
  } else if (isValidBingMapsPointOptions(value)) {
    p = new BingMapsPoint(value);
  }
  return p;
};
