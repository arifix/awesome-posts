import React, { useContext, useState, useEffect } from "react";
import ShortcodeManager from "../../pages/ShortcodeManager";
import ShortcodeNew from "../../pages/ShortcodeNew";
import Settings from "../../pages/Settings";
import { appContext } from "../../contexts/appContext";

const Container = () => {
  const { settings, activeTab, setActiveTab } = useContext(appContext);

  return (
    <div className="afx-ap-container">
      {activeTab === "shortcode-manager" ? <ShortcodeManager /> : ""}
      {activeTab === "shortcode-new" ? <ShortcodeNew /> : ""}
      {activeTab === "settings" ? <Settings /> : ""}
    </div>
  );
};

export default Container;
