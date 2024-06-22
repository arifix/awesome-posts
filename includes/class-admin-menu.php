<?php

class AFX_Admin_Menu
{
    public function __construct()
    {
        add_action('admin_menu', [$this, 'afx_create_admin_menu']);
    }

    public function afx_create_admin_menu()
    {
        $capability = 'manage_options';
        $slug = 'awesome-posts';

        add_menu_page(
            'Awesome Posts',
            'Awesome Posts',
            $capability,
            $slug,
            [$this, 'afx_menu_page_template'],
            'dashicons-screenoptions'
        );
    }

    public function afx_menu_page_template()
    {
        echo '<div id="afx-ap-app"></div>';
    }
}
new AFX_Admin_Menu();
