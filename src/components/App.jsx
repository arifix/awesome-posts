import React, { useState, useMemo, useEffect } from "react";
import "../../assets/css/admin.css";
import { appContext } from "../contexts/appContext";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Sidebar from "./global/Sidebar";
import Container from "./global/Container";
import SidebarToggle from "./global/SidebarToggle";
import { Tooltip } from "react-tooltip";
import { insertUrlParam, removeUrlParam } from "../utils/const";

const App = () => {
  const [refreshSettings, setRefreshSettings] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("grid-manager");
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [gridId, setGridId] = useState(null);

  const baseUrl = `${afxApApp.apiUrl}/arifix-ap-/v1/`;
  const mediaUrl = `${afxApApp.apiUrl}/wp/v2/media/`;

  const pages = [
    "grid-manager",
    "grid-new",
    "brand-colors",
    "fonts-manager",
    "backup-restore",
    "about",
  ];

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
      window.history.go(1);
    };
  }, []);

  useEffect(() => {
    const show_sidebar = localStorage.getItem("ap_show_sidebar");
    if (show_sidebar) {
      setShowSidebar(show_sidebar === "YES" ? true : false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ap_show_sidebar", showSidebar ? "YES" : "NO");
  }, [showSidebar]);

  useEffect(() => {
    axios
      .get(baseUrl + "settings" + "/?_wpnonce=" + afxApApp.nonce)
      .then((res) => {
        if (res?.data) {
          const setting = res?.data?.settings
            ? JSON.parse(res.data.settings)
            : "";
          setSettings(setting);
          setRefreshSettings(false);
        }
        setLoading(false);
      });

    const queryParameters = new URLSearchParams(window.location.search);
    const tab = queryParameters.get("tab");
    if (tab && pages.includes(tab)) {
      setActiveTab(tab);
    }
  }, [refreshSettings]);

  const appValues = useMemo(() => {
    return {
      baseUrl,
      mediaUrl,
      settings,
      activeTab,
      setActiveTab,
      refreshSettings,
      setRefreshSettings,
      showSidebar,
      setShowSidebar,
      gridId,
      setGridId,
    };
  }, [
    settings,
    activeTab,
    setActiveTab,
    setRefreshSettings,
    showSidebar,
    gridId,
    setGridId,
  ]);

  return (
    <appContext.Provider value={appValues}>
      <div className="flex relative">
        <Sidebar />

        <div className={`${showSidebar ? "w-5/6" : "w-full"}`}>
          <SidebarToggle />
          <div className="arifix-ap-container">
            <Container />
          </div>

          {activeTab != "grid-new" && (
            <div className="group fixed bottom-5 right-3 p-3 flex items-end justify-end w-28 h-28">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("grid-new");
                  insertUrlParam("tab", "grid-new");
                  removeUrlParam("grid_id");
                  setGridId(null);
                }}
                data-tooltip-id="arifix-ap-tooltip"
                data-tooltip-content="Add new Grid"
                className="text-white shadow-xl flex items-center justify-center p-4 rounded-full bg-ap-primary hover:bg-ap-secondary z-50 absolute cursor-pointer"
              >
                <i className="dashicons-before dashicons-plus dashicons-cus"></i>
              </div>
            </div>
          )}

          <Tooltip id="arifix-ap-tooltip" />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
              style: {
                border: "1px solid #745ff1",
                color: "#000",
                backgroundColor: "#FFF",
                fontSize: 16,
                padding: 15,
              },
            }}
          />
        </div>
      </div>
    </appContext.Provider>
  );
};

export default App;
