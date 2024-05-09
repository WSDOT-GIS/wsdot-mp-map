/// <reference types="vite/client" />
import type { ArcGisError } from "./common/ArcGisError";
import type { FormatError } from "./common/FormatError";
import type { ElcError } from "./elc/errors";

// Add the elc-error custom event to the window
declare global {
  interface WindowEventMap {
    "elc-error": CustomEvent<{ error: ElcError } & Record<string, unknown>>;
    "arcgis-error": CustomEvent<
      { error: ArcGisError } & Record<string, unknown>
    >;
    "format-error": CustomEvent<
      { error: FormatError } & Record<string, unknown>
    >;
  }
}
