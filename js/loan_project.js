$(function () {
    let pageindex = 1;
    let pagesize = 6;
    function getmyborrowlist(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/getMyBorrowList',
            type: 'get',
            data: {
                userid: JSON.parse(localStorage.userview).id,
                pageIndex: page,
                pageSize: pagesize
            },
            success: function (data) {
                let { code, msg } = data;
                let loan = data.data;
                let ret = '';
                if (code === 200) {
                    console.log(msg);
                    for (let key in loan) {
                        switch (loan[key].borrowType) {
                            case 1:
                                loan[key].borrowType = '信用贷';
                                break;
                            case 2:
                                loan[key].borrowType = '车易贷';
                                break;
                            case 3:
                                loan[key].borrowType = '房易贷';
                                break;
                        }
                        switch (loan[key].repaytype) {
                            case 0:
                                loan[key].repaytype = '按月分期';
                                break;
                            case 1:
                                loan[key].repaytype = '按月到期';
                                break;
                        }
                        ret += `<tr>
                            <th scope="row">${loan[key].title}<img src="/images/信用.png" alt=""></th>
                            <td>${loan[key].borrowmoney}</td>
                            <td>${loan[key].interest}</td>
                            <td>${loan[key].borrowtime}</td>
                            <td>${loan[key].days}</td>
                            <td>${loan[key].ownmoney}</td>
                            <td>${loan[key].borrowType}</td>
                            <td>${loan[key].repaytype}</td>
                            <td class="text-success">审核中</td>
                            </tr>`
                    }
                    $('.loan').html(ret);
                    let total = Math.ceil(data.total / pagesize);
                    $("#page").paging({
                        pageNum: page, // 当前页码
                        totalNum: total, // 总页码
                        totalList: data.total, // 数据总条数
                        callback: function (num) { // 回调函数 会把当前页码传入
                            // 获取当前页对应的数据
                            getmyborrowlist(num)
                        }
                    })

                } else if (code === 500) {
                    console.log(msg);
                }
            }
        })
    }
    getmyborrowlist(pageindex);
})