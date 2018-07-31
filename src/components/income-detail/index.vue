<template>
  <div id="income-id">
    <!-- 固定头部 -->
    <div class="id-fixed">
      <!-- tab切换栏 -->
      <div class="id-nav">
        <button-tab v-model="navIndex">
          <button-tab-item @on-item-click="tabIndex(0)">分销返利</button-tab-item>
          <button-tab-item @on-item-click="tabIndex(1)">绩效奖</button-tab-item>
        </button-tab>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <x-input :placeholder="placeholder" v-model='inputVal'></x-input>
        <x-button mini type="primary" action-type="button" @click.native='sendSearch'>查询</x-button>
      </div>
      <!-- 日期查询 -->
      <!-- <div class="cd-date">
        <group>
          <datetime title="点击选择月份查询" v-model="dateMonth" @on-change="changeMonth" :min-year=2018 format="YYYY-MM" year-row="{value}年"
            month-row="{value}月"></datetime>
        </group>
      </div> -->

      <div class="title0" v-if="navIndex==0">
        <!-- 用户收益表头 -->
        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th @click='sortUD(0)' :style="{color:sortUDindex==0?'#1296db':'#000'}">
                <span>返利单号
                  <icon  :name="sortUDindex==0?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(1)' :style="{color:sortUDindex==1?'#1296db':'#000'}">
                <span>用户ID
                 <icon  :name="sortUDindex==1?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(2)' :style="{color:sortUDindex==2?'#1296db':'#000'}">
                <span>返利(元)
                  <icon  :name="sortUDindex==2?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(3)' :style="{color:sortUDindex==3?'#1296db':'#000'}">
                <span>返现时间
                   <icon  :name="sortUDindex==3?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
            </tr>
          </thead>
        </x-table>
      </div>
      <div class="title1" v-if="navIndex==1">
        <!-- 下级分成表头 -->
        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th @click='sortUD(0)' :style="{color:sortUDindex==0?'#1296db':'#000'}">
                <span>绩效奖单号
                  <icon  :name="sortUDindex==0?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(1)' :style="{color:sortUDindex==1?'#1296db':'#000'}">
                <span>直属代理名称
                <icon  :name="sortUDindex==1?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(2)' :style="{color:sortUDindex==2?'#1296db':'#000'}">
                <span>奖金(元)
                 <icon  :name="sortUDindex==2?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(3)' :style="{color:sortUDindex==3?'#1296db':'#000'}">
                <span>分奖时间
                  <icon  :name="sortUDindex==3?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
            </tr>
          </thead>
        </x-table>
      </div>
    </div>
    <!-- 滚动表格区 -->
    <div class="id-table">
      <scroller lock-x height="-170" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
        :bounce="true" :pulldown-config="this.$store.state.downconfig" :pullup-config="this.$store.state.upconfig" ref="scroller"
        v-show="true">
        <!-- 分销收益 -->
        <div  v-if="navIndex==0&&listData"  class="id-table0">
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;"   v-if="listData">
            <tbody>
              <tr v-for="(item,index) in listData" @click="openIncomeDetail(index)" :key='item.id'>
                <td>{{item.cost_id}}</td>
                <td>{{item.role_id}}</td>
                <td>{{item.performance/100|moneyFormat(2,1)}}</td>
                <td>{{item.created_at*1000|dateFormat('YYYY-MM-DD')}}</td>
              </tr>
              <tr>
                <td colspan=4 v-if='listData.length!=0'>第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)</td>
                <td colspan=4 v-if='listData.length==0'>暂无数据</td>
              </tr>
            </tbody>
          </x-table>
        </div>
        <!-- 绩效奖 -->
        <div v-if="navIndex==1&&listData"  class="id-table1">
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
            <tbody >
              <tr v-for="(item,index)  in listData" @click="openDetail(item.performance_id,index)" :key='item.id'>
                <td>{{item.performance_id}}</td>
                <td>{{item.lower_nickname}}</td>
                <td>{{item.money/100|moneyFormat(2,1)}}</td>
                <td>{{item.date_time*1000|dateFormat()}}</td>
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


    <!-- 弹框详细信息 -->
    <div>
      <x-dialog v-model="isDialog" v-if="navIndex==0" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="ul-xdialog ul-xdialog-1">
          <x-table>
            <thead>
              <tr>
                <th colspan="2">分销收益详情</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>返利单号</td>
                <td>{{listDetail.cost_id}}</td>
              </tr>
              <tr>
                <td>用户ID</td>
                  <td>{{listDetail.role_id}}</td>
              </tr>
              <!-- <tr>
                <td>系统回收金币</td>
                  <td>{{listDetail.cost_id}}</td>
              </tr> -->
              <tr>
                <td>返利实得(元)</td>
                 <td>{{listDetail.cost_id}}</td>
              </tr>
              <tr>
                <td>返现比例</td>
                  <td v-if="listDetail.rebate_level == 1">{{listDetail.level_1|percent()}}</td>
                  <td v-if="listDetail.rebate_level == 2">{{listDetail.level_2|percent()}}</td>
                  <td v-if="listDetail.rebate_level == 3">{{listDetail.level_3|percent()}}</td>
              </tr>
              <tr>
                <td>返利税率</td>
                  <td>{{listDetail.tax|percent()}}</td>
              </tr>
              <tr>
                <td>返现时间</td>
                  <td>{{listDetail.created_at*1000|dateFormat()}}</td>
              </tr>
            </tbody>
          </x-table>
           <p class="table-recycle-title">系统回收金币</p>
            <div class="gold-recycle">
                 <div class="table-recycle-scroll">
                  <x-table class="table-recycle" full-bordered>
                    <tbody>
                        <tr>
                            <td>合计</td>
                            <td>123123</td>
                        </tr>
                        <tr>
                            <td>十人抢庄牛牛</td>
                            <td>12312312</td>
                        </tr>
                        <tr>
                            <td>十人抢庄牛牛</td>
                            <td>12312312</td>
                        </tr>
                        <tr>
                            <td>十人抢庄牛牛</td>
                            <td>12312312</td>
                        </tr>
                        <tr>
                            <td>十人抢庄牛牛</td>
                            <td>12312312</td>
                        </tr>
                        <tr>
                            <td>十人抢庄牛牛</td>
                            <td>12312312</td>
                        </tr>
                        <tr>
                            <td>十人抢庄牛牛</td>
                            <td>12312312</td>
                        </tr>
                    </tbody>
                </x-table>
                 </div>
            </div>
          <x-icon type="ios-close-outline" style="fill:#999;"  @click="isDialog = false"></x-icon>
        </div>
      </x-dialog>
      <x-dialog v-model="isDialog" v-if="navIndex==1" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="ul-xdialog" @click="isDialog = false">
          <x-table>
            <thead>
              <tr>
                <th colspan="2">绩效奖详情</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>绩效奖单号</td>
                <td>{{listDetail.performance_id}}</td>
              </tr>
              <tr>
                <td>直属代理名称</td>
                <td>{{listDetail.lower_nickname}}</td>
              </tr>
              <tr>
                <td>直属代理星级</td>
                <td>{{listDetail.lower_star}} ({{listDetail.lower_ratio|percent()}})</td>
              </tr>
              <tr>
                <td>我的星级</td>
                <td>{{listDetail.star}} ({{listDetail.ratio|percent()}})</td>
              </tr>
              <tr>
                <td>绩差比例</td>
                <td>{{listDetail.ratio - listDetail.lower_ratio|percent()}}</td>
              </tr>
              <tr>
                <td>参与奖励金额(元)</td>
                <td>{{listDetail.lower_increase_production}}</td>
              </tr>
              <tr>
                <td>奖励金额(元)</td>
                <td>{{listDetail.performance}}</td>
              </tr>
              <tr>
                <td>奖励时间</td>
                <td>{{listDetail.date_time*1000|dateFormat()}}</td>
              </tr>
            </tbody>
          </x-table>
          <x-icon type="ios-close-outline" style="fill:#999;"></x-icon>
        </div>
      </x-dialog>
    </div>
  </div>

</template>

<script src="./incomedetail.js"></script>
<style lang="scss">
@import "../../styles/incomeDetail.scss";
</style>
