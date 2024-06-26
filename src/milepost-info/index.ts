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

export const sampleResults = {
  displayFieldName: "",
  fieldAliases: {
    RouteID: "RouteID",
    Direction: "Direction",
    MinSrmp: "MinSrmp",
    MaxSrmp: "MaxSrmp",
  },
  fields: [
    {
      name: "RouteID",
      type: "esriFieldTypeString",
      alias: "RouteID",
      length: 12,
    },
    {
      name: "Direction",
      type: "esriFieldTypeString",
      alias: "Direction",
      length: 2,
    },
    {
      name: "MinSrmp",
      type: "esriFieldTypeSingle",
      alias: "MinSrmp",
    },
    {
      name: "MaxSrmp",
      type: "esriFieldTypeSingle",
      alias: "MaxSrmp",
    },
  ],
  features: [
    {
      attributes: {
        RouteID: "002",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 334.5,
      },
    },
    {
      attributes: {
        RouteID: "002",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 334.5,
      },
    },
    {
      attributes: {
        RouteID: "002COBROWNE",
        Direction: "i",
        MinSrmp: 287.5,
        MaxSrmp: 288.0,
      },
    },
    {
      attributes: {
        RouteID: "002CODIVISN",
        Direction: "i",
        MinSrmp: 289.2,
        MaxSrmp: 290.7,
      },
    },
    {
      attributes: {
        RouteID: "002CONEWPRT",
        Direction: "i",
        MinSrmp: 334.4,
        MaxSrmp: 334.8,
      },
    },
    {
      attributes: {
        RouteID: "002CONEWPRT",
        Direction: "d",
        MinSrmp: 334.4,
        MaxSrmp: 334.4,
      },
    },
    {
      attributes: {
        RouteID: "003",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 60.0,
      },
    },
    {
      attributes: {
        RouteID: "003",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 60.0,
      },
    },
    {
      attributes: {
        RouteID: "004",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 62.2,
      },
    },
    {
      attributes: {
        RouteID: "004",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 62.2,
      },
    },
    {
      attributes: {
        RouteID: "004COKELSO",
        Direction: "i",
        MinSrmp: 61.8,
        MaxSrmp: 61.9,
      },
    },
    {
      attributes: {
        RouteID: "004COKELSO",
        Direction: "d",
        MinSrmp: 61.9,
        MaxSrmp: 61.9,
      },
    },
    {
      attributes: {
        RouteID: "005",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 276.5,
      },
    },
    {
      attributes: {
        RouteID: "005",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 276.5,
      },
    },
    {
      attributes: {
        RouteID: "005RL005EXP",
        Direction: "i",
        MinSrmp: 165.3,
        MaxSrmp: 172.4,
      },
    },
    {
      attributes: {
        RouteID: "005RL005EXP",
        Direction: "d",
        MinSrmp: 172.5,
        MaxSrmp: 172.5,
      },
    },
    {
      attributes: {
        RouteID: "006",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 51.3,
      },
    },
    {
      attributes: {
        RouteID: "006",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 51.3,
      },
    },
    {
      attributes: {
        RouteID: "007",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 58.6,
      },
    },
    {
      attributes: {
        RouteID: "007",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 58.6,
      },
    },
    {
      attributes: {
        RouteID: "008",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 20.6,
      },
    },
    {
      attributes: {
        RouteID: "008",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 20.6,
      },
    },
    {
      attributes: {
        RouteID: "009",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 98.1,
      },
    },
    {
      attributes: {
        RouteID: "009",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 98.1,
      },
    },
    {
      attributes: {
        RouteID: "009SPSUMAS",
        Direction: "i",
        MinSrmp: 98.0,
        MaxSrmp: 98.2,
      },
    },
    {
      attributes: {
        RouteID: "009SPSUMAS",
        Direction: "d",
        MinSrmp: 98.0,
        MaxSrmp: 98.2,
      },
    },
    {
      attributes: {
        RouteID: "010",
        Direction: "i",
        MinSrmp: 88.3,
        MaxSrmp: 104.4,
      },
    },
    {
      attributes: {
        RouteID: "010",
        Direction: "d",
        MinSrmp: 88.3,
        MaxSrmp: 104.4,
      },
    },
    {
      attributes: {
        RouteID: "011",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 21.2,
      },
    },
    {
      attributes: {
        RouteID: "011",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 21.2,
      },
    },
    {
      attributes: {
        RouteID: "012",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 434.1,
      },
    },
    {
      attributes: {
        RouteID: "012",
        Direction: "d",
        MinSrmp: 0.4,
        MaxSrmp: 434.1,
      },
    },
    {
      attributes: {
        RouteID: "012COABERDN",
        Direction: "i",
        MinSrmp: 0.4,
        MaxSrmp: 0.6,
      },
    },
    {
      attributes: {
        RouteID: "014",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 180.7,
      },
    },
    {
      attributes: {
        RouteID: "014",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 180.7,
      },
    },
    {
      attributes: {
        RouteID: "014SPMARYHL",
        Direction: "i",
        MinSrmp: 100.7,
        MaxSrmp: 101.0,
      },
    },
    {
      attributes: {
        RouteID: "014SPMARYHL",
        Direction: "d",
        MinSrmp: 100.7,
        MaxSrmp: 101.0,
      },
    },
    {
      attributes: {
        RouteID: "016",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 29.1,
      },
    },
    {
      attributes: {
        RouteID: "016",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 29.0,
      },
    },
    {
      attributes: {
        RouteID: "016AR",
        Direction: "i",
        MinSrmp: 9.2,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "016SPGORST",
        Direction: "i",
        MinSrmp: 28.8,
        MaxSrmp: 29.1,
      },
    },
    {
      attributes: {
        RouteID: "016SPGORST",
        Direction: "d",
        MinSrmp: 28.8,
        MaxSrmp: 29.1,
      },
    },
    {
      attributes: {
        RouteID: "017",
        Direction: "i",
        MinSrmp: 7.5,
        MaxSrmp: 144.2,
      },
    },
    {
      attributes: {
        RouteID: "017",
        Direction: "d",
        MinSrmp: 7.5,
        MaxSrmp: 144.2,
      },
    },
    {
      attributes: {
        RouteID: "018",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 27.9,
      },
    },
    {
      attributes: {
        RouteID: "018",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 27.9,
      },
    },
    {
      attributes: {
        RouteID: "019",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 14.0,
      },
    },
    {
      attributes: {
        RouteID: "019",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 14.0,
      },
    },
    {
      attributes: {
        RouteID: "020",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 436.9,
      },
    },
    {
      attributes: {
        RouteID: "020",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 436.9,
      },
    },
    {
      attributes: {
        RouteID: "020SPANACRT",
        Direction: "i",
        MinSrmp: 47.9,
        MaxSrmp: 55.6,
      },
    },
    {
      attributes: {
        RouteID: "020SPANACRT",
        Direction: "d",
        MinSrmp: 47.9,
        MaxSrmp: 55.6,
      },
    },
    {
      attributes: {
        RouteID: "021",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 191.3,
      },
    },
    {
      attributes: {
        RouteID: "021",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 191.3,
      },
    },
    {
      attributes: {
        RouteID: "022",
        Direction: "i",
        MinSrmp: 0.7,
        MaxSrmp: 36.5,
      },
    },
    {
      attributes: {
        RouteID: "022",
        Direction: "d",
        MinSrmp: 0.7,
        MaxSrmp: 36.5,
      },
    },
    {
      attributes: {
        RouteID: "023",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 66.0,
      },
    },
    {
      attributes: {
        RouteID: "023",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 66.0,
      },
    },
    {
      attributes: {
        RouteID: "024",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 79.6,
      },
    },
    {
      attributes: {
        RouteID: "024",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 79.6,
      },
    },
    {
      attributes: {
        RouteID: "025",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 121.2,
      },
    },
    {
      attributes: {
        RouteID: "025",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 121.2,
      },
    },
    {
      attributes: {
        RouteID: "026",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 133.5,
      },
    },
    {
      attributes: {
        RouteID: "026",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 133.5,
      },
    },
    {
      attributes: {
        RouteID: "026SPCOLFAX",
        Direction: "i",
        MinSrmp: 133.5,
        MaxSrmp: 133.5,
      },
    },
    {
      attributes: {
        RouteID: "026SPCOLFAX",
        Direction: "d",
        MinSrmp: 133.5,
        MaxSrmp: 133.5,
      },
    },
    {
      attributes: {
        RouteID: "027",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 87.7,
      },
    },
    {
      attributes: {
        RouteID: "027",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 87.7,
      },
    },
    {
      attributes: {
        RouteID: "028",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 131.1,
      },
    },
    {
      attributes: {
        RouteID: "028",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 131.1,
      },
    },
    {
      attributes: {
        RouteID: "028COWENTCH",
        Direction: "i",
        MinSrmp: 4.3,
        MaxSrmp: 4.5,
      },
    },
    {
      attributes: {
        RouteID: "028SPWENTCH",
        Direction: "i",
        MinSrmp: 4.3,
        MaxSrmp: 5.0,
      },
    },
    {
      attributes: {
        RouteID: "028SPWENTCH",
        Direction: "d",
        MinSrmp: 4.3,
        MaxSrmp: 5.0,
      },
    },
    {
      attributes: {
        RouteID: "031",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 26.7,
      },
    },
    {
      attributes: {
        RouteID: "031",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 26.7,
      },
    },
    {
      attributes: {
        RouteID: "041",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 0.4,
      },
    },
    {
      attributes: {
        RouteID: "041",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 0.4,
      },
    },
    {
      attributes: {
        RouteID: "082",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 132.6,
      },
    },
    {
      attributes: {
        RouteID: "082",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 132.6,
      },
    },
    {
      attributes: {
        RouteID: "090",
        Direction: "i",
        MinSrmp: 2.1,
        MaxSrmp: 299.8,
      },
    },
    {
      attributes: {
        RouteID: "090",
        Direction: "d",
        MinSrmp: 2.0,
        MaxSrmp: 299.8,
      },
    },
    {
      attributes: {
        RouteID: "092",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.1,
      },
    },
    {
      attributes: {
        RouteID: "092",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.1,
      },
    },
    {
      attributes: {
        RouteID: "092SPGRANIT",
        Direction: "i",
        MinSrmp: 7.3,
        MaxSrmp: 7.3,
      },
    },
    {
      attributes: {
        RouteID: "092SPGRANIT",
        Direction: "d",
        MinSrmp: 7.3,
        MaxSrmp: 7.3,
      },
    },
    {
      attributes: {
        RouteID: "096",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 6.7,
      },
    },
    {
      attributes: {
        RouteID: "096",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 6.7,
      },
    },
    {
      attributes: {
        RouteID: "097",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 336.4,
      },
    },
    {
      attributes: {
        RouteID: "097",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 336.5,
      },
    },
    {
      attributes: {
        RouteID: "097AR",
        Direction: "i",
        MinSrmp: 199.9,
        MaxSrmp: 239.6,
      },
    },
    {
      attributes: {
        RouteID: "097AR",
        Direction: "d",
        MinSrmp: 199.9,
        MaxSrmp: 239.6,
      },
    },
    {
      attributes: {
        RouteID: "097COMARYHL",
        Direction: "i",
        MinSrmp: 2.6,
        MaxSrmp: 2.6,
      },
    },
    {
      attributes: {
        RouteID: "097COMARYHL",
        Direction: "d",
        MinSrmp: 2.6,
        MaxSrmp: 2.6,
      },
    },
    {
      attributes: {
        RouteID: "097SPORONDO",
        Direction: "i",
        MinSrmp: 213.4,
        MaxSrmp: 213.6,
      },
    },
    {
      attributes: {
        RouteID: "097SPORONDO",
        Direction: "d",
        MinSrmp: 213.4,
        MaxSrmp: 213.6,
      },
    },
    {
      attributes: {
        RouteID: "099",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 55.4,
      },
    },
    {
      attributes: {
        RouteID: "099",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 55.4,
      },
    },
    {
      attributes: {
        RouteID: "099COTUNNEL",
        Direction: "i",
        MinSrmp: 32.7,
        MaxSrmp: 35.1,
      },
    },
    {
      attributes: {
        RouteID: "100",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 4.6,
      },
    },
    {
      attributes: {
        RouteID: "100",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 4.6,
      },
    },
    {
      attributes: {
        RouteID: "100SPCANBY",
        Direction: "i",
        MinSrmp: 3.0,
        MaxSrmp: 3.0,
      },
    },
    {
      attributes: {
        RouteID: "100SPCANBY",
        Direction: "d",
        MinSrmp: 3.0,
        MaxSrmp: 3.0,
      },
    },
    {
      attributes: {
        RouteID: "101",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 367.4,
      },
    },
    {
      attributes: {
        RouteID: "101",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 367.3,
      },
    },
    {
      attributes: {
        RouteID: "101AR",
        Direction: "i",
        MinSrmp: 9.5,
        MaxSrmp: 10.0,
      },
    },
    {
      attributes: {
        RouteID: "101AR",
        Direction: "d",
        MinSrmp: 9.5,
        MaxSrmp: 10.0,
      },
    },
    {
      attributes: {
        RouteID: "101COABERDN",
        Direction: "i",
        MinSrmp: 87.5,
        MaxSrmp: 91.6,
      },
    },
    {
      attributes: {
        RouteID: "101COABERDN",
        Direction: "d",
        MinSrmp: 87.5,
        MaxSrmp: 87.6,
      },
    },
    {
      attributes: {
        RouteID: "101COHERON",
        Direction: "i",
        MinSrmp: 83.8,
        MaxSrmp: 83.8,
      },
    },
    {
      attributes: {
        RouteID: "101COPRTANG",
        Direction: "i",
        MinSrmp: 249.7,
        MaxSrmp: 251.3,
      },
    },
    {
      attributes: {
        RouteID: "101COPRTANG",
        Direction: "d",
        MinSrmp: 251.3,
        MaxSrmp: 251.3,
      },
    },
    {
      attributes: {
        RouteID: "102",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 2.8,
      },
    },
    {
      attributes: {
        RouteID: "102",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 2.8,
      },
    },
    {
      attributes: {
        RouteID: "103",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 19.9,
      },
    },
    {
      attributes: {
        RouteID: "103",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 19.9,
      },
    },
    {
      attributes: {
        RouteID: "104",
        Direction: "i",
        MinSrmp: 0.2,
        MaxSrmp: 32.2,
      },
    },
    {
      attributes: {
        RouteID: "104",
        Direction: "d",
        MinSrmp: 0.2,
        MaxSrmp: 32.2,
      },
    },
    {
      attributes: {
        RouteID: "104COKNGSTN",
        Direction: "i",
        MinSrmp: 24.6,
        MaxSrmp: 24.8,
      },
    },
    {
      attributes: {
        RouteID: "104SPAURORA",
        Direction: "i",
        MinSrmp: 28.7,
        MaxSrmp: 29.0,
      },
    },
    {
      attributes: {
        RouteID: "104SPAURORA",
        Direction: "d",
        MinSrmp: 28.7,
        MaxSrmp: 29.0,
      },
    },
    {
      attributes: {
        RouteID: "105",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 48.7,
      },
    },
    {
      attributes: {
        RouteID: "105",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 48.7,
      },
    },
    {
      attributes: {
        RouteID: "105SPBOONE",
        Direction: "i",
        MinSrmp: 48.7,
        MaxSrmp: 48.7,
      },
    },
    {
      attributes: {
        RouteID: "105SPBOONE",
        Direction: "d",
        MinSrmp: 48.7,
        MaxSrmp: 48.7,
      },
    },
    {
      attributes: {
        RouteID: "105SPWESTPT",
        Direction: "i",
        MinSrmp: 30.3,
        MaxSrmp: 34.3,
      },
    },
    {
      attributes: {
        RouteID: "105SPWESTPT",
        Direction: "d",
        MinSrmp: 30.3,
        MaxSrmp: 34.3,
      },
    },
    {
      attributes: {
        RouteID: "106",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 19.9,
      },
    },
    {
      attributes: {
        RouteID: "106",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 19.9,
      },
    },
    {
      attributes: {
        RouteID: "107",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 7.9,
      },
    },
    {
      attributes: {
        RouteID: "107",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 7.9,
      },
    },
    {
      attributes: {
        RouteID: "108",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 11.9,
      },
    },
    {
      attributes: {
        RouteID: "108",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 11.9,
      },
    },
    {
      attributes: {
        RouteID: "109",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 40.4,
      },
    },
    {
      attributes: {
        RouteID: "109",
        Direction: "d",
        MinSrmp: 0.2,
        MaxSrmp: 40.4,
      },
    },
    {
      attributes: {
        RouteID: "109COHQUIAM",
        Direction: "i",
        MinSrmp: 0.2,
        MaxSrmp: 0.2,
      },
    },
    {
      attributes: {
        RouteID: "109SPLONNGR",
        Direction: "i",
        MinSrmp: 1.8,
        MaxSrmp: 3.6,
      },
    },
    {
      attributes: {
        RouteID: "109SPLONNGR",
        Direction: "d",
        MinSrmp: 1.8,
        MaxSrmp: 3.6,
      },
    },
    {
      attributes: {
        RouteID: "110",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 11.1,
      },
    },
    {
      attributes: {
        RouteID: "110",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 11.1,
      },
    },
    {
      attributes: {
        RouteID: "110SPMORA",
        Direction: "i",
        MinSrmp: 7.8,
        MaxSrmp: 10.4,
      },
    },
    {
      attributes: {
        RouteID: "110SPMORA",
        Direction: "d",
        MinSrmp: 7.8,
        MaxSrmp: 10.4,
      },
    },
    {
      attributes: {
        RouteID: "112",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 61.0,
      },
    },
    {
      attributes: {
        RouteID: "112",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 61.0,
      },
    },
    {
      attributes: {
        RouteID: "113",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.9,
      },
    },
    {
      attributes: {
        RouteID: "113",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.9,
      },
    },
    {
      attributes: {
        RouteID: "115",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 2.2,
      },
    },
    {
      attributes: {
        RouteID: "115",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 2.2,
      },
    },
    {
      attributes: {
        RouteID: "116",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "116",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "117",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 1.4,
      },
    },
    {
      attributes: {
        RouteID: "117",
        Direction: "d",
        MinSrmp: 0.1,
        MaxSrmp: 1.4,
      },
    },
    {
      attributes: {
        RouteID: "119",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 10.9,
      },
    },
    {
      attributes: {
        RouteID: "119",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 10.9,
      },
    },
    {
      attributes: {
        RouteID: "121",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 7.6,
      },
    },
    {
      attributes: {
        RouteID: "121",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 7.6,
      },
    },
    {
      attributes: {
        RouteID: "122",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 7.8,
      },
    },
    {
      attributes: {
        RouteID: "122",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 7.8,
      },
    },
    {
      attributes: {
        RouteID: "123",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 16.3,
      },
    },
    {
      attributes: {
        RouteID: "123",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 16.3,
      },
    },
    {
      attributes: {
        RouteID: "124",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 44.9,
      },
    },
    {
      attributes: {
        RouteID: "124",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 44.9,
      },
    },
    {
      attributes: {
        RouteID: "125",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 23.6,
      },
    },
    {
      attributes: {
        RouteID: "125",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 23.6,
      },
    },
    {
      attributes: {
        RouteID: "125SP125SP",
        Direction: "i",
        MinSrmp: 6.1,
        MaxSrmp: 6.8,
      },
    },
    {
      attributes: {
        RouteID: "125SP125SP",
        Direction: "d",
        MinSrmp: 6.1,
        MaxSrmp: 6.8,
      },
    },
    {
      attributes: {
        RouteID: "127",
        Direction: "i",
        MinSrmp: 0.1,
        MaxSrmp: 27.0,
      },
    },
    {
      attributes: {
        RouteID: "127",
        Direction: "d",
        MinSrmp: 0.1,
        MaxSrmp: 27.0,
      },
    },
    {
      attributes: {
        RouteID: "128",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 2.2,
      },
    },
    {
      attributes: {
        RouteID: "128",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 2.2,
      },
    },
    {
      attributes: {
        RouteID: "129",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 42.5,
      },
    },
    {
      attributes: {
        RouteID: "129",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 42.5,
      },
    },
    {
      attributes: {
        RouteID: "129SP6THST",
        Direction: "i",
        MinSrmp: 42.2,
        MaxSrmp: 42.4,
      },
    },
    {
      attributes: {
        RouteID: "129SP6THST",
        Direction: "d",
        MinSrmp: 42.2,
        MaxSrmp: 42.4,
      },
    },
    {
      attributes: {
        RouteID: "131",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 2.0,
      },
    },
    {
      attributes: {
        RouteID: "131",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 2.0,
      },
    },
    {
      attributes: {
        RouteID: "141",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 29.2,
      },
    },
    {
      attributes: {
        RouteID: "141",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 29.2,
      },
    },
    {
      attributes: {
        RouteID: "141SPUNDRWD",
        Direction: "i",
        MinSrmp: 4.7,
        MaxSrmp: 6.8,
      },
    },
    {
      attributes: {
        RouteID: "141SPUNDRWD",
        Direction: "d",
        MinSrmp: 4.7,
        MaxSrmp: 6.8,
      },
    },
    {
      attributes: {
        RouteID: "142",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 35.2,
      },
    },
    {
      attributes: {
        RouteID: "142",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 35.2,
      },
    },
    {
      attributes: {
        RouteID: "150",
        Direction: "i",
        MinSrmp: 0.3,
        MaxSrmp: 12.0,
      },
    },
    {
      attributes: {
        RouteID: "150",
        Direction: "d",
        MinSrmp: 0.3,
        MaxSrmp: 12.0,
      },
    },
    {
      attributes: {
        RouteID: "153",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 30.7,
      },
    },
    {
      attributes: {
        RouteID: "153",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 30.7,
      },
    },
    {
      attributes: {
        RouteID: "155",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 80.4,
      },
    },
    {
      attributes: {
        RouteID: "155",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 80.4,
      },
    },
    {
      attributes: {
        RouteID: "155SPOMAK",
        Direction: "i",
        MinSrmp: 80.2,
        MaxSrmp: 80.5,
      },
    },
    {
      attributes: {
        RouteID: "155SPOMAK",
        Direction: "d",
        MinSrmp: 80.2,
        MaxSrmp: 80.5,
      },
    },
    {
      attributes: {
        RouteID: "160",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 7.4,
      },
    },
    {
      attributes: {
        RouteID: "160",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 7.4,
      },
    },
    {
      attributes: {
        RouteID: "161",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 36.2,
      },
    },
    {
      attributes: {
        RouteID: "161",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 36.2,
      },
    },
    {
      attributes: {
        RouteID: "162",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 19.7,
      },
    },
    {
      attributes: {
        RouteID: "162",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 19.7,
      },
    },
    {
      attributes: {
        RouteID: "163",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.3,
      },
    },
    {
      attributes: {
        RouteID: "163",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.3,
      },
    },
    {
      attributes: {
        RouteID: "164",
        Direction: "i",
        MinSrmp: 0.4,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "164",
        Direction: "d",
        MinSrmp: 0.4,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "165",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 21.1,
      },
    },
    {
      attributes: {
        RouteID: "165",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 21.1,
      },
    },
    {
      attributes: {
        RouteID: "166",
        Direction: "i",
        MinSrmp: 0.1,
        MaxSrmp: 5.1,
      },
    },
    {
      attributes: {
        RouteID: "166",
        Direction: "d",
        MinSrmp: 0.1,
        MaxSrmp: 5.1,
      },
    },
    {
      attributes: {
        RouteID: "167",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 27.1,
      },
    },
    {
      attributes: {
        RouteID: "167",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 27.1,
      },
    },
    {
      attributes: {
        RouteID: "169",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 25.2,
      },
    },
    {
      attributes: {
        RouteID: "169",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 25.2,
      },
    },
    {
      attributes: {
        RouteID: "170",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.6,
      },
    },
    {
      attributes: {
        RouteID: "170",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.6,
      },
    },
    {
      attributes: {
        RouteID: "171",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "171",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "172",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 35.0,
      },
    },
    {
      attributes: {
        RouteID: "172",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 35.0,
      },
    },
    {
      attributes: {
        RouteID: "173",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 11.9,
      },
    },
    {
      attributes: {
        RouteID: "173",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 11.9,
      },
    },
    {
      attributes: {
        RouteID: "174",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 40.6,
      },
    },
    {
      attributes: {
        RouteID: "174",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 40.6,
      },
    },
    {
      attributes: {
        RouteID: "174SPCRWNPT",
        Direction: "i",
        MinSrmp: 19.6,
        MaxSrmp: 20.9,
      },
    },
    {
      attributes: {
        RouteID: "174SPCRWNPT",
        Direction: "d",
        MinSrmp: 19.6,
        MaxSrmp: 20.9,
      },
    },
    {
      attributes: {
        RouteID: "174SPLEAHY",
        Direction: "i",
        MinSrmp: 0.2,
        MaxSrmp: 0.2,
      },
    },
    {
      attributes: {
        RouteID: "174SPLEAHY",
        Direction: "d",
        MinSrmp: 0.2,
        MaxSrmp: 0.2,
      },
    },
    {
      attributes: {
        RouteID: "181",
        Direction: "i",
        MinSrmp: 5.4,
        MaxSrmp: 11.3,
      },
    },
    {
      attributes: {
        RouteID: "181",
        Direction: "d",
        MinSrmp: 5.4,
        MaxSrmp: 11.3,
      },
    },
    {
      attributes: {
        RouteID: "182",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "182",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "193",
        Direction: "i",
        MinSrmp: 0.6,
        MaxSrmp: 3.0,
      },
    },
    {
      attributes: {
        RouteID: "193",
        Direction: "d",
        MinSrmp: 0.6,
        MaxSrmp: 3.0,
      },
    },
    {
      attributes: {
        RouteID: "194",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 21.0,
      },
    },
    {
      attributes: {
        RouteID: "194",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 21.0,
      },
    },
    {
      attributes: {
        RouteID: "195",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 95.9,
      },
    },
    {
      attributes: {
        RouteID: "195",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 95.9,
      },
    },
    {
      attributes: {
        RouteID: "195SPGNESSE",
        Direction: "i",
        MinSrmp: 0.1,
        MaxSrmp: 0.6,
      },
    },
    {
      attributes: {
        RouteID: "195SPGNESSE",
        Direction: "d",
        MinSrmp: 0.1,
        MaxSrmp: 0.6,
      },
    },
    {
      attributes: {
        RouteID: "197",
        Direction: "i",
        MinSrmp: 0.5,
        MaxSrmp: 3.1,
      },
    },
    {
      attributes: {
        RouteID: "197",
        Direction: "d",
        MinSrmp: 0.5,
        MaxSrmp: 3.1,
      },
    },
    {
      attributes: {
        RouteID: "202",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 30.6,
      },
    },
    {
      attributes: {
        RouteID: "202",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 30.6,
      },
    },
    {
      attributes: {
        RouteID: "203",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 24.1,
      },
    },
    {
      attributes: {
        RouteID: "203",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 24.1,
      },
    },
    {
      attributes: {
        RouteID: "204",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 2.3,
      },
    },
    {
      attributes: {
        RouteID: "204",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 2.3,
      },
    },
    {
      attributes: {
        RouteID: "205",
        Direction: "i",
        MinSrmp: 26.6,
        MaxSrmp: 37.1,
      },
    },
    {
      attributes: {
        RouteID: "205",
        Direction: "d",
        MinSrmp: 26.6,
        MaxSrmp: 37.1,
      },
    },
    {
      attributes: {
        RouteID: "206",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 15.3,
      },
    },
    {
      attributes: {
        RouteID: "206",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 15.3,
      },
    },
    {
      attributes: {
        RouteID: "207",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 4.3,
      },
    },
    {
      attributes: {
        RouteID: "207",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 4.3,
      },
    },
    {
      attributes: {
        RouteID: "211",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "211",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "213",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 0.3,
      },
    },
    {
      attributes: {
        RouteID: "213",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 0.3,
      },
    },
    {
      attributes: {
        RouteID: "215",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 6.2,
      },
    },
    {
      attributes: {
        RouteID: "215",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 6.2,
      },
    },
    {
      attributes: {
        RouteID: "221",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 26.0,
      },
    },
    {
      attributes: {
        RouteID: "221",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 26.0,
      },
    },
    {
      attributes: {
        RouteID: "223",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "223",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "224",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.9,
      },
    },
    {
      attributes: {
        RouteID: "224",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.9,
      },
    },
    {
      attributes: {
        RouteID: "225",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 11.3,
      },
    },
    {
      attributes: {
        RouteID: "225",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 11.3,
      },
    },
    {
      attributes: {
        RouteID: "231",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 75.1,
      },
    },
    {
      attributes: {
        RouteID: "231",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 75.1,
      },
    },
    {
      attributes: {
        RouteID: "240",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 43.1,
      },
    },
    {
      attributes: {
        RouteID: "240",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 43.1,
      },
    },
    {
      attributes: {
        RouteID: "241",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 25.2,
      },
    },
    {
      attributes: {
        RouteID: "241",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 25.2,
      },
    },
    {
      attributes: {
        RouteID: "243",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 28.2,
      },
    },
    {
      attributes: {
        RouteID: "243",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 28.2,
      },
    },
    {
      attributes: {
        RouteID: "260",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 39.4,
      },
    },
    {
      attributes: {
        RouteID: "260",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 39.4,
      },
    },
    {
      attributes: {
        RouteID: "261",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 62.8,
      },
    },
    {
      attributes: {
        RouteID: "261",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 62.8,
      },
    },
    {
      attributes: {
        RouteID: "262",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 24.2,
      },
    },
    {
      attributes: {
        RouteID: "262",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 24.2,
      },
    },
    {
      attributes: {
        RouteID: "263",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.2,
      },
    },
    {
      attributes: {
        RouteID: "263",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.2,
      },
    },
    {
      attributes: {
        RouteID: "270",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "270",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "270COPULLMN",
        Direction: "i",
        MinSrmp: 2.7,
        MaxSrmp: 2.9,
      },
    },
    {
      attributes: {
        RouteID: "271",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 8.4,
      },
    },
    {
      attributes: {
        RouteID: "271",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 8.4,
      },
    },
    {
      attributes: {
        RouteID: "272",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 19.2,
      },
    },
    {
      attributes: {
        RouteID: "272",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 19.2,
      },
    },
    {
      attributes: {
        RouteID: "274",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 1.9,
      },
    },
    {
      attributes: {
        RouteID: "274",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 1.9,
      },
    },
    {
      attributes: {
        RouteID: "278",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 5.5,
      },
    },
    {
      attributes: {
        RouteID: "278",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 5.5,
      },
    },
    {
      attributes: {
        RouteID: "281",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 10.5,
      },
    },
    {
      attributes: {
        RouteID: "281",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 10.5,
      },
    },
    {
      attributes: {
        RouteID: "281SPBURKE",
        Direction: "i",
        MinSrmp: 2.7,
        MaxSrmp: 4.3,
      },
    },
    {
      attributes: {
        RouteID: "281SPBURKE",
        Direction: "d",
        MinSrmp: 2.7,
        MaxSrmp: 4.3,
      },
    },
    {
      attributes: {
        RouteID: "282",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 4.9,
      },
    },
    {
      attributes: {
        RouteID: "282",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 4.9,
      },
    },
    {
      attributes: {
        RouteID: "283",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 14.8,
      },
    },
    {
      attributes: {
        RouteID: "283",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 14.8,
      },
    },
    {
      attributes: {
        RouteID: "285",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 5.0,
      },
    },
    {
      attributes: {
        RouteID: "285",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 5.0,
      },
    },
    {
      attributes: {
        RouteID: "285COWENTCH",
        Direction: "i",
        MinSrmp: 2.9,
        MaxSrmp: 4.6,
      },
    },
    {
      attributes: {
        RouteID: "285COWENTCH",
        Direction: "d",
        MinSrmp: 2.9,
        MaxSrmp: 2.9,
      },
    },
    {
      attributes: {
        RouteID: "290",
        Direction: "i",
        MinSrmp: 0.2,
        MaxSrmp: 18.3,
      },
    },
    {
      attributes: {
        RouteID: "290",
        Direction: "d",
        MinSrmp: 0.1,
        MaxSrmp: 18.3,
      },
    },
    {
      attributes: {
        RouteID: "291",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 33.0,
      },
    },
    {
      attributes: {
        RouteID: "291",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 33.0,
      },
    },
    {
      attributes: {
        RouteID: "292",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 5.9,
      },
    },
    {
      attributes: {
        RouteID: "292",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 5.9,
      },
    },
    {
      attributes: {
        RouteID: "300",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.3,
      },
    },
    {
      attributes: {
        RouteID: "300",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.3,
      },
    },
    {
      attributes: {
        RouteID: "302",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 16.7,
      },
    },
    {
      attributes: {
        RouteID: "302",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 16.8,
      },
    },
    {
      attributes: {
        RouteID: "302SPPURDY",
        Direction: "i",
        MinSrmp: 15.9,
        MaxSrmp: 17.1,
      },
    },
    {
      attributes: {
        RouteID: "302SPPURDY",
        Direction: "d",
        MinSrmp: 15.9,
        MaxSrmp: 16.9,
      },
    },
    {
      attributes: {
        RouteID: "303",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.1,
      },
    },
    {
      attributes: {
        RouteID: "303",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.1,
      },
    },
    {
      attributes: {
        RouteID: "304",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.5,
      },
    },
    {
      attributes: {
        RouteID: "304",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 2.9,
      },
    },
    {
      attributes: {
        RouteID: "304COTUNNEL",
        Direction: "i",
        MinSrmp: 3.6,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "305",
        Direction: "i",
        MinSrmp: 0.1,
        MaxSrmp: 13.5,
      },
    },
    {
      attributes: {
        RouteID: "305",
        Direction: "d",
        MinSrmp: 0.1,
        MaxSrmp: 13.5,
      },
    },
    {
      attributes: {
        RouteID: "307",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 5.2,
      },
    },
    {
      attributes: {
        RouteID: "307",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 5.2,
      },
    },
    {
      attributes: {
        RouteID: "308",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.4,
      },
    },
    {
      attributes: {
        RouteID: "308",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.4,
      },
    },
    {
      attributes: {
        RouteID: "310",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 1.8,
      },
    },
    {
      attributes: {
        RouteID: "310",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 1.8,
      },
    },
    {
      attributes: {
        RouteID: "395",
        Direction: "i",
        MinSrmp: 13.1,
        MaxSrmp: 270.2,
      },
    },
    {
      attributes: {
        RouteID: "395",
        Direction: "d",
        MinSrmp: 13.1,
        MaxSrmp: 270.2,
      },
    },
    {
      attributes: {
        RouteID: "395SPNSC",
        Direction: "i",
        MinSrmp: 160.5,
        MaxSrmp: 167.4,
      },
    },
    {
      attributes: {
        RouteID: "395SPNSC",
        Direction: "d",
        MinSrmp: 160.5,
        MaxSrmp: 167.4,
      },
    },
    {
      attributes: {
        RouteID: "397",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 22.3,
      },
    },
    {
      attributes: {
        RouteID: "397",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 22.3,
      },
    },
    {
      attributes: {
        RouteID: "401",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 12.1,
      },
    },
    {
      attributes: {
        RouteID: "401",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 12.1,
      },
    },
    {
      attributes: {
        RouteID: "405",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 30.3,
      },
    },
    {
      attributes: {
        RouteID: "405",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 30.3,
      },
    },
    {
      attributes: {
        RouteID: "409",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "409",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "410",
        Direction: "i",
        MinSrmp: 8.9,
        MaxSrmp: 116.3,
      },
    },
    {
      attributes: {
        RouteID: "410",
        Direction: "d",
        MinSrmp: 8.9,
        MaxSrmp: 116.3,
      },
    },
    {
      attributes: {
        RouteID: "411",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 13.4,
      },
    },
    {
      attributes: {
        RouteID: "411",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 13.4,
      },
    },
    {
      attributes: {
        RouteID: "432",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 10.3,
      },
    },
    {
      attributes: {
        RouteID: "432",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 10.3,
      },
    },
    {
      attributes: {
        RouteID: "433",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 0.9,
      },
    },
    {
      attributes: {
        RouteID: "433",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 0.9,
      },
    },
    {
      attributes: {
        RouteID: "500",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 20.8,
      },
    },
    {
      attributes: {
        RouteID: "500",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 20.8,
      },
    },
    {
      attributes: {
        RouteID: "501",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 19.8,
      },
    },
    {
      attributes: {
        RouteID: "501",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 19.8,
      },
    },
    {
      attributes: {
        RouteID: "501COVANCVR",
        Direction: "i",
        MinSrmp: 0.7,
        MaxSrmp: 1.1,
      },
    },
    {
      attributes: {
        RouteID: "502",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 6.1,
      },
    },
    {
      attributes: {
        RouteID: "502",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 6.1,
      },
    },
    {
      attributes: {
        RouteID: "503",
        Direction: "i",
        MinSrmp: 1.1,
        MaxSrmp: 54.3,
      },
    },
    {
      attributes: {
        RouteID: "503",
        Direction: "d",
        MinSrmp: 1.1,
        MaxSrmp: 54.3,
      },
    },
    {
      attributes: {
        RouteID: "503SPCOUGAR",
        Direction: "i",
        MinSrmp: 31.4,
        MaxSrmp: 39.7,
      },
    },
    {
      attributes: {
        RouteID: "503SPCOUGAR",
        Direction: "d",
        MinSrmp: 31.4,
        MaxSrmp: 39.7,
      },
    },
    {
      attributes: {
        RouteID: "504",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 51.8,
      },
    },
    {
      attributes: {
        RouteID: "504",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 51.8,
      },
    },
    {
      attributes: {
        RouteID: "504SPOLD504",
        Direction: "i",
        MinSrmp: 21.1,
        MaxSrmp: 21.9,
      },
    },
    {
      attributes: {
        RouteID: "504SPOLD504",
        Direction: "d",
        MinSrmp: 21.1,
        MaxSrmp: 21.9,
      },
    },
    {
      attributes: {
        RouteID: "505",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 19.2,
      },
    },
    {
      attributes: {
        RouteID: "505",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 19.2,
      },
    },
    {
      attributes: {
        RouteID: "506",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 11.5,
      },
    },
    {
      attributes: {
        RouteID: "506",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 11.5,
      },
    },
    {
      attributes: {
        RouteID: "507",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 43.5,
      },
    },
    {
      attributes: {
        RouteID: "507",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 43.5,
      },
    },
    {
      attributes: {
        RouteID: "507COPEARL",
        Direction: "i",
        MinSrmp: 2.3,
        MaxSrmp: 3.4,
      },
    },
    {
      attributes: {
        RouteID: "508",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 32.8,
      },
    },
    {
      attributes: {
        RouteID: "508",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 32.8,
      },
    },
    {
      attributes: {
        RouteID: "509",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 29.9,
      },
    },
    {
      attributes: {
        RouteID: "509",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 29.9,
      },
    },
    {
      attributes: {
        RouteID: "510",
        Direction: "i",
        MinSrmp: 0.1,
        MaxSrmp: 15.6,
      },
    },
    {
      attributes: {
        RouteID: "510",
        Direction: "d",
        MinSrmp: 0.1,
        MaxSrmp: 15.6,
      },
    },
    {
      attributes: {
        RouteID: "510SPYELMLP",
        Direction: "i",
        MinSrmp: 13.6,
        MaxSrmp: 14.7,
      },
    },
    {
      attributes: {
        RouteID: "510SPYELMLP",
        Direction: "d",
        MinSrmp: 13.6,
        MaxSrmp: 14.7,
      },
    },
    {
      attributes: {
        RouteID: "512",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 12.0,
      },
    },
    {
      attributes: {
        RouteID: "512",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 12.0,
      },
    },
    {
      attributes: {
        RouteID: "513",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.3,
      },
    },
    {
      attributes: {
        RouteID: "513",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.3,
      },
    },
    {
      attributes: {
        RouteID: "515",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 6.9,
      },
    },
    {
      attributes: {
        RouteID: "515",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 6.9,
      },
    },
    {
      attributes: {
        RouteID: "516",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 16.2,
      },
    },
    {
      attributes: {
        RouteID: "516",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 16.2,
      },
    },
    {
      attributes: {
        RouteID: "518",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "518",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.7,
      },
    },
    {
      attributes: {
        RouteID: "519",
        Direction: "i",
        MinSrmp: 0.1,
        MaxSrmp: 1.1,
      },
    },
    {
      attributes: {
        RouteID: "519",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 1.1,
      },
    },
    {
      attributes: {
        RouteID: "520",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 12.8,
      },
    },
    {
      attributes: {
        RouteID: "520",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 12.8,
      },
    },
    {
      attributes: {
        RouteID: "522",
        Direction: "i",
        MinSrmp: 0.1,
        MaxSrmp: 24.6,
      },
    },
    {
      attributes: {
        RouteID: "522",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 24.6,
      },
    },
    {
      attributes: {
        RouteID: "523",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 2.4,
      },
    },
    {
      attributes: {
        RouteID: "523",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 2.4,
      },
    },
    {
      attributes: {
        RouteID: "524",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 14.5,
      },
    },
    {
      attributes: {
        RouteID: "524",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 14.5,
      },
    },
    {
      attributes: {
        RouteID: "524SP3RDAVE",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 0.7,
      },
    },
    {
      attributes: {
        RouteID: "524SP3RDAVE",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 0.7,
      },
    },
    {
      attributes: {
        RouteID: "524SPCEDRWY",
        Direction: "i",
        MinSrmp: 4.7,
        MaxSrmp: 5.1,
      },
    },
    {
      attributes: {
        RouteID: "524SPCEDRWY",
        Direction: "d",
        MinSrmp: 4.7,
        MaxSrmp: 5.1,
      },
    },
    {
      attributes: {
        RouteID: "525",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 30.5,
      },
    },
    {
      attributes: {
        RouteID: "525",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 30.5,
      },
    },
    {
      attributes: {
        RouteID: "525SPPAINE",
        Direction: "i",
        MinSrmp: 5.6,
        MaxSrmp: 6.4,
      },
    },
    {
      attributes: {
        RouteID: "525SPPAINE",
        Direction: "d",
        MinSrmp: 5.6,
        MaxSrmp: 6.4,
      },
    },
    {
      attributes: {
        RouteID: "526",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 4.5,
      },
    },
    {
      attributes: {
        RouteID: "526",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 4.5,
      },
    },
    {
      attributes: {
        RouteID: "527",
        Direction: "i",
        MinSrmp: 2.7,
        MaxSrmp: 11.9,
      },
    },
    {
      attributes: {
        RouteID: "527",
        Direction: "d",
        MinSrmp: 2.7,
        MaxSrmp: 11.9,
      },
    },
    {
      attributes: {
        RouteID: "528",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.4,
      },
    },
    {
      attributes: {
        RouteID: "528",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.4,
      },
    },
    {
      attributes: {
        RouteID: "529",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 6.6,
      },
    },
    {
      attributes: {
        RouteID: "529",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 6.6,
      },
    },
    {
      attributes: {
        RouteID: "529SPEVERET",
        Direction: "i",
        MinSrmp: 0.4,
        MaxSrmp: 0.5,
      },
    },
    {
      attributes: {
        RouteID: "529SPEVERET",
        Direction: "d",
        MinSrmp: 0.4,
        MaxSrmp: 0.5,
      },
    },
    {
      attributes: {
        RouteID: "530",
        Direction: "i",
        MinSrmp: 17.0,
        MaxSrmp: 67.7,
      },
    },
    {
      attributes: {
        RouteID: "530",
        Direction: "d",
        MinSrmp: 17.0,
        MaxSrmp: 67.7,
      },
    },
    {
      attributes: {
        RouteID: "531",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "531",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "532",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 10.0,
      },
    },
    {
      attributes: {
        RouteID: "532",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 10.0,
      },
    },
    {
      attributes: {
        RouteID: "534",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 5.0,
      },
    },
    {
      attributes: {
        RouteID: "534",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 5.0,
      },
    },
    {
      attributes: {
        RouteID: "536",
        Direction: "i",
        MinSrmp: 0.2,
        MaxSrmp: 5.3,
      },
    },
    {
      attributes: {
        RouteID: "536",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 5.3,
      },
    },
    {
      attributes: {
        RouteID: "538",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 3.6,
      },
    },
    {
      attributes: {
        RouteID: "538",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 3.6,
      },
    },
    {
      attributes: {
        RouteID: "539",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "539",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 15.0,
      },
    },
    {
      attributes: {
        RouteID: "539COLYNDEN",
        Direction: "i",
        MinSrmp: 15.2,
        MaxSrmp: 15.3,
      },
    },
    {
      attributes: {
        RouteID: "542",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 57.2,
      },
    },
    {
      attributes: {
        RouteID: "542",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 57.2,
      },
    },
    {
      attributes: {
        RouteID: "542COMTBAKR",
        Direction: "i",
        MinSrmp: 54.6,
        MaxSrmp: 54.9,
      },
    },
    {
      attributes: {
        RouteID: "543",
        Direction: "i",
        MinSrmp: 0.2,
        MaxSrmp: 1.0,
      },
    },
    {
      attributes: {
        RouteID: "543",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 1.0,
      },
    },
    {
      attributes: {
        RouteID: "544",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.0,
      },
    },
    {
      attributes: {
        RouteID: "544",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.0,
      },
    },
    {
      attributes: {
        RouteID: "546",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 8.0,
      },
    },
    {
      attributes: {
        RouteID: "546",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 8.0,
      },
    },
    {
      attributes: {
        RouteID: "547",
        Direction: "i",
        MinSrmp: 0.1,
        MaxSrmp: 10.7,
      },
    },
    {
      attributes: {
        RouteID: "547",
        Direction: "d",
        MinSrmp: 0.1,
        MaxSrmp: 10.7,
      },
    },
    {
      attributes: {
        RouteID: "548",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 13.8,
      },
    },
    {
      attributes: {
        RouteID: "548",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 13.8,
      },
    },
    {
      attributes: {
        RouteID: "599",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 1.7,
      },
    },
    {
      attributes: {
        RouteID: "599",
        Direction: "d",
        MinSrmp: 0.1,
        MaxSrmp: 1.7,
      },
    },
    {
      attributes: {
        RouteID: "702",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 9.3,
      },
    },
    {
      attributes: {
        RouteID: "702",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 9.3,
      },
    },
    {
      attributes: {
        RouteID: "704",
        Direction: "i",
        MinSrmp: 5.3,
        MaxSrmp: 5.9,
      },
    },
    {
      attributes: {
        RouteID: "704",
        Direction: "d",
        MinSrmp: 5.3,
        MaxSrmp: 5.9,
      },
    },
    {
      attributes: {
        RouteID: "705",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 1.5,
      },
    },
    {
      attributes: {
        RouteID: "705",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 1.5,
      },
    },
    {
      attributes: {
        RouteID: "706",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 13.6,
      },
    },
    {
      attributes: {
        RouteID: "706",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 13.6,
      },
    },
    {
      attributes: {
        RouteID: "730",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 6.0,
      },
    },
    {
      attributes: {
        RouteID: "730",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 6.0,
      },
    },
    {
      attributes: {
        RouteID: "730SPWALULA",
        Direction: "i",
        MinSrmp: 5.9,
        MaxSrmp: 6.1,
      },
    },
    {
      attributes: {
        RouteID: "730SPWALULA",
        Direction: "d",
        MinSrmp: 5.9,
        MaxSrmp: 6.1,
      },
    },
    {
      attributes: {
        RouteID: "821",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 25.2,
      },
    },
    {
      attributes: {
        RouteID: "821",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 25.2,
      },
    },
    {
      attributes: {
        RouteID: "823",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 4.7,
      },
    },
    {
      attributes: {
        RouteID: "823",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 4.7,
      },
    },
    {
      attributes: {
        RouteID: "900",
        Direction: "i",
        MinSrmp: 6.0,
        MaxSrmp: 21.6,
      },
    },
    {
      attributes: {
        RouteID: "900",
        Direction: "d",
        MinSrmp: 6.0,
        MaxSrmp: 21.6,
      },
    },
    {
      attributes: {
        RouteID: "902",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 12.3,
      },
    },
    {
      attributes: {
        RouteID: "902",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 12.3,
      },
    },
    {
      attributes: {
        RouteID: "903",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 10.0,
      },
    },
    {
      attributes: {
        RouteID: "903",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 10.0,
      },
    },
    {
      attributes: {
        RouteID: "903SPCLEELM",
        Direction: "i",
        MinSrmp: 0.2,
        MaxSrmp: 0.5,
      },
    },
    {
      attributes: {
        RouteID: "903SPCLEELM",
        Direction: "d",
        MinSrmp: 0.2,
        MaxSrmp: 0.5,
      },
    },
    {
      attributes: {
        RouteID: "904",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 16.9,
      },
    },
    {
      attributes: {
        RouteID: "904",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 16.9,
      },
    },
    {
      attributes: {
        RouteID: "906",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 2.6,
      },
    },
    {
      attributes: {
        RouteID: "906",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 2.6,
      },
    },
    {
      attributes: {
        RouteID: "906SPHYAK",
        Direction: "i",
        MinSrmp: 2.6,
        MaxSrmp: 2.9,
      },
    },
    {
      attributes: {
        RouteID: "906SPHYAK",
        Direction: "d",
        MinSrmp: 2.6,
        MaxSrmp: 2.9,
      },
    },
    {
      attributes: {
        RouteID: "970",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 10.3,
      },
    },
    {
      attributes: {
        RouteID: "970",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 10.3,
      },
    },
    {
      attributes: {
        RouteID: "971",
        Direction: "i",
        MinSrmp: 0.0,
        MaxSrmp: 15.0,
      },
    },
    {
      attributes: {
        RouteID: "971",
        Direction: "d",
        MinSrmp: 0.0,
        MaxSrmp: 15.0,
      },
    },
  ],
} as const;

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
    const url = new URL(
      `?${search.toString()}`,
      "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/MilepostValues/FeatureServer/3/query/",
    );
    const response = await fetch(url);
    console.debug(response);
    results = ((await response.json()) as FeatureSet).features.map(
      (feature) => feature.attributes,
    );
  }
  return results;
}
