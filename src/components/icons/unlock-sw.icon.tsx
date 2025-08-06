import React from 'react';

import { MapIconBaseProps } from '../../types';

export const MapUnlockSouthWestIcon = React.memo(
  ({ size = 48, color = 'currentColor' }: MapIconBaseProps) => (
    <svg
      fill="none"
      height={size}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5v8h8"></path>
      <path d="M7 9v8h8"></path>
    </svg>
  ),
);

MapUnlockSouthWestIcon.displayName = 'MapUnlockSouthWestIcon';
