<?php

class AFX_Helper
{
    public function __construct()
    {
        add_filter('upload_mimes', [$this, 'afx_add_font_upload_mimes']);
        add_filter('wp_check_filetype_and_ext', [$this, 'afx_add_allow_upload_extension_exception'], 99, 4);
        add_filter('wp_head', [$this, 'afx_print_shop_styles']);
        add_filter('wp_head', [$this, 'afx_print_product_styles']);
        add_filter('wp_footer', [$this, 'afx_showit_add_product_title_on_single_page']);
    }

    static function fonts_url_to_name($font_url)
    {
        $font_url_ar = explode("/", $font_url);
        $font_name = explode(".", $font_url_ar[count($font_url_ar) - 1]);
        return $font_name[0];
    }

    function afx_add_font_upload_mimes($existing_mimes)
    {
        $existing_mimes['ttf'] = 'font/ttf';
        $existing_mimes['otf'] = 'font/otf';
        $existing_mimes['woff'] = 'font/woff';
        $existing_mimes['woff2'] = 'font/woff2';
        $existing_mimes['json'] = 'application/json';

        return $existing_mimes;
    }

    function afx_add_allow_upload_extension_exception($types, $file, $filename, $mimes)
    {
        $wp_filetype = wp_check_filetype($filename, $mimes);
        $ext         = $wp_filetype['ext'];
        $type        = $wp_filetype['type'];
        if (in_array($ext, array('ttf', 'otf', 'woff', 'woff2', 'json'))) {
            $types['ext'] = $ext;
            $types['type'] = $type;
        }
        return $types;
    }

