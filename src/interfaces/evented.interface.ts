import { LatLng, LatLngBounds, Map } from 'leaflet';

export interface Debuggable {
  center: LatLng;
  zoom: number;
  bounds: LatLngBounds;
}

export interface ReadyEvent {
  map: Map | null;
  type: string;
}

export interface MapMouseEvent {
  type: 'click' | 'move';
  latlng: LatLng;
  layerid: number | undefined;
}
