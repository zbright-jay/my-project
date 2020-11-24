<template>
  <!-- 封装公用卡片面板组件 -->
  <div>
    <el-card>
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
/deep/.el-card__body {
  padding: 0;
}
.title {
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
}

.content {
  padding: 20px;
}
</style>