    function afx_print_shop_styles()
    {
        if (is_shop()) {
            $settings = json_decode(get_option('afx_shop_settings'));
            $default_shop = $settings->default_shop ?? '';
            $shop_toggle = $default_shop->shopStyleToggle ?? false;

            if ($shop_toggle) {
                $style = '<style>';

                if ($default_shop->sdOnSaleBadgeFont) {
                    $font = str_contains($default_shop->sdOnSaleBadgeFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_shop->sdOnSaleBadgeFont)
                        : $default_shop->sdOnSaleBadgeFont;
                    $font_url = str_contains($default_shop->sdOnSaleBadgeFont, 'http')
                        ? $default_shop->sdOnSaleBadgeFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_shop->sdOnSaleBadgeFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce ul.products li.product .onsale{font-family: "' . $font . '" !important;}';
                }

                if ($default_shop->sdProductTitleFont) {
                    $font = str_contains($default_shop->sdProductTitleFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_shop->sdProductTitleFont)
                        : $default_shop->sdProductTitleFont;
                    $font_url = str_contains($default_shop->sdProductTitleFont, 'http')
                        ? $default_shop->sdProductTitleFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_shop->sdProductTitleFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce ul.products li.product .woocommerce-loop-product__title{font-family: "' . $font . '" !important;}';
                }

                if ($default_shop->sdProductPriceFont) {
                    $font = str_contains($default_shop->sdProductPriceFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_shop->sdProductPriceFont)
                        : $default_shop->sdProductPriceFont;
                    $font_url = str_contains($default_shop->sdProductPriceFont, 'http')
                        ? $default_shop->sdProductPriceFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_shop->sdProductPriceFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce ul.products li.product .price{font-family: "' . $font . '" !important;}';
                }

                if ($default_shop->sdAddToCartBtnFont) {
                    $font = str_contains($default_shop->sdAddToCartBtnFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_shop->sdAddToCartBtnFont)
                        : $default_shop->sdAddToCartBtnFont;
                    $font_url = str_contains($default_shop->sdAddToCartBtnFont, 'http')
                        ? $default_shop->sdAddToCartBtnFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_shop->sdAddToCartBtnFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce ul.products li.product .button{font-family: "' . $font . '" !important;}';
                }

                $style .= '
                        /* === RESULT COUNT === */
                        .woocommerce .woocommerce-result-count {
                            font-family: sans-serif;
                            font-weight: 100;
                        }

                        /* === SORT SELECT BOX === */
                        .woocommerce .woocommerce-ordering select {
                            height: 30px;
                        }

                        /* === SALE BADGE === */
                        .woocommerce ul.products li.product .onsale {
                            font-family: sans-serif;
                            background-color: ' . $default_shop->sdOnSaleBadgeBgColor . ';
                            color: ' . $default_shop->sdOnSaleBadgeColor . ';
                            font-weight: ' . $default_shop->sdOnSaleBadgeWeight . ';
                            font-size: ' . $default_shop->sdOnSaleBadgeSize . 'px;
                            letter-spacing: ' . $default_shop->sdOnSaleBadgeLetterSpacing . 'px;
                            text-transform: ' . $default_shop->sdOnSaleBadgeTextTransform . ';
                            padding: 0.4em;
                        }

                        /* === PRODUCT TITLE === */
                        .woocommerce ul.products li.product .woocommerce-loop-product__title {
                            font-family: sans-serif;
                            color: ' . $default_shop->sdProductTitleColor . ';
                            font-weight: ' . $default_shop->sdProductTitleWeight . ';
                            font-size: ' . $default_shop->sdProductTitleSize . 'px;
                            letter-spacing: ' . $default_shop->sdProductTitleLetterSpacing . 'px;
                            line-height: ' . $default_shop->sdProductTitleLineHeight . 'px;
                            text-transform: ' . $default_shop->sdProductTitleTextTransform . ';
                            text-align: left;
                        }

                        /* === PRODUCT PRICE === */
                        .woocommerce ul.products li.product .price {
                            font-family: sans-serif;
                            color: ' . $default_shop->sdProductPriceColor . ';
                            font-size: ' . $default_shop->sdProductPriceSize . 'px;
                            font-weight: ' . $default_shop->sdProductPriceWeight . ';
                            letter-spacing: ' . $default_shop->sdProductPriceLetterSpacing . 'px;
                            line-height: ' . $default_shop->sdProductPriceLineHeight . 'px;
                            text-transform: ' . $default_shop->sdProductPriceTextTransform . ';
                        }

                        .woocommerce ul.products li.product .price del {
                            margin-right: 0.4em;
                            font-size: 0.9em;
                        }
                        
                        .woocommerce ul.products li.product .price ins {
                            font-weight: 100;
                            text-decoration: none;
                        }

                        /* === PRODUCT BUTTON === */
                        .woocommerce ul.products li.product .button {
                            font-family: sans-serif;
                            background-color: ' . $default_shop->sdAddToCartBtnBgColor . ' !important;
                            color: ' . $default_shop->sdAddToCartBtnColor . ' !important;
                            font-size: ' . $default_shop->sdAddToCartBtnSize . 'px;
                            letter-spacing: ' . $default_shop->sdAddToCartBtnLetterSpacing . 'px;
                            text-transform: ' . $default_shop->sdAddToCartBtnTextTransform . ';
                            font-weight: normal;
                            padding: 12px 25px;
                            border-radius: 100px;
                            margin-top: 0.7em;
                        }
                    ';

                $style .= '</style>';

                echo $style;
            }
        }
    }

