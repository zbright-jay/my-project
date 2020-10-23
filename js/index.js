$(function () {
  $("a.server").hover(
    function () {
      $("img.server_img").css({
        opacity: 1,
      });
    },
    function () {
      $("img.server_img").css({
        opacity: 0,
      });
    }
  );

  let local = JSON.parse(localStorage.getItem('userview'));
  let islogin = local ? true : false;

  if (islogin) {
    $('.link_login').html(`<a href="#personal_center">${local.username}</a>`);
    $('.link_reg').html(`<a href="#">注销</a>`);
    $('li.person').css({ display: 'block' });
  } else {
    $('.link_login').html(`<a href="/login.html">登录</a>`);
    $('.link_reg').html(`<a href="/register.html">注册</a>`);
    $('li.person').css({ display: 'none' });
    $('li.borrow').css({ display: 'none' });
    $('li.invest').css({ display: 'none' });
    $('li.recharge').css({ display: 'none' });
  }

  // 为注销绑定点击事件
  $('.link_reg').on('click', 'a', function () {
    localStorage.clear();
    location.href = '/index.html';
  })

  // 当没有登录时，用户不能进入个人中心
});
