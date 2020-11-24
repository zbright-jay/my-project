<template>
  <div class="charts">
    <div id="main" ref="paint" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    this.showcharts();
  },
  methods: {
    showcharts() {
      const myChart = echarts.init(this.$refs.paint);
      const option = {
        backgroundColor: "#fff",
        title: {
          text: "报表数据",
          left: "2%",
          textStyle: {
            color: "#42bfac",
            fontSize: 15,
          },
        },
        legend: {
          show: true,
          icon: "circle",
          top: "5%",
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 25,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisLine: {
              lineStyle: {
                color: "#ddd",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#c56790",
              },
              margin: 15,
            },
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#ddd",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#c56790",
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "订单数据",
            type: "line",
            data: [],
            symbolSize: 6,
            symbol: "circle",
            smooth: true,
            lineStyle: {
              color: "#fe9a8b",
            },
            itemStyle: {
              normal: {
                color: "#fe9a8b",
                borderColor: "#fe9a8b",
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fe9a8bb3",
                },
                {
                  offset: 1,
                  color: "#fe9a8b03",
                },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#fe9a8b",
                    },
                    {
                      offset: 0.4,
                      color: "#fe9a8b",
                    },
                    {
                      offset: 0.5,
                      color: "#fff",
                    },
                    {
                      offset: 0.7,
                      color: "#fff",
                    },
                    {
                      offset: 0.8,
                      color: "#fff",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                },
                borderColor: "#fe9a8b",
                borderWidth: 2,
              },
            },
          },
          {
            name: "金额数据",
            type: "line",
            data: [],
            symbolSize: 6,
            symbol: "circle",
            smooth: true,
            lineStyle: {
              color: "#9E87FF",
            },
            itemStyle: {
              normal: {
                color: "#9E87FF",
                borderColor: "#9E87FF",
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#9E87FFb3",
                },
                {
                  offset: 1,
                  color: "#9E87FF03",
                },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#9E87FF",
                    },
                    {
                      offset: 0.4,
                      color: "#9E87FF",
                    },
                    {
                      offset: 0.5,
                      color: "#fff",
                    },
                    {
                      offset: 0.7,
                      color: "#fff",
                    },
                    {
                      offset: 0.8,
                      color: "#fff",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                },
                borderColor: "#9E87FF",
                borderWidth: 2,
              },
            },
          },
        ],
      };
      // myChart.setOption(option);
      this.$emit("list", { myChart, option });
    },
  },
};
</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  padding: 40px;
  margin-top: 40px;
  box-sizing: border-box;
  background-color: #fff;
  #main {
    background-color: #fff;
  }
}
</style>