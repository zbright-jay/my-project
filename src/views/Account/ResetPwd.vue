<template>
  <div>
    <panel>
      <template #title> 修改密码 </template>
      <template #content>
        <el-form
          :model="PassForm"
          status-icon
          :rules="rules"
          ref="PassForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="旧密码" prop="oldPass">
            <el-input
              type="password"
              v-model="PassForm.oldPass"
              autocomplete="off"
              @blur="checkoldpass"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input
              type="password"
              v-model="PassForm.newPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="PassForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('PassForm')"
              >确认</el-button
            >
            <el-button @click="resetForm('PassForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import {
  validatepassword,
  validnewpass,
  validcheckpass,
} from "@/utils/validate.js";

import { checkold, editpwd } from "../../API/user";
import session from "../../utils/session";
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
      PassForm: {
        oldPass: "",
        newPass: "",
        checkPass: "",
      },
      rules: {
        oldPass: [{ validator: validatepassword, trigger: "blur" }],
        newPass: [{ validator: validnewpass(this), trigger: "blur" }],
        checkPass: [{ validator: validcheckpass(this), trigger: "blur" }],
      },
      value: "",
    };
  },
  methods: {
    async checkoldpass() {
      const data = await checkold({ oldPwd: this.PassForm.oldPass });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = await editpwd({ newPwd: this.PassForm.newPass });
          console.log(data);
          if (data.code === 0) {
            setTimeout(() => {
              session.clear();
              this.$router.push("/login");
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
.el-form {
  width: 400px;
}
</style>