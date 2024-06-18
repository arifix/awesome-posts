import React, { useContext } from "react";
import { shortcodeContext } from "../../contexts/shortcodeContext";
import Select from "react-select";
import { textTransformOptions } from "../../utils/const.ts";

const TextTransform = ({ name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(shortcodeContext);

  return (
    <div className="afx-form-field flex-col !items-start">
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
            width: 300,
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
