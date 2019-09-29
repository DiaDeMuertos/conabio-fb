import React, { Component } from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  GeoJSON,
  Popup,
} from 'react-leaflet';
import './Map.css';

const VERACRUZ_CENTROID = [19.3929572228801, -96.4185585737723];

class Map extends Component {
  render() {
    const { basemap, poligonos } = this.props;
    return (
      <LeafletMap
        center={VERACRUZ_CENTROID}
        zoom={6}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Marker position={VERACRUZ_CENTROID}>
          <Popup>Centroide</Popup>
        </Marker>
        {basemap && <GeoJSON data={basemap.geojson} />}

        {poligonos && poligonos.map(p => <GeoJSON data={p.geojson} />)}
      </LeafletMap>
    );
  }
}

export default Map;
