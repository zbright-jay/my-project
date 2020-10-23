$(function () {
    function getUserInfo() {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/getuserinfo',
            type: 'get',
            data: {
                userid: JSON.parse(localStorage.getItem('userview')).id
            },
            success: function (data) {
                let code = data.code;
                if (code === 200) {
                    let userinfo = data.data;
                    console.log(userinfo);
                    for (let key in userinfo) {
                        let arr = ['email', 'username', 'nickname', 'totalmoney', 'usablemoney', 'blockedmoney', 'lastlogintime'];
                        if (arr.includes(key)) {
                            $(`.${key}`).text(userinfo[key]);
                        }
                    }

                    // 我的方法，会浪费一定的资源
                    // let arr = ['email', 'username', 'nickname', 'totalmoney', 'usablemoney', 'blockedmoney', 'lastlogintime'];
                    // arr.forEach(function (value) {
                    //     console.log(value);
                    //     $(`.${value}`).text(userinfo[value])
                    // })
                    drawPie(userinfo.totalmoney, userinfo.usablemoney, userinfo.blockedmoney)
                } else if (code === 500) {
                    alert(data.msg)
                }
            }
        })
    }
    getUserInfo();


    // 因为要修改数据，所以进行数据的回填
    $('#myModal').on('shown.bs.modal', function () {
        $('#edit-nickname').val($('.nickname').text());
        $('#edit-email').val($('.email').text());
    })


    // 点击修改数据，发送请求
    $('#editBtn').click(function () {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/updateuser',
            type: 'post',
            data: {
                userid: JSON.parse(localStorage.userview).id,
                nickname: $('#edit-nickname').val(),
                email: $('#edit-email').val()
            },
            success: function (data) {
                let { code, msg } = data;
                if (code === 200) {
                    alert(msg);
                    getUserInfo();
                } else {
                    alert(msg);
                }
                // 关闭状态框
                $('#myModal').modal('hide');
            }
        })
    })

    /* 创建饼图 */
    function drawPie(totalmoney, usablemoney, blockedmoney) {
        // a. 初始化
        let myChart = echarts.init(document.getElementById('myChart'))

        // b. 写配置
        let option = {
            title: {
                text: '用户资金分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['总金额', '可用金额', '冻结金额']
            },
            series: [
                {
                    name: '用户资金分布',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: totalmoney, name: '总金额' },
                        { value: usablemoney, name: '可用金额' },
                        { value: blockedmoney, name: '冻结金额' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // c. 使用配置创建报表
        myChart.setOption(option)
    }
})