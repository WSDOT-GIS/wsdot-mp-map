import { divIcon, marker, type DivIcon, type MarkerOptions } from "leaflet";

/**
 *
 * @param args Arguments are the same as for {@link marker}.
 * The {@link MarkerOptions.icon} will be set to a {@link DivIcon}
 * containing a `<progress>`. If
 * @returns
 */
export function createProgressMarker(...args: Parameters<typeof marker>) {
  let [latlng, options] = args;
  const progElement = document.createElement("progress");
  progElement.textContent = "Getting milepost…";

  const progressIcon = divIcon({
    html: progElement,
  });

  if (options) {
    options.icon = progressIcon;
  } else {
    options = {
      icon: progressIcon,
    };
  }

  /**
   * This marker shows a <progress> while
   * data is being retrieved from ELC and
   * map services.
   */
  const progressMarker = marker(latlng, options);

  return progressMarker;
}
