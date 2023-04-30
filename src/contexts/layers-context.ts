import React from 'react';

import { MapContext } from '../interfaces';

export const LayersContext = React.createContext<MapContext>({
  activeLayer: 0,
  layers: [],
  onLayerChange: () => {},
  tilesExtension: 'png',
  tilesURL: undefined,
});

LayersContext.displayName = 'LayersContext';
