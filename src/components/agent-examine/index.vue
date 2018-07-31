<template>
  <div id="agent-app">
    <!-- 代理申请列表-->
<scroller lock-x height="-50" @on-pulldown-loading="selPullDown" @on-pullup-loading="selPullUp" :use-pulldown="true" :use-pullup="true"
  :bounce="true" :pulldown-config="{content: '',upContent:'刷新中', downContent: '',loadingContent:'刷新中'}" :pullup-config="{content: '',upContent:'', downContent: '加载中',loadingContent:'加载中'}"
 ref="scroller" v-show="isTable">
    <div >
      <div v-for='(item,index) in listData' :key='item.id' class="message" style="color:#999" @click="listDetail(item.id)">
        <div class="title">
          <div style="color:#000;font-weight:600;">
            {{item.detail.nickname}}(ID:{{item.agency_id}})
          </div>
          <div class="content">
            <span>{{item.created_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <x-button v-if='item.status==0' type="warn" mini @click.native ="refuseBtn(index,$event)">拒绝</x-button>
            <x-button v-if='item.status==0' type="primary" mini @click.native ="agreeBtn(index,$event)">同意</x-button>
            <span v-if='item.status==1'>
              <icon  type="success-circle"></icon>已同意</span>
               <span v-if='item.status==2'>
              <icon type="cancel"></icon>已拒绝</span>
          </div>
        </div>
      </div>

       <div class=" message messagetips" v-if='listData.length!=0'>
            第{{pageIndex}}页/共{{pageCount}}页(共{{totalCount}}条)
        </div>
        <div class="message messagetips" v-if='listData.length==0'>
            暂无消息
       </div>
    </div>
</scroller>

    <!-- 确认弹框 -->
    <div>
      <x-dialog v-model='showAgree'  hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}" >
        <div class="isagree" v-if="showAgree">
          <h3>同意申请</h3>
          <x-table :full-bordered='false' :cell-bordered="false" :content-bordered='false'>
            <tbody>
              <tr>
                <td>代理商名称：</td>
                <td>{{listData[updateIndex].detail.nickname}}</td>
              </tr>
              <tr>
                <td>玩家用户ID：</td>
                <td>{{listData[updateIndex].agency_id}}</td>
              </tr>
              <tr>
                <td>联系方式：</td>
                <td>{{listData[updateIndex].detail.telephone}}</td>
              </tr>
            </tbody>
          </x-table>
          <h4>上述申请信息是否正确并同意申请？</h4>
          <x-button type="primary" mini @click.native="sureAgree()">确定</x-button>
          <x-button type="warn" mini @click.native="showAgree=false">取消</x-button>
        </div>
      </x-dialog>
    </div>
    <!-- 拒绝弹框 -->
    <!-- <div>
      <x-dialog v-model="showRefuse" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="isagree">
          <h3>拒绝申请</h3>
            <group>
              <x-textarea :max="50" placeholder="请输入拒绝申请的原因" autosize v-model='areaValue'></x-textarea>
            </group>
          <h4>确定拒绝当前用户的代理商申请吗？</h4>
          <x-button type="primary" mini @click.native="sureRefuse()">确定</x-button>
          <x-button type="warn" mini @click.native="showRefuse=false;areaTip=false">取消</x-button>
        </div>
      </x-dialog>
    </div> -->
    <!-- 拒绝弹框 -->
    <div>
      <x-dialog v-model='showRefuse'  hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}" >
        <div class="isagree" v-if="showRefuse">
          <h3>拒绝申请</h3>
          <x-table :full-bordered='false' :cell-bordered="false" :content-bordered='false'>
            <tbody>
              <tr>
                <td>代理商名称：</td>
                <td>{{listData[updateIndex].detail.nickname}}</td>
              </tr>
              <tr>
                <td>玩家用户ID：</td>
                <td>{{listData[updateIndex].agency_id}}</td>
              </tr>
              <tr>
                <td>联系方式：</td>
                <td>{{listData[updateIndex].detail.telephone}}</td>
              </tr>
            </tbody>
          </x-table>
          <h4>确定拒绝当前用户的代理商申请吗？</h4>
          <x-button type="primary" mini @click.native="sureRefuse()">确定</x-button>
          <x-button type="warn" mini @click.native="showRefuse=false">取消</x-button>
        </div>
      </x-dialog>
    </div>
     <!-- 详情信息 -->
     <div>
      <x-dialog v-model='showDetail'  hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}"  @click.native="showDetail=false">
        <div class="isagree" v-if="showDetail"  >
          <h3>代理申请详情</h3>
          <x-table :full-bordered='false' :cell-bordered="false" :content-bordered='false'>
            <tbody>
            <tr>
                <td>代理商名称：</td>
                <td>{{detailedData.detail.nickname}}</td>
              </tr>
              <tr>
                <td>代理商ID：</td>
                <td>{{detailedData.agency_id}}</td>
              </tr>
              <tr>
                <td>联系方式：</td>
                <td>{{detailedData.detail.telephone}}</td>
              </tr>
              <tr>
                <td>状态：</td>
                <td>{{detailedData.status}}</td>
              </tr>
              <tr>
                <td>申请时间：</td>
                <td>{{detailedData.created_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
               <tr v-if='detailedData.status=="已通过"'>
                <td>通过时间：</td>
                <td>{{detailedData.updated_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
              <tr v-if='detailedData.status=="已拒绝"'>
                <td>拒绝时间：</td>
                <td>{{detailedData.updated_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </tbody>
          </x-table>
           <x-icon type="ios-close-outline" style="fill:#999;"></x-icon>
        </div>
      </x-dialog>
    </div>
  </div>

</template>

<script src="./agentexamine.js"></script>
<style lang="scss">
@import "../../styles/examineAgent.scss";
</style>
