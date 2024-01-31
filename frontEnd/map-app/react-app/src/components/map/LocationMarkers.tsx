import axios from "../../api/axios";
import { LatLng, layerGroup, marker } from "leaflet";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useMapEvents, Marker, useMapEvent, useMap } from "react-leaflet";
import AuthContext from "../../context/AuthProvider.tsx";
import { useMapContext } from "../../context/MapProvider.tsx";

const PLACE_MARKER_URL = "api-auth/markers/place-marker/";
const MARKER_LIST_URL = "api-auth/markers/marker-list/";

function LocationMarkers({ mapId }: { mapId: number }) {
  const { markers, setMarkers }: any = useMapContext();

  const getMarkers = async () => {
    let newMarkers = [];
    try {
      const response = await axios.post(
        MARKER_LIST_URL,
        JSON.stringify({
          mapId: mapId,
        }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );

      for (const key in response.data) {
        newMarkers.push({
          id: key,
          name: response.data[key].name,
          desc: response.data[key].desc,
          lat: response.data[key].lat,
          long: response.data[key].long,
          address: response.data[key].address,
          folderName: response.data[key].folderName,
        });
      }
      setMarkers(newMarkers);
    } catch (err: any) {
      if (err.response?.status === 500) {
        console.log("Something went wrong");
      } else {
        console.log("No response. Server Error");
      }
    }
  };

  useEffect(() => {
    getMarkers();
  }, []);

  // GET REQUEST FOR ADDRESS BASED ON LAT AND LONG
  const fetchAddress = async (lng: number, lat: number) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${
          import.meta.env.VITE_API_KEY
        }&types=address`
      );

      const firstFeature = response.data.features[0];
      const extractedAddress = firstFeature
        ? firstFeature.text
        : "Address not found";

      placeMarker(lat, lng, extractedAddress);
    } catch (error: any) {
      console.error("Error fetching address:", error.message);
    }
  };

  const placeMarker = async (lat: number, lng: number, address: string) => {
    console.log(lat, lng);

    try {
      const response = await axios.post(
        PLACE_MARKER_URL,
        JSON.stringify({
          lat: lat,
          long: lng,
          address: address,
          mapId: mapId,
        }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );

      getMarkers();
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
      const { lat } = e.latlng;
      const { lng } = e.latlng;
      fetchAddress(lng, lat);
    },
  });

  const markerList = markers.map((marker: any, index: number) => (
    <Marker key={index} position={[marker.lat, marker.long]}></Marker>
  ));

  return <React.Fragment>{markerList}</React.Fragment>;
}
export default LocationMarkers;
