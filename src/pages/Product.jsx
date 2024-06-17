import React, { useContext, useState, useEffect, useMemo } from "react";
import { appContext } from "../contexts/appContext.jsx";
import { shopContext } from "../contexts/shopContext.jsx";
import Divider from "../components/global/Divider.jsx";
import Color from "../components/elements/Color.jsx";
import Toggle from "../components/elements/Toggle.jsx";
import FontFamily from "../components/elements/FontFamily.jsx";
import GoogleFonts from "../utils/google-fonts.json";
import FontWeight from "../components/elements/FontWeight.jsx";
import TextTransform from "../components/elements/TextTransform.jsx";
import Range from "../components/elements/Range.jsx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import toast from "react-hot-toast";
import { fontsUrlToName } from "../utils/const.js";

const Product = () => {
  const [activation, setActivation] = useState("");
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState("Save Settings");
  const [fonts, setFonts] = useState({});
  const [pickerColors, setPickerColors] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState("title");

  const [defaultSettings, setDefaultSettings] = useState({
    productStyleToggle: true,

    proProductTitleFont: "",
    proProductTitleColor: "#000",
    proProductTitleWeight: "normal",
    proProductTitleSize: 32,
    proProductTitleLetterSpacing: 0,
    proProductTitleLineHeight: 36,
    proProductTitleTextTransform: "none",

    proProductPriceFont: "",
    proProductPriceColor: "#000",
    proProductPriceWeight: "normal",
    proProductPriceSize: 20,
    proProductPriceLetterSpacing: 0,
    proProductPriceLineHeight: 24,
    proProductPriceTextTransform: "none",

    proProductShortDesFont: "",
    proProductShortDesColor: "#000",
    proProductShortDesWeight: "normal",
    proProductShortDesSize: 16,
    proProductShortDesLetterSpacing: 0,
    proProductShortDesLineHeight: 20,
    proProductShortDesTextTransform: "none",

    proAddToCartBtnBgColor: "#333",
    proAddToCartBtnFont: "",
    proAddToCartBtnColor: "#FFF",
    proAddToCartBtnSize: 14,
    proAddToCartBtnLetterSpacing: 0,
    proAddToCartBtnTextTransform: "none",

    proProductMetaFont: "",
    proProductMetaColor: "#000",
    proProductMetaWeight: "normal",
    proProductMetaSize: 17,
    proProductMetaLetterSpacing: 0,
    proProductMetaLineHeight: 21,
    proProductMetaTextTransform: "none",

    proTabHeadingsFont: "",
    proTabHeadingsColor: "#000",
    proTabHeadingsWeight: "normal",
    proTabHeadingsSize: 20,
    proTabHeadingsLetterSpacing: 0,
    proTabHeadingsLineHeight: 24,
    proTabHeadingsTextTransform: "none",

    proTabContentH2Font: "",
    proTabContentH2Color: "#000",
    proTabContentH2Weight: "normal",
    proTabContentH2Size: 17,
    proTabContentH2LetterSpacing: 0,
    proTabContentH2LineHeight: 21,
    proTabContentH2TextTransform: "none",

    proTabContentParaFont: "",
    proTabContentParaColor: "#000",
    proTabContentParaWeight: "normal",
    proTabContentParaSize: 16,
    proTabContentParaLetterSpacing: 0,
    proTabContentParaLineHeight: 20,
    proTabContentParaTextTransform: "none",

    proRelatedProductTitleFont: "",
    proRelatedProductTitleColor: "#000",
    proRelatedProductTitleWeight: "normal",
    proRelatedProductTitleSize: 20,
    proRelatedProductTitleLetterSpacing: 0,
    proRelatedProductTitleLineHeight: 24,
    proRelatedProductTitleTextTransform: "none",
  });

  const { activeTab, settings, baseUrl, setRefreshSettings } =
    useContext(appContext);

  useEffect(() => {
    setActivation(settings.activation);

    if (settings?.colors) {
      const color_array = [];
      Object.keys(settings.colors).forEach(function (key, index) {
        color_array.push(settings.colors[key]);
      });
      setPickerColors(color_array);
    }

    if (settings?.fonts) {
      setFonts(settings.fonts);
    }

    if (settings?.default_product) {
      const default_product = settings.default_product;
      setDefaultSettings(default_product);
    }

    setLoading(false);
  }, [settings]);

  const fontsOptions = [];
  Object.keys(fonts).map((val, index) => {
    const font_url_ar = fonts[val].split("/");
    const font_name = font_url_ar[font_url_ar.length - 1].split(".")[0];

    fontsOptions.push({
      value: fonts[val],
      label: font_name,
    });
  });

  fontsOptions.push({
    value: "",
    label: "------------------",
  });

  Object.keys(GoogleFonts).map((key) => {
    fontsOptions.push({
      value: GoogleFonts[key],
      label: key,
    });
  });

  const saveProductSettings = () => {
    setLoader("Saving Settings...");

    const default_product = {
      default_product: defaultSettings,
    };

    axios
      .post(
        baseUrl + "settings",
        {
          settings: JSON.stringify(default_product),
        },
        {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": afxApApp.nonce,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setRefreshSettings(true);
        setLoader("Save Settings");
      });
  };

  const shopValues = useMemo(() => {
    return {
      pickerColors,
      fontsOptions,
      defaultSettings,
      setDefaultSettings,
    };
  }, [pickerColors, fontsOptions, defaultSettings]);

  let styles = `<style>`;
  if (defaultSettings.proProductTitleFont) {
    const font = defaultSettings.proProductTitleFont.includes("http")
      ? fontsUrlToName(defaultSettings.proProductTitleFont)
      : defaultSettings.proProductTitleFont;
    const font_url = defaultSettings.proProductTitleFont.includes("http")
      ? defaultSettings.proProductTitleFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.proProductTitleFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-title{font-family: '${font}';}`;
  }

  if (defaultSettings.proProductPriceFont) {
    const font = defaultSettings.proProductPriceFont.includes("http")
      ? fontsUrlToName(defaultSettings.proProductPriceFont)
      : defaultSettings.proProductPriceFont;
    const font_url = defaultSettings.proProductPriceFont.includes("http")
      ? defaultSettings.proProductPriceFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.proProductPriceFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-price{font-family: '${font}';}`;
  }

  if (defaultSettings.proProductShortDesFont) {
    const font = defaultSettings.proProductShortDesFont.includes("http")
      ? fontsUrlToName(defaultSettings.proProductShortDesFont)
      : defaultSettings.proProductShortDesFont;
    const font_url = defaultSettings.proProductShortDesFont.includes("http")
      ? defaultSettings.proProductShortDesFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.proProductShortDesFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-des{font-family: '${font}';}`;
  }

  if (defaultSettings.proAddToCartBtnFont) {
    const font = defaultSettings.proAddToCartBtnFont.includes("http")
      ? fontsUrlToName(defaultSettings.proAddToCartBtnFont)
      : defaultSettings.proAddToCartBtnFont;
    const font_url = defaultSettings.proAddToCartBtnFont.includes("http")
      ? defaultSettings.proAddToCartBtnFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.proAddToCartBtnFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-btn{font-family: '${font}';}`;
  }

  if (defaultSettings.proProductMetaFont) {
    const font = defaultSettings.proProductMetaFont.includes("http")
      ? fontsUrlToName(defaultSettings.proProductMetaFont)
      : defaultSettings.proProductMetaFont;
    const font_url = defaultSettings.proProductMetaFont.includes("http")
      ? defaultSettings.proProductMetaFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.proProductMetaFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-meta{font-family: '${font}';}`;
  }

  if (defaultSettings.proTabHeadingsFont) {
    const font = defaultSettings.proTabHeadingsFont.includes("http")
      ? fontsUrlToName(defaultSettings.proTabHeadingsFont)
      : defaultSettings.proTabHeadingsFont;
    const font_url = defaultSettings.proTabHeadingsFont.includes("http")
      ? defaultSettings.proTabHeadingsFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.proTabHeadingsFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-tab-h{font-family: '${font}';}`;
  }

  if (defaultSettings.proTabContentH2Font) {
    const font = defaultSettings.proTabContentH2Font.includes("http")
      ? fontsUrlToName(defaultSettings.proTabContentH2Font)
      : defaultSettings.proTabContentH2Font;
    const font_url = defaultSettings.proTabContentH2Font.includes("http")
      ? defaultSettings.proTabContentH2Font
      : `https://fonts.googleapis.com/css?family=${defaultSettings.proTabContentH2Font
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-tab-h2{font-family: '${font}';}`;
  }

  if (defaultSettings.proTabContentParaFont) {
    const font = defaultSettings.proTabContentParaFont.includes("http")
      ? fontsUrlToName(defaultSettings.proTabContentParaFont)
      : defaultSettings.proTabContentParaFont;
    const font_url = defaultSettings.proTabContentParaFont.includes("http")
      ? defaultSettings.proTabContentParaFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.proTabContentParaFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-tab-p{font-family: '${font}';}`;
  }

  if (defaultSettings.proRelatedProductTitleFont) {
    const font = defaultSettings.proRelatedProductTitleFont.includes("http")
      ? fontsUrlToName(defaultSettings.proRelatedProductTitleFont)
      : defaultSettings.proRelatedProductTitleFont;
    const font_url = defaultSettings.proRelatedProductTitleFont.includes("http")
      ? defaultSettings.proRelatedProductTitleFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.proRelatedProductTitleFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-related{font-family: '${font}';}`;
  }

  styles += `</style>`;

  return (
    <shopContext.Provider value={shopValues}>
      <div className={`afx-ap-product ${activeTab != "product" ? "hidden" : ""}`}>
        {loading ? (
          <SkeletonTheme baseColor="#CCC" highlightColor="#DDD">
            <p>
              <Skeleton
                count={8}
                style={{ height: 100, padding: 10, margin: "20px 10px" }}
              />
            </p>
          </SkeletonTheme>
        ) : (
          <>
            <div className="flex justify-between items-center pr-5">
              <h2 className="heading-primary">Product Page</h2>
            </div>

            <Divider />

            <div className="afx-ap-product p-5">
              <div dangerouslySetInnerHTML={{ __html: styles }}></div>
              <div className="flex justify-between items-center pr-5 gap-5">
                <h3 className="heading-secondary text-2xl pb-0">
                  Product Page Settings
                  <p>&nbsp;</p>
                  <Toggle
                    title="Use Custom Styling"
                    name="productStyleToggle"
                  />
                </h3>
                <div className="afx-ap-btngroup">
                  <button
                    type="button"
                    className="action-button secondary"
                    onClick={() => saveProductSettings()}
                  >
                    <i className="dashicons-before dashicons-yes"></i>
                    {loader}
                  </button>
                </div>
              </div>

              <div
                className={`${
                  defaultSettings.productStyleToggle ? "" : "block-section"
                }`}
              >
                <ul className="filters flex flex-row flex-wrap lg:flex-nowrap">
                  <li className={`${activeSubTab == "title" ? "active" : ""}`}>
                    <a
                      href="javascript:void(0);"
                      onClick={() => setActiveSubTab("title")}
                    >
                      Title
                    </a>
                  </li>
                  <li className={`${activeSubTab == "price" ? "active" : ""}`}>
                    <a
                      href="javascript:void(0);"
                      onClick={() => setActiveSubTab("price")}
                    >
                      Price
                    </a>
                  </li>
                  <li className={`${activeSubTab == "des" ? "active" : ""}`}>
                    <a
                      href="javascript:void(0);"
                      onClick={() => setActiveSubTab("des")}
                    >
                      Short Description
                    </a>
                  </li>
                  <li
                    className={`${activeSubTab == "addtocart" ? "active" : ""}`}
                  >
                    <a
                      href="javascript:void(0);"
                      onClick={() => setActiveSubTab("addtocart")}
                    >
                      Add to Cart Button
                    </a>
                  </li>
                  <li className={`${activeSubTab == "meta" ? "active" : ""}`}>
                    <a
                      href="javascript:void(0);"
                      onClick={() => setActiveSubTab("meta")}
                    >
                      Meta
                    </a>
                  </li>
                  <li className={`${activeSubTab == "tabs" ? "active" : ""}`}>
                    <a
                      href="javascript:void(0);"
                      onClick={() => setActiveSubTab("tabs")}
                    >
                      Tabs
                    </a>
                  </li>
                  <li
                    className={`${activeSubTab == "related" ? "active" : ""}`}
                  >
                    <a
                      href="javascript:void(0);"
                      onClick={() => setActiveSubTab("related")}
                    >
                      Related Products Title
                    </a>
                  </li>
                </ul>

                <div className="px-5">
                  <div
                    className={`mt-10 ${
                      activeSubTab == "title" ? "" : "hidden"
                    }`}
                  >
                    <div className="flex justify-between border-b-2 border-b-gray-300">
                      <h3 className="heading-secondary text-2xl pb-3">
                        Product Title
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                      <FontFamily name="proProductTitleFont" />
                      <Color title="Text" name="proProductTitleColor" />
                      <FontWeight name="proProductTitleWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="proProductTitleSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="proProductTitleLetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="proProductTitleLineHeight"
                      />
                      <TextTransform name="proProductTitleTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="afx-ap-product-title text-center text-xl"
                        style={{
                          color: defaultSettings.proProductTitleColor,
                          fontWeight: defaultSettings.proProductTitleWeight,
                          fontSize: defaultSettings.proProductTitleSize + "px",
                          letterSpacing:
                            defaultSettings.proProductTitleLetterSpacing + "px",
                          lineHeight:
                            defaultSettings.proProductTitleLineHeight + "px",
                          textTransform:
                            defaultSettings.proProductTitleTextTransform,
                        }}
                      >
                        Product Title
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`mt-10 ${
                      activeSubTab == "price" ? "" : "hidden"
                    }`}
                  >
                    <div className="flex justify-between border-b-2 border-b-gray-300">
                      <h3 className="heading-secondary text-2xl pb-3">
                        Product Price
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                      <FontFamily name="proProductPriceFont" />
                      <Color title="Text" name="proProductPriceColor" />
                      <FontWeight name="proProductPriceWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="proProductPriceSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="proProductPriceLetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="proProductPriceLineHeight"
                      />
                      <TextTransform name="proProductPriceTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="afx-ap-product-price text-center text-xl"
                        style={{
                          color: defaultSettings.proProductPriceColor,
                          fontWeight: defaultSettings.proProductPriceWeight,
                          fontSize: defaultSettings.proProductPriceSize + "px",
                          letterSpacing:
                            defaultSettings.proProductPriceLetterSpacing + "px",
                          lineHeight:
                            defaultSettings.proProductPriceLineHeight + "px",
                          textTransform:
                            defaultSettings.proProductPriceTextTransform,
                        }}
                      >
                        $12.99
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`mt-10 ${activeSubTab == "des" ? "" : "hidden"}`}
                  >
                    <div className="flex justify-between border-b-2 border-b-gray-300">
                      <h3 className="heading-secondary text-2xl pb-3">
                        Product Short Description
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                      <FontFamily name="proProductShortDesFont" />
                      <Color title="Text" name="proProductShortDesColor" />
                      <FontWeight name="proProductShortDesWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="proProductShortDesSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="proProductShortDesLetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="proProductShortDesLineHeight"
                      />
                      <TextTransform name="proProductShortDesTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="afx-ap-product-des text-center text-xl"
                        style={{
                          color: defaultSettings.proProductShortDesColor,
                          fontWeight: defaultSettings.proProductShortDesWeight,
                          fontSize:
                            defaultSettings.proProductShortDesSize + "px",
                          letterSpacing:
                            defaultSettings.proProductShortDesLetterSpacing +
                            "px",
                          lineHeight:
                            defaultSettings.proProductShortDesLineHeight + "px",
                          textTransform:
                            defaultSettings.proProductShortDesTextTransform,
                        }}
                      >
                        This is a simple product
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`mt-10 ${
                      activeSubTab == "addtocart" ? "" : "hidden"
                    }`}
                  >
                    <div className="flex justify-between border-b-2 border-b-gray-300">
                      <h3 className="heading-secondary text-2xl pb-3">
                        Add to Cart Button
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                      <Color title="Background" name="proAddToCartBtnBgColor" />
                      <FontFamily name="proAddToCartBtnFont" />
                      <Color title="Text" name="proAddToCartBtnColor" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="proAddToCartBtnSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="proAddToCartBtnLetterSpacing"
                      />
                      <TextTransform name="proAddToCartBtnTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7 text-center">
                      <button
                        className="afx-ap-product-btn mx-auto text-xl"
                        style={{
                          backgroundColor:
                            defaultSettings.proAddToCartBtnBgColor,
                          color: defaultSettings.proAddToCartBtnColor,
                          fontSize: defaultSettings.proAddToCartBtnSize + "px",
                          letterSpacing:
                            defaultSettings.proAddToCartBtnLetterSpacing + "px",
                          textTransform:
                            defaultSettings.proAddToCartBtnTextTransform,
                          fontWeight: "normal",
                          padding: "12px 25px",
                          borderRadius: "100px",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div
                    className={`mt-10 ${
                      activeSubTab == "meta" ? "" : "hidden"
                    }`}
                  >
                    <div className="flex justify-between border-b-2 border-b-gray-300">
                      <h3 className="heading-secondary text-2xl pb-3">
                        Product Meta
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                      <FontFamily name="proProductMetaFont" />
                      <Color title="Text" name="proProductMetaColor" />
                      <FontWeight name="proProductMetaWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="proProductMetaSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="proProductMetaLetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="proProductMetaLineHeight"
                      />
                      <TextTransform name="proProductMetaTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="afx-ap-product-meta text-center text-xl"
                        style={{
                          color: defaultSettings.proProductMetaColor,
                          fontWeight: defaultSettings.proProductMetaWeight,
                          fontSize: defaultSettings.proProductMetaSize + "px",
                          letterSpacing:
                            defaultSettings.proProductMetaLetterSpacing + "px",
                          lineHeight:
                            defaultSettings.proProductMetaLineHeight + "px",
                          textTransform:
                            defaultSettings.proProductMetaTextTransform,
                        }}
                      >
                        This is the Meta info
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`mt-10 ${
                      activeSubTab == "tabs" ? "" : "hidden"
                    }`}
                  >
                    <div className="flex justify-between border-b-2 border-b-gray-300">
                      <h3 className="heading-secondary text-2xl pb-3">
                        Product Tabs
                      </h3>
                    </div>
                    <h4 className="heading-sub text-xl mt-5">Tab Headings</h4>
                    <hr className="border-b border-b-gray-200" />
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-5">
                      <FontFamily name="proTabHeadingsFont" />
                      <Color title="Text" name="proTabHeadingsColor" />
                      <FontWeight name="proTabHeadingsWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="proTabHeadingsSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="proTabHeadingsLetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="proTabHeadingsLineHeight"
                      />
                      <TextTransform name="proTabHeadingsTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="afx-ap-product-tab-h text-center text-xl"
                        style={{
                          color: defaultSettings.proTabHeadingsColor,
                          fontWeight: defaultSettings.proTabHeadingsWeight,
                          fontSize: defaultSettings.proTabHeadingsSize + "px",
                          letterSpacing:
                            defaultSettings.proTabHeadingsLetterSpacing + "px",
                          lineHeight:
                            defaultSettings.proTabHeadingsLineHeight + "px",
                          textTransform:
                            defaultSettings.proTabHeadingsTextTransform,
                        }}
                      >
                        This is the Tab Heading
                      </h4>
                    </div>

                    <h4 className="heading-sub text-xl mt-5">Tab Content H2</h4>
                    <hr className="border-b border-b-gray-200" />
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-5">
                      <FontFamily name="proTabContentH2Font" />
                      <Color title="Text" name="proTabContentH2Color" />
                      <FontWeight name="proTabContentH2Weight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="proTabContentH2Size"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="proTabContentH2LetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="proTabContentH2LineHeight"
                      />
                      <TextTransform name="proTabContentH2TextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="afx-ap-product-tab-h2 text-center text-xl"
                        style={{
                          color: defaultSettings.proTabContentH2Color,
                          fontWeight: defaultSettings.proTabContentH2Weight,
                          fontSize: defaultSettings.proTabContentH2Size + "px",
                          letterSpacing:
                            defaultSettings.proTabContentH2LetterSpacing + "px",
                          lineHeight:
                            defaultSettings.proTabContentH2LineHeight + "px",
                          textTransform:
                            defaultSettings.proTabContentH2TextTransform,
                        }}
                      >
                        This is the Tab Content H2
                      </h4>
                    </div>

                    <h4 className="heading-sub text-xl mt-5">
                      Tab Content Paragraph
                    </h4>
                    <hr className="border-b border-b-gray-200" />
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-5">
                      <FontFamily name="proTabContentParaFont" />
                      <Color title="Text" name="proTabContentParaColor" />
                      <FontWeight name="proTabContentParaWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="proTabContentParaSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="proTabContentParaLetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="proTabContentParaLineHeight"
                      />
                      <TextTransform name="proTabContentParaTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="afx-ap-product-tab-p text-center text-xl"
                        style={{
                          color: defaultSettings.proTabContentParaColor,
                          fontWeight: defaultSettings.proTabContentParaWeight,
                          fontSize:
                            defaultSettings.proTabContentParaSize + "px",
                          letterSpacing:
                            defaultSettings.proTabContentParaLetterSpacing +
                            "px",
                          lineHeight:
                            defaultSettings.proTabContentParaLineHeight + "px",
                          textTransform:
                            defaultSettings.proTabContentParaTextTransform,
                        }}
                      >
                        This is the Tab paragraph
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`mt-10 ${
                      activeSubTab == "related" ? "" : "hidden"
                    }`}
                  >
                    <div className="flex justify-between border-b-2 border-b-gray-300">
                      <h3 className="heading-secondary text-2xl pb-3">
                        Related Products Title
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                      <FontFamily name="proRelatedProductTitleFont" />
                      <Color title="Text" name="proRelatedProductTitleColor" />
                      <FontWeight name="proRelatedProductTitleWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="proRelatedProductTitleSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="proRelatedProductTitleLetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="proRelatedProductTitleLineHeight"
                      />
                      <TextTransform name="proRelatedProductTitleTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="afx-ap-product-related text-center text-xl"
                        style={{
                          color: defaultSettings.proRelatedProductTitleColor,
                          fontWeight:
                            defaultSettings.proRelatedProductTitleWeight,
                          fontSize:
                            defaultSettings.proRelatedProductTitleSize + "px",
                          letterSpacing:
                            defaultSettings.proRelatedProductTitleLetterSpacing +
                            "px",
                          lineHeight:
                            defaultSettings.proRelatedProductTitleLineHeight +
                            "px",
                          textTransform:
                            defaultSettings.proRelatedProductTitleTextTransform,
                        }}
                      >
                        This is the Tab paragraph
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => saveProductSettings()}
                className="action-button primary mx-auto mt-10 mb-2"
              >
                <i className="dashicons-before dashicons-yes"></i> {loader}
              </button>
            </div>
          </>
        )}
      </div>
    </shopContext.Provider>
  );
};

export default Product;
