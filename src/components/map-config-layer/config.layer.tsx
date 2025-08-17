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

    return (
      <div ref={mountedRef} className="leaflet-control-container">
        <CenterControl onChange={onChange} />
        <ZoomMinControl value={config.zoom?.min} onChange={onChange} />
        <ZoomMaxControl value={config.zoom?.max} onChange={onChange} />
        <ZoomCurrentControl onChange={onChange} />
        <BoundsControl value={config.bounds} onChange={onChange} />
      </div>
    );
  },
);

MapConfigLayer.displayName = 'MapConfigLayer';
