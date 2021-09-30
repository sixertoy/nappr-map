/* eslint
  no-console: 0 */
import React, { useCallback, useRef } from 'react';
import { useMapEvent } from 'react-leaflet';

const MapDebuggerComponent = React.memo(() => {
  const timer = useRef(null);

  const onClick = useCallback(({ latlng }) => {
    console.log('/* --- onClick --------------------------------------');
    console.log('latlng', latlng);
    console.log('-------------------------------------------------- */');
  }, []);

  const onMoveEnd = useCallback(({ target: map }) => {
    timer.current = setTimeout(() => {
      const zoom = map.getZoom();
      const center = map.getCenter();
      const bounds = map.getBounds();
      console.log('/* --- onMoveEnd --------------------------------------');
      console.log('zoom', zoom);
      console.log('center', center);
      console.log('bounds', bounds);
      console.log('-------------------------------------------------- */');
    }, 500);
  }, []);

  const onMoveStart = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  useMapEvent('click', onClick);
  useMapEvent('moveend', onMoveEnd);
  useMapEvent('movestart', onMoveStart);

  return null;
});

MapDebuggerComponent.displayName = 'MapDebuggerComponent';

export default MapDebuggerComponent;
