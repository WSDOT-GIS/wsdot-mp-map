import type { esriGeometryType, Feature, Field, SpatialReference } from "arcgis-rest-api";

export enum layerDefStringFormat {
  simple = 0,
  json = 1,
  includeOutFields = 2,
}

export class LayerDef {
  constructor(
    public layerId: number,
    public where: string,
    public outFields?: string[]
  ) {}
}

export interface QueryResponseLayer {
    id: number;
    objectIdFieldName?: string;
    globalIdFieldName?: string;
    geometryType?: esriGeometryType;
    spatialReference?: SpatialReference;
    fields?: Field[];
    features: Feature[]
}

export interface FeatureServiceQueryResponse {
    layers: QueryResponseLayer[];
}