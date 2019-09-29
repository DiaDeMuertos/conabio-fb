import React from 'react';
import { Map as LeafletMap, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import './Map.css';

class Map extends React.Component {
  render() {
    return (
      <LeafletMap
        center={[19.3929572228801, -96.4185585737723]}
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
      </LeafletMap>
    );
  }
}

export default Map;
