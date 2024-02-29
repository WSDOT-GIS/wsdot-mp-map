import type Point from "@arcgis/core/geometry/Point";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";

type AheadBackIndicator = "A" | "B";

export type NonLimited = `Non Limited Access ${
  | `${"More Than " | ""}Average Restriction`
  | `${"Most" | "Less" | "Least"} Restrictive`}`;

export type Limited =
  `Limited Access ${"Fully" | "Modified" | "Partially"} Controlled`;
export type AccessControlTypeCode =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "F"
  | "M"
  | "P";

export type AccessControlTypeDescription = Limited | NonLimited;

export const accessControlTypesMap = new Map<
  AccessControlTypeCode,
  AccessControlTypeDescription
>([
  ["1", "Non Limited Access Most Restrictive"],
  ["2", "Non Limited Access More Than Average Restriction"],
  ["3", "Non Limited Access Average Restriction"],
  ["4", "Non Limited Access Less Restrictive"],
  ["5", "Non Limited Access Least Restrictive"],
  ["F", "Limited Access Fully Controlled"],
  ["M", "Limited Access Modified Controlled"],
  ["P", "Limited Access Partially Controlled"],
]);

export interface AccessControlAttributes {
  OBJECTID?: number;
  RouteIdentifier?: string;
  BeginAccumulatedRouteMile?: number;
  EndAccumulatedRouteMile?: number;
  AccessControlTypeDescription: AccessControlTypeDescription;
  SnapshotDate?: ReturnType<Date["valueOf"]>;
  BeginStateRouteMilepost?: number;
  BeginAheadBackIndicator?: AheadBackIndicator;
  EndStateRouteMilepost?: number;
  EndAheadBackIndicator?: AheadBackIndicator;
  LRSDate?: number;
  "SHAPE.STLength()"?: number;
  AccessControlTypeCode?: AccessControlTypeCode;
}

const accessControlTitle = "Access Control";
const acDescriptionFieldName = "AccessControlTypeDescription";
const acCodeFieldName = "AccessControlTypeCode";

function createAccessControlLayer() {
  const accessControlLayerUrl =
    "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/RoadwayCharacteristicData/MapServer/1";
  // const id = "35cd6f1a5e2f4553a8e83c9ff6edbfa7";
  /**
   * Roadway characteristics layer.
   */
  return new FeatureLayer({
    url: accessControlLayerUrl,

    // portalItem: {
    //   id,
    // },

    title: accessControlTitle,
    outFields: [acDescriptionFieldName],
    fields: [
      {
        name: acDescriptionFieldName,
        alias: "Access Control Type",
      },
      {
        name: acCodeFieldName,
        alias: "Access Control Code",
      },
    ],
  });
}

export const accessControlLayer = createAccessControlLayer();

let accessControlLayerView: FeatureLayerView | undefined;

const lvCreateHandler = accessControlLayer.on(
  "layerview-create",
  ({ layerView }) => {
    accessControlLayerView = layerView as FeatureLayerView;
    lvCreateHandler.remove();
  }
);

/**
 * Asynchronously queries the given layer view with the specified point and returns unique access control types.
 *
 * @param layerView - The feature layer or feature layer view to query.
 * @param point - The point to use for the query geometry.
 * @return An array of unique access control types.
 */
export async function queryAccessControl(point: Point) {
  const layerOrView = accessControlLayerView ?? accessControlLayer;
  const query = layerOrView.createQuery();
  query.geometry = point;
  query.spatialRelationship = "intersects";
  query.outFields = [acDescriptionFieldName];
  query.returnGeometry = false;

  const result = await layerOrView.queryFeatures(query);

  const { features } = result;

  type HasAccessControlTypeDescription = AccessControlAttributes &
    Required<Pick<AccessControlAttributes, "AccessControlTypeDescription">>;

  const attributes = features.map(
    (f) => f.attributes as HasAccessControlTypeDescription
  );
  let acTypes: Iterable<AccessControlTypeDescription>;
  acTypes = attributes.map((f) => f.AccessControlTypeDescription);
  acTypes = new Set(acTypes);
  return acTypes;
}
