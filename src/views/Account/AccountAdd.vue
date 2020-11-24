<template>
  <div>
    <panel>
      <template #title> 账号添加 </template>
      <template #content>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="userGroup">
            <el-select
              v-model="ruleForm.userGroup"
              autocomplete="off"
              placeholder="请选择"
            >
              <el-option value="管理员">普通管理员</el-option>
              <el-option value="超级管理员">超级管理员</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >添加</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import { userAdd } from "../../API/user";
import { validateusername, validatepassword } from "../../utils/validate";
export default {
  data() {
    let userGroup = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户组不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        userGroup: "",
      },
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
        password: [{ validator: validatepassword, trigger: "blur" }],
        userGroup: [{ validator: userGroup, trigger: "change" }],
      },
      value: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = await userAdd({
            account: this.ruleForm.username,
            password: this.ruleForm.password,
            userGroup: this.ruleForm.userGroup,
          });
          if (data.code === 0) {
            this.$router.push("/account/accountlist");
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
.el-form {
  width: 50%;
}
</style>