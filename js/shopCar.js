$(document).ready(function () {
  $("ul li input").change(function () {
    if ($("ul li input").length == $("ul li input:checked").length) {
      $("#total_c").prop("checked", $(this).prop("checked"));
    } else {
      $("#total_c").prop("checked", false);
    }
    total();
  });

  $("#total_c").change(function () {
    $("input").prop("checked", $(this).prop("checked"));
    total();
  });

  //   增加数量
  $(".add").on("touchstart", function () {
    let single = parseInt($(this).siblings(".num").text());
    single += 1;
    $(this).siblings(".num").text(single);
    total();
  });
  //   减少数量
  $(".reduce").on("touchstart", function () {
    let single = $(this).siblings(".num").text();
    if (single > 1) {
      let single = parseInt($(this).siblings(".num").text());
      single -= 1;
      $(this).siblings(".num").text(single);
    }
    total();
  });

  //  计算总数量/总价函数
  function total() {
    let t_num = 0;
    let t_price=0;
    $("ul li input:checked").each(function () {
      let s_num = parseInt($(this).closest("li").find(".num").text());
      let s_price = parseInt($(this).closest("li").find(".unit").text());
      t_num += s_num;
      t_price+=s_num*s_price;
    });
    $(".total_num").text(t_num);
    $('.total_price').text(t_price.toFixed(2));
  }
});
