import React, { useContext, useEffect, useState, useMemo } from "react";
import { appContext } from "../contexts/appContext.jsx";
import { gridContext } from "../contexts/gridContext";
import Divider from "../components/global/Divider.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import ModalPreview from "../components/global/ModalPreview.jsx";
import Preview from "../components/parts/Preview.jsx";
import { getGoogleFonts, insertUrlParam } from "../utils/const.js";
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
  const [activeSubTab, setActiveSubTab] = useState("grid_settings");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState("Save Grid");

  const [cssStyles, setCssStyles] = useState("");

  const [initialSettings, setInitialSettings] = useState({
    gridTitle: "",
    gridStyle: "style1",
    gridColumnsD: 3,
    gridColumnsT: 2,
    gridColumnsM: 1,

    applyTaxonomyFilter: false,
    applyOrderFilter: false,
    applyDateFilter: false,
    applyStatusFilter: false,
    applyAuthorFilter: false,
    applySearchFilter: false,
    applyPostsFilter: false,

    postType: [],
    postsPerPage: 9,
    postOffset: 0,
    taxonomy: [],
    terms: [],
    relation: "OR",
    operator: "IN",

    postOrderBy: "date",
    postOrder: "DESC",
    postStartDate: "",
    postEndDate: "",
    postStatus: [],
    authors: [],
    search: "",
    postsToInclude: [],
    postsToExclude: [],

    displaySCHeading: true,
    displayPostTitle: true,
    displayPostCategory: true,
    displayPostExcerpt: true,
    displayPostMeta: true,
    displayPostImage: true,
    displayReadBtn: true,

    scHeadingTag: "H2",
    postTitleTag: "H3",
    postTitleType: "character",
    postTitleLimit: 0,
    postCatSeparator: "|",
    postExcerptType: "character",
    postExcerptLimit: 25,
    postExcerptText: "...",
    postMetaDisDate: true,
    postMetaDisAuthor: false,
    postMetaDisCC: false,
    postImageSize: "large",
    postBtnText: "Read More",

    loadMoreBtn: true,
    loadMoreBtnText: "Load More",

    gridBgColor: "#CCC",
    gridGap: 10,
    gridPadding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
    gridMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },

    shFont: "",
    shFontSize: 26,
    shFontWeight: "bold",
    shFontStyle: "normal",
    shColor: "#333",
    shTextDecoration: "none",
    shTextTransform: "none",
    shLineHeight: 26,
    shPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    shMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    shLetterSpacing: 0,
    shWordSpacing: 0,
    shAlignment: "center",

    titleFont: "",
    titleFontSize: 22,
    titleFontWeight: "bold",
    titleFontStyle: "normal",
    titleColor: "#000",
    titleHoverColor: "#333",
    titleTextDecoration: "none",
    titleTextTransform: "none",
    titleLineHeight: 22,
    titlePadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    titleMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    titleLetterSpacing: 0,
    titleWordSpacing: 0,
    titleAlignment: "left",

    excerptFont: "",
    excerptFontSize: 16,
    excerptFontWeight: "normal",
    excerptFontStyle: "normal",
    excerptColor: "#666",
    excerptTextDecoration: "none",
    excerptTextTransform: "none",
    excerptLineHeight: 16,
    excerptPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    excerptMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    excerptLetterSpacing: 0,
    excerptWordSpacing: 0,
    excerptAlignment: "left",

    postImageHeight: 250,

    metaFont: "",
    metaFontSize: 16,
    metaFontWeight: "normal",
    metaFontStyle: "normal",
    metaColor: "#666",
    metaHoverColor: "#333",
    metaTextDecoration: "none",
    metaTextTransform: "none",
    metaLineHeight: 16,
    metaPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    metaMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    metaLetterSpacing: 0,
    metaWordSpacing: 0,
    metaAlignment: "left",

    btnFont: "",
    btnFontSize: 18,
    btnFontWeight: "normal",
    btnFontStyle: "normal",
    btnBgColor: "#0da8e9",
    btnColor: "#FFF",
    btnBorderRadius: 5,
    btnBgHoverColor: "#745FF1",
    btnHoverColor: "#FFF",
    btnTextDecoration: "none",
    btnTextTransform: "none",
    btnLineHeight: 18,
    btnPadding: {
      top: 12,
      right: 30,
      bottom: 12,
      left: 30,
    },
    btnMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    btnLetterSpacing: 0,
    btnWordSpacing: 0,
    btnAlignment: "center",
    btnBorder: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      type: "none",
      color: "#333",
    },

    btnLmFont: "",
    btnLmFontSize: 18,
    btnLmFontWeight: "normal",
    btnLmFontStyle: "normal",
    btnLmBgColor: "#0da8e9",
    btnLmColor: "#FFF",
    btnLmBorderRadius: 5,
    btnLmBgHoverColor: "#745FF1",
    btnLmHoverColor: "#FFF",
    btnLmTextDecoration: "none",
    btnLmTextTransform: "none",
    btnLmLineHeight: 18,
    btnLmPadding: {
      top: 12,
      right: 30,
      bottom: 12,
      left: 30,
    },
    btnLmLetterSpacing: 0,
    btnLmWordSpacing: 0,
    btnLmAlignment: "center",
    btnLmBorder: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      type: "none",
      color: "#333",
    },
    btnLmText: "Load More",
  });

  const [defaultSettings, setDefaultSettings] = useState({
    gridTitle: "",
    gridStyle: "style1",
    gridColumnsD: 3,
    gridColumnsT: 3,
    gridColumnsM: 3,

    applyTaxonomyFilter: false,
    applyOrderFilter: false,
    applyDateFilter: false,
    applyStatusFilter: false,
    applyAuthorFilter: false,
    applySearchFilter: false,
    applyPostsFilter: false,

    postType: [],
    postsPerPage: 9,
    postOffset: 0,
    taxonomy: [],
    terms: [],
    relation: "OR",
    operator: "IN",

    postOrderBy: "date",
    postOrder: "DESC",
    postStartDate: "",
    postEndDate: "",
    postStatus: [],
    authors: [],
    search: "",
    postsToInclude: [],
    postsToExclude: [],

    displaySCHeading: true,
    displayPostTitle: true,
    displayPostCategory: true,
    displayPostExcerpt: true,
    displayPostMeta: true,
    displayPostImage: true,
    displayReadBtn: true,

    scHeadingTag: "H2",
    postTitleTag: "H3",
    postTitleType: "character",
    postTitleLimit: 0,
    postCatSeparator: "|",
    postExcerptType: "character",
    postExcerptLimit: 25,
    postExcerptText: "...",
    postMetaDisDate: true,
    postMetaDisAuthor: false,
    postMetaDisCC: false,
    postImageSize: "large",
    postBtnText: "Read More",

    loadMoreBtn: true,
    loadMoreBtnText: "Load More",

    gridBgColor: "#CCC",
    gridGap: 10,
    gridPadding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
    gridMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },

    shFont: "",
    shFontSize: 26,
    shFontWeight: "bold",
    shFontStyle: "normal",
    shColor: "#333",
    shTextDecoration: "none",
    shTextTransform: "none",
    shLineHeight: 26,
    shPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    shMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    shLetterSpacing: 0,
    shWordSpacing: 0,
    shAlignment: "center",

    titleFont: "",
    titleFontSize: 20,
    titleFontWeight: "normal",
    titleFontStyle: "normal",
    titleColor: "#000",
    titleHoverColor: "#333",
    titleTextDecoration: "none",
    titleTextTransform: "none",
    titleLineHeight: 20,
    titlePadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    titleMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    titleLetterSpacing: 0,
    titleWordSpacing: 0,
    titleAlignment: "left",

    excerptFont: "",
    excerptFontSize: 16,
    excerptFontWeight: "normal",
    excerptFontStyle: "normal",
    excerptColor: "#666",
    excerptTextDecoration: "none",
    excerptTextTransform: "none",
    excerptLineHeight: 16,
    excerptPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    excerptMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    excerptLetterSpacing: 0,
    excerptWordSpacing: 0,
    excerptAlignment: "left",

    postImageHeight: 250,

    metaFont: "",
    metaFontSize: 16,
    metaFontWeight: "normal",
    metaFontStyle: "normal",
    metaColor: "#666",
    metaHoverColor: "#333",
    metaTextDecoration: "none",
    metaTextTransform: "none",
    metaLineHeight: 16,
    metaPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    metaMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    metaLetterSpacing: 0,
    metaWordSpacing: 0,
    metaAlignment: "left",

    btnFont: "",
    btnFontSize: 18,
    btnFontWeight: "normal",
    btnFontStyle: "normal",
    btnBgColor: "#0da8e9",
    btnColor: "#FFF",
    btnBorderRadius: 5,
    btnBgHoverColor: "#745FF1",
    btnHoverColor: "#FFF",
    btnTextDecoration: "none",
    btnTextTransform: "none",
    btnLineHeight: 18,
    btnPadding: {
      top: 12,
      right: 30,
      bottom: 12,
      left: 30,
    },
    btnMargin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    btnLetterSpacing: 0,
    btnWordSpacing: 0,
    btnAlignment: "center",
    btnBorder: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      type: "none",
      color: "#333",
    },

    btnLmFont: "",
    btnLmFontSize: 18,
    btnLmFontWeight: "normal",
    btnLmFontStyle: "normal",
    btnLmBgColor: "#0da8e9",
    btnLmColor: "#FFF",
    btnLmBorderRadius: 5,
    btnLmBgHoverColor: "#745FF1",
    btnLmHoverColor: "#FFF",
    btnLmTextDecoration: "none",
    btnLmTextTransform: "none",
    btnLmLineHeight: 18,
    btnLmPadding: {
      top: 12,
      right: 30,
      bottom: 12,
      left: 30,
    },
    btnLmLetterSpacing: 0,
    btnLmWordSpacing: 0,
    btnLmAlignment: "center",
    btnLmBorder: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      type: "none",
      color: "#333",
    },
    btnLmText: "Load More",
  });

  const {
    baseUrl,
    gridId,
    setGridId,
    activeTab,
    setRefreshSettings,
    settings,
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
    if (activeTab == "grid-new") {
      const queryParameters = new URLSearchParams(window.location.search);
      const grid_id = queryParameters.get("grid_id");

      setLoading(true);
      const toastId = toast.loading("Getting Grid data...");
      if (grid_id) {
        axios
          .post(
            baseUrl + "grid/get" + "/?_wpnonce=" + afxApApp.nonce,
            {
              grid_id,
            },
            {
              headers: {
                "content-type": "application/json",
                "X-WP-NONCE": afxApApp.nonce,
              },
            }
          )
          .then((res) => {
            setGridId(res.data.id);
            const settings = JSON.parse(res.data.settings);

            setDefaultSettings({
              ...defaultSettings,
              gridTitle: res.data.title,

              gridStyle: settings.gridStyle,
              gridColumnsD: settings.gridColumnsD,
              gridColumnsT: settings.gridColumnsT,
              gridColumnsM: settings.gridColumnsM,

              applyTaxonomyFilter: settings.applyTaxonomyFilter,
              applyOrderFilter: settings.applyOrderFilter,
              applyDateFilter: settings.applyDateFilter,
              applyStatusFilter: settings.applyStatusFilter,
              applyAuthorFilter: settings.applyAuthorFilter,
              applySearchFilter: settings.applySearchFilter,
              applyPostsFilter: settings.applyPostsFilter,

              postType: settings.postType,
              postsPerPage: settings.postsPerPage,
              postOffset: settings.postOffset,
              taxonomy: settings.taxonomy,
              terms: settings.terms,
              relation: settings.relation,
              operator: settings.operator,

              postOrderBy: settings.postOrderBy,
              postOrder: settings.postOrder,
              postStartDate: settings.postStartDate,
              postEndDate: settings.postEndDate,
              postStatus: settings.postStatus,
              authors: settings.authors,
              search: settings.search,
              postsToInclude: settings.postsToInclude,
              postsToExclude: settings.postsToExclude,

              displaySCHeading: settings.displaySCHeading,
              displayPostTitle: settings.displayPostTitle,
              displayPostCategory: settings.displayPostCategory,
              displayPostExcerpt: settings.displayPostExcerpt,
              displayPostMeta: settings.displayPostMeta,
              displayPostImage: settings.displayPostImage,
              displayReadBtn: settings.displayReadBtn,

              gridBgColor: settings.gridBgColor,
              gridGap: settings.gridGap,
              gridPadding: {
                top: settings.gridPadding.top,
                right: settings.gridPadding.right,
                bottom: settings.gridPadding.bottom,
                left: settings.gridPadding.left,
              },
              gridMargin: {
                top: settings.gridMargin.top,
                right: settings.gridMargin.right,
                bottom: settings.gridMargin.bottom,
                left: settings.gridMargin.left,
              },

              scHeadingTag: settings.scHeadingTag,
              postTitleTag: settings.postTitleTag,
              postTitleType: settings.postTitleType,
              postTitleLimit: settings.postTitleLimit,
              postCatSeparator: settings.postCatSeparator,
              postExcerptType: settings.postExcerptType,
              postExcerptLimit: settings.postExcerptLimit,
              postExcerptText: settings.postExcerptText,
              postMetaDisDate: settings.postMetaDisDate,
              postMetaDisAuthor: settings.postMetaDisAuthor,
              postMetaDisCC: settings.postMetaDisCC,
              postImageSize: settings.postImageSize,
              postBtnText: settings.postBtnText,

              loadMoreBtn: settings.loadMoreBtn,
              loadMoreBtnText: settings.loadMoreBtnText,

              shFont: settings.shFont,
              shFontSize: settings.shFontSize,
              shFontWeight: settings.shFontWeight,
              shFontStyle: settings.shFontStyle,
              shColor: settings.shColor,
              shTextDecoration: settings.shTextDecoration,
              shTextTransform: settings.shTextTransform,
              shLineHeight: settings.shLineHeight,
              shPadding: {
                top: settings.shPadding.top,
                right: settings.shPadding.right,
                bottom: settings.shPadding.bottom,
                left: settings.shPadding.left,
              },
              shMargin: {
                top: settings.shMargin.top,
                right: settings.shMargin.right,
                bottom: settings.shMargin.bottom,
                left: settings.shMargin.left,
              },
              shLetterSpacing: settings.shLetterSpacing,
              shWordSpacing: settings.shWordSpacing,
              shAlignment: settings.shAlignment,

              titleFont: settings.titleFont,
              titleFontSize: settings.titleFontSize,
              titleFontWeight: settings.titleFontWeight,
              titleFontStyle: settings.titleFontStyle,
              titleColor: settings.titleColor,
              titleHoverColor: settings.titleHoverColor,
              titleTextDecoration: settings.titleTextDecoration,
              titleTextTransform: settings.titleTextTransform,
              titleLineHeight: settings.titleLineHeight,
              titlePadding: {
                top: settings.titlePadding.top,
                right: settings.titlePadding.right,
                bottom: settings.titlePadding.bottom,
                left: settings.titlePadding.left,
              },
              titleMargin: {
                top: settings.titleMargin.top,
                right: settings.titleMargin.right,
                bottom: settings.titleMargin.bottom,
                left: settings.titleMargin.left,
              },
              titleLetterSpacing: settings.titleLetterSpacing,
              titleWordSpacing: settings.titleWordSpacing,
              titleAlignment: settings.titleAlignment,

              excerptFont: settings.excerptFont,
              excerptFontSize: settings.excerptFontSize,
              excerptFontWeight: settings.excerptFontWeight,
              excerptFontStyle: settings.excerptFontStyle,
              excerptColor: settings.excerptColor,
              excerptTextDecoration: settings.excerptTextDecoration,
              excerptTextTransform: settings.excerptTextTransform,
              excerptLineHeight: settings.excerptLineHeight,
              excerptPadding: {
                top: settings.excerptPadding.top,
                right: settings.excerptPadding.right,
                bottom: settings.excerptPadding.bottom,
                left: settings.excerptPadding.left,
              },
              excerptMargin: {
                top: settings.excerptMargin.top,
                right: settings.excerptMargin.right,
                bottom: settings.excerptMargin.bottom,
                left: settings.excerptMargin.left,
              },
              excerptLetterSpacing: settings.excerptLetterSpacing,
              excerptWordSpacing: settings.excerptWordSpacing,
              excerptAlignment: settings.excerptAlignment,

              postImageHeight: settings.postImageHeight,

              metaFont: settings.metaFont,
              metaFontSize: settings.metaFontSize,
              metaFontWeight: settings.metaFontWeight,
              metaFontStyle: settings.metaFontStyle,
              metaColor: settings.metaColor,
              metaHoverColor: settings.metaHoverColor,
              metaTextDecoration: settings.metaTextDecoration,
              metaTextTransform: settings.metaTextTransform,
              metaLineHeight: settings.metaLineHeight,
              metaPadding: {
                top: settings.metaPadding.top,
                right: settings.metaPadding.right,
                bottom: settings.metaPadding.bottom,
                left: settings.metaPadding.left,
              },
              metaMargin: {
                top: settings.metaMargin.top,
                right: settings.metaMargin.right,
                bottom: settings.metaMargin.bottom,
                left: settings.metaMargin.left,
              },
              metaLetterSpacing: settings.metaLetterSpacing,
              metaWordSpacing: settings.metaWordSpacing,
              metaAlignment: settings.metaAlignment,

              btnFont: settings.btnFont,
              btnFontSize: settings.btnFontSize,
              btnFontWeight: settings.btnFontWeight,
              btnFontStyle: settings.btnFontStyle,
              btnBgColor: settings.btnBgColor,
              btnColor: settings.btnColor,
              btnBorderRadius: settings.btnBorderRadius,
              btnBgHoverColor: settings.btnBgHoverColor,
              btnHoverColor: settings.btnHoverColor,
              btnTextDecoration: settings.btnTextDecoration,
              btnTextTransform: settings.btnTextTransform,
              btnLineHeight: settings.btnLineHeight,
              btnPadding: {
                top: settings.btnPadding.top,
                right: settings.btnPadding.right,
                bottom: settings.btnPadding.bottom,
                left: settings.btnPadding.left,
              },
              btnMargin: {
                top: settings.btnMargin.top,
                right: settings.btnMargin.right,
                bottom: settings.btnMargin.bottom,
                left: settings.btnMargin.left,
              },
              btnLetterSpacing: settings.btnLetterSpacing,
              btnWordSpacing: settings.btnWordSpacing,
              btnAlignment: settings.btnAlignment,
              btnBorder: {
                top: settings.btnBorder.top,
                right: settings.btnBorder.right,
                bottom: settings.btnBorder.bottom,
                left: settings.btnBorder.left,
                type: settings.btnBorder.type,
                color: settings.btnBorder.color,
              },

              btnLmFont: settings.btnLmFont,
              btnLmFontSize: settings.btnLmFontSize,
              btnLmFontWeight: settings.btnLmFontWeight,
              btnLmFontStyle: settings.btnLmFontStyle,
              btnLmBgColor: settings.btnLmBgColor,
              btnLmColor: settings.btnLmColor,
              btnLmBorderRadius: settings.btnLmBorderRadius,
              btnLmBgHoverColor: settings.btnLmBgHoverColor,
              btnLmHoverColor: settings.btnLmHoverColor,
              btnLmTextDecoration: settings.btnLmTextDecoration,
              btnLmTextTransform: settings.btnLmTextTransform,
              btnLmLineHeight: settings.btnLmLineHeight,
              btnLmPadding: {
                top: settings.btnLmPadding.top,
                right: settings.btnLmPadding.right,
                bottom: settings.btnLmPadding.bottom,
                left: settings.btnLmPadding.left,
              },
              btnLmLetterSpacing: settings.btnLmLetterSpacing,
              btnLmWordSpacing: settings.btnLmWordSpacing,
              btnLmAlignment: settings.btnLmAlignment,
              btnLmBorder: {
                top: settings.btnLmBorder.top,
                right: settings.btnLmBorder.right,
                bottom: settings.btnLmBorder.bottom,
                left: settings.btnLmBorder.left,
                type: settings.btnLmBorder.type,
                color: settings.btnLmBorder.color,
              },
              btnLmText: settings.btnLmText,
            });
          });
      } else {
        setGridId(null);
        setDefaultSettings({ ...initialSettings });
      }
      setLoading(false);
      toast.dismiss(toastId);
    }
  }, [activeTab]);

  const fontsOptions = getGoogleFonts(fonts);

  const gridValues = useMemo(() => {
    return {
      defaultSettings,
      setDefaultSettings,
      cssStyles,
      setCssStyles,
      pickerColors,
      fontsOptions,
      postTypes,
      authors,
      taxonomies,
      terms,
      posts,
    };
  }, [
    defaultSettings,
    pickerColors,
    fontsOptions,
    postTypes,
    authors,
    cssStyles,
  ]);

  useEffect(() => {
    axios
      .get(baseUrl + "post-types" + "/?_wpnonce=" + afxApApp.nonce)
      .then((res) => {
        if (res.data) {
          setPostTypes(res.data);
        }
      });

    axios
      .get(baseUrl + "authors" + "/?_wpnonce=" + afxApApp.nonce)
      .then((res) => {
        if (res.data) {
          setAuthors(res.data);
        }
      });
  }, []);

  useEffect(() => {
    if (!gridId) {
      setGridId(null);
      setDefaultSettings({ ...initialSettings });
    }
  }, [gridId]);

  useEffect(() => {
    const type = defaultSettings.postType?.value;

    if (type) {
      axios
        .get(
          baseUrl +
            "taxonomies?post-type=" +
            type +
            "&_wpnonce=" +
            afxApApp.nonce
        )
        .then((res) => {
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
        .get(
          baseUrl +
            "terms?post-type=" +
            type +
            "&taxonomy=" +
            taxonomy +
            "&_wpnonce=" +
            afxApApp.nonce
        )
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
    const order_by = defaultSettings.postOrderBy || "";
    const order = defaultSettings.postOrder || "";
    const search = defaultSettings.search || "";

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

    const sd = defaultSettings.postStartDate;
    let sd_date = "";
    if (sd) {
      const sd_obj = new Date(Date.parse(sd));
      const sd_year = sd_obj.getFullYear();
      const sd_month = sd_obj.getMonth() + 1;
      const sd_day = sd_obj.getDate();
      sd_date =
        sd_year + "-" + sd_month.toString().padStart(2, "0") + "-" + sd_day;
    }

    const ed = defaultSettings.postEndDate;
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
    if (search != "") {
      query += `&search=${search}`;
    }

    if (type != "" && query) {
      axios
        .get(baseUrl + "posts?" + query + "&_wpnonce=" + afxApApp.nonce)
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
    defaultSettings.relation,
    defaultSettings.operator,
    defaultSettings.postOrderBy,
    defaultSettings.postOrder,
    defaultSettings.postStartDate,
    defaultSettings.postEndDate,
    defaultSettings.postStatus,
    defaultSettings.authors,
    defaultSettings.search,
  ]);

  const saveGrid = () => {
    if (defaultSettings.gridTitle == "") {
      toast.error("Grid Title is Required");
      setActiveSubTab("grid_settings");
      window.scrollTo(0, 0);
      setError(true);
    } else if (defaultSettings.postType == "") {
      toast.error("Post Type is Required");
      setActiveSubTab("query_filters");
      window.scrollTo(0, 0);
      setError(true);
    } else {
      setError(false);
      setLoader("Saving Grid...");
      const settings = { ...defaultSettings };
      delete settings.gridTitle;

      const queryParameters = new URLSearchParams(window.location.search);
      const grid_id = queryParameters.get("grid_id");

      axios
        .post(
          baseUrl + "grid/new" + "/?_wpnonce=" + afxApApp.nonce,
          {
            grid_id: grid_id,
            grid_title: defaultSettings.gridTitle,
            grid_settings: JSON.stringify(settings),
          },
          {
            headers: {
              "content-type": "application/json",
              "X-WP-NONCE": afxApApp.nonce,
            },
          }
        )
        .then((res) => {
          setGridId(res.data.grid_id);
          toast.success(res.data.message);
          insertUrlParam("grid_id", res.data.grid_id);
          setRefreshSettings(true);
          setLoader("Save Grid");
        });
    }
  };

  return (
    <gridContext.Provider value={gridValues}>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">
          {defaultSettings.gridTitle || "New Grid"}
        </h2>
      </div>
      <Divider />

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
              onClick={() => saveGrid()}
            >
              <i className="dashicons-before dashicons-yes"></i> {loader}
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
          className="action-button primary py-1.5 px-6"
          onClick={() => saveGrid()}
        >
          <i className="dashicons-before dashicons-yes"></i> {loader}
        </button>
      </div>

      <ModalPreview
        showModal={showModal}
        setShowModal={setShowModal}
        handleClose={() => {
          setShowModal(false);
        }}
      >
        <Preview defaultSettings={defaultSettings} cssStyles={cssStyles} />
      </ModalPreview>
    </gridContext.Provider>
  );
};

export default GridNew;
