import React, { useEffect, useRef, useState } from "react";

/* COMPONENTS */
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar.tsx";
import MapDisplay from "../map/MapDisplay.tsx";
import Markerbar from "../map/Markerbar";
import AllFriends from "../../components/friends/AllFriends.tsx";

/* LIRBARIES */
import { Fade } from "react-awesome-reveal";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

/* OTHER */
import NatureOne from "../../assets/nature-1.jpg";

const Dashboard = () => {
  const [editMap, setEditMap] = useState(false);
  const [mapName, setMapName] = useState("");
  const [mapNames, setMapNames]: any = useState([]);
  const [selectedMap, setSelectedMap]: any = useState({});

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);

  useEffect(() => {
    console.log(mapNames);
  }, [mapNames]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="container">
      <Sidebar editMap={editMap}></Sidebar>
      {!editMap && (
        <Fade>
          <div className="maps">
            <Topbar></Topbar>
            <div className="mheader">
              <h1>Your Maps</h1>
              <button
                className="add-map"
                data-bs-toggle="modal"
                data-bs-target="#newMapForm"
              >
                <span className="material-symbols-outlined">add</span>New Map
              </button>
            </div>
            <div className="map-dashboard">
              <ul className="map-list">
                {mapNames.map((name: any, index: number) => (
                  <li>
                    <div className="card">
                      <img src={NatureOne} className="card-img-top" alt="" />
                      <div
                        className="card-body"
                        onClick={() => setEditMap(true)}
                      >
                        <h4>
                          {name}
                          <div className="buttons">
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                            <span className="material-symbols-outlined">
                              more_vert
                            </span>
                          </div>
                        </h4>
                        <p>Admin</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="modal fade"
              id="newMapForm"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      New Map
                    </h1>

                    <button type="button" data-bs-dismiss="modal">
                      {" "}
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <form action="/submit">
                    <div className="mb-3">
                      <br />
                      <label className="form-label">Map Name</label>
                      <input
                        type="input"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setMapName(e.target.value)}
                        value={mapName}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Upload Map Photo</label>
                      <div {...getRootProps({ className: "drag-drop-img" })}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p> Drop the files here...</p>
                        ) : (
                          <p>
                            {" "}
                            Drag and drop your image here or click to select
                            file
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={mapName !== "" ? false : true}
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setEditMap(true);
                        setMapNames([...mapNames, mapName]);
                        setMapName("");
                      }}
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      )}
      {editMap && (
        <Fade>
          <div className="map-editor">
            <Topbar></Topbar>
            <div className="mheader">
              <h1>Name of Map</h1>
              <div className="buttons">
                <button className="add-friend-map">
                  <span className="material-symbols-outlined">group</span>
                  Members
                </button>

                <button
                  className="add-friend-map"
                  data-bs-toggle="modal"
                  data-bs-target="#addFriendToMap"
                >
                  <span className="material-symbols-outlined">person_add</span>
                  Add Friend
                </button>
                <button className="your-maps" onClick={() => setEditMap(false)}>
                  <span className="material-symbols-outlined">arrow_back</span>
                  Your Maps
                </button>
              </div>
            </div>
            <div className="map-editor-display">
              <MapDisplay></MapDisplay>
            </div>

            <div
              className="modal fade"
              id="addFriendToMap"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Add Friend
                    </h1>
                    <button type="button" data-bs-dismiss="modal">
                      {" "}
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <AllFriends addFriendMap={true}></AllFriends>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};
export default Dashboard;
