import { PropTypes } from 'prop-types';
import React, { useCallback, useState } from 'react';

import { LAYERS_DEFAULT_STATE, LayersContext } from './layers-context';

const LayersProvider = ({ active, children, extension, layers, tilesurl }) => {
  const [state, setState] = useState({
    ...LAYERS_DEFAULT_STATE,
    active,
    extension,
    layers: Array.isArray(layers) ? layers : [layers],
    tilesurl,
  });

  const onLayerChange = useCallback(
    index => setState({ ...state, active: index }),
    [state]
  );

  return (
    <LayersContext.Provider value={{ ...state, onLayerChange }}>
      {children}
    </LayersContext.Provider>
  );
};

LayersProvider.propTypes = {
  active: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  extension: PropTypes.string.isRequired,
  layers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  tilesurl: PropTypes.string.isRequired,
};

LayersProvider.displayName = 'LayersProvider';

export default LayersProvider;
