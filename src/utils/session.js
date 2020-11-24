// 封装一个sessionStorage
export default {
  set(key, val) {
    window.sessionStorage.setItem(key, val);
  },
  get(key) {
    return window.sessionStorage.getItem(key);
  },
  del(key) {
    window.sessionStorage.removeItem(key);
  },
  clear() {
    window.sessionStorage.clear();
  },
};
