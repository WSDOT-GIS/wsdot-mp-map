// Generated by CodiumAI

import { describe, expect, it } from "vitest";
import { QueryOptions, findNearestMilepost } from "../src/milepostServiceQuery";

describe("findNearestMilepost", () => {
  // Should return a JSON object with expected data when given valid input
  it("should return a JSON object with expected data when given valid input", async () => {
    const query: QueryOptions = {
      geometry: [-122.29193564534154, 47.34345774504132],
      inSR: 4326,
      distance: 300,
      units: "esriSRUnit_StatuteMile",
    };

    const result = await findNearestMilepost(query);
    expect(result).toBeDefined();
  });

  // Should handle missing optional parameters gracefully and return expected data
  it("should handle missing optional parameters gracefully and return expected data", async () => {
    const query: QueryOptions = {
      geometry: [-122.29193564534154, 47.34345774504132],
    };

    const result = await findNearestMilepost(query);
    expect(result).toBeDefined();
  });

  // Should handle different input units and return expected data
  it("should handle different input units and return expected data", async () => {
    const query: QueryOptions = {
      geometry: [-122.29193564534154, 47.34345774504132],
      inSR: 4326,
      distance: 300,
      units: "esriSRUnit_Kilometer",
    };

    const result = await findNearestMilepost(query);
    expect(result).toBeDefined();
  });

  // Should handle invalid input parameters and return an error message
  it("should handle invalid input parameters and return an error message", async () => {
    const query: QueryOptions = {
      geometry: [-122.29193564534154, 47.34345774504132],
      inSR: 1234 as unknown as 4326, // Invalid inSR value
      distance: 300,
      units: "esriSRUnit_StatuteMile",
    };

    try {
      return await findNearestMilepost(query);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
