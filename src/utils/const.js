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

export const orderOptions = [
  {
    value: "date:DESC",
    label: "Most Recent",
  },
  {
    value: "date:ASC",
    label: "Oldest First",
  },
  {
    value: "title:ASC",
    label: "Title A-Z",
  },
  {
    value: "title:DESC",
    label: "Title Z-A",
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
