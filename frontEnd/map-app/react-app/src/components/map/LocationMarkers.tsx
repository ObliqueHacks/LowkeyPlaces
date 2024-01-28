import axios from "../../api/axios";
import { LatLng, layerGroup } from "leaflet";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useMapEvents, Marker, useMapEvent } from "react-leaflet";
import AuthContext from "../../context/AuthProvider.tsx";

const PLACE_MARKER_URL = "api-auth/markers/place-marker/";

function LocationMarkers(mapId: { mapId: number }) {
  const initialMarkers: any = [new LatLng(51.505, -0.09)];
  const [markers, setMarkers] = useState(initialMarkers);
  const [address, setAddress] = useState("");

  // GET REQUEST FOR ADDRESS BASED ON LAT AND LONG
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { lat } = markers[markers.length - 1];
        const { lng } = markers[markers.length - 1];

        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${
            import.meta.env.VITE_API_KEY
          }&types=address`
        );

        const firstFeature = response.data.features[0];
        const extractedAddress = firstFeature
          ? firstFeature.text
          : "Address not found";
        console.log(extractedAddress);
        setAddress(extractedAddress);
      } catch (error: any) {
        console.error("Error fetching address:", error.message);
      }
    };

    fetchAddress();
  }, [markers]);

  const placeMarker = async () => {
    try {
      const { lat } = markers[markers.length - 1];
      const { lng } = markers[markers.length - 1];
      console.log(mapId);
      console.log(mapId.mapId);
      const response = await axios.post(
        PLACE_MARKER_URL,
        JSON.stringify({
          lat: lat,
          long: lng,
          address: address,
          mapId: mapId.mapId,
        }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err: any) {
      if (err.response?.status === 500) {
        console.log("Something went wrong");
      } else if (err.response?.status === 419) {
        console.log("Marker Object not Valid");
      } else {
        console.log("No response. Server Error");
      }
    }
  };

  const map = useMapEvents({
    click(e) {
      setMarkers((prevValue: LatLng[]) => [...prevValue, e.latlng]);
      console.log(markers);
      console.log(markers[markers.length - 1]);
      placeMarker();
    },
  });

  const markerList = markers.map(
    (marker: LatLng, index: number) =>
      index !== 0 && <Marker key={index} position={marker}></Marker>
  );

  return <React.Fragment>{markerList}</React.Fragment>;
}
export default LocationMarkers;
