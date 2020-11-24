// 封装了axios方法
import axios from "axios";
import qs from "qs";
import session from "../utils/session";
import { Message } from "element-ui";

// 请求拦截器
axios.interceptors.request.use((config) => {
  const token = session.get("token");
  if (token) {
    config.headers.Authorization = token;
    // 上下两种方法都可
    // axios.defaults.headers.Authorization = token;
  }
  return config;
});
// 响应拦截器
axios.interceptors.response.use((res) => {
  const { code, msg } = res.data;
  if (code !== undefined && msg !== undefined) {
    if (code === 0 || code === "00") {
      Message({
        type: "success",
        message: msg,
      });
    } else {
      Message({
        type: "error",
        message: msg,
      });
    }
  }
  return res;
});

axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.timeout = 2000;
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((req) => {
          resolve(req.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(params))
        .then((req) => {
          resolve(req.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
