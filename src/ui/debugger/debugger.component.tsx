import { LatLng, Map } from 'leaflet';
import React, { useCallback, useRef } from 'react';
import { useMapEvent } from 'react-leaflet';

import { Debuggable } from '../../interfaces';

interface MapDebuggerComponentProps {
  onDebug?: ({ center, zoom, bounds }: Debuggable) => void;
}

export const MapDebuggerComponent: React.FC<MapDebuggerComponentProps> =
  React.memo(({ onDebug }: MapDebuggerComponentProps) => {
    const timer = useRef<NodeJS.Timeout | undefined>(undefined);

    const onClick = useCallback(({ latlng }: { latlng: LatLng }) => {
      /* eslint-disable */
      console.log('/* --- onClick --------------------------------------');
      console.log('latlng', latlng);
      console.log('-------------------------------------------------- */');
      /* eslint-enable */
    }, []);

    const onMoveEnd = useCallback(
      ({ target }: { target: Map }) => {
        if (timer.current) return;
        timer.current = setTimeout(() => {
          const zoom = target.getZoom();
          const center = target.getCenter();
          const bounds = target.getBounds();
          if (onDebug) {
            onDebug({ bounds, center, zoom });
          } else {
            /* eslint-disable */
            console.log('/* --- onMoveEnd -----------------------------');
            console.log('zoom', zoom);
            console.log('center', center);
            console.log('bounds', bounds);
            console.log('------------------------------------------- */');
            /* eslint-enable */
          }
        }, 500);
      },
      [onDebug]
    );

    const onMoveStart = useCallback(() => {
      if (!timer || !timer.current) return;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      clearTimeout(timer.current);
    }, []);

    useMapEvent('click', onClick);
    useMapEvent('moveend', onMoveEnd);
    useMapEvent('movestart', onMoveStart);

    return null;
  });

MapDebuggerComponent.defaultProps = {
  onDebug: undefined,
};

MapDebuggerComponent.displayName = 'MapDebuggerComponent';
