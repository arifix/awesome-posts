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

        $wpdb->query("DROP TABLE IF EXISTS " . $wpdb->prefix . AFX_AP_TABLE_NAME);
        delete_option("afx_db_version");
    }
}
