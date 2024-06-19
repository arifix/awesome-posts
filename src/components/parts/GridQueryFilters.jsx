import React, { useContext, useEffect, useState, useMemo } from "react";
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
} from "../../utils/const.js";

const GridQueryFilters = () => {
  const {
    postTypes,
    taxonomies,
    terms,
    posts,
    defaultSettings,
    setDefaultSettings,
  } = useContext(gridContext);

  return (
    <>
      <h3 className="heading-secondary text-2xl pb-5">Query &amp; Filters</h3>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-5 py-2">
        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">Post Type:</label>
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
                  width: 300,
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

        <Input title="Limit" name="limit" type="number" />
        <Input title="Posts Per Page" name="postsPerPage" type="number" />
        <Input title="Offset" name="offset" type="number" />
      </div>

      {/* Taxnomy Filter */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-2xl pb-0">Taxonomy Filter</h3>
          <Toggle title="Apply Taxonomy Filter" name="applyTaxonomyFilter" />
        </div>
        {defaultSettings.applyTaxonomyFilter ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
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
                    width: 300,
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
              <label htmlFor="">Opearator:</label>
              <Select
                options={operatorOptions}
                placeholder="IN"
                value={operatorOptions.filter(
                  (option) => option.value === defaultSettings.operator
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
      <div className="px-5 py-2 mt-5">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-2xl pb-0">Order Filter</h3>
          <Toggle title="Apply Order Filter?" name="applyOrderFilter" />
        </div>
        {defaultSettings.applyOrderFilter ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Order By:</label>
              <Select
                options={orderByOptions}
                placeholder="ID"
                value={orderByOptions.filter(
                  (option) => option.value === defaultSettings.postsOrderBy
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
                    postsOrderBy: newValue.value,
                  });
                }}
              />
            </div>

            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Order:</label>
              <Select
                options={orderOptions}
                placeholder="Descending"
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
        ) : (
          ""
        )}
      </div>

      {/* Date Filter */}
      <div className="px-5 py-2 mt-5">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-2xl pb-0">Date Filter</h3>
          <Toggle title="Apply Date Filter?" name="applyDateFilter" />
        </div>
        {defaultSettings.applyDateFilter ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
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
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Posts Filter */}
      <div className="px-5 py-2 mt-5">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-2xl pb-0">Posts Filter</h3>
          <Toggle title="Apply Posts Filter?" name="applyPostsFilter" />
        </div>
        {defaultSettings.applyPostsFilter ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
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
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Status Filter */}
      <div className="px-5 py-2 mt-5">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-2xl pb-0">Status Filter</h3>
          <Toggle title="Apply Status Filter?" name="applyStatusFilter" />
        </div>
        {defaultSettings.applyStatusFilter ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
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
                    width: 300,
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

      {/* Search Filter */}
      <div className="px-5 py-2 mt-5">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-2xl pb-0">Search Filter</h3>
          <Toggle title="Apply Search Filter?" name="applySearchFilter" />
        </div>
        {defaultSettings.applySearchFilter ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
            <Input title="Keyword" name="keyword" />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default GridQueryFilters;
