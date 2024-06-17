import React, { useContext } from "react";
import { shopContext } from "../../contexts/shopContext.jsx";

const ShopHeader = ({ loader, saveShop, error }) => {
  const { shopSettings, setShopSettings } = useContext(shopContext);

  return (
    <div className="flex justify-between items-center lg:pr-5">
      <h2 className="heading-primary flex justify-between items-center">
        <input
          type="text"
          className={`afx-ap-input lg:min-w-[300px] !bg-transparent !border-t-0 !border-l-0 !border-r-0 border-b-2 !rounded-none border-b-gray-400 text-xl ${
            error ? "afx-ap-input-error" : ""
          }`}
          placeholder="Shop Title Here..."
          value={shopSettings.shopTitle}
          onChange={(e) =>
            setShopSettings({ ...shopSettings, shopTitle: e.target.value })
          }
        />
        <i className="relative -left-5 dashicons-before dashicons-edit flex cursor-pointer"></i>
      </h2>
      <button
        type="button"
        className="action-button primary py-1"
        onClick={() => saveShop()}
      >
        <i className="dashicons-before dashicons-yes"></i> {loader}
      </button>
    </div>
  );
};

export default ShopHeader;
