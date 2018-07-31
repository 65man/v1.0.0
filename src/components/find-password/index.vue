<template>
  <div id="login-fp">
    <!-- 头部 -->
    <div class="fp-header">
      <h1>忘记密码</h1>
    </div>
    <!-- 申请 -->
    <div class="fp-applying">
      <h3>通过注册手机号找回密码</h3>
      <div class="fp-content vux-1px-t">
        <!-- 手机号 -->
        <div class="tips-popover-border ">
          <x-input placeholder="请输入注册的手机号" v-model="phone" :max="11" is-type="china-mobile" :should-toast-error='false' @on-blur='phoneBlur'
            @on-focus='phoneFocus'></x-input>
          <div class="tips-popover" v-if="isphoneTips">
            <div class="tips-popover-arrow"></div>
            <div>
              <div class="tips-popover-content">
                {{phoneTips}}
              </div>
            </div>
          </div>
        </div>
        <!-- 验证码 -->
        <x-input placeholder="请输入验证码" class="weui-vcode vux-1px-b" v-model='verify_code'>
          <x-button slot="right" type="primary" mini @click.native='sendCode' :disabled='isdisabled'>{{codeTips}}{{codeSecond!=''?'('+codeSecond+')':''}}</x-button>
        </x-input>
      </div>
      <div class="fp-footer">
        <x-button type="primary" action-type="button" @click.native='submit' :disabled='submitDisabled'>提交</x-button>
      </div>
    </div>

    <!-- 修改密码弹框 -->
    <div>
      <x-dialog v-model="showChange" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="ischange">
          <h3>重置密码</h3>
          <group label-width="2em" label-margin-right="2em" label-align="right">
            <!-- 一次密码框 -->
            <div class="tips-popover-border">
              <x-input placeholder="请输入新密码" type="text" v-model="password" :min="6" :max="12" :should-toast-error='false' @on-blur='passwordBlur'
                @on-focus='passwordFocus'></x-input>
              <div class="tips-popover" v-if="ispasswordTips">
                <div class="tips-popover-arrow"></div>
                <div>
                  <div class="tips-popover-content">
                    仅支持6~12位英文、数字组合
                  </div>
                </div>
              </div>
            </div>

            <!-- 二次密码框 -->
            <div class="tips-popover-border">
              <x-input placeholder="请重复输入新密码" v-model="password2" :min="6" :max="12" type="text" :equal-with="password" :should-toast-error='false'
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
          <x-button type="primary" mini @click.native='sureReset'  :disabled='sureResetDisabled'>确定</x-button>
          <x-button type="warn" mini @click.native='showChange=false'>返回</x-button>
        </div>
      </x-dialog>
    </div>

        <!-- 图片验证码 -->
    <x-dialog v-model="showImgCode" :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
      <div class="imgcode_Box" v-if='showImgCode'>
        <h4>请输入图片验证码</h4>
        <group label-width="2em" label-margin-right="2em" label-align="right">
          <x-input placeholder="请输入图片验证码" class="weui-cell_vcode vux-1px-tb" v-model='imgCode'>
            <img slot="right" class="weui-vcode-img" :src='"data:image/png;base64,"+imgCodeUrl' @click='ReImgCodeReUrl'>
          </x-input>
        </group>
        <p @click='ReImgCodeReUrl'>看不清楚？换一张图片</p>
        <x-button type="primary" mini :disabled='sendCodeDisabled' @click.native="checkImgCode">确定</x-button>
        <x-button type="warn" mini @click.native="showImgCode=false">返回</x-button>
      </div>
    </x-dialog>
  </div>
</template>

<script src="./findpassword.js"></script>
<style lang="scss">
@import "../../styles/findPassword.scss";
</style>