$(document).ready(function () {
  $(".reg_tab li").each(function (index) {
    $(this).click(function () {
      $(".reg_tab li").removeClass("on");
      $(this).addClass("on");
      $(".reg_content").css({
        display: "none",
      });
      $(".reg_content").eq(index).css({
        display: "block",
      });
    });
  });

  $(".myform").validate({
    //规则制定
    rules: {
      // 通过input标签中的name的值进行获取
      name: {
        required: true,
        isname: true,
      },
      user: {
        required: true,
        isuser: true,
      },
      pwd: {
        required: true,
        isPwd: true,
      },
      supwd: {
        required: true,
        // 判断与第一次密码输入是否相同
        equalTo: "#pwd",
      },
      mail: {
        required: true,
        ismail: true,
      },
      tel: {
        required: true,
        istel: true,
      },
    },
    // 验证规则提示信息
    messages: {
      name: {
        required: "请输入姓名",
      },
      user: {
        required: "请输入用户名",
      },
      pwd: {
        required: "请输入密码",
      },
      supwd: {
        required: "请再次输入密码",
        equalTo: "与第一次输入不符",
      },
      mail: {
        required: "请输入邮箱号",
      },
      tel: {
        required: "请输入电话号码",
      },
    },
  });

  // 自定义规则
  // 只需要修改三个地方:
  //      isPwd===>自定义名字
  //      /^[0-9]{6}$/===>正则规则
  //      "请正确填写您的邮政编码"===>提示信息
  jQuery.validator.addMethod(
    "isname",
    function (value, element) {
      var tel = /^[\u4e00-\u9fa5]{0,}$/;
      return this.optional(element) || tel.test(value);
    },
    "姓名不合法!!!"
  );

  jQuery.validator.addMethod(
    "isuser",
    function (value, element) {
      var tel = /^\w{3,20}$/;
      return this.optional(element) || tel.test(value);
    },
    "用户名不合法!!!"
  );

  jQuery.validator.addMethod(
    "isPwd",
    function (value, element) {
      var tel = /^[a-zA-Z]\w{5,17}$/;
      return this.optional(element) || tel.test(value);
    },
    "密码不合法!!!"
  );

  jQuery.validator.addMethod(
    "ismail",
    function (value, element) {
      var tel = /^[a-zA-Z0-9]\w{5,11}$/;
      return this.optional(element) || tel.test(value);
    },
    "邮箱号不合法!!!"
  );

  jQuery.validator.addMethod(
    "istel",
    function (value, element) {
      var tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      return this.optional(element) || tel.test(value);
    },
    "电话号码不合法!!!"
  );
  //   input propertychange(在input框中输入，就触发事件)
  $("#pwd").bind("input propertychange", function () {
    let ilen = $(this).val().length;
    if (ilen >= 5 && ilen <= 10) {
      $("span").hide();
      $(".low").css({ display: "inline-block" });
      $(".view").show();
      $(".view").text("密码强度弱");
    }
    if (ilen > 10 && ilen <= 14) {
      $("span").hide();
      $(".low").css({ display: "inline-block" });
      $(".mid").css({ display: "inline-block" });
      $(".view").show();
      $(".view").text("密码强度中");
    }
    if (ilen > 14) {
      $("span").hide();
      $(".low").css({ display: "inline-block" });
      $(".mid").css({ display: "inline-block" });
      $(".strong").css({ display: "inline-block" });
      $(".view").show();
      $(".view").text("密码强度高");
    }
    if(ilen<5){
        $('span').hide();
    }
  });
});
