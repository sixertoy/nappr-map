import { exact, number } from 'prop-types';

const ZoomType = exact({
  current: number.isRequired,
  max: number.isRequired,
  min: number.isRequired,
});

export default ZoomType;
