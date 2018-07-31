<template>
  <div id="agent-la">

    <!-- 新增代理 -->
    <icon   name="addagent" class="svg-addagent" @click.native='goAddAgent'></icon>

    <!-- 搜索框 -->
    <div class="la-search">
      <div class="search">
        <div>
          <group>
            <selector placeholder="请选择" v-model="optionVal" :options="selectList"></selector>
          </group>
        </div>
        <x-input :placeholder="placeholderVal" v-model='inputVal' :disabled='isdisable' :style="{background:optionVal==0?'#d8d8d8':'#fff'}"></x-input>
        <x-button mini type="primary" action-type="button" @click.native='sendSearch'>查询</x-button>
      </div>

      <!-- 表头 -->
      <div class="title">
        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th @click='sortUD(0)' :style="{color:sortUDindex==0?'#1296db':'#000'}">
                <span>代理商ID
                   <icon  :name="sortUDindex==0?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th @click='sortUD(1)' :style="{color:sortUDindex==1?'#1296db':'#000'}">
                <span>代理名称
                   <icon  :name="sortUDindex==1?imgSrc:'ud'" class="svg-ud"></icon>
                </span>
              </th>
              <th>
                <group>
                  <selector placeholder="请选择" v-model="agentLevel" :options="selectLevel"></selector>
                </group>
              </th>
              <th>
                <group>
                  <selector placeholder="请选择" v-model="starVal" :options="selectStar"></selector>
                </group>
              </th>
            </tr>
          </thead>
        </x-table>
      </div>
    </div>

    <!-- 表格 -->
    <div class="la-table">
      <scroller lock-x height="-130" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
        :bounce="true" :pulldown-config="this.$store.state.downconfig" :pullup-config="this.$store.state.upconfig"
        ref="scroller" v-show="isTable">
        <div>
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
            <tbody>
              <tr v-for="(item,index) in listData" @click="openDetail(item.id)" :key='item.id'>
                <td>{{item.agency_id}}</td>
                <td>
                  <p>{{item.nickname}}</p>
                </td>
                <td>{{item.level|levelFormat()}} </td>
                <td>{{item.star+'星'}}</td>
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

    <!-- 点击弹出层-->
    <div>
      <x-dialog v-model="isDetailed" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <!-- 代理商配置信息一-->
        <div class="la-xdialog-1" v-if='xdialogIndex==0'>
          <h3>代理商详情</h3>
          <x-table>
            <tbody>
              <tr>
                <td>代理商ID</td>
                <td>{{detailedData.agency_id}}</td>
              </tr>
              <tr>
                <td>代理商名称</td>
                <td>{{detailedData.nickname}}</td>
              </tr>
              <tr>
                <td>联系电话</td>
                <td>{{detailedData.telephone}}</td>
              </tr>
              <tr>
                <td>代理商层级</td>
                <td>{{detailedData.level|levelFormat()}}</td>
              </tr>
                <tr>
                <td>星级</td>
                <td>{{detailedData.star+'星'}}</td>
              </tr>
              <tr>
                <td>发展用户数量</td>
                <td>{{detailedData.sub_role_number}}</td>
              </tr>
             <tr>
                <td>总产值(元)</td>
                <td>{{detailedData.sub_role_number}}</td>
              </tr>
              <tr>
                <td>绑定时间</td>
                <td>{{detailedData.bind_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </tbody>
          </x-table>
          <x-icon type="ios-close-outline" style="fill:#999;" @click="xdialogIndex=0;isDetailed = false;"></x-icon>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script src="./agentlower.js"></script>
<style lang="scss">
@import "../../styles/lowerAgent.scss";
</style>
