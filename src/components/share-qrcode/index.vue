<template>
  <div class="share" ref="getqrcodeWidth">
      <canvas  width="640" height="640"  ref="mycanvas" v-show='false'/>
      <div  v-if='src!=""' class="share-content">
        <img :src="src" alt=""  class="qrcode"  v-bind:style="{width:qrcodeWidth+'px',height:qrcodeWidth+'px'}">
        <p>长按图片保存到本地，发送给您的好友，识别图片中二维码进行注册即可成为您的下级代理。</p>
        <p  v-clipboard:copy="URL"  v-clipboard:success="onCopy">{{URL}}</p>
        <p>点击上述链接可复制链接到剪贴板，粘贴发送给您的好友，打开链接进行注册即可成为您的下级代理。</p>
      </div>
  </div>
</template>
<script src='./shareqrcode.js'></script>
<style lang="scss" scope>
.share {
  width: 100%;
  height: 100%;
  .qrcode {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
    max-width: 640px;
    max-height: 640px;
  }
  p {
    padding: 0 3%;
  }
  p:nth-of-type(1) {
    padding-bottom: 5px;
    font-size: 14px;
    border-bottom: 2px solid #c7c7c7;
  }
  p:nth-of-type(2) {
    padding-top: 5px;
    font-size: 14px;
    font-weight: 600;
    word-break: break-all;
  }
  p:nth-of-type(3) {
    font-size: 14px;
  }
}
</style>
