let results: FeatureAttributes[] | undefined;

const srmpFieldName = "SRMP";
const routeIdFieldName = "RouteID";
const directionFieldName = "Direction";
const minSrmpFieldName = "MinSrmp";
const maxSrmpFieldName = "MaxSrmp";

const outStatistics = [
  {
    statisticType: "MIN",
    onStatisticField: srmpFieldName,
    outStatisticFieldName: minSrmpFieldName,
  },
  {
    statisticType: "MAX",
    onStatisticField: srmpFieldName,
    outStatisticFieldName: maxSrmpFieldName,
  },
] as const;

interface FeatureAttributes {
  RouteID: string;
  Direction: "i" | "d";
  MinSrmp: number;
  MaxSrmp: number;
}

interface Feature {
  attributes: FeatureAttributes;
}

interface FeatureSet extends Record<string, unknown> {
  displayFieldName: "";
  fieldAliases: {
    RouteID: typeof routeIdFieldName;
    Direction: typeof directionFieldName;
    MinSrmp: typeof minSrmpFieldName;
    MaxSrmp: typeof maxSrmpFieldName;
  };
  fields: [
    {
      name: typeof routeIdFieldName;
      type: "esriFieldTypeString";
      alias: typeof routeIdFieldName;
      length: 12;
    },
    {
      name: typeof directionFieldName;
      type: "esriFieldTypeString";
      alias: typeof directionFieldName;
      length: 2;
    },
    {
      name: typeof minSrmpFieldName;
      type: "esriFieldTypeSingle";
      alias: typeof minSrmpFieldName;
    },
    {
      name: typeof maxSrmpFieldName;
      type: "esriFieldTypeSingle";
      alias: typeof maxSrmpFieldName;
    },
  ];
  features: Feature[];
}

export const milepostsUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/MilepostValues/FeatureServer/3/query/";
/**
 * Retrieves a list of all route IDs and their minimum and maximum SRMP values.
 * @returns - A list of route IDs and their minimum and maximum SRMP values.
 */
export async function getRouteList() {
  if (!results) {
    const fieldPairString = `${routeIdFieldName},${directionFieldName}`;
    const search = new URLSearchParams([
      ["outStatistics", JSON.stringify(outStatistics)],
      ["returnGeometry", "false"],
      ["groupByFieldsForStatistics", fieldPairString],
      ["orderByFields", fieldPairString],
      ["f", "json"],
    ]);
    const url = new URL(`?${search.toString()}`, milepostsUrl);
    const response = await fetch(url);
    console.debug(response);
    results = ((await response.json()) as FeatureSet).features.map(
      (feature) => feature.attributes,
    );
  }
  return results;
}
