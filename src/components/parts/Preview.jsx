import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fontsUrlToName } from "../../utils/const.js";

const Preview = ({ defaultSettings }) => {
  const demoPost = {
    title: "Test Product",
    des: "This is a simple product",
    price: 10.99,
    image:
      "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
  };

  let styles = `<style>
    .product-grid {
      grid-template-columns: repeat(${defaultSettings.gridColumns}, 1fr);
    }
  </style>`;

  return (
    <div className="shortcode-preview">
      <div dangerouslySetInnerHTML={{ __html: styles }}></div>
      <div className="product-grid">
        {new Array(9).fill(0).map((val, key) => (
          <div className="product" key={key}>
            <img decoding="async" src={demoPost.image} alt={demoPost.title} />
            <h2>{demoPost.title}</h2>
            <p>{demoPost.des}</p>
            <p className="price">${demoPost.price}</p>
            <a href="#" target="_blank">
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
