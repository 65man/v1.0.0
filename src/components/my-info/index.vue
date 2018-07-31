<template>
  <div id="more-mi">
    <!-- 内容展示区域 -->
    <div class="content">
      <x-table :content-bordered='false' :cell-bordered='false' v-if='dataInfo'>
        <tbody>
          <!-- <tr>
            <td>代理游戏名称：</td>
            <td>{{dataInfo.game_id}}</td>
          </tr> -->
          <tr>
            <td>星级：</td>
            <td>{{dataInfo.level}}</td>
          </tr>
          <tr>
            <td>绩效奖分成比例：</td>
            <td>{{dataInfo.level}}</td>
          </tr>
          <tr>
            <td>代理商名称：</td>
           <td>{{dataInfo.nickname}}</td>
          </tr>
          <tr>
            <td>联系电话：</td>
              <td>{{dataInfo.telephone}}</td>
          </tr>
          <tr>
            <td>注册时间：</td>
           <td>{{dataInfo.created_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
          </tr>
          <tr>
            <td>我的邀请码：</td>
            <td> {{this.$store.state.copyCode}}
              <x-button type="primary" mini action-type="button" v-clipboard:copy="this.$store.state.copyCode" v-clipboard:success="onCopy">复制</x-button>
            </td>
          </tr>
        </tbody>
      </x-table>
      <group>
           <cell title="我的推广二维码" is-link   @click.native='goshareqrCode'>
          <div>
            <span style="color: #000">查看</span>
          </div>
        </cell>
        <cell title="基本信息" is-link @click.native='changeInfo'>
          <div>
            <span style="color: #000">修改</span>
          </div>
        </cell>
        <cell title="账号密码" is-link @click.native='changePsw'>
          <div>
            <span style="color: #000">修改</span>
          </div>
        </cell>
      </group>

      <!-- 绑定微信 -->
      <!-- <group>
        <cell title="绑定微信" is-link @click.native='weChatBind'  v-if='this.$store.state.Wechat=="false"'>
          <div>
            <span style="color: #000">绑定后可使用微信登录</span>
          </div>
        </cell>
        <cell title="绑定微信" v-if='this.$store.state.Wechat!="false"'>
          <div>
            <span style="color: #999">已绑定</span>
          </div>
        </cell>
      </group> -->
    </div>


    <!-- 弹框 -->
    <div>
      <x-dialog v-model="isXdialog" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <!-- 修改基本信息弹框 -->
        <div class="ischange" v-if="XdialogIndex==1">
          <h3>修改联系方式</h3>
          <group label-width="5em" label-margin-right="1em" label-align="right">
          <!-- 联系电话 -->
          <div class="tips-popover-border">
            <x-input title="联系电话" placeholder="请输入您的联系电话" :min="7" :max="20" v-model="telephone" @on-blur='telephoneBlur' @on-focus='telephoneFocus'></x-input>
            <div class="tips-popover" v-if="istelephoneTips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  格式有误
                </div>
              </div>
            </div>
          </div>
          </group>
          <p>温馨提示：仅支持手机号、区号-电话号码格式。</p>
          <x-button type="primary" mini @click.native='updateInfo'   :disabled='updateInfoDisabled'>确定</x-button>
          <x-button type="warn" mini  @click.native='isXdialog=false'>返回</x-button>
        </div>
        <!-- 修改密码弹框 -->
        <div class="ischange" v-if="XdialogIndex==2">
          <h3>修改密码</h3>
          <group label-width="2em" label-margin-right="2em" label-align="right">
            <!-- 原密码框 -->
            <x-input type='password'  placeholder="请输入原密码" :min="6" :max="12" v-model="oldPassword"></x-input>
            <!-- 一次密码框 -->
          <div class="tips-popover-border">
            <x-input    placeholder="请输入新密码"  type='password' v-model="password" :min="6" :max="12" :should-toast-error='false' @on-blur='passwordBlur'
              @on-focus='passwordFocus'></x-input>
            <div class="tips-popover" v-if="ispasswordTips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  {{passwordTips}}
                </div>
              </div>
            </div>
          </div>

          <!-- 二次密码框 -->
          <div class="tips-popover-border">
            <x-input  placeholder="请重复输入新密码" v-model="password2" :min="6" :max="12"  type='password' :equal-with="password" :should-toast-error='false'
              @on-blur='password2Blur' @on-focus='password2Focus'></x-input>
            <div class="tips-popover" v-if="ispassword2Tips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  两次输入密码不一致
                </div>
              </div>
            </div>
          </div>
          </group>
          <p>温馨提示：密码长度在6~12之间，只能包含字母、数字的组合。</p>
          <x-button type="primary" mini  @click.native='updatePsw' :disabled='updatePswDisabled'>确定</x-button>
          <x-button type="warn" mini  @click.native='isXdialog=false'>返回</x-button>
        </div>
      </x-dialog>
    </div>
  </div>

</template>

<script src="./myinfo.js"></script>
<style lang="scss">
    @import "../../styles/myInfo.scss";
</style>
