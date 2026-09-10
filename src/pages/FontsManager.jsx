import React, { useContext, useState, useRef, useEffect } from "react";
import { appContext } from "../contexts/appContext.jsx";
import Divider from "../components/global/Divider.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../components/global/Modal.jsx";
import { isValidUrl } from "../utils/const.js";

const FontsManager = () => {
  const fontUpload = useRef(null);
  const [fonts, setFonts] = useState({});
  const [fontUrl, setFontUrl] = useState("");
  const [loader, setLoader] = useState("Add Font");
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [error, setError] = useState(false);

  const { baseUrl, mediaUrl, setRefreshSettings, settings } =
    useContext(appContext);

  useEffect(() => {
    if (settings.fonts) {
      setFonts(settings.fonts);
    }
  }, [settings]);

  const uploadFont = () => {
    const toastId = toast.loading("Uploading Font...");
    var formData = new FormData();
    let file = fontUpload.current.files[0];
    formData.append("file", file);
    formData.append("title", file.name);

    axios
      .post(mediaUrl + "/?_wpnonce=" + afxApApp.nonce, formData, {
        headers: {
          "Content-Disposition": "form-data; filename='" + file.name + "'",
          "X-WP-NONCE": afxApApp.nonce,
        },
      })
      .then((res) => {
        const file_id = res.data.id;
        const font_url = res.data.source_url;

        axios
          .post(
            baseUrl + "settings" + "/?_wpnonce=" + afxApApp.nonce,
            {
              settings: JSON.stringify({
                fonts: { ...fonts, [file_id]: font_url },
              }),
            },
            {
              headers: {
                "content-type": "application/json",
                "X-WP-NONCE": afxApApp.nonce,
              },
            }
          )
          .then((res) => {
            setFonts({ ...fonts, [file_id]: font_url });

            fontUpload.current.value = "";
            toast.dismiss(toastId);
            toast.success("Font Uploaded Successfully");
            setRefreshSettings(true);
          });
      });
  };

  const addFont = () => {
    if (fontUrl == "") {
      setError(true);
    } else if (!isValidUrl(fontUrl)) {
      setFontUrl("");
      setError(true);
    } else {
      if (
        fontUrl.endsWith(".woff2") ||
        fontUrl.endsWith(".woff") ||
        fontUrl.endsWith(".ttf") ||
        fontUrl.endsWith(".otf")
      ) {
        setError(false);
        setLoader("Adding Font...");

        const file_id = Date.now();

        axios
          .post(
            baseUrl + "settings" + "/?_wpnonce=" + afxApApp.nonce,
            {
              settings: JSON.stringify({
                fonts: { ...fonts, [file_id]: fontUrl },
              }),
            },
            {
              headers: {
                "content-type": "application/json",
                "X-WP-NONCE": afxApApp.nonce,
              },
            }
          )
          .then((res) => {
            setFontUrl("");
            setLoader("Add Font");
            setFonts({ ...fonts, [file_id]: fontUrl });

            toast.success("Font Added Successfully");
            setRefreshSettings(true);
          });
      } else {
        setFontUrl("");
        setError(true);
      }
    }
  };

  const deleteFont = () => {
    const key = delId;
    const newFonts = Object.fromEntries(
      Object.entries(fonts).filter(([k]) => k != key)
    );

    axios
      .post(
        baseUrl + "settings" + "/?_wpnonce=" + afxApApp.nonce,
        {
          settings: JSON.stringify({
            fonts: newFonts,
          }),
        },
        {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": afxApApp.nonce,
          },
        }
      )
      .then((res) => {
        setFonts(newFonts);
        setRefreshSettings(true);
        setShowModal(false);

        if (delId.length < 13) {
          axios
            .post(
              mediaUrl + key + "/?force=1&_wpnonce=" + afxApApp.nonce,
              {},
              {
                headers: {
                  "content-type": "application/json",
                  "X-WP-NONCE": afxApApp.nonce,
                  "X-HTTP-Method-Override": "DELETE",
                },
              }
            )
            .then((res) => {
              setDelId(null);
              toast.success("Font Deleted Successfully");
            });
        } else {
          setDelId(null);
          toast.success("Font Deleted Successfully");
        }
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">Fonts Manager</h2>
      </div>

      <Divider />

      <div className="p-5">
        <h3 className="heading-secondary">Fonts Manager</h3>
        <form className="arifix-ap-form">
          <div className="flex flex-col w-full items-center bg-grey-lighter mb-5 bg-white rounded-lg shadow-lg p-10">
            <label className="w-full flex flex-col items-center px-4 py-10 text-primary tracking-wide uppercase cursor-pointer hover:bg-gray-100 hover:text-primary-500">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"></path>
              </svg>
              <span className="mt-2 text-base leading-normal">
                Click to Upload
              </span>
              <input
                type="file"
                ref={fontUpload}
                accept=".ttf, .otf, .woff, .woff2"
                required
                className="hidden"
                onChange={() => uploadFont()}
              />
            </label>

            <div className="flex items-center w-full">
              <span className="flex-grow bg-gray-100 h-0.5"></span>
              <span className="mx-3 text-lg font-medium">OR</span>
              <span className="flex-grow bg-gray-100 h-0.5"></span>
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5 mt-10">
              <input
                type="url"
                placeholder="Paste Font URL"
                className={`afx-input max-w-full lg:max-w-[75%] !rounded-2xl !pl-5 ${
                  error ? "afx-input-error" : ""
                }`}
                value={fontUrl}
                onChange={(e) => setFontUrl(e.target.value)}
              />
              <button
                type="button"
                className="action-button primary"
                onClick={() => addFont()}
              >
                <i className="dashicons-before dashicons-plus"></i> {loader}
              </button>
            </div>
          </div>
        </form>
        <p>&nbsp;</p>
        <h4 className="heading-sub">Custom Fonts</h4>
        <div className="overflow-x-auto">
          <table className="arifix-ap-table w-full">
            <thead className="bg-white border-b">
              <tr>
                <th
                  scope="col"
                  className="font-medium text-gray-900 px-6 py-4 text-left"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="font-medium text-gray-900 px-6 py-4 text-left"
                >
                  URL
                </th>
                <th
                  scope="col"
                  className="font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {fonts
                ? Object.keys(fonts).map((val, index) => {
                    const font_url_ar = fonts[val].split("/");
                    const font_name =
                      font_url_ar[font_url_ar.length - 1].split(".")[0];

                    return (
                      <tr
                        className={`${
                          index % 2 == 0 ? "bg-gray-100" : "bg-white"
                        } border-b`}
                        key={index}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {font_name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {fonts[val]}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            type="button"
                            className="action-button secondary"
                            onClick={() => {
                              setShowModal(true);
                              setDelId(val);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>

        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleClose={() => {
            setShowModal(false);
          }}
          handleAction={deleteFont}
        >
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Delete Font
            </h3>
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500">
                Are you sure to delete the selected font?
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default FontsManager;
