import type { LatLng } from "leaflet";
import RouteLocator, {
  type IFindNearestRouteLocationParameters,
} from "wsdot-elc";
import { gpsWkid } from "./constants";
import PointRouteLocation from "./RouteLocationExtensions";

export const defaultElcUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe";

export interface CallElcOptions {
  /**
   * @default {@link https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe}
   */
  elcUrl?: string;
  /**
   * Parameters for {@link RouteLocator.findNearestRouteLocations}.
   * Note that {@link IFindNearestRouteLocationParameters.coordinates}
   * will be set to the coordinates defined by {@link latlng}.
   */
  findNearestRouteLocationParameters: Omit<
    IFindNearestRouteLocationParameters,
    "coordinates" | "inSR"
  >;
}

export async function callElc(latlng: LatLng, options?: CallElcOptions) {
  const coords = [latlng.lng, latlng.lat];
  const url = options?.elcUrl ?? defaultElcUrl;
  let params: IFindNearestRouteLocationParameters;

  if (options?.findNearestRouteLocationParameters) {
    params =
      options.findNearestRouteLocationParameters as IFindNearestRouteLocationParameters;
  } else {
    params = {
      coordinates: coords,
      inSR: gpsWkid,
      outSR: gpsWkid,
      referenceDate: new Date(),
      searchRadius: 200,
    };
  }

  console.debug("elc parameters", {
    url,
    params,
  });

  const rl = new RouteLocator(url);

  const results = await rl.findNearestRouteLocations(params);
  return results.map((r) => new PointRouteLocation(r));
}
