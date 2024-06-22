import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../contexts/appContext.jsx";
import Divider from "../components/global/Divider.jsx";
import Modal from "../components/global/Modal.jsx";
import { insertUrlParam } from "../utils/const.js";
import axios from "axios";
import toast from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GridManager = () => {
  const [loading, setLoading] = useState(true);
  const [grids, setGrids] = useState([]);
  const [delId, setDelId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    baseUrl,
    activeTab,
    setActiveTab,
    refreshSettings,
    setRefreshSettings,
  } = useContext(appContext);

  useEffect(() => {
    if (activeTab == "grid-manager") {
      axios.get(baseUrl + "grid/all").then((res) => {
        if (res.data) {
          setGrids(res.data);
          setLoading(false);
        }
      });
      setRefreshSettings(false);
    }
  }, [refreshSettings, activeTab]);

  const deleteGrid = () => {
    axios
      .post(
        baseUrl + "grid/delete",
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

        const filteredGrids = grids.filter((item) => item.id !== delId);
        setGrids(filteredGrids);

        toast.success(res.data.message);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">My Grids</h2>
      </div>

      <Divider />

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
        <div className="afx-ap-grids">
          {grids.map((s, key) => (
            <div className="afx-ap-single-grid" key={key}>
              <h4
                onClick={() => {
                  setActiveTab("grid-new");
                  insertUrlParam("tab", "grid-new");
                  insertUrlParam("grid_id", s.id);
                }}
              >
                {s.title}
              </h4>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("grid-new");
                    insertUrlParam("tab", "grid-new");
                    insertUrlParam("grid_id", s.id);
                  }}
                  data-tooltip-id="afx-ap-tooltip"
                  data-tooltip-content="Edit Grid"
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
                  data-tooltip-content="Delete Grid"
                >
                  <i className="dashicons-before dashicons-trash hover:text-ap-primary"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleClose={() => {
          setShowModal(false);
        }}
        handleAction={deleteGrid}
      >
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete Grid
          </h3>
          <div className="mt-2">
            <p className="text-sm leading-5 text-gray-500">
              Are you sure to delete selected grid?
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GridManager;
