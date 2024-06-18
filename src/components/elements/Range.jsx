import React, { useContext } from "react";
import { shortcodeContext } from "../../contexts/shortcodeContext";

const Range = ({ title, min = 14, max = 50, name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(shortcodeContext);

  return (
    <>
      <div className="afx-ap-form-field flex-col !items-start">
        <label htmlFor="">{title}:</label>
        <div className="min-w-[300px]">
          <div className="flex justify-between w-full">
            <span>{min}px</span>
            <span>{max}px</span>
          </div>
          <input
            type="range"
            onChange={(e) =>
              setDefaultSettings({ ...defaultSettings, [name]: e.target.value })
            }
            value={defaultSettings[name]}
            min={min}
            max={max}
            className="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-gray-300 disabled:cursor-not-allowed accent-brand-primary"
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
