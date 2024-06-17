import React, { useContext } from "react";
import { shortcodeContext } from "../../contexts/shortcodeContext.jsx";
import Select from "react-select";
import { textTransformOptions } from "../../utils/const.js";

const TextTransform = ({ name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(shortcodeContext);

  return (
    <div className="afx-ap-form-field flex-col !items-start">
      <label htmlFor="">Text Transform:</label>
      <Select
        options={textTransformOptions}
        placeholder="Large"
        value={textTransformOptions.filter(
          (option) => option.value === defaultSettings[name]
        )}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: 275,
          }),
        }}
        onChange={(newValue) => {
          setDefaultSettings({
            ...defaultSettings,
            [name]: newValue.value,
          });
        }}
      />
    </div>
  );
};

export default TextTransform;
