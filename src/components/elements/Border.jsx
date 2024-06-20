import React, { useContext, useState } from "react";
import { gridContext } from "../../contexts/gridContext";
import { SketchPicker } from "react-color";
import Select from "react-select";
import { borderOptions } from "../../utils/const.js";

const Border = ({ name, min, max }) => {
  const [showPicker, setPicker] = useState(false);
  const [grouped, setGrouped] = useState(true);

  const { defaultSettings, setDefaultSettings, pickerColors } =
    useContext(gridContext);

  return (
    <div className="afx-form-field flex-col !items-start">
      <label htmlFor="">Border:</label>
      <div className="flex gap-1">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-1 top-2.5 h-6 w-6 text-slate-500"
          >
            <path
              d="M12 4L6 10M12 4L18 10M12 4L12 14.5M12 20V17.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="number"
            name={name}
            min={min}
            max={max}
            className="afx-input arrow-hidden pl-7"
            style={{ width: 65 }}
            autoComplete="off"
            value={defaultSettings[name].top}
            onChange={(e) => {
              let val = {};
              if (grouped) {
                val.top = e.target.value;
                val.right = e.target.value;
                val.bottom = e.target.value;
                val.left = e.target.value;
              } else {
                val.top = e.target.value;
              }

              setDefaultSettings({
                ...defaultSettings,
                [name]: { ...defaultSettings[name], ...val },
              });
            }}
          />
        </div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-1 top-2.5 h-6 w-6 text-slate-500"
          >
            <path
              d="M4 12H6.5M20 12L14 6M20 12L14 18M20 12H9.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="number"
            name={name}
            min={min}
            max={max}
            className="afx-input arrow-hidden pl-7"
            style={{ width: 65 }}
            autoComplete="off"
            value={defaultSettings[name].right}
            onChange={(e) => {
              let val = {};
              if (grouped) {
                val.top = e.target.value;
                val.right = e.target.value;
                val.bottom = e.target.value;
                val.left = e.target.value;
              } else {
                val.right = e.target.value;
              }

              setDefaultSettings({
                ...defaultSettings,
                [name]: { ...defaultSettings[name], ...val },
              });
            }}
          />
        </div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-1 top-2.5 h-6 w-6 text-slate-500"
          >
            <path
              d="M12 20L18 14M12 20L6 14M12 20L12 9.5M12 4V6.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="number"
            name={name}
            min={min}
            max={max}
            className="afx-input arrow-hidden pl-7"
            style={{ width: 65 }}
            autoComplete="off"
            value={defaultSettings[name].bottom}
            onChange={(e) => {
              let val = {};
              if (grouped) {
                val.top = e.target.value;
                val.right = e.target.value;
                val.bottom = e.target.value;
                val.left = e.target.value;
              } else {
                val.bottom = e.target.value;
              }

              setDefaultSettings({
                ...defaultSettings,
                [name]: { ...defaultSettings[name], ...val },
              });
            }}
          />
        </div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-1 top-2.5 h-6 w-6 text-slate-500"
          >
            <path
              d="M4 12L10 6M4 12L10 18M4 12H14.5M20 12H17.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="number"
            name={name}
            min={min}
            max={max}
            className="afx-input arrow-hidden pl-7"
            style={{ width: 65 }}
            autoComplete="off"
            value={defaultSettings[name].left}
            onChange={(e) => {
              let val = {};
              if (grouped) {
                val.top = e.target.value;
                val.right = e.target.value;
                val.bottom = e.target.value;
                val.left = e.target.value;
              } else {
                val.left = e.target.value;
              }

              setDefaultSettings({
                ...defaultSettings,
                [name]: { ...defaultSettings[name], ...val },
              });
            }}
          />
        </div>
        <button
          className={`afx-input group p-3 border border-gray-400 flex justify-center items-center hover:bg-ap-primary ${
            grouped ? "bg-ap-primary" : ""
          }`}
          style={{ width: 50 }}
          onClick={() => {
            setGrouped(!grouped);
            setDefaultSettings({
              ...defaultSettings,
              [name]: {
                ...defaultSettings[name],
                top: defaultSettings[name].top,
                right: defaultSettings[name].top,
                bottom: defaultSettings[name].top,
                left: defaultSettings[name].top,
              },
            });
          }}
          data-tooltip-id="afx-ap-tooltip"
          data-tooltip-content={grouped ? "Ungroup Values" : "Group Values"}
        >
          {grouped ? (
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:fill-white fill-white"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <path d="M39,29.3V18.7A8,8,0,0,0,37,3a8,8,0,0,0-7.7,6H18.7A8,8,0,0,0,3,11a8,8,0,0,0,6,7.7V29.3A8,8,0,0,0,11,45a8,8,0,0,0,7.7-6H29.3A8,8,0,1,0,39,29.3ZM37,7a4,4,0,1,1-4,4A4,4,0,0,1,37,7ZM7,11a4,4,0,1,1,4,4A4,4,0,0,1,7,11Zm4,30a4,4,0,1,1,4-4A4,4,0,0,1,11,41Zm18.3-6H18.7A7.9,7.9,0,0,0,13,29.3V18.7A7.9,7.9,0,0,0,18.7,13H29.3A7.9,7.9,0,0,0,35,18.7V29.3A7.9,7.9,0,0,0,29.3,35ZM37,41a4,4,0,1,1,4-4A4,4,0,0,1,37,41Z" />
                </g>
              </g>
            </svg>
          ) : (
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:fill-white fill-black"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <g>
                    <path d="M12,29.3V18.7A7.9,7.9,0,0,0,17.7,13H28.3a8,8,0,1,0,0-4H17.7A8,8,0,0,0,10,3,8,8,0,0,0,8,18.7V29.3a8,8,0,1,0,4,0ZM36,7a4,4,0,1,1-4,4A4,4,0,0,1,36,7ZM6,11a4,4,0,1,1,4,4A4,4,0,0,1,6,11Zm4,30a4,4,0,1,1,4-4A4,4,0,0,1,10,41Z" />
                    <path d="M38,29.3V25a2,2,0,0,0-4,0v4.3A7.9,7.9,0,0,0,28.3,35H24a2,2,0,0,0,0,4h4.3A8,8,0,1,0,38,29.3ZM36,41a4,4,0,1,1,4-4A4,4,0,0,1,36,41Z" />
                  </g>
                </g>
              </g>
            </svg>
          )}
        </button>
      </div>
      <div className="flex gap-5 items-center">
        <Select
          options={borderOptions}
          placeholder="Large"
          value={borderOptions.filter(
            (option) => option.value === defaultSettings[name].type
          )}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              width: 250,
            }),
          }}
          onChange={(newValue) => {
            setDefaultSettings({
              ...defaultSettings,
              [name]: { ...defaultSettings[name], type: newValue.value },
            });
          }}
        />
        <div
          className="afx-color-picker"
          onClick={() => setPicker(!showPicker)}
          style={{ backgroundColor: defaultSettings[name].color }}
        ></div>
        {showPicker ? (
          <div className="cp-popover">
            <div className="cp-cover" onClick={() => setPicker(false)} />
            <SketchPicker
              presetColors={pickerColors}
              color={defaultSettings[name].color}
              onChange={(c) => {
                setDefaultSettings({
                  ...defaultSettings,
                  [name]: { ...defaultSettings[name], color: c.hex },
                });
              }}
              disableAlpha
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Border;
