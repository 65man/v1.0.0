import qrcanvas from "qrcanvas";

// 引入弹窗交互
import {
    alertTips,
    loadingTips,
    confirmTips,
    toastTips
} from "../../utils/messageTips.js";

export default {
    components: {
        qrcanvas
    },
    data() {
        return {
            URL: "",
            qrcodeWidth: '',
            src: ""
        };
    },
    mounted() {
        this.$store.state.headerTitle = "我的推广码";
        // ====================1.获取数据生成链接===================
        this.URL = `https://m.cs.qp.gzzhongw.net/register?nickname=${this.$route.query.nickname}&code=${this.$route.query.code}`
        this.getqrCode();
    },
    methods: {
        getqrCode() {
            var _this = this;
            //绘制一个二维码
            var canvasCode = qrcanvas({
                data: this.URL,
                cellSize: 10
            });
            //绘制图片原始大小的白色幕布
            var ctx = _this.$refs.mycanvas.getContext("2d");
            //将原图画进去，
            _this.qrcodeWidth = _this.$refs.getqrcodeWidth.offsetWidth * 0.96;
            var img = new Image();
            img.src = require("@/assets/img/bg-qrcode.jpg");
            img.onload = function() {
                ctx.drawImage(img, 0, 0, 640, 640);
                // ctx.fillStyle = "#fff";
                // ctx.fillRect(195, 195, 250, 250);
                // ctx.fill();
                ctx.drawImage(canvasCode, 95, 230, 220, 220);
                var strDataURI = _this.$refs.mycanvas.toDataURL("image/jpeg");
                _this.src = strDataURI;
            };
        },
        onCopy: function() {
            toastTips("text", "12em", "已复制注册链接到剪贴板");
        }
    }
};