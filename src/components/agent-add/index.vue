<template>
  <div id="agent-aa">
    <!-- 注册 -->
    <div class="aa-send">
      <div class="form">

        <h3>升级为代理商</h3>
        <!-- 表单注册区 -->
        <!-- <group label-width="6em" label-margin-right="1em" label-align="right">
          <div>
            <x-input  placeholder="请输入代理商名称(不可更改)" v-model="nickname" :min="2" :max="12" :should-toast-error='false' @on-blur='nicknameBlur'
              @on-focus='nicknameFocus'></x-input>
            <div class="tips-popover" v-if='isnicknameTips'>
              <div class="tips-popover-arrow"></div>
              <div>
                <div data-v-715e27fe="" class="tips-popover-content">
                  {{nicknameTips}}
                </div>
              </div>
            </div>
          </div> -->
          <!-- 新增总代无ID，新增其它代理有ID -->
          <!-- <div class="tips-popover-border">
            <x-input  placeholder="请输入绑定用户ID"  v-model="role_id" :should-toast-error='false'  @on-blur='role_idBlur'
              @on-focus='role_idFocus'></x-input>
            <div class="tips-popover" v-if='isrole_idTips'>
              <div class="tips-popover-arrow"></div>
              <div>
                <div data-v-715e27fe="" class="tips-popover-content">
                 {{role_idTips}}
                </div>
              </div>
            </div>
          </div> -->

            <!-- 联系电话 -->
          <!-- <div class="tips-popover-border">
            <x-input   placeholder="请输入代理联系电话" :min="7" :max="20" v-model="telephone" @on-blur='telephoneBlur' @on-focus='telephoneFocus'></x-input>
            <div class="tips-popover" v-if="istelephoneTips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  仅支持手机号、固话
                </div>
              </div>
            </div>
          </div> -->

          <!-- <div class="tips-popover-border">
            <x-input  placeholder="请输入注册的手机号" v-model="phone" :max="11" is-type="china-mobile" :should-toast-error='false'  @on-blur='phoneBlur'
              @on-focus='phoneFocus'></x-input>
            <div class="tips-popover" v-if='isphoneTips'>
              <div class="tips-popover-arrow"></div>
              <div>
                <div data-v-715e27fe="" class="tips-popover-content">
                   {{phoneTips}}
                </div>
              </div>
            </div>
          </div> -->
          <!-- 一次密码框 -->
          <!-- <div class="tips-popover-border">
            <x-input   placeholder="请输入密码" type="password" v-model="password" :min="6" :max="12" :should-toast-error='false' @on-blur='passwordBlur'
              @on-focus='passwordFocus'></x-input>
            <div class="tips-popover" v-if="ispasswordTips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  {{passwordTips}}
                </div>
              </div>
            </div>
          </div> -->

          <!-- 二次密码框 -->
          <!-- <div  class="tips-popover-border">
            <x-input  placeholder="请重复输入密码" v-model="password2" :min="6" :max="12" type="password" :equal-with="password" :should-toast-error='false'
              @on-blur='password2Blur' @on-focus='password2Focus'></x-input>
            <div class="tips-popover" v-if="ispassword2Tips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  两次输入密码不一致
                </div>
              </div>
            </div>
          </div> -->
        <!-- </group> -->
        <!-- <p>温馨提示：代理商名称长度在2~12之间，只能包含汉字、字母、数字的组合；密码长度在6~12之间，只能包含字母、数字的组合。</p> -->

        <group label-width="4.5em" label-margin-right="2em" label-align="left">
            <!-- <x-input title="游<i class='vux-blank-half'></i>戏<i class='vux-blank-half'></i>ID" v-model="value1"></x-input>
            <x-input title="昵&emsp;&emsp;&nbsp;称" v-model="value1"></x-input> -->

            <cell  title="游戏ID" :value="roleId"></cell>
            <cell  title="昵称" :value="nickName"></cell>

            <x-input  placeholder="请输入用户名" v-model="userName" :min="2" :max="12" :should-toast-error='false' @on-blur='userNameBlur' @on-focus='userNameFocus'></x-input>

            <x-input  placeholder="请输入代理商名称(不可更改)" v-model="nickname" :min="2" :max="12" :should-toast-error='false' @on-blur='nicknameBlur' @on-focus='nicknameFocus'></x-input>




            <x-input  placeholder="请填写备注" v-model="remark" :max="12" :should-toast-error='false' ></x-input>
        </group>
      </div>


      <!-- 升级为代理商 -->
    </div>
    <x-button type="primary" action-type="button" @click.native="sendAddagent" class="aa-btn" :disabled='submitDisabled'>提交</x-button>

    <!-- 核对信息弹窗 -->
        <div>
      <x-dialog v-model='showInfo'  hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}" >
        <div class="showInfo" v-if="showInfo">
          <h3>确认新增代理信息</h3>
          <x-table :full-bordered='false' :cell-bordered="false" :content-bordered='false'>
            <tbody>
              <tr>
                <td>代理商名称：</td>
                <td>{{nickname}}</td>
              </tr>
              <tr>
                <td>绑定用户ID：</td>
                <td>{{role_id}}</td>
              </tr>
              <tr>
                <td>联系电话：</td>
                <td>{{telephone}}</td>
              </tr>
              <tr>
                <td>登录手机号：</td>
                <td>{{phone}}</td>
              </tr>
              <tr>
                <td>登录密码：</td>
                 <td>{{password}}</td>
              </tr>
            </tbody>
          </x-table>
          <h4>请确认上述代理信息是否正确？</h4>
          <x-button type="primary" mini @click.native="sureAgree()">同意</x-button>
          <x-button type="warn" mini @click.native="showInfo=false">返回</x-button>
        </div>
      </x-dialog>
    </div>


  </div>
</template>

<script src="./agentadd.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../styles/addAgent.scss";
.vux-label{
    font-size: 16px;
}
.vux-cell-primary{
    flex: 0
}
</style>
