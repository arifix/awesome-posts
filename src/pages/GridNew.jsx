import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../contexts/appContext.jsx";
import Divider from "../components/global/Divider.jsx";
import axios from "axios";
import Select from "react-select";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/confetti.css";

const GridNew = () => {
  const [postTypes, setPostTypes] = useState([]);

  const {
    baseUrl,
    activeTab,
    setActiveTab,
    refreshSettings,
    setRefreshSettings,
    settings,
  } = useContext(appContext);

  const [defaultSettings, setDefaultSettings] = useState({
    postTypes: [],
    taxonomies: [],
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

  useEffect(() => {
    axios.get(baseUrl + "post-types").then((res) => {
      if (res.data) {
        setPostTypes(res.data);
      }
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">New Post Grid</h2>
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
        <div className="afx-ap-form-field flex-col !items-start">
          <label htmlFor="">Post Type:</label>
          {Object.values(postTypes).length > 0 ? (
            <Select
              options={postTypes}
              placeholder="All Post Types"
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
      </div>
    </div>
  );
};

export default GridNew;
