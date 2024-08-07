import React, { useContext, useEffect } from "react";
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
import Border from "../elements/Border.jsx";
import { fontsUrlToName } from "../../utils/const.js";
import Alert from "../elements/Alert.jsx";

const GridStyling = () => {
  const { defaultSettings, setCssStyles } = useContext(gridContext);

  let styles = "";
  if (defaultSettings.shFont) {
    const font = defaultSettings.shFont.includes("http")
      ? fontsUrlToName(defaultSettings.shFont)
      : defaultSettings.shFont;
    const font_url = defaultSettings.shFont.includes("http")
      ? defaultSettings.shFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.shFont
          .split(" ")
          .join("+")}&display=swap`;

    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.ap-grid-title{font-family: '${font}'}`;
  }

  styles += `.ap-grid-title{
    font-size: ${defaultSettings.shFontSize + "px"};
    font-weight: ${defaultSettings.shFontWeight};
    font-style: ${defaultSettings.shFontStyle};
    color: ${defaultSettings.shColor};
    text-decoration: ${defaultSettings.shTextDecoration};
    text-transform: ${defaultSettings.shTextTransform};
    line-height: ${defaultSettings.shLineHeight + "px"};
    padding: ${defaultSettings.shPadding.top}px ${
      defaultSettings.shPadding.right
    }px ${defaultSettings.shPadding.bottom}px ${
      defaultSettings.shPadding.left
    }px;
    margin: ${defaultSettings.shMargin.top}px ${
      defaultSettings.shMargin.right
    }px ${defaultSettings.shMargin.bottom}px ${defaultSettings.shMargin.left}px;
    letter-spacing: ${defaultSettings.shLetterSpacing + "px"};
    word-spacing: ${defaultSettings.shWordSpacing + "px"};
    text-align: ${defaultSettings.shAlignment};
    }`;

  if (defaultSettings.titleFont) {
    const font = defaultSettings.titleFont.includes("http")
      ? fontsUrlToName(defaultSettings.titleFont)
      : defaultSettings.titleFont;
    const font_url = defaultSettings.titleFont.includes("http")
      ? defaultSettings.titleFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.titleFont
          .split(" ")
          .join("+")}&display=swap`;

    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.ap-title{font-family: '${font}'}`;
  }

  styles += `.ap-title{
    font-size: ${defaultSettings.titleFontSize + "px"};
    font-weight: ${defaultSettings.titleFontWeight};
    font-style: ${defaultSettings.titleFontStyle};
    color: ${defaultSettings.titleColor};
    text-decoration: ${defaultSettings.titleTextDecoration};
    text-transform: ${defaultSettings.titleTextTransform};
    line-height: ${defaultSettings.titleLineHeight + "px"};
    padding: ${defaultSettings.titlePadding.top}px ${
      defaultSettings.titlePadding.right
    }px ${defaultSettings.titlePadding.bottom}px ${
      defaultSettings.titlePadding.left
    }px;
    margin: ${defaultSettings.titleMargin.top}px ${
      defaultSettings.titleMargin.right
    }px ${defaultSettings.titleMargin.bottom}px ${
      defaultSettings.titleMargin.left
    }px;
    letter-spacing: ${defaultSettings.titleLetterSpacing + "px"};
    word-spacing: ${defaultSettings.titleWordSpacing + "px"};
    text-align: ${defaultSettings.titleAlignment};
    }`;

  styles += `.ap-title:hover{color: ${defaultSettings.titleHoverColor} !important;}`;

  if (defaultSettings.excerptFont) {
    const font = defaultSettings.excerptFont.includes("http")
      ? fontsUrlToName(defaultSettings.excerptFont)
      : defaultSettings.excerptFont;
    const font_url = defaultSettings.excerptFont.includes("http")
      ? defaultSettings.excerptFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.excerptFont
          .split(" ")
          .join("+")}&display=swap`;

    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.ap-excerpt{font-family: '${font}'}`;
  }

  styles += `.ap-excerpt{
    font-size: ${defaultSettings.excerptFontSize + "px"};
    font-weight: ${defaultSettings.excerptFontWeight};
    font-style: ${defaultSettings.excerptFontStyle};
    color: ${defaultSettings.excerptColor};
    text-decoration: ${defaultSettings.excerptTextDecoration};
    text-transform: ${defaultSettings.excerptTextTransform};
    line-height: ${defaultSettings.excerptLineHeight + "px"};
    padding: ${defaultSettings.excerptPadding.top}px ${
      defaultSettings.excerptPadding.right
    }px ${defaultSettings.excerptPadding.bottom}px ${
      defaultSettings.excerptPadding.left
    }px;
    margin: ${defaultSettings.excerptMargin.top}px ${
      defaultSettings.excerptMargin.right
    }px ${defaultSettings.excerptMargin.bottom}px ${
      defaultSettings.excerptMargin.left
    }px;
    letter-spacing: ${defaultSettings.excerptLetterSpacing + "px"};
    word-spacing: ${defaultSettings.excerptWordSpacing + "px"};
    text-align: ${defaultSettings.excerptAlignment};
    }`;

  if (defaultSettings.metaFont) {
    const font = defaultSettings.metaFont.includes("http")
      ? fontsUrlToName(defaultSettings.metaFont)
      : defaultSettings.metaFont;
    const font_url = defaultSettings.metaFont.includes("http")
      ? defaultSettings.metaFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.metaFont
          .split(" ")
          .join("+")}&display=swap`;

    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.ap-meta{font-family: '${font}'}`;
  }

  styles += `.ap-meta{
    font-size: ${defaultSettings.metaFontSize + "px"};
    font-weight: ${defaultSettings.metaFontWeight};
    font-style: ${defaultSettings.metaFontStyle};
    color: ${defaultSettings.metaColor};
    text-decoration: ${defaultSettings.metaTextDecoration};
    text-transform: ${defaultSettings.metaTextTransform};
    line-height: ${defaultSettings.metaLineHeight + "px"};
    padding: ${defaultSettings.metaPadding.top}px ${
      defaultSettings.metaPadding.right
    }px ${defaultSettings.metaPadding.bottom}px ${
      defaultSettings.metaPadding.left
    }px;
    margin: ${defaultSettings.metaMargin.top}px ${
      defaultSettings.metaMargin.right
    }px ${defaultSettings.metaMargin.bottom}px ${
      defaultSettings.metaMargin.left
    }px;
    letter-spacing: ${defaultSettings.metaLetterSpacing + "px"};
    word-spacing: ${defaultSettings.metaWordSpacing + "px"};
    text-align: ${defaultSettings.metaAlignment};
    }

    .ap-meta a {color: ${defaultSettings.metaColor};}
    .ap-meta a:hover {color: ${defaultSettings.metaHoverColor};}`;

  if (defaultSettings.btnFont) {
    const font = defaultSettings.btnFont.includes("http")
      ? fontsUrlToName(defaultSettings.btnFont)
      : defaultSettings.btnFont;
    const font_url = defaultSettings.btnFont.includes("http")
      ? defaultSettings.btnFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.btnFont
          .split(" ")
          .join("+")}&display=swap`;

    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.ap-btn{font-family: '${font}'}`;
  }

  styles += `.ap-btn{
    font-size: ${defaultSettings.btnFontSize + "px"};
    font-weight: ${defaultSettings.btnFontWeight};
    font-style: ${defaultSettings.btnFontStyle};
    background-color: ${defaultSettings.btnBgColor};
    color: ${defaultSettings.btnColor};
    border-radius: ${defaultSettings.btnBorderRadius + "px"};
    text-decoration: ${defaultSettings.btnTextDecoration};
    text-transform: ${defaultSettings.btnTextTransform};
    line-height: ${defaultSettings.btnLineHeight + "px"};
    padding: ${defaultSettings.btnPadding.top}px ${
      defaultSettings.btnPadding.right
    }px ${defaultSettings.btnPadding.bottom}px ${
      defaultSettings.btnPadding.left
    }px;
    margin: ${defaultSettings.btnMargin.top}px ${
      defaultSettings.btnMargin.right
    }px ${defaultSettings.btnMargin.bottom}px ${
      defaultSettings.btnMargin.left
    }px;
    letter-spacing: ${defaultSettings.btnLetterSpacing + "px"};
    word-spacing: ${defaultSettings.btnWordSpacing + "px"};
    text-align: ${defaultSettings.btnAlignment};
    border-style: ${defaultSettings.btnBorder.type};
    border-color: ${defaultSettings.btnBorder.color};
    border-top-width: ${defaultSettings.btnBorder.top + "px"};
    border-right-width: ${defaultSettings.btnBorder.right + "px"};
    border-bottom-width: ${defaultSettings.btnBorder.bottom + "px"};
    border-left-width: ${defaultSettings.btnBorder.left + "px"};
    }`;

  styles += `.ap-btn:hover{
    background-color: ${defaultSettings.btnBgHoverColor};
    color: ${defaultSettings.btnHoverColor};
    }`;

  if (defaultSettings.btnLmFont) {
    const font = defaultSettings.btnLmFont.includes("http")
      ? fontsUrlToName(defaultSettings.btnLmFont)
      : defaultSettings.btnLmFont;
    const font_url = defaultSettings.btnLmFont.includes("http")
      ? defaultSettings.btnLmFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.btnLmFont
          .split(" ")
          .join("+")}&display=swap`;

    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.ap-more-btn{font-family: '${font}'}`;
  }

  styles += `.ap-more-btn{
      font-size: ${defaultSettings.btnLmFontSize + "px"};
      font-weight: ${defaultSettings.btnLmFontWeight};
      font-style: ${defaultSettings.btnLmFontStyle};
      background-color: ${defaultSettings.btnLmBgColor};
      color: ${defaultSettings.btnLmColor};
      border-radius: ${defaultSettings.btnLmBorderRadius + "px"};
      text-decoration: ${defaultSettings.btnLmTextDecoration};
      text-transform: ${defaultSettings.btnLmTextTransform};
      line-height: ${defaultSettings.btnLmLineHeight + "px"};
      padding: ${defaultSettings.btnLmPadding.top}px ${
        defaultSettings.btnLmPadding.right
      }px ${defaultSettings.btnLmPadding.bottom}px ${
        defaultSettings.btnLmPadding.left
      }px;
      letter-spacing: ${defaultSettings.btnLmLetterSpacing + "px"};
      word-spacing: ${defaultSettings.btnLmWordSpacing + "px"};
      text-align: ${defaultSettings.btnLmAlignment};
      border-style: ${defaultSettings.btnLmBorder.type};
      border-color: ${defaultSettings.btnLmBorder.color};
      border-top-width: ${defaultSettings.btnLmBorder.top + "px"};
      border-right-width: ${defaultSettings.btnLmBorder.right + "px"};
      border-bottom-width: ${defaultSettings.btnLmBorder.bottom + "px"};
      border-left-width: ${defaultSettings.btnLmBorder.left + "px"};
      }`;

  styles += `.ap-more-btn:hover{
      background-color: ${defaultSettings.btnLmBgHoverColor};
      color: ${defaultSettings.btnLmHoverColor};
      }`;

  useEffect(() => {
    setCssStyles(styles);
  }, [defaultSettings]);

  return (
    <>
      <h3 className="heading-secondary text-2xl pb-5">Elements Styling</h3>
      <div
        dangerouslySetInnerHTML={{ __html: `<style>${styles}</style>` }}
      ></div>

      <Alert text="Note: Some of the elements do not have any effect based on the grid style selection." />
      <br />

      {/* Grid Styles */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">Grid</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          <Color title="Background" name="gridBgColor" />
          <Range title="Gap" name="gridGap" min={0} max={50} />
          <InputGroup title="Padding" name="gridPadding" min={0} max={50} />
          <InputGroup title="Margin" name="gridMargin" min={0} max={50} />
        </div>
      </div>

      {/* Shortcode Heading */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">Shortcode Heading</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          <FontFamily name="shFont" />
          <Range title="Font Size" name="shFontSize" min={14} max={100} />
          <FontWeight name="shFontWeight" />
          <FontStyle name="shFontStyle" />
          <Color name="shColor" />
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
          <h4 className="ap-grid-title">{defaultSettings.gridTitle}</h4>
        </div>
      </div>

      {/* Post Title */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">Post Title</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          <FontFamily name="titleFont" />
          <Range title="Font Size" name="titleFontSize" min={14} max={100} />
          <FontWeight name="titleFontWeight" />
          <FontStyle name="titleFontStyle" />
          <Color name="titleColor" />
          <Color title="Hover" name="titleHoverColor" />
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
          <a className="ap-title cursor-pointer">Sample Post Title</a>
        </div>
      </div>

      {/* Post Excerpt */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">Post Excerpt</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          <FontFamily name="excerptFont" />
          <Range title="Font Size" name="excerptFontSize" min={14} max={100} />
          <FontWeight name="excerptFontWeight" />
          <FontStyle name="excerptFontStyle" />
          <Color name="excerptColor" />
          <TextDecoration name="excerptTextDecoration" />
          <TextTransform name="excerptTextTransform" />
          <Range
            title="Line Height"
            name="excerptLineHeight"
            min={0}
            max={100}
          />
          <InputGroup title="Padding" name="excerptPadding" min={0} max={50} />
          <InputGroup title="Margin" name="excerptMargin" min={0} max={50} />
          <Range
            title="Letter Spacing"
            name="excerptLetterSpacing"
            min={-5}
            max={50}
          />
          <Range
            title="Word Spacing"
            name="excerptWordSpacing"
            min={-5}
            max={50}
          />
          <Alignment name="excerptAlignment" />
        </div>

        <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
          <p className="ap-excerpt">
            Sample Post Excerpt Text. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ipsam facilis velit doloribus nesciunt, quo atque
            ratione officiis at unde laborum...
          </p>
        </div>
      </div>

      {/* Post Featured Image */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">
            Post Featured Image
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          <Range
            title="Image Size"
            name="postImageHeight"
            min={100}
            max={500}
          />
        </div>
      </div>

      {/* Post Meta */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">Post Meta</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          <FontFamily name="metaFont" />
          <Range title="Font Size" name="metaFontSize" min={14} max={100} />
          <FontWeight name="metaFontWeight" />
          <FontStyle name="metaFontStyle" />
          <Color name="metaColor" />
          <Color title="Hover" name="metaHoverColor" />
          <TextDecoration name="metaTextDecoration" />
          <TextTransform name="metaTextTransform" />
          <Range title="Line Height" name="metaLineHeight" min={0} max={100} />
          <InputGroup title="Padding" name="metaPadding" min={0} max={50} />
          <InputGroup title="Margin" name="metaMargin" min={0} max={50} />
          <Range
            title="Letter Spacing"
            name="metaLetterSpacing"
            min={-5}
            max={50}
          />
          <Range
            title="Word Spacing"
            name="metaWordSpacing"
            min={-5}
            max={50}
          />
          <Alignment name="metaAlignment" />
        </div>

        <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
          <p className="ap-meta">Sample post meta text</p>
        </div>
      </div>

      {/* Post Read More Button */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">
            Post Read More Button
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          <FontFamily name="btnFont" />
          <Range title="Font Size" name="btnFontSize" min={14} max={100} />
          <FontWeight name="btnFontWeight" />
          <FontStyle name="btnFontStyle" />
          <Color title="Background" name="btnBgColor" />
          <Color name="btnColor" />
          <Color title="Hover Background" name="btnBgHoverColor" />
          <Color title="Hover" name="btnHoverColor" />
          <Range
            title="Border Radius"
            name="btnBorderRadius"
            min={0}
            max={50}
          />
          <TextDecoration name="btnTextDecoration" />
          <TextTransform name="btnTextTransform" />
          <Range title="Line Height" name="btnLineHeight" min={0} max={100} />
          <InputGroup title="Padding" name="btnPadding" min={0} max={50} />
          <InputGroup title="Margin" name="btnMargin" min={0} max={50} />
          <Range
            title="Letter Spacing"
            name="btnLetterSpacing"
            min={-5}
            max={50}
          />
          <Range title="Word Spacing" name="btnWordSpacing" min={-5} max={50} />
          <Alignment name="btnAlignment" />
          <Border name="btnBorder" min={0} max={20} />
        </div>

        <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7 text-center">
          <button type="button" className="ap-btn">
            {defaultSettings.postBtnText}
          </button>
        </div>
      </div>

      {/* Load More Button */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-3">Load More Button</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          <FontFamily name="btnLmFont" />
          <Range title="Font Size" name="btnLmFontSize" min={14} max={100} />
          <FontWeight name="btnLmFontWeight" />
          <FontStyle name="btnLmFontStyle" />
          <Color title="Background" name="btnLmBgColor" />
          <Color name="btnLmColor" />
          <Color title="Hover Background" name="btnLmBgHoverColor" />
          <Color title="Hover" name="btnLmHoverColor" />
          <Range
            title="Border Radius"
            name="btnLmBorderRadius"
            min={0}
            max={50}
          />
          <TextDecoration name="btnLmTextDecoration" />
          <TextTransform name="btnLmTextTransform" />
          <Range title="Line Height" name="btnLmLineHeight" min={0} max={100} />
          <InputGroup title="Padding" name="btnLmPadding" min={0} max={50} />
          <Range
            title="Letter Spacing"
            name="btnLmLetterSpacing"
            min={-5}
            max={50}
          />
          <Range
            title="Word Spacing"
            name="btnLmWordSpacing"
            min={-5}
            max={50}
          />
          <Alignment name="btnLmAlignment" />
          <Border name="btnLmBorder" min={0} max={20} />
        </div>

        <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7 text-center">
          <button type="button" className="ap-more-btn">
            {defaultSettings.btnLmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default GridStyling;
