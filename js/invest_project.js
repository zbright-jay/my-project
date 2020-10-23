$(function () {
    let pageindex = 1;
    let pagesize = 6;
    let lock = true;
    function getinvestlist(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/investList',
            type: 'get',
            data: {
                userid: JSON.parse(localStorage.userview).id,
                pageIndex: page,
                pageSize: pagesize
            },
            success: function (data) {
                let { code, msg } = data;
                let investdata = data.data;
                let rel = '';
                if (code === 200) {
                    console.log(msg);
                    for (let key in investdata) {
                        switch (investdata[key].borrowType) {
                            case 1:
                                investdata[key].borrowType = '信用贷';
                                break;
                            case 2:
                                investdata[key].borrowType = '车易贷';
                                break;
                            case 3:
                                investdata[key].borrowType = '房易贷';
                                break;
                        }
                        rel += `
                            <tr>
                                <td>${investdata[key].title}</td>
                                <td>${investdata[key].borrowType}</td>
                                <td>${investdata[key].chargemoney}</td>
                                <td class='text-danger'>${investdata[key].borrowmoney}</td>
                                <td>${investdata[key].ownmoney}</td>
                                <td>${investdata[key].chargeTime}</td>
                            </tr>
                        `
                    }
                    let total = Math.ceil(data.total / pagesize);
                    if (lock) {
                        $("#page").paging({
                            pageNum: page, // 当前页码
                            totalNum: total, // 总页码
                            totalList: data.total, // 数据总条数
                            callback: function (num) { // 回调函数 会把当前页码传入
                                // 获取当前页对应的数据
                                getinvestlist(num)
                            }
                        })
                        lock = false;
                    }
                    $('.investlist').html(rel);
                } else if (code === 500) {
                    console.log(msg);
                }
            }
        })
    }
    getinvestlist(pageindex);
})