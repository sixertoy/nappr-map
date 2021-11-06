import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { createUseStyles } from 'react-jss';
import { Marker, Tooltip } from 'react-leaflet';

import { LatLngType } from './types';

const useStyles = createUseStyles({
  tooltip: {
    '&.leaflet-tooltip-top::before': { borderTopColor: '#202630' },
    background: '#202630',
    borderColor: '#202630',
    color: '#FFFFFF',
  },
});

const GameMapMarkerComponent = React.memo(
  ({ background, color, icon: Icon, label, latlng, onClick, size, uid }) => {
    const classes = useStyles();

    const DOMString = useMemo(
      () =>
        ReactDOMServer.renderToString(
          <div className="is-relative" data-uid={uid}>
            <div className="is-absolute">
              <div
                className="marker-icon"
                style={{
                  background,
                  borderRadius: 14,
                  height: 28,
                  lineHeight: 3,
                  textAlign: 'center',
                  width: 28,
                }}>
                {Icon && <Icon color={color} size={size} />}
              </div>
            </div>
          </div>
        ),
      [background, size, color, uid]
    );

    const clickHandler = useCallback(() => {
      onClick({ type: 'marker', uid });
    }, [uid, onClick]);

    return (
      <Marker
        riseOnHover
        bubblingMouseEvents={false}
        eventHandlers={{ click: clickHandler }}
        icon={Leaflet.divIcon({
          className: 'leaflet-div-icon',
          html: DOMString,
        })}
        interactive={!!(onClick || label)}
        position={latlng}>
        {label && (
          <Tooltip
            className={classes.tooltip}
            direction="top"
            offset={[8, -12]}
            permanent={false}
            sticky={false}>
            {label}
          </Tooltip>
        )}
      </Marker>
    );
  }
);

GameMapMarkerComponent.defaultProps = {
  onClick: v => v,
  size: 14,
};

GameMapMarkerComponent.propTypes = {
  background: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  latlng: LatLngType.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.number,
  uid: PropTypes.string.isRequired,
};

GameMapMarkerComponent.displayName = 'GameMapMarkerComponent';

export default GameMapMarkerComponent;
