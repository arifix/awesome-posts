import React, { useContext } from "react";
import { shortcodeContext } from "../../contexts/shortcodeContext";

const Input = ({ title = "Button Text", name, type = "text" }) => {
  const { defaultSettings, setDefaultSettings } = useContext(shortcodeContext);

  return (
    <div className="afx-form-field flex-col !items-start">
      <label htmlFor="">{title}:</label>
      <input
        type={type}
        placeholder={title}
        className="afx-input"
        value={defaultSettings[name]}
        onChange={(e) =>
          setDefaultSettings({
            ...defaultSettings,
            [name]: e.target.value,
          })
        }
      />
    </div>
  );
};

export default Input;
