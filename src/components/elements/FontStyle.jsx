import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext";
import Select from "react-select";
import { fontStyleOptions } from "../../utils/const.js";

const FontStyle = ({ name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <div className="afx-form-field flex-col !items-start">
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
