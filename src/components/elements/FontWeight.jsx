import React, { useContext } from "react";
import { shortcodeContext } from "../../contexts/shortcodeContext";
import Select from "react-select";
import { fontWeightOptions } from "../../utils/const.ts";

const FontWeight = ({ name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(shortcodeContext);

  return (
    <div className="afx-ap-form-field flex-col !items-start">
      <label htmlFor="">Font Weight:</label>
      <Select
        options={fontWeightOptions}
        placeholder="Large"
        value={fontWeightOptions.filter(
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

export default FontWeight;
