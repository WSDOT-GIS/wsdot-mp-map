import type { SimpleIcon } from "simple-icons";

/**
 * Creates an SVG element from a {@link SimpleIcon}.
 * @see {@link https://simpleicons.org Simple Icons}
 * @param simpleIcon - A Simple Icon
 * @param domParser - A DOMParser. If not provided, a new instance will be created within the function.
 * @returns - An SVG element.
 */
export function convertSimpleIconToSvgElement(
  simpleIcon: SimpleIcon,
  domParser?: DOMParser
) {
  if (!domParser) {
    domParser = new DOMParser();
  }

  const { svg, hex } = simpleIcon;
  const dom = domParser.parseFromString(svg, "image/svg+xml");
  const rootNode = dom.documentElement;
  // set the path's color.
  rootNode.querySelector("path")?.setAttribute("fill", `#${hex}`);
  return document.adoptNode(rootNode);
}
