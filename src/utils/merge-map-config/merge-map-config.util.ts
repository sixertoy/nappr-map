import { MapConfigInterface } from '../../interfaces';

export const mergeMapConfig = (
  config: MapConfigInterface,
  update?: Partial<MapConfigInterface>,
) => {
  const mergedConfig: Partial<MapConfigInterface> = {
    bounds: {
      northEast: update?.bounds?.northEast || undefined,
      southWest: update?.bounds?.southWest || undefined,
    },
    center: update?.center || { lat: -0.5, lng: 0.5 },
    tiles: {
      extension: update?.tiles?.extension || 'png',
      maxLevel: update?.tiles?.maxLevel || 18,
      minLevel: update?.tiles?.minLevel || 0,
      url: update?.tiles?.url || '/titles/world',
    },
    zoom: {
      current: update?.zoom?.current || 9,
      max: config?.zoom?.max || 18,
      min: config?.zoom?.min || 0,
    },
  };

  return mergedConfig;
};
