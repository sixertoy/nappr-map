import PropTypes from 'prop-types';
import React from 'react';

import { ReactComponent as SVG } from './icon-close.svg';

const CloseIcon = React.memo(({ size }) => (
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

CloseIcon.defaultProps = {
  size: 20,
};

CloseIcon.propTypes = {
  size: PropTypes.number,
};

export default CloseIcon;
