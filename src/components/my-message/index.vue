<template>
  <div id="more-mm">
    <!-- 导航头 -->
    <div class="mm-fixed">
      <!-- <div class="mm-nav">
        <button-tab v-model="navIndex">
          <button-tab-item @on-item-click="tabIndex(1)">公告</button-tab-item>
          <button-tab-item @on-item-click="tabIndex(2)">通知</button-tab-item>
          <button-tab-item @on-item-click="tabIndex(3)">互动</button-tab-item>
        </button-tab>
      </div> -->
      <div>
        <checker v-model="radioVal" default-item-class="selectedNo" selected-item-class="selectedYes" @on-change='radioIndex'>
          <div v-if='navIndex==0' class="tabIndex0">
            <checker-item value="0">
              <check-icon :value="radioVal==0" type="plain">所有公告</check-icon>
            </checker-item>
            <checker-item value="1">
              <check-icon :value="radioVal==1" type="plain">暂待开发</check-icon>
            </checker-item>
            <checker-item value="2">
              <check-icon :value="radioVal==2" type="plain">暂待开发</check-icon>
            </checker-item>
          </div>
          <div v-if='navIndex==1' class="tabIndex1">
            <checker-item value="0">
              <check-icon :value="radioVal==0" type="plain">所有消息</check-icon>
			</checker-item>
			 <checker-item value="apply">
              <check-icon :value="radioVal=='apply'" type="plain">代理消息</check-icon>
            </checker-item>
            <checker-item value="withdraw ">
              <check-icon :value="radioVal=='withdraw '" type="plain">提现消息</check-icon>
            </checker-item>
          </div>
          <div v-if='navIndex==2' class="tabIndex2">
            <checker-item value="0">
              <check-icon :value="radioVal==0" type="plain">所有互动</check-icon>
            </checker-item>
            <checker-item value="1">
              <check-icon :value="radioVal==1" type="plain">暂待开发</check-icon>
            </checker-item>
            <checker-item value="2">
              <check-icon :value="radioVal==2" type="plain">暂待开发</check-icon>
            </checker-item>
          </div>
        </checker>
      </div>
    </div>

    <!-- 滚动区 -->
    <div class="mm-box">
      <scroller lock-x height="-100" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
        :bounce="true" :pulldown-config="this.$store.state.downconfig" :pullup-config="this.$store.state.upconfig" ref="scroller"
        v-show="isList">
        <div>
          <div class="message" style="color:#999" v-for="item in listData" :key='item.id' @click="openDetail(item.target_type,item.target)">
            <div class="title">
              <div :style="item.is_read=='0'?'color:#000':'color:#999'" v-if='item.target_type=="apply"'>
                <span>【{{item.sender}}】</span>代理申请通知</div>
              <div :style="item.is_read=='0'?'color:#000':'color:#999'"  v-if='item.target_type=="withdraw"'>
                <span>【{{item.sender}}】</span>提现审核通知</div>
              <span>{{item.created_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
            <group>
              <cell is-link :title="item.content">
                <div class="badge-value" v-if='item.is_read=="0"'>
                    <badge></badge>
                </div>
              </cell>
            </group>
          </div>
          <div class="messagetips" v-if='listData.length!=0'>
            第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)
          </div>
          <div class="message messagetips" v-if='listData.length==0'>
            暂无消息
          </div>
        </div>
      </scroller>
    </div>
  </div>

</template>

<script src="./mymessage.js"></script>
<style lang="scss">
@import "../../styles/myMessage.scss";
</style>