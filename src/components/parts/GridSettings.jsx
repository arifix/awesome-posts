import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext.jsx";
import Input from "../elements/Input.jsx";
import Select from "react-select";
import { gridStyleOptions, columnOptions } from "../../utils/const.js";
import Toggle from "../elements/Toggle.jsx";
import Tooltip from "../elements/Tooltip.jsx";

const GridSettings = () => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <>
      <h3 className="heading-secondary text-2xl pb-5">Grid Settings</h3>

      {/* Grid Info */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-5 py-2">
        <Input title="Grid Title" name="gridTitle" />

        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">Grid Style: </label>
          <Select
            options={gridStyleOptions}
            placeholder="Style #1"
            value={gridStyleOptions.filter(
              (option) => option.value === defaultSettings.gridStyle
            )}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: 275,
                height: 42,
              }),
            }}
            onChange={(newValue) => {
              setDefaultSettings({
                ...defaultSettings,
                gridStyle: newValue.value,
              });
            }}
          />
        </div>
      </div>

      {/* Grid Column */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-5 py-2">
        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">Grid Column (Desktop):</label>
          <Select
            options={columnOptions}
            placeholder="Column 3"
            value={columnOptions.filter(
              (option) => option.value === defaultSettings.gridColumnsD
            )}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: 275,
                height: 42,
              }),
            }}
            onChange={(newValue) => {
              setDefaultSettings({
                ...defaultSettings,
                gridColumnsD: newValue.value,
              });
            }}
          />
        </div>

        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">Grid Column (Tablet):</label>
          <Select
            options={columnOptions}
            placeholder="Column 2"
            value={columnOptions.filter(
              (option) => option.value === defaultSettings.gridColumnsT
            )}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: 275,
                height: 42,
              }),
            }}
            onChange={(newValue) => {
              setDefaultSettings({
                ...defaultSettings,
                gridColumnsT: newValue.value,
              });
            }}
          />
        </div>

        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">Grid Column (Mobile):</label>
          <Select
            options={columnOptions}
            placeholder="Column 1"
            value={columnOptions.filter(
              (option) => option.value === defaultSettings.gridColumnsM
            )}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: 275,
                height: 42,
              }),
            }}
            onChange={(newValue) => {
              setDefaultSettings({
                ...defaultSettings,
                gridColumnsM: newValue.value,
              });
            }}
          />
        </div>
      </div>

      {/* Grid Extra */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-5 py-2">
        <Toggle title="Display Load More Button?" name="gridLoadMoreBtn" />
      </div>
    </>
  );
};

export default GridSettings;
