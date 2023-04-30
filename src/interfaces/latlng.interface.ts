import { LatLngLiteral } from 'leaflet';

export type LatLng = LatLngLiteral;

export type Center = LatLng;

export type Bounds = {
  northEast: LatLng;
  southWest: LatLng;
};
