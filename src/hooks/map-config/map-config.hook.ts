import type { Map } from 'leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useCallback, useEffect, useRef, useState } from 'react';

import { MapEventTypes } from '../../enums';
import { MapChangeEvent, MapConfigInterface } from '../../interfaces';
import { mergeMapConfig } from '../../utils/merge-map-config';

interface UseMapConfigProps {
  config: MapConfigInterface;
  onMapChange?: (evt: MapChangeEvent) => void;
}

export const useMapConfig = ({ config, onMapChange }: UseMapConfigProps) => {
  const initialized = useRef(false);

  const map = useRef<Map | null>(null);

  const [mapConfig, setMapConfig] = useState<MapConfigInterface>(config);

  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);

  const mapChangeHandler = useCallback(
    (type: MapEventTypes, data?: Pick<MapChangeEvent, 'latlng' | 'config'>) => {
      if (onMapChange) {
        onMapChange({
          latlng: data?.latlng || map.current?.getCenter(),
          layerId: activeLayerIndex,
          map: map.current,
          type,
        });
      }
    },
    [activeLayerIndex, map, onMapChange],
  );

  const configChangeHandler = useCallback(
    (data: Partial<MapConfigInterface>) => {
      const next = mergeMapConfig(mapConfig, data);
      setMapConfig(next);
      mapChangeHandler(MapEventTypes.CONFIG_CHANGE, { config: next });
    },
    [],
  );

  const layerClickHandler = useCallback(
    (evt: LeafletMouseEvent) => {
      const isTrusted = evt.originalEvent.isTrusted;
      if (isTrusted) {
        mapChangeHandler(MapEventTypes.CLICK, { latlng: evt.latlng });
      }
    },
    [mapChangeHandler],
  );

  const layerChangeHandler = useCallback(
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
    configChangeHandler,
    layerChangeHandler,
    layerClickHandler,
    map,
  };
};
