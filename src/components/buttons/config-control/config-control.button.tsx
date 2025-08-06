import React from 'react';

interface ConfigControlButtonProps {
  onClick: () => void;
  icon: React.ComponentType<{ size: number }>;
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
        <Icon size={size} />
      </button>
    </div>
  ),
);

ConfigControlButton.displayName = 'ConfigControlButton';
