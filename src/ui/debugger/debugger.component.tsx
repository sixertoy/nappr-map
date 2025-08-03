import { LatLng, Map } from 'leaflet';
import React, { useCallback, useRef } from 'react';
import { useMapEvent } from 'react-leaflet';

import { MapDebuggable } from '../../interfaces';
import { Timeout } from '../../types';

interface MapDebuggerComponentProps {
  onDebug?: ({ center, zoom, bounds }: MapDebuggable) => void;
}

export const MapDebuggerComponent =
  React.memo(({ onDebug = undefined }: MapDebuggerComponentProps) => {
    const timer = useRef<Timeout | undefined>(undefined);

    const onClick = useCallback(({ latlng }: { latlng: LatLng }) => {
       
      console.log('/* --- onClick --------------------------------------');
      console.log('latlng', latlng);
      console.log('-------------------------------------------------- */');
       
    }, []);

    const onMoveEnd = useCallback (
      ({ target }: { target: Map }) => {
        if (timer.current) return;
        timer.current = setTimeout (() => {
          const zoom = target.getZoom();
          const center = target.getCenter();
          const bounds = target.getBounds();
          if (onDebug) {
            onDebug({ bounds, center, zoom });
          } else {
             
            console.log('/* --- onMoveEnd -----------------------------');
            console.log('zoom', zoom);
            console.log('center', center);
            console.log('bounds', bounds);
            console.log('------------------------------------------- */');
             
          }
        }, 500);
      },
      [onDebug]
    );

    const onMoveStart = useCallback(() => {
      if (!timer || !timer.current) return;

      clearTimeout(timer.current);
    }, []);

    useMapEvent('click', onClick);
    useMapEvent('moveend', onMoveEnd);
    useMapEvent('movestart', onMoveStart);

    return null;
  });

MapDebuggerComponent.displayName = 'MapDebuggerComponent';
