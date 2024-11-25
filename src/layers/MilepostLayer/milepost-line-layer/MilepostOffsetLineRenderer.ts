import MilepostLocationRenderer from "./Milepost Location Renderer.json";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";

/**
 * Simple Renderer using a CIM symbol.
 */
export default SimpleRenderer.fromJSON(MilepostLocationRenderer);
