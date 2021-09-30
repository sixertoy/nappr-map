/**
 *
 * Usage
 * ----------------------------
 *
 * return  (
 *   <div className="is-overlay" style={{ zIndex: 1000 }}>
 *     <Map
 *       onChange={() => {}}
 *       bounds={{
 *         southWest: { lat: 0.0373687744140625, lng: 0.9693903923034668 },
 *         northEast: { lat: -1.0303115844726562, lng: 0.018140316009521484 }
 *       }}
 *       center={{ lat: 0, lng: 0 }}
 *       zoom={{ min: 0, max: 13, current: 8 }}>
 *       <AttributionControl
 *         position="bottomleft"
 *         prefix={`Smart Maps | ${title} v${version}`}
 *       />
 *     </Map>
 *   </div>
 * );
 *
 */
import './styles.scss';

import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { LayerGroup, MapContainer, ZoomControl } from 'react-leaflet';

import { Debugger, LayersManager } from './commons';
import { LayersProvider } from './contexts/layers';
import { LatLngType, MaxBoundsType, ZoomType } from './types';

const GameMapComponent = React.memo(
  ({
    bounds,
    center,
    children,
    defaultLayer,
    // editable,
    layers,
    onChange,
    tilesurl,
    zoom,
  }) => {
    // const [draft, setDraft] = useState(null);

    const mapCreatedHandler = useCallback(
      map => onChange({ map, type: 'created' }),
      [onChange]
    );

    // const layerClickHandler = useCallback(
    //   ({ latlng, originalEvent }) => {
    //     if (!editable || !originalEvent.isTrusted) return;
    //     setDraft(latlng);
    //     onChange({ latlng, layerid: activeLayer, type: 'draft' });
    //   },
    //   [activeLayer, editable, onChange]
    // );

    const MapComponent = useMemo(() => {
      const hasmaxbounds = bounds && bounds.northEast && bounds.southWest;
      return (
        <MapContainer
          scrollWheelZoom
          attributionControl={false}
          bounceAtZoomLimits={false}
          center={center}
          className="nappr-gamemap"
          crs={Leaflet.CRS.Simple}
          doubleClickZoom={false}
          maxBounds={[bounds.southWest, bounds.northEast]}
          maxZoom={zoom.max}
          minZoom={zoom.min}
          wheelPxPerZoomLevel={256}
          whenCreated={mapCreatedHandler}
          zoom={zoom.current}
          zoomControl={false}>
          {!hasmaxbounds && <Debugger />}
          <LayersProvider
            active={defaultLayer}
            layers={layers}
            tilesurl={tilesurl}>
            <LayersManager />
            <LayerGroup>{children}</LayerGroup>
          </LayersProvider>
          <ZoomControl position="topright" />
          {/* draft && (
            <LayerGroup>
              <DraftMarker latlng={draft} />
            </LayerGroup>
          ) */}
        </MapContainer>
      );
    }, [
      defaultLayer,
      layers,
      bounds,
      children,
      zoom,
      tilesurl,
      center,
      mapCreatedHandler,
    ]);

    return MapComponent;
  }
);

GameMapComponent.defaultProps = {
  // editable: false,
  onChange: v => v,
};

GameMapComponent.propTypes = {
  bounds: MaxBoundsType.isRequired,
  center: LatLngType.isRequired,
  children: PropTypes.node.isRequired,
  defaultLayer: PropTypes.number.isRequired,
  // editable: PropTypes.bool,
  layers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func,
  tilesurl: PropTypes.string.isRequired,
  zoom: ZoomType.isRequired,
};

GameMapComponent.displayName = 'GameMapComponent';

export default GameMapComponent;
