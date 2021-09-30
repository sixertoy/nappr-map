import { exact, shape } from 'prop-types';

import LatLngType from './latlng.type';
import MaxBoundsType from './maxbounds.type';
import ZoomType from './zoom.type';

const MapType = exact({
  center: LatLngType.isRequired,
  maxBounds: MaxBoundsType.isRequired,
  tiles: shape().isRequired,
  zoom: ZoomType.isRequired,
});

export default MapType;
