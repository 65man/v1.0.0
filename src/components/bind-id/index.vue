<template>
  <div id="login-bi">

    <!-- 头部 -->
    <div class="bi-header">
      <h1>绑定游戏账号</h1>
    </div>

    <!-- 步骤 -->
    <div class="step">
      <step v-model="step" background-color='#fbf9fe'>
        <step-item title="注册"></step-item>
        <step-item title="授权"></step-item>
        <step-item title="代理"></step-item>
      </step>
    </div>

    <!-- 绑定游戏角色id -->
    <div class="bi-send">
      <div class="form">
        <group label-width="2em" label-margin-right="2em" label-align="right">
          <div class="tips-popover-border">
            <x-input placeholder="请输入已绑定邀请码的游戏ID" v-model="gameId" :max="11" @on-focus='idFocus' @on-blur='idBlur'></x-input>
            <div class="tips-popover" v-if="idTips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  提示:ID为12位数字
                </div>
              </div>
            </div>
          </div>
        </group>
        <p>温馨提示：该游戏ID需要已经绑定邀请码，方可进行申请代理的操作。</p>
      </div>
    </div>

    <!-- 申请信息 -->
    <div class="bi-info">
      <x-dialog v-model="isInfo" :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="isagree">
          <h3>申请代理</h3>
          <x-table :full-bordered='false' :cell-bordered="false" :content-bordered='false'>
            <tbody>
              <tr>
                <td colspan="2">
                  <h4>游戏账号信息</h4>
                </td>
              </tr>
              <tr>
                <td>角色ID：</td>
                <td>{{agentInfo.role_id}}</td>
              </tr>
              <tr>
                <td>角色名称：</td>
                <td>{{agentInfo.role_name}}</td>
              </tr>
              <tr>
                <td>注册时间：</td>
                <td>{{agentInfo.created_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
              <tr>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td colspan="2">
                  <h4>绑定代理信息</h4>
                </td>
              </tr>
              <tr>
                <td>游戏名称：</td>
                <td>{{agentInfo.game_id}}</td>
              </tr>
              <tr>
                <td>代理商名称：</td>
                <td>{{agentInfo.nickname}}</td>
              </tr>
            </tbody>
          </x-table>
          <h4>请确认以上绑定信息，发出申请后无法撤回？</h4>
          <x-button type="primary" mini @click.native="sureAgree()">确定</x-button>
          <x-button type="warn" mini @click.native="isInfo=false">取消</x-button>
        </div>
      </x-dialog>
    </div>

    <div class="bi-btn">
         <x-button type="primary" :disabled='isdisabled' action-type="button" @click.native="getAgentInfo" >申请代理</x-button>
        <x-button   type="default"  action-type="button"  @click.native='loginout'>退出账号</x-button>
    </div>
  </div>
</template>

<script src="./bindid.js"></script>
<style lang="scss">
@import "../../styles/bindId.scss";
</style>