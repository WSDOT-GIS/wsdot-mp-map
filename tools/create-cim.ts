/**
 * This script creates a CIM symbol for a milepost marker.
 * @example
 * ```
 * node --import=tsx ./tools/create-cim.ts > milepost.cim.json
 * ```
 * or
 * ```
 * tsx ./tools/create-cim.ts > milepost.cim.json
 */

import { createMilepostCimSymbol } from "../src/layers/MilepostLayer/create-cim.ts";

// Create a text symbol with a background.
const cimSymbol = createMilepostCimSymbol();

console.log(JSON.stringify(cimSymbol.toJSON(), null, 2));
