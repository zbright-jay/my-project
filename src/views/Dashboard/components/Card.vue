<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item, index) in list" :key="index">
      <div class="grid-content bg-purple">
        <div>
          <i
            class="iconfont"
            :class="item.icon"
            :style="{ color: item.color }"
          ></i>
        </div>
        <div>
          <span>{{ item.title }}</span>
          <p>{{ item.num }}</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.bg-purple {
  background-color: #fff;
  display: flex;
  padding: 20px 0;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  i {
    font-size: 50px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      color: #ccc;
      margin-bottom: 10px;
    }
    p {
      font-weight: 700;
    }
  }
}
.grid-content {
  border-radius: 4px;
}
</style>