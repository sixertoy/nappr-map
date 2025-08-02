import Leaflet from 'leaflet';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ControlsPosition } from '../../enums';

interface MapLayersControlsComponentProps {
  activeLayer?: number;
  tilesExtension: string;
  layers: string[];
  onChange: (index: number) => void;
  position?: ControlsPosition;
  tilesURL: string;
}

export const MapLayersControlsComponent =
  React.memo(
    ({
      activeLayer = undefined,
      tilesExtension,
      layers,
      onChange,
      position = undefined,
      tilesURL,
    }: MapLayersControlsComponentProps) => {
      const mounted = useRef<HTMLDivElement>(null);
      const [visibility, setVisibility] = useState(false);

      const layerHandler = useCallback(
        (layerid: string) => {
          const index = layers.indexOf(layerid);
          setVisibility(false);
          onChange(index);
        },
        [layers, onChange, setVisibility]
      );

      useEffect(() => {
        if (mounted.current) {
          Leaflet.DomEvent.disableClickPropagation(mounted.current);
          Leaflet.DomEvent.disableScrollPropagation(mounted.current);
        }
      }, []);

      const positionClassname = position || ControlsPosition.BOTTOM_RIGHT;
      // const iconName = visibility ? 'IoCloseOutline' : 'IoChevronBackOutline';
      return (
        <div className="leaflet-control-container">
          <div ref={mounted} className={positionClassname}>
            <div className="leaflet-bar leaflet-control no-no-border">
              <div className="flex-columns">
                <button
                  className="is-block p3 mx3"
                  type="button"
                  onClick={() => setVisibility(!visibility)}>
                  {/* <IconComponent
                    icon={iconName}
                    iconProps={{ color: '#FFFFFF', size: 24 }}
                  /> */}
                </button>
                {layers
                  .filter((k, index) => activeLayer !== index)
                  .map(layerid => (
                    <button
                      key={layerid}
                      className="is-block p3 mx3"
                      style={{
                        background: '#FFFFFF',
                        border: 0,
                        borderRadius: 2,
                      }}
                      type="button"
                      onClick={() => layerHandler(layerid)}>
                      <picture>
                        <source
                          srcSet={`${tilesURL}/${layerid}-thumb.${tilesExtension}`}
                          type={`image/${tilesExtension}`}
                        />
                        <img
                          alt=""
                          className="is-block"
                          height={32}
                          src={`${tilesURL}/${layerid}-thumb.png`}
                          width={32}
                        />
                      </picture>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  );

MapLayersControlsComponent.displayName = 'MapLayersControlsComponent';
