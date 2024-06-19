import React, { useContext, useEffect, useState, useMemo } from "react";
import { appContext } from "../contexts/appContext.jsx";
import { gridContext } from "../contexts/gridContext";
import Divider from "../components/global/Divider.jsx";
import axios from "axios";
import ModalPreview from "../components/global/ModalPreview.jsx";
import Preview from "../components/parts/Preview.jsx";
import { getGoogleFonts } from "../utils/const.js";
import GridSettings from "../components/parts/GridSettings.jsx";
import GridQueryFilters from "../components/parts/GridQueryFilters.jsx";
import GridLayout from "../components/parts/GridLayout.jsx";
import GridStyling from "../components/parts/GridStyling.jsx";

const GridNew = () => {
  const [postTypes, setPostTypes] = useState([]);
  const [taxonomies, setTaxonomies] = useState([]);
  const [terms, setTerms] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pickerColors, setPickerColors] = useState([]);
  const [fonts, setFonts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("query_filters");

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
    gridStyle: "",
    gridColumns: 3,

    postType: [],
    limit: "",
    postsPerPage: 9,
    offset: 0,
    taxonomy: [],
    terms: [],
    operator: [],
    orderBy: [],
    order: [],
    postsToInclude: [],
    postsToExclude: [],
    startDate: "",
    endDate: "",
    postStatus: [],

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

    applyTaxonomyFilter: true,
    applyOrderFilter: true,
    applyDateFilter: true,
    applyPostsFilter: true,
    applyPostsStatusFilter: true,
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
    const type = defaultSettings.postType?.value;

    if (type) {
      axios.get(baseUrl + "taxonomies?post-type=" + type).then((res) => {
        if (res.data) {
          setTaxonomies(res.data);
        }
      });
    }
  }, [defaultSettings.postType]);

  useEffect(() => {
    const type = defaultSettings.postType?.value;
    const taxonomy = defaultSettings.taxonomy?.value;

    if (type && taxonomy) {
      axios
        .get(baseUrl + "terms?post-type=" + type + "&taxonomy=" + taxonomy)
        .then((res) => {
          if (res.data) {
            setTerms(res.data);
          }
        });
    }
  }, [defaultSettings.taxonomy]);

  useEffect(() => {
    const type = defaultSettings.postType?.value || "";
    const taxonomy = defaultSettings.taxonomy?.value || "";

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
    defaultSettings.postType,
    defaultSettings.taxonomy,
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
          <GridQueryFilters />
        </div>

        <div className={`${activeSubTab == "layout" ? "" : "hidden"}`}>
          <GridLayout />
        </div>

        <div className={`${activeSubTab == "styling" ? "" : "hidden"}`}>
          <GridStyling />
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
