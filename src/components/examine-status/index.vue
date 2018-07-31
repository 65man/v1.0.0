<template>
    <div id="login-as">
        <!-- 头部 -->
        <div class="as-header">
            <h1>审核进度</h1>
        </div>
        <!-- 申请中 -->
        <div class="as-applying">
            <h3>{{title}}</h3>
            <p class="as-content">{{statusText}}</p>
            <div class="as-footer">
                <!-- 待审核显示 -->
                <x-button v-if='status==0'  type="primary"  action-type="button"  @click.native='refreshStatus'>刷新审核状态</x-button>
                <x-button v-if='status==0||status==2'  type="default"  action-type="button"  @click.native='loginout'>退出账号</x-button>
                <!-- <x-button v-if='status==0'  type="default" action-type="button"   @click.native='stopStatus'>撤回审核申请</x-button> -->             
                 <!-- 审核成功 -->
                <x-button v-if='status==1' type="default" action-type="button"   @click.native='Iknow'>我知道了</x-button>
                 <!-- 审核失败 -->
                <x-button v-if='status==2' type="default" action-type="button"   @click.native='againBindAgent'>重新申请</x-button>
            </div>
        </div>

    </div>
</template>

<script src="./examinestatus.js"></script>
<style lang="scss">
@import "../../styles/examineStatus.scss";
</style>