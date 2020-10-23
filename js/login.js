$(function () {
  $(".login_btn").click(function () {
    $.ajax({
      url: "http://139.9.177.51:3333/p2p/login",
      type: "post",
      data: {
        username: $(".user").val(),
        pwd: $('.pwd').val()
      },
      success: function (data) {
        if (data.code === 200) {
          alert(data.msg);
          console.log(data.data);
          localStorage.setItem('userview', JSON.stringify(data.data));
          location.href = '/index.html';
        } else if (data.code === 500) {
          alert(data.msg);
        }
      },
    });
  });
});