    function afx_print_product_styles()
    {
        if (is_product()) {
            $settings = json_decode(get_option('afx_shop_settings'));
            $default_shop = $settings->default_shop ?? '';
            $default_product = $settings->default_product ?? '';

            $shop_toggle = $default_shop->shopStyleToggle ?? false;
            $product_toggle = $default_product->productStyleToggle ?? false;

            if ($product_toggle) {
                $style = '<style>';
                if ($shop_toggle) {
                    if ($default_shop->sdOnSaleBadgeFont) {
                        $font = str_contains($default_shop->sdOnSaleBadgeFont, 'http')
                            ? AFX_Helper::fonts_url_to_name($default_shop->sdOnSaleBadgeFont)
                            : $default_shop->sdOnSaleBadgeFont;
                        $font_url = str_contains($default_shop->sdOnSaleBadgeFont, 'http')
                            ? $default_shop->sdOnSaleBadgeFont
                            : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_shop->sdOnSaleBadgeFont) . '&display=swap';
                        $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce span.onsale{font-family: "' . $font . '" !important;}';
                    }
                }


                if ($default_product->proProductTitleFont) {
                    $font = str_contains($default_product->proProductTitleFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_product->proProductTitleFont)
                        : $default_product->proProductTitleFont;
                    $font_url = str_contains($default_product->proProductTitleFont, 'http')
                        ? $default_product->proProductTitleFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_product->proProductTitleFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce div.product .product_title{font-family: "' . $font . '" !important;}';
                }

                if ($default_product->proProductPriceFont) {
                    $font = str_contains($default_product->proProductPriceFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_product->proProductPriceFont)
                        : $default_product->proProductPriceFont;
                    $font_url = str_contains($default_product->proProductPriceFont, 'http')
                        ? $default_product->proProductPriceFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_product->proProductPriceFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce .summary.entry-summary p.price{font-family: "' . $font . '" !important;}';
                }

                if ($default_product->proProductShortDesFont) {
                    $font = str_contains($default_product->proProductShortDesFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_product->proProductShortDesFont)
                        : $default_product->proProductShortDesFont;
                    $font_url = str_contains($default_product->proProductShortDesFont, 'http')
                        ? $default_product->proProductShortDesFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_product->proProductShortDesFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce-product-details__short-description{font-family: "' . $font . '" !important;}';
                }

                if ($default_product->proAddToCartBtnFont) {
                    $font = str_contains($default_product->proAddToCartBtnFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_product->proAddToCartBtnFont)
                        : $default_product->proAddToCartBtnFont;
                    $font_url = str_contains($default_product->proAddToCartBtnFont, 'http')
                        ? $default_product->proAddToCartBtnFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_product->proAddToCartBtnFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce div.product form.cart .button{font-family: "' . $font . '" !important;}';
                }

                if ($default_product->proProductMetaFont) {
                    $font = str_contains($default_product->proProductMetaFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_product->proProductMetaFont)
                        : $default_product->proProductMetaFont;
                    $font_url = str_contains($default_product->proProductMetaFont, 'http')
                        ? $default_product->proProductMetaFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_product->proProductMetaFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.product_meta{font-family: "' . $font . '" !important;}';
                }

                if ($default_product->proTabHeadingsFont) {
                    $font = str_contains($default_product->proTabHeadingsFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_product->proTabHeadingsFont)
                        : $default_product->proTabHeadingsFont;
                    $font_url = str_contains($default_product->proTabHeadingsFont, 'http')
                        ? $default_product->proTabHeadingsFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_product->proTabHeadingsFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce div.product .woocommerce-tabs ul.tabs li a{font-family: "' . $font . '" !important;}';
                }

                if ($default_product->proTabContentH2Font) {
                    $font = str_contains($default_product->proTabContentH2Font, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_product->proTabContentH2Font)
                        : $default_product->proTabContentH2Font;
                    $font_url = str_contains($default_product->proTabContentH2Font, 'http')
                        ? $default_product->proTabContentH2Font
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_product->proTabContentH2Font) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce div.product .woocommerce-tabs .panel h2{font-family: "' . $font . '" !important;}';
                }

                if ($default_product->proTabContentParaFont) {
                    $font = str_contains($default_product->proTabContentParaFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_product->proTabContentParaFont)
                        : $default_product->proTabContentParaFont;
                    $font_url = str_contains($default_product->proTabContentParaFont, 'http')
                        ? $default_product->proTabContentParaFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_product->proTabContentParaFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}.woocommerce div.product .woocommerce-tabs .panel p{font-family: "' . $font . '" !important;}';
                }

