import React, { useContext, useEffect, useState, useMemo } from "react";
import { appContext } from "../contexts/appContext.jsx";
import { gridContext } from "../contexts/gridContext";
import Divider from "../components/global/Divider.jsx";
import axios from "axios";
import Select from "react-select";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/confetti.css";
import Alignment from "../components/elements/Alignment";
import Border from "../components/elements/Border";
import Color from "../components/elements/Color";
import FontFamily from "../components/elements/FontFamily";
import FontStyle from "../components/elements/FontStyle";
import FontWeight from "../components/elements/FontWeight";
import Input from "../components/elements/Input.jsx";
import InputGroup from "../components/elements/InputGroup";
import Range from "../components/elements/Range";
import TextDecoration from "../components/elements/TextDecoration";
import TextTransform from "../components/elements/TextTransform";
import Toggle from "../components/elements/Toggle";
import ModalPreview from "../components/global/ModalPreview.jsx";
import Preview from "../components/parts/Preview.jsx";
import {
  getGoogleFonts,
  fontsUrlToName,
  orderOptions,
  gridStyleOptions,
} from "../utils/const.js";

const GridNew = () => {
  const [postTypes, setPostTypes] = useState([]);
  const [taxonomies, setTaxonomies] = useState([]);
  const [terms, setTerms] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pickerColors, setPickerColors] = useState([]);
  const [fonts, setFonts] = useState({});
  const [showModal, setShowModal] = useState(false);

  const {
    baseUrl,
    gridId,
    activeTab,
    setActiveTab,
    refreshSettings,
    setRefreshSettings,
    gridSettings,
    setGridSettings,
    settings,
  } = useContext(appContext);

  const [defaultSettings, setDefaultSettings] = useState({
    gridTitle: "",
    gridStyle: [],
    postTypes: [],
    taxonomies: [],
    gridColumns: 3,
    postsPerPage: 9,
    postsOrder: [],

    terms: [],
    postsToInclude: [],
    postsToExclude: [],
    startDate: "",
    endDate: "",

    alignment: "left",
    border: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      type: "none",
      color: "#333",
    },
    color: "#333",
    bgColor: "#666",
    font: "",
    fontStyle: "normal",
    fontWeight: "normal",
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    fontSize: 30,
    borderRadius: 10,
    letterSpacing: 0,
    wordSpacing: 0,
    lineHeight: 30,
    textDecoration: "none",
    textTransform: "none",
    showSection: true,
  });

  const fontsOptions = getGoogleFonts(fonts);

  const styleValues = useMemo(() => {
    return {
      defaultSettings,
      setDefaultSettings,
      pickerColors,
      fontsOptions,
    };
  }, [defaultSettings, pickerColors, fontsOptions]);

  useEffect(() => {
    axios.get(baseUrl + "post-types").then((res) => {
      if (res.data) {
        setPostTypes(res.data);
      }
    });
  }, []);

  useEffect(() => {
    const type = defaultSettings.postTypes?.value;

    if (type) {
      axios.get(baseUrl + "taxonomies?post-type=" + type).then((res) => {
        if (res.data) {
          setTaxonomies(res.data);
        }
      });
    }
  }, [defaultSettings.postTypes]);

  useEffect(() => {
    const type = defaultSettings.postTypes?.value;
    const taxonomy = defaultSettings.taxonomies?.value;

    if (type && taxonomy) {
      axios
        .get(baseUrl + "terms?post-type=" + type + "&taxonomy=" + taxonomy)
        .then((res) => {
          if (res.data) {
            setTerms(res.data);
          }
        });
    }
  }, [defaultSettings.taxonomies]);

  useEffect(() => {
    const type = defaultSettings.postTypes?.value || "";
    const taxonomy = defaultSettings.taxonomies?.value || "";

    const terms = [];
    Object.values(defaultSettings.terms).map((item) => terms.push(item.value));

    if (type != "" || taxonomy != "" || terms.length > 0) {
      axios
        .get(
          baseUrl +
            "posts?post-type=" +
            type +
            "&taxonomy=" +
            taxonomy +
            "&terms=" +
            terms.join(",")
        )
        .then((res) => {
          if (res.data) {
            setPosts(res.data);
          }
        });
    }
  }, [
    defaultSettings.postTypes,
    defaultSettings.taxonomies,
    defaultSettings.terms,
  ]);

  let styles = `<style></style>`;

  return (
    <gridContext.Provider value={styleValues}>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">New Grid</h2>
      </div>

      <Divider />

      <div className="p-5">
        <div dangerouslySetInnerHTML={{ __html: styles }}></div>

        <div className="flex justify-between items-center pr-5 gap-5">
          <h3 className="heading-secondary text-2xl pb-0">Grid Settings</h3>
          <div className="afx-ap-btngroup">
            {gridId ? (
              <button
                type="button"
                className="action-button primary"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `[awesome-posts id="${gridId}"]`
                  );
                  toast.success("Shortcode Copied Successfully");
                }}
              >
                <i className="dashicons-before dashicons-shortcode"></i> Copy
                Shortcode
              </button>
            ) : (
              ""
            )}
            <button
              type="button"
              className="action-button secondary"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <i className="dashicons-before dashicons-cover-image"></i>
              Preview
            </button>
          </div>
        </div>

        <p>&nbsp;</p>

        {JSON.stringify(defaultSettings)}

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-5 py-2">
          <div className="afx-form-field flex-col !items-start">
            <label htmlFor="">Post Type:</label>
            {Object.values(postTypes).length > 0 ? (
              <Select
                options={postTypes}
                placeholder="Post"
                value={
                  Object.values(defaultSettings.postTypes).length > 0
                    ? defaultSettings.postTypes
                    : ""
                }
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: 300,
                  }),
                }}
                onChange={(newValue) => {
                  setDefaultSettings({
                    ...defaultSettings,
                    postTypes: newValue,
                    taxonomies: [],
                    terms: [],
                    postsToInclude: [],
                    postsToExclude: [],
                  });
                }}
              />
            ) : (
              <SkeletonTheme baseColor="#CCC" highlightColor="#FFF">
                <Skeleton style={{ padding: 15, width: 300 }} />
              </SkeletonTheme>
            )}
          </div>

          <div className="afx-form-field flex-col !items-start">
            <label htmlFor="">Taxonomy:</label>
            <Select
              options={taxonomies}
              placeholder="All Taxonomies"
              value={
                Object.values(defaultSettings.taxonomies).length > 0
                  ? defaultSettings.taxonomies
                  : ""
              }
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: 300,
                }),
              }}
              onChange={(newValue) => {
                setDefaultSettings({
                  ...defaultSettings,
                  taxonomies: newValue,
                  postsToInclude: [],
                  postsToExclude: [],
                });
              }}
            />
          </div>

          <div className="afx-form-field flex-col !items-start">
            <label htmlFor="">Terms:</label>
            <Select
              options={terms}
              placeholder="All Terms"
              value={
                Object.values(defaultSettings.terms).length > 0
                  ? defaultSettings.terms
                  : ""
              }
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: 300,
                }),
              }}
              onChange={(newValue) => {
                setDefaultSettings({
                  ...defaultSettings,
                  terms: newValue,
                  postsToInclude: [],
                  postsToExclude: [],
                });
              }}
              isMulti
            />
          </div>

          <div className="afx-form-field flex-col !items-start">
            <label htmlFor="">Posts (Include):</label>
            <Select
              options={posts}
              placeholder="All Posts"
              value={
                Object.values(defaultSettings.postsToInclude).length > 0
                  ? defaultSettings.postsToInclude
                  : ""
              }
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: 300,
                }),
              }}
              onChange={(newValue) => {
                setDefaultSettings({
                  ...defaultSettings,
                  postsToInclude: newValue,
                });
              }}
              isMulti
            />
          </div>

          <div className="afx-form-field flex-col !items-start">
            <label htmlFor="">Posts (Exclude):</label>
            <Select
              options={posts}
              placeholder="All Posts"
              value={
                Object.values(defaultSettings.postsToExclude).length > 0
                  ? defaultSettings.postsToExclude
                  : ""
              }
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: 300,
                }),
              }}
              onChange={(newValue) => {
                setDefaultSettings({
                  ...defaultSettings,
                  postsToExclude: newValue,
                });
              }}
              isMulti
            />
          </div>

          <div className="afx-form-field flex-col !items-start">
            <label htmlFor="">Start Date:</label>
            <Flatpickr
              className="afx-input bg-white"
              value={defaultSettings.startDate}
              options={{
                maxDate: "today",
                dateFormat: "Y-m-d",
              }}
              onChange={(date) => {
                setDefaultSettings({
                  ...defaultSettings,
                  startDate: date,
                });
              }}
              placeholder="Start Date"
            />
          </div>

          <div className="afx-form-field flex-col !items-start">
            <label htmlFor="">End Date:</label>
            <Flatpickr
              className="afx-input bg-white"
              value={defaultSettings.endDate}
              options={{
                maxDate: "today",
                dateFormat: "Y-m-d",
              }}
              onChange={(date) => {
                setDefaultSettings({
                  ...defaultSettings,
                  endDate: date,
                });
              }}
              placeholder="End Date"
            />
          </div>

          <Input title="Posts Per Page" name="postsPerPage" type="number" />

          <div className="afx-form-field flex-col !items-start">
            <label htmlFor="">Default Order:</label>
            <Select
              options={orderOptions}
              placeholder="Most Recent"
              value={orderOptions.filter(
                (option) => option.value === defaultSettings.postsOrder
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
                  postsOrder: newValue.value,
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
                          <span className="font-bold text-lg">
                            {val} Column
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

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
          <Range
            title="Letter Spacing"
            name="letterSpacing"
            min={-5}
            max={50}
          />
          <Range title="Word Spacing" name="wordSpacing" min={-5} max={50} />
          <Range title="Line Height" name="lineHeight" min={0} max={100} />

          <Color title="Background" name="bgColor" />
          <Range title="Border Radius" name="borderRadius" min={0} max={50} />
          <Toggle title="Show Section" name="showSection" />
        </div>
      </div>

      <ModalPreview
        showModal={showModal}
        setShowModal={setShowModal}
        handleClose={() => {
          setShowModal(false);
        }}
      >
        <Preview defaultSettings={defaultSettings} />
      </ModalPreview>
    </gridContext.Provider>
  );
};

export default GridNew;
