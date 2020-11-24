// 存放每个axios请求
import requset from "../utils/request";

// 登录
export function login(params) {
  return requset.post("/users/checkLogin", params);
}
// 账号添加
export function userAdd(params) {
  return requset.post("/users/add", params);
}
// 账号列表
export function userList(params) {
  return requset.get("/users/list", params);
}
//检测旧密码是否正确
export function checkold(params) {
  return requset.get("/users/checkoldpwd", params);
}
//确认密码修改
export function editpwd(params) {
  return requset.post("/users/editpwd", params);
}
// 删除账号
export function delUser(params) {
  return requset.get("users/del", params);
}
// 批量删除账号
export function deletemore(params) {
  return requset.get("/users/batchdel", params);
}
// 编辑账号
export function editUser(params) {
  return requset.post("/users/edit", params);
}
// 获取个人信息
export function getUserInfo(params) {
  return requset.get("/users/info", params);
}
// 修改用户头像
export function editAvatar(params) {
  return requset.get("/users/avataredit", params);
}
