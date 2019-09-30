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
const POLIGONOS_CENTROID = [17.858355758186, -94.83585007935045];

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
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        {/* 
            Marcadores
         */}
        <Marker position={VERACRUZ_CENTROID}>
          <Popup>Centroide</Popup>
        </Marker>

        <Marker position={POLIGONOS_CENTROID}>
          <Popup>Area de poligonos</Popup>
        </Marker>

        {/* 
            Base map
         */}
        {basemap && <GeoJSON data={basemap.geojson} />}
        {/* 
            Arreglos de polionos
         */}
        {poligonos &&
          poligonos.map(p => (
            <GeoJSON data={p.geojson} style={{ color: '#BE4747' }} />
          ))}
      </LeafletMap>
    );
  }
}

export default Map;
