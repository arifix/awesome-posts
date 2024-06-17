(function ($) {
  function init() {
    const shop_count = $("#afx-ap-wrapper").length;
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

  $(".afx-ap-posts-order").on("change", async function () {
    const admin_url = $("#afx-ap-load-more").attr("data-admin-ajax");
    const categories = $("#afx-ap-load-more").attr("data-categories");
    const posts_per_page = $("#afx-ap-load-more").attr("data-posts-per-page");
    const total_posts = $("#afx-ap-load-more").attr("data-total-posts");
    const order = $(this).val();

    sendAjax(
      admin_url,
      "get_awesome-posts",
      { categories, posts_per_page, order },
      function (data) {
        $(".product-grid .product").remove();
        $(".product-grid").prepend(data.result);
        $("#afx-ap-loader").hide();

        const current_post_count = $(".product-grid .product").length;
        if (total_posts == current_post_count) {
          $("#afx-ap-load-more").hide();
        } else {
          $("#afx-ap-load-more").show();
        }
      },
      function () {
        $("#afx-ap-loader").show();
      }
    );
  });

  $("#afx-ap-load-more").on("click", async function () {
    const admin_url = $(this).attr("data-admin-ajax");
    const categories = $(this).attr("data-categories");
    const posts_per_page = $(this).attr("data-posts-per-page");
    const offset = $(".product-grid .product").length;
    const total_posts = $(this).attr("data-total-posts");
    const order = $(".afx-ap-posts-order").val();

    sendAjax(
      admin_url,
      "get_awesome-posts",
      { categories, posts_per_page, offset, order },
      function (data) {
        $(".product-grid .product").last().after(data.result);
        $("#afx-ap-loader").hide();

        const current_post_count = $(".product-grid .product").length;
        if (total_posts == current_post_count) {
          $("#afx-ap-load-more").hide();
        }

        $("#afx-ap-load-more .spinner").remove();
      },
      function () {
        $("#afx-ap-loader").show();
        $("#afx-ap-load-more").prepend(`<span class="spinner"></span>`);
      }
    );
  });
})(jQuery);
