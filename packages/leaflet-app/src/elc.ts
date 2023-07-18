import type { LatLng } from "leaflet";
import RouteLocator, {
  RouteLocation,
  type IFindNearestRouteLocationParameters,
} from "wsdot-elc";
import type { Milepost, RouteDescription } from "wsdot-route-utils";
import { gpsWkid } from "./constants";
import PointRouteLocation from "./RouteLocationExtensions";

export const defaultElcUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe";

export interface FindNearestRouteOptions {
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

export async function callElcNearestRoute(
  latlng: LatLng,
  options?: FindNearestRouteOptions
) {
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

  /* @__PURE__ */ console.debug("elc parameters", {
    url,
    params,
  });

  const rl = new RouteLocator(url);

  const results = await rl.findNearestRouteLocations(params);
  return results.map((r) => new PointRouteLocation(r));
}

export async function callElcMPToPoint(
  route: RouteDescription,
  mp: Milepost,
  options?: {
    url?: string;
    decrease?: boolean;
  }
) {
  const url = options?.url || defaultElcUrl;
  const rl = new RouteLocator(url);
  const results = await rl.findRouteLocations({
    locations: [
      new RouteLocation({
        Route: route.toString(),
        Srmp: mp.mp,
        Decrease: !!options?.decrease,
      }),
    ],
    outSR: gpsWkid,
    referenceDate: new Date(),
    useCors: true,
  });
  return results.map((r) => new PointRouteLocation(r));
}
