import { MapConfigInterface } from '../../interfaces';

export const mergeMapConfig = (
  base: MapConfigInterface,
  update: Partial<MapConfigInterface>,
) => {
  const { tiles, layers, center, bounds, zoom } = base;
  const { url, extension = 'png', maxLevel = 18, minLevel = 0 } = tiles;

  const nextBounds =
    update.bounds === null ? undefined : update.bounds || bounds;

  const zoomMax =
    update.zoom?.max === null ? undefined : update.zoom?.max || zoom?.max;

  const zoomMin =
    update.zoom?.min === null ? undefined : update.zoom?.max || zoom?.min;

  const zoomCurrent =
    update.zoom?.current === null
      ? undefined
      : update.zoom?.current || zoom?.current;

  const nextCenter =
    update.center === null ? { lat: -0.5, lng: 0.5 } : update.center || center;

  const mergedConfig: MapConfigInterface = {
    bounds: nextBounds,
    center: nextCenter,
    layers,
    tiles: {
      extension,
      maxLevel,
      minLevel,
      url,
    },
    zoom: {
      current: zoomCurrent,
      max: zoomMax,
      min: zoomMin,
    },
  };

  return mergedConfig;
};
