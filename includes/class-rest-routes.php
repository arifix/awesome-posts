<?php

class AFX_Rest_Routes
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'afx_create_rest_routes']);
    }

    public function afx_create_rest_routes()
    {
        register_rest_route('afx-ap/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [$this, 'afx_get_settings'],
            'permission_callback' => [$this, 'afx_get_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [$this, 'afx_save_settings'],
            'permission_callback' => [$this, 'afx_save_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/settings/reset', [
            'methods' => 'POST',
            'callback' => [$this, 'afx_reset_settings'],
            'permission_callback' => [$this, 'afx_save_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/settings/backup', [
            'methods' => 'POST',
            'callback' => [$this, 'afx_backup_settings'],
            'permission_callback' => [$this, 'afx_save_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/settings/restore', [
            'methods' => 'POST',
            'callback' => [$this, 'afx_restore_settings'],
            'permission_callback' => [$this, 'afx_save_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/activation', [
            'methods' => 'POST',
            'callback' => [$this, 'afx_check_activation'],
            'permission_callback' => [$this, 'afx_save_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/categories', [
            'methods' => 'GET',
            'callback' => [$this, 'afx_get_categories'],
            'permission_callback' => [$this, 'afx_get_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/shop/all', [
            'methods' => 'GET',
            'callback' => [$this, 'afx_get_shop_all'],
            'permission_callback' => [$this, 'afx_get_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/shop/get', [
            'methods' => 'POST',
            'callback' => [$this, 'afx_get_shop_single'],
            'permission_callback' => [$this, 'afx_get_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/shop/new', [
            'methods' => 'POST',
            'callback' => [$this, 'afx_create_shop'],
            'permission_callback' => [$this, 'afx_get_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/shop/delete', [
            'methods' => 'POST',
            'callback' => [$this, 'afx_delete_shop'],
            'permission_callback' => [$this, 'afx_get_settings_permission']
        ]);

        register_rest_route('afx-ap/v1', '/products', [
            'methods' => 'GET',
            'callback' => [$this, 'afx_get_products'],
            'permission_callback' => [$this, 'afx_get_settings_permission']
        ]);
    }

    public function afx_get_settings()
    {
        $settings = get_option('afx_shop_settings');
        $response = [
            'settings' => $settings
        ];

        return rest_ensure_response($response);
    }

    public function afx_get_settings_permission()
    {
        return true;
    }

    public function afx_save_settings($req)
    {
        if (is_string($req)) {
            $data = json_decode($req);
            $settings = json_encode($data->settings);
        } else {
            $settings = sanitize_text_field($req['settings']);
        }

        $data = $this->afx_get_settings();
        if ($data->data['settings']) {
            $existing_setting = $data->data['settings'];
            $new_settings = json_encode(array_merge(json_decode($existing_setting, true), json_decode($settings, true)));
        } else {
            $new_settings = $settings;
        }

        update_option('afx_shop_settings', $new_settings);

        return ['message' => 'Setting Saved Successfully'];
    }

    public function afx_reset_settings($req)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;

        $wpdb->query("TRUNCATE TABLE $table_name");
        update_option('afx_shop_settings', "");

        return ['message' => 'Setting Reset Successfully'];
    }

    public function afx_backup_settings()
    {
        global $wpdb;

        $settings = get_option('afx_shop_settings');
        $setting_obj = json_decode($settings);

        $fonts = [];
        if (isset($setting_obj->fonts)) {
            foreach ($setting_obj->fonts as $key => $url) {
                if (strlen($key) > 10) {
                    $fonts[$key] = $url;
                }
            }

            $setting_obj->fonts = $fonts;
        }

        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;
        $results = $wpdb->get_results("SELECT * FROM `$table_name` WHERE 1");

        $shops = [];
        if (count($results) > 0) {
            foreach ($results as $res) {
                $shops[$res->title] = $res->settings;
            }
        }

        $setting_obj->shops = json_encode($shops);

        $upload_dir = wp_get_upload_dir();
        $file_name = 'afx_shop_backup.json';
        $upload_url = $upload_dir['basedir'] . '/' . $file_name;
        file_put_contents($upload_url, json_encode($setting_obj));

        $file_url = $upload_dir['baseurl'] . '/' . $file_name;
        return ['message' => 'Setting Reset Successfully', 'file_name' => $file_name, 'file_url' => $file_url];
    }

    public function afx_restore_settings($req)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;

        $file_id = sanitize_text_field($req['file_id']);
        $json_url = sanitize_text_field($req['json_url']);
        $request = wp_remote_get($json_url);
        $new_settings =  wp_remote_retrieve_body($request);

        $settings_obj = json_decode($new_settings);
        $shops = $settings_obj->shops;
        unset($settings_obj->shops);

        $shop_obj = json_decode($shops);
        if (count((array) $shop_obj) > 0) {
            $wpdb->query("TRUNCATE TABLE $table_name");

            foreach ($shop_obj as $key => $val) {
                $wpdb->insert($table_name, array(
                    'title' => $key,
                    'settings' => $val,
                    'timestamp' => time(),
                ));
            }
        }

        update_option('afx_shop_settings', json_encode($settings_obj));

        wp_delete_attachment($file_id);
        return ['message' => 'Setting Restored Successfully'];
    }

    public function afx_save_settings_permission()
    {
        return current_user_can('manage_options');
    }

    public function afx_check_activation($req)
    {
        $activation_key = sanitize_text_field($req['activation_key']);

        $from_site = rtrim(str_replace(array('http://', 'https://', 'www.'), array(''), site_url()), '/');

        $response = wp_remote_get(VERIFICATION_URL . 'verify_purchase.php?activationKey=' . $activation_key . '&fromSite=' . $from_site);
        $body = wp_remote_retrieve_body($response);
        $res = json_decode($body);

        if ($res->status == 'success') {
            if (date('Y-m-d') > $res->expiry_date) {
                return ['message' => 'Activation Key Expired', 'status' => false];
            } else {
                $activation = [
                    'customer_name' => $res->customer_name,
                    'customer_email' => $res->customer_email,
                    'purchase_date' => $res->purchase_date,
                    'expiry_date' => $res->expiry_date,
                    'activation_key' => $res->activation_key,
                    'status' => true
                ];

                $this->afx_save_settings(json_encode(['settings' => ['activation' => $activation]]));

                return [
                    'message' => 'Valid Activation Key',
                ];
            }
        } else {
            return ['message' => 'Invalid Activation Key', 'status' => false];
        }
    }

    public function afx_get_categories()
    {
        $pro_args = array(
            'taxonomy' => 'product_cat',
            'orderby' => 'name',
            'show_count' => 1,
            'hierarchical' => 1
        );

        $pro_categories = get_categories($pro_args);

        $pro_cats = [];
        if (count($pro_categories) > 0) {
            foreach ($pro_categories as $cat) {
                $pro_cats[] = ['value' => $cat->slug, 'label' => $cat->name];
            }
        }

        return $pro_cats;
    }

    public function afx_get_shop_all()
    {
        global $wpdb;

        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;
        $results = $wpdb->get_results("SELECT * FROM `$table_name` WHERE 1");

        return $results;
    }

    public function afx_get_shop_single($req)
    {
        global $wpdb;

        $shop_id = $req['shop_id'];

        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;
        $results = $wpdb->get_results("SELECT * FROM `$table_name` WHERE `id`='$shop_id'");

        return $results[0];
    }

    public function afx_create_shop($req)
    {
        global $wpdb;

        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;

        $shop_id = $req['shop_id'];
        $title = $req['shop_title'];
        $settings = $req['shop_settings'];

        if ($shop_id) {
            $wpdb->update(
                $table_name,
                array(
                    'title' => $title,
                    'settings' => $settings,
                ),
                array(
                    "id" => $shop_id
                )
            );
            $message = 'Shop Updated Successfully';
        } else {
            $wpdb->insert($table_name, array(
                'title' => $title,
                'settings' => $settings,
                'timestamp' => time(),
            ));

            $shop_id = $wpdb->insert_id;
            $message = 'Shop Created Successfully';
        }

        return ['shop_id' => $shop_id, 'message' => $message];
    }

    public function afx_delete_shop($req)
    {
        global $wpdb;

        $table_name = $wpdb->prefix . AFX_AP_TABLE_NAME;
        $wpdb->delete($table_name, array('id' => $req['del_id']));

        return ['message' => 'Shop Deleted Successfully'];
    }

    public function afx_get_products()
    {
        $categories = isset($_GET['categories']) ? explode(",", $_GET['categories']) : [];

        $product_args = array(
            'post_type' => 'product',
            'posts_per_page' => 12,
            'order' => 'DESC',
            'orderby' => 'date',
            'post_status' => 'publish',
        );

        if (count($categories) > 0) {
            $product_args['tax_query'] = array(
                array(
                    'taxonomy' => 'product_cat',
                    'field'    => 'slug',
                    'terms'    => $categories,
                    'operator'  => 'IN'
                ),
            );
        }

        $products = [];
        $product_query = new WP_Query($product_args);
        if ($product_query->have_posts()) {
            while ($product_query->have_posts()) : $product_query->the_post();
                $price = get_post_meta(get_the_ID(), '_regular_price', true);
                $image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), "full");

                $products[] = [
                    'title' => get_the_title(),
                    'short_des' => get_the_excerpt(),
                    'price' => $price,
                    'image' => $image[0],
                    'url' => get_the_permalink()
                ];

            endwhile;
        }

        return json_encode($products);
    }
}

new AFX_Rest_Routes();
