import { rangeDomainProperties } from "@wsdot/land-use-codes";

/**
 * Colors from https://colorbrewer2.org/?type=diverging&scheme=RdYlBu&n=8
 */
export const colors = [
  "#b35806",
  "#e08214",
  "#fdb863",
  "#fee0b6",
  "#d8daeb",
  "#b2abd2",
  "#8073ac",
  "#542788",
] as const;

export const landUseCategoryToColorMapping = new Map(
  rangeDomainProperties.map((p, i) => [p.name, colors[i]] as const),
);
