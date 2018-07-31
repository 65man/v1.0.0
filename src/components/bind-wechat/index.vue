<template>
    <div id="login-bc">
        <!-- 头部 -->
        <div class="bc-header">
            <h1>授权微信登录</h1>
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
        <div class="bc-send">
            <p>授权微信登录后可使用微信快速登录</p>
        </div>
        <div class="bc-btn">
            <x-button type="primary" action-type="button" @click.native="weChatBind" >绑定微信</x-button>
            <x-button type="default" action-type="button" @click.native="gobindId" >以后再说</x-button>
        </div>
    </div>
</template>

<script src="./bindwechat.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../styles/bindWeChat.scss";
</style>