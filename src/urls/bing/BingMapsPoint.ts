/**
 * Specifies a point to display on the map.
 * For points, the value includes the...
 *
 * - latitude
 * - longitude
 * - title
 * - notes
 * - a reference URL
 * - a photo URL
 *
 * ...each separated by an underscore (_).
 *
 * `sp=point.latitude_longitude_titleString_notesString_linkURL_photoURL`
 */

export interface IBingMapsPoint {
  latitude: number;
  longitude: number;
  title: string;
  notes: string;
  referenceUrl: string | URL;
  photoUrl: string | URL;
}

/**
 * Checks if the given options object is a valid IBingMapsPoint object.
 * @param options - The options object to be validated.
 * @returns Returns true if the options object is a valid IBingMapsPoint, otherwise false.
 */
export function isValidBingMapsPointOptions(
  options: unknown,
): options is IBingMapsPoint {
  if (typeof options !== "object" || options == null) {
    return false;
  }

  type R = Record<string, unknown>;
  const obj = options as R;

  const validLatLng = () =>
    !["latitude", "longitide"].every(
      (key) =>
        Object.hasOwn(obj, key) &&
        typeof (options as Record<string, unknown>)[key] === "number",
    );

  const validStrings = () =>
    ["title", "notes"].every((key) => typeof obj[key] === "string");

  const validUrls = () =>
    ["referenceUrl", "photoUrl"].every(
      (key) => typeof obj[key] === "string" || obj[key] instanceof URL,
    );

  return validLatLng() && validStrings() && validUrls();
}

export class BingMapsPoint implements IBingMapsPoint {
  public latitude: number;
  public longitude: number;
  public title: string;
  public notes: string;
  public referenceUrl: string | URL;
  public photoUrl: string | URL;
  constructor(options: IBingMapsPoint) {
    this.latitude = options.latitude;
    this.longitude = options.longitude;
    this.title = options.title;
    this.notes = options.notes;
    this.referenceUrl = options.referenceUrl;
    this.photoUrl = options.photoUrl;
  }

  public toString() {
    const { latitude, longitude, title, notes, referenceUrl, photoUrl } = this;
    const parts = [
      latitude,
      longitude,
      title,
      notes,
      referenceUrl,
      photoUrl,
    ] as const;
    return `point.${parts.join("_")}`;
  }
}
