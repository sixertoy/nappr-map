import { LeafletMouseEvent } from 'leaflet';
import React, { useCallback } from 'react';

import { LayersConsumer } from '../../contexts';
import { ControlsPosition } from '../../enums';
import { MapMouseEvent } from '../../interfaces';
import { MapLayersControlsComponent } from './layers-controls.component';
import { MapLayersGroupComponent } from './layers-group.component';

interface MapLayersComponentProps {
  onClick: (evt: MapMouseEvent) => void;
}

export const MapLayersComponent: React.FC<MapLayersComponentProps> = React.memo(
  ({ onClick }: MapLayersComponentProps) => {
    const layerClickHandler = useCallback(
      (evt: LeafletMouseEvent, layerid: number) => {
        if (!evt.originalEvent.isTrusted) return;
        const { latlng } = evt;
        onClick({ latlng, layerid, type: 'click' });
      },
      [onClick]
    );

    return (
      <LayersConsumer>
        {state => {
          const {
            activeLayer,
            tilesExtension,
            layers,
            onLayerChange,
            tilesURL,
          } = state;
          const hasLayers = layers && layers.length > 0;
          const hasManyLayers = hasLayers && layers.length > 1;
          const showGroup =
            tilesExtension &&
            tilesURL &&
            hasLayers &&
            activeLayer &&
            activeLayer >= 0;
          const showControls = showGroup && hasManyLayers && onLayerChange;
          return (
            <React.Fragment>
              {showGroup && (
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
        }}
      </LayersConsumer>
    );
  }
);

MapLayersComponent.displayName = 'MapLayersComponent';
