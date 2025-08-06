import L from 'leaflet';

import { MapBoundsType } from '../../types';

export const toLeafletBounds = (bounds: MapBoundsType | undefined) => {
  if (!bounds || !bounds.southWest || !bounds.northEast) {
    return undefined;
  }
  const { southWest, northEast } = bounds;
  const result = L.latLngBounds([
    L.latLng(southWest.lat, southWest.lng),
    L.latLng(northEast.lat, northEast.lng),
  ]);
  return result;
};
