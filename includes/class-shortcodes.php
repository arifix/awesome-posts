<?php

class AFX_Shortcodes
{
    public function __construct()
    {
        add_shortcode('awesome-posts', [$this, 'afx_posts']);
        add_action('wp_ajax_get_awesome-posts', [$this, 'afx_posts_ajax']);
        add_action('wp_ajax_nopriv_get_awesome-posts', [$this, 'afx_posts_ajax']);
    }

    function fonts_url_to_name($font_url)
    {
        $font_url_ar = explode("/", $font_url);
        $font_name = explode(".", $font_url_ar[count($font_url_ar) - 1]);
        return $font_name[0];
    }

    function afx_posts($atts)
    {
        global $wpdb;

        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;

        $atts = shortcode_atts(array(
            'id' => ""
        ), $atts, 'awesome-posts');

        $id = $atts['id'];
        $results = $wpdb->get_results("SELECT * FROM `$table_name` WHERE `id`='$id' ORDER BY `id` DESC LIMIT 1");

        if (count($results) == 1) {
            $settings = $results[0]->settings;
            $set = json_decode($settings);

            $post_type = $set->postType->value;
            $post_per_page = $set->postsPerPage ?: -1;
            $offset = $set->postOffset;
            $taxonomy = $set->taxonomy->value;
            $terms = [];
            if (count((array) $set->terms) > 0) {
                $terms = $set->terms;

                foreach ($terms as $term) {
                    $terms[] = $term->value;
                }
            }

            $relation = $set->relation;
            $operator = $set->operator;
            $post_orderby = $set->postOrderBy;
            $post_order = $set->postOrder;
            $start_date = explode('T', $set->postStartDate[0])[0];
            $end_date = explode('T', $set->postEndDate[0])[0];

            $post_status = [];
            if (count((array) $set->postStatus) > 0) {
                $ps = $set->postStatus;

                foreach ($ps as $p) {
                    $post_status[] = $p->value;
                }
            }

            $authors = [];
            if (count((array) $set->authors) > 0) {
                $aut = $set->authors;

                foreach ($aut as $a) {
                    $authors[] = $a->value;
                }
            }

            $search = $set->search;

            $posts_include = [];
            if (count((array) $set->postsToInclude) > 0) {
                $pi = $set->postsToInclude;

                foreach ($pi as $p) {
                    $posts_include[] = $p->value;
                }
            }

            $posts_exclude = [];
            if (count((array) $set->postsToExclude) > 0) {
                $pe = $set->postsToExclude;

                foreach ($pe as $p) {
                    $posts_exclude[] = $p->value;
                }
            }

            $posts_args = array(
                'post_type' => $post_type,
                'posts_per_page' => $post_per_page,
                'post_status' => 'publish',
                'orderby' => 'title',
                'order' => 'ASC',
                'offset' => $offset
            );

            if (!empty($taxonomy) && count($terms) > 0) {
                $tax_query = [];
                $tax_query['relation'] = $relation;

                foreach ($terms as $term) {
                    array_push(
                        $tax_query,
                        array(
                            'taxonomy' => $taxonomy,
                            'field' => 'slug',
                            'terms' => $term,
                            'operator' => $operator
                        )
                    );
                }

                if (count($tax_query) > 1) {
                    $posts_args['tax_query'] = $tax_query;
                }
            }

            if (!empty($post_orderby)) {
                $posts_args['orderby'] = $post_orderby;
            }

            if (!empty($post_order)) {
                $posts_args['order'] = $post_order;
            }

            if (!empty($start_date)) {
                $posts_args['date_query'] = array(
                    array(
                        'after' => $start_date,
                        'before' => !empty($end_date) ? $end_date : gmdate('Y-m-d'),
                        'inclusive' => true,
                    )
                );
            }

            if (count($post_status) > 0) {
                $posts_args['post_status'] = $post_status;
            }

            if (!empty($authors)) {
                $posts_args['author'] = $authors;
            }

            if (!empty($search)) {
                $posts_args['s'] = $search;
            }

            $posts_query = new WP_Query($posts_args);



            print_r($set);
            //die();

            /*
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
            $style .= '@media(min-width: 961px){#afx-ap-wrapper .product-grid{grid-template-columns: repeat(' . $set->gridColumns . ', 1fr);}}';

            if (!$set->showProductTitle) {
                $style .= '#afx-ap-wrapper .product-grid .product h2{display: none;}';
            }
            if ($set->productTitleFont) {
                $font = str_contains($set->productTitleFont, 'http')
                    ? AFX_Helper::fonts_url_to_name($set->productTitleFont)
                    : $set->productTitleFont;
                $font_url = str_contains($set->productTitleFont, 'http')
                    ? $set->productTitleFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->productTitleFont) . '&display=swap';
                $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}#afx-ap-wrapper .product-grid .product h2{font-family: "' . $font . '";}';
            }
            if ($set->productTitleSize) {
                $style .= '#afx-ap-wrapper .product-grid .product h2{font-size: ' . $set->productTitleSize . 'px;}';
            }
            if ($set->productTitleColor) {
                $style .= '#afx-ap-wrapper .product-grid .product h2{color: ' . $set->productTitleColor . ';}';
            }
            if ($set->productTitleAlignment) {
                $style .= '#afx-ap-wrapper .product-grid .product h2{text-align: ' . $set->productTitleAlignment . ';}';
            }

            if (!$set->showProductDes) {
                $style .= '#afx-ap-wrapper .product-grid .product p:not(.price){display: none;}';
            }
            if ($set->productDesFont) {
                $font = str_contains($set->productDesFont, 'http')
                    ? AFX_Helper::fonts_url_to_name($set->productDesFont)
                    : $set->productDesFont;
                $font_url = str_contains($set->productDesFont, 'http')
                    ? $set->productDesFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->productDesFont) . '&display=swap';
                $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}#afx-ap-wrapper .product-grid .product p:not(.price){font-family: "' . $font . '";}';
            }
            if ($set->productDesSize) {
                $style .= '#afx-ap-wrapper .product-grid .product p:not(.price){font-size: ' . $set->productDesSize . 'px;}';
            }
            if ($set->productDesColor) {
                $style .= '#afx-ap-wrapper .product-grid .product p:not(.price){color: ' . $set->productDesColor . ';}';
            }
            if ($set->productDesAlignment) {
                $style .= '#afx-ap-wrapper .product-grid .product p:not(.price){text-align: ' . $set->productDesAlignment . ';}';
            }

            if (!$set->showProductPrice) {
                $style .= '#afx-ap-wrapper .product-grid .product .price{display: none;}';
            }
            if ($set->productPriceFont) {
                $font = str_contains($set->productPriceFont, 'http')
                    ? AFX_Helper::fonts_url_to_name($set->productPriceFont)
                    : $set->productPriceFont;
                $font_url = str_contains($set->productPriceFont, 'http')
                    ? $set->productPriceFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->productPriceFont) . '&display=swap';
                $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}#afx-ap-wrapper .product-grid .product .price{font-family: "' . $font . '";}';
            }
            if ($set->productPriceSize) {
                $style .= '#afx-ap-wrapper .product-grid .product .price{font-size: ' . $set->productPriceSize . 'px;}';
            }
            if ($set->productPriceColor) {
                $style .= '#afx-ap-wrapper .product-grid .product .price{color: ' . $set->productPriceColor . ';}';
            }
            if ($set->productPriceAlignment) {
                $style .= '#afx-ap-wrapper .product-grid .product .price{text-align: ' . $set->productPriceAlignment . ';}';
            }

            if (!$set->showProductButton) {
                $style .= '#afx-ap-wrapper .product-grid .product a{display: none;}';
            }
            if ($set->productButtonFont) {
                $font = str_contains($set->productButtonFont, 'http')
                    ? AFX_Helper::fonts_url_to_name($set->productButtonFont)
                    : $set->productButtonFont;
                $font_url = str_contains($set->productButtonFont, 'http')
                    ? $set->productButtonFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->productButtonFont) . '&display=swap';
                $style .= '@font-face {font-family: "' . $font . '";src: url("' . $font_url . '");}#afx-ap-wrapper .product-grid .product a{font-family: "' . $font . '";}';
            }
            if ($set->productButtonSize) {
                $style .= '#afx-ap-wrapper .product-grid .product a{font-size: ' . $set->productButtonSize . 'px;}';
            }
            if ($set->productButtonColor) {
                $style .= '#afx-ap-wrapper .product-grid .product a{color: ' . $set->productButtonColor . ';}';
            }
            if ($set->productButtonAlignment) {
                $style .= '#afx-ap-wrapper .product-grid .product a{text-align: ' . $set->productButtonAlignment . ';}';
            }
            if ($set->productButtonBgColor) {
                $style .= '#afx-ap-wrapper .product-grid .product a{background-color: ' . $set->productButtonBgColor . ';}';
            }
            if ($set->productButtonBorderRadius) {
                $style .= '#afx-ap-wrapper .product-grid .product a{border-radius: ' . $set->productButtonBorderRadius . 'px;}';
            }

            $style .= ' </style>';

            $html = $style;
            $html .= '<div id="afx-ap-wrapper">';
            if ($posts_query->have_posts()) {
                $html .= '<div class="afx-ap-filter">
                <div id="afx-ap-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <select class="afx-ap-posts-order afx-ap-select" name="order">
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
                $html .= '<button type="button" id="afx-ap-load-more" data-admin-ajax="' . admin_url("admin-ajax.php") . '"  data-categories="' . join(",", $posts_cats) . '" data-posts-per-page="' . $set->postsPerPage . '" data-total-posts="' . $total_posts . '" 
            ' . ($set->postsPerPage >= $total_posts ? 'style="display: none;"' : '') . '>Load More</button>';
            }
            $html .= '</div>';

            return $html;
            */
        }

        return "";
    }

    function afx_posts_ajax()
    {
        /*
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
        */

        echo 1234567890;

        die();
    }
}

new AFX_Shortcodes();
