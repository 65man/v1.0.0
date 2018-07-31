<template>
  <div id="income-cd">
    <!-- 固定头部 -->
    <div class="cd-fixed">
      <div class="title">
        <!-- 提现明细表头 -->
        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th>
                <span>订单号</span>
              </th>
              <th @click='sortUD(2)' :style="{color:sortUDindex==2?'#1296db':'#000'}">
                <span>金额(元)
                 <icon  :name="sortUDindex==2?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(1)' :style="{color:sortUDindex==1?'#1296db':'#000'}">
                <span>申请时间
                 <icon  :name="sortUDindex==1?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>

              <th>
                 <group>
                  <selector placeholder="请选择" v-model="statusVal" :options="selectStatus"></selector>
                </group>
              </th>
            </tr>
          </thead>
        </x-table>
      </div>
    </div>
    <!-- 滚动表格区 -->
    <div class="cd-table">
      <scroller lock-x height="-90" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
        :bounce="true" :pulldown-config="this.$store.state.downconfig" :pullup-config="this.$store.state.upconfig"
        ref="scroller" v-show="isTable">
        <!-- 提现明细表格 -->
        <div>
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
            <tbody>
              <tr  v-for="(item,index) in listData" @click="listDetail(index)" :key=item.id>
                <td>{{item.order_id}}</td>
                 <td>{{item.money/100|moneyFormat(2,1)}}</td>
                <td>{{item.created_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{item.status}}</td>
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
      <!-- 提现明细详情 -->
      <x-dialog v-model="isDetailed" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="ul-xdialog" @click="isDetailed = false">
          <x-table>
            <thead>
              <tr>
                <th colspan="2">提现明细详情</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>订单号</td>
                <td>{{detailedData.order_id}}</td>
              </tr>
              <tr>
                <td>申请时间</td>
                <td>{{detailedData.created_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
              <tr>
                <td>金额(元)</td>
                <td>{{detailedData.money/100|moneyFormat(2,1)}}</td>
              </tr>
              <tr>
                <td>金币数量(个)</td>
                <!-- <td>{{detailedData.money/100|moneyFormat(2,1)}}</td> -->
                <td>{{detailedData.gold}}</td>
              </tr>
              <tr>
                <td>状态</td>
                <td>{{detailedData.status}}</td>
              </tr>
              <tr v-if='detailedData.status=="已通过"'>
                <td>通过时间</td>
                <td>{{detailedData.updated_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
              <tr v-if='detailedData.status=="已拒绝"'>
                <td>拒绝时间</td>
                <td>{{detailedData.updated_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
              <tr  v-if='detailedData.reason!=""'>
                <td>备注</td>
                <td>{{detailedData.reason}}</td>
              </tr>
            </tbody>
          </x-table>
          <p>温馨提示：审核、提现到账时间可能会有延误，敬请原谅</p>
          <x-icon type="ios-close-outline" style="fill:#999;"></x-icon>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script src="./cashdetail.js"></script>
<style lang="scss">
    @import "../../styles/cashDetail.scss";
</style>
