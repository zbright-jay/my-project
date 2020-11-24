import Vue from "vue";
import Router from "vue-router";
import home from "../layout/home.vue";
import lodash from "lodash";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
// 注册路由
Vue.use(Router);

// 定义路由规则
const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: home,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: () => import("../views/Dashboard/index.vue"),
      },
    ],
  },
  { path: "*", redirect: "/error" },
  { path: "/error", component: () => import("../views/error.vue") },
  { path: "/login", component: () => import("../views/login.vue") },
];

// 动态路由
const asyncroute = {
  path: "/home",
  component: home,
  redirect: "/dashboard",
  children: [
    {
      meta: { name: "后台首页", icon: "icon-shouye" },
      visible: true,
      path: "/dashboard",
      component: () => import("../views/Dashboard/index.vue"),
    },
    {
      meta: { name: "个人中心", role: ["normal", "super"] },
      visible: false,
      path: "/personal-center",
      component: () => import("../views/personal-center.vue"),
    },
    {
      visible: true,
      meta: { name: "商品管理", icon: "icon-shangpin" },
      path: "/project",
      component: () => import("../views/Project/index.vue"),
      redirect: "/project/projectlist",
      children: [
        {
          visible: true,
          meta: { name: "商品列表" },
          path: "/project/projectlist",
          component: () => import("../views/Project/ProjectList.vue"),
        },
        {
          visible: true,
          meta: { name: "商品添加" },
          path: "/project/projectadd",
          component: () => import("../views/Project/ProjectAdd.vue"),
        },
        {
          visible: true,
          meta: { name: "商品分类" },
          path: "/project/projectcate",
          component: () => import("../views/Project/ProjectCate.vue"),
        },
        {
          visible: false,
          meta: { name: "商品列表编辑", role: ["super"] },
          path: "/project/projectedit",
          component: () => import("../views/Project/projectEdit.vue"),
        },
      ],
    },
    {
      visible: true,
      meta: { name: "订单管理", role: ["normal", "super"], icon: "icon-icon-" },
      path: "/order",
      component: () => import("../views/Order/index.vue"),
      redirect: "/order/orderlist",
      children: [
        {
          visible: true,
          meta: { name: "订单列表" },
          path: "/order/orderlist",
          component: () => import("../views/Order/orderList.vue"),
        },
        {
          visible: false,
          meta: { name: "修改订单", role: ["super"] },
          path: "/order/editorder",
          component: () => import("../views/Order/editOrder.vue"),
        },
      ],
    },
    {
      visible: true,
      meta: { name: "店铺管理", role: ["super"], icon: "icon-dianpu" },
      path: "/shop",
      component: () => import("../views/Shop/index.vue"),
    },
    {
      visible: true,
      meta: {
        name: "账号管理",
        role: ["normal", "super"],
        icon: "icon-zhanghao",
      },
      path: "/account",
      component: () => import("../views/Account/index.vue"),
      children: [
        {
          visible: true,
          meta: { name: "账号列表", role: ["super"] },
          path: "/account/accountlist",
          component: () => import("../views/Account/AccountList.vue"),
        },
        {
          visible: true,
          meta: { name: "添加账号", role: ["super"] },
          path: "/account/accountadd",
          component: () => import("../views/Account/AccountAdd.vue"),
        },
        {
          visible: true,
          meta: { name: "修改密码" },
          path: "/account/resetpwd",
          component: () => import("../views/Account/ResetPwd.vue"),
        },
      ],
    },
    {
      visible: true,
      meta: { name: "销售统计", role: ["super"], icon: "icon-tongji" },
      path: "/sellcount",
      component: () => import("../views/SellCount/index.vue"),
      redirect: "/sellcount/goodscount",
      children: [
        {
          visible: true,
          meta: { name: "商品统计" },
          path: "/sellcount/goodscount",
          component: () => import("../views/SellCount/GoodsCount.vue"),
        },
        {
          visible: true,
          meta: { name: "订单统计" },
          path: "/sellcount/orderscount",
          component: () => import("../views/SellCount/OrdersCount.vue"),
        },
      ],
    },
  ],
};

// 实例化一个路由对象
const router = new Router({
  routes,
});

// 设置路由守卫
import session from "../utils/session";
router.beforeEach((to, from, next) => {
  const token = session.get("token");
  if (token) {
    next();
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

getRoute();
export function getRoute() {
  // 获取登录时，储存的role（角色权限）
  const role = session.get("role");
  // 调用过滤路由方法，并返回过滤后的数组
  if (!role) return false;
  const finalArr = calcRoute(asyncroute.children, role);
  console.log(finalArr);
  // 合并路由
  asyncroute.children = finalArr;
  // console.log(finalArr);
  router.addRoutes([asyncroute]);
  const listArr = calcmenu(lodash.cloneDeep(finalArr));
  session.set("list", JSON.stringify(listArr));
}

// 过滤路由
// 向过滤方法中，传入过滤的数组，以及登录的role角色
function calcRoute(arr, role) {
  // 同过数组方法filter进行过滤
  return arr.filter((item) => {
    // 通过identity，对登录的角色进行权限判断
    if (identify(item, role)) {
      // 递归，如果item中还具有children，则再次调用calcRouter，对数组进行过滤，并将
      // 过滤后的值，重新再赋给item.children
      if (item.children && item.children.length > 0) {
        item.children = calcRoute(item.children, role);
      }
      return true;
    } else {
      return false;
    }
  });
}

function calcmenu(arr) {
  return arr.filter((v) => {
    if (v.visible) {
      if (v.children && v.children.length > 0) {
        v.children = calcmenu(v.children);
      }
      return true;
    } else {
      return false;
    }
  });
}

// 鉴别方法
function identify(i, r) {
  // 鉴别用户登录角色权限，如果没有role则说明，该功能没有权限限制，如果有则：
  if (i.meta && i.meta.role) {
    // 如果传入的路由中的role中，包含用户登录的role，则将其返回，将入到finalArr中，否则将其筛除
    return i.meta.role.includes(r);
  } else {
    return true;
  }
}
// 当前模块输出router
export default router;
