import GoogleFonts from "./google_fonts.json";

export const gridStyleOptions = [
  {
    value: "style1",
    label: "Style #1",
  },
  {
    value: "style2",
    label: "Style #2",
  },
  {
    value: "style3",
    label: "Style #3",
  },
];

export const orderByOptions = [
  {
    value: "ID",
    label: "ID",
  },
  {
    value: "title",
    label: "Title",
  },
  {
    value: "date",
    label: "Creation Date",
  },
  {
    value: "modified",
    label: "Modified Date",
  },
  {
    value: "menu_order",
    label: "Menu Order",
  },
  {
    value: "rand",
    label: "Random",
  },
];

export const orderOptions = [
  {
    value: "ASC",
    label: "Ascending",
  },
  {
    value: "DESC",
    label: "Descending",
  },
];

export const fontWeightOptions = [
  {
    value: "lighter",
    label: "Light",
  },
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "bold",
    label: "Bold",
  },
];

export const textTransformOptions = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "capitalize",
    label: "Capitalize",
  },
  {
    value: "uppercase",
    label: "Uppercase",
  },
  {
    value: "lowercase",
    label: "Lowercase",
  },
];

export const textAlignOptions = [
  {
    value: "left",
    label: "Left",
  },
  {
    value: "center",
    label: "Center",
  },
  {
    value: "right",
    label: "Right",
  },
];

export const fontStyleOptions = [
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "italic",
    label: "Italic",
  },
  {
    value: "oblique",
    label: "Oblique",
  },
];

export const borderOptions = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "solid",
    label: "Solid",
  },
  {
    value: "dashed",
    label: "Dashed",
  },
  {
    value: "dotted",
    label: "Dotted",
  },
  {
    value: "outset",
    label: "Outset",
  },
  {
    value: "inset",
    label: "Inset",
  },
  {
    value: "ridge",
    label: "Ridge",
  },
  {
    value: "groove",
    label: "Groove",
  },
  {
    value: "double",
    label: "Double",
  },
];

export const textDecorationOptions = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "overline",
    label: "Overline",
  },
  {
    value: "underline",
    label: "Underline",
  },
  {
    value: "line-through",
    label: "Line Through",
  },
  {
    value: "underline overline",
    label: "Underline Overline",
  },
];

export const relationOptions = [
  {
    value: "OR",
    label: "OR",
  },
  {
    value: "AND",
    label: "AND",
  },
];

export const operatorOptions = [
  {
    value: "IN",
    label: "IN",
  },
  {
    value: "NOT IN",
    label: "NOT IN",
  },
  {
    value: "AND",
    label: "AND",
  },
  {
    value: "EXISTS",
    label: "EXISTS",
  },
  {
    value: "NOT EXISTS",
    label: "NOT EXISTS",
  },
];

export const postStatusOptions = [
  {
    value: "publish",
    label: "Publish",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "draft",
    label: "Draft",
  },
  {
    value: "future",
    label: "Future",
  },
  {
    value: "private",
    label: "Private",
  },
];

export const tagOptions = [
  {
    value: "H1",
    label: "H1",
  },
  {
    value: "H2",
    label: "H2",
  },
  {
    value: "H3",
    label: "H3",
  },
  {
    value: "H4",
    label: "H4",
  },
  {
    value: "H5",
    label: "H5",
  },
  {
    value: "H6",
    label: "H6",
  },
];

export const separatorOptions = [
  {
    value: ".",
    label: ".",
  },
  {
    value: "/",
    label: "/",
  },
  {
    value: "//",
    label: "//",
  },
  {
    value: "|",
    label: "|",
  },
  {
    value: "-",
    label: "-",
  },
];

export const excerptOptions = [
  {
    value: "character",
    label: "Character",
  },
  {
    value: "word",
    label: "Word",
  },
];

export const columnOptions = [
  {
    value: "1",
    label: "Column 1",
  },
  {
    value: "2",
    label: "Column 2",
  },
  {
    value: "3",
    label: "Column 3",
  },
  {
    value: "4",
    label: "Column 4",
  },
  {
    value: "5",
    label: "Column 5",
  },
  {
    value: "6",
    label: "Column 6",
  },
];

export const getGoogleFonts = (fonts) => {
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
    label: "----- Deafult -----",
  });

  Object.keys(GoogleFonts).map((key) => {
    fontsOptions.push({
      value: GoogleFonts[key],
      label: key,
    });
  });

  return fontsOptions;
};

export const fontsUrlToName = (fonts_url) => {
  const font_url_ar = fonts_url.split("/");
  const font_name = font_url_ar[font_url_ar.length - 1].split(".")[0];
  return font_name;
};

export const insertUrlParam = (key, value) => {
  if (value === undefined) value = "";
  if (history.pushState) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.pushState({ path: newurl }, "", newurl);
  }
};

export const removeUrlParam = (paramKey) => {
  const url = window.location.href;
  const r = new URL(url);
  r.searchParams.delete(paramKey);
  const newUrl = r.href;
  window.history.pushState({ path: newUrl }, "", newUrl);
};

export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

export const getRandomNo = (min = 1000, max = 9999) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
