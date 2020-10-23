$(document).ready(function () {
  $("main ul li").each(function (index) {
    $(this).on('touchstart',function () {
        $("main ul li").css({
            backgroundColor:'#f8f8f8',
            color:'#000'
        })
        $(this).css({
            backgroundColor:'#fff',
            color:'#e43130'
        })
      let divp = parseInt($(".classify_box").css("paddingTop"));
      let len = ($(".classify_box").height() + divp) * index;
      $(".classify_content").animate(
        {
          scrollTop: len,
        },
        500
      );
    });
  });
  let arr_title = [
    "热门推荐",
    "手机数码",
    "家用电器",
    "电脑办公",
    "计生情趣",
    "美妆护肤",
    "个护清洁",
    "汽车生活",
    "乐购超市",
    "运动户外",
    "图书音像",
    "酒水饮料",
  ];
  //   jquery数组遍历
  $.each(arr_title, function (index, value) {
    $(".classify_box .title").eq(index).text(value);
    $("main ul li").eq(index).text(value);
  });
});
