import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../contexts/appContext";
import BrandColors from "../components/parts/BrandColors";
import FontsManager from "../components/parts/FontsManager";
import BackupRestore from "../components/parts/BackupRestore";
import Modal from "../components/global/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { removeUrlParam } from "../utils/const.js";
import Divider from "../components/global/Divider.jsx";

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [saveText, setSaveText] = useState("Save All Settings");
  const [reset, setReset] = useState("Reset Settings");
  const { baseUrl, activeTab, setActiveTab, settings, setRefreshSettings } =
    useContext(appContext);

  const [brandColors, setBrandColors] = useState({
    color1: "#FFF",
    color2: "#FFF",
    color3: "#FFF",
    color4: "#FFF",
  });

  useEffect(() => {
    if (settings?.colors) {
      let color_obj = {};
      Object.keys(settings.colors).forEach(function (key, index) {
        color_obj = { ...color_obj, [key]: settings.colors[key] };
      });

      setBrandColors(color_obj);
    }
  }, [settings]);

  const saveAllSettings = () => {
    setSaveText("Saving All Settings...");

    const colors = {
      colors: brandColors,
    };

    axios
      .post(
        baseUrl + "settings",
        {
          settings: JSON.stringify(colors),
        },
        {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": afxApApp.nonce,
          },
        }
      )
      .then((res) => {
        setSaveText("Save All Settings");
        setRefreshSettings(true);

        toast.success(res.data.message);
      });
  };

  const resetSettings = () => {
    setReset("Reseting...");

    axios
      .post(
        baseUrl + "settings/reset",
        {
          settings: "",
        },
        {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": afxApApp.nonce,
          },
        }
      )
      .then((res) => {
        setReset("Reset Settings");
        removeUrlParam("tab");
        setActiveTab("settings");
        setRefreshSettings(true);

        toast.success(res.data.message);
      });
  };

  return (
    <div
      className={`afx-ap-settings ${activeTab != "settings" ? "hidden" : ""}`}
    >
      <h2 className="heading-primary">Settings</h2>

      <Divider />

      <BrandColors brandColors={brandColors} setBrandColors={setBrandColors} />
      <FontsManager />
      <BackupRestore />

      <div className="flex justify-center items-center gap-5 mt-5 pb-6">
        <button
          type="button"
          className="action-button primary"
          onClick={() => saveAllSettings()}
        >
          <i className="dashicons-before dashicons-yes"></i> {saveText}
        </button>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="action-button secondary"
        >
          <i className="dashicons-before dashicons-warning"></i> {reset}
        </button>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleClose={() => {
          setShowModal(false);
        }}
        handleAction={resetSettings}
      >
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Reset Settings
          </h3>
          <div className="mt-2">
            <p className="text-sm leading-5 text-gray-500">
              Are you sure to reset all of the settings?
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
