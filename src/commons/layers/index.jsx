import React, { useCallback } from 'react';

import { LayersConsumer } from '../../contexts/layers';
import MapLayersControls from './layers-controls';
import MapLayersGroup from './layers-group';

const MapLayersManagerComponent = React.memo(() => {
  const layerClickHandler = useCallback(() => {
    // { latlng, originalEvent }
    // if (!editable || !originalEvent.isTrusted) return;
    // setDraft(latlng);
    // onChange({ latlng, layerid: activeLayer, type: 'draft' });
  }, []);

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
              onClick={layerClickHandler}
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

MapLayersManagerComponent.displayName = 'MapLayersManagerComponent';

export default MapLayersManagerComponent;
