import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext.jsx";
import Input from "../elements/Input.jsx";
import Select from "react-select";
import { gridStyleOptions } from "../../utils/const.js";

const GridSettings = () => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <>
      <h3 className="heading-secondary text-2xl pb-5">Grid Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-5 py-2">
        <Input title="Grid Title" name="gridTitle" />

        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">Grid Style:</label>
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

      <div className="px-5 py-2">
        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">Grid Columns:</label>
          <div className="w-full flex flex-wrap gap-5">
            {["One", "Two", "Three", "Four", "Five", "Six"].map((val, id) => (
              <label
                key={id}
                className="w-full max-w-52 cursor-pointer"
                htmlFor=""
                onClick={(e) =>
                  setDefaultSettings({
                    ...defaultSettings,
                    gridColumns: id + 1,
                  })
                }
              >
                <input
                  type="radio"
                  className="peer sr-only"
                  name="gridColumns"
                  value={id + 1}
                  checked={defaultSettings.gridColumns === id + 1}
                />
                <div className="w-full rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-indigo-500 peer-checked:ring-indigo-500 peer-checked:ring-offset-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <i className="dashicons-before dashicons-screenoptions"></i>
                      <div>
                        {defaultSettings.gridColumns === id + 1 ? (
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-slate-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <p>
                        <span className="font-bold text-lg">{val} Column</span>
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GridSettings;
