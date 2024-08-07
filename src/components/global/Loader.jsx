import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-slate-900 opacity-80 lg:flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-slate-200 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-white text-xl font-semibold">
        Getting Data...
      </h2>
    </div>
  );
};

export default Loader;
