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
            __('Awesome Posts', $slug),
            __('Awesome Posts', $slug),
            $capability,
            $slug,
            [$this, 'afx_menu_page_template'],
            'dashicons-screenoptions',
            2
        );
    }

    public function afx_menu_page_template()
    {
        echo '<div id="afx-ap-app"></div>';
    }
}
new AFX_Admin_Menu();
