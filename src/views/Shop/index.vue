<template>
  <panel>
    <template #title> <span>店铺管理</span> </template>
    <template #content>
      <div>
        <el-form ref="form" :model="shopForm" label-width="80px" size="mini">
          <el-form-item label="店铺名称">
            <el-input v-model="shopForm.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="shopForm.bulletin"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/users/avatar_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="店铺图片">
            <el-upload
              action="http://127.0.0.1:5000/users/avatar_upload"
              list-type="picture-card"
              :on-success="handleShopSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="配送费">
            <el-input v-model="shopForm.deliveryPrice"></el-input>
          </el-form-item>
          <el-form-item label="配送时间">
            <el-input v-model="shopForm.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="shopForm.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-input v-model="shopForm.score"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="shopForm.sellCount"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-checkbox-group v-model="shopForm.supports">
              <el-checkbox label="在线支付满28减5"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
              <el-checkbox label="单人精彩套餐"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购"></el-checkbox>
              <el-checkbox label="单人特色套餐"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="shopForm.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </panel>
</template>

<script>
import { getShop, editShop } from "../../API/shop";
export default {
  data() {
    return {
      shopForm: {
        supports: [],
      },
      fileList: [],
      imageUrl: "",
      baseUrl: "http://127.0.0.1:5000/upload/shop/",
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.getShopInfo();
  },
  methods: {
    async getShopInfo() {
      const { data } = await getShop();
      console.log(data);
      this.shopForm = data;
      this.imageUrl = this.baseUrl + this.shopForm.avatar;
      data.pics.forEach((item) => {
        this.fileList.push({
          name: item,
          url: this.baseUrl + item,
        });
      });
      console.log(this.fileList);
    },
    // 确认修改店铺信息
    async onSubmit() {
      this.shopForm.pics = JSON.stringify(this.shopForm.pics);
      this.shopForm.date = JSON.stringify(this.shopForm.date);
      this.shopForm.supports = JSON.stringify(this.shopForm.supports);
      const { data } = await editShop(this.shopForm);
      if (data === 0) {
        location.reload();
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleShopSuccess(res, file) {
      // 成功之后保存返回的图片
    },
    handleRemove(file, fileList) {
      // 删除本地数组中的数据;
      const i = this.fileList.findIndex((item) => item === file.name);
      this.fileList.splice(i, 1);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 把上传成功的地址，存到了本地的data中
    },
  },
};
</script>

<style lang="less" scoped>
img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
</style>