<template>
  <div id="income-ic">
    <div class="ic-fixed">
      <!--收益汇总头部 -->
      <!-- <div class="ic-header">
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">
              <p>本周收益</p>
              <p>￥300.00</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p>本月收益</p>
              <p>￥3000.00</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p>累计收益</p>
              <p>￥30000.00</p>
            </div>
          </flexbox-item>
        </flexbox>
      </div> -->
      <!-- 查询日期 -->
      <div class="cd-date ">
        <group>
          <datetime title="点击选择月份查询" v-model="dateMonth" @on-change="changeMonth" :min-year=2018 format="YYYY-MM" year-row="{value}年" month-row="{value}月" ></datetime>
        </group>
      </div>
      <!-- 固定表头 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>日期</th>
            <th>分销收益(元)</th>
            <th>绩效奖(元)</th>
            <th>合计(元)</th>
          </tr>
        </thead>
      </x-table>
    </div>
    <!-- 滚动表格区 -->
    <div class="ic-table">
      <scroller lock-x height="-115" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
        :bounce="true" :pulldown-config="this.$store.state.downconfig" :pullup-config="this.$store.state.upconfig"
        ref="scroller" v-show="isTable">
        <!-- 1.活跃用户表格 -->
        <div>
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
            <tbody>
              <tr  v-for="item in listData"  :key='item.id'>
                 <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                 <td>{{item.invite_income/100|moneyFormat(2,1)}}</td>
                 <td>{{item.agency_invite_income/100|moneyFormat(2,1)}}</td>
                <td>{{item.income/100|moneyFormat(2,1)}}</td>
              </tr>
              <tr>
              <td colspan=4 v-if='listData.length!=0'>第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)</td>
               <td colspan=4 v-if='listData.length==0'>暂无数据</td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </scroller>
    </div>
  </div>

</template>

<script src="./incomecount.js"></script>
<style lang="scss">
@import "../../styles/incomeCount.scss";
</style>
