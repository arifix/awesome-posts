import React, { useContext, useState, useEffect } from "react";
import ShopManager from "../../pages/ShopManager";
import ShopNew from "../../pages/ShopNew";
import Settings from "../../pages/Settings";
import { appContext } from "../../contexts/appContext";
import ShopDefault from "../../pages/ShopDefault";
import Product from "../../pages/Product";
import { insertUrlParam } from "../../utils/const.js";

const Container = () => {
  const [activation, setActivation] = useState("");
  const { settings, activeTab, setActiveTab } = useContext(appContext);

  useEffect(() => {
    setActivation(settings.activation);

    if (settings == "") {
      setActiveTab("settings");
      insertUrlParam("tab", "settings");
    }
  }, [settings]);

  return (
    <div className="afx-ap-container">
      {activation && new Date() < new Date(activation?.expiry_date) ? (
        <>
          {activeTab === "shop-default" ? <ShopDefault /> : ""}
          {activeTab === "shop-manager" ? <ShopManager /> : ""}
          {activeTab === "shop-new" ? <ShopNew /> : ""}
          {activeTab === "product" ? <Product /> : ""}
        </>
      ) : (
        ""
      )}
      {activeTab === "settings" ? <Settings /> : ""}
    </div>
  );
};

export default Container;
