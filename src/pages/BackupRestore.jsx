import React, { useContext, useRef, useState, useEffect } from "react";
import { appContext } from "../contexts/appContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import Divider from "../components/global/Divider.jsx";
import Modal from "../components/global/Modal";
import { removeUrlParam } from "../utils/const.js";

const BackupRestore = () => {
  const jsonUpload = useRef(null);
  const [reset, setReset] = useState("Reset All Settings");
  const [code, setCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { baseUrl, mediaUrl, setRefreshSettings, settings, setActiveTab } =
    useContext(appContext);

  useEffect(() => {
    setCode(settings);
  }, [settings]);

  const downloadBackup = () => {
    const toastId = toast.loading("Downloading Backup...");
    axios
      .post(
        baseUrl + "settings/backup" + "/?_wpnonce=" + afxApApp.nonce,
        {},
        {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": afxApApp.nonce,
          },
        }
      )
      .then((res) => {
        if (res?.data?.file_url) {
          axios({
            url: res.data.file_url,
            method: "GET",
            responseType: "blob",
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", res.data.file_name);
            document.body.appendChild(link);
            link.click();
            toast.dismiss(toastId);
            toast.success("Backup Downloaded Successfully!");
          });
        }
      });
  };

  const restoreSettings = () => {
    if (jsonUpload.current.files[0]) {
      const toastId = toast.loading("Restoring Settings...");
      var formData = new FormData();
      let file = jsonUpload.current.files[0];
      formData.append("file", file);
      formData.append("title", file.name);

      axios
        .post(mediaUrl + "/?_wpnonce=" + afxApApp.nonce, formData, {
          headers: {
            "Content-Disposition": "form-data; filename='" + file.name + "'",
            "X-WP-NONCE": afxApApp.nonce,
          },
        })
        .then((res) => {
          const file_id = res.data.id;
          const json_url = res.data.source_url;

          axios
            .post(
              baseUrl + "settings/restore" + "/?_wpnonce=" + afxApApp.nonce,
              {
                file_id,
                json_url,
              },
              {
                headers: {
                  "content-type": "application/json",
                  "X-WP-NONCE": afxApApp.nonce,
                },
              }
            )
            .then((res) => {
              jsonUpload.current.value = "";
              setRefreshSettings(true);
              toast.dismiss(toastId);
              toast.success(res.data.message);
            });
        });
    }
  };

  const resetSettings = () => {
    setReset("Reseting All Settings...");

    axios
      .post(
        baseUrl + "settings/reset" + "/?_wpnonce=" + afxApApp.nonce,
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
        setReset("Reset All Settings");
        removeUrlParam("tab");
        setActiveTab("grid-manager");
        setRefreshSettings(true);

        toast.success(res.data.message);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">Backup &amp; Restore</h2>
      </div>

      <Divider />

      <div className="p-5">
        <h3 className="heading-secondary">Backup &amp; Restore</h3>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-20 lg:gap-16 bg-white rounded-lg shadow-lg p-5 lg:p-10">
          <div className="w-1/2 flex justify-center items-center">
            <button
              type="button"
              className="action-button primary"
              onClick={() => downloadBackup()}
            >
              <i className="dashicons-before dashicons-yes"></i> Download Backup
            </button>
          </div>

          <form className="w-1/2 flex flex-col justify-center items-center text-center">
            <div className="flex w-full justify-center items-center bg-grey-lighter mb-5">
              <label className="w-64 flex flex-col items-center px-4 py-6 text-primary rounded-lg shadow-lg tracking-wide uppercase border border-primary cursor-pointer hover:bg-gray-100 hover:text-primary-500">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"></path>
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Click to Upload the JSON Backup file
                </span>
                <input
                  type="file"
                  ref={jsonUpload}
                  accept="application/JSON"
                  required
                  className="hidden"
                  onChange={() => restoreSettings()}
                />
              </label>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 mt-5 pb-6">
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

export default BackupRestore;
