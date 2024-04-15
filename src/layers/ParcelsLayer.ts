const arcGisOnlineId = "e8f2df3ed92843738f3dd778e92e93fc";

const [
  { default: Field },
  { default: FeatureLayer },
  { default: PortalItem },
  { default: SimpleRenderer },
  { default: SimpleFillSymbol },
  { default: SimpleLineSymbol },
  { default: TextSymbol },
  { default: LabelClass },
] = await Promise.all([
  import("@arcgis/core/layers/support/Field"),
  import("@arcgis/core/layers/FeatureLayer"),
  import("@arcgis/core/portal/PortalItem"),
  import("@arcgis/core/renderers/SimpleRenderer"),
  import("@arcgis/core/symbols/SimpleFillSymbol"),
  import("@arcgis/core/symbols/SimpleLineSymbol"),
  import("@arcgis/core/symbols/TextSymbol"),
  import("@arcgis/core/layers/support/LabelClass"),
]);

const outlineColor = "light-gray";

const renderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    outline: new SimpleLineSymbol({
      color: outlineColor,
      style: "dash-dot",
      width: 0.5,
    }),
  }),
});

const fields = (
  [
    {
      name: "OBJECTID",
      type: "oid",
      nullable: false,
      defaultValue: null,
    },
    {
      name: "FIPS_NR",
      type: "string",
      length: 3,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "COUNTY_NM",
      type: "string",
      length: 12,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "PARCEL_ID_NR",
      type: "string",
      length: 24,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "ORIG_PARCEL_ID",
      type: "string",
      length: 20,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "SITUS_ADDRESS",
      type: "string",
      length: 60,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "SUB_ADDRESS",
      type: "string",
      length: 50,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "SITUS_CITY_NM",
      type: "string",
      length: 30,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "SITUS_ZIP_NR",
      type: "string",
      length: 10,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "LANDUSE_CD",
      type: "small-integer",
      nullable: true,
      defaultValue: null,
    },
    {
      name: "VALUE_LAND",
      type: "integer",
      nullable: true,
      defaultValue: null,
    },
    {
      name: "VALUE_BLDG",
      type: "integer",
      nullable: true,
      defaultValue: null,
    },
    {
      name: "DATA_LINK",
      type: "string",
      length: 255,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "FILE_DATE",
      type: "date",
      length: 8,
      nullable: true,
      defaultValue: null,
    },
    {
      name: "GlobalID",
      type: "global-id",
      length: 38,
      nullable: false,
      defaultValue: null,
    },
  ] as const
).map((field) => new Field(field));

const labelSymbol = new TextSymbol({
  color: outlineColor,
  haloColor: "white",
  haloSize: 0.3,
  font: {
    size: 10,
    weight: "normal",
  },
});

/**
 * Parcels layer
 * @see {@link https://www.arcgis.com/home/item.html?id=e8f2df3ed92843738f3dd778e92e93fc}
 */
export const parcelsLayer = new FeatureLayer({
  id: "parcels",
  title: "Parcels",
  fields,
  labelsVisible: true,
  labelingInfo: [
    new LabelClass({
      labelExpressionInfo: {
        expression: "$feature.PARCEL_ID_NR",
        title: "Parcel ID",
      },
      symbol: labelSymbol,
      useCodedValues: true,
    }),
  ],
  displayField: "PARCEL_ID_NR",
  outFields: ["*"],
  visible: false,
  portalItem: new PortalItem({
    id: arcGisOnlineId,
  }),
  popupEnabled: false,
  renderer,
});
