import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../contexts/appContext.jsx";
import Divider from "../components/global/Divider.jsx";
import { insertUrlParam } from "../utils/const.js";

const GridManager = () => {
  const { activeTab, setActiveTab, settings } = useContext(appContext);

  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">My Grids</h2>
        <button
          type="button"
          className="action-button primary"
          onClick={() => {
            setActiveTab("grid-new");
            insertUrlParam("tab", "grid-new");
          }}
        >
          <i className="dashicons-before dashicons-plus"></i> New Grid
        </button>
      </div>

      <Divider />
    </div>
  );
};

export default GridManager;
