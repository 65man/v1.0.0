<template>
  <div id="userlist">
    <!-- 搜索框 -->
    <div class="ul-search">
      <div class="search">
        <div>
          <group>
            <selector placeholder="请选择" v-model="optionVal" :options="selectList"></selector>
          </group>
        </div>
        <x-input :placeholder="placeholderVal" v-model='inputVal' :disabled='false' :style="{background:optionVal==0?'#d8d8d8':'#fff'}"></x-input>
        <x-button mini type="primary" action-type="button" @click.native='sendSearch' >查询</x-button>
      </div>

      <!-- 表头 -->
      <div class="title">
        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th  @click='sortUD(0)' :style="{color:sortUDindex==0?'#1296db':'#000'}" style="width: 20%">
                <span>游戏ID
                  <icon  :name="sortUDindex==0?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th  @click='sortUD(1)' :style="{color:sortUDindex==1?'#1296db':'#000' }" style="width: 25%">
                <span>绑定代理
                     <icon  :name="sortUDindex==1?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(2)' :style="{color:sortUDindex==2?'#1296db':'#000'}" style="width: 30%">
                <span>金币总消耗(个)
                    <icon  :name="sortUDindex==2?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(3)' :style="{color:sortUDindex==3?'#1296db':'#000'}" style="width: 25%">
                <span>绑定时间
                    <icon  :name="sortUDindex==3?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
            </tr>
          </thead>
        </x-table>
      </div>
    </div>

    <!-- 滚动表格区 -->
    <div class="ul-table">
      <scroller lock-x height="-130" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
        :bounce="true" :pulldown-config="this.$store.state.downconfig" :pullup-config="this.$store.state.upconfig" ref="scroller" v-show="isTable">
        <div>
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
            <tbody>
              <tr v-for="(item,index) in listData" @click="openDetail(index)" :key='item.id'>
                <td style="width: 20%">{{item.role_id==""?'空':item.role_id}}</td>
                <td style="width: 25%">{{item.parent_nickname}}</td>
                <td style="width: 30%">{{item.cost_total|moneyFormat(2,1)}}</td>
                <td style="width: 25%">{{item.bind_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
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

    <!-- 点击查看详细弹出框 -->
    <div>
      <x-dialog v-model="isDetail" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="ul-xdialog">
          <x-table class="table-detail">
            <thead>
              <tr>
                <th colspan="2">用户详情</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>游戏ID</td>
                <td>{{detailedData.role_id}}</td>
              </tr>
              <tr>
                <td>绑定代理</td>
                <td>{{detailedData.parent_nickname}}</td>
              </tr>
              <tr>
                <td>金币总消耗(个)</td>
                <td>{{detailedData.cost_total|moneyFormat(2,1)}}</td>
              </tr>
              <tr>
                <td>绑定时间</td>
                <td>{{detailedData.bind_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </tbody>
          </x-table>
          <p class="table-income-title">金币总消耗(个)</p>
         <!-- 日期查询 -->
            <div class="search-income">
                <group>
                <datetime   :min-year=2018 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" v-model='starttime'  @on-change="changestarttime()"></datetime>
                <span>~</span>
                 <datetime   :min-year=2018 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日"  v-model='endtime'  @on-change="changeendtime()"></datetime>
                  <x-button mini type="primary" action-type="button" @click.native='incomeSearch' >查询</x-button>
                </group>
                 <div class="table-income-scroll">
                       <x-table class="table-income" full-bordered>
                    <tbody>
                        <tr>
                            <td>总收益</td>
                            <td>{{detailedData.role_id}}</td>
                        </tr>
                        <tr v-for="item in listData" :key='item.id'>
                            <td>十人抢庄牛牛</td>
                            <td>{{item.cost_total|moneyFormat(2,1)}}</td>
                        </tr>
                    </tbody>
                </x-table>
                 </div>
            </div>

          <!-- <x-icon type="ios-close-outline" style="fill:#999;"  @click="isDetail = false"></x-icon> -->
          <flexbox style="margin-top:15px">
            <flexbox-item>
                <x-button mini type="primary" action-type="button" @click.native='tobeAgent' >升级为代理商</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button mini type="primary" action-type="button"  @click.native="isDetail = false" >关闭</x-button>
            </flexbox-item>
          </flexbox>

        </div>
      </x-dialog>
    </div>
  </div>

</template>

<script src="./userlist.js"></script>
<style lang="scss">
@import "../../styles/userList.scss";
</style>
