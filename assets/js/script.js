(function ($) {
  function sendAjax(admin_ajax, action, params, successFun, beforeFun) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: `${admin_ajax}?action=${action}`,
        data: params,
        type: "POST",
        dataType: "json",
        beforeSend: (xhr) => {
          $(".ap-loader").show();
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

  $(".ap-more-btn").on("click", async function () {
    const admin_url = $(this).attr("data-admin-ajax");
    const query = $(this).attr("data-query");
    const settings = $(this).attr("data-settings");
    const total_posts = parseInt($(this).attr("data-total-posts"));
    const offset =
      parseInt(
        $(this).parents(".afx-ap-wrapper").find(".ap-post-single").length
      ) + parseInt($(this).attr("data-query-offset"));
      const _wpnonce = $(this).attr("data-wp-nonce");

    const self = $(this);

    sendAjax(
      admin_url,
      "get_awesome-posts",
      { query, settings, offset, _wpnonce },
      function (data) {
        self
          .parents(".afx-ap-wrapper")
          .find(".ap-post-single")
          .last()
          .after(data.result);
        $(".ap-loader").hide();

        const current_post_count = parseInt(
          self.parents(".afx-ap-wrapper").find(".ap-post-single").length
        );

        if (total_posts <= current_post_count) {
          $(".ap-more-btn").hide();
        }

        $(".ap-more-btn .spinner").remove();
      },
      function () {
        $(".ap-loader").show();
        $(".ap-more-btn").prepend(`<span class="spinner"></span>`);
      }
    );
  });
})(jQuery);
