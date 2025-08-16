import {
  MapBoundsType,
  MapLatLngType,
  MapTilesType,
  MapZoomType,
} from '../types';

export type MapConfigInterface = {
  bounds?: MapBoundsType;
  center?: MapLatLngType;
  layers: string[];
  tiles: MapTilesType;
  zoom?: MapZoomType;
};
