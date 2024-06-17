import React, { useContext } from "react";
import { shopContext } from "../../contexts/shopContext.jsx";

const Toggle = ({ title = "Show Button", name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(shopContext);

  return (
    <div className="tss-form-field">
      <label
        htmlFor={name}
        className="!flex items-center flex-1 gap-5 !w-full cursor-pointer text-gray-500"
      >
        {title}:
        <div className="relative">
          <input
            id={name}
            type="checkbox"
            className="sr-only tss-switch"
            onChange={(e) => {
              setDefaultSettings({
                ...defaultSettings,
                [name]: e.target.checked,
              });
            }}
            checked={defaultSettings[name]}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
      </label>
    </div>
  );
};

export default Toggle;
