<template>
  <div class="error">
    <p>{{ second }}秒后将跳转到<router-link to="/">首页</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      second: 10,
    };
  },
  created() {
    let time = setInterval(() => {
      if (this.second > 1) {
        this.second--;
      } else {
        clearInterval(time);
        this.$router.push("/");
      }
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
.error {
  width: 100%;
  height: 100%;
  background: url("../assets/images/error.png") no-repeat;
  background-size: 100% 100%;
  p {
    width: 100%;
    text-align: center;
    position: absolute;
    font-size: 25px;
    bottom: 200px;
    letter-spacing: 3px;
  }
}
</style>