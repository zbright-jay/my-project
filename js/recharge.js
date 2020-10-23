$(function () {
  $(".recharge_tab li").each(function (index) {
    $(this).click(function () {
      $(".recharge_tab li").removeClass("on");
      $(this).addClass("on");
      $(".list_box").css({
        display: "none",
      });
      $(".list_box").eq(index).css({
        display: "block",
      });
    });
  });

  $.ajax({
    url: 'http://139.9.177.51:3333/p2p/cardList',
    type: 'get',
    data: {
      userid: JSON.parse(localStorage.userview).id
    },
    success: function (data) {
      let { code, msg } = data;
      var rel = '';
      var rel2 = '';
      if (code === 200) {
        let cardlist = data.data;
        for (let key in cardlist) {
          rel += `<option value="${cardlist[key].id}">
                        ${cardlist[key].bankName} ${cardlist[key].cardNumber}(${cardlist[key].branchName}) 
                      </option>`;
          rel2 += `<tr>
                    <th scope="row"><span> ${cardlist[key].bankName}</span></th>
                    <td>${JSON.parse(localStorage.userview).username}</td>
                    <td>${cardlist[key].cardNumber}</td>
                    <td>${cardlist[key].branchName}</td>
                 </tr>`
          $('#bank').html(rel);
          $('table tbody').html(rel2);
        }
      } else if (code === 500) {
        console.log(msg);
      }
    }
  })

  $('.rechargeBtn').click(function () {
    console.log($('#bank').val());
    $.ajax({
      url: 'http://139.9.177.51:3333/p2p/charge',
      type: 'post',
      data: {
        userid: JSON.parse(localStorage.userview).id,
        money: $('.money').val(),
        cardid: $('#bank').val()
      },
      success: function (data) {
        let { msg, code } = data;
        if (code === 200) {
          alert(msg);
          location.href = '/index.html#personal_center';
        } else if (code === 500) {
          alert(msg);
        }
      }
    })
  })
});
