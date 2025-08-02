# NAPPR MAP

Leaflet Interactive React Map

## Install

```bash
yarn add @nappr/map
```

## Usage

```javascript
import '@nappr/map/dist/styles.css';

import { MapComponent } from '@nappr/map';
import { AttributionControl } from 'react-leaflet';

<div
  style={{
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    right: 0,
  }}>
  <MapComponent
    layers=""
    tilesURL=""
    onChange={() => {}}
    bounds={{
      southWest: { lat: 0.0373687744140625, lng: 0.9693903923034668 },
      northEast: { lat: -1.0303115844726562, lng: 0.018140316009521484 },
    }}
    center={{ lat: 0, lng: 0 }}
    zoom={{ min: 0, max: 13, current: 8 }}>
    <AttributionControl
      position="bottomleft"
      prefix={`Smart Maps | ${title} v${version}`}
    />
  </MapComponent>
</div>;
```
