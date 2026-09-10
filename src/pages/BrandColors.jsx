import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../contexts/appContext";
import { ChromePicker } from "react-color";
import Divider from "../components/global/Divider.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const BrandColors = () => {
  const [saveText, setSaveText] = useState("Save Colors");

  const [brandColors, setBrandColors] = useState({
    color1: "#999",
    color2: "#AAA",
    color3: "#CCC",
    color4: "#DDD",
  });

  const [pickers, setPickers] = useState({
    picker1: false,
    picker2: false,
    picker3: false,
    picker4: false,
  });

  const { baseUrl, activeTab, setActiveTab, settings, setRefreshSettings } =
    useContext(appContext);

  useEffect(() => {
    if (settings?.colors) {
      let color_obj = {};
      Object.keys(settings.colors).forEach(function (key, index) {
        color_obj = { ...color_obj, [key]: settings.colors[key] };
      });

      setBrandColors(color_obj);
    }
  }, [settings]);

  const saveColors = () => {
    setSaveText("Saving Colors...");

    const colors = {
      colors: brandColors,
    };

    axios
      .post(
        baseUrl + "settings" + "/?_wpnonce=" + afxApApp.nonce,
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
        setSaveText("Save Colors");
        setRefreshSettings(true);

        toast.success(res.data.message);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">Brand Colors</h2>
      </div>

      <Divider />

      <div className="p-5">
        <h3 className="heading-secondary">Brand Colors</h3>
        <div className="afx-form-field gap-5 color-groups">
          <div
            className="afx-color-picker"
            onClick={() =>
              setPickers({ ...pickers, picker1: !pickers.picker1 })
            }
            style={{
              backgroundColor: brandColors.color1,
              height: 50,
              width: 50,
            }}
          ></div>
          {pickers.picker1 ? (
            <div className="cp-popover">
              <div
                className="cp-cover"
                onClick={() => setPickers({ ...pickers, picker1: false })}
              />
              <ChromePicker
                color={brandColors.color1}
                onChange={(color) => {
                  setBrandColors({ ...brandColors, color1: color.hex });
                }}
              />
            </div>
          ) : null}

          <div
            className="afx-color-picker"
            onClick={() =>
              setPickers({ ...pickers, picker2: !pickers.picker2 })
            }
            style={{
              backgroundColor: brandColors.color2,
              height: 50,
              width: 50,
            }}
          ></div>
          {pickers.picker2 ? (
            <div className="cp-popover">
              <div
                className="cp-cover"
                onClick={() => setPickers({ ...pickers, picker2: false })}
              />
              <ChromePicker
                color={brandColors.color2}
                onChange={(color) => {
                  setBrandColors({ ...brandColors, color2: color.hex });
                }}
              />
            </div>
          ) : null}

          <div
            className="afx-color-picker"
            onClick={() =>
              setPickers({ ...pickers, picker3: !pickers.picker3 })
            }
            style={{
              backgroundColor: brandColors.color3,
              height: 50,
              width: 50,
            }}
          ></div>
          {pickers.picker3 ? (
            <div className="cp-popover">
              <div
                className="cp-cover"
                onClick={() => setPickers({ ...pickers, picker3: false })}
              />
              <ChromePicker
                color={brandColors.color3}
                onChange={(color) => {
                  setBrandColors({ ...brandColors, color3: color.hex });
                }}
              />
            </div>
          ) : null}
          <div
            className="afx-color-picker"
            onClick={() =>
              setPickers({ ...pickers, picker4: !pickers.picker4 })
            }
            style={{
              backgroundColor: brandColors.color4,
              height: 50,
              width: 50,
            }}
          ></div>
          {pickers.picker4 ? (
            <div className="cp-popover">
              <div
                className="cp-cover"
                onClick={() => setPickers({ ...pickers, picker4: false })}
              />
              <ChromePicker
                color={brandColors.color4}
                onChange={(color) => {
                  setBrandColors({ ...brandColors, color4: color.hex });
                }}
              />
            </div>
          ) : null}
        </div>

        <p>&nbsp;</p>

        <button
          type="button"
          className="action-button primary"
          onClick={() => saveColors()}
        >
          <i className="dashicons-before dashicons-yes"></i> {saveText}
        </button>
      </div>
    </div>
  );
};

export default BrandColors;
