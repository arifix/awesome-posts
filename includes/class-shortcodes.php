<?php

class AFX_Shortcodes
{
    public function __construct()
    {
        add_shortcode('tonic-shop', [$this, 'afx_shop_products']);
        add_action('wp_ajax_get_tonic-shop', [$this, 'afx_shop_products_ajax']);
        add_action('wp_ajax_nopriv_get_tonic-shop', [$this, 'afx_shop_products_ajax']);
    }

    function fonts_url_to_name($font_url)
    {
        $font_url_ar = explode("/", $font_url);
        $font_name = explode(".", $font_url_ar[count($font_url_ar) - 1]);
        return $font_name[0];
    }

    function afx_shop_products($atts)
    {
        global $wpdb;

        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;

        $atts = shortcode_atts(array(
            'id' => ""
        ), $atts, 'tss-shop');

        $id = $atts['id'];
        $results = $wpdb->get_results("SELECT * FROM `$table_name` WHERE `id`='$id' ORDER BY `id` DESC LIMIT 1");

        if (count($results) == 1) {
            $settings = $results[0]->settings;
            $set = json_decode($settings);

            $posts_cats = [];
            if (count((array) $set->categories) > 0) {
                $categories = $set->categories;

                foreach ($categories as $cat) {
                    $posts_cats[] = $cat->value;
                }
            }

            $order_ar = explode(':', preg_replace('/\s+/', '', ($set->postsOrder ?: 'date:DESC')));

            $total_args = array(
                'post_type' => 'product',
                'posts_per_page' => -1,
                'post_status' => 'publish',
                'orderby' => $order_ar[0],
                'order' => $order_ar[1],
            );

            $posts_args = array(
                'post_type' => 'product',
                'posts_per_page' => ($set->postsPerPage ?: -1),
                'post_status' => 'publish',
                'orderby' => $order_ar[0],
                'order' => $order_ar[1],
            );

            if (count((array) $set->categories) > 0) {
                $categories = $set->categories;

                if (count($categories) > 0) {
                    $tax_query = [];
                    $tax_query['relation'] = 'OR';

                    foreach ($categories as $cat) {
                        array_push(
                            $tax_query,
                            array(
                                'taxonomy' => 'product_cat',
                                'field' => 'slug',
                                'terms' => $cat->value,
                            )
                        );
                    }

                    $posts_args['tax_query'] = $tax_query;
                    $total_args['tax_query'] = $tax_query;
                }
            }

            $total_query = new WP_Query($total_args);
            $total_posts = $total_query->found_posts;

            $posts_query = new WP_Query($posts_args);

            $style = '<style>';
            $style .= '@media(min-width: 961px){#tss-wrapper .product-grid{grid-template-columns: repeat(' . $set->gridColumns . ', 1fr);}}';

            if (!$set->showProductTitle) {
                $style .= '#tss-wrapper .product-grid .product h2{display: none;}';
            }
            if ($set->productTitleFont) {
                $font = str_contains($set->productTitleFont, 'http')
                    ? AFX_Helper::fonts_url_to_name($set->productTitleFont)
                    : $set->productTitleFont;
                $font_url = str_contains($set->productTitleFont, 'http')
                    ? $set->productTitleFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->productTitleFont) . '&display=swap';
                $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}#tss-wrapper .product-grid .product h2{font-family: "' . $font . '";}';
            }
            if ($set->productTitleSize) {
                $style .= '#tss-wrapper .product-grid .product h2{font-size: ' . $set->productTitleSize . 'px;}';
            }
            if ($set->productTitleColor) {
                $style .= '#tss-wrapper .product-grid .product h2{color: ' . $set->productTitleColor . ';}';
            }
            if ($set->productTitleAlignment) {
                $style .= '#tss-wrapper .product-grid .product h2{text-align: ' . $set->productTitleAlignment . ';}';
            }

