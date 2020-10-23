$(function () {
    $('.applyBtn').click(function () {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/borrow',
            type: 'post',
            data: {
                userid: JSON.parse(localStorage.userview).id,
                borrowType: JSON.parse(sessionStorage.borrowType),
                borrowmoney: $('.borrowmoney').val(),
                interest: $('.interest').val(),
                borrowtime: $('.borrowtime').val(),
                repaytype: $('.repaytype:checked').val(),
                minbid: $('.minbid').val(),
                bouns: $('.bouns').val(),
                days: $('.days').val(),
                title: $('.title').val(),
                info: $('.info').val()
            },
            success: function (data) {
                let { code, msg } = data;
                if (code === 200) {
                    alert(msg);
                    $('.form-control').val('');
                } else if (code === 500) {
                    alert(msg);
                }
                console.log($('.repaytype:checked').val())
            }
        })
    })
    let type = JSON.parse(sessionStorage.borrowType);
    switch (type) {
        case 1:
            type = '信用贷';
            break;
        case 2:
            type = '车易贷';
            break;
        case 3:
            type = '房易贷';
            break;
    }
    $('.borrow-type').html(type);
})