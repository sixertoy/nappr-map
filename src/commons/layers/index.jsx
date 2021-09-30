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
      {({ active, layers, onLayerChange, tilesurl }) => {
        const hasmanylayers = layers.length > 1;
        return (
          <>
            <MapLayersGroup
              active={active}
              layers={layers}
              tilesurl={tilesurl}
              onClick={layerClickHandler}
            />
            {hasmanylayers && (
              <MapLayersControls
                active={active}
                layers={layers}
                position="bottomright"
                tilesurl={tilesurl}
                onChange={layerid => onLayerChange(layerid)}
              />
            )}
          </>
        );
      }}
    </LayersConsumer>
  );
});

MapLayersManagerComponent.displayName = 'MapLayersManagerComponent';

export default MapLayersManagerComponent;
