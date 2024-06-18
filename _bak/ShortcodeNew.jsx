import React, { useContext, useState, useEffect, useMemo } from "react";
import { appContext } from "../contexts/appContext.jsx";
import { shortcodeContext } from "../contexts/shortcodeContext.jsx";
import Divider from "../components/global/Divider.jsx";
import ShopMain from "../components/parts/ShopMain.jsx";
import ShopHeader from "../components/parts/ShopHeader.jsx";
import ShopNewSetting from "../components/parts/ShopNewSetting.jsx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ModalPreview from "../components/global/ModalPreview.jsx";
import {
  orderOptions,
  fontSizeOptions,
  textAlignOptions,
  btnSizeOptions,
  fontsUrlToName,
  insertUrlParam,
} from "../utils/const.js";
import GoogleFonts from "../utils/google-fonts.json";
import axios from "axios";
import toast from "react-hot-toast";
import Preview from "../components/parts/Preview.jsx";
import Alignment from "../components/elements/Alignment.jsx";
import Color from "../components/elements/Color.jsx";
import FontFamily from "../components/elements/FontFamily.jsx";
import Range from "../components/elements/Range.jsx";
import Select from "react-select";
import Input from "../components/elements/Input.jsx";
import Toggle from "../components/elements/Toggle.jsx";

