<template>
  <div>
    <panel>
      <template #title>修改商品</template>
      <template #content>
        <el-form
          :model="goodsForm"
          status-icon
          :rules="rules"
          ref="goodsForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="goodsName">
            <el-input
              type="text"
              v-model="goodsForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品分类" prop="goodsGroup">
            <el-select
              v-model="goodsForm.category"
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
              v-model="goodsForm.price"
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
              v-model="goodsForm.goodsDesc"
            >
            </el-input>
          </el-form-item>
          <el-button type="primary" @click="editSubmit">修改</el-button>
          <el-button type="default">重置</el-button>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import { validchecknull } from "../../utils/validate";
import { editGoods, getAllcate, editGood } from "../../API/project";
export default {
  data() {
    return {
      catelist: [],
      imageUrl: "",
      goodsForm: {
        textarea: "",
        imgUrl: "",
        name: "",
        category: "",
        price: "",
        goodsDesc: "",
      },

      rules: {
        goodsName: [{ validator: validchecknull, trigger: "blur" }],
      },
    };
  },
  created() {
    this.getitem();
    this.getCate();
  },
  methods: {
    // 确认修改
    async editSubmit() {
      this.$refs.goodsForm.validate(async (valid) => {
        const data = await editGood({
          name: this.goodsForm.name,
          category: this.goodsForm.category,
          price: this.goodsForm.price,
          imgUrl: this.goodsForm.imgUrl,
          goodsDesc: this.goodsForm.goodsDesc,
          id: this.$route.query.id,
        });
        if (data.code === 0) {
          setTimeout(() => {
            this.$router.push("/project/projectlist");
          }, 1000);
        }
      });
    },
    async getitem() {
      const { data } = await editGoods({ id: this.$route.query.id });
      console.log(data);
      this.goodsForm = data[0];
      this.imageUrl =
        "http://127.0.0.1:5000/upload/imgs/goods_img/" + data[0].imgUrl;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.goodsForm.imgUrl = res.imgUrl;
      console.log(res);
    },
    beforeAvatarUpload(file) {},
    async getCate() {
      const { categories } = await getAllcate();
      this.catelist = categories;
    },
  },
};
</script>

<style lang="less" scoped>
.el-upload {
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  border: 1px dashed #000;
}
</style>