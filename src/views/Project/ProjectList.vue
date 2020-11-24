<template>
  <panel>
    <template #title> 商品列表 </template>
    <template #content>
      <div>
        <el-table :data="tableData" stripe>
          <el-table-column type="expand">
            <template v-slot="{ row }">
              <el-form label-position="left" inline class="demo-table-expand">
                <ul>
                  <li>
                    <strong>商品ID：</strong>
                    <span>{{ row.id }}</span>
                  </li>
                  <li>
                    <strong>商品名称：</strong>
                    <span>{{ row.name }}</span>
                  </li>
                  <li>
                    <strong>所属分类：</strong>
                    <span>{{ row.category }}</span>
                  </li>
                  <li>
                    <strong>商品价格：</strong>
                    <span>{{ row.price }}</span>
                  </li>
                  <li>
                    <strong>商品图片：</strong>
                    <span>
                      <img :src="baseUrl + row.imgUrl" alt="row.imgUrl"
                    /></span>
                  </li>
                  <li>
                    <strong>创建时间：</strong>
                    <span>{{ row.ctime | formatDate }}</span>
                  </li>
                  <li>
                    <strong>商品评价：</strong>
                    <span>{{ row.rating }}</span>
                  </li>
                  <li>
                    <strong>商品销量：</strong>
                    <span>{{ row.sellCount }}</span>
                  </li>
                  <li>
                    <strong>商品描述：</strong>
                    <span>{{ row.goodsDesc }}</span>
                  </li>
                </ul>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" width="300">
          </el-table-column>
          <el-table-column label="所属分类" prop="category" width="200">
          </el-table-column>
          <el-table-column label="商品价格" prop="price" width="100">
          </el-table-column>
          <el-table-column label="商品图片" width="200">
            <template v-slot="{ row }">
              <img :src="baseUrl + row.imgUrl" alt="row.imgUrl" />
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc" width="350">
          </el-table-column>
          <el-table-column label="操作" min-width="200px" fixed="right">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                size="mini"
                @click="
                  $router.push({
                    path: '/project/projectedit',
                    query: { id: row.id },
                  })
                "
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="delGoods(row.id)"
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
      </div>
    </template>
  </panel>
</template>

<script>
import { getGoodslist, deleteGoods } from "../../API/project";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      baseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
    };
  },
  created() {
    this.getGood();
  },
  methods: {
    // 获取商品列表
    async getGood() {
      const { data, total } = await getGoodslist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      if (data.length === 0 && this.currentPage !== 0) {
        this.currentPage -= 1;
        this.getGood();
      }
      this.total = total;
      this.tableData = data;
    },
    // 删除商品
    delGoods(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = await deleteGoods({ id });
          if (data.code === 0) {
           
            this.getGood();
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
      this.getGood();
    },
    //当前页数据一共分多少页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGood();
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
  margin: 20px 0;
  ul {
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    align-items: center;
    font-size: 14px;
    li {
      width: 50%;
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
  }
  img {
    width: 70px;
    height: 70px;
  }
}
.pagin {
  display: flex;
  justify-content: center;
}
</style>