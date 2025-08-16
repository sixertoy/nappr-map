import React from 'react';

import { MapIconBaseProps } from '../../types';

export const MapCloseIcon = React.memo(
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
        d="M368 368 144 144m224 0L144 368"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"></path>
    </svg>
  ),
);

MapCloseIcon.displayName = 'MapCloseIcon';
