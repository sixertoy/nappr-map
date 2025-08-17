import Leaflet from 'leaflet';
import React, { useEffect, useRef } from 'react';

import { MapConfigInterface } from '../../interfaces';
import {
  BoundsControl,
  CenterControl,
  ZoomCurrentControl,
  ZoomMaxControl,
  ZoomMinControl,
} from '../config-controls';

interface MapConfigLayerProps {
  config: MapConfigInterface;
  onChange: (data: Partial<MapConfigInterface>) => void;
}

export const MapConfigLayer = React.memo(
  ({ onChange, config }: MapConfigLayerProps) => {
    const mountedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const element = mountedRef.current;
      if (element) {
        Leaflet.DomEvent.disableClickPropagation(element);
        Leaflet.DomEvent.disableScrollPropagation(element);
      }
    }, []);

    const boundsValue = config.bounds || undefined;
    const minZoomValue = config.zoom?.min || undefined;
    const maxZoomValue = config.zoom?.max || undefined;
    return (
      <div ref={mountedRef} className="leaflet-control-container">
        <CenterControl onChange={onChange} />
        <ZoomCurrentControl onChange={onChange} />
        <ZoomMinControl value={minZoomValue} onChange={onChange} />
        <ZoomMaxControl value={maxZoomValue} onChange={onChange} />
        <BoundsControl value={boundsValue} onChange={onChange} />
      </div>
    );
  },
);

MapConfigLayer.displayName = 'MapConfigLayer';
