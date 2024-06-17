import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../../contexts/appContext.jsx";
import { insertUrlParam, removeUrlParam } from "../../utils/const.js";

const NavSidebar = () => {
  const [activation, setActivation] = useState("");
  const {
    activeTab,
    setActiveTab,
    settings,
    shopSettings,
    setShopSettings,
    initialSettings,
    setShopId,
  } = useContext(appContext);

  useEffect(() => {
    setActivation(settings.activation);
  }, [settings]);

  return (
    <>
      <nav className="navigation mt-2 text-center lg:text-left min-h-screen">
        <ul className="menu">
          {activation && new Date() < new Date(activation?.expiry_date) ? (
            <>
              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    setActiveTab("shop-default");
                    insertUrlParam("tab", "shop-default");
                    removeUrlParam("shop_id");
                    setShopSettings({ ...initialSettings });
                    setShopId(null);
                  }}
                  className={`${activeTab == "shop-default" ? "active" : ""}`}
                >
                  <i className="dashicons-before dashicons-store"></i>
                  <span>Default Shop</span>
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    setActiveTab("shop-manager");
                    insertUrlParam("tab", "shop-manager");
                    removeUrlParam("shop_id");
                    setShopSettings({ ...initialSettings });
                    setShopId(null);
                  }}
                  className={`${
                    activeTab == "shop-manager" || activeTab == "shop-new"
                      ? "active"
                      : ""
                  }`}
                >
                  <i className="dashicons-before dashicons-buddicons-topics"></i>
                  <span>Shop Designer</span>
                </a>
                <ul className="sub-menu">
                  <li>
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        setActiveTab("shop-manager");
                        insertUrlParam("tab", "shop-manager");
                        removeUrlParam("shop_id");
                        setShopSettings({ ...shopSettings });
                        setShopId(null);
                      }}
                      className={`${
                        activeTab == "shop-manager" ? "active" : ""
                      }`}
                    >
                      <i className="dashicons-before dashicons-screenoptions"></i>
                      <span>My Shops</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        setActiveTab("shop-new");
                        insertUrlParam("tab", "shop-new");
                        removeUrlParam("shop_id");
                        setShopSettings({ ...initialSettings });
                        setShopId(null);
                      }}
                      className={`${activeTab == "shop-new" ? "active" : ""}`}
                    >
                      <i className="dashicons-before dashicons-insert"></i>
                      <span>New Shop</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="hidden lg:block">&nbsp;</li>
              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    setActiveTab("product");
                    insertUrlParam("tab", "product");
                    removeUrlParam("shop_id");
                    setShopSettings({ ...initialSettings });
                    setShopId(null);
                  }}
                  className={`${activeTab == "product" ? "active" : ""}`}
                >
                  <i className="dashicons-before dashicons-schedule"></i>
                  <span>Product Page</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="">
                  <i className="dashicons-before dashicons-cart"></i>
                  <span>Cart &amp; Checkout</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="">
                  <i className="dashicons-before dashicons-admin-users"></i>
                  <span>My Account Page</span>
                </a>
              </li>
            </>
          ) : (
            ""
          )}
          <li className="mt-20">
            <a
              href="javascript:void(0);"
              onClick={() => {
                setActiveTab("settings");
                insertUrlParam("tab", "settings");
                removeUrlParam("shop_id");
                setShopSettings({ ...initialSettings });
                setShopId(null);
              }}
              className={`${activeTab == "settings" ? "active" : ""}`}
            >
              <i className="dashicons-before dashicons-admin-settings"></i>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavSidebar;
