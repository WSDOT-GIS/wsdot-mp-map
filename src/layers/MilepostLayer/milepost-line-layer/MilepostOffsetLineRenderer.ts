import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import MilepostLocationRenderer from "./Milepost Location Renderer.json";

/**
 * Simple Renderer using a CIM symbol.
 */
export default SimpleRenderer.fromJSON(MilepostLocationRenderer);
