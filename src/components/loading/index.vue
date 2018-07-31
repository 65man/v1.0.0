<template>
    <div id="loading">
      <!-- 头部 -->
      <div class="login_header">
        <h1>代理商管理系统</h1>
      </div>
    </div>
</template>

<script src="./loading.js"></script>
<style lang="scss">
#loading {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: url(../../assets/img/bg.jpg) no-repeat;
  background-size: 100% 100%;
  .login_header {
    position: relative;
    top: 0;
    height: 35%;
    width: 100%;
    text-align: center;
    color: #fff;
    h1 {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }
  }
}
</style>