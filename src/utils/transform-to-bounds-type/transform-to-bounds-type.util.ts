import { LatLngBounds } from 'leaflet';

import { MapBoundsType } from '../../types';

export const transformToMapBoundsType = (
  bounds: LatLngBounds | undefined,
): MapBoundsType | undefined => {
  if (!bounds) {
    return undefined;
  }
  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();
  const result = {
    northEast: { lat: northEast.lat, lng: northEast.lng },
    southWest: { lat: southWest.lat, lng: southWest.lng },
  };
  return result;
};
