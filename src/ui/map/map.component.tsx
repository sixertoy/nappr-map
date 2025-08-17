import Leaflet from 'leaflet';
import React, { PropsWithChildren, useMemo } from 'react';
import { LayerGroup, MapContainer, ZoomControl } from 'react-leaflet';

import {
  MapConfigLayer,
  MapControlsLayer,
  MapTilesLayer,
} from '../../components';
import { MapControlsPosition } from '../../enums';
import { useMapConfig } from '../../hooks';
import { MapChangeEvent, MapConfigInterface } from '../../interfaces';
import { toLeafletBounds } from '../../utils';

interface MapComponentProps extends PropsWithChildren {
  config: MapConfigInterface;
  className?: string;
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
    layerClickHandler,
    activeLayerIndex,
    configChangeHandler,
    layerChangeHandler,
    map,
  } = useMapConfig({
    config,
    onMapChange,
  });

  const MapElement = useMemo(() => {
    const zoomPosition = configMode ? 'topleft' : 'topright';
    const classname = `nappr-map__container ${className || ''}`.trim();

    const { tiles, layers, zoom, center, bounds } = config;

    const maxZoom = zoom?.max;
    const minZoom = zoom?.min;
    const tilesUrl = tiles.url;
    const currentZoom = zoom?.current;
    const maxTilesLevel = tiles.maxLevel;
    const minTilesLevel = tiles.minLevel;
    const tilesExtension = tiles.extension;
    const maxBounds = toLeafletBounds(bounds);

    const showLayers = !!(tilesUrl && layers && layers.length > 0);

    return (
      <MapContainer
        ref={map}
        attributionControl={false}
        bounceAtZoomLimits={false}
        center={center}
        className={classname}
        crs={Leaflet.CRS.Simple}
        doubleClickZoom={false}
        maxBounds={maxBounds}
        maxZoom={maxZoom}
        minZoom={minZoom}
        scrollWheelZoom={'center'}
        wheelPxPerZoomLevel={256}
        zoom={currentZoom}
        zoomControl={false}>
        <React.Fragment>
          <ZoomControl position={zoomPosition} />
          {/* <!-- config layer --> */}
          {configMode && (
            <MapConfigLayer config={config} onChange={configChangeHandler} />
          )}
          {/* <!-- controls layer layer --> */}
          {showLayers && (
            <MapControlsLayer
              activeLayerIndex={activeLayerIndex}
              extension={tilesExtension}
              layers={layers}
              position={MapControlsPosition.BOTTOM_RIGHT}
              url={tilesUrl}
              onChange={layerChangeHandler}
            />
          )}
          {/* <!-- markers layer --> */}
          <LayerGroup>{children}</LayerGroup>
          {/* <!-- tiles layer --> */}
          {showLayers && (
            <MapTilesLayer
              activeLayerIndex={activeLayerIndex}
              extension={tilesExtension}
              layers={layers}
              maxTilesLevel={maxTilesLevel}
              minTilesLevel={minTilesLevel}
              url={tilesUrl}
              onClick={layerClickHandler}
            />
          )}
        </React.Fragment>
      </MapContainer>
    );
  }, [
    activeLayerIndex,
    children,
    className,
    config,
    configChangeHandler,
    configMode,
    layerChangeHandler,
    layerClickHandler,
    map,
  ]);

  return MapElement;
});

MapComponent.displayName = 'MapComponent';
