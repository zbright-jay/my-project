// 存放每个axios请求
import requset from "../utils/request";

// 获取商品分类列表
export function getCatelist(params) {
  return requset.get("/goods/catelist", params);
}
// 删除商品分类项
export function delCatelist(params) {
  return requset.get("/goods/delcate", params);
}
// 添加商品分类
export function addCatelist(params) {
  return requset.post("/goods/addcate", params);
}
// 修改分类
export function editCate(params) {
  return requset.post("/goods/editcate", params);
}
// 获取商品列表
export function getGoodslist(params) {
  return requset.get("/goods/list", params);
}
// 删除商品
export function deleteGoods(params) {
  return requset.get("/goods/del", params);
}
// 获取指定要修改的商品
export function editGoods(params) {
  return requset.get("goods/item", params);
}
// 获取所有分类列表
export function getAllcate(params) {
  return requset.get("/goods/categories", params);
}
// 添加商品
export function addProject(params) {
  return requset.post("/goods/add", params);
}
// 编辑商品
export function editGood(params) {
  return requset.post("/goods/edit", params);
}
