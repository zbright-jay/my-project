import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
// 引入初始化css样式
import "./assets/css/reset.css";
// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入字体图标
import "./assets/fonts/iconfont.css";
// 引入自己的样式
import "./assets/css/index.less";
// 引入全局组件
import "./utils/global-component";
// 引入全局过滤器
import "./utils/global-filter";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
