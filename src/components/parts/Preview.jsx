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
    padding: 20px;
  }

   .afx-ap-posts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.ap-post-single {
display: flex;
flex-direction: column;
gap: 10px;
box-shadow: 5px 5px 5px #CCC;
background-color: #FFF;
border-radius: 5px;
}

.ap-featured-img {
  border-top-left-radius: 5px;
      border-top-right-radius: 5px;
  }

  .ap-post-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  }

  ${cssStyles}

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
        <h2 className="ap-grid-title">Grid Title Here</h2>
        <div className="afx-ap-posts">
          {new Array(9).fill(0).map((val, key) => (
            <div className="ap-post-single" key={key}>
              <img
                decoding="async"
                src={demoPost.image}
                alt={demoPost.title}
                className="ap-featured-img"
              />
              <div className="ap-post-content">
                <p className="ap-cats ap-meta">
                  {demoPost.cats.map((cat, id) => (
                    <a href="#" key={id}>
                      {cat} {id + 1 != demoPost.cats.length ? " | " : ""}
                    </a>
                  ))}
                </p>
                <h3 className="ap-title">{demoPost.title}</h3>
                <p className="ap-excerpt">{demoPost.excerpt}</p>
                <a href="#" className="ap-btn">
                  {defaultSettings.postBtnText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;
