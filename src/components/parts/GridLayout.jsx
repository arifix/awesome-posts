import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext.jsx";
import Toggle from "../elements/Toggle.jsx";
import Select from "react-select";
import {
  tagOptions,
  separatorOptions,
  excerptOptions,
  mediaOptions,
} from "../../utils/const.js";
import Input from "../elements/Input";

const GridLayout = () => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <>
      <h3 className="heading-secondary text-2xl pb-5">Layouts</h3>

      {/* Shortcode Heading */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Shortcode Heading</h3>
          <Toggle title="Display Shortcode Heading?" name="displaySCHeading" />
        </div>
        {defaultSettings.displaySCHeading ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Tag:</label>
              <Select
                options={tagOptions}
                placeholder="H2"
                value={tagOptions.filter(
                  (option) => option.value === defaultSettings.scHeadingTag
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
                    scHeadingTag: newValue.value,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Post Title */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Post Title</h3>
          <Toggle title="Display Post Title?" name="displayPostTitle" />
        </div>
        {defaultSettings.displayPostTitle ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Tag:</label>
              <Select
                options={tagOptions}
                placeholder="H3"
                value={tagOptions.filter(
                  (option) => option.value === defaultSettings.postTitleTag
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
                    postTitleTag: newValue.value,
                  });
                }}
              />
            </div>

            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Title Type:</label>
              <Select
                options={excerptOptions}
                placeholder=""
                value={excerptOptions.filter(
                  (option) => option.value === defaultSettings.postTitleType
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
                    postTitleType: newValue.value,
                  });
                }}
              />
            </div>

            <Input
              title="Title Limit"
              type="number"
              name="postTitleLimit"
              tooltip="Leave to display full title"
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Post Category */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Post Category</h3>
          <Toggle title="Display Post Category?" name="displayPostCategory" />
        </div>
        {defaultSettings.displayPostCategory ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Separator:</label>
              <Select
                options={separatorOptions}
                placeholder="|"
                value={separatorOptions.filter(
                  (option) => option.value === defaultSettings.postCatSeparator
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
                    postCatSeparator: newValue.value,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Post Excerpt */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Post Excerpt</h3>
          <Toggle title="Display Post Excerpt?" name="displayPostExcerpt" />
        </div>
        {defaultSettings.displayPostExcerpt ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Excerpt Type:</label>
              <Select
                options={excerptOptions}
                placeholder="Character"
                value={excerptOptions.filter(
                  (option) => option.value === defaultSettings.postExcerptType
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
                    postExcerptType: newValue.value,
                  });
                }}
              />
            </div>

            <Input
              title="Excerpt Limit"
              type="number"
              name="postExcerptLimit"
              tooltip="Leave to display full title"
            />
            <Input title="More Text" name="postExcerptText" placeholder="..." />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Post Meta */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Post Meta</h3>
          <Toggle title="Display Post Meta?" name="displayPostMeta" />
        </div>
        {defaultSettings.displayPostMeta ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5 max-w-4xl">
            <Toggle title="Display Date?" name="postMetaDisDate" />
            <Toggle title="Display Author?" name="postMetaDisAuthor" />
            <Toggle title="Display Comemnt Count?" name="postMetaDisCC" />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Post Image */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">
            Post Featured Image
          </h3>
          <Toggle
            title="Display Post Featured Image?"
            name="displayPostImage"
          />
        </div>
        {defaultSettings.displayPostImage ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
            <div className="afx-form-field flex-col !items-start">
              <label htmlFor="">Image Size:</label>
              <Select
                options={mediaOptions}
                placeholder=""
                value={mediaOptions.filter(
                  (option) => option.value === defaultSettings.postImageSize
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
                    postImageSize: newValue.value,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Post Button */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Post Button</h3>
          <Toggle title="Display Read More Button?" name="displayReadBtn" />
        </div>
        {defaultSettings.displayReadBtn ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
            <Input title="Button Text" name="postBtnText" />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Load More Button */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Load More Button</h3>
          <Toggle title="Display Load More Button?" name="loadMoreBtn" />
        </div>
        {defaultSettings.loadMoreBtn ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5">
            <Input title="Button Text" name="loadMoreBtnText" />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default GridLayout;
