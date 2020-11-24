<template>
  <div>
    <Card :list="cardlist" />
    <charts @list="fn" />
  </div>
</template>

<script>
import Card from "./components/Card";
import charts from "./components/echarts";
import { getData } from "../../API/dashboard";
export default {
  components: {
    Card,
    charts,
  },
  data() {
    return {
      cardlist: [
        {
          icon: "icon-wenjian",
          color: "#1296db",
          num: 0,
          title: "总订单",
        },
        {
          icon: "icon-Dollar",
          color: "#d4237a",
          num: 0,
          title: "总销售额",
        },
        {
          icon: "icon-renwu",
          color: "#1296db",
          num: 0,
          title: "今日订单数",
        },
        {
          icon: "icon-renminbi",
          color: "#1afa29",
          num: 0,
          title: "今日销售额",
        },
      ],
      list: {},
      data: {},
      numl: 10,
    };
  },
  created() {
    this.getcharts();
  },
  methods: {
    async getcharts() {
      const data = await getData();
      this.list = data;
      this.data.option.series[1].data = this.list.amountData;
      this.data.option.series[0].data = this.list.orderData;
      this.data.option.xAxis[0].data = this.list.xData;
      this.data.myChart.setOption(this.data.option);
      this.cardlist[0].num = data.totalOrder;
      this.cardlist[1].num = data.totalAmount;
      this.cardlist[2].num = data.todayOrder;
      this.cardlist[3].num = data.totayAmount;
    },
    fn(view) {
      this.data = view;
    },
  },
};
</script>

<style lang="less" scoped>
</style>