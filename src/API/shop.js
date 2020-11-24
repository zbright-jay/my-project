// 存放每个axios请求
import requset from "../utils/request";

// 获取店铺信息
export function getShop(params) {
  return requset.get("/shop/info", params);
}
// 修改店铺信息
export function editShop(params) {
  return requset.post("/shop/edit", params);
}
