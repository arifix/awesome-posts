import React, { useContext } from "react";
import { shortcodeContext } from "../../contexts/shortcodeContext.jsx";

const Range = ({ title, min = 14, max = 50, name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(shortcodeContext);

  return (
    <>
      <div className="afx-ap-form-field flex-col !items-start">
        <label htmlFor="">{title}:</label>
        <div style={{ minWidth: 275 }}>
          <div className="flex justify-between w-full">
            <strong>{min}px</strong>
            <strong>{max}px</strong>
          </div>
          <input
            type="range"
            onChange={(e) =>
              setDefaultSettings({ ...defaultSettings, [name]: e.target.value })
            }
            value={defaultSettings[name]}
            min={min}
            max={max}
            className="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-gray-300 disabled:cursor-not-allowed"
          />
          <div className="text-sm mt-2">
            Selected Value:{" "}
            <span className="font-semibold">{defaultSettings[name]}px</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Range;
