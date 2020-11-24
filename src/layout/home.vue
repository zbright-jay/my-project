<template>
  <el-container>
    <el-aside :width="collapse ? '65px' : '200px'">
      <div class="logo" @click="collapse = !collapse">
        <img src="../assets/images/logo.jpg" alt="" />
        <h3 v-show="!collapse">回家吃饭</h3>
      </div>
      <navmenu :collapse="collapse" />
    </el-aside>
    <el-container>
      <el-header>
        <headerMenu />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import navmenu from "./components/NavMenu";
import headerMenu from "./components/headerMenu";
export default {
  components: {
    navmenu,
    headerMenu,
  },
  data() {
    return {
      collapse: false,
    };
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: #304156;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px 0;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      h3 {
        color: #fff;
        letter-spacing: 3px;
        margin-left: 15px;
      }
    }
  }
  .el-main {
    background: url("../assets/images/团聚.jpg") no-repeat;
    background-size: 100% 100%;
  }
}
</style>