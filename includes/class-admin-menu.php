<?php

if (!defined('ABSPATH')) exit; // Exit if accessed directly 

class ARIFIX_AP_Admin_Menu
{
    public function __construct()
    {
        add_action('admin_menu', [$this, 'arifix_ap_create_admin_menu']);
    }

    public function arifix_ap_create_admin_menu()
    {
        $capability = 'manage_options';
        $slug = 'awesome-posts';

        add_menu_page(
            'Awesome Posts',
            'Awesome Posts',
            $capability,
            $slug,
            [$this, 'arifix_ap_menu_page_template'],
            'dashicons-screenoptions'
        );
    }

    public function arifix_ap_menu_page_template()
    {
        echo '<div id="afx-ap-app"></div>';
    }
}
new ARIFIX_AP_Admin_Menu();
