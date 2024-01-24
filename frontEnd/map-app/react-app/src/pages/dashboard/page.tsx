import React, { useContext, useEffect, useRef, useState } from "react";

/* COMPONENTS */
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar.tsx";
import MapDisplay from "../../components/map/MapDisplay.tsx";
import AllFriends from "../../components/friends/AllFriends.tsx";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider.tsx";

/* LIRBARIES */
import { Fade } from "react-awesome-reveal";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AspectRatio } from "react-aspect-ratio";

/* OTHER */
import NatureOne from "../../assets/nature-1.jpg";

const CREATE_MAP_URL = "api-auth/map/make-map/";
const GET_MAP_IDS_URL = "api-auth/map/get-user-maps/";
const GET_MAP_URL = "api-auth/map/get-map/";

const Dashboard = () => {
  const { auth }: any = useContext(AuthContext);
  const { accessToken }: any = auth;

  const [editMap, setEditMap] = useState(false);
  const [mapName, setMapName] = useState("");
  const [mapIds, setMapIds] = useState([]);
  const [mapImg, setMapImg] = useState<{ preview: string; file: File | null }>({
    preview: "",
    file: null,
  });

  const [selectedMap, setSelectedMap] = useState<{
    mapName: string;
    mapImage: { preview: string; file: File | null };
  } | null>(null);

  const [displayMaps, setDisplayMaps] = useState<
    Array<{ mapName: string; mapImage: { preview: string; file: File | null } }>
  >([]);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles?.length > 0) {
        const firstAcceptedFile = acceptedFiles[0];

        setMapImg({
          preview: URL.createObjectURL(firstAcceptedFile),
          file: firstAcceptedFile, // Save the file itself if needed
        });
      }
    },
    [setMapImg]
  );

  const deleteMap = (index: number, e: React.MouseEvent<HTMLSpanElement>) => {
    // Prevent the click event from propagating to the parent card body
    e.stopPropagation();

    // Create a copy of the displayMaps array
    const updatedMaps = [...displayMaps];
    // Remove the element at the specified index
    updatedMaps.splice(index, 1);
    // Update the state with the modified array
    setDisplayMaps(updatedMaps);
  };

  useEffect(() => {
    const getMapIds = async () => {
      try {
        const response = await axios.post(
          GET_MAP_IDS_URL,
          JSON.stringify({ userToken: accessToken }),
          { headers: { "Content-type": "application/json" } }
        );
        console.log(response.data.mapId);
        setMapIds(response.data.mapId);
      } catch (err: any) {
        if (err.response?.status == 408) {
          console.log("Token Invalid. Relogin");
        } else {
          console.log("No server response");
        }
      }
    };
    getMapIds();
  }, [accessToken]);

  useEffect(() => {
    const getMaps = async () => {
      for (const id of mapIds) {
        try {
          const response = await axios.post(
            GET_MAP_URL,
            JSON.stringify({ userToken: accessToken, mapId: id }),
            { headers: { "Content-type": "application/json" } }
          );

          console.log(response);
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
      }
    };
    getMaps();
  }, [mapIds]);

  const createMap = async (
    e: any,
    title: string,
    img: { preview: string; file: File | null }
  ) => {
    e.preventDefault();
    try {
      const response: any = await axios.post(
        CREATE_MAP_URL,
        JSON.stringify({
          userToken: accessToken,
          title: title,
        }),
        { headers: { "Content-type": "application/json" } }
      );
      console.log(accessToken);
      console.log(response);
      setDisplayMaps((prevDisplayMap) => [
        ...prevDisplayMap,
        {
          mapName: title,
          mapImage: img,
        },
      ]);
      setEditMap(true);
    } catch (err: any) {
      console.log(err.response);
      if (err.response?.status === 400) {
        console.log("Something went wrong");
      } else if (err.response?.status === 408) {
        console.log("You timed out. Please relogin");
      } else if (err.response?.status === 500) {
        console.log("Your have provided an invalid title or invalid file");
      } else {
        console.log("No server response");
      }
    }
  };

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
                {displayMaps.map((displayMap, index) => (
                  <li key={index}>
                    <div className="card">
                      <AspectRatio ratio="3/4" style={{ maxHeight: "170px" }}>
                        <img
                          src={
                            displayMap.mapImage.file
                              ? displayMap.mapImage.preview
                              : NatureOne
                          }
                          className="card-img-top"
                          alt=""
                        />
                      </AspectRatio>
                      <div
                        className="card-body"
                        onClick={() => {
                          setSelectedMap(displayMap);
                          setEditMap(true);
                        }}
                      >
                        <h4>
                          {displayMap.mapName}
                          <div className="buttons">
                            <span
                              className="material-symbols-outlined"
                              onClick={(e) => deleteMap(index, e)}
                            >
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
                      {mapImg.file && (
                        <div>
                          <img
                            src={mapImg.preview}
                            alt="Preview"
                            style={{
                              maxWidth: "200px",
                              maxHeight: "200px",
                              marginTop: "10px",
                            }}
                          />
                          <span
                            className="material-symbols-outlined"
                            onClick={() =>
                              setMapImg({
                                preview: "",
                                file: null, // Save the file itself if needed
                              })
                            }
                          >
                            close
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      disabled={mapName !== "" ? false : true}
                      data-bs-dismiss="modal"
                      onClick={(e) => {
                        e.preventDefault();
                        createMap(e, mapName, mapImg);
                        setMapName("");
                        setMapImg({ preview: "", file: null });
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
              <h1>{selectedMap?.mapName}</h1>
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
