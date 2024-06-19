import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext";
import Select from "react-select";
import { textDecorationOptions } from "../../utils/const.ts";

const TextDecoration = ({ name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <div className="afx-form-field flex-col !items-start">
      <label htmlFor="">Text Decoration:</label>
      <Select
        options={textDecorationOptions}
        placeholder="Large"
        value={textDecorationOptions.filter(
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

export default TextDecoration;
