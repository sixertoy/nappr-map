import { LatLng, LeafletMouseEvent, Map } from 'leaflet';
import { useCallback, useEffect, useRef, useState } from 'react';

import { MapEventTypes } from '../../enums';
import { MapChangeEvent, MapConfigInterface } from '../../interfaces';

interface UseMapConfigProps {
  config: MapConfigInterface;
  onMapChange?: (evt: MapChangeEvent) => void;
}

export const useMapConfig = ({ onMapChange }: UseMapConfigProps) => {
  const initialized = useRef(false);

  const map = useRef<Map | null>(null);

  // const [mapConfig, setMapConfig] = useState<MapConfigInterface>({
  //   bounds: {
  //     northEast: config.current?.bounds?.northEast || undefined,
  //     southWest: config.current?.bounds?.southWest || undefined,
  //   },
  //   center: config.current?.center || { lat: -0.5, lng: 0.5 },
  //   layers: config.current.layers,
  //   tiles: {
  //     extension: config.current.tiles?.extension || 'png',
  //     maxLevel: config.current.tiles?.maxLevel || 18,
  //     minLevel: config.current.tiles?.minLevel || 0,
  //     url: config.current.tiles.url,
  //   },
  //   zoom: {
  //     current: config.current?.zoom?.current || 9,
  //     max: config.current?.zoom?.max || 18,
  //     min: config.current?.zoom?.min || 0,
  //   },
  // });

  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);

  const mapChangeHandler = useCallback(
    (type: MapEventTypes, data?: { latlng?: LatLng }) => {
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
      console.log('data', data);
      // const next = mergeMapConfig(mapConfig, data);
      // config.current = next;
      // setMapConfig(next);
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
    // mapConfig,
  };
};
