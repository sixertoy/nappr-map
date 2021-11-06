import Leaflet, { LatLngLiteral } from 'leaflet';
import React, { useCallback, useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, Tooltip } from 'react-leaflet';

import { IconComponent } from '../icon';

interface MapMarkerComponentProps {
  background: string;
  color: string;
  icon: string;
  label: string;
  latlng: LatLngLiteral;
  onClick?: ({ type, uid }: { type: string; uid: string }) => void | undefined;
  size?: string | undefined;
  uid: string;
}

export const MapMarkerComponent: React.FC<MapMarkerComponentProps> = React.memo(
  ({
    background,
    color,
    icon,
    label,
    latlng,
    onClick,
    size,
    uid,
  }: MapMarkerComponentProps) => {
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
                {icon && (
                  <IconComponent icon={icon} iconProps={{ color, size }} />
                )}
              </div>
            </div>
          </div>
        ),
      [uid, background, icon, color, size]
    );

    const clickHandler = useCallback(() => {
      if (!onClick) return;
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
            className="nappr-map__tooltip"
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

MapMarkerComponent.defaultProps = {
  onClick: undefined,
  size: undefined,
};

MapMarkerComponent.displayName = 'MapMarkerComponent';
