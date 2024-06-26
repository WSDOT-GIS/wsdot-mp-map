let results: FeatureAttributes[] | undefined;

const srmpFieldName = "SRMP";
const routeIdFieldName = "RouteID";
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
        MinSrmp: 0.0,
        MaxSrmp: 334.5,
      },
    },
    {
      attributes: {
        RouteID: "002COBROWNE",
        MinSrmp: 287.5,
        MaxSrmp: 288.0,
      },
    },
    {
      attributes: {
        RouteID: "002CODIVISN",
        MinSrmp: 289.2,
        MaxSrmp: 290.7,
      },
    },
    {
      attributes: {
        RouteID: "002CONEWPRT",
        MinSrmp: 334.4,
        MaxSrmp: 334.8,
      },
    },
    {
      attributes: {
        RouteID: "003",
        MinSrmp: 0.0,
        MaxSrmp: 60.0,
      },
    },
    {
      attributes: {
        RouteID: "004",
        MinSrmp: 0.0,
        MaxSrmp: 62.2,
      },
    },
    {
      attributes: {
        RouteID: "004COKELSO",
        MinSrmp: 61.8,
        MaxSrmp: 61.9,
      },
    },
    {
      attributes: {
        RouteID: "005",
        MinSrmp: 0.0,
        MaxSrmp: 276.5,
      },
    },
    {
      attributes: {
        RouteID: "005RL005EXP",
        MinSrmp: 165.3,
        MaxSrmp: 172.5,
      },
    },
    {
      attributes: {
        RouteID: "006",
        MinSrmp: 0.0,
        MaxSrmp: 51.3,
      },
    },
    {
      attributes: {
        RouteID: "007",
        MinSrmp: 0.0,
        MaxSrmp: 58.6,
      },
    },
    {
      attributes: {
        RouteID: "008",
        MinSrmp: 0.0,
        MaxSrmp: 20.6,
      },
    },
    {
      attributes: {
        RouteID: "009",
        MinSrmp: 0.0,
        MaxSrmp: 98.1,
      },
    },
    {
      attributes: {
        RouteID: "009SPSUMAS",
        MinSrmp: 98.0,
        MaxSrmp: 98.2,
      },
    },
    {
      attributes: {
        RouteID: "010",
        MinSrmp: 88.3,
        MaxSrmp: 104.4,
      },
    },
    {
      attributes: {
        RouteID: "011",
        MinSrmp: 0.0,
        MaxSrmp: 21.2,
      },
    },
    {
      attributes: {
        RouteID: "012",
        MinSrmp: 0.0,
        MaxSrmp: 434.1,
      },
    },
    {
      attributes: {
        RouteID: "012COABERDN",
        MinSrmp: 0.4,
        MaxSrmp: 0.6,
      },
    },
    {
      attributes: {
        RouteID: "014",
        MinSrmp: 0.0,
        MaxSrmp: 180.7,
      },
    },
    {
      attributes: {
        RouteID: "014SPMARYHL",
        MinSrmp: 100.7,
        MaxSrmp: 101.0,
      },
    },
    {
      attributes: {
        RouteID: "016",
        MinSrmp: 0.0,
        MaxSrmp: 29.1,
      },
    },
    {
      attributes: {
        RouteID: "016AR",
        MinSrmp: 9.2,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "016SPGORST",
        MinSrmp: 28.8,
        MaxSrmp: 29.1,
      },
    },
    {
      attributes: {
        RouteID: "017",
        MinSrmp: 7.5,
        MaxSrmp: 144.2,
      },
    },
    {
      attributes: {
        RouteID: "018",
        MinSrmp: 0.0,
        MaxSrmp: 27.9,
      },
    },
    {
      attributes: {
        RouteID: "019",
        MinSrmp: 0.0,
        MaxSrmp: 14.0,
      },
    },
    {
      attributes: {
        RouteID: "020",
        MinSrmp: 0.0,
        MaxSrmp: 436.9,
      },
    },
    {
      attributes: {
        RouteID: "020SPANACRT",
        MinSrmp: 47.9,
        MaxSrmp: 55.6,
      },
    },
    {
      attributes: {
        RouteID: "021",
        MinSrmp: 0.0,
        MaxSrmp: 191.3,
      },
    },
    {
      attributes: {
        RouteID: "022",
        MinSrmp: 0.7,
        MaxSrmp: 36.5,
      },
    },
    {
      attributes: {
        RouteID: "023",
        MinSrmp: 0.0,
        MaxSrmp: 66.0,
      },
    },
    {
      attributes: {
        RouteID: "024",
        MinSrmp: 0.0,
        MaxSrmp: 79.6,
      },
    },
    {
      attributes: {
        RouteID: "025",
        MinSrmp: 0.0,
        MaxSrmp: 121.2,
      },
    },
    {
      attributes: {
        RouteID: "026",
        MinSrmp: 0.0,
        MaxSrmp: 133.5,
      },
    },
    {
      attributes: {
        RouteID: "026SPCOLFAX",
        MinSrmp: 133.5,
        MaxSrmp: 133.5,
      },
    },
    {
      attributes: {
        RouteID: "027",
        MinSrmp: 0.0,
        MaxSrmp: 87.7,
      },
    },
    {
      attributes: {
        RouteID: "028",
        MinSrmp: 0.0,
        MaxSrmp: 131.1,
      },
    },
    {
      attributes: {
        RouteID: "028COWENTCH",
        MinSrmp: 4.3,
        MaxSrmp: 4.5,
      },
    },
    {
      attributes: {
        RouteID: "028SPWENTCH",
        MinSrmp: 4.3,
        MaxSrmp: 5.0,
      },
    },
    {
      attributes: {
        RouteID: "031",
        MinSrmp: 0.0,
        MaxSrmp: 26.7,
      },
    },
    {
      attributes: {
        RouteID: "041",
        MinSrmp: 0.0,
        MaxSrmp: 0.4,
      },
    },
    {
      attributes: {
        RouteID: "082",
        MinSrmp: 0.0,
        MaxSrmp: 132.6,
      },
    },
    {
      attributes: {
        RouteID: "090",
        MinSrmp: 2.0,
        MaxSrmp: 299.8,
      },
    },
    {
      attributes: {
        RouteID: "092",
        MinSrmp: 0.0,
        MaxSrmp: 9.1,
      },
    },
    {
      attributes: {
        RouteID: "092SPGRANIT",
        MinSrmp: 7.3,
        MaxSrmp: 7.3,
      },
    },
    {
      attributes: {
        RouteID: "096",
        MinSrmp: 0.0,
        MaxSrmp: 6.7,
      },
    },
    {
      attributes: {
        RouteID: "097",
        MinSrmp: 0.0,
        MaxSrmp: 336.5,
      },
    },
    {
      attributes: {
        RouteID: "097AR",
        MinSrmp: 199.9,
        MaxSrmp: 239.6,
      },
    },
    {
      attributes: {
        RouteID: "097COMARYHL",
        MinSrmp: 2.6,
        MaxSrmp: 2.6,
      },
    },
    {
      attributes: {
        RouteID: "097SPORONDO",
        MinSrmp: 213.4,
        MaxSrmp: 213.6,
      },
    },
    {
      attributes: {
        RouteID: "099",
        MinSrmp: 0.0,
        MaxSrmp: 55.4,
      },
    },
    {
      attributes: {
        RouteID: "099COTUNNEL",
        MinSrmp: 32.7,
        MaxSrmp: 35.1,
      },
    },
    {
      attributes: {
        RouteID: "100",
        MinSrmp: 0.0,
        MaxSrmp: 4.6,
      },
    },
    {
      attributes: {
        RouteID: "100SPCANBY",
        MinSrmp: 3.0,
        MaxSrmp: 3.0,
      },
    },
    {
      attributes: {
        RouteID: "101",
        MinSrmp: 0.0,
        MaxSrmp: 367.4,
      },
    },
    {
      attributes: {
        RouteID: "101AR",
        MinSrmp: 9.5,
        MaxSrmp: 10.0,
      },
    },
    {
      attributes: {
        RouteID: "101COABERDN",
        MinSrmp: 87.5,
        MaxSrmp: 91.6,
      },
    },
    {
      attributes: {
        RouteID: "101COHERON",
        MinSrmp: 83.8,
        MaxSrmp: 83.8,
      },
    },
    {
      attributes: {
        RouteID: "101COPRTANG",
        MinSrmp: 249.7,
        MaxSrmp: 251.3,
      },
    },
    {
      attributes: {
        RouteID: "102",
        MinSrmp: 0.0,
        MaxSrmp: 2.8,
      },
    },
    {
      attributes: {
        RouteID: "103",
        MinSrmp: 0.0,
        MaxSrmp: 19.9,
      },
    },
    {
      attributes: {
        RouteID: "104",
        MinSrmp: 0.2,
        MaxSrmp: 32.2,
      },
    },
    {
      attributes: {
        RouteID: "104COKNGSTN",
        MinSrmp: 24.6,
        MaxSrmp: 24.8,
      },
    },
    {
      attributes: {
        RouteID: "104SPAURORA",
        MinSrmp: 28.7,
        MaxSrmp: 29.0,
      },
    },
    {
      attributes: {
        RouteID: "105",
        MinSrmp: 0.0,
        MaxSrmp: 48.7,
      },
    },
    {
      attributes: {
        RouteID: "105SPBOONE",
        MinSrmp: 48.7,
        MaxSrmp: 48.7,
      },
    },
    {
      attributes: {
        RouteID: "105SPWESTPT",
        MinSrmp: 30.3,
        MaxSrmp: 34.3,
      },
    },
    {
      attributes: {
        RouteID: "106",
        MinSrmp: 0.0,
        MaxSrmp: 19.9,
      },
    },
    {
      attributes: {
        RouteID: "107",
        MinSrmp: 0.0,
        MaxSrmp: 7.9,
      },
    },
    {
      attributes: {
        RouteID: "108",
        MinSrmp: 0.0,
        MaxSrmp: 11.9,
      },
    },
    {
      attributes: {
        RouteID: "109",
        MinSrmp: 0.0,
        MaxSrmp: 40.4,
      },
    },
    {
      attributes: {
        RouteID: "109COHQUIAM",
        MinSrmp: 0.2,
        MaxSrmp: 0.2,
      },
    },
    {
      attributes: {
        RouteID: "109SPLONNGR",
        MinSrmp: 1.8,
        MaxSrmp: 3.6,
      },
    },
    {
      attributes: {
        RouteID: "110",
        MinSrmp: 0.0,
        MaxSrmp: 11.1,
      },
    },
    {
      attributes: {
        RouteID: "110SPMORA",
        MinSrmp: 7.8,
        MaxSrmp: 10.4,
      },
    },
    {
      attributes: {
        RouteID: "112",
        MinSrmp: 0.0,
        MaxSrmp: 61.0,
      },
    },
    {
      attributes: {
        RouteID: "113",
        MinSrmp: 0.0,
        MaxSrmp: 9.9,
      },
    },
    {
      attributes: {
        RouteID: "115",
        MinSrmp: 0.0,
        MaxSrmp: 2.2,
      },
    },
    {
      attributes: {
        RouteID: "116",
        MinSrmp: 0.0,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "117",
        MinSrmp: 0.0,
        MaxSrmp: 1.4,
      },
    },
    {
      attributes: {
        RouteID: "119",
        MinSrmp: 0.0,
        MaxSrmp: 10.9,
      },
    },
    {
      attributes: {
        RouteID: "121",
        MinSrmp: 0.0,
        MaxSrmp: 7.6,
      },
    },
    {
      attributes: {
        RouteID: "122",
        MinSrmp: 0.0,
        MaxSrmp: 7.8,
      },
    },
    {
      attributes: {
        RouteID: "123",
        MinSrmp: 0.0,
        MaxSrmp: 16.3,
      },
    },
    {
      attributes: {
        RouteID: "124",
        MinSrmp: 0.0,
        MaxSrmp: 44.9,
      },
    },
    {
      attributes: {
        RouteID: "125",
        MinSrmp: 0.0,
        MaxSrmp: 23.6,
      },
    },
    {
      attributes: {
        RouteID: "125SP125SP",
        MinSrmp: 6.1,
        MaxSrmp: 6.8,
      },
    },
    {
      attributes: {
        RouteID: "127",
        MinSrmp: 0.1,
        MaxSrmp: 27.0,
      },
    },
    {
      attributes: {
        RouteID: "128",
        MinSrmp: 0.0,
        MaxSrmp: 2.2,
      },
    },
    {
      attributes: {
        RouteID: "129",
        MinSrmp: 0.0,
        MaxSrmp: 42.5,
      },
    },
    {
      attributes: {
        RouteID: "129SP6THST",
        MinSrmp: 42.2,
        MaxSrmp: 42.4,
      },
    },
    {
      attributes: {
        RouteID: "131",
        MinSrmp: 0.0,
        MaxSrmp: 2.0,
      },
    },
    {
      attributes: {
        RouteID: "141",
        MinSrmp: 0.0,
        MaxSrmp: 29.2,
      },
    },
    {
      attributes: {
        RouteID: "141SPUNDRWD",
        MinSrmp: 4.7,
        MaxSrmp: 6.8,
      },
    },
    {
      attributes: {
        RouteID: "142",
        MinSrmp: 0.0,
        MaxSrmp: 35.2,
      },
    },
    {
      attributes: {
        RouteID: "150",
        MinSrmp: 0.3,
        MaxSrmp: 12.0,
      },
    },
    {
      attributes: {
        RouteID: "153",
        MinSrmp: 0.0,
        MaxSrmp: 30.7,
      },
    },
    {
      attributes: {
        RouteID: "155",
        MinSrmp: 0.0,
        MaxSrmp: 80.4,
      },
    },
    {
      attributes: {
        RouteID: "155SPOMAK",
        MinSrmp: 80.2,
        MaxSrmp: 80.5,
      },
    },
    {
      attributes: {
        RouteID: "160",
        MinSrmp: 0.0,
        MaxSrmp: 7.4,
      },
    },
    {
      attributes: {
        RouteID: "161",
        MinSrmp: 0.0,
        MaxSrmp: 36.2,
      },
    },
    {
      attributes: {
        RouteID: "162",
        MinSrmp: 0.0,
        MaxSrmp: 19.7,
      },
    },
    {
      attributes: {
        RouteID: "163",
        MinSrmp: 0.0,
        MaxSrmp: 3.3,
      },
    },
    {
      attributes: {
        RouteID: "164",
        MinSrmp: 0.4,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "165",
        MinSrmp: 0.0,
        MaxSrmp: 21.1,
      },
    },
    {
      attributes: {
        RouteID: "166",
        MinSrmp: 0.1,
        MaxSrmp: 5.1,
      },
    },
    {
      attributes: {
        RouteID: "167",
        MinSrmp: 0.0,
        MaxSrmp: 27.1,
      },
    },
    {
      attributes: {
        RouteID: "169",
        MinSrmp: 0.0,
        MaxSrmp: 25.2,
      },
    },
    {
      attributes: {
        RouteID: "170",
        MinSrmp: 0.0,
        MaxSrmp: 3.6,
      },
    },
    {
      attributes: {
        RouteID: "171",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "172",
        MinSrmp: 0.0,
        MaxSrmp: 35.0,
      },
    },
    {
      attributes: {
        RouteID: "173",
        MinSrmp: 0.0,
        MaxSrmp: 11.9,
      },
    },
    {
      attributes: {
        RouteID: "174",
        MinSrmp: 0.0,
        MaxSrmp: 40.6,
      },
    },
    {
      attributes: {
        RouteID: "174SPCRWNPT",
        MinSrmp: 19.6,
        MaxSrmp: 20.9,
      },
    },
    {
      attributes: {
        RouteID: "174SPLEAHY",
        MinSrmp: 0.2,
        MaxSrmp: 0.2,
      },
    },
    {
      attributes: {
        RouteID: "181",
        MinSrmp: 5.4,
        MaxSrmp: 11.3,
      },
    },
    {
      attributes: {
        RouteID: "182",
        MinSrmp: 0.0,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "193",
        MinSrmp: 0.6,
        MaxSrmp: 3.0,
      },
    },
    {
      attributes: {
        RouteID: "194",
        MinSrmp: 0.0,
        MaxSrmp: 21.0,
      },
    },
    {
      attributes: {
        RouteID: "195",
        MinSrmp: 0.0,
        MaxSrmp: 95.9,
      },
    },
    {
      attributes: {
        RouteID: "195SPGNESSE",
        MinSrmp: 0.1,
        MaxSrmp: 0.6,
      },
    },
    {
      attributes: {
        RouteID: "197",
        MinSrmp: 0.5,
        MaxSrmp: 3.1,
      },
    },
    {
      attributes: {
        RouteID: "202",
        MinSrmp: 0.0,
        MaxSrmp: 30.6,
      },
    },
    {
      attributes: {
        RouteID: "203",
        MinSrmp: 0.0,
        MaxSrmp: 24.1,
      },
    },
    {
      attributes: {
        RouteID: "204",
        MinSrmp: 0.0,
        MaxSrmp: 2.3,
      },
    },
    {
      attributes: {
        RouteID: "205",
        MinSrmp: 26.6,
        MaxSrmp: 37.1,
      },
    },
    {
      attributes: {
        RouteID: "206",
        MinSrmp: 0.0,
        MaxSrmp: 15.3,
      },
    },
    {
      attributes: {
        RouteID: "207",
        MinSrmp: 0.0,
        MaxSrmp: 4.3,
      },
    },
    {
      attributes: {
        RouteID: "211",
        MinSrmp: 0.0,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "213",
        MinSrmp: 0.0,
        MaxSrmp: 0.3,
      },
    },
    {
      attributes: {
        RouteID: "215",
        MinSrmp: 0.0,
        MaxSrmp: 6.2,
      },
    },
    {
      attributes: {
        RouteID: "221",
        MinSrmp: 0.0,
        MaxSrmp: 26.0,
      },
    },
    {
      attributes: {
        RouteID: "223",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "224",
        MinSrmp: 0.0,
        MaxSrmp: 9.9,
      },
    },
    {
      attributes: {
        RouteID: "225",
        MinSrmp: 0.0,
        MaxSrmp: 11.3,
      },
    },
    {
      attributes: {
        RouteID: "231",
        MinSrmp: 0.0,
        MaxSrmp: 75.1,
      },
    },
    {
      attributes: {
        RouteID: "240",
        MinSrmp: 0.0,
        MaxSrmp: 43.1,
      },
    },
    {
      attributes: {
        RouteID: "241",
        MinSrmp: 0.0,
        MaxSrmp: 25.2,
      },
    },
    {
      attributes: {
        RouteID: "243",
        MinSrmp: 0.0,
        MaxSrmp: 28.2,
      },
    },
    {
      attributes: {
        RouteID: "260",
        MinSrmp: 0.0,
        MaxSrmp: 39.4,
      },
    },
    {
      attributes: {
        RouteID: "261",
        MinSrmp: 0.0,
        MaxSrmp: 62.8,
      },
    },
    {
      attributes: {
        RouteID: "262",
        MinSrmp: 0.0,
        MaxSrmp: 24.2,
      },
    },
    {
      attributes: {
        RouteID: "263",
        MinSrmp: 0.0,
        MaxSrmp: 9.2,
      },
    },
    {
      attributes: {
        RouteID: "270",
        MinSrmp: 0.0,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "270COPULLMN",
        MinSrmp: 2.7,
        MaxSrmp: 2.9,
      },
    },
    {
      attributes: {
        RouteID: "271",
        MinSrmp: 0.0,
        MaxSrmp: 8.4,
      },
    },
    {
      attributes: {
        RouteID: "272",
        MinSrmp: 0.0,
        MaxSrmp: 19.2,
      },
    },
    {
      attributes: {
        RouteID: "274",
        MinSrmp: 0.0,
        MaxSrmp: 1.9,
      },
    },
    {
      attributes: {
        RouteID: "278",
        MinSrmp: 0.0,
        MaxSrmp: 5.5,
      },
    },
    {
      attributes: {
        RouteID: "281",
        MinSrmp: 0.0,
        MaxSrmp: 10.5,
      },
    },
    {
      attributes: {
        RouteID: "281SPBURKE",
        MinSrmp: 2.7,
        MaxSrmp: 4.3,
      },
    },
    {
      attributes: {
        RouteID: "282",
        MinSrmp: 0.0,
        MaxSrmp: 4.9,
      },
    },
    {
      attributes: {
        RouteID: "283",
        MinSrmp: 0.0,
        MaxSrmp: 14.8,
      },
    },
    {
      attributes: {
        RouteID: "285",
        MinSrmp: 0.0,
        MaxSrmp: 5.0,
      },
    },
    {
      attributes: {
        RouteID: "285COWENTCH",
        MinSrmp: 2.9,
        MaxSrmp: 4.6,
      },
    },
    {
      attributes: {
        RouteID: "290",
        MinSrmp: 0.1,
        MaxSrmp: 18.3,
      },
    },
    {
      attributes: {
        RouteID: "291",
        MinSrmp: 0.0,
        MaxSrmp: 33.0,
      },
    },
    {
      attributes: {
        RouteID: "292",
        MinSrmp: 0.0,
        MaxSrmp: 5.9,
      },
    },
    {
      attributes: {
        RouteID: "300",
        MinSrmp: 0.0,
        MaxSrmp: 3.3,
      },
    },
    {
      attributes: {
        RouteID: "302",
        MinSrmp: 0.0,
        MaxSrmp: 16.8,
      },
    },
    {
      attributes: {
        RouteID: "302SPPURDY",
        MinSrmp: 15.9,
        MaxSrmp: 17.1,
      },
    },
    {
      attributes: {
        RouteID: "303",
        MinSrmp: 0.0,
        MaxSrmp: 9.1,
      },
    },
    {
      attributes: {
        RouteID: "304",
        MinSrmp: 0.0,
        MaxSrmp: 3.5,
      },
    },
    {
      attributes: {
        RouteID: "304COTUNNEL",
        MinSrmp: 3.6,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "305",
        MinSrmp: 0.1,
        MaxSrmp: 13.5,
      },
    },
    {
      attributes: {
        RouteID: "307",
        MinSrmp: 0.0,
        MaxSrmp: 5.2,
      },
    },
    {
      attributes: {
        RouteID: "308",
        MinSrmp: 0.0,
        MaxSrmp: 3.4,
      },
    },
    {
      attributes: {
        RouteID: "310",
        MinSrmp: 0.0,
        MaxSrmp: 1.8,
      },
    },
    {
      attributes: {
        RouteID: "395",
        MinSrmp: 13.1,
        MaxSrmp: 270.2,
      },
    },
    {
      attributes: {
        RouteID: "395SPNSC",
        MinSrmp: 160.5,
        MaxSrmp: 167.4,
      },
    },
    {
      attributes: {
        RouteID: "397",
        MinSrmp: 0.0,
        MaxSrmp: 22.3,
      },
    },
    {
      attributes: {
        RouteID: "401",
        MinSrmp: 0.0,
        MaxSrmp: 12.1,
      },
    },
    {
      attributes: {
        RouteID: "405",
        MinSrmp: 0.0,
        MaxSrmp: 30.3,
      },
    },
    {
      attributes: {
        RouteID: "409",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "410",
        MinSrmp: 8.9,
        MaxSrmp: 116.3,
      },
    },
    {
      attributes: {
        RouteID: "411",
        MinSrmp: 0.0,
        MaxSrmp: 13.4,
      },
    },
    {
      attributes: {
        RouteID: "432",
        MinSrmp: 0.0,
        MaxSrmp: 10.3,
      },
    },
    {
      attributes: {
        RouteID: "433",
        MinSrmp: 0.0,
        MaxSrmp: 0.9,
      },
    },
    {
      attributes: {
        RouteID: "500",
        MinSrmp: 0.0,
        MaxSrmp: 20.8,
      },
    },
    {
      attributes: {
        RouteID: "501",
        MinSrmp: 0.0,
        MaxSrmp: 19.8,
      },
    },
    {
      attributes: {
        RouteID: "501COVANCVR",
        MinSrmp: 0.7,
        MaxSrmp: 1.1,
      },
    },
    {
      attributes: {
        RouteID: "502",
        MinSrmp: 0.0,
        MaxSrmp: 6.1,
      },
    },
    {
      attributes: {
        RouteID: "503",
        MinSrmp: 1.1,
        MaxSrmp: 54.3,
      },
    },
    {
      attributes: {
        RouteID: "503SPCOUGAR",
        MinSrmp: 31.4,
        MaxSrmp: 39.7,
      },
    },
    {
      attributes: {
        RouteID: "504",
        MinSrmp: 0.0,
        MaxSrmp: 51.8,
      },
    },
    {
      attributes: {
        RouteID: "504SPOLD504",
        MinSrmp: 21.1,
        MaxSrmp: 21.9,
      },
    },
    {
      attributes: {
        RouteID: "505",
        MinSrmp: 0.0,
        MaxSrmp: 19.2,
      },
    },
    {
      attributes: {
        RouteID: "506",
        MinSrmp: 0.0,
        MaxSrmp: 11.5,
      },
    },
    {
      attributes: {
        RouteID: "507",
        MinSrmp: 0.0,
        MaxSrmp: 43.5,
      },
    },
    {
      attributes: {
        RouteID: "507COPEARL",
        MinSrmp: 2.3,
        MaxSrmp: 3.4,
      },
    },
    {
      attributes: {
        RouteID: "508",
        MinSrmp: 0.0,
        MaxSrmp: 32.8,
      },
    },
    {
      attributes: {
        RouteID: "509",
        MinSrmp: 0.0,
        MaxSrmp: 29.9,
      },
    },
    {
      attributes: {
        RouteID: "510",
        MinSrmp: 0.1,
        MaxSrmp: 15.6,
      },
    },
    {
      attributes: {
        RouteID: "510SPYELMLP",
        MinSrmp: 13.6,
        MaxSrmp: 14.7,
      },
    },
    {
      attributes: {
        RouteID: "512",
        MinSrmp: 0.0,
        MaxSrmp: 12.0,
      },
    },
    {
      attributes: {
        RouteID: "513",
        MinSrmp: 0.0,
        MaxSrmp: 3.3,
      },
    },
    {
      attributes: {
        RouteID: "515",
        MinSrmp: 0.0,
        MaxSrmp: 6.9,
      },
    },
    {
      attributes: {
        RouteID: "516",
        MinSrmp: 0.0,
        MaxSrmp: 16.2,
      },
    },
    {
      attributes: {
        RouteID: "518",
        MinSrmp: 0.0,
        MaxSrmp: 3.8,
      },
    },
    {
      attributes: {
        RouteID: "519",
        MinSrmp: 0.0,
        MaxSrmp: 1.1,
      },
    },
    {
      attributes: {
        RouteID: "520",
        MinSrmp: 0.0,
        MaxSrmp: 12.8,
      },
    },
    {
      attributes: {
        RouteID: "522",
        MinSrmp: 0.0,
        MaxSrmp: 24.6,
      },
    },
    {
      attributes: {
        RouteID: "523",
        MinSrmp: 0.0,
        MaxSrmp: 2.4,
      },
    },
    {
      attributes: {
        RouteID: "524",
        MinSrmp: 0.0,
        MaxSrmp: 14.5,
      },
    },
    {
      attributes: {
        RouteID: "524SP3RDAVE",
        MinSrmp: 0.0,
        MaxSrmp: 0.7,
      },
    },
    {
      attributes: {
        RouteID: "524SPCEDRWY",
        MinSrmp: 4.7,
        MaxSrmp: 5.1,
      },
    },
    {
      attributes: {
        RouteID: "525",
        MinSrmp: 0.0,
        MaxSrmp: 30.5,
      },
    },
    {
      attributes: {
        RouteID: "525SPPAINE",
        MinSrmp: 5.6,
        MaxSrmp: 6.4,
      },
    },
    {
      attributes: {
        RouteID: "526",
        MinSrmp: 0.0,
        MaxSrmp: 4.5,
      },
    },
    {
      attributes: {
        RouteID: "527",
        MinSrmp: 2.7,
        MaxSrmp: 11.9,
      },
    },
    {
      attributes: {
        RouteID: "528",
        MinSrmp: 0.0,
        MaxSrmp: 3.4,
      },
    },
    {
      attributes: {
        RouteID: "529",
        MinSrmp: 0.0,
        MaxSrmp: 6.6,
      },
    },
    {
      attributes: {
        RouteID: "529SPEVERET",
        MinSrmp: 0.4,
        MaxSrmp: 0.5,
      },
    },
    {
      attributes: {
        RouteID: "530",
        MinSrmp: 17.0,
        MaxSrmp: 67.7,
      },
    },
    {
      attributes: {
        RouteID: "531",
        MinSrmp: 0.0,
        MaxSrmp: 9.8,
      },
    },
    {
      attributes: {
        RouteID: "532",
        MinSrmp: 0.0,
        MaxSrmp: 10.0,
      },
    },
    {
      attributes: {
        RouteID: "534",
        MinSrmp: 0.0,
        MaxSrmp: 5.0,
      },
    },
    {
      attributes: {
        RouteID: "536",
        MinSrmp: 0.0,
        MaxSrmp: 5.3,
      },
    },
    {
      attributes: {
        RouteID: "538",
        MinSrmp: 0.0,
        MaxSrmp: 3.6,
      },
    },
    {
      attributes: {
        RouteID: "539",
        MinSrmp: 0.0,
        MaxSrmp: 15.1,
      },
    },
    {
      attributes: {
        RouteID: "539COLYNDEN",
        MinSrmp: 15.2,
        MaxSrmp: 15.3,
      },
    },
    {
      attributes: {
        RouteID: "542",
        MinSrmp: 0.0,
        MaxSrmp: 57.2,
      },
    },
    {
      attributes: {
        RouteID: "542COMTBAKR",
        MinSrmp: 54.6,
        MaxSrmp: 54.9,
      },
    },
    {
      attributes: {
        RouteID: "543",
        MinSrmp: 0.0,
        MaxSrmp: 1.0,
      },
    },
    {
      attributes: {
        RouteID: "544",
        MinSrmp: 0.0,
        MaxSrmp: 9.0,
      },
    },
    {
      attributes: {
        RouteID: "546",
        MinSrmp: 0.0,
        MaxSrmp: 8.0,
      },
    },
    {
      attributes: {
        RouteID: "547",
        MinSrmp: 0.1,
        MaxSrmp: 10.7,
      },
    },
    {
      attributes: {
        RouteID: "548",
        MinSrmp: 0.0,
        MaxSrmp: 13.8,
      },
    },
    {
      attributes: {
        RouteID: "599",
        MinSrmp: 0.0,
        MaxSrmp: 1.7,
      },
    },
    {
      attributes: {
        RouteID: "702",
        MinSrmp: 0.0,
        MaxSrmp: 9.3,
      },
    },
    {
      attributes: {
        RouteID: "704",
        MinSrmp: 5.3,
        MaxSrmp: 5.9,
      },
    },
    {
      attributes: {
        RouteID: "705",
        MinSrmp: 0.0,
        MaxSrmp: 1.5,
      },
    },
    {
      attributes: {
        RouteID: "706",
        MinSrmp: 0.0,
        MaxSrmp: 13.6,
      },
    },
    {
      attributes: {
        RouteID: "730",
        MinSrmp: 0.0,
        MaxSrmp: 6.0,
      },
    },
    {
      attributes: {
        RouteID: "730SPWALULA",
        MinSrmp: 5.9,
        MaxSrmp: 6.1,
      },
    },
    {
      attributes: {
        RouteID: "821",
        MinSrmp: 0.0,
        MaxSrmp: 25.2,
      },
    },
    {
      attributes: {
        RouteID: "823",
        MinSrmp: 0.0,
        MaxSrmp: 4.7,
      },
    },
    {
      attributes: {
        RouteID: "900",
        MinSrmp: 6.0,
        MaxSrmp: 21.6,
      },
    },
    {
      attributes: {
        RouteID: "902",
        MinSrmp: 0.0,
        MaxSrmp: 12.3,
      },
    },
    {
      attributes: {
        RouteID: "903",
        MinSrmp: 0.0,
        MaxSrmp: 10.0,
      },
    },
    {
      attributes: {
        RouteID: "903SPCLEELM",
        MinSrmp: 0.2,
        MaxSrmp: 0.5,
      },
    },
    {
      attributes: {
        RouteID: "904",
        MinSrmp: 0.0,
        MaxSrmp: 16.9,
      },
    },
    {
      attributes: {
        RouteID: "906",
        MinSrmp: 0.0,
        MaxSrmp: 2.6,
      },
    },
    {
      attributes: {
        RouteID: "906SPHYAK",
        MinSrmp: 2.6,
        MaxSrmp: 2.9,
      },
    },
    {
      attributes: {
        RouteID: "970",
        MinSrmp: 0.0,
        MaxSrmp: 10.3,
      },
    },
    {
      attributes: {
        RouteID: "971",
        MinSrmp: 0.0,
        MaxSrmp: 15.0,
      },
    },
  ],
} as const;

