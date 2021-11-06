export interface MapContext {
  tilesExtension: string;
  layers: string[];
  tilesURL: string | undefined;
  activeLayer: number;
  onLayerChange: (layerId: number) => void;
}
