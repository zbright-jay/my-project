<template>
  <div>
    <panel>
      <template #title>订单编辑</template>
      <template #content>
        <el-form
          :model="orderForm"
          status-icon
          :rules="rules"
          ref="orderForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="订单号" prop="orderNo">
            <el-input
              type="text"
              v-model="orderForm.orderNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="订单时间" prop="orderDate">
            <el-date-picker
              v-model="orderForm.orderDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="下单时间"
              end-placeholder="送达时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input
              type="text"
              v-model="orderForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货人" prop="consignee">
            <el-input
              type="text"
              v-model="orderForm.consignee"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="deliverAddress">
            <el-input
              type="text"
              v-model="orderForm.deliverAddress"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单备注" prop="remarks">
            <el-input
              type="text"
              v-model="orderForm.remarks"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单金额" prop="orderAmount">
            <el-input
              type="text"
              v-model="orderForm.orderAmount"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="orderState">
            <el-select
              v-model="orderForm.orderState"
              autocomplete="off"
              placeholder="请选择"
            >
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="editSubmit">修改</el-button>
          <el-button type="default">重置</el-button>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import { detailOrder, editOrder } from "../../API/order";
import { validchecknull } from "../../utils/validate";
export default {
  data() {
    return {
      orderForm: {},
      rules: {
        orderNo: [{ validator: validchecknull, trigger: "blur" }],
      },
    };
  },
  created() {
    this.getedit();
  },
  // mounted() {
  //   console.log(this.orderForm.orderDate);
  // },
  methods: {
    async getedit() {
      const { data } = await detailOrder({
        id: this.$route.query.id,
      });
      //   console.log(data);
      this.orderForm = data;
      this.$set(this.orderForm, "orderDate", this.orderForm.orderDate);
      //   console.log(this.orderForm);
      this.orderForm.orderDate = [
        `${this.orderForm.orderTime}`,
        `${this.orderForm.deliveryTime}`,
      ];
      //   console.log(this.orderForm.orderDate);
    },
    editSubmit() {
      this.$refs.orderForm.validate(async (valid) => {
        const data = await editOrder({
          id: this.$route.query.id,
          orderNo: this.orderForm.orderNo,
          orderTime: this.orderForm.orderTime,
          phone: this.orderForm.phone,
          consignee: this.orderForm.consignee,
          deliveryTime: this.orderForm.deliveryTime,
          remarks: this.orderForm.remarks,
          deliverAddress: this.orderForm.deliverAddress,
          orderAmount: this.orderForm.orderAmount,
          orderState: this.orderForm.orderState,
        });
        if (data.code === 0) {
          setTimeout(() => {
            this.$router.push("/order/orderlist");
          }, 1000);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>