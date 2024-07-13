import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext.jsx";
import Input from "../elements/Input.jsx";
import Toggle from "../elements/Toggle.jsx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/confetti.css";
import {
  operatorOptions,
  orderByOptions,
  orderOptions,
  postStatusOptions,
  relationOptions,
} from "../../utils/const.js";
import Alert from "../elements/Alert.jsx";

const GridQueryFilters = () => {
  const {
    postTypes,
    authors,
    taxonomies,
    terms,
    posts,
    defaultSettings,
    setDefaultSettings,
  } = useContext(gridContext);

  return (
    <>
      <h3 className="heading-secondary text-2xl pb-5">Query &amp; Filters</h3>

      {/* Post Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 px-5 py-2">
        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">
            Post Type: <span className="text-red-500">*</span>
          </label>
          {Object.values(postTypes).length > 0 ? (
            <Select
              options={postTypes}
              placeholder="Post Type"
              value={
                Object.values(defaultSettings.postType).length > 0
                  ? defaultSettings.postType
                  : ""
              }
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: "100%",
                  maxWidth: 300,
                }),
              }}
              onChange={(newValue) => {
                setDefaultSettings({
                  ...defaultSettings,
                  postType: newValue,
                  taxonomy: [],
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
        <Input title="Posts Per Page" name="postsPerPage" type="number" />
        <Input title="Offset" name="postOffset" type="number" />
      </div>

      {/* Taxnomy Filter */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Taxonomy Filter</h3>
          <Toggle title="Apply Taxonomy Filter?" name="applyTaxonomyFilter" />
        </div>
        {defaultSettings.applyTaxonomyFilter ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Taxonomy:</label>
              <Select
                options={taxonomies}
                placeholder="All Taxonomies"
                value={
                  Object.values(defaultSettings.taxonomy).length > 0
                    ? defaultSettings.taxonomy
                    : ""
                }
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: "100%",
                    maxWidth: 300,
                  }),
                }}
                onChange={(newValue) => {
                  setDefaultSettings({
                    ...defaultSettings,
                    taxonomy: newValue,
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
                    width: "100%",
                    maxWidth: 300,
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
              <label htmlFor="">Relation:</label>
              <Select
                options={relationOptions}
                placeholder=""
                value={relationOptions.filter(
                  (option) => option.value === defaultSettings.relation
                )}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: "100%",
                    maxWidth: 275,
                  }),
                }}
                onChange={(newValue) => {
                  setDefaultSettings({
                    ...defaultSettings,
                    relation: newValue.value,
                  });
                }}
              />
            </div>

            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Operator:</label>
              <Select
                options={operatorOptions}
                placeholder=""
                value={operatorOptions.filter(
                  (option) => option.value === defaultSettings.operator
                )}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: "100%",
                    maxWidth: 275,
                  }),
                }}
                onChange={(newValue) => {
                  setDefaultSettings({
                    ...defaultSettings,
                    operator: newValue.value,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Order Filter */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Order Filter</h3>
          <Toggle title="Apply Order Filter?" name="applyOrderFilter" />
        </div>
        {defaultSettings.applyOrderFilter ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Order By:</label>
              <Select
                options={orderByOptions}
                placeholder=""
                value={orderByOptions.filter(
                  (option) => option.value === defaultSettings.postOrderBy
                )}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: "100%",
                    maxWidth: 275,
                  }),
                }}
                onChange={(newValue) => {
                  setDefaultSettings({
                    ...defaultSettings,
                    postOrderBy: newValue.value,
                  });
                }}
              />
            </div>

            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Order:</label>
              <Select
                options={orderOptions}
                placeholder=""
                value={orderOptions.filter(
                  (option) => option.value === defaultSettings.postOrder
                )}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: "100%",
                    maxWidth: 275,
                  }),
                }}
                onChange={(newValue) => {
                  setDefaultSettings({
                    ...defaultSettings,
                    postOrder: newValue.value,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Date Filter */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Date Filter</h3>
          <Toggle title="Apply Date Filter?" name="applyDateFilter" />
        </div>
        {defaultSettings.applyDateFilter ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Start Date:</label>
              <Flatpickr
                className="afx-input bg-white"
                value={defaultSettings.postStartDate}
                options={{
                  maxDate: "today",
                  dateFormat: "Y-m-d",
                }}
                onChange={(date) => {
                  setDefaultSettings({
                    ...defaultSettings,
                    postStartDate: date,
                  });
                }}
                placeholder="Start Date"
              />
            </div>

            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">End Date:</label>
              <Flatpickr
                className="afx-input bg-white"
                value={defaultSettings.postEndDate}
                options={{
                  maxDate: "today",
                  dateFormat: "Y-m-d",
                }}
                onChange={(date) => {
                  setDefaultSettings({
                    ...defaultSettings,
                    postEndDate: date,
                  });
                }}
                placeholder="End Date"
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Status Filter */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Status Filter</h3>
          <Toggle title="Apply Status Filter?" name="applyStatusFilter" />
        </div>
        {defaultSettings.applyStatusFilter ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Posts Status:</label>
              <Select
                options={postStatusOptions}
                placeholder="Publish"
                value={
                  Object.values(defaultSettings.postStatus).length > 0
                    ? defaultSettings.postStatus
                    : ""
                }
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    width: "100%",
                    maxWidth: 300,
                  }),
                }}
                onChange={(newValue) => {
                  setDefaultSettings({
                    ...defaultSettings,
                    postStatus: newValue,
                  });
                }}
                isMulti
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Author Filter */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Author Filter</h3>
          <Toggle title="Apply Author Filter?" name="applyAuthorFilter" />
        </div>
        {defaultSettings.applyAuthorFilter ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Author:</label>
              {Object.values(authors).length > 0 ? (
                <Select
                  options={authors}
                  placeholder="Author"
                  value={
                    Object.values(defaultSettings.authors).length > 0
                      ? defaultSettings.authors
                      : ""
                  }
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      width: "100%",
                      maxWidth: 300,
                    }),
                  }}
                  onChange={(newValue) => {
                    setDefaultSettings({
                      ...defaultSettings,
                      authors: newValue,
                    });
                  }}
                  isMulti
                />
              ) : (
                <SkeletonTheme baseColor="#CCC" highlightColor="#FFF">
                  <Skeleton style={{ padding: 15, width: 300 }} />
                </SkeletonTheme>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Search Filter */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Search Filter</h3>
          <Toggle title="Apply Search Filter?" name="applySearchFilter" />
        </div>
        {defaultSettings.applySearchFilter ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
            <Input title="Keyword" name="search" />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Posts Filter */}
      <div className="px-5 py-2">
        <div className="flex justify-between border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Posts Filter</h3>
          <Toggle title="Apply Posts Filter?" name="applyPostsFilter" />
        </div>
        {defaultSettings.applyPostsFilter ? (
          <>
            <br />
            <Alert
              text="Note: You cannot combine Post Include and Post Exclude in the
                same query. Whenever possible, avoid using Post Exclude for
                better performance."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
              <div className="afx-form-field flex-col !items-start">
                <label htmlFor="">Include Only:</label>
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
                      width: "100%",
                      maxWidth: 300,
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
                <label htmlFor="">Exclude:</label>
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
                      width: "100%",
                      maxWidth: 300,
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
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default GridQueryFilters;
