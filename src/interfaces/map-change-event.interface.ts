import { Map } from 'leaflet';

import { MapEventTypes } from '../enums';
import { MapLatLngType } from '../types';
import { MapConfigInterface } from './map-config.interface';

export interface MapChangeEvent {
  type: MapEventTypes;
  latlng?: MapLatLngType;
  layerId: number;
  map: Map | null;
  config?: MapConfigInterface;
}
