import { LatLng, LatLngBounds } from 'leaflet';

export interface MapDebuggable {
  center: LatLng;
  zoom: number;
  bounds: LatLngBounds;
}
