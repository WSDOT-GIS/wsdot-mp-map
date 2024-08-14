import type MapView from "@arcgis/core/views/MapView";

/**
 * Sets up the sidebar collapse button in the given MapView.
 * @param view - The MapView to add the collapse button to.
 * @throws {Error} If the sidebar element cannot be found.
 */
export function setupSidebarCollapseButton(view: MapView) {
  const sideBar = document.querySelector<HTMLCalciteShellPanelElement>(
    "calcite-shell-panel#sidebar",
  );

  if (!sideBar) {
    throw new Error("Failed to find sidebar element");
  }

  // <calcite-button id="toggleSidebarButton" text="Toggle Sidebar" icon="collapse"></calcite-button>
  const collapseButton = document.createElement("calcite-button");
  collapseButton.setAttribute("id", "toggleSidebarButton");
  collapseButton.setAttribute("text", "Toggle Sidebar");
  collapseButton.setAttribute("icon", "collapse");
  collapseButton.addEventListener("click", () => {
    sideBar.collapsed = !sideBar.collapsed;
    setSidebarToggleIcon();
  });

  // Set sidebar collapsed to false if document width is less than 768px.
  if (window.outerWidth >= 768) {
    sideBar.collapsed = false;
  }

  view.ui.add(collapseButton, "top-leading");

  const setSidebarToggleIcon = () => {
    collapseButton.iconStart = sideBar.collapsed
      ? "chevrons-right"
      : "chevrons-left";
  };

  setSidebarToggleIcon();
}
