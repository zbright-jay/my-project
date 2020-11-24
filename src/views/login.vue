<template>
  <div class="login-box">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <h3>后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          prefix-icon="iconfont icon-yonghu"
          v-model="ruleForm.username"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="flag ? 'text' : 'password'"
          v-model="ruleForm.password"
          autocomplete="off"
          prefix-icon="iconfont icon-mima"
          @keyup.native.enter="status ? submitForm('ruleForm') : false"
        >
          <template #suffix>
            <i
              class="iconfont"
              :class="flag ? 'icon-eyes-' : 'icon-eyes'"
              @click="flag = !flag"
            ></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateusername, validatepassword } from "../utils/validate";
import { login } from "../API/user";
import session from "../utils/session";
import { getRoute } from "../router/index";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
        password: [{ validator: validatepassword, trigger: "blur" }],
      },
      flag: false,
      status: true,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const rep = await login({
            account: this.ruleForm.username,
            password: this.ruleForm.password,
          });
          console.log(rep);
          if (rep.code === 0) {
            this.status = false;
            setTimeout(() => {
              session.set("token", rep.token);
              session.set("role", rep.role);
              getRoute();
              this.$router.push("/");
            }, 2000);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/images/tree.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .demo-ruleForm {
    width: 350px;
    height: 260px;
    padding: 35px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    h3 {
      color: teal;
      letter-spacing: 3px;
      font-size: 20px;
    }
    .el-form-item {
      width: 100%;
      //   深度穿透
      /deep/.el-input {
        background-color: rgba(0, 0, 0, 0);
        .el-input__suffix-inner {
          float: right;
        }
      }
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>