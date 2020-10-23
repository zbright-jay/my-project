$(document).ready(function () {
  $(document).scroll(function () {
    let s_top = $(document).scrollTop();
    if (s_top > 500) {
      $("#mask_t").css({ display: "block" });
      $("#myform").appendTo($("#mask_t"));
      $("#myform").css({
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      });
      $(".totop").css({
        display: "block",
      });
    } else {
      $("#mask_t").css({ display: "none" });
      $("#myform").prependTo($("#car"));
      $("#myform").css({
        position: "relative",
        left: "",
        top: "",
        transform: "",
      });
      $(".totop").css({
        display: "none",
      });
    }
  });
  $(".list2>li").find(".m_content").hide();
  $("#man_cloth .list2>li:first").find(".m_content").show();
  $("#woman_cloth .list2>li:first").find(".m_content").show();
  $(".list2>li").click(function () {
    $(this).find(".m_content").slideToggle(500);
    $(this).siblings("li").find(".m_content").slideUp(500);
  });

  $("#woman_cloth .list1 li").each(function (index) {
    $(this).click(function () {
      $("#woman_cloth .list1 li.on").removeClass("on"); //注意这里
      $(this).addClass("on"); //注意这里
      $("#woman_cloth .list_box").removeClass("active");
      $("#woman_cloth .list_box").eq(index).addClass("active");
    });
  });

  $("#man_cloth .list1 li").each(function (index) {
    $(this).click(function () {
      $("#man_cloth .list1 li.on").removeClass("on"); //注意这里
      $(this).addClass("on"); //注意这里
      $("#man_cloth .list_box").removeClass("active");
      $("#man_cloth .list_box").eq(index).addClass("active");
    });
  });
  $(".totop").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  let flag=true;
  $(".like").click(function () {
   console.log(flag)
    if(flag){
      $(this).find('img').attr('src',"./images/爱心2.png");
      $(this).find('p').text('取消收藏'); 
    }else{
      $(this).find('img').attr('src',"./images/爱心.png")
      $(this).find('p').text('收藏店铺'); 
    }
    flag=!flag;
  });
});
