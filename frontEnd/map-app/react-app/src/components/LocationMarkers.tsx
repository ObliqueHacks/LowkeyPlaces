import { LatLng } from "leaflet";
import React from "react";
import { useState } from "react";
import { useMapEvents, Marker } from "react-leaflet";

function LocationMarkers() {
  const initialMarkers: LatLng[] = [new LatLng(51.505, -0.09)];
  const [markers, setMarkers] = useState(initialMarkers);
  const map = useMapEvents({
    click(e) {
      setMarkers((prevValue) => [...prevValue, e.latlng]);
    },
  });

  const markerList = markers.map((marker, index) => (
    <Marker key={index} position={marker}></Marker>
  ));

  return <React.Fragment>{markerList}</React.Fragment>;
}
export default LocationMarkers;
