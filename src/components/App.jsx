import React, { useState, useMemo, useEffect } from "react";
import "../../assets/css/admin.css";
import { appContext } from "../contexts/appContext";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Sidebar from "./global/Sidebar";
import Container from "./global/Container";
import SidebarToggle from "./global/SidebarToggle";
import { Tooltip } from "react-tooltip";

const App = () => {
  const [refreshSettings, setRefreshSettings] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("grid-manager");
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [gridId, setGridId] = useState(null);

  const initialSettings = {
    gridTitle: "",
    gridColumns: 3,
    categories: {},
    postsPerPage: 9,
    postsOrder: "date:DESC",

    showProductTitle: false,
    productTitleFont: "",
    productTitleSize: 22,
    productTitleAlignment: "left",
    productTitleColor: "#000",

    showProductDes: false,
    productDesFont: "",
    productDesSize: 14,
    productDesAlignment: "left",
    productDesColor: "#000",

    showProductPrice: false,
    productPriceFont: "",
    productPriceSize: 18,
    productPriceAlignment: "left",
    productPriceColor: "#000",

    showProductButton: false,
    productButtonFont: "",
    productButtonSize: 18,
    productButtonAlignment: "center",
    productButtonBgColor: "#333",
    productButtonColor: "#FFF",
    productButtonText: "View Product",
    productButtonWidth: "medium",
    productButtonBorderRadius: 10,
  };

  const [gridSettings, setGridSettings] = useState({
    gridTitle: "",
    gridColumns: 3,
    categories: {},
    postsPerPage: 9,
    postsOrder: "date:DESC",

    showProductTitle: false,
    productTitleFont: "",
    productTitleSize: 22,
    productTitleAlignment: "left",
    productTitleColor: "#000",

    showProductDes: false,
    productDesFont: "",
    productDesSize: 14,
    productDesAlignment: "left",
    productDesColor: "#000",

    showProductPrice: false,
    productPriceFont: "",
    productPriceSize: 18,
    productPriceAlignment: "left",
    productPriceColor: "#000",

    showProductButton: false,
    productButtonFont: "",
    productButtonSize: 18,
    productButtonAlignment: "center",
    productButtonBgColor: "#333",
    productButtonColor: "#FFF",
    productButtonText: "View Product",
    productButtonWidth: "medium",
    productButtonBorderRadius: 10,
  });

  const baseUrl = `${afxApApp.apiUrl}/afx-ap/v1/`;
  const mediaUrl = `${afxApApp.apiUrl}/wp/v2/media/`;

  const pages = [
    "grid-manager",
    "grid-new",
    "brand-colors",
    "fonts-manager",
    "backup-restore",
  ];

  useEffect(() => {
    axios.get(baseUrl + "settings").then((res) => {
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
      gridSettings,
      setGridSettings,
      initialSettings,
      gridId,
      setGridId,
    };
  }, [
    settings,
    activeTab,
    setActiveTab,
    setRefreshSettings,
    showSidebar,
    gridSettings,
    setGridSettings,
    gridId,
    setGridId,
  ]);

  return (
    <appContext.Provider value={appValues}>
      <div className="flex relative">
        <Sidebar />

        <div className={`${showSidebar ? "w-5/6" : "w-full"}`}>
          <SidebarToggle />
          <div className="afx-ap-container">
            <Container />
          </div>

          <Tooltip id="afx-ap-tooltip" />
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
