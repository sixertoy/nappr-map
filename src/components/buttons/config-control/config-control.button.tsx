import React from 'react';

import { MapIconType } from '../../../types';

interface ConfigControlButtonProps {
  onClick: () => void;
  icon?: MapIconType;
  size: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ConfigControlButton = React.memo(
  ({
    onClick,
    icon: Icon,
    size,
    className = 'leaflet-bar leaflet-control no-no-border',
    style,
  }: ConfigControlButtonProps) => (
    <div className={className} style={style}>
      <button aria-label="Map control" type="button" onClick={onClick}>
        {Icon && <Icon size={size} />}
      </button>
    </div>
  ),
);

ConfigControlButton.displayName = 'ConfigControlButton';
