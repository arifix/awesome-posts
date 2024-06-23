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

        $result = $wpdb->get_row($wpdb->prepare("SELECT * FROM %i WHERE id = %d", $table_name, $id));

        if ($result !== null) {
            $grid_title = $result->title;
            $settings = $result->settings;
            $set = json_decode($settings);

            $post_type = $set->postType->value;
            $post_per_page = $set->postsPerPage ?: -1;
            $offset = $set->postOffset ?: 0;
            $taxonomy = !empty($set->taxonomy) ? $set->taxonomy->value : "";
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
            $start_date = !empty($set->postStartDate) ? explode('T', $set->postStartDate[0])[0] : "";
            $end_date = !empty($set->postEndDate) ? explode('T', $set->postEndDate[0])[0] : "";

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
            $found_posts =  $posts_query->found_posts;
            $total_posts =  $found_posts - $offset;

            $html = '<style>
                    .afx-ap-wrapper {
                    background-color: ' . $set->gridBgColor . ';
                    padding: ' . $set->gridPadding->top . 'px ' . $set->gridPadding->right . 'px ' . $set->gridPadding->bottom . 'px ' . $set->gridPadding->left . 'px;
                    margin: ' . $set->gridMargin->top . 'px ' . $set->gridMargin->right . 'px ' . $set->gridMargin->bottom . 'px ' . $set->gridMargin->left . 'px;
                }

                .afx-ap-wrapper .afx-ap-posts {
                    gap: ' . $set->gridGap . 'px;
                }

                .afx-ap-wrapper .ap-date {
                    background-color: ' . $set->btnBgColor . ';
                    color: ' . $set->btnColor . ';
                }

                .afx-ap-wrapper .afx-ap-posts {
                    grid-template-columns: repeat(' . $set->gridColumnsD . ', 1fr);
                }

                @media screen and (max-width: 991px) {
                    .afx-ap-wrapper .afx-ap-posts {
                        grid-template-columns: repeat(' . $set->gridColumnsT . ', 1fr);
                    }
                }

                @media screen and (max-width: 767px) {
                    .afx-ap-wrapper .afx-ap-posts {
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

            $html .= '.afx-ap-wrapper .ap-grid-title{
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

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.afx-ap-wrapper .ap-title{font-family: ' . $font . '}';
            }

            $html .= '.afx-ap-wrapper .ap-title{
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

            $html .= '.afx-ap-wrapper .ap-title:hover{color: ' . $set->titleHoverColor . ';}';

            if ($set->excerptFont) {
                $font = str_contains($set->excerptFont, "http")
                    ? AFX_Helper::fonts_url_to_name($set->excerptFont)
                    : $set->excerptFont;
                $font_url = str_contains($set->excerptFont, "http")
                    ? $set->excerptFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->excerptFont) . '&display=swap';

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.afx-ap-wrapper .ap-excerpt{font-family: ' . $font . '}';
            }

            $html .= '.afx-ap-wrapper .ap-excerpt{
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

            $html .= '.afx-ap-wrapper .ap-featured-img{height: ' . $set->postImageHeight . 'px;}';

            if ($set->metaFont) {
                $font = str_contains($set->metaFont, "http")
                    ? AFX_Helper::fonts_url_to_name($set->metaFont)
                    : $set->metaFont;
                $font_url = str_contains($set->metaFont, "http")
                    ? $set->metaFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->metaFont) . '&display=swap';

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.afx-ap-wrapper .ap-meta{font-family: ' . $font . '}';
            }

            $html .= '.afx-ap-wrapper .ap-meta{
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

            $html .= '.afx-ap-wrapper .ap-meta a {color: ' . $set->metaColor . ';}
              .afx-ap-wrapper .ap-meta a:hover {color: ' . $set->metaHoverColor . ';}';

            if ($set->btnFont) {
                $font = str_contains($set->btnFont, "http")
                    ? AFX_Helper::fonts_url_to_name($set->btnFont)
                    : $set->btnFont;
                $font_url = str_contains($set->btnFont, "http")
                    ? $set->btnFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->btnFont) . '&display=swap';

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.afx-ap-wrapper .ap-btn{font-family: ' . $font . '}';
            }

            $html .= '.afx-ap-wrapper .ap-btn{
                font-size: ' . $set->btnFontSize . 'px;
                font-weight: ' . $set->btnFontWeight . ';
                font-style: ' . $set->btnFontStyle . ';
                color: ' . $set->btnColor . ';
                background-color: ' . $set->btnBgColor . ';
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
                border-top-width: ' . $set->btnBorder->top . 'px;
                border-right-width: ' . $set->btnBorder->right . 'px;
                border-bottom-width: ' . $set->btnBorder->bottom . 'px;
                border-left-width: ' . $set->btnBorder->left . 'px;
              }';

            $html .= '.afx-ap-wrapper .ap-btn:hover{
              background-color: ' . $set->btnBgHoverColor . ';
              color: ' . $set->btnHoverColor . ';
              }';

              if ($set->btnLmFont) {
                $font = str_contains($set->btnLmFont, "http")
                    ? AFX_Helper::fonts_url_to_name($set->btnLmFont)
                    : $set->btnLmFont;
                $font_url = str_contains($set->btnLmFont, "http")
                    ? $set->btnLmFont
                    : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->btnLmFont) . '&display=swap';

                $html .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.afx-ap-wrapper .ap-more-btn{font-family: ' . $font . '}';
            }

            $html .= '.afx-ap-wrapper .ap-more-btn{
                font-size: ' . $set->btnLmFontSize . 'px;
                font-weight: ' . $set->btnLmFontWeight . ';
                font-style: ' . $set->btnLmFontStyle . ';
                color: ' . $set->btnLmColor . ';
                background-color: ' . $set->btnLmBgColor . ';
                border-radius: ' . $set->btnLmBorderRadius . 'px;
                text-decoration: ' . $set->btnLmTextDecoration . ';
                text-transform: ' . $set->btnLmTextTransform . ';
                line-height: ' . $set->btnLmLineHeight . 'px;
                padding: ' . $set->btnLmPadding->top . 'px ' . $set->btnLmPadding->right . 'px ' . $set->btnLmPadding->bottom . 'px ' . $set->btnLmPadding->left . 'px;
                letter-spacing: ' . $set->btnLmLetterSpacing . 'px;
                word-spacing: ' . $set->btnLmWordSpacing . 'px;
                text-align: ' . $set->btnLmAlignment . ';
                border-style: ' . $set->btnLmBorder->type . ';
                border-color: ' . $set->btnLmBorder->color . ';
                border-top-width: ' . $set->btnLmBorder->top . 'px;
                border-right-width: ' . $set->btnLmBorder->right . 'px;
                border-bottom-width: ' . $set->btnLmBorder->bottom . 'px;
                border-left-width: ' . $set->btnLmBorder->left . 'px;
              }';

            $html .= '.afx-ap-wrapper .ap-more-btn:hover{
              background-color: ' . $set->btnLmBgHoverColor . ';
              color: ' . $set->btnLmHoverColor . ';
              }';
              
            $html .= '</style>';

            if ($posts_query->have_posts()) {
                $html .= '<div class="afx-ap-wrapper">';
                $html .= '<div class="ap-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>';

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
                        if (!empty($taxonomy2)) {
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
                $html .= '<p style="text-align: center;"><button type="button" class="ap-more-btn" data-admin-ajax="' . admin_url("admin-ajax.php") . '" data-query="' . str_replace('"', '\'', json_encode($posts_args)) . '" data-settings="' .  str_replace('"', '\'', json_encode($set)) . '" data-query-offset="' . $offset . '" data-total-posts="' . $total_posts . '"' . ($post_per_page >= $total_posts ? 'style="display: none;"' : '') . '>Load More</button></p>';
                $html .= '</div>';
            }

            wp_reset_query();
            wp_reset_postdata();

            return $html;
        }

        return "";
    }

    function afx_posts_ajax()
    {
        $posts_args = !empty($_REQUEST['query']) ? json_decode(str_replace("\'", "\"", $_REQUEST['query']), true) : [];
        $posts_args['offset'] = isset($_REQUEST['offset']) ? $posts_args->offset + $_REQUEST['offset'] : 0;
        $set = !empty($_REQUEST['settings']) ? json_decode(str_replace("\'", "\"", $_REQUEST['settings'])) : [];

        $posts_query = new WP_Query($posts_args);

        $html = '';
        if ($posts_query->have_posts()) {
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
                    if (!empty($taxonomy2)) {
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
        }

        echo json_encode([
            'result' => $html,
        ]);

        wp_reset_query();
        wp_reset_postdata();

        die();
    }
}

new AFX_Shortcodes();
