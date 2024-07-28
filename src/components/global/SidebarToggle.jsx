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
      data-tooltip-id="arifix-ap--tooltip"
      data-tooltip-content={showSidebar ? "Hide Sidebar" : "Show Sidebar"}
      data-tooltip-place="right"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>
  );
};

export default SidebarToggle;
