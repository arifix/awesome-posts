import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext.jsx";
import FontFamily from "../elements/FontFamily.jsx";
import Range from "../elements/Range.jsx";
import FontWeight from "../elements/FontWeight.jsx";
import FontStyle from "../elements/FontStyle.jsx";
import TextDecoration from "../elements/TextDecoration.jsx";
import TextTransform from "../elements/TextTransform.jsx";
import Alignment from "../elements/Alignment.jsx";
import Color from "../elements/Color.jsx";
import InputGroup from "../elements/InputGroup.jsx";
import { fontsUrlToName } from "../../utils/const.js";

const GridStyling = () => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  let styles = `<style>`;
  if (defaultSettings.shFont) {
    const font = defaultSettings.shFont.includes("http")
      ? fontsUrlToName(defaultSettings.shFont)
      : defaultSettings.shFont;
    const font_url = defaultSettings.shFont.includes("http")
      ? defaultSettings.shFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.shFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.ap-sh{font-family: '${font}';}`;
  }

  if (defaultSettings.titleFont) {
    const font = defaultSettings.titleFont.includes("http")
      ? fontsUrlToName(defaultSettings.titleFont)
      : defaultSettings.titleFont;
    const font_url = defaultSettings.titleFont.includes("http")
      ? defaultSettings.titleFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.titleFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.ap-title{font-family: '${font}';}`;
  }

  if (defaultSettings.excerptFont) {
    const font = defaultSettings.excerptFont.includes("http")
      ? fontsUrlToName(defaultSettings.excerptFont)
      : defaultSettings.excerptFont;
    const font_url = defaultSettings.excerptFont.includes("http")
      ? defaultSettings.excerptFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.excerptFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.ap-excerpt{font-family: '${font}';}`;
  }
  styles += `<style>`;

  return (
    <>
      <h3 className="heading-secondary text-2xl pb-5">Styling</h3>

      <div dangerouslySetInnerHTML={{ __html: styles }}></div>

      {/* Shortcode Heading */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">Shortcode Heading</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
          <FontFamily name="shFont" />
          <Range title="Font Size" name="shFontSize" min={14} max={100} />
          <FontWeight name="shFontWeight" />
          <FontStyle name="shFontStyle" />
          <Color title="Color" name="shColor" />
          <TextDecoration name="shTextDecoration" />
          <TextTransform name="shTextTransform" />
          <Range title="Line Height" name="shLineHeight" min={0} max={100} />
          <InputGroup title="Padding" name="shPadding" min={0} max={50} />
          <InputGroup title="Margin" name="shMargin" min={0} max={50} />
          <Range
            title="Letter Spacing"
            name="shLetterSpacing"
            min={-5}
            max={50}
          />
          <Range title="Word Spacing" name="shWordSpacing" min={-5} max={50} />
          <Alignment name="shAlignment" />
        </div>

        <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
          <h4
            className="ap-sh"
            style={{
              fontSize: defaultSettings.shFontSize + "px",
              fontWeight: defaultSettings.shFontWeight,
              fontStyle: defaultSettings.shFontStyle,
              color: defaultSettings.shColor,
              textDecoration: defaultSettings.shTextDecoration,
              textTransform: defaultSettings.shTextTransform,
              lineHeight: defaultSettings.shLineHeight + "px",
              padding: `${defaultSettings.shPadding.top}px ${defaultSettings.shPadding.right}px ${defaultSettings.shPadding.bottom}px ${defaultSettings.shPadding.left}px`,
              margin: `${defaultSettings.shMargin.top}px ${defaultSettings.shMargin.right}px ${defaultSettings.shMargin.bottom}px ${defaultSettings.shMargin.left}px`,
              letterSpacing: defaultSettings.shLetterSpacing + "px",
              wordSpacing: defaultSettings.shWordSpacing + "px",
              textAlign: defaultSettings.shAlignment,
            }}
          >
            Sample Post Title
          </h4>
        </div>
      </div>

      {/* Post Title */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">Post Title</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
          <FontFamily name="titleFont" />
          <Range title="Font Size" name="titleFontSize" min={14} max={100} />
          <FontWeight name="titleFontWeight" />
          <FontStyle name="titleFontStyle" />
          <Color title="Color" name="titleColor" />
          <TextDecoration name="titleTextDecoration" />
          <TextTransform name="titleTextTransform" />
          <Range title="Line Height" name="titleLineHeight" min={0} max={100} />
          <InputGroup title="Padding" name="titlePadding" min={0} max={50} />
          <InputGroup title="Margin" name="titleMargin" min={0} max={50} />
          <Range
            title="Letter Spacing"
            name="titleLetterSpacing"
            min={-5}
            max={50}
          />
          <Range
            title="Word Spacing"
            name="titleWordSpacing"
            min={-5}
            max={50}
          />
          <Alignment name="titleAlignment" />
        </div>

        <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
          <h4
            className="ap-title"
            style={{
              fontSize: defaultSettings.titleFontSize + "px",
              fontWeight: defaultSettings.titleFontWeight,
              fontStyle: defaultSettings.titleFontStyle,
              color: defaultSettings.titleColor,
              textDecoration: defaultSettings.titleTextDecoration,
              textTransform: defaultSettings.titleTextTransform,
              lineHeight: defaultSettings.titleLineHeight + "px",
              padding: `${defaultSettings.titlePadding.top}px ${defaultSettings.titlePadding.right}px ${defaultSettings.titlePadding.bottom}px ${defaultSettings.titlePadding.left}px`,
              margin: `${defaultSettings.titleMargin.top}px ${defaultSettings.titleMargin.right}px ${defaultSettings.titleMargin.bottom}px ${defaultSettings.titleMargin.left}px`,
              letterSpacing: defaultSettings.titleLetterSpacing + "px",
              wordSpacing: defaultSettings.titleWordSpacing + "px",
              textAlign: defaultSettings.titleAlignment,
            }}
          >
            Sample Post Title
          </h4>
        </div>
      </div>

      {/* Post Excerpt */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">Post Excerpt</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
          <FontFamily name="excerptFont" />
          <Range title="Font Size" name="excerptFontSize" min={14} max={100} />
          <FontWeight name="excerptFontWeight" />
          <FontStyle name="excerptFontStyle" />
          <Color title="Color" name="excerptColor" />
          <TextDecoration name="excerptTextDecoration" />
          <TextTransform name="excerptTextTransform" />
          <Range title="Line Height" name="excerptLineHeight" min={0} max={100} />
          <InputGroup title="Padding" name="excerptPadding" min={0} max={50} />
          <InputGroup title="Margin" name="excerptMargin" min={0} max={50} />
          <Range
            title="Letter Spacing"
            name="excerptLetterSpacing"
            min={-5}
            max={50}
          />
          <Range title="Word Spacing" name="excerptWordSpacing" min={-5} max={50} />
          <Alignment name="excerptAlignment" />
        </div>

        <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
          <h4
            className="ap-excerpt"
            style={{
              fontSize: defaultSettings.excerptFontSize + "px",
              fontWeight: defaultSettings.excerptFontWeight,
              fontStyle: defaultSettings.excerptFontStyle,
              color: defaultSettings.excerptColor,
              textDecoration: defaultSettings.excerptTextDecoration,
              textTransform: defaultSettings.excerptTextTransform,
              lineHeight: defaultSettings.excerptLineHeight + "px",
              padding: `${defaultSettings.excerptPadding.top}px ${defaultSettings.excerptPadding.right}px ${defaultSettings.excerptPadding.bottom}px ${defaultSettings.excerptPadding.left}px`,
              margin: `${defaultSettings.excerptMargin.top}px ${defaultSettings.excerptMargin.right}px ${defaultSettings.excerptMargin.bottom}px ${defaultSettings.excerptMargin.left}px`,
              letterSpacing: defaultSettings.excerptLetterSpacing + "px",
              wordSpacing: defaultSettings.excerptWordSpacing + "px",
              textAlign: defaultSettings.excerptAlignment,
            }}
          >
            Sample Post Excerpt Text. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam facilis velit doloribus nesciunt, quo atque ratione officiis at unde laborum...
          </h4>
        </div>
      </div>
    </>
  );
};

export default GridStyling;
