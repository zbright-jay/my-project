$(function () {
    $.ajax({
        url: 'http://139.9.177.51:3333/p2p/getborrowinfo',
        type: 'get',
        data: {
            borrowid: sessionStorage.getItem('borrowid')
        },
        success: function (data) {
            let { code, msg } = data;
            let info = data.data;
            switch (info.borrowType) {
                case 1:
                    info.borrowType = '信用贷';
                    break;
                case 2:
                    info.borrowType = '车易贷';
                    break;
                case 3:
                    info.borrowType = '房易贷';
                    break;
            }
            switch (info.repaytype) {
                case 0:
                    info.repaytype = '按月分期';
                case 1:
                    info.repaytype = '按月到期'
            }
            if (code === 200) {
                console.log(msg)
                $('.username').html(info.username);
                $('.borrowtype').html(info.borrowType);
                $('.borrowmoney').html(info.borrowType);
                $('.interest').html(info.interest + '%');
                $('.borrowtime').html(info.borrowtime + '个月');
                $('.repaytype').html(info.repaytype);
                $('.minbid').html(info.minbid);
                $('.title').html(info.title);
                $('.still_need').html(info.borrowmoney - info.ownmoney);
                $('.borrowmoney').html(info.borrowmoney);
                $('.ownmoney').html(info.ownmoney);
                let proportion = ((info.ownmoney / info.borrowmoney) * 100).toFixed(2);
                $('.proportion').html(proportion + '%');
                $('.progress-bar').css({
                    width: proportion + '%'
                });
                // 放入被投资人信息
                $('#myModal').on('shown.bs.modal', function () {
                    $('#investee').val(info.username).prop('disabled', true);
                    $('#investable').val(`${info.borrowmoney - info.ownmoney} 元`).prop('disabled', true);
                    $('#profit').val(`${0} 元`).prop('disabled', true);
                    $('#investmoney').keyup(function () {
                        let inputmoney = $(this).val();
                        $('#profit').val(`${(inputmoney * info.interest) / 100} 元`).prop('disabled', true);
                    })
                })
            } else if (code === 500) {
                console.log(msg);
            }
        }
    })

    // 请求投资接口
    $('#saveBtn').click(function () {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/invest',
            type: 'post',
            data: {
                userid: JSON.parse(localStorage.userview).id,
                borrowid: JSON.parse(sessionStorage.borrowid),
                chargemoney: $('#investmoney').val()
            },
            success: function (data) {
                let { code, msg } = data;
                if (code === 200) {
                    alert(msg);
                    $('#myModal').modal('hide');//隐藏modal
                    $('.modal-backdrop').remove();//去掉遮罩层
                    location.href = '../index.html#personal_center';
                } else if (code === 500) {
                    alert(msg);
                }
            }
        })
    })
})