import { isLatLngTuple, type LatLngTuple } from "../../common/types";
import { tryGetBingMapsPoint, type IBingMapsOptions } from "./types";

const defaultUrl = new URL("https://bing.com/maps/default.aspx");

// https://www.bing.com/maps?osid=aea027ec-e7b9-4270-9dd9-403c194a9230&cp=47.072382~-122.705611&lvl=16.58&pi=0&v=2&sV=2&form=S00027
// https://www.bing.com/maps?osid=ff2ac347-ff8f-4745-ac6a-d247075496a8&cp=47.074709~-122.713104&lvl=16.58&pi=0&v=2&sV=2&form=S00027
// https://www.bing.com/maps?osid=86193d39-82e7-43a5-b74c-1745bb913ded&cp=47.074711~-122.718422&lvl=16&pi=0&v=2&sV=2&form=S00027

/**
 * Generates an iterator that yields key-value pairs from the given object.
 * @template T - The type of the object.
 * @param options - The object to iterate over.
 * @yields - The key-value pair from the object.
 */
function* enumerateObjectProperties<T extends object>(
  options: T,
): Generator<readonly [keyof T, string], void> {
  for (const [key, value] of Object.entries(options) as [
    keyof T,
    T[keyof T],
  ][]) {
    if (value == null) {
      continue;
    }

    if (key === "cp" && isLatLngTuple(value)) {
      yield [key, value.join("~")] as const;
    } else if (typeof value === "boolean") {
      yield [key, value ? "1" : "0"] as const;
    } else if (key === "sp" && typeof value === "object") {
      const p = tryGetBingMapsPoint(value);

      if (p) {
        yield [key, p.toString()] as const;
      } else {
        console.error("invalid sp value", value);
      }
    } else {
      yield [key, String(value)] as const;
    }
  }
}

/**
 * @see {@link https://learn.microsoft.com/en-us/bingmaps/articles/create-a-custom-map-url}
 */
export class BingMapsUrl extends URL {
  public static readonly defaultUrl = defaultUrl;
  /**
   * Constructs a new instance of BingMapsUrl with the given options and URL.
   * @param options - Either a {@link LatLngTuple} or an {@link IBingMapsOptions}.
   * @param url - The URL for the BingMapsUrl. Defaults to the defaultUrl.
   */
  constructor(
    options: LatLngTuple | IBingMapsOptions,
    url: string | URL = defaultUrl,
  ) {
    super(url);
    if (isLatLngTuple(options)) {
      this.searchParams.set("where", options.join(","));
    } else {
      for (const [key, value] of enumerateObjectProperties(options)) {
        this.searchParams.set(key, value);
      }
    }
  }
}

export default BingMapsUrl;
