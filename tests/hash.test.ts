import { parseMapPositionHash } from "../src/history-api/position";
import { test, describe } from "vitest";

describe.concurrent("parseMapPositionHash", () => {
  test("Can parse hash without search parameters", ({ expect }) => {
    const url = "http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60";

    const expected = {
      zoom: 2.59,
      center: [53.07, 39.26],
      bearing: -24.1,
      pitch: 60,
    };

    const parsed = parseMapPositionHash(url);

    expect(parsed).toEqual(expected);
  });
});
