$(function(){
    //全选
    $('.allSel').change(function(){
        //获取当前全选的状态
        let status=$(this).prop('checked');
        //同步单个商品的状态值
        $('.singleSel').prop('checked',status);
        //把另一个全选设置状态值
        $('.allSel').prop('checked',status);
        //总价和总量
        aconut();
    });

    $('.singleSel').click(function(){
        let flag=true;
        //遍历
        $('.singleSel').each(function(index,dom){
            let status=$(this).prop('checked');
            //判定状态值 进行切换标杆  只要有一个false就切换标杆
            if(!status){// status进来时必需为false
                //切换标杆
                flag=false;
                //结束循环
                return false;
            }
        })
        if(flag){
            $('.allSel').prop('checked',true);
        }else{
            //不进行全选
            $('.allSel').prop('checked',false);
        }
        //总价和总量
        aconut();
    })

    //数量增加
    $('.addNum').click(function(){
        //获取当前商品的数量
        let n=$(this).siblings('.num').val();
        //进行n增加  在原来的基础上进行加操作
        n++;
        //把操作后的n放入 input标签的value中
        $(this).siblings('.num').val(n);
        //小计
         singlePrice(this);
         //总价和总量
        aconut(); 
    })

    //数量减少
    $('.reNum').click(function(){
        //获取当前商品的数量
        let n=$(this).siblings('.num').val();
        //进行n减  在原来的基础上进行减操作
        n--;
        //判定
        if(n<1){
            return false;
        }
        //把操作后的n放入 input标签的value中
        $(this).siblings('.num').val(n);
        //小计
        singlePrice(this);
        //总价和总量
        aconut();
    })
    //小计功能:   小计=单价*数量  
    function singlePrice(obj){
        //获取数量
        let num=$(obj).siblings('.num').val()
        //获取当前选中商品的单价
        let sp=$(obj).closest('tr').find('.price').text();

        //计算小计
        let sconut=sp*num;
        //小数位处理
        sconut=sconut.toFixed(2);

        //把小计放入到指定位置中
        $(obj).closest('tr').find('.conut').text(sconut)

    }
    //计算总价和总数量
    function aconut(){
        //定义变量保存数据
        //总价格
        let allPrice=0;
        //总数量
        let allNum=0;
        //总数量---遍历获取  因为后期有很多商品
        $('.singleSel:checked').each(function(){
            //总数量
            let alln=parseInt($(this).closest('tr').find('.num').val());
            //进行累加操作
            allNum+=alln
            //总价格
            let aprice=parseFloat($(this).closest('tr').find('.conut').text());
            //进行价格累加
            allPrice+=aprice;
        })
        //添加总数量到 numTotal
        $('.numTotal').text(allNum);
        //数据处理
        allPrice=allPrice.toFixed(2);
        //添加总价格到 priceTotal
        $('.priceTotal').text(allPrice);
    }

    // 删除功能
    $('.del').click(function(){
        let bool=confirm("确认要删除吗？");
        if(bool){
            $(this).closest('tr').remove();
        }else{
            return false;
        }
    })
})