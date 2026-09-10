import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext";

const Alignment = ({ name }) => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <div className="afx-form-field flex-col !items-start">
      <label htmlFor="">Text Alignment:</label>
      <div className="grid w-48 grid-cols-4 gap-2 rounded p-1">
        {["left", "center", "right", "justify"].map((val, _id) => (
          <div key={_id}>
            <input
              type="radio"
              name={name}
              value={val}
              className="peer !hidden"
              checked={defaultSettings[name] === val}
              readOnly
            />
            <label
              htmlFor=""
              className="block !w-auto !text-base cursor-pointer select-none rounded p-2 text-center peer-checked:bg-ap-primary peer-checked:font-bold peer-checked:text-white"
              onClick={(e) =>
                setDefaultSettings({
                  ...defaultSettings,
                  [name]: val,
                })
              }
            >
              <svg
                className={`mx-auto ${
                  defaultSettings[name] === val ? "fill-white" : "fill-black"
                }`}
                width="25px"
                height="25px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                {val === "left" && (
                  <path d="M4 4.75h12c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-12c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0zM28 27.25h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM4 20.75h12c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-12c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0zM4 12.75h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0z"></path>
                )}
                {val === "center" && (
                  <path d="M10 4.75h12c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-12c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0zM28 27.25h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM10 19.25c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h12c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM4 12.75h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0z"></path>
                )}
                {val === "right" && (
                  <path d="M16 4.75h12c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-12c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0zM28 27.25h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM28 19.25h-12c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h12c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM28 11.25h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"></path>
                )}
                {val === "justify" && (
                  <path d="M4 4.76h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0zM28 27.25h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM28 19.213h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM28 11.25h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h24c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"></path>
                )}
              </svg>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alignment;
