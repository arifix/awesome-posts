<?php

class TSS_Enqueues
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', [$this, 'afx_admin_enqueue']);
        add_action('wp_enqueue_scripts', [$this, 'afx_frontend_enqueue']);
    }

    function afx_admin_enqueue($hook)
    {
        if ($hook == 'toplevel_page_tss-shop') {
            wp_enqueue_script('tss-admin-build', plugin_dir_url(__FILE__) . '../build/index.js', ['jquery', 'wp-element'], wp_rand(), true);
            wp_localize_script('tss-admin-build', 'tssApp', [
                'apiUrl' => home_url('/wp-json'),
                'nonce' => wp_create_nonce('wp_rest'),
            ]);

            wp_enqueue_style('tss-admin-style', plugin_dir_url(__FILE__) . '../build/index.css');
        }
    }

    function afx_frontend_enqueue()
    {
        wp_enqueue_script('tss-frontend-script', plugin_dir_url(__FILE__) . '../assets/js/script.js', ['jquery'], '1.0.0', true);
        wp_enqueue_style('tss-frontend-style', plugin_dir_url(__FILE__) . '../assets/css/style.css');
    }
}

new TSS_Enqueues();
