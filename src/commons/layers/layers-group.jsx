import PropTypes from 'prop-types';
import React from 'react';
import { LayerGroup, TileLayer, useMapEvent } from 'react-leaflet';

const MapLayersGroupComponent = React.memo(
  ({ active, extension, layers, onClick, tilesurl }) => {
    useMapEvent('click', onClick);
    return (
      <LayerGroup>
        {layers
          .filter((k, index) => active === index)
          .map(layerid => (
            <TileLayer
              key={layerid}
              errorTileUrl="/tiles/blank.png"
              tileSize={256}
              url={`${tilesurl}/${layerid}/{z}/{x}_{y}.${extension}`}
            />
          ))}
      </LayerGroup>
    );
  }
);

MapLayersGroupComponent.propTypes = {
  active: PropTypes.number.isRequired,
  extension: PropTypes.string.isRequired,
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  tilesurl: PropTypes.string.isRequired,
};

MapLayersGroupComponent.displayName = 'MapLayersGroupComponent';

export default MapLayersGroupComponent;
