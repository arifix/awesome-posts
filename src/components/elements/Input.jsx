import React, { useContext } from "react";
import { shopContext } from "../../contexts/shopContext.jsx";

const Input = ({ title = "Button Text", name, type = "text" }) => {
  const { defaultSettings, setDefaultSettings } = useContext(shopContext);

  return (
    <div className="tss-form-field flex-col !items-start">
      <label htmlFor="">{title}:</label>
      <input
        type={type}
        placeholder={title}
        className="tss-input"
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
