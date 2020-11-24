// 存放每个axios请求
import requset from "../utils/request";

// 获取订单列表
export function getOrder(params) {
  return requset.get("/order/list", params);
}
// 获取订单详情
export function detailOrder(params) {
  return requset.get("/order/detail", params);
}
//订单修改
export function editOrder(params) {
  return requset.post("/order/edit", params);
}
