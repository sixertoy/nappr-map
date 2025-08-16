import type { MapBoundsType, MapLatLngType, MapZoomType } from '../interfaces';

export type MapConfigInterface = {
  bounds?: MapBoundsType;
  center?: MapLatLngType;
  layers: string[];
  tiles: {
    extension?: string;
    url: string;
  };
  zoom?: MapZoomType;
};
