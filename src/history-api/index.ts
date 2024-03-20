import FormatError from "../common/FormatError";

/**
 * Mimic the hash functionality of MapLibre Map.
 * @see {@link https://maplibre.org/maplibre-gl-js-docs/api/map/#map}
 *
 * > ...the map's position (zoom, center latitude, center longitude, bearing,
 * > and pitch) will be synced with the hash fragment of the page's URL.
 * > For example, http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60.
 * > An additional string may optionally be provided to indicate a
 * > parameter-styled hash, e.g.
 * > http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar,
 * > where foo is a custom parameter and bar is an arbitrary hash
 * > distinct from the map hash. ...
 */
export type MapPositionHash =
  `${number}/${number}/${number}/${number}/${number}`;

export type MapPositionHashWithSearch = `${MapPositionHash}${string}`;

/**
 * RegExp pattern matching a positive or negative number, integer or decimal.
 */
const numRePattern = String.raw`-?\d+(?:\.\d+)?`;

const groupNames = [
  "zoom",
  "centerY",
  "centerX",
  "bearing",
  "pitch",
  "qs",
] as const;

export type HashGroupName = (typeof groupNames)[number];

/**
 * RegExp pattern matching a MapLibre Map position hash.
 *
 * ## Groups
 *
 * - `zoom` - The zoom level
 * - `centerY` - The center latitude
 * - `centerX` - The center longitude
 * - `bearing` - The bearing
 * - `pitch` - The pitch
 * - `qs` - The optional query string
 *
 */
const mapPositionHashRe = new RegExp(
  String.raw`${
    // Create groups for zoom, center latitude, center longitude, bearing, and pitch.
    groupNames
      // Slice off the "qs" RegExp group name from the array.
      .slice(0, -1)
      // Create a RegExp group for each group name.
      .map((groupName) => String.raw`(?<${groupName}>${numRePattern})`)
      // Join the RegExp groups with a "/".
      .join("/")
    // Append the optional query string group.
  }(?<${groupNames.slice(-1)[0]}>.+)?$`
);

export type MapPosition = {
  zoom: number;
  center: [number, number];
  bearing: number;
  pitch: number;
  qs: Record<string, string>;
};

interface MPMatch extends RegExpExecArray {
  length: 7;
  groups: {
    zoom: `${number}`;
    centerX: `${number}`;
    centerY: `${number}`;
    bearing: `${number}`;
    pitch: `${number}`;
    qs: string;
  };
}

/**
 * Parses the map position hash to extract the zoom level, center coordinates, bearing, pitch, and query string parameters.
 * @param mapPositionHash - The hash representing the map position
 * @returns The parsed map position object
 */
export function parseMapPositionHash(
  mapPositionHash: URL["hash"]
): MapPosition {
  const match = mapPositionHashRe.exec(mapPositionHash);
  const matchIsValid = (match: ReturnType<RegExp["exec"]>): match is MPMatch =>
    !!match?.groups && match.length - 1 === groupNames.length;
  if (!matchIsValid(match)) {
    throw new FormatError(mapPositionHash, mapPositionHashRe);
  }

  const { groups } = match;

  return {
    zoom: parseFloat(groups.zoom),
    center: [parseFloat(groups.centerX), parseFloat(groups.centerY)] as [
      x: number,
      y: number,
    ],
    bearing: parseFloat(groups.bearing),
    pitch: parseFloat(groups.pitch),
    qs: Object.fromEntries(
      new URLSearchParams(groups.qs ?? undefined).entries()
    ),
  };
}
