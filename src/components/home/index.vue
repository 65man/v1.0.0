<template>
  <div id="home">
    <!-- 总收入 -->
    <div class="home-income">
        <!-- 邀请码 -->
      <!-- <div class="homeCode vux-1px-t vux-1px-b">
        <span> 我的邀请码：</span>
        <p>{{this.$store.state.copyCode}}</p>
        <x-button type="primary" mini action-type="button" v-clipboard:copy="this.$store.state.copyCode" v-clipboard:success="onCopy">复制</x-button>
      </div> -->
      <group-title>总收入</group-title>
      <grid class="income">
        <grid-item>
          <p slot="label">￥
            <countup :end-val="123456789.88" :duration="1" :decimals="2"></countup>
          </p>
        </grid-item>
      </grid>
      <group-title>数据中心</group-title>
      <grid :cols="2">
        <grid-item>
          <p slot="label">昨日收益</p>
          <p slot="label" class="data-center-num">￥ 1000</p>
        </grid-item>
        <grid-item>
          <p slot="label" >已提现(截止至昨日)</p>
          <p slot="label" class="data-center-num">￥ 1000</p>
        </grid-item>
        <grid-item>
          <p slot="label">昨日新增用户</p>
          <p slot="label" class="data-center-num">666</p>
        </grid-item>
        <grid-item>
          <p slot="label">昨日活跃用户</p>
          <p slot="label" class="data-center-num">333</p>
        </grid-item>
      </grid>
    </div>
    <!-- 快捷入口 -->
    <div class="home-nav">
      <group-title>快捷入口</group-title>
      <grid :cols="2">
        <grid-item link="/layout/cashoutlay">
          <icon  slot="icon"   name="cashout" class="svg-quick" ></icon>
          <span slot="label">提现</span>
        </grid-item>
        <grid-item link="/layout/usercount">
            <icon  slot="icon"   name="datacount" class="svg-quick" ></icon>
          <span slot="label">用户统计</span>
        </grid-item>
        <grid-item link="/layout/loweragent">
           <icon  slot="icon"   name="loweragent" class="svg-quick" ></icon>
          <span slot="label">下级代理</span>
        </grid-item>
        <grid-item link="/layout/shareqrcode">
          <icon  slot="icon"   name="qrcode" class="svg-quick" ></icon>
          <span slot="label">邀请二维码</span>
        </grid-item>
      </grid>
    </div>
  </div>

</template>

<script src="./home.js"></script>
<style lang="scss">
#home {
  .home-income {
    .homeCode {
      position: relative;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      span {
        position: absolute;
        left: 8px;
      }
      .weui-btn {
        position: absolute;
        right: 8px;
        top: 4px;
      }
    }
    .income {
      p {
        font-size: 36px;
        font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
        font-weight: 600;
      }
    }
    .data-center-num{
        font-size: 16px;
        font-weight: 600;
    }
  }
  .home-nav {
    .svg-quick {
      width: 28px;
      height: 28px;
      margin: 0 auto;
    }
  }
}
</style>
