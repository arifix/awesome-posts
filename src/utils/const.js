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

export const btnSizeOptions = [
  {
    value: "small",
    label: "Small",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "large",
    label: "Large",
  },
];

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
