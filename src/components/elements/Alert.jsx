import React from "react";

const Alert = ({ text }) => {
  return (
    <div className="flex items-center bg-blue-500 px-4 py-2 rounded-md text-lg max-w-7xl">
      <svg viewBox="0 0 24 24" className="text-white w-5 h-5 mr-3">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
        ></path>
      </svg>
      <span className="text-white">{text}</span>
    </div>
  );
};

export default Alert;
