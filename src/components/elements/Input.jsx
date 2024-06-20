import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext";
import Tooltip from "../elements/Tooltip";

const Input = ({
  title = "Button Text",
  name,
  type = "text",
  placeholder = "",
  tooltip = "",
}) => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <div className="afx-form-field flex-col !items-start">
      <label htmlFor="" className="flex gap-2 items-center">
        {title}: {tooltip ? <Tooltip text={tooltip} /> : ""}
      </label>
      <input
        type={type}
        placeholder={placeholder || title}
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
