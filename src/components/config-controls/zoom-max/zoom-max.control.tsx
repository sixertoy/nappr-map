import React, { useCallback, useState } from 'react';
import { useMap } from 'react-leaflet';

import { MapConfigInterface } from '../../../interfaces';
import { MapIconType } from '../../../types';
import { ConfigControlButton } from '../../buttons';
import { LockIcon, MapZoomMaxIcon } from '../../icons';

interface ZoomMaxControlProps {
  value?: number;
  onChange: (data: Partial<MapConfigInterface>) => void;
}

export const ZoomMaxControl = React.memo(
  ({ value, onChange }: ZoomMaxControlProps) => {
    const leafleftMap = useMap();

    const [icon, setIcon] = useState<MapIconType>(() => {
      const next = value ? LockIcon : MapZoomMaxIcon;
      return next;
    });

    const clickHandler = useCallback(() => {
      const max = leafleftMap.options.maxZoom;
      const next = max ? undefined : leafleftMap.getZoom();
      const nextIcon = next ? LockIcon : MapZoomMaxIcon;

      setIcon(nextIcon);
      onChange({ zoom: { max: next } });
      leafleftMap.setMaxZoom(next as number);
    }, [leafleftMap, onChange]);

    return (
      <div className={'leaflet-center leaflet-bottom'}>
        <ConfigControlButton
          icon={icon}
          size={24}
          style={{ marginLeft: 20, marginTop: -16 }}
          onClick={clickHandler}
        />
      </div>
    );
  },
);

ZoomMaxControl.displayName = 'ZoomMaxControl';
