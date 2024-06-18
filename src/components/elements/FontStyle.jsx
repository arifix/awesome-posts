import React, { useContext } from "react";
import { styleContext } from "../../contexts/styleContext";
import Select from "react-select";
import { fontStyleOptions } from "../../utils/const.ts";

const FontStyle = ({ name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(styleContext);

  return (
    <div className="afx-ap-form-field flex-col !items-start">
      <label htmlFor="">Font Style:</label>
      <Select
        options={fontStyleOptions}
        placeholder="Large"
        value={fontStyleOptions.filter(
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

export default FontStyle;
