import Leaflet from 'leaflet';
import React, { PropsWithChildren, RefObject } from 'react';
import { MapContainer, ZoomControl } from 'react-leaflet';

import {
  MapConfigLayer,
  MapControlsLayer,
  MapMarkersLayer,
  MapTilesLayer,
} from '../../components';
import { MapControlsPosition } from '../../enums';
import { useMapConfig } from '../../hooks';
import { MapChangeEvent, MapConfigInterface } from '../../interfaces';
import { toLeafletBounds } from '../../utils';

interface MapComponentProps extends PropsWithChildren {
  config: RefObject<MapConfigInterface>;
  className?: string;
  debugMode?: boolean;
  configMode?: boolean;
  onMapChange?: (evt: MapChangeEvent) => void;
}

export const MapComponent = React.memo((props: MapComponentProps) => {
  const {
    config,
    children,
    configMode = false,
    className = undefined,
    onMapChange = undefined,
  } = props;

  const {
    mapConfig,
    onLayerClick,
    activeLayerIndex,
    onMapConfigChange,
    onLayerChange,
    map,
  } = useMapConfig({
    config,
    onMapChange,
  });

  const zoomPosition = configMode ? 'topleft' : 'topright';
  const classname = `nappr-map__container ${className || ''}`.trim();

  const { tiles, layers } = mapConfig;
  const hasTiles = !!tiles.url;
  const hasLayers = layers && layers.length > 0;

  const showLayers = !!(hasTiles && hasLayers);
  const showConfigLayer = configMode && onMapChange;

  return (
    <MapContainer
      ref={map}
      scrollWheelZoom
      attributionControl={false}
      bounceAtZoomLimits={false}
      center={mapConfig.center || { lat: -0.5, lng: 0.5 }}
      className={classname}
      crs={Leaflet.CRS.Simple}
      doubleClickZoom={false}
      maxBounds={toLeafletBounds(mapConfig?.bounds)}
      maxZoom={mapConfig?.zoom?.max || 18}
      minZoom={mapConfig?.zoom?.min || 0}
      wheelPxPerZoomLevel={256}
      zoom={mapConfig?.zoom?.current || 9}
      zoomControl={false}>
      <React.Fragment>
        <ZoomControl position={zoomPosition} />
        {showConfigLayer && (
          <MapConfigLayer
            config={mapConfig}
            onConfigChange={onMapConfigChange}
          />
        )}
        {showLayers && (
          <MapControlsLayer
            activeLayerIndex={activeLayerIndex}
            extension={mapConfig.tiles.extension}
            layers={mapConfig.layers}
            position={MapControlsPosition.BOTTOM_RIGHT}
            url={mapConfig.tiles.url}
            onChange={onLayerChange}
          />
        )}
        <MapMarkersLayer>{children}</MapMarkersLayer>
        {showLayers && (
          <MapTilesLayer
            activeLayerIndex={activeLayerIndex}
            extension={mapConfig.tiles.extension}
            layers={mapConfig.layers}
            url={mapConfig.tiles.url}
            onClick={onLayerClick}
          />
        )}
      </React.Fragment>
    </MapContainer>
  );
});

MapComponent.displayName = 'MapComponent';
