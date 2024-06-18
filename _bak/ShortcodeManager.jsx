import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../contexts/appContext.jsx";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import Modal from "../components/global/Modal.jsx";
import { insertUrlParam } from "../utils/const.js";
import Divider from "../components/global/Divider.jsx";

const ShortcodeManager = () => {
  const { activeTab, setActiveTab, settings } = useContext(appContext);
  const [loading, setLoading] = useState(true);
  const [shops, setShops] = useState([]);
  const [delId, setDelId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { baseUrl, refreshSettings, setRefreshSettings } =
    useContext(appContext);

  useEffect(() => {
    if (activeTab == "shortcode-manager") {
      axios.get(baseUrl + "shortcode/all").then((res) => {
        if (res.data) {
          setShops(res.data);
          setLoading(false);
        }
      });
      setRefreshSettings(false);
    }
  }, [refreshSettings, activeTab]);

  const deleteShop = () => {
    axios
      .post(
        baseUrl + "shop/delete",
        {
          del_id: delId,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": afxApApp.nonce,
          },
        }
      )
      .then((res) => {
        setDelId(null);
        setShowModal(false);

        const filteredShops = shops.filter((item) => item.id !== delId);
        setShops(filteredShops);

        toast.success(res.data.message);
      });
  };

  return (
    <div
      className={`afx-ap-shortcode-manager ${
        activeTab != "shortcode-manager" ? "hidden" : ""
      }`}
    >
      {loading ? (
        <SkeletonTheme baseColor="#CCC" highlightColor="#DDD">
          <p>
            <Skeleton
              count={8}
              style={{ height: 100, padding: 10, margin: "20px 10px" }}
            />
          </p>
        </SkeletonTheme>
      ) : (
        <>
          <div className="flex justify-between items-center pr-5">
            <h2 className="heading-primary">Shortcodes</h2>
            <button
              type="button"
              className="action-button primary"
              onClick={() => {
                setActiveTab("shortcode-new");
                insertUrlParam("tab", "shortcode-new");
              }}
            >
              <i className="dashicons-before dashicons-plus"></i> New Shortcode
            </button>
          </div>

          <Divider />

          <div className="afx-ap-shortcodes">
            {shops.map((s, key) => (
              <div className="afx-ap-single-shortcode" key={key}>
                <h4
                  onClick={() => {
                    setActiveTab("shortcode-new");
                    insertUrlParam("tab", "shortcode-new");
                    insertUrlParam("shortcode_id", s.id);
                  }}
                >
                  {s.title}
                </h4>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("shortcode-new");
                      insertUrlParam("tab", "shortcode-new");
                      insertUrlParam("shortcode_id", s.id);
                    }}
                    data-tooltip-id="afx-ap-tooltip"
                    data-tooltip-content="Edit Shortcode"
                  >
                    <i className="dashicons-before dashicons-edit hover:text-ap-primary"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `[awesome-posts id="${s.id}"]`
                      );
                      toast.success("Shortcode Copied Successfully");
                    }}
                    data-tooltip-id="afx-ap-tooltip"
                    data-tooltip-content="Copy Shortcode"
                  >
                    <i className="dashicons-before dashicons-shortcode hover:text-ap-primary"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDelId(s.id);
                      setShowModal(true);
                    }}
                    data-tooltip-id="afx-ap-tooltip"
                    data-tooltip-content="Delete Shop"
                  >
                    <i className="dashicons-before dashicons-trash hover:text-ap-primary"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleClose={() => {
          setShowModal(false);
        }}
        handleAction={deleteShop}
      >
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete Shop
          </h3>
          <div className="mt-2">
            <p className="text-sm leading-5 text-gray-500">
              Are you sure to delete selected shop?
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShortcodeManager;
