import { latLng, latLngBounds } from 'leaflet';
import React, { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

import { MapBoundsCorner } from '../../../enums';
import { MapConfigInterface } from '../../../interfaces';
import { MapBoundsType } from '../../../types';
import { ConfigControlButton } from '../../buttons';
import {
  LockIcon,
  MapUnlockNorthEastIcon,
  MapUnlockSouthWestIcon,
} from '../../icons';

interface BoundsControlProps {
  value?: MapBoundsType;
  onChange: (data: Partial<MapConfigInterface>) => void;
}

export const BoundsControl = React.memo(
  ({ value, onChange }: BoundsControlProps) => {
    const leafleftMap = useMap();

    const [bounds, setBounds] = useState<MapBoundsType>(() => value || {});

    const clickHandler = useCallback(
      (corner: MapBoundsCorner) => {
        const isNorthEast = corner === MapBoundsCorner.NORTH_EAST;

        const nextValue = isNorthEast
          ? leafleftMap.getBounds().getNorthEast()
          : leafleftMap.getBounds().getSouthWest();

        setBounds((prevBounds) => ({
          ...prevBounds,
          [corner]: bounds[corner] ? undefined : nextValue,
        }));
      },
      [bounds, leafleftMap],
    );

    useEffect(() => {
      const hasBounds = bounds.northEast && bounds.southWest;

      const nextMaxBounds = hasBounds
        ? latLngBounds([
            // eslint-ignore-next-line @typescript-eslint/no-non-null-assertion
            latLng(bounds.southWest!.lat, bounds.southWest!.lng),
            // eslint-ignore-next-line @typescript-eslint/no-non-null-assertion
            latLng(bounds.northEast!.lat, bounds.northEast!.lng),
          ])
        : undefined;
      leafleftMap.setMaxBounds(nextMaxBounds);

      const configBounds = hasBounds ? bounds : undefined;
      onChange({ bounds: configBounds });
    }, [bounds, leafleftMap, onChange]);

    const iconSouthWest = bounds.southWest ? LockIcon : MapUnlockSouthWestIcon;
    const iconNorthEast = bounds.northEast ? LockIcon : MapUnlockNorthEastIcon;
    return (
      <React.Fragment>
        <div className={'leaflet-left leaflet-bottom'}>
          <ConfigControlButton
            icon={iconSouthWest}
            size={32}
            onClick={() => clickHandler(MapBoundsCorner.SOUTH_WEST)}
          />
        </div>
        <div className={'leaflet-right leaflet-top'}>
          <ConfigControlButton
            icon={iconNorthEast}
            size={32}
            onClick={() => clickHandler(MapBoundsCorner.NORTH_EAST)}
          />
        </div>
      </React.Fragment>
    );
  },
);

BoundsControl.displayName = 'BoundsControl';
