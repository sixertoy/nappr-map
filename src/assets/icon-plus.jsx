import PropTypes from 'prop-types';
import React from 'react';

import { ReactComponent as SVG } from './icon-plus.svg';

const PlusIcon = React.memo(({ size }) => (
  <div
    style={{
      background: '#000000',
      borderRadius: 16,
      color: '#FFFFFF',
      fontSize: size,
      height: 20,
      left: -4,
      position: 'absolute',
      top: -4,
      width: 20,
    }}>
    <SVG />
  </div>
));

PlusIcon.defaultProps = {
  size: 20,
};

PlusIcon.propTypes = {
  size: PropTypes.number,
};

export default PlusIcon;
