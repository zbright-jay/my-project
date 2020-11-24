<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in listArr"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="avatar">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          你好，{{ userInfo.account
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
          <el-dropdown-item command="注销">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar :src="userInfo.imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "../../API/user";
import session from "../../utils/session";
export default {
  data() {
    return {
      listArr: [],
      userInfo: {},
    };
  },
  created() {
    this.Breadcrumb();
    this.getUser();
  },
  methods: {
    async getUser() {
      const { accountInfo } = await getUserInfo();
      session.set("usersInfo", JSON.stringify(accountInfo));
      this.userInfo = JSON.parse(session.get("usersInfo"));
    },
    handleCommand(text) {
      if (text === "个人中心") {
        this.$router.push("/personal-center");
      } else if (text === "注销") {
        session.clear();
        location.reload();
      }
    },
    Breadcrumb() {
      // console.log('执行了函数')
      // 1.0 目的是让面包屑导航通过循环去产生具体的选项，需要一个数组
      const arr = [{ path: "/", name: "首页" }];
      // 2.0 主要的值两个，显示的文字和跳转的路径
      // console.log(this.$route.matched)
      this.$route.matched.forEach((item) => {
        if (item.meta && item.meta.name) {
          arr.push({
            path: item.path,
            name: item.meta.name,
          });
        }
      });
      this.listArr = arr;
    },
  },
  watch: {
    "$route.path"() {
      this.Breadcrumb();
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  .avatar {
    display: flex;
    align-items: center;
    .el-avatar {
      margin-left: 10px;
    }
  }
}
</style>