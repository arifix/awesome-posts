import React, { useContext, useEffect, useState, useMemo } from "react";
import { appContext } from "../contexts/appContext.jsx";
import { gridContext } from "../contexts/gridContext";
import Divider from "../components/global/Divider.jsx";
import axios from "axios";
import Select from "react-select";
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
  orderByOptions,
  orderOptions,
  gridStyleOptions,
  operatorOptions,
  postStatusOptions,
} from "../utils/const.js";
import GridSettings from "../components/parts/GridSettings.jsx";
import QueryFilters from "../components/parts/QueryFilters.jsx";

const GridNew = () => {
  const [postTypes, setPostTypes] = useState([]);
  const [taxonomies, setTaxonomies] = useState([]);
  const [terms, setTerms] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pickerColors, setPickerColors] = useState([]);
  const [fonts, setFonts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("grid_settings");

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
    postsOrderBy: [],
    postsOrder: [],
    offset: 0,

    terms: [],
    operator: [],
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

    applyTaxonomyFilter: false,
    applyOrderFilter: false,
    applyPostsFilter: false,
    applyPostsStatusFilter: false,

    postStatus: [],
  });

  const fontsOptions = getGoogleFonts(fonts);

  const styleValues = useMemo(() => {
    return {
      defaultSettings,
      setDefaultSettings,
      pickerColors,
      fontsOptions,
      postTypes,
      setPostTypes,
      taxonomies,
      setTaxonomies,
      terms,
      setTerms,
      posts,
      setPosts,
    };
  }, [defaultSettings, pickerColors, fontsOptions, postTypes]);

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

      <div className="flex flex-row justify-between">
        <ul className="filters flex flex-row flex-wrap lg:flex-nowrap">
          <li className={`${activeSubTab == "grid_settings" ? "active" : ""}`}>
            <a
              href="javascript:void(0);"
              onClick={() => setActiveSubTab("grid_settings")}
            >
              Grid Settings
            </a>
          </li>
          <li className={`${activeSubTab == "query_filters" ? "active" : ""}`}>
            <a
              href="javascript:void(0);"
              onClick={() => setActiveSubTab("query_filters")}
            >
              Query &amp; Filters
            </a>
          </li>
          <li className={`${activeSubTab == "layout" ? "active" : ""}`}>
            <a
              href="javascript:void(0);"
              onClick={() => setActiveSubTab("layout")}
            >
              Layout
            </a>
          </li>
          <li className={`${activeSubTab == "styling" ? "active" : ""}`}>
            <a
              href="javascript:void(0);"
              onClick={() => setActiveSubTab("styling")}
            >
              Styling
            </a>
          </li>
        </ul>

        <div className="flex justify-between items-center pr-5 gap-5">
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
            <button
              type="button"
              className="action-button primary py-1"
              onClick={() => console.log(111)}
            >
              <i className="dashicons-before dashicons-yes"></i> Save Grid
            </button>
          </div>
        </div>
      </div>

      {/* <div dangerouslySetInnerHTML={{ __html: styles }}></div> */}

      <div className="p-5">
        <div className={`${activeSubTab == "grid_settings" ? "" : "hidden"}`}>
          <GridSettings />
        </div>

        <div className={`${activeSubTab == "query_filters" ? "" : "hidden"}`}>
          <QueryFilters />
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button
          type="button"
          className="action-button primary py-1"
          onClick={() => console.log(111)}
        >
          <i className="dashicons-before dashicons-yes"></i> Save Grid
        </button>
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
