import { LeafletMouseEvent } from 'leaflet';
import React from 'react';
import { LayerGroup, TileLayer, useMapEvent } from 'react-leaflet';

interface MapLayersGroupComponentProps {
  activeLayer?: number;
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
            .filter((k, index) => {
              if (activeLayer === undefined) return true;
              return activeLayer === index;
            })
            .map(layerid => {
              const key = `layer::${layerid}`;
              const url = `${tilesURL}/${layerid}/{z}/{x}_{y}.${tilesExtension}`;
              return (
                <TileLayer
                  key={key}
                  errorTileUrl="/tiles/blank.png"
                  tileSize={256}
                  url={url}
                />
              );
            })}
        </LayerGroup>
      );
    }
  );

MapLayersGroupComponent.defaultProps = {
  activeLayer: undefined,
};

MapLayersGroupComponent.displayName = 'MapLayersGroupComponent';