/**
 * Retrieves a list of all route IDs and their minimum and maximum SRMP values.
 * @returns - A list of route IDs and their minimum and maximum SRMP values.
 * @example
 * ```typescript
 * const routeList = await getRouteList();
 * console.table(routeList);
 * ```
 *
 * Will result in output like the following,
 * albeit not necessarily with the same data:
 *
 * ```
 * ┌─────┬─────────────┬─────────┬─────────┐
 * │     │ RouteID     │ MinSrmp │ MaxSrmp │
 * ├─────┼─────────────┼─────────┼─────────┤
 * │   0 │ 002         │ 0       │ 334.5   │
 * │   1 │ 002COBROWNE │ 287.5   │ 288     │
 * │   2 │ 002CODIVISN │ 289.2   │ 290.7   │
 * │   3 │ 002CONEWPRT │ 334.4   │ 334.8   │
 * │   4 │ 003         │ 0       │ 60      │
 * │   5 │ 004         │ 0       │ 62.2    │
 * │   6 │ 004COKELSO  │ 61.8    │ 61.9    │
 * │   7 │ 005         │ 0       │ 276.5   │
 * │   8 │ 005RL005EXP │ 165.3   │ 172.5   │
 * │   9 │ 006         │ 0       │ 51.3    │
 * │  10 │ 007         │ 0       │ 58.6    │
 * │  11 │ 008         │ 0       │ 20.6    │
 * │  12 │ 009         │ 0       │ 98.1    │
 * │  13 │ 009SPSUMAS  │ 98      │ 98.2    │
 * │  14 │ 010         │ 88.3    │ 104.4   │
 * │  15 │ 011         │ 0       │ 21.2    │
 * │  16 │ 012         │ 0       │ 434.1   │
 * │  17 │ 012COABERDN │ 0.4     │ 0.6     │
 * │  18 │ 014         │ 0       │ 180.7   │
 * │  19 │ 014SPMARYHL │ 100.7   │ 101     │
 * │  20 │ 016         │ 0       │ 29.1    │
 * │  21 │ 016AR       │ 9.2     │ 9.8     │
 * │  22 │ 016SPGORST  │ 28.8    │ 29.1    │
 * │  23 │ 017         │ 7.5     │ 144.2   │
 * │  24 │ 018         │ 0       │ 27.9    │
 * │  25 │ 019         │ 0       │ 14      │
 * │  26 │ 020         │ 0       │ 436.9   │
 * │  27 │ 020SPANACRT │ 47.9    │ 55.6    │
 * │  28 │ 021         │ 0       │ 191.3   │
 * │  29 │ 022         │ 0.7     │ 36.5    │
 * │  30 │ 023         │ 0       │ 66      │
 * │  31 │ 024         │ 0       │ 79.6    │
 * │  32 │ 025         │ 0       │ 121.2   │
 * │  33 │ 026         │ 0       │ 133.5   │
 * │  34 │ 026SPCOLFAX │ 133.5   │ 133.5   │
 * │  35 │ 027         │ 0       │ 87.7    │
 * │  36 │ 028         │ 0       │ 131.1   │
 * │  37 │ 028COWENTCH │ 4.3     │ 4.5     │
 * │  38 │ 028SPWENTCH │ 4.3     │ 5       │
 * │  39 │ 031         │ 0       │ 26.7    │
 * │  40 │ 041         │ 0       │ 0.4     │
 * │  41 │ 082         │ 0       │ 132.6   │
 * │  42 │ 090         │ 2       │ 299.8   │
 * │  43 │ 092         │ 0       │ 9.1     │
 * │  44 │ 092SPGRANIT │ 7.3     │ 7.3     │
 * │  45 │ 096         │ 0       │ 6.7     │
 * │  46 │ 097         │ 0       │ 336.5   │
 * │  47 │ 097AR       │ 199.9   │ 239.6   │
 * │  48 │ 097COMARYHL │ 2.6     │ 2.6     │
 * │  49 │ 097SPORONDO │ 213.4   │ 213.6   │
 * │  50 │ 099         │ 0       │ 55.4    │
 * │  51 │ 099COTUNNEL │ 32.7    │ 35.1    │
 * │  52 │ 100         │ 0       │ 4.6     │
 * │  53 │ 100SPCANBY  │ 3       │ 3       │
 * │  54 │ 101         │ 0       │ 367.4   │
 * │  55 │ 101AR       │ 9.5     │ 10      │
 * │  56 │ 101COABERDN │ 87.5    │ 91.6    │
 * │  57 │ 101COHERON  │ 83.8    │ 83.8    │
 * │  58 │ 101COPRTANG │ 249.7   │ 251.3   │
 * │  59 │ 102         │ 0       │ 2.8     │
 * │  60 │ 103         │ 0       │ 19.9    │
 * │  61 │ 104         │ 0.2     │ 32.2    │
 * │  62 │ 104COKNGSTN │ 24.6    │ 24.8    │
 * │  63 │ 104SPAURORA │ 28.7    │ 29      │
 * │  64 │ 105         │ 0       │ 48.7    │
 * │  65 │ 105SPBOONE  │ 48.7    │ 48.7    │
 * │  66 │ 105SPWESTPT │ 30.3    │ 34.3    │
 * │  67 │ 106         │ 0       │ 19.9    │
 * │  68 │ 107         │ 0       │ 7.9     │
 * │  69 │ 108         │ 0       │ 11.9    │
 * │  70 │ 109         │ 0       │ 40.4    │
 * │  71 │ 109COHQUIAM │ 0.2     │ 0.2     │
 * │  72 │ 109SPLONNGR │ 1.8     │ 3.6     │
 * │  73 │ 110         │ 0       │ 11.1    │
 * │  74 │ 110SPMORA   │ 7.8     │ 10.4    │
 * │  75 │ 112         │ 0       │ 61      │
 * │  76 │ 113         │ 0       │ 9.9     │
 * │  77 │ 115         │ 0       │ 2.2     │
 * │  78 │ 116         │ 0       │ 9.8     │
 * │  79 │ 117         │ 0       │ 1.4     │
 * │  80 │ 119         │ 0       │ 10.9    │
 * │  81 │ 121         │ 0       │ 7.6     │
 * │  82 │ 122         │ 0       │ 7.8     │
 * │  83 │ 123         │ 0       │ 16.3    │
 * │  84 │ 124         │ 0       │ 44.9    │
 * │  85 │ 125         │ 0       │ 23.6    │
 * │  86 │ 125SP125SP  │ 6.1     │ 6.8     │
 * │  87 │ 127         │ 0.1     │ 27      │
 * │  88 │ 128         │ 0       │ 2.2     │
 * │  89 │ 129         │ 0       │ 42.5    │
 * │  90 │ 129SP6THST  │ 42.2    │ 42.4    │
 * │  91 │ 131         │ 0       │ 2       │
 * │  92 │ 141         │ 0       │ 29.2    │
 * │  93 │ 141SPUNDRWD │ 4.7     │ 6.8     │
 * │  94 │ 142         │ 0       │ 35.2    │
 * │  95 │ 150         │ 0.3     │ 12      │
 * │  96 │ 153         │ 0       │ 30.7    │
 * │  97 │ 155         │ 0       │ 80.4    │
 * │  98 │ 155SPOMAK   │ 80.2    │ 80.5    │
 * │  99 │ 160         │ 0       │ 7.4     │
 * │ 100 │ 161         │ 0       │ 36.2    │
 * │ 101 │ 162         │ 0       │ 19.7    │
 * │ 102 │ 163         │ 0       │ 3.3     │
 * │ 103 │ 164         │ 0.4     │ 15.1    │
 * │ 104 │ 165         │ 0       │ 21.1    │
 * │ 105 │ 166         │ 0.1     │ 5.1     │
 * │ 106 │ 167         │ 0       │ 27.1    │
 * │ 107 │ 169         │ 0       │ 25.2    │
 * │ 108 │ 170         │ 0       │ 3.6     │
 * │ 109 │ 171         │ 0       │ 3.8     │
 * │ 110 │ 172         │ 0       │ 35      │
 * │ 111 │ 173         │ 0       │ 11.9    │
 * │ 112 │ 174         │ 0       │ 40.6    │
 * │ 113 │ 174SPCRWNPT │ 19.6    │ 20.9    │
 * │ 114 │ 174SPLEAHY  │ 0.2     │ 0.2     │
 * │ 115 │ 181         │ 5.4     │ 11.3    │
 * │ 116 │ 182         │ 0       │ 15.1    │
 * │ 117 │ 193         │ 0.6     │ 3       │
 * │ 118 │ 194         │ 0       │ 21      │
 * │ 119 │ 195         │ 0       │ 95.9    │
 * │ 120 │ 195SPGNESSE │ 0.1     │ 0.6     │
 * │ 121 │ 197         │ 0.5     │ 3.1     │
 * │ 122 │ 202         │ 0       │ 30.6    │
 * │ 123 │ 203         │ 0       │ 24.1    │
 * │ 124 │ 204         │ 0       │ 2.3     │
 * │ 125 │ 205         │ 26.6    │ 37.1    │
 * │ 126 │ 206         │ 0       │ 15.3    │
 * │ 127 │ 207         │ 0       │ 4.3     │
 * │ 128 │ 211         │ 0       │ 15.1    │
 * │ 129 │ 213         │ 0       │ 0.3     │
 * │ 130 │ 215         │ 0       │ 6.2     │
 * │ 131 │ 221         │ 0       │ 26      │
 * │ 132 │ 223         │ 0       │ 3.8     │
 * │ 133 │ 224         │ 0       │ 9.9     │
 * │ 134 │ 225         │ 0       │ 11.3    │
 * │ 135 │ 231         │ 0       │ 75.1    │
 * │ 136 │ 240         │ 0       │ 43.1    │
 * │ 137 │ 241         │ 0       │ 25.2    │
 * │ 138 │ 243         │ 0       │ 28.2    │
 * │ 139 │ 260         │ 0       │ 39.4    │
 * │ 140 │ 261         │ 0       │ 62.8    │
 * │ 141 │ 262         │ 0       │ 24.2    │
 * │ 142 │ 263         │ 0       │ 9.2     │
 * │ 143 │ 270         │ 0       │ 9.8     │
 * │ 144 │ 270COPULLMN │ 2.7     │ 2.9     │
 * │ 145 │ 271         │ 0       │ 8.4     │
 * │ 146 │ 272         │ 0       │ 19.2    │
 * │ 147 │ 274         │ 0       │ 1.9     │
 * │ 148 │ 278         │ 0       │ 5.5     │
 * │ 149 │ 281         │ 0       │ 10.5    │
 * │ 150 │ 281SPBURKE  │ 2.7     │ 4.3     │
 * │ 151 │ 282         │ 0       │ 4.9     │
 * │ 152 │ 283         │ 0       │ 14.8    │
 * │ 153 │ 285         │ 0       │ 5       │
 * │ 154 │ 285COWENTCH │ 2.9     │ 4.6     │
 * │ 155 │ 290         │ 0.1     │ 18.3    │
 * │ 156 │ 291         │ 0       │ 33      │
 * │ 157 │ 292         │ 0       │ 5.9     │
 * │ 158 │ 300         │ 0       │ 3.3     │
 * │ 159 │ 302         │ 0       │ 16.8    │
 * │ 160 │ 302SPPURDY  │ 15.9    │ 17.1    │
 * │ 161 │ 303         │ 0       │ 9.1     │
 * │ 162 │ 304         │ 0       │ 3.5     │
 * │ 163 │ 304COTUNNEL │ 3.6     │ 3.8     │
 * │ 164 │ 305         │ 0.1     │ 13.5    │
 * │ 165 │ 307         │ 0       │ 5.2     │
 * │ 166 │ 308         │ 0       │ 3.4     │
 * │ 167 │ 310         │ 0       │ 1.8     │
 * │ 168 │ 395         │ 13.1    │ 270.2   │
 * │ 169 │ 395SPNSC    │ 160.5   │ 167.4   │
 * │ 170 │ 397         │ 0       │ 22.3    │
 * │ 171 │ 401         │ 0       │ 12.1    │
 * │ 172 │ 405         │ 0       │ 30.3    │
 * │ 173 │ 409         │ 0       │ 3.8     │
 * │ 174 │ 410         │ 8.9     │ 116.3   │
 * │ 175 │ 411         │ 0       │ 13.4    │
 * │ 176 │ 432         │ 0       │ 10.3    │
 * │ 177 │ 433         │ 0       │ 0.9     │
 * │ 178 │ 500         │ 0       │ 20.8    │
 * │ 179 │ 501         │ 0       │ 19.8    │
 * │ 180 │ 501COVANCVR │ 0.7     │ 1.1     │
 * │ 181 │ 502         │ 0       │ 6.1     │
 * │ 182 │ 503         │ 1.1     │ 54.3    │
 * │ 183 │ 503SPCOUGAR │ 31.4    │ 39.7    │
 * │ 184 │ 504         │ 0       │ 51.8    │
 * │ 185 │ 504SPOLD504 │ 21.1    │ 21.9    │
 * │ 186 │ 505         │ 0       │ 19.2    │
 * │ 187 │ 506         │ 0       │ 11.5    │
 * │ 188 │ 507         │ 0       │ 43.5    │
 * │ 189 │ 507COPEARL  │ 2.3     │ 3.4     │
 * │ 190 │ 508         │ 0       │ 32.8    │
 * │ 191 │ 509         │ 0       │ 29.9    │
 * │ 192 │ 510         │ 0.1     │ 15.6    │
 * │ 193 │ 510SPYELMLP │ 13.6    │ 14.7    │
 * │ 194 │ 512         │ 0       │ 12      │
 * │ 195 │ 513         │ 0       │ 3.3     │
 * │ 196 │ 515         │ 0       │ 6.9     │
 * │ 197 │ 516         │ 0       │ 16.2    │
 * │ 198 │ 518         │ 0       │ 3.8     │
 * │ 199 │ 519         │ 0       │ 1.1     │
 * │ 200 │ 520         │ 0       │ 12.8    │
 * │ 201 │ 522         │ 0       │ 24.6    │
 * │ 202 │ 523         │ 0       │ 2.4     │
 * │ 203 │ 524         │ 0       │ 14.5    │
 * │ 204 │ 524SP3RDAVE │ 0       │ 0.7     │
 * │ 205 │ 524SPCEDRWY │ 4.7     │ 5.1     │
 * │ 206 │ 525         │ 0       │ 30.5    │
 * │ 207 │ 525SPPAINE  │ 5.6     │ 6.4     │
 * │ 208 │ 526         │ 0       │ 4.5     │
 * │ 209 │ 527         │ 2.7     │ 11.9    │
 * │ 210 │ 528         │ 0       │ 3.4     │
 * │ 211 │ 529         │ 0       │ 6.6     │
 * │ 212 │ 529SPEVERET │ 0.4     │ 0.5     │
 * │ 213 │ 530         │ 17      │ 67.7    │
 * │ 214 │ 531         │ 0       │ 9.8     │
 * │ 215 │ 532         │ 0       │ 10      │
 * │ 216 │ 534         │ 0       │ 5       │
 * │ 217 │ 536         │ 0       │ 5.3     │
 * │ 218 │ 538         │ 0       │ 3.6     │
 * │ 219 │ 539         │ 0       │ 15.1    │
 * │ 220 │ 539COLYNDEN │ 15.2    │ 15.3    │
 * │ 221 │ 542         │ 0       │ 57.2    │
 * │ 222 │ 542COMTBAKR │ 54.6    │ 54.9    │
 * │ 223 │ 543         │ 0       │ 1       │
 * │ 224 │ 544         │ 0       │ 9       │
 * │ 225 │ 546         │ 0       │ 8       │
 * │ 226 │ 547         │ 0.1     │ 10.7    │
 * │ 227 │ 548         │ 0       │ 13.8    │
 * │ 228 │ 599         │ 0       │ 1.7     │
 * │ 229 │ 702         │ 0       │ 9.3     │
 * │ 230 │ 704         │ 5.3     │ 5.9     │
 * │ 231 │ 705         │ 0       │ 1.5     │
 * │ 232 │ 706         │ 0       │ 13.6    │
 * │ 233 │ 730         │ 0       │ 6       │
 * │ 234 │ 730SPWALULA │ 5.9     │ 6.1     │
 * │ 235 │ 821         │ 0       │ 25.2    │
 * │ 236 │ 823         │ 0       │ 4.7     │
 * │ 237 │ 900         │ 6       │ 21.6    │
 * │ 238 │ 902         │ 0       │ 12.3    │
 * │ 239 │ 903         │ 0       │ 10      │
 * │ 240 │ 903SPCLEELM │ 0.2     │ 0.5     │
 * │ 241 │ 904         │ 0       │ 16.9    │
 * │ 242 │ 906         │ 0       │ 2.6     │
 * │ 243 │ 906SPHYAK   │ 2.6     │ 2.9     │
 * │ 244 │ 970         │ 0       │ 10.3    │
 * │ 245 │ 971         │ 0       │ 15      │
 * ```
 */
export async function getRouteList() {
  if (!results) {
    const search = new URLSearchParams([
      ["outStatistics", JSON.stringify(outStatistics)],
      ["returnGeometry", "false"],
      ["groupByFieldsForStatistics", routeIdFieldName],
      ["orderByFields", "RouteID"],
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
