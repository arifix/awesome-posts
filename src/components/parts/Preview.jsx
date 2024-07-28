import React from "react";
import placeholder from "../../assets/placeholder.png";

const Preview = ({ defaultSettings, cssStyles }) => {
  const demoPost = {
    title: "Improve your customer experience",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    image: placeholder,
    cats: ["Video", "Travel", "Place"],
  };

  let styles = `<style>
    .afx-ap-wrapper {
      width: 100% !important;
      max-width: 100% !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    .afx-ap-wrapper a {
      text-decoration: none;
    }

    .afx-ap-wrapper .afx-ap-posts {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-top: 15px;
    }

    .afx-ap-wrapper .ap-post-single {
      display: flex;
      flex-direction: column;
      box-shadow: 5px 5px 5px #ccc;
      background-color: #fff;
      border-radius: 5px;
    }

    .afx-ap-wrapper .ap-featured-img {
      width: 100%;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      height: 250px;
      object-fit: cover;
    }

    .afx-ap-wrapper .ap-post-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 15px;
    }

    .afx-ap-wrapper .ap-image-cover {
      position: relative;
    }

    .afx-ap-wrapper .ap-date {
      position: absolute;
      top: 12px;
      right: 12px;
      border-radius: 50%;
      height: 75px;
      width: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      padding: 10px;
      text-align: center;
      line-height: 20px;
    }

    .afx-ap-wrapper .ap-post-meta {
      background-color: #f3f4f6;
      display: flex;
      justify-content: space-between;
      padding: 15px;
    }

    .afx-ap-wrapper .ap-post-meta svg {
      height: 25px;
    }

    .afx-ap-wrapper .ap-post-meta a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }

    .afx-ap-wrapper .ap-btn {
      margin-left: auto !important;
      margin-right: auto !important;
    }

    .afx-ap-wrapper.afx-ap-grid-style2 .ap-post-single {
      background-color: transparent;
      position: relative;
      box-shadow: none;
    }

    .afx-ap-wrapper.afx-ap-grid-style2 .ap-featured-img {
      filter: brightness(0.75);
      border-radius: 10px;
    }

    .afx-ap-wrapper.afx-ap-grid-style2 .ap-date {
      background-color: transparent !important;
      height: auto;
      width: auto;
      padding: 0;
      top: 15px;
      right: 15px;
    }

    .afx-ap-wrapper.afx-ap-grid-style2 .ap-post-content {
      position: absolute;
      bottom: 10px;
      left: 10px;
    }

    .afx-ap-wrapper.afx-ap-grid-style2 .ap-post-meta {
      padding: 0;
      background-color: transparent;
      margin-bottom: 10px;
      gap: 15px;
      position: absolute;
      top: 15px;
      left: 15px;
    }

    .afx-ap-wrapper.afx-ap-grid-style2 .ap-btn,
    .afx-ap-wrapper.afx-ap-grid-style3 .ap-btn {
      background-color: transparent !important;
      margin: 10px 0 0 !important;
      padding: 0 !important;
      text-align: left !important;
      display: flex;
      align-items: center;
      gap: 5px;
      width: max-content;
    }

    .afx-ap-wrapper.afx-ap-grid-style3 .ap-post-single {
      background-color: #fff;
      box-shadow: none;
      border-radius: 0;
    }

    .afx-ap-wrapper.afx-ap-grid-style3 .ap-post-content {
      padding: 25px;
    }

    .afx-ap-wrapper.afx-ap-grid-style3 .ap-featured-img {
      border-radius: 0;
    }

    .afx-ap-wrapper.afx-ap-grid-style3 .ap-cats {
      margin-top: 20px;
    }

    .afx-ap-wrapper.afx-ap-grid-style3 .ap-post-meta {
      background-color: transparent;
      padding: 10px 0;
      justify-content: start;
      gap: 15px;
    }

    .afx-ap-wrapper.afx-ap-grid-style3 .ap-post-meta a.ap-meta {
      margin-left: auto;
    }

    .afx-ap-wrapper.afx-ap-grid-style3 .ap-date {
      position: initial;
      background-color: transparent;
      width: auto;
      height: auto;
    }

    @media screen and (max-width: 767px) {
      .afx-ap-wrapper .ap-date {
        width: 70px;
        height: 70px;
        font-size: 14px;
        top: 5px;
        right: 5px;
      }
    }

    .ap-more-btn {
      width: 200px;
      background-color: #0da8e9;
      color: #ffffff;
      font-size: 18px;
      padding: 15px 25px;
      border: 0;
      margin: 25px auto 0 !important;
      cursor: pointer;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 30px;
    }

    .ap-more-btn:hover {
      background-color: #745ff1;
    }

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
      height: ${defaultSettings.postImageHeight}px;
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

      <div
        className={`afx-ap-wrapper afx-ap-grid-${defaultSettings.gridStyle}`}
      >
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
                    <span className="ap-meta">10</span>
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

        {defaultSettings.loadMoreBtn && (
          <p style={{ textAlign: "center", marginTop: 10 }}>
            <button type="button" className="ap-more-btn">
              {defaultSettings.loadMoreBtnText}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Preview;
