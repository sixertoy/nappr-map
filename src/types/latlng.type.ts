import { oneOfType } from 'prop-types';

import { PointArrayType, PointShapeType } from './point.type';

const LatLngType = oneOfType([PointArrayType, PointShapeType]);

export default LatLngType;
