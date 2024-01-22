import React, { useState } from "react";
import { Sidebar } from "../global/Sidebar";
import Topbar from "../global/Topbar.tsx";
import { Fade } from "react-awesome-reveal";

import MapDisplay from "../map/MapDisplay.tsx";

import NatureOne from "../../assets/nature-1.jpg";

const Dashboard = () => {
  const [editMap, setEditMap] = useState(false);

  return (
    <div className="container">
      <Sidebar></Sidebar>
      {!editMap ? (
        <Fade>
          <div className="maps">
            <Topbar></Topbar>
            <div className="mheader">
              <h1>Your Maps</h1>
              <button className="add-map" onClick={() => setEditMap(true)}>
                <span className="material-symbols-outlined">add</span>New Map
              </button>
            </div>
            <div className="map-dashboard">
              <ul className="map-list">
                <li>
                  <div className="card">
                    <img src={NatureOne} className="card-img-top" alt="" />
                    <div className="card-body">
                      <h4>Group Name</h4>
                      <p>Admin</p>
                    </div>
                  </div>
                  <div className="card">
                    <img src={NatureOne} className="card-img-top" alt="" />
                    <div className="card-body">
                      <h4>Group Name</h4>
                    </div>
                  </div>
                  <div className="card">
                    <img src={NatureOne} className="card-img-top" alt="" />
                    <div className="card-body">
                      <h4>Group Name</h4>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Fade>
      ) : (
        <Fade>
          <div className="map-editor">
            <Topbar></Topbar>
            <div className="mheader">
              <h1>Map Editor</h1>
              <button className="your-maps" onClick={() => setEditMap(false)}>
                <span className="material-symbols-outlined">arrow_back</span>
                Your Maps
              </button>
            </div>
            <div className="map-editor-display">
              <MapDisplay></MapDisplay>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};
export default Dashboard;
