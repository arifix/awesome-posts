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
  const [authors, setAuthors] = useState([]);
  const [taxonomies, setTaxonomies] = useState([]);
  const [terms, setTerms] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pickerColors, setPickerColors] = useState([]);
  const [fonts, setFonts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("layout");

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
    gridColumnsD: 3,
    gridColumnsT: 3,
    gridColumnsM: 3,
    gridLoadMoreBtn: true,

    applyTaxonomyFilter: false,
    applyOrderFilter: false,
    applyDateFilter: false,
    applyPostsFilter: false,
    applyStatusFilter: false,
    applyAuthorFilter: false,
    applySearchFilter: false,

    postType: [],
    limit: "",
    postsPerPage: 9,
    offset: 0,
    taxonomy: [],
    terms: [],
    relation: "",
    operator: "",
    orderBy: "",
    order: "",
    startDate: "",
    endDate: "",
    postStatus: [],
    authors: [],
    keyword: "",
    postsToInclude: [],
    postsToExclude: [],

    displaySCHeading: true,
    displayPostTitle: true,
    displayPostCategory: true,
    displayPostExcerpt: true,
    displayPostMeta: true,
    displayPostImage: true,
    displayReadBtn: true,

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
      postTypes,
      authors,
      taxonomies,
      terms,
      posts,
    };
  }, [defaultSettings, pickerColors, fontsOptions, postTypes, authors]);

  useEffect(() => {
    axios.get(baseUrl + "post-types").then((res) => {
      if (res.data) {
        setPostTypes(res.data);
      }
    });

    axios.get(baseUrl + "authors").then((res) => {
      if (res.data) {
        setAuthors(res.data);
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
    const relation = defaultSettings.relation || "OR";
    const operator = defaultSettings.operator || "IN";
    const order_by = defaultSettings.orderBy || "";
    const order = defaultSettings.order || "";
    const keyword = defaultSettings.keyword || "";

    const terms = [];
    Object.values(defaultSettings.terms).map((item) => terms.push(item.value));

    const post_status = [];
    Object.values(defaultSettings.postStatus).map((item) =>
      post_status.push(item.value)
    );

    const authors = [];
    Object.values(defaultSettings.authors).map((item) =>
      authors.push(item.value)
    );

    const sd = defaultSettings.startDate;
    let sd_date = "";
    if (sd) {
      const sd_obj = new Date(Date.parse(sd));
      const sd_year = sd_obj.getFullYear();
      const sd_month = sd_obj.getMonth() + 1;
      const sd_day = sd_obj.getDate();
      sd_date =
        sd_year + "-" + sd_month.toString().padStart(2, "0") + "-" + sd_day;
    }

    const ed = defaultSettings.endDate;
    let ed_date = "";
    if (ed) {
      const ed_obj = new Date(Date.parse(ed));
      const ed_year = ed_obj.getFullYear();
      const ed_month = ed_obj.getMonth() + 1;
      const ed_day = ed_obj.getDate();
      ed_date =
        ed_year + "-" + ed_month.toString().padStart(2, "0") + "-" + ed_day;
    }

    let query = "";
    if (type != "") {
      query += `post-type=${type}`;
    }
    if (taxonomy != "") {
      query += `&taxonomy=${taxonomy}`;
    }
    if (terms.length > 0) {
      query += `&terms=${terms.join(",")}`;
    }
    if (taxonomy != "" && terms.length > 0 && relation != "") {
      query += `&relation=${relation}`;
    }
    if (taxonomy != "" && terms.length > 0 && operator != "") {
      query += `&operator=${operator}`;
    }
    if (order_by != "") {
      query += `&order_by=${order_by}`;
    }
    if (order != "") {
      query += `&order=${order}`;
    }
    if (sd_date != "") {
      query += `&startDate=${sd_date}`;
    }
    if (ed_date != "") {
      query += `&endDate=${ed_date}`;
    }
    if (post_status.length > 0) {
      query += `&post_status=${post_status.join(",")}`;
    }
    if (authors.length > 0) {
      query += `&authors=${authors.join(",")}`;
    }
    if (keyword != "") {
      query += `&keyword=${keyword}`;
    }

    if (type != "" && query) {
      axios.get(baseUrl + "posts?" + query).then((res) => {
        if (res.data) {
          setPosts(res.data);
        }
      });
    }
  }, [
    defaultSettings.postType,
    defaultSettings.taxonomy,
    defaultSettings.terms,
    defaultSettings.relation,
    defaultSettings.operator,
    defaultSettings.orderBy,
    defaultSettings.order,
    defaultSettings.startDate,
    defaultSettings.endDate,
    defaultSettings.postStatus,
    defaultSettings.authors,
    defaultSettings.keyword,
  ]);

  let styles = `<style></style>`;

  return (
    <gridContext.Provider value={styleValues}>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">New Grid</h2>
      </div>

      <Divider />

      {/* {JSON.stringify(defaultSettings)} */}

      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between">
        <ul className="filters flex flex-col lg:flex-row flex-wrap lg:flex-nowrap">
          <li className={`${activeSubTab == "grid_settings" ? "active" : ""}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSubTab("grid_settings");
              }}
            >
              Grid Settings
            </a>
          </li>
          <li className={`${activeSubTab == "query_filters" ? "active" : ""}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSubTab("query_filters");
              }}
            >
              Query &amp; Filters
            </a>
          </li>
          <li className={`${activeSubTab == "layout" ? "active" : ""}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSubTab("layout");
              }}
            >
              Layout
            </a>
          </li>
          <li className={`${activeSubTab == "styling" ? "active" : ""}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSubTab("styling");
              }}
            >
              Styling
            </a>
          </li>
        </ul>

        <div className="flex justify-center lg:justify-between items-center pr-5 gap-5">
          <div className="afx-ap-btngroup flex-col lg:flex-row">
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

      <div className="p-5 mt-5 lg:mt-0">
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
