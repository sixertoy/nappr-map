import { LeafletMouseEvent } from 'leaflet';
import React from 'react';
import { LayerGroup, TileLayer, useMapEvent } from 'react-leaflet';

interface MapLayersGroupComponentProps {
  activeLayer: number;
  tilesExtension: string;
  layers: string[];
  onClick: (evt: LeafletMouseEvent) => void;
  tilesURL: string;
}

export const MapLayersGroupComponent: React.FC<MapLayersGroupComponentProps> =
  React.memo(
    ({
      activeLayer,
      tilesExtension,
      layers,
      onClick,
      tilesURL,
    }: MapLayersGroupComponentProps) => {
      useMapEvent('click', onClick);

      if (!tilesURL) return null;
      return (
        <LayerGroup>
          {layers
            .filter((k, index) => activeLayer === index)
            .map(layerid => (
              <TileLayer
                key={`layer::${layerid}`}
                errorTileUrl="/tiles/blank.png"
                tileSize={256}
                url={`${tilesURL}/${layerid}/{z}/{x}_{y}.${tilesExtension}`}
              />
            ))}
        </LayerGroup>
      );
    }
  );

MapLayersGroupComponent.displayName = 'MapLayersGroupComponent';
