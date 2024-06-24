<?php

$grid_ajax .= '<div class="ap-post-single">
    <div class="ap-image-cover">
    <img
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

return $grid_ajax;
