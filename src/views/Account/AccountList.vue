<template>
  <div>
    <panel>
      <template #title>账号列表</template>
      <template #content>
        <el-button type="danger" @click="delmore">批量删除</el-button>
        <el-button type="primary" @click="toggleSelection()"
          >取消选择</el-button
        >
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="account" label="账号"> </el-table-column>
          <el-table-column prop="userGroup" label="用户组"> </el-table-column>
          <el-table-column label="日期" show-overflow-tooltip>
            <template v-slot="{ row }">
              {{ row.ctime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <!-- row为当前行的数据 -->
            <template v-slot="{ row }">
              <el-button type="primary" size="mini" @click="editUser(row)"
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="del(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--element-ui 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <!-- element-ui 对话框组件 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="40%"
          :before-close="handleClose"
        >
          <el-form
            :model="editForm"
            status-icon
            :rules="rules"
            ref="editForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="editForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="用户组" prop="userGroup">
              <el-select
                v-model="editForm.userGroup"
                autocomplete="off"
                placeholder="请选择"
              >
                <el-option value="普通管理员">普通管理员</el-option>
                <el-option value="超级管理员">超级管理员</el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="edit">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </panel>
  </div>
</template>

<script>
import { userList, delUser, deletemore, editUser } from "../../API/user";
import { validateusername } from "../../utils/validate";
import moment from "moment";
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
      tableData: [],
      multipleSelection: [],
      pageSize: 5,
      currentPage: 1,
      total: 0,
      ids: [],
      id: "",
      dialogVisible: false,
      editForm: {
        username: "",
        userGroup: "",
      },
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
        userGroup: [{ validator: userGroup, trigger: "change" }],
      },
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    // 打开编辑模态框
    editUser(row) {
      this.dialogVisible = true;
      this.editForm.username = row.account;
      this.editForm.userGroup = row.userGroup;
      this.id = row.id;
    },
    // 提交编辑修改
    async edit() {
      this.dialogVisible = false;
      const data = await editUser({
        id: this.id,
        account: this.editForm.username,
        userGroup: this.editForm.userGroup,
      });
      if (data.code === 0) {
        this.getlist();
      }
    },
    // 批量删除账号
    delmore() {
      if (this.ids.length === 0) {
        this.$message({
          type: "error",
          message: "你还没选择要删除项哦 ~~",
        });
        return;
      }
      this.$confirm("此操作将永久删除所有选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = await deletemore({ ids: JSON.stringify(this.ids) });
          if (data.code === 0) {
            this.getlist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除账号功能
    del(id) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = await delUser({ id: id });
          if (data.code === 0) {
            this.getlist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 获取账号列表
    async getlist() {
      const { data, total } = await userList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      // console.log(data);
      this.tableData = data;
      this.total = total;
    },
    // 分页时，每一页显示的数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlist();
    },
    // 当前显示的是那一页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 当进行选中操作时，将触发这个方法——val就为选中的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = [];
      val.forEach((item) => {
        this.ids.push(item.id);
      });
    },
    // 关闭对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-table {
  td,
  th {
    text-align: center;
  }
}
/deep/.el-pagination {
  margin: 10px auto;
}
</style>