import React from 'react';

export const LAYERS_DEFAULT_STATE = {
  active: 0,
  extension: 'png',
  layers: [],
  tilesurl: null,
};

export const LayersContext = React.createContext(LAYERS_DEFAULT_STATE);

LayersContext.displayName = 'LayersContext';