const ShortcodeNew = () => {
  const [loader, setLoader] = useState("Save Shop");
  const [fonts, setFonts] = useState({});
  const [pickerColors, setPickerColors] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [websiteProducts, setWebsiteProducts] = useState([]);

  const {
    activeTab,
    settings,
    baseUrl,
    shopSettings,
    setShopSettings,
    shopId,
    setShopId,
    setRefreshSettings,
  } = useContext(appContext);

  useEffect(() => {
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
  }, [settings]);

  useEffect(() => {
    if (activeTab == "shortcode-new") {
      const queryParameters = new URLSearchParams(window.location.search);
      const shortcode_id = queryParameters.get("shortcode_id");
      if (shortcode_id) {
        axios
          .post(
            baseUrl + "shortcode/get",
            {
              shortcode_id,
            },
            {
              headers: {
                "content-type": "application/json",
                "X-WP-NONCE": afxApApp.nonce,
              },
            }
          )
          .then((res) => {
            setShopId(res.data.id);
            const settings = JSON.parse(res.data.settings);
            setShopSettings({
              ...shopSettings,
              shopTitle: res.data.title,
              gridColumns: settings.gridColumns,
              categories: settings.categories,
              postsPerPage: settings.postsPerPage,
              postsOrder: settings.postsOrder,

              showProductTitle: settings.showProductTitle,
              productTitleFont: settings.productTitleFont,
              productTitleSize: settings.productTitleSize,
              productTitleAlignment: settings.productTitleAlignment,
              productTitleColor: settings.productTitleColor,

              showProductDes: settings.showProductDes,
              productDesFont: settings.productDesFont,
              productDesSize: settings.productDesSize,
              productDesAlignment: settings.productDesAlignment,
              productDesColor: settings.productDesColor,

              showProductPrice: settings.showProductPrice,
              productPriceFont: settings.productPriceFont,
              productPriceSize: settings.productPriceSize,
              productPriceAlignment: settings.productPriceAlignment,
              productPriceColor: settings.productPriceColor,

              showProductButton: settings.showProductButton,
              productButtonFont: settings.productButtonFont,
              productButtonSize: settings.productButtonSize,
              productButtonAlignment: settings.productButtonAlignment,
              productButtonBgColor: settings.productButtonBgColor,
              productButtonColor: settings.productButtonColor,
              productButtonText: settings.productButtonText,
              productButtonWidth: settings.productButtonWidth,
              productButtonBorderRadius: settings.productButtonBorderRadius,
            });
          });
      } else {
        setShopId(null);
        setShopSettings({ ...shopSettings });
      }
      setLoading(false);
    }
  }, [activeTab]);

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

  const saveShop = () => {
    if (shopSettings.shopTitle == "") {
      toast.error("Shop Title is Required");
      window.scrollTo(0, 0);
      setError(true);
    } else {
      setError(false);
      setLoader("Saving Shop...");
      const settings = { ...shopSettings };
      delete settings.shopTitle;

      const queryParameters = new URLSearchParams(window.location.search);
      const shortcode_id = queryParameters.get("shortcode_id");

      axios
        .post(
          baseUrl + "shortcode/new",
          {
            shortcode_id: shortcode_id,
            shortcode_title: shopSettings.shopTitle,
            shortcode_settings: JSON.stringify(settings),
          },
          {
            headers: {
              "content-type": "application/json",
              "X-WP-NONCE": afxApApp.nonce,
            },
          }
        )
        .then((res) => {
          setShopId(res.data.shortcode_id);
          toast.success(res.data.message);
          insertUrlParam("shortcode_id", res.data.shortcode_id);
          setRefreshSettings(true);
          setLoader("Save Shop");
        });
    }
  };

  const previewAction = () => {
    let cats = [];
    if (shopSettings.categories.length > 0) {
      shopSettings.categories.forEach((cat) => cats.push(cat.value));
    }

    let url = baseUrl + "products";
    if (cats.length > 0) {
      url = baseUrl + "products?categories=" + cats.join(",");
    }

    axios.get(url).then((res) => {
      setWebsiteProducts(JSON.parse(res.data));
    });
  };

  const shopValues = useMemo(() => {
    return {
      shopSettings,
      setShopSettings,
      pickerColors,
      orderOptions,
      fontSizeOptions,
      textAlignOptions,
      btnSizeOptions,
      fontsUrlToName,
      fontsOptions,
      defaultSettings: shopSettings,
      setDefaultSettings: setShopSettings,
    };
  }, [shopSettings, setShopSettings, pickerColors, fontsOptions, shopSettings]);

  let styles = `<style>`;
  if (shopSettings.productTitleFont) {
    const font = shopSettings.productTitleFont.includes("http")
      ? fontsUrlToName(shopSettings.productTitleFont)
      : shopSettings.productTitleFont;
    const font_url = shopSettings.productTitleFont.includes("http")
      ? shopSettings.productTitleFont
      : `https://fonts.googleapis.com/css?family=${shopSettings.productTitleFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-title{font-family: '${font}';}`;
  }

  if (shopSettings.productDesFont) {
    const font = shopSettings.productDesFont.includes("http")
      ? fontsUrlToName(shopSettings.productDesFont)
      : shopSettings.productDesFont;
    const font_url = shopSettings.productDesFont.includes("http")
      ? shopSettings.productDesFont
      : `https://fonts.googleapis.com/css?family=${shopSettings.productDesFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-des{font-family: '${font}';}`;
  }

  if (shopSettings.productPriceFont) {
    const font = shopSettings.productPriceFont.includes("http")
      ? fontsUrlToName(shopSettings.productPriceFont)
      : shopSettings.productPriceFont;
    const font_url = shopSettings.productPriceFont.includes("http")
      ? shopSettings.productPriceFont
      : `https://fonts.googleapis.com/css?family=${shopSettings.productPriceFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-price{font-family: '${font}';}`;
  }

  if (shopSettings.productButtonFont) {
    const font = shopSettings.productButtonFont.includes("http")
      ? fontsUrlToName(shopSettings.productButtonFont)
      : shopSettings.productButtonFont;
    const font_url = shopSettings.productButtonFont.includes("http")
      ? shopSettings.productButtonFont
      : `https://fonts.googleapis.com/css?family=${shopSettings.productButtonFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.afx-ap-product-btn{font-family: '${font}';}`;
  }

  styles += `</style>`;

  return (
    <shortcodeContext.Provider value={shopValues}>
      <div
        className={`afx-ap-shortcode-new ${activeTab != "shortcode-new" ? "hidden" : ""}`}
      >
        {loading ? (
          <SkeletonTheme baseColor="#CCC" highlightColor="#DDD">
            <p>
              <Skeleton
                count={6}
                style={{ height: 100, padding: 10, margin: "20px 10px" }}
              />
            </p>
          </SkeletonTheme>
        ) : (
          <>
            <ShopHeader loader={loader} saveShop={saveShop} error={error} />
            <Divider />

            <div className="afx-ap-add-shop p-5">
              <div dangerouslySetInnerHTML={{ __html: styles }}></div>
              <ShopNewSetting
                shopId={shopId}
                setShowModal={setShowModal}
                previewAction={previewAction}
              />

              <div className="mt-10 px-5">
                <ShopMain />

                <div className="mt-16">
                  <div className="flex justify-between max-w-[1175px] border-b-2 border-b-gray-300">
                    <h3 className="heading-secondary text-2xl pb-0">
                      Title Settings
                    </h3>
                    <Toggle
                      title="Show Product Title"
                      name="showProductTitle"
                    />
                  </div>
                  {shopSettings.showProductTitle ? (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                        <FontFamily name="productTitleFont" />

                        <Range
                          title="Font Size"
                          min={14}
                          max={50}
                          name="productTitleSize"
                        />

                        <Alignment name="productTitleAlignment" />

                        <Color name="productTitleColor" />
                      </div>
                      <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                        <h4
                          className="afx-ap-product-title text-center text-xl"
                          style={{
                            fontSize: shopSettings.productTitleSize + "px",
                            textAlign: shopSettings.productTitleAlignment,
                            color: shopSettings.productTitleColor,
                          }}
                        >
                          This is a simple product
                        </h4>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-16">
                  <div className="flex justify-between max-w-[1175px] border-b-2 border-b-gray-300">
                    <h3 className="heading-secondary text-2xl pb-0">
                      Short Description Settings
                    </h3>
                    <Toggle
                      title="Show Product Short Description"
                      name="showProductDes"
                    />
                  </div>
                  {shopSettings.showProductDes ? (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                        <FontFamily name="productDesFont" />

                        <Range
                          title="Font Size"
                          min={14}
                          max={50}
                          name="productDesSize"
                        />

                        <Alignment name="productDesAlignment" />
                        <Color name="productDesColor" />
                      </div>

                      <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                        <h4
                          className="afx-ap-product-des text-center text-xl"
                          style={{
                            fontSize: shopSettings.productDesSize + "px",
                            textAlign: shopSettings.productDesAlignment,
                            color: shopSettings.productDesColor,
                          }}
                        >
                          This is a simple product
                        </h4>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-16">
                  <div className="flex justify-between max-w-[1175px] border-b-2 border-b-gray-300">
                    <h3 className="heading-secondary text-2xl pb-0">
                      Price Settings
                    </h3>
                    <Toggle
                      title="Show Product Price"
                      name="showProductPrice"
                    />
                  </div>
                  {shopSettings.showProductPrice ? (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                        <FontFamily name="productPriceFont" />

                        <Range
                          title="Font Size"
                          min={14}
                          max={50}
                          name="productPriceSize"
                        />

                        <Alignment name="productPriceAlignment" />

                        <Color name="productPriceColor" />
                      </div>
                      <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7">
                        <h4
                          className="afx-ap-product-price text-center text-xl"
                          style={{
                            fontSize: shopSettings.productPriceSize + "px",
                            textAlign: shopSettings.productPriceAlignment,
                            color: shopSettings.productPriceColor,
                          }}
                        >
                          $12.99
                        </h4>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-16">
                  <div className="flex justify-between max-w-[1175px] border-b-2 border-b-gray-300">
                    <h3 className="heading-secondary text-2xl pb-0">
                      Button Settings
                    </h3>
                    <Toggle
                      title="Show Product Button"
                      name="showProductButton"
                    />
                  </div>
                  {shopSettings.showProductButton ? (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-10">
                        <FontFamily name="productButtonFont" />

                        <Range
                          title="Font Size"
                          min={14}
                          max={50}
                          name="productButtonSize"
                        />

                        <Alignment name="productButtonAlignment" />

                        <Color title="Background" name="productButtonBgColor" />
                      </div>
                      <h4 className="heading-sub">Button Style</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 mt-5">
                        <Input name="productButtonText" />

                        <div className="afx-form-field flex-col !items-start">
                          <label htmlFor="">Button Size:</label>
                          <Select
                            options={btnSizeOptions}
                            placeholder="Medium"
                            value={btnSizeOptions.filter(
                              (option) =>
                                option.value === shopSettings.productButtonWidth
                            )}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                width: 275,
                              }),
                            }}
                            onChange={(newValue) => {
                              setShopSettings({
                                ...shopSettings,
                                productButtonWidth: newValue.value,
                              });
                            }}
                          />
                        </div>

                        <Range
                          title="Border Radius"
                          min={0}
                          max={100}
                          name="productButtonBorderRadius"
                        />

                        <Color name="productButtonColor" />
                      </div>

                      <div className="w-full max-w-2xl mx-auto bg-slate-200 p-7 text-center">
                        <button
                          className="afx-ap-product-btn mx-auto text-xl"
                          style={{
                            fontSize: shopSettings.productButtonSize + "px",
                            textAlign: shopSettings.productButtonAlignment,
                            backgroundColor: shopSettings.productButtonBgColor,
                            color: shopSettings.productButtonColor,
                            borderRadius:
                              shopSettings.productButtonBorderRadius + "px",
                            padding: "19px 40px",
                          }}
                        >
                          {shopSettings.productButtonText}
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => saveShop()}
                className="action-button primary mx-auto mt-10 mb-2"
              >
                <i className="dashicons-before dashicons-yes"></i> {loader}
              </button>
            </div>
          </>
        )}

        <ModalPreview
          showModal={showModal}
          setShowModal={setShowModal}
          handleClose={() => {
            setShowModal(false);
          }}
        >
          <Preview
            shopSettings={shopSettings}
            websiteProducts={websiteProducts}
          />
        </ModalPreview>
      </div>
    </shortcodeContext.Provider>
  );
};

export default ShortcodeNew;
