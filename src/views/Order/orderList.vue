<template>
  <div>
    <el-card>
      <el-form
        ref="orderlist"
        :inline="true"
        :model="orderForm"
        class="demo-form-inline"
      >
        <el-form-item label="订单号：" prop="orderNo">
          <el-input
            v-model="orderForm.orderNo"
            placeholder="订单号"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人：" prop="consignee">
          <el-input
            v-model="orderForm.consignee"
            placeholder="收货人"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input
            v-model="orderForm.phone"
            placeholder="手机号"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单状态：" prop="orderState">
          <el-select
            v-model="orderForm.orderState"
            placeholder="订单状态"
            size="mini"
          >
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间：" prop="date">
          <el-date-picker
            v-model="orderForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini"
            >查询</el-button
          >
          <el-button @click="resetForm" size="mini">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" width="100%" stripe>
        <el-table-column label="订单号" prop="orderNo"> </el-table-column>
        <el-table-column label="下单时间" width="200">
          <template v-slot="{ row }">
            {{ row.orderTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="200">
        </el-table-column>
        <el-table-column label="收货人" prop="consignee"> </el-table-column>
        <el-table-column label="配送地址" prop="deliverAddress">
        </el-table-column>
        <el-table-column label="到达时间" width="200">
          <template v-slot="{ row }">
            {{ row.deliveryTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="用户备注" prop="remarks"> </el-table-column>
        <el-table-column label="订单金额" prop="orderAmount">
          <template v-slot="{ row }">
            {{ row.orderAmount | formatMoney }}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="orderState"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="130">
          <template v-slot="{ row }">
            <a @click="checkData(row.id)">查看</a>
            <a
              @click="
                $router.push({
                  path: '/order/editorder',
                  query: { id: row.id },
                })
              "
              >编辑</a
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

      <!-- 点击查看弹出框 -->
      <el-dialog
        title="订单信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-steps :active="active" process-status="finish">
          <el-step title="已受理" icon="el-icon-goods"></el-step>
          <el-step title="派送中" icon="el-icon-truck"></el-step>
          <el-step title="已完成" icon="el-icon-success"></el-step>
        </el-steps>
        <ul>
          <li>
            <strong>收货人：</strong>
            <span>{{ singleData.consignee }}</span>
          </li>
          <li>
            <strong>订单号：</strong>
            <span>{{ singleData.orderNo }}</span>
          </li>
          <li>
            <strong>派送地址：</strong>
            <span>{{ singleData.deliverAddress }}</span>
          </li>
          <li>
            <strong>下单时间：</strong>
            <span>{{ singleData.orderTime | formatDate }}</span>
          </li>
          <li>
            <strong>到达时间：</strong>
            <span>{{ singleData.deliveryTime | formatDate }}</span>
          </li>
          <li>
            <strong>收货电话：</strong>
            <span>{{ singleData.phone }}</span>
          </li>
          <li>
            <strong>订单金额：</strong>
            <span>{{ singleData.orderAmount }}</span>
          </li>
          <li>
            <strong>订单状态：</strong>
            <span>{{ singleData.orderState }}</span>
          </li>
          <li>
            <strong>订单备注：</strong>
            <span>{{ singleData.remarks }}</span>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getOrder, detailOrder } from "../../API/order";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      singleData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      active: 0,
      orderForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: "",
      },
    };
  },
  created() {
    this.getOrderlist();
  },
  methods: {
    // 查看列表数据
    async checkData(id) {
      this.dialogVisible = true;
      const { data } = await detailOrder({
        id,
      });
      this.singleData = data;
      switch (this.singleData.orderState) {
        case "已受理":
          this.active = 0;

          break;
        case "派送中":
          this.active = 1;

          break;
        case "已完成":
          this.active = 2;

          break;
      }
    },
    // 获取订单列表
    async getOrderlist() {
      const { data, total } = await getOrder({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.orderForm.orderNo,
        consignee: this.orderForm.consignee,
        phone: this.orderForm.phone,
        orderState: this.orderForm.orderState,
        date: JSON.stringify(this.orderForm.date),
      });
      this.tableData = data;
      this.total = total;
    },
    // 当前页显示的数据条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrderlist();
    },
    //当前页数据一共分多少页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderlist();
    },
    onSubmit() {
      this.currentPage = 1;
      this.getOrderlist();
    },
    resetForm() {
      this.orderForm.date = "";
      this.$refs.orderlist.resetFields();
      this.getOrderlist();
    },
    // 点击弹出框的叉
    handleClose(done) {
      done();
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
  a {
    margin: 0 10px;
    color: #42bfac;
  }
}
.pagin {
  display: flex;
  justify-content: center;
}
.el-form-item {
  margin-right: 30px;
  .el-input__inner {
    width: 350px;
  }
}
/deep/.el-dialog__body {
  line-height: 30px;
}
.el-steps {
  margin: 15px 0;
}
</style>