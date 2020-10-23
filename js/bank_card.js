$(function () {
    let id = JSON.parse(localStorage.getItem('userview')).id;
    $('#saveBtn').click(function () {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/bindCard',
            type: 'post',
            data: {
                userid: id,
                bankName: $('#bankName').val(),
                branchName: $('#branchName').val(),
                cardNumber: $('#cardNumber').val()
            },
            success: function (data) {
                let { code, msg } = data;
                if (code === 200) {
                    alert(msg);
                    $('#myModal').modal('hide');
                    getCardList();
                    $('#cardList').html(``)
                } else if (code === 500) {
                    alert(msg);
                }
            }

        })
    })

    /* 获取银行卡列表 */
    function getCardList() {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/cardList',
            type: 'get',
            data: {
                userid: id
            },
            success: function (data) {
                var { code, msg } = data; 

                if (code === 200) {
                    var list = data.data // 接收到后端数据
                    console.log(list);
                    var ret = '';
                    for (let i = 0; i < list.length; i++) {
                        // 拼接出最终渲染结果
                        ret += `<div class="col-6">
                                    <div class="card mt-3">
                                        <div class="card-body">
                                            <h5 class="card-title">${list[i].bankName}</h5>
                                            <h6 class="card-text mb-2 text-success">${list[i].branchName}</h6>
                                            <p class="card-text">${list[i].cardNumber}</p>
                                        </div>
                                    </div>
                                </div>`
                    }

                    // 渲染
                    $('#cardList').html(ret);
                } else if (code === 500) {
                    alert(msg)
                }
            }
        })
    }

    // 进入页面调用一次
    getCardList()
})