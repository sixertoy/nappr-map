import { LeafletMouseEvent } from 'leaflet';
import React from 'react';
import { LayerGroup, TileLayer, useMapEvent } from 'react-leaflet';

interface MapTilesLayerProps {
  activeLayerIndex: number;
  url?: string;
  extension?: string;
  layers?: string[];
  onClick?: (event: LeafletMouseEvent) => void;
}

export const MapTilesLayer = React.memo(
  ({
    onClick,
    extension = 'png',
    layers = [],
    activeLayerIndex,
    url,
  }: MapTilesLayerProps) => {
    useMapEvent('click', onClick);

    return (
      <LayerGroup>
        {layers
          .filter((k, index) => activeLayerIndex === index)
          .map((layerid) => {
            const key = `layer::${layerid}`;
            const uri = `${url}/${layerid}/{z}/{x}_{y}.${extension}`;
            return (
              <TileLayer
                key={key}
                errorTileUrl="/tiles/blank.png"
                tileSize={256}
                url={uri}
              />
            );
          })}
      </LayerGroup>
    );
  },
);

MapTilesLayer.displayName = 'MapLayers';
