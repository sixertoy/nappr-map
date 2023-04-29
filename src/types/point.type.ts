import { arrayOf, exact, number } from 'prop-types';

export const PointArrayType = arrayOf(number);

export const PointShapeType = exact({
  lat: number.isRequired,
  lng: number.isRequired,
});
