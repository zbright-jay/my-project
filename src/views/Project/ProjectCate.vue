<template>
  <div>
    <panel>
      <template #title>
        <div class="title">
          <span>商品分类</span>
          <el-button type="primary" size="mini" @click="addCate"
            >添加分类</el-button
          >
        </div>
      </template>

      <template #content>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="cateName" label="分类名称">
            <template v-slot="{ row }">
              <span v-if="row.flag">{{ row.cateName }}</span>
              <el-input v-model="row.cateName" v-else size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template v-slot="{ row }">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                :disabled="row.flag"
                v-model="row.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                :type="row.flag ? 'primary' : 'success'"
                size="mini"
                @click="editPro(row)"
                >{{ row.flag ? "编辑" : "完成" }}</el-button
              >
              <el-button type="danger" size="mini" @click="delCate(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <div class="pagin">
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
        <!-- element-ui 对话框组件 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="40%"
          :before-close="handleClose"
        >
          <el-form
            :model="CateForm"
            status-icon
            :rules="rules"
            ref="CateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="分类名称" prop="username">
              <el-input
                type="text"
                v-model="CateForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-switch
                v-model="CateForm.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini"
              >取 消</el-button
            >
            <el-button type="primary" @click="sureAdd" size="mini"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </template>
    </panel>
  </div>
</template>

<script>
import {
  getCatelist,
  delCatelist,
  addCatelist,
  editCate,
} from "../../API/project";
import { validateusername } from "../../utils/validate";
export default {
  created() {
    this.getcate();
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogVisible: false,
      CateForm: {
        username: "",
        state: 0,
      },
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 编辑分类
    async editPro(val) {
      if (val.flag === true) {
        val.flag = false;
      } else {
        val.flag = true;
        const data = await editCate({
          id: val.id,
          cateName: val.cateName,
          state: Boolean(val.state),
        });
        if (data.code === 0) {
          this.getcate();
        }
      }
    },
    // 添加分类
    addCate() {
      this.dialogVisible = true;
    },
    // 确认添加
    sureAdd() {
      this.$refs.CateForm.validate(async (valid) => {
        if (valid) {
          this.dialogVisible = false;
          const data = await addCatelist({
            cateName: this.CateForm.username,
            state: this.CateForm.state,
          });
          if (data.code === 0) {
            this.getcate();
          }
        } else {
          this.$message({
            type: "error",
            message: "表单验证没有通过",
          });
        }
      });
    },
    // 获取商品分类列表
    async getcate() {
      const { data, total } = await getCatelist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      data.forEach((element) => {
        element.flag = true;
      });
      this.tableData = data;
      this.total = total;
    },
    // 删除商品分类
    delCate(val) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = await delCatelist({ id: val });
          if (data.code === 0) {
            this.getcate();
            console.log(this.total);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 当前页显示的数据条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getcate();
    },
    //当前页数据一共分多少页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getcate();
    },
    // 关闭对话框
    handleClose(done) {
      done();
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
/deep/.el-table {
  td,
  th {
    text-align: center;
  }
  margin: 20px 0;
}
.pagin {
  display: flex;
  justify-content: center;
}
</style>