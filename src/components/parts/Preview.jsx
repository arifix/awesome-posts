import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fontsUrlToName } from "../../utils/const.js";

const Preview = ({ shopSettings, websiteProducts }) => {
  const [demoProducts, setDemoProducts] = useState([
    {
      title: "Test Product",
      short_des: "This is a simple product",
      price: 10.99,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
    },
    {
      title: "Test Product 2",
      short_des: "This is a simple product",
      price: 50,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
    },
    {
      title: "Test Product 3",
      short_des: "This is a simple product",
      price: 12.99,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
    },
    {
      title: "Test Product 4",
      short_des: "This is a simple product",
      price: 20,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
    },
    {
      title: "Test Product 5",
      short_des: "This is a simple product",
      price: 45,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
    },
    {
      title: "Test Product 6",
      short_des: "This is a simple product",
      price: 100,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
    },
    {
      title: "Test Product 4",
      short_des: "This is a simple product",
      price: 20,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
    },
    {
      title: "Test Product 5",
      short_des: "This is a simple product",
      price: 45,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
    },
    {
      title: "Test Product 6",
      short_des: "This is a simple product",
      price: 100,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081",
    },
  ]);

  let styles = `<style>`;
  styles += `.product-grid {grid-template-columns: repeat(${shopSettings.gridColumns}, 1fr);}`;
  if (shopSettings.productTitleFont) {
    const font = shopSettings.productTitleFont.includes("http")
      ? fontsUrlToName(shopSettings.productTitleFont)
      : shopSettings.productTitleFont;
    const font_url = shopSettings.productTitleFont.includes("http")
      ? shopSettings.productTitleFont
      : `https://fonts.googleapis.com/css?family=${shopSettings.productTitleFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.product-grid .product h2{font-family: '${font}';}`;
  }
  if (shopSettings.productDesFont) {
    const font = shopSettings.productDesFont.includes("http")
      ? fontsUrlToName(shopSettings.productDesFont)
      : shopSettings.productDesFont;
    const font_url = shopSettings.productDesFont.includes("http")
      ? shopSettings.productDesFont
      : `https://fonts.googleapis.com/css?family=${shopSettings.productDesFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.product-grid .product p:not(.price){font-family: '${font}';}`;
  }
  if (shopSettings.productPriceFont) {
    const font = shopSettings.productPriceFont.includes("http")
      ? fontsUrlToName(shopSettings.productPriceFont)
      : shopSettings.productPriceFont;
    const font_url = shopSettings.productPriceFont.includes("http")
      ? shopSettings.productPriceFont
      : `https://fonts.googleapis.com/css?family=${shopSettings.productPriceFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.product-grid .product .price{font-family: '${font}';}`;
  }
  if (shopSettings.productButtonFont) {
    const font = shopSettings.productButtonFont.includes("http")
      ? fontsUrlToName(shopSettings.productButtonFont)
      : shopSettings.productButtonFont;
    const font_url = shopSettings.productButtonFont.includes("http")
      ? shopSettings.productButtonFont
      : `https://fonts.googleapis.com/css?family=${shopSettings.productButtonFont
          .split(" ")
          .join("+")}&display=swap`;
    styles += `@font-face {font-family: '${font}';src: url("${font_url}");}.product-grid .product a{font-family: '${font}';}`;
  }

  styles += `.product-grid .product h2 {display: ${
    shopSettings.showProductTitle ? "block" : "none"
  }; font-size: ${shopSettings.productTitleSize}px; color: ${
    shopSettings.productTitleColor
  }; text-align: ${shopSettings.productTitleAlignment}}`;
  styles += `.product-grid .product p:not(.price) {display: ${
    shopSettings.showProductDes ? "block" : "none"
  };font-size: ${shopSettings.productDesSize}px; color: ${
    shopSettings.productDesColor
  }; text-align: ${shopSettings.productDesAlignment}}`;
  styles += `.product-grid .product .price {display: ${
    shopSettings.showProductPrice ? "block" : "none"
  };font-size: ${shopSettings.productPriceSize}px; color: ${
    shopSettings.productPriceColor
  }; text-align: ${shopSettings.productPriceAlignment}}`;
  styles += `.product-grid .product a {display: ${
    shopSettings.showProductButton ? "block" : "none"
  };background-color: ${shopSettings.productButtonBgColor}; font-size: ${
    shopSettings.productButtonSize
  }px; color: ${shopSettings.productButtonColor}; text-align: ${
    shopSettings.productButtonAlignment
  }}`;
  styles += `</style>`;

  return (
    <div className="shortcode-preview">
      <div dangerouslySetInnerHTML={{ __html: styles }}></div>
      <div className="product-grid">
        {websiteProducts.length > 0 ? (
          websiteProducts.slice(0, shopSettings.postsPerPage).map((pro) => (
            <div className="product">
              <img
                decoding="async"
                src={
                  pro.image ||
                  "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081"
                }
                alt={pro.title}
              />
              <h2>{pro.title}</h2>
              <p>
                {pro.short_des.length > 150
                  ? pro.short_des.substring(0, 150) + "..."
                  : pro.short_des}
              </p>
              <p className="price">${pro.price}</p>
              <a href={pro.url} target="_blank">
                {shopSettings.productButtonText}
              </a>
            </div>
          ))
        ) : (
          <SkeletonTheme baseColor="#CCC" highlightColor="#DDD">
            <Skeleton
              count={2}
              style={{ height: 360, padding: 10, margin: "20px 10px" }}
            />
            <Skeleton
              count={2}
              style={{ height: 360, padding: 10, margin: "20px 10px" }}
            />
            <Skeleton
              count={2}
              style={{ height: 360, padding: 10, margin: "20px 10px" }}
            />
          </SkeletonTheme>
        )}

        {websiteProducts.length &&
        shopSettings.postsPerPage > websiteProducts.length
          ? demoProducts
              .slice(0, shopSettings.postsPerPage - websiteProducts.length)
              .map((pro) => (
                <div className="product">
                  <img
                    decoding="async"
                    src={
                      pro.image ||
                      "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081"
                    }
                    alt={pro.title}
                  />
                  <h2>{pro.title}</h2>
                  <p>
                    {pro.short_des.length > 150
                      ? pro.short_des.substring(0, 150) + "..."
                      : pro.short_des}
                  </p>
                  <p className="price">${pro.price}</p>
                  <a href="javascript:void(0);">
                    {shopSettings.productButtonText}
                  </a>
                </div>
              ))
          : ""}
      </div>
    </div>
  );
};

export default Preview;
