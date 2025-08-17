import Leaflet from 'leaflet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { MapControlsPosition } from '../../enums';
import { useToggle } from '../../hooks';
import { LayerButton, LayerToggleButton } from '../buttons';

interface MapControlsLayerProps {
  layers: string[];
  url: string;
  extension?: string;
  activeLayerIndex?: number;
  onChange: (index: number) => void;
  position?: MapControlsPosition;
}

export const MapControlsLayer = React.memo(
  ({
    activeLayerIndex = 0,
    url,
    layers,
    onChange,
    extension = 'png',
    position,
  }: MapControlsLayerProps) => {
    const mountedRef = useRef<HTMLDivElement>(null);
    const [opened, toggleTilesMenu] = useToggle(false);

    // Memoize filtered layers to avoid recalculation on every render
    const visibleLayers = useMemo(() => {
      return layers.filter((_, index) => opened || activeLayerIndex === index);
    }, [layers, opened, activeLayerIndex]);

    // Memoize layer handler to avoid recreation
    const layerHandler = useCallback(
      (index: number) => {
        toggleTilesMenu();
        onChange(index);
      },
      [onChange, toggleTilesMenu],
    );

    // Memoize position class
    const positionClassName = useMemo(
      () => position || MapControlsPosition.BOTTOM_RIGHT,
      [position],
    );

    useEffect(() => {
      const element = mountedRef.current;
      if (element) {
        Leaflet.DomEvent.disableClickPropagation(element);
        Leaflet.DomEvent.disableScrollPropagation(element);
      }
    }, []);

    return (
      <div ref={mountedRef} className="leaflet-control-container">
        <div className={positionClassName}>
          <div className="leaflet-bar leaflet-control no-no-border">
            <div className={'nappr-map__control-layer-bar'}>
              <LayerToggleButton
                opened={opened}
                toggleTilesMenu={toggleTilesMenu}
              />
              {visibleLayers.map((layerSlug) => {
                // Find the real index in the original array
                const realIndex = layers.findIndex(
                  (layer) => layer === layerSlug,
                );
                return (
                  <LayerButton
                    key={layerSlug}
                    extension={extension}
                    index={realIndex}
                    layerSlug={layerSlug}
                    url={url}
                    onLayerSelect={layerHandler}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

MapControlsLayer.displayName = 'MapControlsLayer';
