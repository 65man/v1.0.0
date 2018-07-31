import Vue from 'vue'
// ===============2.引入vuex===============
// 1.引用vuex全局数据
import vuex from 'vuex'
Vue.use(vuex)
    // 实例化
const store = new vuex.Store({
    // 定义全局要保存的数据
    state: {
        headerTitle: '概览',
        roles: '',
        token: '',
        copyCode: '',
        level: '',
        maxLevel: '',
        Wechat: '',
        // config: '',
        downconfig: {
            content: '下拉刷新',
            pullUpHeight: 60,
            height: 60,
            autoRefresh: false,
            downContent: '下拉刷新',
            upContent: '释放后刷新',
            loadingContent: '刷新中...',
            clsPrefix: 'xs-plugin-pulldown-'
        },
        upconfig: {
            content: '上拉加载',
            pullUpHeight: 60,
            height: 60,
            autoRefresh: false,
            downContent: '释放后加载',
            upContent: '上拉加载更多',
            loadingContent: '加载中...',
            clsPrefix: 'xs-plugin-pullup-'
        },
        addAgentInfo:{
            id:'',
            nickName:'天南地北'
        }
    },
    mutations: {},
    actions: {},
    getters: {}
});

export default store
