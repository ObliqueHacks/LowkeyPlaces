import React from "react";
import { Sidebar } from "../global/Sidebar";
import Topbar from "../global/Topbar.tsx";

import NatureOne from "../../assets/nature-1.jpg";

const Dashboard = () => {
  return (
    <div className="container">
      <Sidebar></Sidebar>
      <div className="maps">
        <Topbar></Topbar>
        <div className="mheader">
          <h1>Your Maps</h1>
          <button className="add-map">
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
            <li>
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
              <div className="card">
                <img src={NatureOne} className="card-img-top" alt="" />
                <div className="card-body">
                  <h4>Group Name</h4>
                </div>
              </div>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
