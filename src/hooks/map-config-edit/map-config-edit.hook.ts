import { useCallback } from 'react';
import { useMap } from 'react-leaflet';

import { MapConfigInterface } from '../../interfaces';

interface UseMapConfigEditProps {
  config: MapConfigInterface;
  onConfigChange: (data: MapConfigInterface) => void;
}

export const useMapConfigLayer = ({
  config,
  onConfigChange,
}: UseMapConfigEditProps) => {
  const map = useMap();

  const clickCenterHandler = useCallback(() => {
    const next = config.center ? { lat: -0.5, lng: 0.5 } : map.getCenter();
    onConfigChange({
      ...config,
      center: next,
    });
  }, [config, map, onConfigChange]);

  const clickSouthWestHandler = useCallback(() => {
    const next = config.bounds?.southWest
      ? undefined
      : map.getBounds().getSouthWest();
    onConfigChange({
      ...config,
      bounds: {
        ...(config.bounds || {}),
        southWest: next,
      },
    });
  }, [config, map, onConfigChange]);

  const clickNorthEastHandler = useCallback(() => {
    const next = config.bounds?.northEast
      ? undefined
      : map.getBounds().getNorthEast();
    onConfigChange({
      ...config,
      bounds: {
        ...(config.bounds || {}),
        northEast: next,
      },
    });
  }, [config, map, onConfigChange]);

  const clickZoomMinHandler = useCallback(() => {
    const next = config.zoom?.min ? undefined : map.getZoom();
    onConfigChange({
      ...config,
      zoom: {
        ...(config.zoom || {}),
        min: next,
      },
    });
  }, [config, map, onConfigChange]);

  const clickZoomMaxHandler = useCallback(() => {
    const next = config.zoom?.max ? undefined : map.getZoom();
    onConfigChange({
      ...config,
      zoom: {
        ...(config.zoom || {}),
        max: next,
      },
    });
  }, [config, map, onConfigChange]);

  const clickZoomCurrentHandler = useCallback(() => {
    const next = config.zoom?.current ? undefined : map.getZoom();
    onConfigChange({
      ...config,
      zoom: {
        ...(config.zoom || {}),
        current: next,
      },
    });
  }, [config, map, onConfigChange]);

  return {
    clickCenterHandler,
    clickNorthEastHandler,
    clickSouthWestHandler,
    clickZoomCurrentHandler,
    clickZoomMaxHandler,
    clickZoomMinHandler,
  };
};
