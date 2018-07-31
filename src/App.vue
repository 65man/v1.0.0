<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "app"
    };
</script>

<style lang="sass">
  @import "./styles/base.scss";
</style>
<style lang="less">
    @import "~vux/src/styles/reset.less";
    @import '~vux/src/styles/1px.less';
    body {
        background-color: #fbf9fe;
    }
    html,
    body,
    #app {
        height: 100%;
        min-height: 500px;
        max-width: 980px;
        margin: 0 auto;
    }
</style>

