import Vue from "vue";

// 注册全局面板组件
import panal from "../components/panel-module.vue";
// 使用Vue.component可以注册全局组件，注意还需要在mian.js中引入
Vue.component("panel", panal);
