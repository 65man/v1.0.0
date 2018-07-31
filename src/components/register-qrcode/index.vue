<template>
  <div id="login-reg">
    <!-- 头部 -->
    <div class="reg-header">
      <h1>注册账号</h1>
    </div>

    <div class="step">
      <step v-model="step" background-color='#fbf9fe'>
        <step-item title="注册"></step-item>
        <step-item title="授权"></step-item>
        <step-item title="代理"></step-item>
      </step>
    </div>

    <!-- 注册 -->
    <div class="reg-send">
      <p class="reg-title">您的上级代理商为：广州代理广州代理广州代理</p>
      <div class="form">
        <group label-width="2em" label-margin-right="2em" label-align="right">

          <!-- 代理商名称 -->
          <div class="tips-popover-border">
            <x-input placeholder="请输入你在游戏中的用户ID" v-model="nickname" :min="2" :max="12" :should-toast-error='false' @on-blur='nicknameBlur'
              @on-focus='nicknameFocus'></x-input>
            <div class="tips-popover" v-if="isnicknameTips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  {{nicknameTips}}
                </div>
              </div>
            </div>
          </div>

          <!-- 代理商名称 -->
          <div class="tips-popover-border">
            <x-input placeholder="请输入您的代理商名称(不可更改)" v-model="nickname" :min="2" :max="12" :should-toast-error='false' @on-blur='nicknameBlur'
              @on-focus='nicknameFocus'></x-input>
            <div class="tips-popover" v-if="isnicknameTips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  {{nicknameTips}}
                </div>
              </div>
            </div>
          </div>

          <!-- 联系电话 -->
          <div class="tips-popover-border">
            <x-input placeholder="请输入您的联系电话" :min="7" :max="20" v-model="telephone" @on-blur='telephoneBlur' @on-focus='telephoneFocus'></x-input>
            <div class="tips-popover" v-if="istelephoneTips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  仅支持手机号、固话
                </div>
              </div>
            </div>
          </div>

          <!-- 手机号 -->
          <div class="tips-popover-border">
            <x-input placeholder="请输入注册的手机号(作为登录账号)" v-model="phone" :max="11" is-type="china-mobile" :should-toast-error='false'
              @on-blur='phoneBlur' @on-focus='phoneFocus'></x-input>
            <div class="tips-popover" v-if="isphoneTips">
              <div class="tips-popover-arrow"></div>
              <div>
                <div class="tips-popover-content">
                  {{phoneTips}}
                </div>
              </div>
            </div>
          </div>

          <!-- 短信验证码 -->
          <x-input placeholder="请输入短信验证码" v-model='verify_code'>
            <x-button slot="right" type="primary" mini @click.native='sendCode' :disabled='isdisabled'>{{codeTips}}{{codeSecond!=''?'('+codeSecond+')':''}}</x-button>
          </x-input>

          <!-- 一次密码框 -->
          <div class="tips-popover-border">
            <x-input placeholder="请输入密码" type="password"  v-model="password" :min="6" :max="12" :should-toast-error='false' @on-blur='passwordBlur'
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
            <x-input placeholder="请重复输入密码" v-model="password2" :min="6" :max="12"  type="password"  :equal-with="password" :should-toast-error='false'
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

        <!-- 合作协议 -->
        <div class="agm">
          <input type="checkbox" name="" v-model="selected" value="agm" id='radio'>
          <label for="radio">我已阅读并同意</label>
          <a href="javascript:;" @click="show_agm">《合作协议》</a>
        </div>

        <!-- 温馨提示 -->
        <p>温馨提示：代理商名称长度在2~12之间，只能包含汉字、字母、数字的组合；密码长度在6~12之间，只能包含字母、数字的组合。</p>
      </div>

    </div>
    <x-button type="primary" action-type="button" @click.native="sendregister" class="reg-btn" :disabled='registerDisabled'>注册</x-button>



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

        <!-- 协议 -->
    <x-dialog v-model="showAgreement" :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
      <div class="show_agm">
        <div class="amg_box">
          <h3>推广员/代理须知</h3>
          <p>我们公司是一家从事网络游戏设计、开发、制作的专业网络公司，具备丰富的网络运营经验及雄厚的互联网技术支持，现独立开发运行的游戏，以其精良的游戏制作、趣味性及互动性，已在当地市场取得建立了良好的市场基础及群众口碑。为开拓市场及扩大产品影响力，公司决定在本协议指定区域内进行市场推广选择了部分代理，为保障公司的平稳运行、促进双方的良好合作、保证项目的合法推广、避免法律纠纷及其他法律风险，特将该《协议》下发给代理，各代理务必认真学习及遵循《协议》精神，做到规范经营、依法行事，不得自误。内容如下：</p>
          <p>1、本公司所运营的游戏是一款旨在增进玩家感情、丰富市民业余生活的网络游戏，该游戏倡导的理念是"快乐游戏、健康生活"，这了游戏理念与公司的经营理念是完全一致的，即我公司及我公司推出的一切网络文化产品均是绿色、健康、合法的！因此，代理必须秉承这一经营宗旨，把握正确方向。注意维护企业及游戏品牌形象。</p>
          <p>2、我们游戏作为一款对抗性及竞技性游戏，必将秉承"游戏中是对手，生活中是朋友"这一游戏精神，代理应在游戏中宣传及引导这一理念，避免玩家中出现谩骂、侮辱甚至是斗殴等恶性事件，从而使社会公众及主流舆论对本公司产生误解。</p>
          <p>3、我公司运营的游戏，玩家进行游戏时评判输赢的只有当局积分，代理不得设置虚拟货币、回购或默许第三方回购及其他一切可能将游戏中的输赢和现实货币、财物进行兑换的行为。</p>
          <p>4、我公司的代理，并非公司员工，代理不得利用公司名义进行任何超出权限的商业活动或进行给公司带来负面影响的其他社会活动!</p>
          <p>5、代理在进行网络推广活动时，必须依照有关法律规定及公司政策行事，不得利用、引导或许可他人利用我们游戏从事赌博及其他为违法犯罪活动，否则一经发现，立即解除合作关系，并视情节轻重上报有关机关处理，决不姑息!</p>
          <p>6、代理有权雇佣或通过其他合作关系组建营销团队，营销团队成员并非公司员工，其与玩家的法律关系由双方自行商议决定，公司不予干涉，但代理必须保证团队其他成员必须严格按照法律规定、协议约定及本《协议》内容开展业务活动，否则因此产生的一切后果由代理承担。</p>
          <p>7、代理及其营销团队成员必须正面引导玩家健康游戏，对于发现有玩家或其他平台或机构利用我们从事赌博及其他为违法犯罪活动的，必须立即阻止，并向公司上报，情节严重的，公司有权向有关单位报案，代理有义务向公司提供有关证明材料，以便有关单位依法处理。</p>
          <p>8、我们游戏官方认可的唯一游戏道具为"钻石"，该道具仅用于玩家进入房间游戏之用，不得用于其他用途，推代理也不得向玩家收取其他游戏费用，发现玩家利用道具开展赌博或其他违法犯罪活动的，推广员/代理应拒绝发放钻石或向公司报告终止游戏。</p>
          <p>9、代理及玩家利用本游戏从事的任何违法犯罪活动与本公司无关，因此引发的一切法律后果，由其自行承担，因此给公司造成损失的，公司保留诉讼权利。望周知遵循！！！</p>
        </div>
        <div class="amg_btn">
          <x-button type="primary" mini action-type="button" @click.native="hide_agm">已阅读</x-button>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script src="./regqrcode.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../styles/regqrcode.scss";
</style>
