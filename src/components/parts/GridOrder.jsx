import React, { useRef, useContext } from "react";
import { gridContext } from "../../contexts/gridContext.jsx";

const GridOrder = () => {
  const { defaultSettings, setDefaultSettings } = useContext(gridContext);

  const draggingItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    const elementsCopy = [...defaultSettings.elementsOrder];
    const draggingItemContent = elementsCopy[draggingItem.current];
    elementsCopy.splice(draggingItem.current, 1);
    elementsCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setDefaultSettings({ ...defaultSettings, elementsOrder: elementsCopy });
  };

  return (
    <>
      <h3 className="heading-secondary text-2xl pb-5">Elements Order</h3>

      <div className="flex items-center bg-ap-secondary px-6 py-4 rounded-md text-lg max-w-xl">
        <svg
          viewBox="0 0 24 24"
          className="text-white w-5 h-5 mr-3"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
          ></path>
        </svg>
        <span className="text-white">
          You have the option to drag and drop items vertically below.
        </span>
      </div>

      <div className="flex flex-col gap-1 m-5">
        {defaultSettings.elementsOrder &&
          defaultSettings.elementsOrder.map((item, index) => (
            <div
              className="bg-slate-700 text-white rounded-md p-5 max-w-sm cursor-move"
              key={index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => handleDragEnter(e, index)}
              draggable
            >
              {item.replaceAll("_", " ").toUpperCase()}
            </div>
          ))}
      </div>
    </>
  );
};

export default GridOrder;
