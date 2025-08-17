import React, { useCallback } from 'react';
import { useMap } from 'react-leaflet';

import { MapConfigInterface } from '../../../interfaces';
import { ConfigControlButton } from '../../buttons';
import { MapZoomCurrentIcon } from '../../icons';

interface ZoomCurrentControlProps {
  onChange: (data: Partial<MapConfigInterface>) => void;
}

export const ZoomCurrentControl = React.memo(
  ({ onChange }: ZoomCurrentControlProps) => {
    const leafleftMap = useMap();

    const clickHandler = useCallback(() => {
      const next = leafleftMap.getZoom();
      onChange({ zoom: { current: next } });
    }, [leafleftMap, onChange]);

    return (
      <div className={'leaflet-center leaflet-bottom'}>
        <ConfigControlButton
          icon={MapZoomCurrentIcon}
          size={24}
          style={{ marginLeft: -22, marginTop: -16 }}
          onClick={clickHandler}
        />
      </div>
    );
  },
);

ZoomCurrentControl.displayName = 'ZoomCurrentControl';
