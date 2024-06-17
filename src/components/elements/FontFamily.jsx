import React, { useContext } from "react";
import { shopContext } from "../../contexts/shopContext.jsx";
import Select from "react-select";

const FontFamily = ({ name }) => {
  const { defaultSettings, setDefaultSettings, fontsOptions } =
    useContext(shopContext);

  return (
    <div className="tss-form-field flex-col !items-start">
      <label htmlFor="">Font:</label>
      <Select
        options={fontsOptions}
        placeholder="Select One"
        value={fontsOptions.filter((option) => option.value === defaultSettings[name])}
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

export default FontFamily;
