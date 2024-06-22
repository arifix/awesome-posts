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
            $grid_title = $results[0]->title;
            $settings = $results[0]->settings;
            $set = json_decode($settings);

            $post_type = $set->postType->value;
            $post_per_page = $set->postsPerPage ?: -1;
            $offset = $set->postOffset;
            $taxonomy = $set->taxonomy->value;
            $terms = [];
            if (count((array) $set->terms) > 0) {
                $tr = $set->terms;

                foreach ($tr as $t) {
                    $terms[] = $t->value;
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

            if (count($posts_include) > 0) {
                $posts_args['post__in'] = $posts_include;
            }

            if (count($posts_exclude) > 0 && count($posts_include) == 0) {
                $posts_args['post__not_in'] = $posts_exclude;
            }

            $posts_query = new WP_Query($posts_args);

            $html = '<style>
                .afx-ap-wrapper {
                background-color: ' . $set->gridBgColor . ';
                padding: ' . $set->gridPadding->top . 'px ' . $set->gridPadding->right . 'px ' . $set->gridPadding->bottom . 'px ' . $set->gridPadding->left . 'px;
                margin: ' . $set->gridMargin->top . 'px ' . $set->gridMargin->right . 'px ' . $set->gridMargin->bottom . 'px ' . $set->gridMargin->left . 'px;
            }

            .afx-ap-posts {
                gap: ' . $set->gridGap . 'px;
            }

            .ap-date {
                background-color: ' . $set->btnBgColor . ';
                color: ' . $set->btnColor . ';
            }

            .afx-ap-posts {
                grid-template-columns: repeat(' . $set->gridColumnsD . ', 1fr);
            }

            @media screen and (max-width: 991px) {
                .afx-ap-posts {
                    grid-template-columns: repeat(' . $set->gridColumnsT . ', 1fr);
                }
            }

            @media screen and (max-width: 767px) {
                .afx-ap-posts {
                    grid-template-columns: repeat(' . $set->gridColumnsM . ', 1fr);
                }
            }';

            if ($set->shFont) {
                $font = str_contains($set->shFont, "http")
                    ? AFX_Helper::fonts_url_to_name($set->shFont)
                    : $set->shFont;
                $font_url = str_contains($set->shFont, "http")
                    ? $set->shFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->shFont) . '&display=swap';

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.ap-grid-title{font-family: ' . $font . '}';
            }

            $html .= '.ap-grid-title{
                font-size: ' . $set->shFontSize . 'px;
                font-weight: ' . $set->shFontWeight . ';
                font-style: ' . $set->shFontStyle . ';
                color: ' . $set->shColor . ';
                text-decoration: ' . $set->shTextDecoration . ';
                text-transform: ' . $set->shTextTransform . ';
                line-height: ' . $set->shLineHeight . 'px;
                padding: ' . $set->shPadding->top . 'px ' . $set->shPadding->right . 'px ' . $set->shPadding->bottom . 'px ' . $set->shPadding->left . 'px;
                margin: ' . $set->shMargin->top . 'px ' . $set->shMargin->right . 'px ' . $set->shMargin->bottom . 'px ' . $set->shMargin->left . 'px;
                letter-spacing: ' . $set->shLetterSpacing . 'px;
                word-spacing: ' . $set->shWordSpacing . 'px;
                text-align: ' . $set->shAlignment . ';
                }';

            if ($set->titleFont) {
                $font = str_contains($set->titleFont, "http")
                    ? AFX_Helper::fonts_url_to_name($set->titleFont)
                    : $set->titleFont;
                $font_url = str_contains($set->titleFont, "http")
                    ? $set->titleFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->titleFont) . '&display=swap';

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.ap-title{font-family: ' . $font . '}';
            }

            $html .= '.ap-title{
                    font-size: ' . $set->titleFontSize . 'px;
                    font-weight: ' . $set->titleFontWeight . ';
                    font-style: ' . $set->titleFontStyle . ';
                    color: ' . $set->titleColor . ';
                    text-decoration: ' . $set->titleTextDecoration . ';
                    text-transform: ' . $set->titleTextTransform . ';
                    line-height: ' . $set->titleLineHeight . 'px;
                    padding: ' . $set->titlePadding->top . 'px ' . $set->titlePadding->right . 'px ' . $set->titlePadding->bottom . 'px ' . $set->titlePadding->left . 'px;
                    margin: ' . $set->titleMargin->top . 'px ' . $set->titleMargin->right . 'px ' . $set->titleMargin->bottom . 'px ' . $set->titleMargin->left . 'px;
                    letter-spacing: ' . $set->titleLetterSpacing . 'px;
                    word-spacing: ' . $set->titleWordSpacing . 'px;
                    text-align: ' . $set->titleAlignment . ';
                  }';

            $html .= '.ap-title:hover{color: ' . $set->titleHoverColor . ';}';

            if ($set->excerptFont) {
                $font = str_contains($set->excerptFont, "http")
                    ? AFX_Helper::fonts_url_to_name($set->excerptFont)
                    : $set->excerptFont;
                $font_url = str_contains($set->excerptFont, "http")
                    ? $set->excerptFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->excerptFont) . '&display=swap';

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.ap-excerpt{font-family: ' . $font . '}';
            }

            $html .= '.ap-excerpt{
                font-size: ' . $set->excerptFontSize . 'px;
                font-weight: ' . $set->excerptFontWeight . ';
                font-style: ' . $set->excerptFontStyle . ';
                color: ' . $set->excerptColor . ';
                text-decoration: ' . $set->excerptTextDecoration . ';
                text-transform: ' . $set->excerptTextTransform . ';
                line-height: ' . $set->excerptLineHeight . 'px;
                padding: ' . $set->excerptPadding->top . 'px ' . $set->excerptPadding->right . 'px ' . $set->excerptPadding->bottom . 'px ' . $set->excerptPadding->left . 'px;
                margin: ' . $set->excerptMargin->top . 'px ' . $set->excerptMargin->right . 'px ' . $set->excerptMargin->bottom . 'px ' . $set->excerptMargin->left . 'px;
                letter-spacing: ' . $set->excerptLetterSpacing . 'px;
                word-spacing: ' . $set->excerptWordSpacing . 'px;
                text-align: ' . $set->excerptAlignment . ';
              }';

            if ($set->metaFont) {
                $font = str_contains($set->metaFont, "http")
                    ? AFX_Helper::fonts_url_to_name($set->metaFont)
                    : $set->metaFont;
                $font_url = str_contains($set->metaFont, "http")
                    ? $set->metaFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->metaFont) . '&display=swap';

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.ap-meta{font-family: ' . $font . '}';
            }

            $html .= '.ap-meta{
                font-size: ' . $set->metaFontSize . 'px;
                font-weight: ' . $set->metaFontWeight . ';
                font-style: ' . $set->metaFontStyle . ';
                color: ' . $set->metaColor . ';
                text-decoration: ' . $set->metaTextDecoration . ';
                text-transform: ' . $set->metaTextTransform . ';
                line-height: ' . $set->metaLineHeight . 'px;
                padding: ' . $set->metaPadding->top . 'px ' . $set->metaPadding->right . 'px ' . $set->metaPadding->bottom . 'px ' . $set->metaPadding->left . 'px;
                margin: ' . $set->metaMargin->top . 'px ' . $set->metaMargin->right . 'px ' . $set->metaMargin->bottom . 'px ' . $set->metaMargin->left . 'px;
                letter-spacing: ' . $set->metaLetterSpacing . 'px;
                word-spacing: ' . $set->metaWordSpacing . 'px;
                text-align: ' . $set->metaAlignment . ';
              }';

            $html .= '.ap-meta a {color: ' . $set->metaColor . ';}
              .ap-meta a:hover {color: ' . $set->metaHoverColor . ';}';

            if ($set->btnFont) {
                $font = str_contains($set->btnFont, "http")
                    ? AFX_Helper::fonts_url_to_name($set->btnFont)
                    : $set->btnFont;
                $font_url = str_contains($set->btnFont, "http")
                    ? $set->btnFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->btnFont) . '&display=swap';

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.ap-btn{font-family: ' . $font . '}';
            }

            $html .= '.ap-btn{
            font-size: ' . $set->btnFontSize . 'px;
                font-weight: ' . $set->btnFontWeight . ';
                font-style: ' . $set->btnFontStyle . ';
                color: ' . $set->btnColor . ';
                background-color: ' . $set->btnBgColor . ';
                color: ' . $set->btnColor . ';
                border-radius: ' . $set->btnBorderRadius . 'px;
                text-decoration: ' . $set->btnTextDecoration . ';
                text-transform: ' . $set->btnTextTransform . ';
                line-height: ' . $set->btnLineHeight . 'px;
                padding: ' . $set->btnPadding->top . 'px ' . $set->btnPadding->right . 'px ' . $set->btnPadding->bottom . 'px ' . $set->btnPadding->left . 'px;
                margin: ' . $set->btnMargin->top . 'px ' . $set->btnMargin->right . 'px ' . $set->btnMargin->bottom . 'px ' . $set->btnMargin->left . 'px;
                letter-spacing: ' . $set->btnLetterSpacing . 'px;
                word-spacing: ' . $set->btnWordSpacing . 'px;
                text-align: ' . $set->btnAlignment . ';


             
              border-style: ' . $set->btnBorder->type . ';
              border-color: ' . $set->btnBorder->color . ';
              border-top: ' . $set->btnBorder->top . 'px;
              border-right: ' . $set->btnBorder->right . 'px;
              border-bottom: ' . $set->btnBorder->bottom . 'px;
              border-left: ' . $set->btnBorder->left . 'px;
              }';

            $html .= '.ap-btn:hover{
              background-color: ' . $set->btnBgHoverColor . ';
              color: ' . $set->btnHoverColor . ';
              }';

            $html .= '</style>';

            if ($posts_query->have_posts()) {
                $html .= '<div class="afx-ap-wrapper">';
                $html .= '<h2 class="ap-grid-title">' . $grid_title . '</h2>';
                $html .= '<div class="afx-ap-posts">';
                while ($posts_query->have_posts()) {
                    $posts_query->the_post();
                    $featured_image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'full');

                    $author = get_the_author();
                    $comments = get_comment_count(get_the_ID());

                    $cats = [];
                    if ($post_type == 'post') {
                        $term_list = wp_get_post_terms(get_the_ID(), 'category', array('fields' => 'all'));

                        foreach ($term_list as $term) {
                            $term_link = get_term_link($term);
                            $cats[] = '<a href="' . $term_link . '">' . $term->name . '</a>';
                        }
                    } else {
                        if (!empty($taxonomy)) {
                            $term_list = wp_get_post_terms(get_the_ID(), $taxonomy, array('fields' => 'all'));

                            foreach ($term_list as $term) {
                                $term_link = get_term_link($term);
                                $cats[] = '<a href="' . $term_link . '">' . $term->name . '</a>';
                            }
                        }
                    }

                    $html .= '<div class="ap-post-single">
                        <div class="ap-image-cover">
                        <img
                            decoding="async"
                            src="' . (is_array($featured_image) ? $featured_image[0] : 'https://placehold.co/900x600/orange/FFFFFF/png?text=Placeholder+Image') . '"
                            alt="' . get_the_title() . '"
                            class="ap-featured-img"
                        />
                        <div class="ap-date">' . get_the_date('d M') . '</div>
                        </div>
 
                        <div class="ap-post-meta">
                            <a href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">
                            <svg
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path
                                d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                                />
                            </svg>
                            <span class="ap-meta">' . $author . '</span>
                            </a>

                            <a href="' . get_the_permalink() . '">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                ></path>
                            </svg>
                            <span class="ap-meta">' . $comments['approved'] . ' Comments</span>
                            </a>
                        </div>
                        <div class="ap-post-content">
                            <p class="ap-cats ap-meta">' . join(" $set->postCatSeparator ", $cats) . ' </p>
                            <a href="' . get_the_permalink() . '">
                                <h3 class="ap-title">' . get_the_title() . '</h3>
                            </a>
                            <p class="ap-excerpt">' . get_the_excerpt() . '</p>
                            <a href="' . get_the_permalink() . '" class="ap-btn">' . $set->postBtnText . '</a>
                        </div>
                        </div>';
                }
                $html .= '</div>';
                $html .= '</div>';
            }


            //print_r($set);

            return $html;
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
