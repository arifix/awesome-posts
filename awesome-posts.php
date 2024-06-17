<?php

/**
 *
 * Plugin Name: Awesome Posts
 * Plugin URI: https://madebyarif.com/app/awesome-posts
 * Author: Arif Khan
 * Author URI: https://www.arif-khan.net/
 * Version: 1.0.0
 * Description: Awesome Posts
 * Text Domain: awesome-posts
 * Last Updated on: 01-25-2024, 01:07PM (GMT+0)
 *
 */

define('AFX_AP_PATH', trailingslashit(plugin_dir_path(__FILE__)));
define('AFX_AP_TABLE_NAME', 'afx_shop_data');

require_once AFX_AP_PATH . 'includes/class-rest-routes.php';
require_once AFX_AP_PATH . 'includes/class-admin-menu.php';
require_once AFX_AP_PATH . 'includes/class-enqueues.php';
require_once AFX_AP_PATH . 'includes/class-shortcodes.php';
require_once AFX_AP_PATH . 'includes/class-helper.php';

register_activation_hook(__FILE__, 'afx_activate_plugin');
function afx_activate_plugin()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-plugin-activator.php';
    AFX_Activator::activate();
}

register_uninstall_hook(__FILE__, 'afx_delete_plugin');
function afx_delete_plugin()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-plugin-deactivator.php';
    AFX_Deactivator::deactivate();
}
