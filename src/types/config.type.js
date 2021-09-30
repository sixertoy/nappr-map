import { arrayOf, exact, string } from 'prop-types';

import MaxBoundsType from './maxbounds.type';
import { PointShapeType } from './point.type';
import ZoomType from './zoom.type';

const ConfigType = exact({
  bounds: MaxBoundsType.isRequired,
  center: PointShapeType.isRequired,
  layers: arrayOf(string).isRequired,
  tilesurl: string.isRequired,
  zoom: ZoomType.isRequired,
});

export default ConfigType;
