import type Graphic from "@arcgis/core/Graphic";
import type Geometry from "@arcgis/core/geometry/Geometry";
import Point from "@arcgis/core/geometry/Point";
import type { AttributeValue } from "./common";
import type { DateString, RouteGeometryPoint, RouteLocation } from "./elc";

export const objectIdFieldName = "OBJECTID";

/**
 * An object like one used by {@link Graphic.attributes},
 * with {@link AttributeValue|AttributeValues} keyed
 * by strings.
 */
export type AttributesObject = Record<string, AttributeValue>;

/**
 * An object that has an "attributes" property
 */
export interface HasAttributes<T extends AttributesObject>
  extends Pick<Graphic, "attributes"> {
  /**
   * @inheritdoc
   */
  attributes: T;
}

/**
 * Tests to see if the {@link input} is an {@link Object} with
 * an attributes property that
 * is also an {@link Object}.
 * @param input - An input object.
 * @returns
 */
export function hasAttributes<T extends AttributesObject>(
  input: unknown
): input is HasAttributes<T> {
  return (
    !!input &&
    typeof input === "object" &&
    Object.hasOwn(input, "attributes") &&
    typeof (input as HasAttributes<T>).attributes === "object"
  );
}

/**
 * Extends {@link Graphic} to provide more strict type information for
 * {@link Graphic.attributes|attributes} and {@link Graphic.geometry|geometry}.
 */
export interface TypedGraphic<
  G extends Geometry,
  T extends Record<string, AttributeValue>,
> extends HasAttributes<T> {
  /**
   * @inheritdoc
   */
  geometry: G;
}

/**
 * The graphic attributes for a graphic in the Mileposts feature layer.
 */
export interface ElcAttributes
  extends Required<
    Pick<
      RouteLocation<DateString, RouteGeometryPoint>,
      "Route" | "Decrease" | "Srmp" | "Back"
    >
  > {
  [key: string]: AttributeValue;
  [objectIdFieldName]: number;
  /**
   * @inheritdoc
   */
  Route: string;
  /**
   * @inheritdoc
   */
  Srmp: number;
}

export interface LayerFeatureAttributes extends ElcAttributes {
  "Township Subdivision": string | null;
  County: string | null;
  City: string | null;
}

/**
 * A milepost point {@link Graphic}.
 */
export type MilepostFeature = Graphic &
  TypedGraphic<Point, LayerFeatureAttributes>;

const elcFieldNames = ["Route", "Decrease", objectIdFieldName, "Srmp", "Back"];

const featureLayerAttributesFieldNames = elcFieldNames.concat(
  "Township Subdivision",
  "County",
  "City"
);

/**
 * Determines if an object is a {@link ElcAttributes}.
 * @param input - Input object, such as {@link Graphic.attributes}
 * @returns - Returns true under the following conditions:
 * - {@link isElcAttributes} returns `true`
 * - Each string in {@link elcFieldNames} has
 *   a corresponding property in the input object.
 */
function isElcAttributes(input: unknown): input is ElcAttributes {
  return (
    !!input &&
    typeof input === "object" &&
    elcFieldNames.every((fieldName) => Object.hasOwn(input, fieldName))
  );
}

/**
 * Determines if an object is a {@link LayerFeatureAttributes}.
 * @param input - Input object
 * @returns - Returns true under the following conditions:
 * - {@link isElcAttributes} returns `true`
 * - Each string in {@link featureLayerAttributesFieldNames} has
 *   a corresponding property in the input object.
 */
function isValidAttributesObject(
  input: unknown
): input is LayerFeatureAttributes {
  return (
    isElcAttributes(input) &&
    featureLayerAttributesFieldNames.every((fieldName) =>
      Object.hasOwn(input, fieldName)
    )
  );
}

export function isMilepostFeature(
  graphic: Graphic
): graphic is MilepostFeature {
  return (
    graphic.geometry instanceof Point &&
    isValidAttributesObject(graphic.attributes)
  );
}

/**
 * Tests to see if a {@link __esri.ViewHit|ViewHit} is a
 * {@link __esri.GraphicHit|GraphicHit}.
 * @param viewHit - The view hit to be tested.
 * @returns - Returns true if {@link __esri.ViewHit.type} = "graphic",
 * false otherwise.
 */
export function isGraphicHit(
  viewHit: __esri.ViewHit
): viewHit is __esri.GraphicHit {
  return viewHit.type === "graphic";
}
