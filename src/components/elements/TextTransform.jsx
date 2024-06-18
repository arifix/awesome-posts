import React, { useContext } from "react";
import { styleContext } from "../../contexts/styleContext";
import Select from "react-select";
import { textTransformOptions } from "../../utils/const.ts";

const TextTransform = ({ name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(styleContext);

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
