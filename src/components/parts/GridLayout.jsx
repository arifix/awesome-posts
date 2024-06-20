import React, { useContext } from "react";
import { gridContext } from "../../contexts/gridContext.jsx";
import Toggle from "../elements/Toggle.jsx";

const GridLayout = () => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  return (
    <>
      <h3 className="heading-secondary text-2xl pb-5">Layouts</h3>

      {/* Shortcode Heading */}
      <div className="px-5 py-2">
        <div className="flex justify-between max-w-[1450px] border-b-2 border-b-gray-300">
          <h3 className="heading-secondary text-xl pb-0">Shortcode Heading</h3>
          <Toggle
            title="Display Shortcode Heading?"
            name="displayShortcodeHeading"
          />
        </div>
        {defaultSettings.displayShortcodeHeading ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5"></div>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5"></div>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5"></div>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5"></div>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5"></div>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5"></div>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-5"></div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default GridLayout;
