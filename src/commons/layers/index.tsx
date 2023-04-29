import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { LayersConsumer } from '../../contexts';
import MapLayersControls from './layers-controls';
import MapLayersGroup from './layers-group';

const MapLayersManagerComponent = React.memo(({ onClick }) => {
  const layerClickHandler = useCallback(
    ({ latlng, originalEvent }, layerid) => {
      if (!originalEvent.isTrusted) return;
      onClick({ latlng, layerid, type: 'draft' });
    },
    [onClick]
  );

  return (
    <LayersConsumer>
      {({ active, extension, layers, onLayerChange, tilesurl }) => {
        const hasmanylayers = layers.length > 1;
        return (
          <React.Fragment>
            <MapLayersGroup
              active={active}
              extension={extension}
              layers={layers}
              tilesurl={tilesurl}
              onClick={evt => layerClickHandler(evt, active)}
            />
            {hasmanylayers && (
              <MapLayersControls
                active={active}
                extension={extension}
                layers={layers}
                position="bottomright"
                tilesurl={tilesurl}
                onChange={layerid => onLayerChange(layerid)}
              />
            )}
          </React.Fragment>
        );
      }}
    </LayersConsumer>
  );
});

MapLayersManagerComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

MapLayersManagerComponent.displayName = 'MapLayersManagerComponent';

export default MapLayersManagerComponent;
