import Leaflet, { LatLngLiteral } from 'leaflet';
import React, { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { GiCancel } from 'react-icons/gi';
import { Marker } from 'react-leaflet';

interface MapDraftMarkerComponentProps {
  latlng: LatLngLiteral;
  // color="#FF0000"
}

export const MapDraftMarkerComponent =
  React.memo(({ latlng }: MapDraftMarkerComponentProps) => {
    const DOMString = useMemo(
      () =>
        ReactDOMServer.renderToString(
          <div className="is-relative">
            <div className="is-absolute">
              <GiCancel size={20} />
            </div>
          </div>
        ),
      []
    );

    return (
      <Marker
        draggable
        icon={Leaflet.divIcon({
          className: 'leaflet-div-icon',
          html: DOMString,
        })}
        position={latlng}
      />
    );
  });

MapDraftMarkerComponent.displayName = 'MapDraftMarkerComponent';
