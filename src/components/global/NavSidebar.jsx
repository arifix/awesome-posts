import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../../contexts/appContext.jsx";
import { insertUrlParam, removeUrlParam } from "../../utils/const.js";

const NavSidebar = () => {
  const {
    activeTab,
    setActiveTab,
    settings,
    shopSettings,
    setShopSettings,
    initialSettings,
    setShopId,
  } = useContext(appContext);

  return (
    <>
      <nav className="navigation mt-2 text-center lg:text-left min-h-screen">
        <ul className="menu">
          <li>
            <a
              href="javascript:void(0);"
              onClick={() => {
                setActiveTab("shortcode-manager");
                insertUrlParam("tab", "shortcode-manager");
                removeUrlParam("shortcode_id");
                setShopSettings({ ...initialSettings });
                setShopId(null);
              }}
              className={`${
                activeTab == "shortcode-manager" || activeTab == "shortcode-new"
                  ? "active"
                  : ""
              }`}
            >
              <i className="dashicons-before dashicons-buddicons-topics"></i>
              <span>Shortcode Manager</span>
            </a>
            <ul className="sub-menu">
              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    setActiveTab("shortcode-manager");
                    insertUrlParam("tab", "shortcode-manager");
                    removeUrlParam("shortcode_id");
                    setShopSettings({ ...shopSettings });
                    setShopId(null);
                  }}
                  className={`${activeTab == "shortcode-manager" ? "active" : ""}`}
                >
                  <i className="dashicons-before dashicons-screenoptions"></i>
                  <span>My Shortcodes</span>
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    setActiveTab("shortcode-new");
                    insertUrlParam("tab", "shortcode-new");
                    removeUrlParam("shortcode_id");
                    setShopSettings({ ...initialSettings });
                    setShopId(null);
                  }}
                  className={`${activeTab == "shortcode-new" ? "active" : ""}`}
                >
                  <i className="dashicons-before dashicons-insert"></i>
                  <span>New Shortcode</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="javascript:void(0);"
              onClick={() => {
                setActiveTab("settings");
                insertUrlParam("tab", "settings");
                removeUrlParam("shortcode_id");
                setShopSettings({ ...initialSettings });
                setShopId(null);
              }}
              className={`${activeTab == "settings" ? "active" : ""}`}
            >
              <i className="dashicons-before dashicons-admin-settings"></i>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavSidebar;
