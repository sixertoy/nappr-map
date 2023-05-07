import './map.scss';

import Leaflet, { Map } from 'leaflet';
import React, { useCallback, useMemo, useRef } from 'react';
import { MapContainer, ZoomControl } from 'react-leaflet';

import { MapLayersProvider } from '../../contexts';
import { Bounds, Center, Debuggable, ReadyEvent, Zoom } from '../../interfaces';
import { MapDebuggerComponent } from '../debugger';
import { MapLayersComponent } from '../layers/layers.component';

interface MapComponentProps {
  bounds?: Bounds;
  center: Center;
  className?: string;
  defaultLayer?: number;
  layers: string[] | string | never;
  onDebug?: ({ bounds, center, zoom }: Debuggable) => void;
  onReady?: (evt: ReadyEvent) => void;
  tilesExtension?: string;
  tilesURL: string | never;
  zoom: Zoom;
}

export const MapComponent: React.FC<MapComponentProps> = React.memo(
  (props: MapComponentProps) => {
    const leafletMap = useRef<Map | null>(null);

    const {
      bounds,
      center,
      className,
      defaultLayer,
      layers,
      onDebug,
      onReady,
      tilesExtension,
      tilesURL,
      zoom,
    } = props;

    const mapReadyHandler = useCallback(() => {
      if (onReady) {
        onReady({ map: leafletMap.current, type: 'ready' });
      }
    }, [onReady]);

    const onClick = useCallback(() => {
      // console.log('toto');
    }, []);

    const MapElement = useMemo(() => {
      const classname = `nappr-map__container ${className || ''}`.trim();
      return (
        <MapContainer
          ref={leafletMap}
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
            layers={layers}
            tilesExtension={tilesExtension}
            tilesURL={tilesURL}>
            <MapLayersComponent onClick={onClick} />
            {/* {children && <LayerGroup>{children}</LayerGroup>} */}
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
      tilesExtension,
      tilesURL,
      zoom,
    ]);

    return MapElement;
  }
);

MapComponent.defaultProps = {
  bounds: undefined,
  className: undefined,
  defaultLayer: undefined,
  onDebug: undefined,
  onReady: undefined,
  tilesExtension: undefined,
};

MapComponent.displayName = 'MapComponent';
