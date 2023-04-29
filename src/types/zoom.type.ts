import { exact, number, oneOfType, string } from 'prop-types';

const ZoomType = exact({
  current: oneOfType([number, string]).isRequired,
  max: oneOfType([number, string]).isRequired,
  min: oneOfType([number, string]).isRequired,
});

export default ZoomType;
