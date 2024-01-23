import { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarkers from "./LocationMarkers";
import LocationHome from "./LocationHome";

const API_KEY = import.meta.env.VITE_API_KEY;

function MapDisplay() {
  const center: any = [51.505, -0.09];
  console.log("Map is being displayed");

  return (
    <MapContainer center={center} zoom={14}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/niqthsky/clr40b09900w501pd7dsyf44x/tiles/256/{z}/{x}/{y}@2x?access_token=${API_KEY}`}
        attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
      ></TileLayer>
      <LocationHome />
      <LocationMarkers />
    </MapContainer>
  );
}

export default MapDisplay;