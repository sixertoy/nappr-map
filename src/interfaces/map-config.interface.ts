import {
  MapBoundsType,
  MapLatLngType,
  MapTilesType,
  MapZoomType,
} from '../types';

export type MapConfigInterface = {
  bounds?: MapBoundsType | null;
  center?: MapLatLngType | null;
  layers: string[];
  tiles: MapTilesType;
  zoom?: MapZoomType | null;
};
