<?php

if (!defined('ABSPATH')) exit; // Exit if accessed directly 

$css = '<style>';

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' {
background-color: ' . $set->gridBgColor . ';
padding: ' . $set->gridPadding->top . 'px ' . $set->gridPadding->right . 'px ' . $set->gridPadding->bottom . 'px ' . $set->gridPadding->left . 'px;
margin: ' . $set->gridMargin->top . 'px ' . $set->gridMargin->right . 'px ' . $set->gridMargin->bottom . 'px ' . $set->gridMargin->left . 'px;
}

.arifix-ap-wrapper.afx-grid-' . $id . ' .arifix-ap-posts {
gap: ' . $set->gridGap . 'px;
}

.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-date {
background-color: ' . $set->btnBgColor . ';
color: ' . $set->btnColor . ';
}

.arifix-ap-wrapper.afx-grid-' . $id . ' .arifix-ap-posts {
grid-template-columns: repeat(' . $set->gridColumnsD . ', 1fr);
}

@media screen and (max-width: 991px) {
.arifix-ap-wrapper.afx-grid-' . $id . ' .arifix-ap-posts {
    grid-template-columns: repeat(' . $set->gridColumnsT . ', 1fr);
}
}

@media screen and (max-width: 767px) {
.arifix-ap-wrapper.afx-grid-' . $id . ' .arifix-ap-posts {
    grid-template-columns: repeat(' . $set->gridColumnsM . ', 1fr);
}
}';

if ($set->shFont) {
    $font = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->shFont, "http")
        ? ARIFIX_AP_Helper::fonts_url_to_name($set->shFont)
        : $set->shFont;
    $font_url = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->shFont, "http")
        ? $set->shFont
        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->shFont) . '&display=swap';

    $css .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-grid-title{font-family: ' . $font . '}';
}

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-grid-title{
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
    $font = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->titleFont, "http")
        ? ARIFIX_AP_Helper::fonts_url_to_name($set->titleFont)
        : $set->titleFont;
    $font_url = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->titleFont, "http")
        ? $set->titleFont
        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->titleFont) . '&display=swap';

    $css .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-title{font-family: ' . $font . '}';
}

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-title{
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

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-title:hover{color: ' . $set->titleHoverColor . ';}';

if ($set->excerptFont) {
    $font = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->excerptFont, "http")
        ? ARIFIX_AP_Helper::fonts_url_to_name($set->excerptFont)
        : $set->excerptFont;
    $font_url = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->excerptFont, "http")
        ? $set->excerptFont
        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->excerptFont) . '&display=swap';

    $css .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-excerpt{font-family: ' . $font . '}';
}

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-excerpt{
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

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-featured-img{height: ' . $set->postImageHeight . 'px;}';

if ($set->metaFont) {
    $font = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->metaFont, "http")
        ? ARIFIX_AP_Helper::fonts_url_to_name($set->metaFont)
        : $set->metaFont;
    $font_url = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->metaFont, "http")
        ? $set->metaFont
        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->metaFont) . '&display=swap';

    $css .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-meta{font-family: ' . $font . '}';
}

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-meta{
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

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-meta a {color: ' . $set->metaColor . ';}
.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-meta a:hover {color: ' . $set->metaHoverColor . ';}';

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-post-meta svg {color: ' . $set->metaColor . ';}';

if ($set->btnFont) {
    $font = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->btnFont, "http")
        ? ARIFIX_AP_Helper::fonts_url_to_name($set->btnFont)
        : $set->btnFont;
    $font_url = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->btnFont, "http")
        ? $set->btnFont
        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->btnFont) . '&display=swap';

    $css .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-btn{font-family: ' . $font . '}';
}

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-btn{
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

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-btn:hover{
background-color: ' . $set->btnBgHoverColor . ';
color: ' . $set->btnHoverColor . ';
}';

if ($set->btnLmFont) {
    $font = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->btnLmFont, "http")
        ? ARIFIX_AP_Helper::fonts_url_to_name($set->btnLmFont)
        : $set->btnLmFont;
    $font_url = ARIFIX_AP_Helper::arifix_ap_check_string_contains($set->btnLmFont, "http")
        ? $set->btnLmFont
        : 'https://fonts.googleapis.com/css?family=' . str_replace(" ", '+', $set->btnLmFont) . '&display=swap';

    $css .= '@font-face {font-family: ' . $font . ';src: url("' . $font_url . '");}.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-more-btn{font-family: ' . $font . '}';
}

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-more-btn{
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

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-more-btn:hover{
background-color: ' . $set->btnLmBgHoverColor . ';
color: ' . $set->btnLmHoverColor . ';
}';

$css .= '.arifix-ap-wrapper.afx-grid-' . $id . ' .ap-loader div{background-color: ' . $set->btnLmBgColor . ';}';

$css .= '</style>';

return $css;
