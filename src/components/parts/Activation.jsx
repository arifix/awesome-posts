import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../../contexts/appContext";
import axios from "axios";
import toast from "react-hot-toast";

const Activation = ({ saveText, saveAllSettings }) => {
  const [activation, setActivation] = useState("");
  const [activationKey, setActivationKey] = useState("");
  const [loader, setLoader] = useState("Verify Activation");
  const [error, setError] = useState(false);

  const { baseUrl, settings, setRefreshSettings } =
    useContext(appContext);

  useEffect(() => {
    setActivation(settings.activation);
    setActivationKey(settings?.activation?.activation_key || "");
  }, [settings]);

  const checkActivation = () => {
    if (activationKey == "") {
      setError(true);
    } else {
      setError(false);
      setLoader("Checking Activation...");
      axios
        .post(
          baseUrl + 'activation',
          {
            activation_key: activationKey,
          },
          {
            headers: {
              "content-type": "application/json",
              "X-WP-NONCE": afxApApp.nonce,
            },
          }
        )
        .then((res) => {
          setLoader("Verify Activation");
          setRefreshSettings(true);
          toast.success(res.data.message);
        });
    }
  };

  return (
    <div className="afx-ap-activation p-5">
      <div className="flex justify-between items-center pr-5 mb-5">
        <h3 className="heading-secondary pb-0">Activation</h3>
        {activation ? (
          <button
            type="button"
            className="action-button primary"
            onClick={() => saveAllSettings()}
          >
            <i className="dashicons-before dashicons-yes"></i> {saveText}
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="afx-ap-form-field flex-col !items-start">
        <label htmlFor="activation">Activation Key</label>
        <input
          type="text"
          minlength="24"
          maxlength="24"
          placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
          className={`afx-ap-input ${error ? "afx-ap-input-error" : ""}`}
          required=""
          value={activationKey}
          onChange={(e) => setActivationKey(e.target.value)}
        />
      </div>

      <div className="text-lg mb-3 -mt-3">
        Status:{" "}
        {activation ? (
          <>
            <strong className="text-green-600">Valid</strong>
            <p className="text-base">Expiry Date: {activation.expiry_date}</p>
          </>
        ) : (
          <strong className="text-red-600">Invalid</strong>
        )}
      </div>

      <button
        type="button"
        className="action-button secondary"
        onClick={() => checkActivation()}
      >
        <i className="dashicons-before dashicons-update"></i> {loader}
      </button>
    </div>
  );
};

export default Activation;
