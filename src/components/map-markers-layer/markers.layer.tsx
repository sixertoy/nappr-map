import React, { PropsWithChildren } from 'react';
import { LayerGroup } from 'react-leaflet';

export const MapMarkersLayer = React.memo(({ children }: PropsWithChildren) => (
  <LayerGroup>{children}</LayerGroup>
));

MapMarkersLayer.displayName = 'MapMarkersLayer';
