import React from "react";

export const Markerbar = () => {
  return (
    <div className="marker-bar">
      <h6>
        Markers <span className="material-symbols-outlined">location_on</span>
      </h6>
      <ul className="marker-list">
        <li className="marker">
          <input type="checkbox" />
          <label htmlFor="item1">Marker Name</label>{" "}
          <span className="material-symbols-outlined">delete</span>
          <span className="material-symbols-outlined">edit</span>
        </li>
        <li className="marker">
          <input type="checkbox" />
          <label htmlFor="item1">Marker Name</label>{" "}
          <span className="material-symbols-outlined">delete</span>
          <span className="material-symbols-outlined">edit</span>
        </li>
      </ul>
    </div>
  );
};
export default Markerbar;
