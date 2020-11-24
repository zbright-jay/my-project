<template>
  <el-menu
    :default-active="path"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#fff"
    :collapse="collapse"
    :collapse-transition="false"
    :router="true"
    active-text-color="#1296db"
  >
    <template v-for="item in list">
      <el-menu-item
        v-if="!item.children || item.path === '/order'"
        :index="item.path"
        :key="item.path"
      >
        <i class="iconfont" :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.name }}</span>
      </el-menu-item>

      <el-submenu v-else :index="item.path" :key="item.path">
        <template slot="title">
          <i class="iconfont" :class="item.meta.icon"></i>
          <span>{{ item.meta.name }}</span>
        </template>
        <el-menu-item
          v-for="sub in item.children"
          :key="sub.path"
          :index="sub.path"
          >{{ sub.meta.name }}</el-menu-item
        >
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import session from "../../utils/session";
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.list = JSON.parse(session.get("list"));
    console.log(this.list);
  },
  computed: {
    path() {
      if (this.$route.path === "/order/editorder") return "/order/orderlist";
      if (this.$route.path === "/project/projectedit")
        return "/project/projectlist";
      return this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border: 0;
  i {
    margin-right: 10px;
    color: #fff;
  }
  .el-submenu {
    .el-menu-item {
      background-color: #202f3f !important;
    }
  }
}
</style>