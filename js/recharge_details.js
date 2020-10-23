$(function () {
    // 初始化当前页码
    let pageindex = 1;
    // 自定义每一页的数据条数
    const pagesize = 5;
    // 定义渲染界面函数，传入当前显示的页码数
    let ret = '';
    let lock = true;
    function getpage(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/chargeRecord',
            type: 'get',
            data: {
                userid: JSON.parse(localStorage.userview).id,
                pageIndex: page,
                pageSize: pagesize
            },
            success: function (data) {
                let { code, msg } = data;
                let rel = '';
                let dataview = data.data;
                if (code === 200) {
                    for (let key in data.data) {
                        rel += ` <tr>
                                <td class='text-danger'>${dataview[key].chargemoney}</td>
                                <td>${dataview[key].bankName}</td>
                                <td>${dataview[key].branchName}</td>
                                <td>${dataview[key].cardNumber}</td>
                                <td>${dataview[key].chargeTime}</td>
                            </tr>`
                    }
                    // 总的分页数=数据的总条数/每一页的数据条数 ，并向上取整
                    let total = Math.ceil(data.total / pagesize);
                    if (lock) {
                        $("#page").paging({
                            pageNum: page, // 当前页码
                            totalNum: total, // 总页码
                            totalList: data.total, // 数据总条数
                            callback: function (num) { // 回调函数 会把当前页码传入
                                // 获取当前页对应的数据
                                getpage(num)
                            }
                        })
                        lock = false;
                    }

                    $('table tbody').html(rel);

                }
            }
        })
    }

    getpage(pageindex);
})