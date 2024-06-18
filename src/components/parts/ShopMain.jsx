import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../../contexts/appContext.jsx";
import { shortcodeContext } from "../../contexts/shortcodeContext.jsx";
import Select from "react-select";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Input from "../elements/Input.jsx";

const ShopMain = () => {
  const [categories, setCategories] = useState({});

  const { shopSettings, setShopSettings, orderOptions } =
    useContext(shortcodeContext);

  const { baseUrl } = useContext(appContext);
  useEffect(() => {
    axios.get(baseUrl + "categories").then((res) => {
      if (res.data) {
        setCategories(res.data);
      }
    });
  }, []);

  return (
    <div>
      <div className="afx-form-field flex-col !items-start">
        <label htmlFor="">Grid Columns:</label>
        <div className="w-full flex flex-wrap gap-5">
          <label
            className="w-full max-w-60 cursor-pointer"
            htmlFor=""
            onClick={(e) =>
              setShopSettings({
                ...shopSettings,
                gridColumns: 2,
              })
            }
          >
            <input
              type="radio"
              className="peer sr-only"
              name="gridColumns"
              value="2"
              checked={shopSettings.gridColumns === 2}
            />
            <div className="w-full rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-indigo-500 peer-checked:ring-indigo-500 peer-checked:ring-offset-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <i className="dashicons-before dashicons-screenoptions"></i>
                  <div>
                    {shopSettings.gridColumns === 2 ? (
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <p>
                    <span className="font-bold text-lg">Two Column</span>
                  </p>
                </div>
              </div>
            </div>
          </label>
          <label
            className="w-full max-w-60 cursor-pointer"
            htmlFor=""
            onClick={(e) =>
              setShopSettings({
                ...shopSettings,
                gridColumns: 3,
              })
            }
          >
            <input
              type="radio"
              className="peer sr-only"
              name="gridColumns"
              value="3"
              checked={shopSettings.gridColumns === 3}
            />
            <div className="w-60 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-indigo-500 peer-checked:ring-indigo-500 peer-checked:ring-offset-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <i className="dashicons-before dashicons-screenoptions"></i>
                  <div>
                    {shopSettings.gridColumns === 3 ? (
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <p>
                    <span className="font-bold text-lg">Three Column</span>
                  </p>
                </div>
              </div>
            </div>
          </label>
          <label
            className="w-full max-w-60 cursor-pointer"
            htmlFor=""
            onClick={(e) =>
              setShopSettings({
                ...shopSettings,
                gridColumns: 4,
              })
            }
          >
            <input
              type="radio"
              className="peer sr-only"
              name="gridColumns"
              value="4"
              checked={shopSettings.gridColumns === 4}
            />
            <div className="w-60 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-indigo-500 peer-checked:ring-indigo-500 peer-checked:ring-offset-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <i className="dashicons-before dashicons-screenoptions"></i>
                  <div>
                    {shopSettings.gridColumns === 4 ? (
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <p>
                    <span className="font-bold text-lg">Four Column</span>
                  </p>
                </div>
              </div>
            </div>
          </label>
          <label
            className="w-full max-w-60 cursor-pointer"
            htmlFor=""
            onClick={(e) =>
              setShopSettings({
                ...shopSettings,
                gridColumns: 5,
              })
            }
          >
            <input
              type="radio"
              className="peer sr-only"
              name="gridColumns"
              value="5"
              checked={shopSettings.gridColumns === 5}
            />
            <div className="w-60 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-indigo-500 peer-checked:ring-indigo-500 peer-checked:ring-offset-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <i className="dashicons-before dashicons-screenoptions"></i>
                  <div>
                    {shopSettings.gridColumns === 5 ? (
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <p>
                    <span className="font-bold text-lg">Five Column</span>
                  </p>
                </div>
              </div>
            </div>
          </label>
          <label
            className="w-full max-w-60 cursor-pointer"
            htmlFor=""
            onClick={(e) =>
              setShopSettings({
                ...shopSettings,
                gridColumns: 6,
              })
            }
          >
            <input
              type="radio"
              className="peer sr-only"
              name="gridColumns"
              value="6"
              checked={shopSettings.gridColumns === 6}
            />
            <div className="w-60 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-indigo-500 peer-checked:ring-indigo-500 peer-checked:ring-offset-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <i className="dashicons-before dashicons-screenoptions"></i>
                  <div>
                    {shopSettings.gridColumns === 6 ? (
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <p>
                    <span className="font-bold text-lg">Six Column</span>
                  </p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10 mt-10">
        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">Categories:</label>
          {categories.length > 0 ? (
            <Select
              options={categories}
              placeholder="All Categories"
              value={
                shopSettings.categories.length > 0
                  ? shopSettings.categories
                  : ""
              }
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: 300,
                }),
              }}
              onChange={(newValue) => {
                setShopSettings({
                  ...shopSettings,
                  categories: newValue,
                });
              }}
              isMulti
            />
          ) : (
            <SkeletonTheme baseColor="#b9b9b9" highlightColor="#DDD">
              <Skeleton style={{ padding: 15, width: 300 }} />
            </SkeletonTheme>
          )}
        </div>
        <Input
          title="Posts Per Page"
          name="postsPerPage"
          type="number"
          settings={shopSettings}
          setSettings={setShopSettings}
        />
        <div className="afx-form-field flex-col !items-start">
          <label htmlFor="">Default Order:</label>
          <Select
            options={orderOptions}
            placeholder="Most Recent"
            value={orderOptions.filter(
              (option) => option.value === shopSettings.postsOrder
            )}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: 275,
                height: 42,
              }),
            }}
            onChange={(newValue) => {
              setShopSettings({ ...shopSettings, postsOrder: newValue.value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopMain;
