(function ($) {
  function init() {
    const shop_count = $("#tss-wrapper").length;
    if (shop_count && $("body").hasClass("woocommerce-shop")) {
      $(
        ".woocommerce-notices-wrapper, p.woocommerce-result-count, form.woocommerce-ordering, ul.products"
      ).hide();
    }
  }
  init();

  function sendAjax(admin_ajax, action, params, successFun, beforeFun) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: `${admin_ajax}?action=${action}`,
        data: params,
        type: "POST",
        dataType: "json",
        beforeSend: (xhr) => {
          $(".pas-loader").show();
          beforeFun();
        },
        success: function (data) {
          successFun(data);
          resolve("success");
        },
        error: function (err) {
          console.log(err);
          reject("error");
        },
      });
    });
  }

  $(".tss-posts-order").on("change", async function () {
    const admin_url = $("#tss-load-more").attr("data-admin-ajax");
    const categories = $("#tss-load-more").attr("data-categories");
    const posts_per_page = $("#tss-load-more").attr("data-posts-per-page");
    const total_posts = $("#tss-load-more").attr("data-total-posts");
    const order = $(this).val();

    sendAjax(
      admin_url,
      "get_tonic-shop",
      { categories, posts_per_page, order },
      function (data) {
        $(".product-grid .product").remove();
        $(".product-grid").prepend(data.result);
        $("#tss-loader").hide();

        const current_post_count = $(".product-grid .product").length;
        if (total_posts == current_post_count) {
          $("#tss-load-more").hide();
        } else {
          $("#tss-load-more").show();
        }
      },
      function () {
        $("#tss-loader").show();
      }
    );
  });

  $("#tss-load-more").on("click", async function () {
    const admin_url = $(this).attr("data-admin-ajax");
    const categories = $(this).attr("data-categories");
    const posts_per_page = $(this).attr("data-posts-per-page");
    const offset = $(".product-grid .product").length;
    const total_posts = $(this).attr("data-total-posts");
    const order = $(".tss-posts-order").val();

    sendAjax(
      admin_url,
      "get_tonic-shop",
      { categories, posts_per_page, offset, order },
      function (data) {
        $(".product-grid .product").last().after(data.result);
        $("#tss-loader").hide();

        const current_post_count = $(".product-grid .product").length;
        if (total_posts == current_post_count) {
          $("#tss-load-more").hide();
        }

        $("#tss-load-more .spinner").remove();
      },
      function () {
        $("#tss-loader").show();
        $("#tss-load-more").prepend(`<span class="spinner"></span>`);
      }
    );
  });
})(jQuery);
