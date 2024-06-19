import React from "react";
import FontFamily from "../elements/FontFamily.jsx";
import Range from "../elements/Range.jsx";
import FontWeight from "../elements/FontWeight.jsx";
import FontStyle from "../elements/FontStyle.jsx";
import TextDecoration from "../elements/TextDecoration.jsx";
import TextTransform from "../elements/TextTransform.jsx";
import Alignment from "../elements/Alignment.jsx";
import Color from "../elements/Color.jsx";
import InputGroup from "../elements/InputGroup.jsx";
import Border from "../elements/Border.jsx";
import Toggle from "../elements/Toggle.jsx";

const GridStyling = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-5 py-2">
        <FontFamily name="font" />
        <Range title="Font Size" name="fontSize" min={14} max={100} />
        <FontWeight name="fontWeight" />
        <FontStyle name="fontStyle" />
        <TextDecoration name="textDecoration" />
        <TextTransform name="textTransform" />
        <Alignment name="alignment" />
        <Color title="Text" name="color" />
        <InputGroup name="padding" title="Padding" min={0} max={50} />
        <InputGroup name="margin" title="Margin" min={0} max={50} />
        <Border name="border" min={0} max={20} />
        <Range title="Letter Spacing" name="letterSpacing" min={-5} max={50} />
        <Range title="Word Spacing" name="wordSpacing" min={-5} max={50} />
        <Range title="Line Height" name="lineHeight" min={0} max={100} />

        <Color title="Background" name="bgColor" />
        <Range title="Border Radius" name="borderRadius" min={0} max={50} />
        <Toggle title="Show Section" name="showSection" />
      </div>
    </div>
  );
};

export default GridStyling;
