import { Map } from 'leaflet';

import { MapEventTypes } from '../enums';
import { MapLatLngType } from '../types';

export interface MapChangeEvent {
  type: MapEventTypes;
  latlng?: MapLatLngType;
  layerId: number;
  map: Map | null;
}
