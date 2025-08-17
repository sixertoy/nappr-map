import React, { useCallback, useState } from 'react';
import { useMap } from 'react-leaflet';

import { MapConfigInterface } from '../../../interfaces';
import { MapIconType } from '../../../types';
import { ConfigControlButton } from '../../buttons';
import { LockIcon, MapZoomMinIcon } from '../../icons';

interface ZoomMinControlProps {
  value?: number;
  onChange: (data: Partial<MapConfigInterface>) => void;
}

export const ZoomMinControl = React.memo(
  ({ value, onChange }: ZoomMinControlProps) => {
    const leafleftMap = useMap();

    const [icon, setIcon] = useState<MapIconType>(() => {
      const next = value ? LockIcon : MapZoomMinIcon;
      return next;
    });

    const clickHandler = useCallback(() => {
      const value = leafleftMap.options.minZoom;
      const next = value ? undefined : leafleftMap.getZoom();
      const nextIcon = next ? LockIcon : MapZoomMinIcon;

      setIcon(nextIcon);
      onChange({ zoom: { min: next === undefined ? null : next } });
      leafleftMap.setMinZoom(next as number);
    }, [leafleftMap, onChange]);

    return (
      <div className={'leaflet-center leaflet-bottom'}>
        <ConfigControlButton
          icon={icon}
          size={24}
          style={{ marginLeft: -64, marginTop: -16 }}
          onClick={clickHandler}
        />
      </div>
    );
  },
);

ZoomMinControl.displayName = 'ZoomMinControl';
