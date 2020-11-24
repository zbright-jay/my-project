<template>
  <div>
    <panel>
      <template #title> 商品添加 </template>
      <template #content>
        <el-form
          :model="goodsaddForm"
          status-icon
          :rules="rules"
          ref="goodsaddForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="goodsName">
            <el-input
              type="text"
              v-model="goodsaddForm.goodsName"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品分类" prop="goodsGroup">
            <el-select
              v-model="goodsaddForm.goodsCate"
              autocomplete="off"
              placeholder="请选择"
            >
              <el-option
                v-for="item in catelist"
                :key="item.cateName"
                :value="item.cateName"
                >{{ item.cateName }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="goodsPrice">
            <el-input-number
              v-model="goodsaddForm.goodsPrice"
              @
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片" prop="goodsImg">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述" prop="goodsDesc">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
          </el-form-item>
          <el-button type="primary" @click="addSubmit">添加</el-button>
          <el-button type="default" @click="addSubmit">重置</el-button>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import { validchecknull } from "../../utils/validate";
import { getAllcate, addProject } from "../../API/project";
export default {
  data() {
    return {
      catelist: [],
      imageUrl: "",
      imgUrl: "",
      textarea: "",
      goodsaddForm: {
        goodsName: "",
        goodsCate: "",
        goodsPrice: 1,
      },
      rules: {
        goodsName: [{ validator: validchecknull, trigger: "blur" }],
      },
    };
  },
  created() {
    this.getCate();
  },
  methods: {
    addSubmit() {
      this.$refs.goodsaddForm.validate(async (valid) => {
        const data = await addProject({
          name: this.goodsaddForm.goodsName,
          category: this.goodsaddForm.goodsCate,
          price: this.goodsaddForm.goodsPrice,
          imgUrl: this.imgUrl,
          goodsDesc: this.textarea,
        });
        if (data.code === 0) {
          setTimeout(() => {
            this.$router.push("/project/projectlist");
          }, 1000);
        }
      });
    },

    async getCate() {
      const { categories } = await getAllcate();
      this.catelist = categories;
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
.el-input,
.el-select,
.el-textarea {
  width: 300px;
}
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
</style>