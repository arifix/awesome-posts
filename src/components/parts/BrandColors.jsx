import React, { useState } from "react";
import { ChromePicker } from "react-color";

const BrandColors = ({ brandColors, setBrandColors }) => {
  const [pickers, setPickers] = useState({
    picker1: false,
    picker2: false,
    picker3: false,
    picker4: false,
  });

  return (
    <div className="tss-brand-colors p-5">
      <h3 className="heading-secondary">Brand Colors</h3>
      <div className="tss-form-field gap-5 color-groups">
        <div
          className="tss-color-picker"
          onClick={() => setPickers({ ...pickers, picker1: !pickers.picker1 })}
          style={{ backgroundColor: brandColors.color1, height: 50, width: 50 }}
        ></div>
        {pickers.picker1 ? (
          <div className="cp-popover">
            <div
              className="cp-cover"
              onClick={() => setPickers({ ...pickers, picker1: false })}
            />
            <ChromePicker
              color={brandColors.color1}
              onChange={(color) => {
                setBrandColors({ ...brandColors, color1: color.hex });
              }}
            />
          </div>
        ) : null}

        <div
          className="tss-color-picker"
          onClick={() => setPickers({ ...pickers, picker2: !pickers.picker2 })}
          style={{ backgroundColor: brandColors.color2, height: 50, width: 50 }}
        ></div>
        {pickers.picker2 ? (
          <div className="cp-popover">
            <div
              className="cp-cover"
              onClick={() => setPickers({ ...pickers, picker2: false })}
            />
            <ChromePicker
              color={brandColors.color2}
              onChange={(color) => {
                setBrandColors({ ...brandColors, color2: color.hex });
              }}
            />
          </div>
        ) : null}

        <div
          className="tss-color-picker"
          onClick={() => setPickers({ ...pickers, picker3: !pickers.picker3 })}
          style={{ backgroundColor: brandColors.color3, height: 50, width: 50 }}
        ></div>
        {pickers.picker3 ? (
          <div className="cp-popover">
            <div
              className="cp-cover"
              onClick={() => setPickers({ ...pickers, picker3: false })}
            />
            <ChromePicker
              color={brandColors.color3}
              onChange={(color) => {
                setBrandColors({ ...brandColors, color3: color.hex });
              }}
            />
          </div>
        ) : null}
        <div
          className="tss-color-picker"
          onClick={() => setPickers({ ...pickers, picker4: !pickers.picker4 })}
          style={{ backgroundColor: brandColors.color4, height: 50, width: 50 }}
        ></div>
        {pickers.picker4 ? (
          <div className="cp-popover">
            <div
              className="cp-cover"
              onClick={() => setPickers({ ...pickers, picker4: false })}
            />
            <ChromePicker
              color={brandColors.color4}
              onChange={(color) => {
                setBrandColors({ ...brandColors, color4: color.hex });
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BrandColors;
