import type Graphic from "@arcgis/core/Graphic";
import type Geometry from "@arcgis/core/geometry/Geometry";
import type Point from "@arcgis/core/geometry/Point";
import { RouteLocation } from "wsdot-elc";
import type { AttributeValue } from "wsdot-mp-common";

export const objectIdFieldName = "OBJECTID";

/**
 * Extends {@link Graphic} to provide more strict type information for
 * {@link Graphic.attributes|attributes} and {@link Graphic.geometry|geometry}.
 */
export interface TypedGraphic<
  G extends Geometry,
  T extends Record<string, AttributeValue>
> extends Graphic {
  /**
   * @inheritdoc
   */
  attributes: T;
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
    Pick<RouteLocation, "Route" | "Decrease" | "Srmp" | "Back">
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
 * A milepost point graphic.
 */
export type MilepostFeature = TypedGraphic<Point, LayerFeatureAttributes>;

const elcFieldNames = ["Route", "Decrease", objectIdFieldName, "Srmp", "Back"];

const featureLayerAttributesFieldNames = elcFieldNames.concat(
  "Township Subdivision",
  "County",
  "City"
);

function isElcAttributes(input: unknown): input is ElcAttributes {
  return (
    !!input &&
    typeof input === "object" &&
    elcFieldNames.every((fieldName) => Object.hasOwn(input, fieldName))
  );
}

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
    graphic &&
    graphic.geometry &&
    graphic.attributes &&
    graphic.geometry.type === "point" &&
    isValidAttributesObject(elcFieldNames)
  );
}
