import React, { useCallback } from 'react';
import { useMap } from 'react-leaflet';

import { MapConfigInterface } from '../../../interfaces';
import { ConfigControlButton } from '../../buttons';
import { MapCenterIcon } from '../../icons';

interface CenterControlProps {
  onChange: (data: Partial<MapConfigInterface>) => void;
}

export const CenterControl = React.memo(({ onChange }: CenterControlProps) => {
  const leafleftMap = useMap();

  const clickHandler = useCallback(() => {
    const next = leafleftMap.getCenter();
    onChange({ center: next });
    leafleftMap.setView(next, leafleftMap.getZoom());
  }, [leafleftMap, onChange]);

  return (
    <div className={'leaflet-center leaflet-middle'}>
      <ConfigControlButton
        icon={MapCenterIcon}
        size={32}
        style={{ marginLeft: -26, marginTop: -18 }}
        onClick={clickHandler}
      />
    </div>
  );
});

CenterControl.displayName = 'CenterControl';
