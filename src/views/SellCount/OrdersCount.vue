<template>
  <div class="charts">
    <panel>
      <template #title> 订单统计 </template>
      <template #content>
        <div id="main" ref="paint" style="width: 100%; height: 700px"></div>
      </template>
    </panel>
  </div>
</template>

<script>
import echarts from "echarts";
import { getCount } from "../../API/sell";
import moment from "moment";
export default {
  mounted() {
    this.showcharts();
  },
  data() {
    return {
      date: ["2020-1-01 00:00:00", "2020-12-31 00:00:00"],
      xdata: [],
      ydata: [],
    };
  },
  methods: {
    async showcharts() {
      const { data } = await getCount({
        date: JSON.stringify(this.date),
      });
      data.forEach((item) => {
        this.ydata.push(item.orderAmount);
        this.xdata.push(moment(item.orderTime).format("YYYY-MM-DD HH-mm"));
      });

      const myChart = echarts.init(this.$refs.paint);
      const option = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "10%",
          containLabel: true,
        },
        legend: {
          icon: "rect",
          right: "5%",
          top: 20,
          itemWidth: 30,
          itemHeight: 10,
          data: ["订单金额"],
          textStyle: {
            color: "#5b97d5",
          },
        },
        xAxis: {
          type: "category",
          data: this.xdata,
          axisLabel: {
            textStyle: {
              color: "#5b97d5",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#1f3a56",
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#5b97d5",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#1f3a56",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#1f3a56",
            },
          },
        },
        series: [
          {
            name: "订单金额",
            type: "bar",
            barWidth: "25%", //柱子宽度
            itemStyle: {
              //柱子颜色
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#92fe9d",
                  },
                  {
                    offset: 1,
                    color: "#00c9ff",
                    
                  },
                ]),
                barBorderRadius: [100, 100, 0, 0],
              },
            },
            data: this.ydata,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  watch: {
    xdata: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showcharts();
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  margin-top: 40px;
  box-sizing: border-box;
  background-color: #fff;
  #main {
    background-color: #fff;
  }
}
</style>