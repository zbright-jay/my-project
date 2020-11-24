// 存放每个axios请求
import requset from "../utils/request";

// 获取首页图表信息
export function getData(params) {
  return requset.get("/order/totaldata", params);
}
