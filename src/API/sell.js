// 存放每个axios请求
import requset from "../utils/request";

// 登录
export function getCount(params) {
  return requset.get("/order/ordertotal", params);
}
