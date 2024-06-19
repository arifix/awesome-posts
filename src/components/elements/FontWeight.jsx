import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext";
import Select from "react-select";
import { fontWeightOptions } from "../../utils/const.js";

const FontWeight = ({ name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <div className="afx-form-field flex-col !items-start">
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
