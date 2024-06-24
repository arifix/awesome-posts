<?php

class AFX_Deactivator
{
    public static function deactivate()
    {
        self::delete_db();
    }

    public static function delete_db()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;

        $wpdb->query($wpdb->prepare("DROP TABLE IF EXISTS %i", $table_name));
        delete_option("afx_db_version");
        delete_option("afx_grid_settings");
    }
}
