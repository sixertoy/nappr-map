import Leaflet from 'leaflet';
import React, { useEffect, useMemo, useRef } from 'react';

import { useMapConfigLayer } from '../../hooks';
import { MapConfigInterface } from '../../interfaces';
import { ConfigControlButton } from '../buttons';
import { ConfigControlWrapper } from '../config-control-wrapper';
import {
  LockIcon,
  MapCenterIcon,
  MapUnlockNorthEastIcon,
  MapUnlockSouthWestIcon,
  MapZoomCurrentIcon,
  MapZoomMaxIcon,
  MapZoomMinIcon,
} from '../icons';

interface MapConfigLayerProps {
  config: MapConfigInterface;
  onConfigChange: (data: MapConfigInterface) => void;
}

export const MapConfigLayer = React.memo(
  ({ onConfigChange, config }: MapConfigLayerProps) => {
    const mountedRef = useRef<HTMLDivElement>(null);

    const {
      clickNorthEastHandler,
      clickZoomMinHandler,
      clickZoomMaxHandler,
      clickCenterHandler,
      clickZoomCurrentHandler,
      clickSouthWestHandler,
    } = useMapConfigLayer({
      config,
      onConfigChange,
    });

    // Memoize icon selection to avoid recalculation
    const icons = useMemo(
      () => ({
        NorthEast: config.bounds?.northEast ? LockIcon : MapUnlockNorthEastIcon,
        SouthWest: config.bounds?.southWest ? LockIcon : MapUnlockSouthWestIcon,
        ZoomMax: config.zoom?.max === undefined ? MapZoomMaxIcon : LockIcon,
        ZoomMin: config.zoom?.min === undefined ? MapZoomMinIcon : LockIcon,
      }),
      [
        config.bounds?.southWest,
        config.bounds?.northEast,
        config.zoom?.min,
        config.zoom?.max,
      ],
    );

    // Memoize control configurations
    const controls = useMemo(
      () => [
        {
          icon: icons.ZoomMin,
          key: 'zoom-min',
          onClick: clickZoomMinHandler,
          size: 24,
          style: { marginLeft: -64, marginTop: -16 },
          wrapper: 'leaflet-center leaflet-bottom',
        },
        {
          icon: MapZoomCurrentIcon,
          key: 'zoom-current',
          onClick: clickZoomCurrentHandler,
          size: 24,
          style: { marginLeft: -22, marginTop: -16 },
          wrapper: 'leaflet-center leaflet-bottom',
        },
        {
          icon: icons.ZoomMax,
          key: 'zoom-max',
          onClick: clickZoomMaxHandler,
          size: 24,
          style: { marginLeft: 20, marginTop: -16 },
          wrapper: 'leaflet-center leaflet-bottom',
        },
        {
          icon: MapCenterIcon,
          key: 'center',
          onClick: clickCenterHandler,
          size: 32,
          style: { marginLeft: -26, marginTop: -18 },
          wrapper: 'leaflet-center leaflet-middle',
        },
        {
          icon: icons.SouthWest,
          key: 'southwest',
          onClick: clickSouthWestHandler,
          size: 32,
          style: undefined,
          wrapper: 'leaflet-bottom leaflet-left',
        },
        {
          icon: icons.NorthEast,
          key: 'northeast',
          onClick: clickNorthEastHandler,
          size: 32,
          style: undefined,
          wrapper: 'leaflet-top leaflet-right',
        },
      ],
      [
        icons,
        clickZoomMinHandler,
        clickZoomCurrentHandler,
        clickZoomMaxHandler,
        clickCenterHandler,
        clickSouthWestHandler,
        clickNorthEastHandler,
      ],
    );

    useEffect(() => {
      const element = mountedRef.current;
      if (element) {
        Leaflet.DomEvent.disableClickPropagation(element);
        Leaflet.DomEvent.disableScrollPropagation(element);
      }
    }, []);

    return (
      <div ref={mountedRef} className="leaflet-control-container">
        {controls.map(({ key, wrapper, onClick, icon, size, style }) => (
          <ConfigControlWrapper key={key} className={wrapper}>
            <ConfigControlButton
              icon={icon}
              size={size}
              style={style}
              onClick={onClick}
            />
          </ConfigControlWrapper>
        ))}
      </div>
    );
  },
);

MapConfigLayer.displayName = 'MapConfigLayer';
