import PropTypes from 'prop-types';
import React from 'react';

import { LayersContext } from './layers-context';

const LayersConsumer = ({ children }) => (
  <LayersContext.Consumer>{state => children(state)}</LayersContext.Consumer>
);

LayersConsumer.propTypes = {
  children: PropTypes.func.isRequired,
};

LayersConsumer.displayName = 'LayersConsumer';

export default LayersConsumer;
