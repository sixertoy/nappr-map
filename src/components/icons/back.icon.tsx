import React from 'react';

import { MapIconBaseProps } from '../../interfaces';

export const MapBackIcon = React.memo(
  ({ size = 48, color = 'currentColor' }: MapIconBaseProps) => (
    <svg
      fill={color}
      height={size}
      stroke={color}
      strokeWidth="0"
      viewBox="0 0 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M328 112 184 256l144 144"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"></path>
    </svg>
  ),
);

MapBackIcon.displayName = 'MapBackIcon';
