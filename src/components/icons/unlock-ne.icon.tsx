import React from 'react';

import { MapIconBaseProps } from '../../types';

export const MapUnlockNorthEastIcon = React.memo(
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
      <path d="M9 7h8v8"></path>
      <path d="M5 11h8v8"></path>
    </svg>
  ),
);

MapUnlockNorthEastIcon.displayName = 'MapUnlockNorthEastIcon';
