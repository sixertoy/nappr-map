import { exact, string } from 'prop-types';

import LatLngType from './latlng.type';

const MarkerType = exact({
  category: string,
  label: string,
  latlng: LatLngType.isRequired,
  // point: shape({ x: number, y: number }),
  region: string,
  uid: string.isRequired,
});

export default MarkerType;
