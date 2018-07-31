<template>
  <div class="agentcount">
    <!-- 导航头 -->
    <div class="dc-fixed">
      <div class="dc-nav">
        <button-tab v-model="navIndex">
            <button-tab-item @on-item-click="tabIndex(0)">活跃用户</button-tab-item>
            <button-tab-item @on-item-click="tabIndex(1)">新增用户</button-tab-item>
            <button-tab-item @on-item-click="tabIndex(2)">总用户数</button-tab-item>
           <button-tab-item @on-item-click="tabIndex(3)">游戏数据</button-tab-item>
        </button-tab>
      </div>

      <!-- 日期查询 -->
      <div class="cd-date">
        <group>
          <datetime title="点击选择月份查询" v-model="dateMonth" @on-change="changeMonth" :min-year=2018 format="YYYY-MM" year-row="{value}年" month-row="{value}月" ></datetime>
        </group>
      </div>


      <!-- 1.活跃用户表头 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==0" class="tableIndex-0">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>日期</th>
            <th>活跃用户数(个)</th>
          </tr>
        </thead>
      </x-table>




            <!--2. 新增用户表头 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==1" class="tableIndex-1">
        <thead>
          <tr style="background-color: #F7F7F7"  v-if='!hasReduce'>
            <th>日期</th>
            <th>新增用户(个)</th>
          </tr>
            <tr style="background-color: #F7F7F7"  v-if='hasReduce'>
            <th>日期</th>
            <th>新增用户(个)</th>
             <th>减少用户(个)</th>
          </tr>
        </thead>
      </x-table>

      <!-- 1.总用户数 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==2" class="tableIndex-0">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>日期</th>
            <th>总用户数(个)</th>
          </tr>
        </thead>
      </x-table>



     <!-- 1.游戏数据表头 -->
      <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==3" class="tableIndex-0">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>日期</th>
            <th>每天玩一局以上用户数(个)</th>
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
              <!-- 1.新增用户表格 -->
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==1&&listData" class="tableIndex-1">
            <tbody>
              <tr v-for="item in listData"  :key='item.id'  v-if='!hasReduce'>
                <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                <td>{{item.increase}}</td>
              </tr>
               <tr v-for="item in listData"  :key='item.id'  v-if='hasReduce'>
                <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                <td>{{item.increase}}</td>
                <td>{{item.reduce}}</td>
              </tr>
              <tr>
              <td colspan=4 v-if='listData.length!=0'>第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)</td>
               <td colspan=4 v-if='listData.length==0'>暂无数据</td>
              </tr>
            </tbody>
          </x-table>



          <!-- 活跃用户 玩一局用户 总用户数 -->
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" v-if="navIndex==0||navIndex==2||navIndex==3&&listData" class="tableIndex-0">
                <tbody>
               <tr v-for="item in listData"  :key='item.id'>
                <td>{{item.date_time*1000|dateFormat('MM-DD')}}</td>
                <td>{{item.counts}}</td>
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

<script src="./usercount.js"></script>
<style lang="scss" scope>
@import "../../styles/agent&userCount.scss";
</style>
