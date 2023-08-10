import React from 'react'; 
import { MapContainer, TileLayer } from 'react-leaflet'; 
import './App.css';

const position = [38.9072, -77.0369];


function App()   {
  return (
    <div className="App">
      <MapContainer center = {position} zoom = {8}>
        <TileLayer
          url = "https://api.mapbox.com/styles/v1/niqthsky/cll4fso8r00a701p4e6l5a5og/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmlxdGhza3kiLCJhIjoiY2xsNGJ1cGx2MDFjaTNjbW4zaW45ZnAxMiJ9.UNim24qcvo_YGlloaEQxNw"
          attribution = "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
        />
      </MapContainer>
    </div>
  );
}

export default App;