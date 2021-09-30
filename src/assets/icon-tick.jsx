import PropTypes from 'prop-types';
import React from 'react';

import { ReactComponent as SVG } from './icon-tick.svg';

const TickIcon = React.memo(({ size }) => (
  <div
    style={{
      background: '#000000',
      borderRadius: 16,
      color: '#FFFFFF',
      fontSize: size,
      height: 20,
      width: 20,
    }}>
    <SVG />
  </div>
));

TickIcon.defaultProps = {
  size: 20,
};

TickIcon.propTypes = {
  size: PropTypes.number,
};

export default TickIcon;
