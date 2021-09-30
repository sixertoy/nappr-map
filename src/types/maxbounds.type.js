import { shape } from 'prop-types';

import LatLngType from './latlng.type';

// [southWest, northEast]
const MaxBoundsType = shape({
  northEast: LatLngType,
  southWest: LatLngType,
});

export default MaxBoundsType;
