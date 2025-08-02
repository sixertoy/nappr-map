import Leaflet, { Map } from 'leaflet';
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { LayerGroup, MapContainer, ZoomControl } from 'react-leaflet';

import { MapLayersProvider } from '../../contexts';
import { Bounds, Center, Debuggable, MapMouseEvent, ReadyEvent, Zoom } from '../../interfaces';
import { MapDebuggerComponent } from '../debugger';
import { MapLayersComponent } from '../layers/layers.component';

interface MapComponentProps extends PropsWithChildren {
  bounds?: Bounds;
  center: Center;
  className?: string;
  defaultLayer?: number;
  layers: string[] | string;
  onDebug?: ({ bounds, center, zoom }: Debuggable) => void;
  onLayerChange?: (layer: string) => void;
  onReady?: (evt: ReadyEvent) => void;
  tilesExtension?: string;
  tilesURL: string;
  zoom: Zoom;
  onClick: (evt: MapMouseEvent) => void;
}

export const MapComponent = React.memo(
  (props: MapComponentProps) => {
    const [map, setMap] = useState<Map | null>(null)

    const {
      bounds,
      center,
      className,
      defaultLayer,
      children,
      layers,
      onDebug,
      onReady,
      onClick,
      tilesExtension,
      tilesURL,
      onLayerChange,
      zoom,
    } = props;

    const mapReadyHandler = useCallback(() => {
      if (onReady) {
        onReady({ map, type: 'ready' });
      }
    }, [map, onReady]);

    const MapElement = useMemo(() => {
      const mapLayers = Array.isArray(layers) ? layers : [layers];
      const classname = `nappr-map__container ${className || ''}`.trim();
      return (
        <MapContainer
          ref={setMap}
          scrollWheelZoom
          attributionControl={false}
          bounceAtZoomLimits={false}
          center={center}
          className={classname}
          crs={Leaflet.CRS.Simple}
          doubleClickZoom={false}
          maxBounds={bounds}
          maxZoom={zoom.max}
          minZoom={zoom.min}
          wheelPxPerZoomLevel={256}
          whenReady={mapReadyHandler}
          zoom={zoom.current}
          zoomControl={false}>
          {onDebug && <MapDebuggerComponent onDebug={onDebug} />}
          <MapLayersProvider
            activeLayer={defaultLayer}
            layers={mapLayers}
            tilesExtension={tilesExtension}
            tilesURL={tilesURL}
            onChange={onLayerChange}>
            <React.Fragment>
              <MapLayersComponent onClick={onClick} />
              {children && <LayerGroup>{children}</LayerGroup>}
            </React.Fragment>
          </MapLayersProvider>
          <ZoomControl position="topright" />
          {/* draft && (
            <LayerGroup>
              <DraftMarker latlng={draft} />
            </LayerGroup>
          ) */}
        </MapContainer>
      );
    }, [
      bounds,
      center,
      className,
      defaultLayer,
      layers,
      mapReadyHandler,
      onClick,
      onDebug,
      children,
      tilesExtension,
      tilesURL,
      zoom,
    ]);

    return MapElement;
  }
);

MapComponent.displayName = 'MapComponent';
