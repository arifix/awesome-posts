import React, { useContext, useState } from "react";
import { shopContext } from "../../contexts/shopContext.jsx";
import { SketchPicker } from "react-color";

const Color = ({ title = "Text", name }) => {
  const [showPicker, setPicker] = useState(false);
  const { defaultSettings, setDefaultSettings, pickerColors } =
    useContext(shopContext);

  return (
    <div className="tss-form-field flex-col !items-start">
      <label htmlFor="">{title}&nbsp;Color:</label>
      <div
        className="tss-color-picker"
        onClick={() => setPicker(!showPicker)}
        style={{ backgroundColor: defaultSettings[name] }}
      ></div>
      {showPicker ? (
        <div className="cp-popover">
          <div className="cp-cover" onClick={() => setPicker(false)} />
          <SketchPicker
            presetColors={pickerColors}
            color={defaultSettings[name]}
            onChange={(c) => {
              setDefaultSettings({
                ...defaultSettings,
                [name]: c.hex,
              });
            }}
            disableAlpha
          />
        </div>
      ) : null}
    </div>
  );
};

export default Color;
