<template>
  <div class="agentcount">
    <!-- 导航头 -->
    <div class="dc-fixed">
      <div class="dc-nav">
        <button-tab v-model="navIndex">
          <button-tab-item @on-item-click="tabIndex(0)">新增代理</button-tab-item>
          <button-tab-item @on-item-click="tabIndex(1)">直属代理</button-tab-item>
        </button-tab>
      </div>

      <!-- 日期查询 -->
      <div class="cd-date">
        <group>
          <datetime title="点击选择月份查询" v-model="dateMonth" @on-change="changeMonth" :min-year=2018 format="YYYY-MM" year-row="{value}年" month-row="{value}月" ></datetime>
        </group>
      </div>

      <!-- 3.新增代理表头 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==0" class="tableIndex-2">
        <thead>
          <tr style="background-color: #F7F7F7"  v-if='!hasReduce'>
            <th>日期</th>
            <th>新增代理(个)</th>
            <th>
               <group>
            <selector placeholder="请选择" v-model="levelOption" :options="selectLevel"></selector>
          </group>
            </th>
          </tr>
           <tr style="background-color: #F7F7F7"  v-if='hasReduce'>
            <th>日期</th>
            <th>新增代理(个)</th>
            <th>减少代理(个)</th>
            <th>
               <group>
            <selector placeholder="请选择" v-model="levelOption" :options="selectLevel"></selector>
          </group>
            </th>
          </tr>
        </thead>
      </x-table>

      <!-- 1.总用户数 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==1" class="tableIndex-3">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>日期</th>
            <th>总数</th>
            <th>5星</th>
            <th>4星</th>
            <th>3星</th>
            <th>2星</th>
            <th>1星</th>
            <th>0星</th>
          </tr>
        </thead>
      </x-table>



    </div>

    <!-- 滚动表格区 -->
    <div class="dc-table">
      <scroller lock-x height="-170" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
        :bounce="true" :pulldown-config="this.$store.state.downconfig" :pullup-config="this.$store.state.upconfig"
        ref="scroller" v-show="isTable">
        <div>
        <!-- 3.新增代理表格 -->
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==0&&listData" class="tableIndex-2">
            <tbody>
            <tr v-for="item in listData"  :key='item.id'  v-if='!hasReduce'>
                <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                <td>{{item.increase}}</td>
                  <td>{{levelOption==0?'所有':levelOption+'级'}}</td>
              </tr>
            <tr>
              <tr v-for="item in listData"  :key='item.id'  v-if='hasReduce'>
                <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                <td>{{item.increase}}</td>
                <td>{{item.reduce}}</td>
                 <td>{{levelOption==0?'所有':levelOption+'级'}}</td>
              </tr>
            <tr>
              <td colspan=4 v-if='listData.length!=0'>第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)</td>
               <td colspan=4 v-if='listData.length==0'>暂无数据</td>
              </tr>
            </tbody>
          </x-table>

          <!-- 总用户数 -->
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==1&&listData" class="tableIndex-3">
                <tbody>
             <tr v-for="item in listData"  :key='item.id'>
                <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
                <td>{{item.counts}}</td>
              </tr>
            <tr>
              <td colspan=8 v-if='listData.length!=0'>第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)</td>
               <td colspan=8 v-if='listData.length==0'>暂无数据</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </scroller>

    </div>
  </div>

</template>

<script src="./agentcount.js"></script>
<style lang="scss" scope>
@import "../../styles/agent&userCount.scss";
</style>
