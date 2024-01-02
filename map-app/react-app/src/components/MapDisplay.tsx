import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_KEY = import.meta.env.VITE_API_KEY;

class Nav {
  lat: number = 0;
  long: number = 0;
  coords: number[] = [0, 0];

  getCoords(callback: Function) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      this.coords = [latitude, longitude];
      callback();
    });
  }
}

function MapDisplay() {
  const [coords, setCoords]: any = useState([0, 0]);

  useEffect(() => {
    const navInit = new Nav();
    navInit.getCoords(() => {
      setCoords(navInit.coords);
      console.log("Position Has Been Obtained: " + navInit.coords);
    });
  }, []); // Empty dependency array ensures that the effect runs once, similar to componentDidMount

  return (
    <div className="App">
      {coords[0] !== 0 && (
        <MapContainer center={coords} zoom={14}>
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/niqthsky/clqvbyt0200na01nvguehawvp/tiles/256/{z}/{x}/{y}@2x?access_token=${API_KEY}`}
            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
          ></TileLayer>
        </MapContainer>
      )}
    </div>
  );
}
export default MapDisplay;
