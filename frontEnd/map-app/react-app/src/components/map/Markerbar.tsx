import AuthContext from "../../context/AuthProvider.tsx";
import axios from "../../api/axios";

import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

import { useMapContext } from "../../context/MapProvider.tsx";

const MARKER_LIST_URL = "api-auth/markers/marker-list/";
const ADD_MARKER_IMG_URL = "api-auth/markers/add-marker-img/";
const GET_MARKER_IMG_URL = "api-auth/markers/get-marker-img/";
const UPDATE_MARKER_URL = "api-auth/markers/update-marker/";

interface FileState {
  preview: string;
  file: File | null;
}

const Markerbar = ({ mapId }: { mapId: number }) => {
  const [updatedName, setMarkerName] = useState("");
  const [selectMarker, setSelectMarker]: any = useState({});
  const [updatedDescription, setDescription] = useState("");
  const [files, setFiles] = useState<FileState[]>([]);
  const { markers } = useMapContext();
  const [mapImg, setMapImg] = useState<{ preview: string; file: File | null }>({
    preview: "",
    file: null,
  });

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

  const addMarkerImgs = async (markerId: number) => {
    try {
      for (const file of files) {
        const formData = new FormData();

        formData.append("mapId", String(mapId));

        if (file.file) {
          formData.append("image", file.file);
        }

        const response = await axios.post(ADD_MARKER_IMG_URL, {
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
    markerId: any,
    updatedName: string,
    updateDesc: string
  ) => {
    console.log("update marker is being called");
    console.log(mapId);
    try {
      const response = await axios.post(
        UPDATE_MARKER_URL,
        JSON.stringify({
          mapId: mapId,
          markerId: markerId,
          name: updatedName,
          desc: updateDesc,
        }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response);
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

  const getMarkerImgs = async () => {
    try {
      for (const file of files) {
        const response = await axios.post(
          GET_MARKER_IMG_URL,
          JSON.stringify({
            mapId: mapId,
            image: file.file,
          }),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response);
      }
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
              <span className="material-symbols-outlined">delete</span>
              <span
                className="material-symbols-outlined"
                data-bs-toggle="modal"
                data-bs-target="#newMarkerForm"
                onClick={() => setSelectMarker(marker)}
              >
                edit
              </span>
              <span className="material-symbols-outlined">
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
                Update Spot
              </h1>

              <button type="button" data-bs-dismiss="modal">
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
                  required
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
                disabled={updatedName !== "" ? false : true}
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  updateMarker(
                    selectMarker.id,
                    updatedName,
                    updatedDescription
                  );
                }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Markerbar;
