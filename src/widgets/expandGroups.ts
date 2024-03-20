import type MapView from "@arcgis/core/views/MapView";
import type SceneView from "@arcgis/core/views/SceneView";
import type View from "@arcgis/core/views/View";
import Expand from "@arcgis/core/widgets/Expand";
import LayerList from "@arcgis/core/widgets/LayerList";
import type ListItem from "@arcgis/core/widgets/LayerList/ListItem";
import type ListItemPanel from "@arcgis/core/widgets/LayerList/ListItemPanel";
import type Widget from "@arcgis/core/widgets/Widget";

/**
 * Valid UI position strings.
 * Equivalent to...
 * ```typescript
 * `${"top" | "bottom"}-${"leading" | "trailing" | "left" | "right"}` | "manual";
 * ```
 * ...but defined in this way so we don't have to modify the code
 * in the event that Esri adds additional supported values.
 */
export type UIPosition = Required<
  Pick<__esri.UIAddPosition, "position">
>["position"];

export const uiPositionRe =
  /^(?:(?:manual)|(?:(?:top)|(?:bottom))-(?:(?:left)|(?:right)|(?:leading)|(?:trailing)))$/;

type ExpandProperties = NonNullable<ConstructorParameters<typeof Expand>[0]>;

/**
 * Determines if the input string is a valid {@link UIPosition}.
 * @param input - Input string
 * @returns - Returns true if the input string is a valid {@link UIPosition}
 */
export const isValidUIPosition = (input: unknown): input is UIPosition =>
  typeof input === "string" && uiPositionRe.test(input);

type ViewAddOptions = NonNullable<Parameters<typeof View.prototype.ui.add>[1]>;

/**
 *
 * Sets up a group of {@link Expand} elements containing the input {@link Widget}.
 * @param view - view
 * @param viewAddOptions - View add options
 * @param expandOptions - expandOptions
 * @param widgets - widgets
 * @returns The array of {@link Expand} objects that were created to contain the {@link widgets}.
 * @throws - Throws a {@link TypeError} if {@link widgets} contains no elements or if no group was specified.
 */
export function setupExpandGroup(
  view: View,
  viewAddOptions: ViewAddOptions,
  expandOptions?: ExpandProperties,
  ...widgets: Widget[]
) {
  // Throw error if no widgets were specified.
  if (widgets.length < 1) {
    throw new TypeError("No widgets were specified.");
  }

  // Create expand options if not already specified.
  if (!expandOptions) {
    expandOptions = {};
  }

  // If view add options is just the UIPosition, convert to object
  // with its position property set to the original string.
  viewAddOptions = isValidUIPosition(viewAddOptions)
    ? { position: viewAddOptions }
    : (viewAddOptions as __esri.UIAddPosition);

  // If no group has been defined for the Expand,
  // use the position string as the group name.
  if (!expandOptions.group) {
    expandOptions.group = viewAddOptions.position as string;
  }
  if (!expandOptions.group) {
    const message = "There was no group specified. Expands will not be grouped";
    throw new TypeError(message);
  }

  // Create an Expand for each of the widgets.
  const expands = widgets.map((widget, index) => {
    const currentOptions = { ...expandOptions };

    currentOptions.content = widget;

    const expand = new Expand(currentOptions);
    return {
      component: expand,
      index: index + 1,
      position: currentOptions.group,
    } as __esri.UIAddComponent;
  });

  // Add the newly-created Expands to the view.
  view.ui.add(expands, viewAddOptions);

  return expands;
}

type LayerListItemCreateEvent = {
  item: ListItem;
};

/**
 * Checks if the provided event is a {@link LayerListItemCreateEvent}.
 * @param event - an event object
 * @returns - true if the event is a {@link LayerListItemCreateEvent}, false otherwise
 */
function hasListItem(event: unknown): event is LayerListItemCreateEvent {
  return !!event && Object.hasOwn(event, "item");
}

/**
 * Performs further setup tasks on a layer list item, such as adding a legend.
 * @param event - Layer list item creation event object,
 * which contains an "item" {@link ListItem} property.
 */
const setupLayerListItems: __esri.LayerListListItemCreatedHandler = (event) => {
  if (!hasListItem(event)) {
    throw new TypeError(
      `Expected event object to have an item property with a ListItem value`
    );
  }
  // Add a legend to the list item panel
  event.item.panel = {
    content: "legend",
  } as ListItemPanel;
};

type ExpandGroupSetupParams = Parameters<typeof setupExpandGroup>;

/**
 * Set up widgets for the given view using the provided options.
 * @param view - The map or scene view to set up widgets for.
 * @param viewAddOptions - The options for adding the view.
 * @param expandOptions - The options for the expand group.
 */
export function setupWidgets(
  view: MapView | SceneView,
  viewAddOptions: ExpandGroupSetupParams[1],
  expandOptions: ExpandGroupSetupParams[2]
) {
  const layerList = new LayerList({
    view,
    listItemCreatedFunction: setupLayerListItems,
    visibleElements: {
      errors: true,
      statusIndicators: true,
    },
  });

  setupExpandGroup(view, viewAddOptions, expandOptions, layerList);
}
