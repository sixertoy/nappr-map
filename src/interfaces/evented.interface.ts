import { LatLng, LatLngBounds, Map } from 'leaflet';

export interface MapDebuggable {
  center: LatLng;
  zoom: number;
  bounds: LatLngBounds;
}

export interface MapReadyEvent {
  map: Map;
  type: string;
}

export interface MapMouseEvent {
  type: 'click' | 'move';
  latlng: LatLng;
  layerid: number | undefined;
}
