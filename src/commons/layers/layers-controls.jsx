import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  IoChevronBack as LeftIcon,
  IoClose as CloseIcon,
} from 'react-icons/io5';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const MapLayersControlsComponent = React.memo(
  ({ active, layers, onChange, position, tilesurl }) => {
    const mounted = useRef(false);
    const [visibility, setVisibility] = useState(false);

    const layerHandler = useCallback(
      layerid => {
        const index = layers.indexOf(layerid);
        setVisibility(false);
        onChange(index);
      },
      [layers, onChange, setVisibility]
    );

    useEffect(() => {
      if (mounted.current) {
        Leaflet.DomEvent.disableClickPropagation(mounted.current);
        Leaflet.DomEvent.disableScrollPropagation(mounted.current);
      }
    }, []);

    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
    return (
      <div className="leaflet-control-container">
        <div ref={mounted} className={positionClass}>
          <div className="leaflet-bar leaflet-control no-no-border">
            <div className="flex-columns">
              <button
                className="is-block p3 mx3"
                type="button"
                onClick={() => setVisibility(!visibility)}>
                {visibility && <CloseIcon color="#FFFFFF" size={24} />}
                {!visibility && <LeftIcon color="#FFFFFF" size={24} />}
              </button>
              {visibility &&
                layers
                  .filter((k, index) => active !== index)
                  .map(layerid => (
                    <button
                      key={layerid}
                      className="is-block p3 mx3"
                      style={{
                        background: '#FFFFFF',
                        border: 0,
                        borderRadius: 2,
                      }}
                      type="button"
                      onClick={() => layerHandler(layerid)}>
                      <picture>
                        <source
                          srcSet={`${tilesurl}/${layerid}-thumb.jpg`}
                          type="image/jpg"
                        />
                        <img
                          alt=""
                          className="is-block"
                          height={32}
                          src={`${tilesurl}/${layerid}-thumb.png`}
                          width={32}
                        />
                      </picture>
                    </button>
                  ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MapLayersControlsComponent.propTypes = {
  active: PropTypes.number.isRequired,
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  position: PropTypes.oneOf([
    'bottomleft',
    'bottomright',
    'topleft',
    'topright',
  ]).isRequired,
  tilesurl: PropTypes.string.isRequired,
};

MapLayersControlsComponent.displayName = 'MapLayersControlsComponent';

export default MapLayersControlsComponent;
