import React from 'react';

import { MapIconBaseProps } from '../../interfaces';

export const MapZoomCurrentIcon = React.memo(
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
      <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
      <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
      <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
      <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
      <path d="M8 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
      <path d="M16 16l-2.5 -2.5"></path>
    </svg>
  ),
);

MapZoomCurrentIcon.displayName = 'MapZoomCurrentIcon';
