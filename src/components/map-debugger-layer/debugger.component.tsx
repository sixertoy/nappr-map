import { LeafletMouseEvent, Map } from 'leaflet';
import { useCallback, useRef } from 'react';
import { useMapEvents } from 'react-leaflet';

import { TimeoutType } from '../../types';

export const MapDebuggerLayer = () => {
  const timer = useRef<TimeoutType | undefined>(undefined);

  const onDebugClick = useCallback(({ latlng }: LeafletMouseEvent) => {
    console.log('/* --- onClick --------------------------------------');
    console.log('MapComponent debug event => ', { latlng });
    console.log('-------------------------------------------------- */');
  }, []);

  const onDebugMoveEnd = useCallback(({ target }: { target: Map }) => {
    if (timer.current) {
      return;
    }
    timer.current = setTimeout(() => {
      const zoom = target.getZoom();
      const center = target.getCenter();
      const bounds = target.getBounds();
      console.log('/* --- onMoveEnd -----------------------------');
      console.log('MapComponent debug event => ', {
        bounds,
        center,
        zoom,
      });
      console.log('------------------------------------------- */');
    }, 500);
  }, []);

  const onDebugMoveStart = useCallback(() => {
    if (timer && timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  useMapEvents({
    click: onDebugClick,
    moveend: onDebugMoveEnd,
    movestart: onDebugMoveStart,
  });

  return null;
};

MapDebuggerLayer.displayName = 'MapDebuggerLayer';
