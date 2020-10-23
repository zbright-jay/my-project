$(function () {
  $("input.user").on("blur", checkuser);
  $("input.pwd").on("blur", checkpwd);
  $("input.email").on("blur", checkmail);
  $("input.nickname").on("blur", checknickname);

  // 用户名验证
  function checkuser() {
    let flag = false;
    let val = $("input.user").val();
    let reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,16}$/; /* 4到16位（字母，数字，下划线，减号，中文） */
    if (!val) {
      $("input.user").css({
        border: "2px solid red",
      });
      $(".usermsg").css({ color: "red" }).html("用户名为空！");
    } else if (reg.test(val)) {
      $.ajax({
        url: 'http://139.9.177.51:3333/p2p/accrepeat',
        type: 'post',
        async: false,
        data: {
          username: $('input.user').val()
        },
        success: function (data) {
          let code = data.code;
          let msg = data.msg;
          if (code === 200) {
            $("input.user").css({
              border: "2px solid green",
            });
            $(".usermsg").html("");
            flag = true;
          } else if (code === 500) {
            $(".usermsg").css({ color: "red" }).html(msg);
          }
        }
      })
    } else {
      $("input.user").css({
        border: "2px solid red",
      });
      $(".usermsg")
        .css({ color: "red" })
        .html("4到16位（字母，数字，下划线，减号，中文）！");
    }
    return flag;
  }

  // 密码验证
  function checkpwd() {
    let flag = false;
    let val = $('input.pwd').val();
    let reg = /^(\w){6,20}$/ /* 输入6-20个字母、数字、下划线 */
    if (!val) {
      $("input.pwd").css({
        border: "2px solid red",
      });
      $(".pwdmsg").css({ color: "red" }).html("密码为空！");
    } else if (reg.test(val)) {
      $("input.pwd").css({
        border: "2px solid green",
      });
      $(".pwdmsg").html("");
      flag = true;
    } else {
      $("input.pwd").css({
        border: "2px solid red",
      });
      $(".pwdmsg")
        .css({ color: "red" })
        .html("输入6-20个字母、数字、下划线！");
    }
    return flag;
  }

  // 邮箱验证
  function checkmail() {
    let flag = false;
    let val = $('input.email').val();
    let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
    if (!val) {
      $("input.email").css({
        border: "2px solid red",
      });
      $(".mailmsg").css({ color: "red" }).html("邮箱为空！");
    } else if (reg.test(val)) {
      $("input.email").css({
        border: "2px solid green",
      });
      $(".mailmsg").html("");
      flag = true;
    } else {
      $("input.email").css({
        border: "2px solid red",
      });
      $(".mailmsg")
        .css({ color: "red" })
        .html("邮箱格式错误！");
    }
    return flag;
  }

  // 昵称验证
  function checknickname() {
    let flag = false;
    let val = $('input.nickname').val();
    let reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,16}$/;
    if (!val) {
      $("input.nickname").css({
        border: "2px solid red",
      });
      $(".nicknamemsg").css({ color: "red" }).html("昵称为空！");
    } else if (reg.test(val)) {
      $("input.nickname").css({
        border: "2px solid green",
      });
      $(".nicknamemsg").html("");
      flag = true;
    } else {
      $("input.nickname").css({
        border: "2px solid red",
      });
      $(".nicknamemsg")
        .css({ color: "red" })
        .html("4到16位（字母，数字，下划线，减号，中文）！");
    }
    return flag;
  }

  // 点击注册按钮验证
  $('.reg_btn').on('click', function () {
    let arr = [checkuser, checkpwd, checkmail, checknickname];
    let arr2 = arr.map(function (rel) {
      return rel();
    })
    console.log(arr2);
    let result = arr2.every(function (v) {
      return v;
    })
    if (result) {
      $.ajax({
        url: 'http://139.9.177.51:3333/p2p/reg',
        type: 'post',
        data: {
          username: $('input.user').val(),
          pwd: $('input.pwd').val(),
          email: $('input.email').val(),
          nickname: $('input.nickname').val()
        },
        success: function (data) {
          let { code, msg } = data;
          if (code === 200) {
            alert(msg);
            location.href = '/login.html';
          } else if (code === 500) {
            alert(msg);
          }
        }
      })
    } else {
      alert('注册信息有误！');
    }
  })
});
