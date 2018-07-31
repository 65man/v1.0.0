<template>
  <div id="layout" @click="hideMenu" ref='getmenuHeight'>
    <!-- 头部 -->
    <div class="lo-header">
      <div class="head_left"  @click="showMenu">
          <icon  name="menu" class="svg-header"></icon>
      </div>
      <h1>{{this.$store.state.headerTitle}}</h1>
      <div class="head_right" @click='gomyMessage'>
        <icon  name="news" class="svg-header"></icon>
        <div class="notice" v-if='noticeCount!=0'>
            <badge :text="noticeCount"></badge>
        </div>
      </div>
    </div>
    <!-- 菜单 -->
    <div class="lo-memu"  v-bind:style="{opacity:menuOpacity,height:menuHeight+'px',left: menuLeft+'%'}">
       <h3>首页</h3>
      <ul class="clearfix">
        <li @click='gohome'>概览</li>
      </ul>
      <h3>我的用户</h3>
      <ul class="clearfix">
        <li @click='gouserList'>用户列表</li>
        <li @click='gouserCount'>用户统计</li>
      </ul>
      <h3>我的代理</h3>
      <ul class="clearfix">
        <li  v-if='this.$store.state.roles!="1"' @click='gohigherAgent'>上级代理</li>
        <li  @click='golowerAgent'>下级代理</li>
        <!-- <li  @click='goaddAgent'>新增代理</li> -->
        <li  @click='goagentCount'>代理统计</li>
        <!-- <li  v-if='this.$store.state.roles!="3"' @click='goagentApproval'>代理审批</li> -->
      </ul>
      <h3>我的收益</h3>
      <ul class="clearfix">
        <li @click='goincomeCount'>收益汇总</li>
        <li @click='goincomeDetail'>收益明细</li>
        <li @click='gocashOutlay'>提现</li>
        <li @click='gocashDetail'>提现明细</li>
      </ul>
      <h3>更多功能</h3>
      <ul class="clearfix">
        <li @click='gomyInfo'>我的信息</li>
      </ul>
      <div  class="login_out"  @click="loginout">
         <x-button type="warn" mini action-type="button">退出登录</x-button>
      </div>

    </div>

    <!-- 路由盒子 -->
    <div class="memu_box">
      <router-view></router-view>
    </div>
  </div>

</template>

<script src="./layout.js"></script>
<style lang="scss">
    @import "../../styles/layout.scss";
</style>
