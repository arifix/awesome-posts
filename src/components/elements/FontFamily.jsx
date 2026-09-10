import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext";
import Select from "react-select";

const FontFamily = ({ name }) => {
  const { defaultSettings, setDefaultSettings, fontsOptions } =
    useContext(gridContext);

  return (
    <div className="afx-form-field flex-col !items-start">
      <label htmlFor="">Font:</label>
      <Select
        options={fontsOptions}
        placeholder="Select One"
        value={fontsOptions.filter(
          (option) => option.value === defaultSettings[name]
        )}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: "100%",
            maxWidth: 300,
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

export default FontFamily;
