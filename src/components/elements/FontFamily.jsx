import React, { useContext } from "react";
import { styleContext } from "../../contexts/styleContext";
import Select from "react-select";

const FontFamily = ({ name }) => {
  const { defaultSettings, setDefaultSettings, fontsOptions } =
    useContext(styleContext);

  return (
    <div className="afx-ap-form-field flex-col !items-start">
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

export default FontFamily;
