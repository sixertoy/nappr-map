import Leaflet, { Map } from 'leaflet';
import { LatLngBoundsExpression, LatLngLiteral } from 'leaflet';
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { LayerGroup, MapContainer, ZoomControl } from 'react-leaflet';

import { MapLayersProvider } from '../../contexts';
import {MapDebuggable, MapMouseEvent, MapReadyEvent, Zoom } from '../../interfaces';
import { MapDebuggerComponent } from '../debugger';
import { MapLayersComponent } from '../layers/layers.component';

interface MapComponentProps extends PropsWithChildren {
  bounds?: LatLngBoundsExpression | undefined;
  center: LatLngLiteral;
  className?: string;
  defaultLayer?: number;
  layers: string[] | string;
  onDebug?: ({ bounds, center, zoom }: MapDebuggable) => void;
  onLayerChange?: (layer: string) => void;
  onReady?: (evt: MapReadyEvent) => void;
  tilesExtension?: string;
  tilesURL: string;
  zoom: Zoom;
  onClick?: (evt: MapMouseEvent) => void;
}

export const MapComponent = React.memo(
  (props: MapComponentProps) => {
    const initialized = useRef(false);

    const [map, setMap] = useState<Map | null>(null)

    const {
      bounds = undefined,
      center,
      className = undefined,
      defaultLayer = undefined,
      children,
      layers,
      onDebug = undefined,
      onReady = undefined,
      onClick = undefined,
      tilesExtension = undefined,
      tilesURL,
      onLayerChange = undefined,
      zoom,
    } = props;

    useEffect(() => {
      if(map && onReady && !initialized.current) {
        initialized.current = true;
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
    },
    [
      bounds,
      center,
      children,
      className,
      defaultLayer,
      layers,
      onClick,
      onDebug,
      onLayerChange,
      tilesExtension,
      tilesURL,
      zoom
    ]);

    return MapElement;
  }
);

MapComponent.displayName = 'MapComponent';
