<template>
    <div class="change-pwd">
        <div class="change-pwd-title">
            <h2>修改账号密码</h2>
            <p>首次登录，请先修改默认密码</p>
        </div>

        <group label-width="4.5em" label-margin-right="2em" label-align="left">
            <cell  title="用户名" :value="userName"></cell>
        </group>

        <div class="ischange" >
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

        <div>
          <x-button type="primary" mini  @click.native='updatePsw' :disabled='updatePswDisabled' class="sure-btn" >确定</x-button>
        </div>

        </div>
    </div>
</template>

<script>
// import { resetPsw } from '../../api/myInfoModule'
import {
    checkPassword,
    phoneBlurTips,
    passwordBlurTips,
    password2BlurTips
} from '../../utils/regular.js'
// 引入弹窗交互
import {
    alertTips,
    loadingTips,
    confirmTips,
    toastTips
} from '../../utils/messageTips.js'
export default {
  data () {
    return {}
  },
  mounted () {
    this.$store.state.headerTitle = '修改默认密码'
  },
  methods: {
      // ====================3.修改密码====================
        // 3.判断进入离开一次密码输入框
    passwordBlur () {
      passwordBlurTips(this, this.password, '仅支持6~12位英文、数字组合')
    },
    passwordFocus () {
      this.ispasswordTips = false // 进入隐藏提示
    },

        // 3.判断进入离开二次密码输入框
    password2Blur () {
      password2BlurTips(this, this.password, this.password2)
    },
    password2Focus () {
      this.ispassword2Tips = false // 进入隐藏提示
    },
        // 3.点击修改密码弹框
    changePsw: function () {
      this.isXdialog = true
      this.XdialogIndex = 2
    },
        // 3.更新密码
    updatePsw: function () {
      var _this = this
            // 2.2判断是否匹配正则
      if (!checkPassword(_this.password) ||
                _this.password != _this.password2
            ) {
        toastTips('text', '10em', '输入有误,请重新核对')
        return
      }
      var params = {
        old_password: _this.oldPassword,
        password: _this.password
      }
      _this.isXdialog = false
      loadingTips('修改中')

      // resetPsw(_this.oldPassword, _this.password).then(res => {
      //   _this.$vux.loading.hide()
      //   alertTips('修改成功，下次登录使用新密码登录')
      // }).catch(err => {
      //   _this.$vux.loading.hide()
      //   alertTips('原密码错误,请重新输入', _this.Pswhide)
      // })
    },
    Pswhide () {
      this.isXdialog = true
    }
  },
  computed: {
    updatePswDisabled () {
      var _this = this
      if (
                _this.oldPassword == '' ||
                _this.password == '' ||
                _this.password2 == ''
            ) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.change-pwd {
  .change-pwd-title {
    text-align: center;
    h2 {
      padding-top: 50px;
    }
    p {
      padding-top: 10px;
    }
  }
}
button.sure-btn {
  width: 60% !important;
  display: block;
  margin: 20px auto;
}
</style>
