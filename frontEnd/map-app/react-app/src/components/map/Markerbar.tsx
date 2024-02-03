import AuthContext from "../../context/AuthProvider.tsx";
import axios from "../../api/axios";

import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

import { useMapContext } from "../../context/MapProvider.tsx";

const MARKER_LIST_URL = "api-auth/markers/marker-list/";
const ADD_MARKER_IMG_URL = "api-auth/markers/add-marker-img/";
const GET_MARKER_IMG_URL = "api-auth/markers/get-marker-img/";
const UPDATE_MARKER_URL = "api-auth/markers/update-marker/";
const DELETE_MARKER_URL = "api-auth/markers/delete-marker/";
const GET_MAP_URL = "api-auth/map/get-map/";

interface FileState {
  preview: string;
  file: File | null;
}

const Markerbar = ({ map }: { map: any }) => {
  const [updatedName, setMarkerName] = useState("");
  const [selectMarker, setSelectMarker]: any = useState({});
  const [updatedDescription, setDescription] = useState("");
  const [files, setFiles] = useState<FileState[]>([]);
  const [mapFolder, setMapFolder] = useState("");
  const [slides, setSlides] = useState([]);
  const { markers, setMarkers } = useMapContext();

  const resetForm = () => {
    setMarkerName("");
    setDescription("");
    setFiles([]);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const updatedFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setFiles((prevFiles: any) => [...prevFiles, ...updatedFiles]);
    }
  }, []);

  const removeImage = (name: string) => {
    setFiles((files) => files.filter((file) => file.preview !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const addMarkerImgs = async (marker: any) => {
    try {
      for (const file of files) {
        const formData = new FormData();

        formData.append("mapId", String(map.mapId));
        formData.append("markerId", String(marker.id));

        if (file.file) {
          formData.append("image", file.file);
        }

        const response = await axios.post(ADD_MARKER_IMG_URL, formData, {
          headers: { "Content-type": "multipart/form-data" },
          withCredentials: true,
        });
        console.log(response);
      }
    } catch (err: any) {
      if (err.response?.status === 500) {
        console.log("Something went wrong");
      } else {
        console.log("No response. Server Error");
      }
    }
  };

  const updateMarker = async (
    marker: any,
    updatedName: string = "",
    updateDesc: string = ""
  ) => {
    console.log("update marker is being called");
    try {
      interface UpdateRequest {
        mapId: number;
        markerId: any;
        name?: string;
        desc?: string;
      }

      let request: UpdateRequest = {
        mapId: map.mapId,
        markerId: marker.id,
      };

      if (updatedName !== "") {
        request.name = updatedName;
      }

      if (updateDesc !== "") {
        request.desc = updateDesc;
      }

      const response = await axios.post(
        UPDATE_MARKER_URL,
        JSON.stringify(request),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response);
      if (files.length >= 1) {
        addMarkerImgs(marker);
      }
      getMarkers();
    } catch (err: any) {
      if (err.response?.status === 419) {
        console.log("Invalid Marker");
      } else if (err.response?.status === 497) {
        console.log("Marker Id is not valid");
      } else if (err.response?.status === 400) {
        console.log("Something went wrong");
      } else {
        console.log("No server response");
      }
    }
  };

  const getMarkers = async () => {
    let newMarkers: any = [];
    try {
      const response = await axios.post(
        MARKER_LIST_URL,
        JSON.stringify({
          mapId: map.mapId,
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
          folderName: response.data[key].folderPath,
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

  const getMapFolder = async () => {
    try {
      const response = await axios.post(
        GET_MAP_URL,
        JSON.stringify({ mapId: map.mapId }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );

      const folder = response.data?.folderName;
      setMapFolder(folder);
    } catch (err: any) {
      console.log(err.response);
      if (err.response?.status === 400) {
        console.log("Something wrong with Map ID");
      } else if (err.response?.status === 408) {
        console.log("User Token Expired. Relogin");
      } else {
        console.log("No server response");
      }
    }
  };

  useEffect(() => {
    getMarkers();
    getMapFolder();
  }, []);

  const getMarkerImgs = async (marker: any) => {
    console.log(marker);
    try {
      let urls: any = [];
      const response = await axios.post(
        GET_MARKER_IMG_URL,
        JSON.stringify({ mapId: map.mapId, markerId: marker.id }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      const { image_ids } = response.data;
      const folder = marker.folderName;
      for (const key in image_ids) {
        const img = image_ids[key];
        const path =
          "src/maps/" + mapFolder + "/markers/" + folder + "/" + img + ".jpg";
        urls.push(path);
      }
      console.log(urls);
      setSlides(urls);
    } catch (err: any) {
      console.log(err.response);
      if (err.response?.state == 440) {
        console.log("Invalid Map ID");
      } else {
        console.log("Server Error");
      }
    }
  };

  const deleteMarker = async (marker: any) => {
    try {
      const response = await axios.post(
        DELETE_MARKER_URL,
        JSON.stringify({ mapId: map.mapId, markerId: marker.id }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      getMarkers();
    } catch (err: any) {
      console.log(err.response);
      if (err.response?.state == 440) {
        console.log("Invalid Map ID");
      } else {
        console.log("Server Error");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="marker-bar">
        <h6>
          Spots <span className="material-symbols-outlined">location_on</span>
        </h6>
        <ul className="marker-list">
          {markers.map((marker: any, index: number) => (
            <li className="marker" key={index}>
              <input type="checkbox" />
              <label className="marker-name">{marker.name}</label>{" "}
              {map.status !== 2 && (
                <span
                  className="material-symbols-outlined"
                  onClick={() => deleteMarker(marker)}
                >
                  delete
                </span>
              )}
              {map.status !== 2 && (
                <span
                  className="material-symbols-outlined"
                  data-bs-toggle="modal"
                  data-bs-target="#newMarkerForm"
                  onClick={() => setSelectMarker(marker)}
                >
                  edit
                </span>
              )}
              <span
                className="material-symbols-outlined"
                data-bs-toggle="modal"
                data-bs-target="#viewGallery"
                onClick={() => getMarkerImgs(marker)}
              >
                gallery_thumbnail
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="modal fade"
        tabIndex={-1}
        id="newMarkerForm"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Spot
              </h1>

              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={() => resetForm()}
              >
                {" "}
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form action="/submit">
              <div className="mb-3">
                <br />
                <label className="form-label">Marker Name</label>
                <input
                  type="input"
                  className="form-control"
                  id="nameMarker"
                  onChange={(e) => setMarkerName(e.target.value)}
                  value={updatedName}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="descriptionMarker"
                  onChange={(e) => setDescription(e.target.value)}
                  value={updatedDescription}
                  style={{
                    display: "flex",
                    outline: "none",
                    width: "70%",
                    height: "200px",
                    color: "white",
                    border: "0.5px solid orange",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Photos</label>
                <div {...getRootProps({ className: "drag-drop-img" })}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p> Drop the files here...</p>
                  ) : (
                    <p>
                      {" "}
                      Drag and drop your image here or click to select file
                    </p>
                  )}
                </div>
                <ul className="image-preview-list">
                  {true &&
                    files.map((file) => (
                      <li key={file.preview} className="image-preview-item">
                        <img
                          src={file.preview}
                          alt="Preview"
                          style={{
                            maxWidth: "120px",
                            maxHeight: "120px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          className="material-symbols-outlined"
                          onClick={() => removeImage(file.preview)}
                        >
                          close
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  updateMarker(selectMarker, updatedName, updatedDescription);
                  resetForm();
                }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        tabIndex={-1}
        id="viewGallery"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ width: "600px", height: "500px" }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Gallery
              </h1>

              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={() => resetForm()}
              >
                {" "}
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {slides[0] && (
              <div className="modal-body">
                <div id="carouselExampleIndicators" className="carousel slide">
                  <div className="carousel-indicators">
                    {slides.map((_, index) => (
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className="active"
                        aria-current="true"
                        aria-label="Slide"
                      ></button>
                    ))}
                  </div>
                  <div className="carousel-inner">
                    {slides.map((url, index) => (
                      <div className="carousel-item active">
                        <img
                          src={url}
                          className="d-block w-100"
                          style={{ width: "200px", height: "400px" }}
                          alt="..."
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Markerbar;
