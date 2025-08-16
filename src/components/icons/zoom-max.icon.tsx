import React from 'react';

import { MapIconBaseProps } from '../../interfaces';

export const MapZoomMaxIcon = React.memo(
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
      <path d="M15 13v4"></path>
      <path d="M13 15h4"></path>
      <path d="M15 15m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
      <path d="M22 22l-3 -3"></path>
      <path d="M6 18h-1a2 2 0 0 1 -2 -2v-1"></path>
      <path d="M3 11v-1"></path>
      <path d="M3 6v-1a2 2 0 0 1 2 -2h1"></path>
      <path d="M10 3h1"></path>
      <path d="M15 3h1a2 2 0 0 1 2 2v1"></path>
    </svg>
  ),
);

MapZoomMaxIcon.displayName = 'MapZoomMaxIcon';
