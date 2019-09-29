import React from 'react';
import { Map as LeafletMap, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import './Map.css';

const VERACRUZ_CENTROID = [19.3929572228801, -96.4185585737723];

class Map extends React.Component {
  render() {
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
        <Marker position={VERACRUZ_CENTROID} />
      </LeafletMap>
    );
  }
}

export default Map;
