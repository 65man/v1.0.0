<template>
  <div id="income-co">
    <!-- 可兑换金额 -->
    <div class="co—cash">
      <div>
        <p>可兑换金额
          <icon name="prompt" class='svg-prompt'  @click.native="openPrompt"></icon>
        </p>
      </div>
      <div>
        <p slot="label">￥
          <countup :end-val="canExchange" :duration="1" :decimals="2"></countup>
        </p>
      </div>
    </div>
    <!-- 兑换的金额 -->
    <div class="co—cash-now">
      <div>兑换中的金额</div>
      <div>￥{{exchanging/100|moneyFormat(0,0)}}</div>
    </div>
    <div class="co—cash-now">
      <div>兑换成功的金额</div>
      <div>￥{{exchangeSuccess/100|moneyFormat(0,0)}}</div>
    </div>
    <!-- 兑换 -->
    <div class="co-out-btn">
      <div class="prompt" v-if='canExchange<1'>
        <icon name="notice" class='svg-notice'></icon>可兑换金额大于等于1元方可兑换</div>
      <x-button type="primary" action-type="button" @click.native="openOutlay" :disabled='isdisabledBtn1'>兑换</x-button>
    </div>
    <!-- 兑换条例 -->
    <div>
      <x-dialog v-model="showPrompt" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="co-xdialog" @click="showPrompt = false">
          <h3>兑换说明</h3>
          <div class="content">
            <p>1、兑换时按每1元兑换110金币的方式，将兑换金额转换为金币，兑换成功后，您可在游戏内通过邮件的形式收到金币；</p>
            <p>2、可兑换金额为截止至昨天24时结算的收益，不包括当天结算的收益；</p>
            <p>3、每次申请兑换的金额需大于或等于1元，小于您目前可兑换的金额，且每次兑换的金额必须为1元的整数倍；</p>
            <p>4、一般情况下，您的兑换申请将在当天审核完成并发放；</p>
            <p>5、如果您的兑换申请审核失败，本次兑换的金额将返还到您的“可兑换金额”中；</p>
          </div>
          <x-icon type="ios-close-outline" style="fill:#999;"></x-icon>
        </div>
      </x-dialog>
    </div>
    <!-- 兑换信息 -->
    <div>
      <x-dialog v-model="showOutlay" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <div class="co-xdialog  co-xdialog2">
          <h3>兑换申请</h3>
          <group label-width="7em" label-margin-right="1em" label-align="right">
            <x-input title="可兑换金额(元)" disabled :value='canExchange'></x-input>
            <!-- 兑换金额 -->
            <x-input title="兑换金额(元)" placeholder="请输入兑换金额" class="weui-vcode" v-model='cashVal' type='number' @on-blur='setCashVal' :should-toast-error='false'></x-input>
             <x-input title="可获得金币(个)" disabled :value='gold'></x-input>
            <!-- <x-input title="绑定的手机号" disabled :value='phone'></x-input> -->
            <!-- 验证码 -->
            <!-- <x-input placeholder="请输入短信验证码" v-model='codeVal'>
              <x-button slot="right" type="primary" mini @click.native='sendcode' :disabled='isdisabledCode'>{{codeTips}}{{codeSecond!=''?'('+codeSecond+')':''}}</x-button>
            </x-input> -->
          </group>
          <div class="co-out-btn">
            <div class="prompt prompt1">
              <icon name="notice" class='svg-notice'></icon>温馨提示：兑换金额需大于等于1元，不可超过最大可兑换金额，最小单位为元。</div>
            <x-button type="primary" action-type="button" @click.native="sendCashOut" :disabled='isdisabledBtn2'>提交</x-button>
          </div>
          <div>
            <x-icon type="ios-close-outline" style="fill:#999;" @click="showOutlay = false"></x-icon>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>

</template>

<script src="./cashoutlay.js"></script>
<style lang="scss">
@import "../../styles/cashOutlay.scss";
</style>
