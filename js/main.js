$(function () {
    let pageindex = 1;
    const pagesize = 10;
    let lock = true;
    function getBorrowlist(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/getBorrowList',
            type: 'get',
            data: {
                userid: JSON.parse(localStorage.userview).id,
                pageIndex: page,
                pageSize: pagesize
            },
            success: function (data) {
                let { code, msg } = data;
                let rel = '';
                let borrowlist = data.data;
                console.log(borrowlist)
                if (code === 200) {
                    for (let key in borrowlist) {
                        switch (borrowlist[key].borrowType) {
                            case 1:
                                borrowlist[key].borrowType = '信用贷';
                                break;
                            case 2:
                                borrowlist[key].borrowType = '车易贷';
                                break;
                            case 3:
                                borrowlist[key].borrowType = '房易贷';
                                break;
                        }
                        switch (borrowlist[key].repaytype) {
                            case 0:
                                borrowlist[key].repaytype = '按月分期';
                                break;
                            case 1:
                                borrowlist[key].repaytype = '按月到期';
                                break;
                        }
                        rel += ` <tr>
                            <th scope="row">${borrowlist[key].username}</th>
                            <td>${borrowlist[key].title}</td>
                            <td class='text-danger'>￥${borrowlist[key].borrowmoney}</td>
                            <td>${borrowlist[key].interest}%</td>
                            <td>${borrowlist[key].borrowType}</td>
                            <td>${borrowlist[key].repaytype}</td>
                            <td>${((borrowlist[key].ownmoney / borrowlist[key].borrowmoney) * 100).toFixed(2)}%</td>
                            <td><button class="btn btn-success view"><a href='#borrow_info' data_id='${borrowlist[key].id}'>查看</a></button></td>
                        </tr>`
                    }
                    let total = Math.ceil(data.total / pagesize);
                    if (lock) {
                        $("#page").paging({
                            pageNum: page, // 当前页码
                            totalNum: total, // 总页码
                            totalList: data.total, // 数据总条数
                            callback: function (num) { // 回调函数 会把当前页码传入
                                // 获取当前页对应的数据
                                getBorrowlist(num)
                            }
                        })
                        lock = false;
                    }

                    $('.borrowlist tbody').html(rel);
                    $('.view a').click(function () {
                        sessionStorage.setItem('borrowid', $(this).attr('data_id'));
                    })

                } else if (code === 500) {

                    console.log(msg);
                }
            }
        })
    }
    getBorrowlist(pageindex);

})