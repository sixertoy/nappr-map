import Leaflet from 'leaflet';
import React, { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { GiCancel as DraftIcon } from 'react-icons/gi';
import { Marker } from 'react-leaflet';

import { LatLngType } from '../../types';

const DraftMarkerComponent = React.memo(({ latlng }) => {
  const DOMString = useMemo(
    () =>
      ReactDOMServer.renderToString(
        <div className="is-relative">
          <div className="is-absolute">
            <DraftIcon color="#FF0000" size={20} />
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

DraftMarkerComponent.propTypes = {
  latlng: LatLngType.isRequired,
};

DraftMarkerComponent.displayName = 'DraftMarkerComponent';

export default DraftMarkerComponent;