            if (!$set->showProductDes) {
                $style .= '#tss-wrapper .product-grid .product p:not(.price){display: none;}';
            }
            if ($set->productDesFont) {
                $font = str_contains($set->productDesFont, 'http')
                    ? AFX_Helper::fonts_url_to_name($set->productDesFont)
                    : $set->productDesFont;
                $font_url = str_contains($set->productDesFont, 'http')
                    ? $set->productDesFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->productDesFont) . '&display=swap';
                $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}#tss-wrapper .product-grid .product p:not(.price){font-family: "' . $font . '";}';
            }
            if ($set->productDesSize) {
                $style .= '#tss-wrapper .product-grid .product p:not(.price){font-size: ' . $set->productDesSize . 'px;}';
            }
            if ($set->productDesColor) {
                $style .= '#tss-wrapper .product-grid .product p:not(.price){color: ' . $set->productDesColor . ';}';
            }
            if ($set->productDesAlignment) {
                $style .= '#tss-wrapper .product-grid .product p:not(.price){text-align: ' . $set->productDesAlignment . ';}';
            }

            if (!$set->showProductPrice) {
                $style .= '#tss-wrapper .product-grid .product .price{display: none;}';
            }
            if ($set->productPriceFont) {
                $font = str_contains($set->productPriceFont, 'http')
                    ? AFX_Helper::fonts_url_to_name($set->productPriceFont)
                    : $set->productPriceFont;
                $font_url = str_contains($set->productPriceFont, 'http')
                    ? $set->productPriceFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->productPriceFont) . '&display=swap';
                $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}#tss-wrapper .product-grid .product .price{font-family: "' . $font . '";}';
            }
            if ($set->productPriceSize) {
                $style .= '#tss-wrapper .product-grid .product .price{font-size: ' . $set->productPriceSize . 'px;}';
            }
            if ($set->productPriceColor) {
                $style .= '#tss-wrapper .product-grid .product .price{color: ' . $set->productPriceColor . ';}';
            }
            if ($set->productPriceAlignment) {
                $style .= '#tss-wrapper .product-grid .product .price{text-align: ' . $set->productPriceAlignment . ';}';
            }

            if (!$set->showProductButton) {
                $style .= '#tss-wrapper .product-grid .product a{display: none;}';
            }
            if ($set->productButtonFont) {
                $font = str_contains($set->productButtonFont, 'http')
                    ? AFX_Helper::fonts_url_to_name($set->productButtonFont)
                    : $set->productButtonFont;
                $font_url = str_contains($set->productButtonFont, 'http')
                    ? $set->productButtonFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->productButtonFont) . '&display=swap';
                $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}#tss-wrapper .product-grid .product a{font-family: "' . $font . '";}';
            }
            if ($set->productButtonSize) {
                $style .= '#tss-wrapper .product-grid .product a{font-size: ' . $set->productButtonSize . 'px;}';
            }
            if ($set->productButtonColor) {
                $style .= '#tss-wrapper .product-grid .product a{color: ' . $set->productButtonColor . ';}';
            }
            if ($set->productButtonAlignment) {
                $style .= '#tss-wrapper .product-grid .product a{text-align: ' . $set->productButtonAlignment . ';}';
            }
            if ($set->productButtonBgColor) {
                $style .= '#tss-wrapper .product-grid .product a{background-color: ' . $set->productButtonBgColor . ';}';
            }
            if ($set->productButtonBorderRadius) {
                $style .= '#tss-wrapper .product-grid .product a{border-radius: ' . $set->productButtonBorderRadius . 'px;}';
            }

            $style .= ' </style>';

            $html = $style;
            $html .= '<div id="tss-wrapper">';
            if ($posts_query->have_posts()) {
                $html .= '<div class="tss-filter">
                <div id="tss-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <select class="tss-posts-order tss-select" name="order">
                    <option value="date:DESC" ' . ($set->postsOrder == 'date:DESC' ? 'selected' : "") . '>Most Recent</option>
                    <option value="date:ASC" ' . ($set->postsOrder == 'date:ASC' ? 'selected' : "") . '>Oldest First</option>
                    <option value="title:ASC" ' . ($set->postsOrder == 'title:ASC' ? 'selected' : "") . '>Title A-Z</option>
                    <option value="title:DESC" ' . ($set->postsOrder == 'title:DESC' ? 'selected' : "") . '>Title Z-A</option>
                </select>
            </div>';

                $html .= '<div class="product-grid">';
                while ($posts_query->have_posts()) {
                    $posts_query->the_post();

                    $product   = wc_get_product(get_the_ID());
                    $image_url = wp_get_attachment_url($product->get_image_id(), 'full');

                    $html .= '<div class="product">';
                    $html .= '<img src="' . ($image_url ?: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081') . '" alt="' . get_the_title() . '">';
                    $html .= '<h2>' . get_the_title() . '</h2>';
                    $html .= '<p>' . get_the_excerpt() . '</p>';
                    $html .= '<p class="price">$' . $product->get_sale_price() . '</p>';
                    $html .= '<a href="' . get_permalink() . '">View Product</a>';
                    //$html .= '<a href="?add-to-cart=' . get_the_ID() . '" data-quantity="1" class="add_to_cart_button ajax_add_to_cart" data-product_id="' . get_the_ID() . '">Add to Cart</a>';
                    $html .= '</div>';
                }

                $html .= '</div>';
                $html .= '<button type="button" id="tss-load-more" data-admin-ajax="' . admin_url("admin-ajax.php") . '"  data-categories="' . join(",", $posts_cats) . '" data-posts-per-page="' . $set->postsPerPage . '" data-total-posts="' . $total_posts . '" 
            ' . ($set->postsPerPage >= $total_posts ? 'style="display: none;"' : '') . '>Load More</button>';
            }
            $html .= '</div>';

            return $html;
        }

        return "";
    }

    function afx_shop_products_ajax()
    {
        $categories = !empty($_REQUEST['categories']) ? $_REQUEST['categories'] : 'all';
        $order = isset($_REQUEST['order']) ? $_REQUEST['order'] : 'date:DESC';
        $order_ar = explode(':', preg_replace('/\s+/', '', $order));

        $posts_args = array(
            'post_type' => 'product',
            'posts_per_page' => $_REQUEST['posts_per_page'],
            'offset' => $_REQUEST['offset'],
            'post_status' => 'publish',
            'orderby' => $order_ar[0],
            'order' => $order_ar[1]
        );

        if ($categories != 'all') {
            $categories = explode(',', preg_replace('/\s+/', '', $categories));

            if (count($categories) > 0) {
                $tax_query = [];
                $tax_query['relation'] = 'OR';

                foreach ($categories as $cat) {
                    array_push(
                        $tax_query,
                        array(
                            'taxonomy' => 'product_cat',
                            'field' => 'slug',
                            'terms' => $cat,
                        )
                    );
                }

                $posts_args['tax_query'] = $tax_query;
            }
        }

        $posts_query = new WP_Query($posts_args);

        $html = '';
        if ($posts_query->have_posts()) {
            while ($posts_query->have_posts()) {
                $posts_query->the_post();

                $product   = wc_get_product(get_the_ID());
                $image_url = wp_get_attachment_url($product->get_image_id(), 'full');

                $html .= '<div class="product">';
                $html .= '<img src="' . ($image_url ?: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=100&v=1530129081') . '" alt="' . get_the_title() . '">';
                $html .= '<h2>' . get_the_title() . '</h2>';
                $html .= '<p>' . get_the_excerpt() . '</p>';
                $html .= '<p class="price">$' . $product->get_sale_price() . '</p>';
                $html .= '<a href="' . get_permalink() . '">View Product</a>';
                //$html .= '<a href="?add-to-cart=' . get_the_ID() . '" data-quantity="1" class="add_to_cart_button ajax_add_to_cart" data-product_id="' . get_the_ID() . '">Add to Cart</a>';
                $html .= '</div>';
            }
        }

        echo json_encode([
            'result' => $html,
        ]);

        die();
    }
}

new AFX_Shortcodes();
