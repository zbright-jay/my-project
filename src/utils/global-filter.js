import Vue from "vue";
import moment from "moment";

// 时间格式过滤
Vue.filter("formatDate", (val) => {
  return moment(val).format("YYYY-MM-DD HH:mm:ss");
});
// 金额单位过滤
Vue.filter("formatMoney", (val, unit = "￥") => {
  return `${unit}${val.toFixed(2)}`;
});
