import React, { useContext } from "react";
import { appContext } from "../../contexts/appContext.jsx";

const SidebarToggle = () => {
  const { showSidebar, setShowSidebar } = useContext(appContext);

  return (
    <div
      className="absolute top-7 ml-5 hover:cursor-pointer"
      onClick={() => {
        setShowSidebar(!showSidebar);
      }}
      data-tooltip-id="tss-tooltip"
      data-tooltip-content="Show/Hide Sidebar"
      data-tooltip-place="right"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>
  );
};

export default SidebarToggle;
