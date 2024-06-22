import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../../contexts/appContext.jsx";
import { insertUrlParam, removeUrlParam } from "../../utils/const.js";

const NavSidebar = () => {
  const {
    activeTab,
    setActiveTab,
    setGridId,
  } = useContext(appContext);

  return (
    <>
      <nav className="navigation mt-2 text-center lg:text-left min-h-screen">
        <ul className="menu">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("grid-manager");
                insertUrlParam("tab", "grid-manager");
                removeUrlParam("grid_id");
  
                setGridId(null);
              }}
              className={`${
                ["grid-manager", "grid-new"].includes(activeTab) ? "active" : ""
              }`}
            >
              <i className="dashicons-before dashicons-store"></i>
              <span>Grid Manager</span>
            </a>
            <ul className="sub-menu">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("grid-manager");
                    insertUrlParam("tab", "grid-manager");
                    removeUrlParam("grid_id");
                    setGridId(null);
                  }}
                  className={`${activeTab == "grid-manager" ? "active" : ""}`}
                >
                  <i className="dashicons-before dashicons-screenoptions"></i>
                  <span>My Grids</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("grid-new");
                    insertUrlParam("tab", "grid-new");
                    removeUrlParam("grid_id");
                    setGridId(null);
                  }}
                  className={`${activeTab == "grid-new" ? "active" : ""}`}
                >
                  <i className="dashicons-before dashicons-insert"></i>
                  <span>New Grid</span>
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("brand-colors");
                insertUrlParam("tab", "brand-colors");
                removeUrlParam("grid_id");
                setGridId(null);
              }}
              className={`${
                ["brand-colors", "fonts-manager", "backup-restore"].includes(
                  activeTab
                )
                  ? "active"
                  : ""
              }`}
            >
              <i className="dashicons-before dashicons-admin-settings"></i>
              <span>Settings</span>
            </a>
            <ul className="sub-menu">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("brand-colors");
                    insertUrlParam("tab", "brand-colors");
                    removeUrlParam("grid_id");
                    setGridId(null);
                  }}
                  className={`${activeTab == "brand-colors" ? "active" : ""}`}
                >
                  <i className="dashicons-before dashicons-buddicons-topics"></i>
                  <span>Brand Colors</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("fonts-manager");
                    insertUrlParam("tab", "fonts-manager");
                    removeUrlParam("grid_id");
                    setGridId(null);
                  }}
                  className={`${activeTab == "fonts-manager" ? "active" : ""}`}
                >
                  <i className="dashicons-before dashicons-editor-textcolor"></i>
                  <span>Fonts Manager</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("backup-restore");
                    insertUrlParam("tab", "backup-restore");
                    removeUrlParam("grid_id");
                    setGridId(null);
                  }}
                  className={`${activeTab == "backup-restore" ? "active" : ""}`}
                >
                  <i className="dashicons-before dashicons-backup"></i>
                  <span>Backup &amp; Restore</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("about");
                insertUrlParam("tab", "about");
                removeUrlParam("grid_id");
                setGridId(null);
              }}
              className={`${activeTab == "about" ? "active" : ""}`}
            >
              <i className="dashicons-before dashicons-info"></i>
              <span>About</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavSidebar;
