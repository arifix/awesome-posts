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

const ShopDefault = () => {
  const [activation, setActivation] = useState("");
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState("Save Settings");
  const [fonts, setFonts] = useState({});
  const [pickerColors, setPickerColors] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState("sale");

  const [defaultSettings, setDefaultSettings] = useState({
    shopStyleToggle: true,

    sdOnSaleBadgeBgColor: "#F00",
    sdOnSaleBadgeFont: "",
    sdOnSaleBadgeColor: "#FFF",
    sdOnSaleBadgeWeight: "normal",
    sdOnSaleBadgeSize: 16,
    sdOnSaleBadgeLetterSpacing: 0,
    sdOnSaleBadgeTextTransform: "uppercase",

    sdProductTitleFont: "",
    sdProductTitleColor: "#000",
    sdProductTitleWeight: "normal",
    sdProductTitleSize: 19,
    sdProductTitleLetterSpacing: 0,
    sdProductTitleLineHeight: 22,
    sdProductTitleTextTransform: "none",

    sdProductPriceFont: "",
    sdProductPriceColor: "#000",
    sdProductPriceWeight: "normal",
    sdProductPriceSize: 16,
    sdProductPriceLetterSpacing: 0,
    sdProductPriceLineHeight: 20,
    sdProductPriceTextTransform: "none",

    sdAddToCartBtnBgColor: "#333",
    sdAddToCartBtnFont: "",
    sdAddToCartBtnColor: "#CCC",
    sdAddToCartBtnSize: 15,
    sdAddToCartBtnLetterSpacing: 0,
    sdAddToCartBtnTextTransform: "none",
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

    if (settings?.default_shop) {
      const default_shop = settings.default_shop;
      setDefaultSettings(default_shop);
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

  const saveShopSettings = () => {
    setLoader("Saving Settings...");

    const default_shop = {
      default_shop: defaultSettings,
    };

    axios
      .post(
        baseUrl + "settings",
        {
          settings: JSON.stringify(default_shop),
        },
        {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": tssApp.nonce,
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
  if (defaultSettings.sdOnSaleBadgeFont) {
    const font = defaultSettings.sdOnSaleBadgeFont.includes("http")
      ? fontsUrlToName(defaultSettings.sdOnSaleBadgeFont)
      : defaultSettings.sdOnSaleBadgeFont;
    const font_url = defaultSettings.sdOnSaleBadgeFont.includes("http")
      ? defaultSettings.sdOnSaleBadgeFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.sdOnSaleBadgeFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.tss-product-sale{font-family: '${font}';}`;
  }

  if (defaultSettings.sdProductTitleFont) {
    const font = defaultSettings.sdProductTitleFont.includes("http")
      ? fontsUrlToName(defaultSettings.sdProductTitleFont)
      : defaultSettings.sdProductTitleFont;
    const font_url = defaultSettings.sdProductTitleFont.includes("http")
      ? defaultSettings.sdProductTitleFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.sdProductTitleFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.tss-product-title{font-family: '${font}';}`;
  }

  if (defaultSettings.sdProductPriceFont) {
    const font = defaultSettings.sdProductPriceFont.includes("http")
      ? fontsUrlToName(defaultSettings.sdProductPriceFont)
      : defaultSettings.sdProductPriceFont;
    const font_url = defaultSettings.sdProductPriceFont.includes("http")
      ? defaultSettings.sdProductPriceFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.sdProductPriceFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.tss-product-price{font-family: '${font}';}`;
  }

  if (defaultSettings.sdAddToCartBtnFont) {
    const font = defaultSettings.sdAddToCartBtnFont.includes("http")
      ? fontsUrlToName(defaultSettings.sdAddToCartBtnFont)
      : defaultSettings.sdAddToCartBtnFont;
    const font_url = defaultSettings.sdAddToCartBtnFont.includes("http")
      ? defaultSettings.sdAddToCartBtnFont
      : `https://fonts.googleapis.com/css?family=${defaultSettings.sdAddToCartBtnFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.tss-product-btn{font-family: '${font}';}`;
  }

  styles += `</style>`;

  return (
    <shopContext.Provider value={shopValues}>
      <div
        className={`tss-shop-default ${
          activeTab != "shop-default" ? "hidden" : ""
        }`}
      >
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
              <h2 className="heading-primary">Default Shop</h2>
            </div>

            <Divider />

            <div className="tss-default-shop p-5">
              <div dangerouslySetInnerHTML={{ __html: styles }}></div>
              <div className="flex justify-between items-center pr-5 gap-5">
                <h3 className="heading-secondary text-2xl pb-0">
                  Default Shop Settings
                  <p>&nbsp;</p>
                  <Toggle title="Use Custom Styling" name="shopStyleToggle" />
                </h3>
                <div className="tss-btngroup">
                  <button
                    type="button"
                    className="action-button secondary"
                    onClick={() => saveShopSettings()}
                  >
                    <i className="dashicons-before dashicons-yes"></i>
                    {loader}
                  </button>
                </div>
              </div>

              <div
                className={`${
                  defaultSettings.shopStyleToggle ? "" : "block-section"
                }`}
              >
                <ul className="filters flex flex-row flex-wrap lg:flex-nowrap">
                  <li className={`${activeSubTab == "sale" ? "active" : ""}`}>
                    <a
                      href="javascript:void(0);"
                      onClick={() => setActiveSubTab("sale")}
                    >
                      On Sale Badge
                    </a>
                  </li>
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
                </ul>

                <div className="px-5">
                  <div
                    className={`mt-10 ${
                      activeSubTab == "sale" ? "" : "hidden"
                    }`}
                  >
                    <div className="flex justify-between border-b-2 border-b-gray-300">
                      <h3 className="heading-secondary text-2xl pb-3">
                        On Sale Badge
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                      <Color title="Background" name="sdOnSaleBadgeBgColor" />
                      <FontFamily name="sdOnSaleBadgeFont" />
                      <Color title="Text" name="sdOnSaleBadgeColor" />
                      <FontWeight name="sdOnSaleBadgeWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="sdOnSaleBadgeSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="sdOnSaleBadgeLetterSpacing"
                      />
                      <TextTransform name="sdOnSaleBadgeTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7 text-center">
                      <div
                        className="tss-product-sale mx-auto text-lg flex justify-center items-center"
                        style={{
                          backgroundColor: defaultSettings.sdOnSaleBadgeBgColor,
                          color: defaultSettings.sdOnSaleBadgeColor,
                          fontWeight: defaultSettings.sdOnSaleBadgeWeight,
                          fontSize: defaultSettings.sdOnSaleBadgeSize + "px",
                          letterSpacing:
                            defaultSettings.sdOnSaleBadgeLetterSpacing + "px",
                          textTransform:
                            defaultSettings.sdOnSaleBadgeTextTransform,
                          padding: "0.4em",
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                      >
                        Sale
                      </div>
                    </div>
                  </div>

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
                      <FontFamily name="sdProductTitleFont" />
                      <Color title="Text" name="sdProductTitleColor" />
                      <FontWeight name="sdProductTitleWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="sdProductTitleSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="sdProductTitleLetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="sdProductTitleLineHeight"
                      />
                      <TextTransform name="sdProductTitleTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="tss-product-title text-center text-xl"
                        style={{
                          color: defaultSettings.sdProductTitleColor,
                          fontWeight: defaultSettings.sdProductTitleWeight,
                          fontSize: defaultSettings.sdProductTitleSize + "px",
                          letterSpacing:
                            defaultSettings.sdProductTitleLetterSpacing + "px",
                          lineHeight:
                            defaultSettings.sdProductTitleLineHeight + "px",
                          textTransform:
                            defaultSettings.sdProductTitleTextTransform,
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
                      <FontFamily name="sdProductPriceFont" />
                      <Color title="Text" name="sdProductPriceColor" />
                      <FontWeight name="sdProductPriceWeight" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="sdProductPriceSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="sdProductPriceLetterSpacing"
                      />
                      <Range
                        title="Line Height"
                        min={14}
                        max={50}
                        name="sdProductPriceLineHeight"
                      />
                      <TextTransform name="sdProductPriceTextTransform" />
                    </div>

                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                      <h4
                        className="tss-product-price text-center text-xl"
                        style={{
                          color: defaultSettings.sdProductPriceColor,
                          fontWeight: defaultSettings.sdProductPriceWeight,
                          fontSize: defaultSettings.sdProductPriceSize + "px",
                          letterSpacing:
                            defaultSettings.sdProductPriceLetterSpacing + "px",
                          lineHeight:
                            defaultSettings.sdProductPriceLineHeight + "px",
                          textTransform:
                            defaultSettings.sdProductPriceTextTransform,
                        }}
                      >
                        $12.99
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
                      <Color title="Background" name="sdAddToCartBtnBgColor" />
                      <FontFamily name="sdAddToCartBtnFont" />
                      <Color title="Text" name="sdAddToCartBtnColor" />
                      <Range
                        title="Font Size"
                        min={14}
                        max={50}
                        name="sdAddToCartBtnSize"
                      />
                      <Range
                        title="Letter Spacing"
                        min={0}
                        max={20}
                        name="sdAddToCartBtnLetterSpacing"
                      />
                      <TextTransform name="sdAddToCartBtnTextTransform" />
                    </div>
                    <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7 text-center">
                      <button
                        className="tss-product-btn mx-auto text-xl"
                        style={{
                          backgroundColor:
                            defaultSettings.sdAddToCartBtnBgColor,
                          color: defaultSettings.sdAddToCartBtnColor,
                          fontSize: defaultSettings.sdAddToCartBtnSize + "px",
                          letterSpacing:
                            defaultSettings.sdAddToCartBtnLetterSpacing + "px",
                          textTransform:
                            defaultSettings.sdAddToCartBtnTextTransform,
                          fontWeight: "normal",
                          padding: "12px 25px",
                          borderRadius: "100px",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => saveShopSettings()}
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

export default ShopDefault;
