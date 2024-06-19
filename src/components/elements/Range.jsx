import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext";

const Range = ({ title, min = 14, max = 50, name, unit = "px" }) => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <>
      <div className="afx-form-field flex-col !items-start">
        <label htmlFor="">{title}:</label>
        <div className="min-w-[300px]">
          <div className="flex justify-between w-full">
            <span className="text-base">
              {min}
              {unit}
            </span>
            <span className="text-base">
              {max}
              {unit}
            </span>
          </div>
          <input
            type="range"
            onChange={(e) =>
              setDefaultSettings({ ...defaultSettings, [name]: e.target.value })
            }
            value={defaultSettings[name]}
            min={min}
            max={max}
            className="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-gray-300 disabled:cursor-not-allowed accent-ap-primary"
          />
          <div className="text-base mt-2">
            Selected Value:{" "}
            <span className="font-semibold">
              {defaultSettings[name]}
              {unit}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Range;
