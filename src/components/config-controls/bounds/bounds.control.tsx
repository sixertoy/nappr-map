import { latLng, latLngBounds } from 'leaflet';
import React, { useCallback, useState } from 'react';
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
        const cornerValue = isNorthEast
          ? leafleftMap.getBounds().getNorthEast()
          : leafleftMap.getBounds().getSouthWest();

        const nextBounds = {
          ...bounds,
          [corner]: bounds[corner] ? undefined : cornerValue,
        };

        const hasCorners = nextBounds.northEast && nextBounds.southWest;

        const nextMaxBounds = hasCorners
          ? latLngBounds([
              latLng(nextBounds.southWest!.lat, nextBounds.southWest!.lng),
              latLng(nextBounds.northEast!.lat, nextBounds.northEast!.lng),
            ])
          : undefined;

        setBounds(nextBounds);
        onChange({ bounds: hasCorners ? nextBounds : null });
        leafleftMap.setMaxBounds(nextMaxBounds);
      },
      [leafleftMap, bounds, onChange],
    );

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
