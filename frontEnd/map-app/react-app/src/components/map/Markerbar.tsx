import AuthContext from "../../context/AuthProvider.tsx";
import axios from "../../api/axios";

import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const MAP_LIST_URL = "api-auth/markers/marker-list/";
const ADD_MARKER_IMG_URL = "api-auth/markers/add-marker-img/";
const GET_MARKER_IMG_URL = "api-auth/markers/get-marker-img/";

interface FileState {
  preview: string;
  file: File | null;
}

const Markerbar = (mapId: { mapId: number }) => {
  const [markerName, setMarkerName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileState[]>([]);

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

  const { auth }: any = useContext(AuthContext);
  const { accessToken }: any = auth;

  const mapList = async () => {
    try {
      const response = await axios.post(
        MAP_LIST_URL,
        JSON.stringify({
          userToken: accessToken,
          mapId: mapId.mapId,
        }),
        { headers: { "Content-type": "application/json" } }
      );
      console.log(response);
    } catch (err: any) {
      if (err.response?.status === 500) {
        console.log("Something went wrong");
      } else {
        console.log("No response. Server Error");
      }
    }
  };

  const addMarkerImgs = async () => {
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("userToken", accessToken);

        formData.append("mapId", String(mapId.mapId));

        if (file.file) {
          formData.append("image", file.file);
        }

        const response = await axios.post(ADD_MARKER_IMG_URL, formData, {
          headers: { "Content-type": "multipart/form-data" },
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

  const getMarkerImgs = async () => {
    try {
      for (const file of files) {
        const response = await axios.post(
          GET_MARKER_IMG_URL,
          JSON.stringify({
            userToken: accessToken,
            mapId: mapId,
            image: file.file,
          }),
          {
            headers: { "Content-type": "application/json" },
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
          <li className="marker">
            <input type="checkbox" />
            <label htmlFor="item1">Marker Name</label>{" "}
            <span className="material-symbols-outlined">delete</span>
            <span
              className="material-symbols-outlined"
              data-bs-toggle="modal"
              data-bs-target="#newMarkerForm"
            >
              edit
            </span>
          </li>
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
                Create Spot
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
                  value={markerName}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="descriptionMarker"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
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
                disabled={markerName !== "" ? false : true}
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Markerbar;
