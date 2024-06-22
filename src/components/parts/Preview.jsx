import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Preview = ({ defaultSettings, cssStyles }) => {
  const demoPost = {
    title: "Improve your customer experience",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    image: "https://images.unsplash.com/photo-1547586696-ea22b4d4235d",
    cats: ["Video", "Travel", "Place"],
  };

  let styles = `<style>
    .afx-ap-wrapper {
      width: 100%;
      max-width: 100%;
      background-color: ${defaultSettings.gridBgColor};
      padding: ${defaultSettings.gridPadding.top}px ${defaultSettings.gridPadding.right}px ${defaultSettings.gridPadding.bottom}px ${defaultSettings.gridPadding.left}px;
      margin: ${defaultSettings.gridMargin.top}px ${defaultSettings.gridMargin.right}px ${defaultSettings.gridMargin.bottom}px ${defaultSettings.gridMargin.left}px;
    }

    .afx-ap-posts {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: ${defaultSettings.gridGap}px;
      margin-top: 15px;
    }

    .ap-post-single {
      display: flex;
      flex-direction: column;
      box-shadow: 5px 5px 5px #CCC;
      background-color: #FFF;
      border-radius: 5px;
    }

    .ap-featured-img {
      width: 100%;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      height: 250px;
      object-fit: cover;
    }

    .ap-post-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 15px;
    }

    ${cssStyles}

    .ap-image-cover {
      position: relative;
    }

    .ap-date {
      position: absolute;
      top: 12px;
      right: 12px;
      border-radius: 50%;
      height: 70px;
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      padding: 15px;
      text-align: center;
      line-height: 20px;
      background-color: ${defaultSettings.btnBgColor};
      color: ${defaultSettings.btnColor};
    }

    .ap-post-meta {
      background-color: #f3f4f6;
      display: flex;
      justify-content: space-between;
      padding: 15px;
    }

    .ap-post-meta svg {
      height: 25px; 
    }

    .ap-post-meta a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }

    .ap-btn {
      margin-top: 10px;
    }

    .afx-ap-posts {
      grid-template-columns: repeat(${defaultSettings.gridColumnsD}, 1fr);
    }

    @media screen and (max-width: 991px) {
      .afx-ap-posts {
        grid-template-columns: repeat(${defaultSettings.gridColumnsT}, 1fr);
      }
    }

    @media screen and (max-width: 767px) {
      .afx-ap-posts {
        grid-template-columns: repeat(${defaultSettings.gridColumnsM}, 1fr);
      }
    }
  </style>`;

  return (
    <div className="shortcode-preview">
      <div dangerouslySetInnerHTML={{ __html: styles }}></div>

      <div className="afx-ap-wrapper">
        {defaultSettings.displaySCHeading && (
          <h2 className="ap-grid-title">{defaultSettings.gridTitle}</h2>
        )}

        <div className="afx-ap-posts">
          {new Array(9).fill(0).map((val, key) => (
            <div className="ap-post-single" key={key}>
              {defaultSettings.displayPostImage && (
                <div className="ap-image-cover">
                  <img
                    decoding="async"
                    src={demoPost.image}
                    alt={demoPost.title}
                    className="ap-featured-img"
                  />
                  {defaultSettings.postMetaDisDate && (
                    <div className="ap-date">20 March</div>
                  )}
                </div>
              )}
              <div className="ap-post-meta">
                {defaultSettings.postMetaDisAuthor && (
                  <a href="#">
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z" />
                    </svg>
                    <span className="ap-meta">Admin</span>
                  </a>
                )}
                {defaultSettings.postMetaDisCC && (
                  <a href="#">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      ></path>
                    </svg>
                    <span className="ap-meta">10 Comments</span>
                  </a>
                )}
              </div>
              <div className="ap-post-content">
                {defaultSettings.displayPostCategory && (
                  <p className="ap-cats ap-meta">
                    {demoPost.cats.map((cat, id) => (
                      <a href="#" key={id}>
                        {cat}{" "}
                        {id + 1 != demoPost.cats.length
                          ? ` ${defaultSettings.postCatSeparator} `
                          : ""}
                      </a>
                    ))}
                  </p>
                )}
                {defaultSettings.displayPostTitle && (
                  <a href="#">
                    <h3 className="ap-title">{demoPost.title}</h3>
                  </a>
                )}
                {defaultSettings.displayPostExcerpt && (
                  <p className="ap-excerpt">{demoPost.excerpt}</p>
                )}
                {defaultSettings.displayReadBtn && (
                  <a href="#" className="ap-btn">
                    {defaultSettings.postBtnText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;
