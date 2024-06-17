import React, { useContext, useState, useEffect } from "react";
import ShopManager from "../../pages/ShopManager";
import ShopNew from "../../pages/ShopNew";
import Settings from "../../pages/Settings";
import { appContext } from "../../contexts/appContext";
import Product from "../../pages/Product";
import { insertUrlParam } from "../../utils/const.js";

const Container = () => {
  const { settings, activeTab, setActiveTab } = useContext(appContext);
  
  return (
    <div className="afx-ap-container">
      {activeTab === "shop-manager" ? <ShopManager /> : ""}
      {activeTab === "shop-new" ? <ShopNew /> : ""}
      {activeTab === "product" ? <Product /> : ""}
      {activeTab === "settings" ? <Settings /> : ""}
    </div>
  );
};

export default Container;
