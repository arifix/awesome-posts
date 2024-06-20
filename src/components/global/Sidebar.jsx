import React, { useContext } from "react";
import { appContext } from "../../contexts/appContext.jsx";
import NavSidebar from "./NavSidebar.jsx";
import icon from "../../assets/icon.png";

const Sidebar = () => {
  const { showSidebar } = useContext(appContext);

  return (
    <aside
      className={`sidebar w-1/6 min-h-screen p-3 lg:p-5 lg:pt-6 border-r-[1px] border-r-gray-300 ${
        !showSidebar ? "hidden" : ""
      }`}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
        }}
        title="Awesome Posts"
        className="flex flex-col mt-5 lg:mt-0"
      >
        <img src={icon} alt="Awesome Posts" className="w-14" />
        <span className="uppercase font-bold tracking-widest lg:tracking-[5px] mt-2 text-lg hidden md:block">
          Awesome Posts
        </span>
      </a>

      <NavSidebar />
    </aside>
  );
};

export default Sidebar;