                if ($default_product->proRelatedProductTitleFont) {
                    $font = str_contains($default_product->proRelatedProductTitleFont, 'http')
                        ? AFX_Helper::fonts_url_to_name($default_product->proRelatedProductTitleFont)
                        : $default_product->proRelatedProductTitleFont;
                    $font_url = str_contains($default_product->proRelatedProductTitleFont, 'http')
                        ? $default_product->proRelatedProductTitleFont
                        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $default_product->proRelatedProductTitleFont) . '&display=swap';
                    $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}section.related.products h2{font-family: "' . $font . '" !important;}';
                }

                if ($shop_toggle) {
                    $style .= '
                        /* === SALE BANNER === */
                        .woocommerce span.onsale {
                            background-color: ' . $default_shop->sdOnSaleBadgeBgColor . ';
                            color: ' . $default_shop->sdOnSaleBadgeColor . ';
                            font-weight: ' . $default_shop->sdOnSaleBadgeWeight . ';
                            font-size: ' . $default_shop->sdOnSaleBadgeSize . 'px;
                            letter-spacing: ' . $default_shop->sdOnSaleBadgeLetterSpacing . 'px;
                            text-transform: ' . $default_shop->sdOnSaleBadgeTextTransform . ';
                            padding: 0.4em;
                        }
                    ';
                }

                $style .= '
                        /* === REMOVE JETPACK RELATED POSTS === */
                        .single-product div#jp-relatedposts {
                            display: none !important;
                        }

                        /* === IMAGE GALLERY === */
                        .woocommerce div.product div.images .flex-control-thumbs {
                            margin-top: 10px;
                        }

                        .woocommerce div.product div.images .flex-control-thumbs li:not(:last-of-type) {
                            margin-right: 10px;
                        }

                        /* === PRODUCT TITLE === */
                        .woocommerce div.product .product_title {
                            font-family: sans-serif;
                            color: ' . $default_product->proProductTitleColor . ';
                            font-size: ' . $default_product->proProductTitleSize . 'px;
                            letter-spacing: ' . $default_product->proProductTitleLetterSpacing . 'px;
                            line-height: ' . $default_product->proProductTitleLineHeight . 'px;
                            font-weight: ' . $default_product->proProductTitleWeight . ';
                            text-transform: ' . $default_product->proProductTitleTextTransform . ';
                            text-align: left;
                            margin-bottom: 10px;
                        }

                        /* === PRODUCT PRICE === */
                        .woocommerce .summary.entry-summary p.price {
                            font-family: sans-serif;
                            color: ' . $default_product->proProductPriceColor . ';
                            font-size: ' . $default_product->proProductPriceSize . 'px;
                            letter-spacing: ' . $default_product->proProductPriceLetterSpacing . 'px;
                            line-height: ' . $default_product->proProductPriceLineHeight . 'px;
                            font-weight: ' . $default_product->proProductPriceWeight . ';
                            text-transform: ' . $default_product->proProductPriceTextTransform . ';
                            text-align: left;
                        }

                        .woocommerce .summary.entry-summary p.price del {
                            font-size: 0.85em;
                            margin-right: 10px;
                        }

                        .woocommerce .summary.entry-summary p.price ins {
                            text-decoration: none;
                            font-weight: normal;
                        }

                        /* === SHORT DESCRIPTION === */
                        .woocommerce-product-details__short-description {
                            font-family: sans-serif;
                            color: ' . $default_product->proProductShortDesColor . ' !important;
                            font-size: ' . $default_product->proProductShortDesSize . 'px !important;
                            letter-spacing: ' . $default_product->proProductShortDesLetterSpacing . 'px !important;
                            line-height: ' . $default_product->proProductShortDesLineHeight . 'px !important;
                            font-weight: ' . $default_product->proProductShortDesWeight . ' !important;
                            text-transform: ' . $default_product->proProductShortDesTextTransform . ' !important;
                            text-align: left !important;
                            margin-bottom: 2em !important;
                        }

                        /* === ADD TO CART BUTTON === */
                        .quantity input {
                            font-family: sans-serif;
                            font-size: 14px;
                            height: 41px;
                            border-radius: 0;
                            border: 1px solid grey;
                        }

                        .woocommerce div.product form.cart .button {
                            font-family: sans-serif;
                            background-color: ' . $default_product->proAddToCartBtnBgColor . ';
                            color: ' . $default_product->proAddToCartBtnColor . ';
                            font-size: ' . $default_product->proAddToCartBtnSize . 'px;
                            letter-spacing: ' . $default_product->proAddToCartBtnLetterSpacing . 'px;
                            text-transform: ' . $default_product->proAddToCartBtnTextTransform . ';
                            height: 45px;
                            padding: 0 25px;
                            border-radius: 0;
                        }

                        /* === CATEGORY === */
                        .product_meta {
                            font-family: sans-serif;
                            color: ' . $default_product->proProductMetaColor . ';
                            font-size: ' . $default_product->proProductMetaSize . 'px;
                            letter-spacing: ' . $default_product->proProductMetaLetterSpacing . 'px;
                            line-height: ' . $default_product->proProductMetaLineHeight . 'px;
                            font-weight: ' . $default_product->proProductMetaWeight . ';
                            text-transform: ' . $default_product->proProductMetaTextTransform . ';
                            text-align: left;
                        }

                        .product_meta a {
                            color: inherit !important;
                            opacity: 0.6;
                        }

                        /* === TABS === */

                        /* removing existing styles */
                        .woocommerce div.product .woocommerce-tabs ul.tabs::before,
                        .woocommerce div.product .woocommerce-tabs ul.tabs li::after,
                        .woocommerce div.product .woocommerce-tabs ul.tabs li.active::after {
                            display: none;
                        }

                        /* adding style */

                        .woocommerce div.product .woocommerce-tabs ul.tabs {
                            text-align: center;
                        }

                        .woocommerce div.product .woocommerce-tabs ul.tabs li {
                            border: 0 !important;
                            font-family: sans-serif;
                            color: black;
                            font-size: 20px;
                            line-height: normal;
                            letter-spacing: normal;
                            text-transform: none;
                            text-align: left;
                        }

                        .woocommerce div.product .woocommerce-tabs ul.tabs li.active a {
                            border-bottom: 2px solid;
                        }

                        .woocommerce div.product .woocommerce-tabs ul.tabs li a {
                            font-family: sans-serif;
                            border-bottom: 2px solid;
                            color: ' . $default_product->proTabHeadingsColor . ';
                            font-size: ' . $default_product->proTabHeadingsSize . 'px;
                            letter-spacing: ' . $default_product->proTabHeadingsLetterSpacing . 'px;
                            line-height: ' . $default_product->proTabHeadingsLineHeight . 'px;
                            font-weight: ' . $default_product->proTabHeadingsWeight . ';
                            text-transform: ' . $default_product->proTabHeadingsTextTransform . ';
                            text-align: left;
                        }

                        .woocommerce div.product .woocommerce-tabs .panel h2 {
                            font-family: sans-serif;
                            color: ' . $default_product->proTabContentH2Color . ';
                            font-size: ' . $default_product->proTabContentH2Size . 'px;
                            letter-spacing: ' . $default_product->proTabContentH2LetterSpacing . 'px;
                            line-height: ' . $default_product->proTabContentH2LineHeight . 'px;
                            font-weight: ' . $default_product->proTabContentH2Weight . ';
                            text-transform: ' . $default_product->proTabContentH2TextTransform . ';
                            text-align: left;
                        }

                        .woocommerce div.product .woocommerce-tabs .panel p {
                            font-family: sans-serif;
                            color: ' . $default_product->proTabContentParaColor . ';
                            font-size: ' . $default_product->proTabContentParaSize . 'px;
                            letter-spacing: ' . $default_product->proTabContentParaLetterSpacing . 'px;
                            line-height: ' . $default_product->proTabContentParaLineHeight . 'px;
                            font-weight: ' . $default_product->proTabContentParaWeight . ';
                            text-transform: ' . $default_product->proTabContentParaTextTransform . ';
                            text-align: left;
                        }

                        section.related.products h2 {
                            font-family: sans-serif;
                            color: ' . $default_product->proRelatedProductTitleColor . ';
                            font-size: ' . $default_product->proRelatedProductTitleSize . 'px;
                            letter-spacing: ' . $default_product->proRelatedProductTitleLetterSpacing . 'px;
                            line-height: ' . $default_product->proRelatedProductTitleLineHeight . 'px;
                            font-weight: ' . $default_product->proRelatedProductTitleWeight . ';
                            text-transform: ' . $default_product->proRelatedProductTitleTextTransform . ';
                            text-align: left;
                        }
                    ';

                $style .= '</style>';

                echo $style;
            }
        }
    }

    function afx_showit_add_product_title_on_single_page()
    {
        $body_classes = get_body_class();
        if (in_array('theme-showit', $body_classes) && is_product()) {
            global $product;

            $product_id = $product->get_id();
            $product_title = get_the_title($product_id);

            echo "<script>
                (function($) {
                    $('.woocommerce .single-product .summary.entry-summary').prepend(`<h1 class=\"product_title entry-title\">" . $product_title . "</h1>`);
                })( jQuery );
            </script>";
        }
    }
}

new AFX_Helper();
