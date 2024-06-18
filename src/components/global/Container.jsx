import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../../contexts/appContext";
import GridManager from "../../pages/GridManager";
import GridNew from "../../pages/GridNew";
import BrandColors from "../../pages/BrandColors";
import FontsManager from "../../pages/FontsManager";
import BackupRestore from "../../pages/BackupRestore";

const Container = () => {
  const { activeTab } = useContext(appContext);

  return (
    <div className="afx-ap-container">
      {activeTab === "grid-manager" ? <GridManager /> : ""}
      {activeTab === "grid-new" ? <GridNew /> : ""}
      {activeTab === "brand-colors" ? <BrandColors /> : ""}
      {activeTab === "fonts-manager" ? <FontsManager /> : ""}
      {activeTab === "backup-restore" ? <BackupRestore /> : ""}
    </div>
  );
};

export default Container;
