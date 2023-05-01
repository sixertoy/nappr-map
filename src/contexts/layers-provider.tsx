import React, { useCallback, useMemo, useState } from 'react';

import { TilesURLException } from '../exceptions';
import { LayersException } from '../exceptions/layers.exception';
import { LayersContext } from './layers-context';

interface MapLayersProviderProps {
  activeLayer?: number;
  children?: React.ReactElement;
  tilesExtension?: string;
  layers: string[] | string;
  tilesURL: string;
}

export function MapLayersProvider({
  activeLayer,
  children,
  tilesExtension,
  layers,
  tilesURL,
}: MapLayersProviderProps) {
  const [active, setActive] = useState(activeLayer || 0);

  const onLayerChange = useCallback(
    (layerid: number) => setActive(layerid),
    []
  );

  const providerValue = useMemo(
    () => ({
      activeLayer: active,
      layers: !Array.isArray(layers) ? [layers] : layers,
      onLayerChange,
      tilesExtension: tilesExtension || 'png',
      tilesURL,
    }),
    [active, tilesExtension, layers, onLayerChange, tilesURL]
  );

  if (!tilesURL || !tilesURL.trim()) {
    throw new TilesURLException();
  }

  if (!layers || !layers.length) {
    throw new LayersException();
  }

  return (
    <LayersContext.Provider value={providerValue}>
      {children}
    </LayersContext.Provider>
  );
}

MapLayersProvider.defaultProps = {
  activeLayer: undefined,
  children: undefined,
  tilesExtension: undefined,
};

MapLayersProvider.displayName = 'MapLayersProvider';
