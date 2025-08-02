import { LeafletMouseEvent } from 'leaflet';
import React, { useCallback, useContext } from 'react';

import { LayersContext } from '../../contexts';
import { ControlsPosition } from '../../enums';
import { MapMouseEvent } from '../../interfaces';
import { MapLayersControlsComponent } from './layers-controls.component';
import { MapLayersGroupComponent } from './layers-group.component';

interface MapLayersComponentProps {
  onClick: (evt: MapMouseEvent) => void;
}

export const MapLayersComponent: React.FC<MapLayersComponentProps> = React.memo(
  ({ onClick }: MapLayersComponentProps) => {
    const {
      activeLayer,
      tilesExtension,
      layers,
      onLayerChange,
      tilesURL,
    } = useContext(LayersContext);

    const layerClickHandler = useCallback(
      (evt: LeafletMouseEvent, layerid: number | undefined) => {
        if (!evt.originalEvent.isTrusted) {
          return;
        }
        const { latlng } = evt;
        onClick({ latlng, layerid, type: 'click' });
      },
      [onClick]
    );


    const hasLayers = layers && layers.length > 0;
    const hasManyLayers = hasLayers && layers.length > 1;
    const showLayers = !!(tilesExtension && tilesURL && hasLayers);
    const showControls = !!(showLayers && hasManyLayers && onLayerChange);

    return (
      <React.Fragment>
        {showLayers && (
          <MapLayersGroupComponent
            activeLayer={activeLayer}
            layers={layers}
            tilesExtension={tilesExtension}
            tilesURL={tilesURL}
            onClick={evt => layerClickHandler(evt, activeLayer)}
          />
        )}
        {showControls && (
          <MapLayersControlsComponent
            activeLayer={activeLayer}
            layers={layers}
            position={ControlsPosition.BOTTOM_RIGHT}
            tilesExtension={tilesExtension}
            tilesURL={tilesURL}
            onChange={onLayerChange}
          />
        )}
      </React.Fragment>
    );
  }
);

MapLayersComponent.displayName = 'MapLayersComponent';
