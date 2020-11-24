<template>
  <div>
    <panel>
      <template #title> 个人中心 </template>
      <template #content>
        <ul>
          <li>
            <strong>管理员ID：</strong><span>{{ userInfo.id }}</span>
          </li>
          <li>
            <strong>账号：</strong><span>{{ userInfo.account }}</span>
          </li>
          <li>
            <strong>用户组：</strong><span>{{ userInfo.userGroup }}</span>
          </li>
          <li>
            <strong>创建时间：</strong><span>{{ userInfo.ctime }}</span>
          </li>
          <li>
            <strong>用户头像：</strong>
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/users/avatar_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </li>
          <el-button type="primary" @click="editavatar">保存</el-button>
        </ul>
      </template>
    </panel>
  </div>
</template>

<script>
import session from "../utils/session";
import moment from "moment";
import { editAvatar } from "../API/user";
export default {
  created() {
    this.userInfo = JSON.parse(session.get("usersInfo"));
    this.userInfo.ctime = moment(this.userInfo.ctime).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  },
  data() {
    return {
      userInfo: {},
      imageUrl: "",
      imgUrl: "",
    };
  },
  methods: {
    async editavatar() {
      const data = await editAvatar({ imgUrl: this.imgUrl });
      if (data.code === 0) {
        location.reload();
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl;
    },
    beforeAvatarUpload(file) {},
  },
};
</script>

<style lang="less" scoped>
ul {
  line-height: 50px;
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 15px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>