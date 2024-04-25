import { OpenStreetMapUrl } from "../../src/urls/osm";
import { expect, test, describe } from "vitest";

describe("OpenStreetMapUrl", () => {
  test("create OpenStreetMap URL with a tuple", () => {
    const [mlat, mlon] = [45.6448, -122.6617];
    const url = new OpenStreetMapUrl({
      search: {
        mlat,
        mlon,
      },
      zoomLatLng: [19, mlat, mlon],
    });
    expect(url.href).toBe(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `https://www.openstreetmap.org/?mlat=${mlat}&mlon=${mlon}#map=19/${mlat}/${mlon}`,
    );
  });
});
