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
import 'leaflet/dist/leaflet.css';
import './styles.scss';

import Leaflet from 'leaflet';
import get from 'lodash.get';
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
    className,
    defaultLayer,
    editable,
    extension,
    layers,
    // onChange,
    onCreated,
    onDebugChange,
    tilesurl,
    zoom,
  }) => {
    // const [draft, setDraft] = useState(null);

    const mapCreatedHandler = useCallback(
      map => onCreated({ map, type: 'created' }),
      [onCreated]
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
      const boundsne = get(bounds, 'northEast');
      const boundssw = get(bounds, 'southWest');
      const hasmaxbounds = bounds && boundsne && boundssw;
      return (
        <MapContainer
          scrollWheelZoom
          attributionControl={false}
          bounceAtZoomLimits={false}
          center={center}
          className={`${className} nappr-gamemap`}
          crs={Leaflet.CRS.Simple}
          doubleClickZoom={false}
          maxBounds={
            (hasmaxbounds && [bounds.southWest, bounds.northEast]) || null
          }
          maxZoom={Number(zoom.max)}
          minZoom={Number(zoom.min)}
          wheelPxPerZoomLevel={256}
          whenCreated={mapCreatedHandler}
          // worldCopyJump={editable}
          zoom={Number(zoom.current)}
          zoomControl={false}>
          {(!hasmaxbounds || editable) && <Debugger onDebug={onDebugChange} />}
          <LayersProvider
            active={defaultLayer}
            extension={extension}
            layers={layers}
            tilesurl={tilesurl}>
            <LayersManager />
            {children && <LayerGroup>{children}</LayerGroup>}
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
      editable,
      bounds,
      children,
      className,
      zoom,
      tilesurl,
      extension,
      center,
      onDebugChange,
      mapCreatedHandler,
    ]);

    return MapComponent;
  }
);

GameMapComponent.defaultProps = {
  bounds: null,
  center: { lat: 0, lng: 0 },
  children: null,
  className: '',
  defaultLayer: 0,
  editable: false,
  extension: 'png',
  layers: [],
  // onChange: v => v,
  onCreated: v => v,
  onDebugChange: null,
};

GameMapComponent.propTypes = {
  bounds: MaxBoundsType,
  center: LatLngType,
  children: PropTypes.node,
  className: PropTypes.string,
  defaultLayer: PropTypes.number,
  editable: PropTypes.bool,
  extension: PropTypes.string,
  layers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  // onChange: PropTypes.func,
  onCreated: PropTypes.func,
  onDebugChange: PropTypes.func,
  tilesurl: PropTypes.string.isRequired,
  zoom: ZoomType.isRequired,
};

GameMapComponent.displayName = 'GameMapComponent';

export default GameMapComponent;
