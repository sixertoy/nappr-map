import { LatLng, LeafletMouseEvent, Map } from 'leaflet';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { MapEventTypes } from '../../enums';
import { MapChangeEvent, MapConfigInterface } from '../../interfaces';
import { toLeafletBounds } from '../../utils';

interface UseMapConfigProps {
  config: RefObject<MapConfigInterface>;
  onMapChange?: (evt: MapChangeEvent) => void;
}

export const useMapConfig = ({ config, onMapChange }: UseMapConfigProps) => {
  const initialized = useRef(false);

  const map = useRef<Map | null>(null);

  const [mapConfig, setMapConfig] = useState<MapConfigInterface>({
    bounds: config.current?.bounds,
    center: config.current?.center,
    layers: config.current.layers,
    tiles: {
      extension: config.current.tiles?.extension || 'png',
      url: config.current.tiles.url,
    },
    zoom: {
      current: config.current?.zoom?.current,
      max: config.current?.zoom?.max,
      min: config.current?.zoom?.min,
    },
  });

  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);

  const onMapConfigChange = useCallback(
    (data: MapConfigInterface) => {
      if (data.bounds) {
        const maxBounds = toLeafletBounds(data.bounds);
        map.current?.setMaxBounds(maxBounds);
      }

      map.current?.setMinZoom(data.zoom?.min || 0);
      map.current?.setMaxZoom(data.zoom?.max || 18);

      config.current = data;
      setMapConfig(data);
    },
    [config],
  );

  const mapChangeHandler = useCallback(
    (type: MapEventTypes, latlng?: LatLng) => {
      if (onMapChange) {
        onMapChange({
          latlng: latlng || map.current?.getCenter(),
          layerId: activeLayerIndex,
          map: map.current,
          type,
        });
      }
    },
    [activeLayerIndex, map, onMapChange],
  );

  const onLayerClick = useCallback(
    (evt: LeafletMouseEvent) => {
      const isTrusted = evt.originalEvent.isTrusted;
      if (isTrusted) {
        mapChangeHandler(MapEventTypes.CLICK, evt.latlng);
      }
    },
    [mapChangeHandler],
  );

  const onLayerChange = useCallback(
    (index: number) => {
      setActiveLayerIndex(index);
      mapChangeHandler(MapEventTypes.LAYER_CHANGE);
    },
    [mapChangeHandler],
  );

  useEffect(() => {
    const isMapReady = map && !initialized.current;
    if (isMapReady) {
      initialized.current = true;
      mapChangeHandler(MapEventTypes.READY);
    }
  }, [map, mapChangeHandler]);

  return {
    activeLayerIndex,
    map,
    mapConfig,
    onLayerChange,
    onLayerClick,
    onMapConfigChange,
  };
};
