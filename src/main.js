import Vue from 'vue';
import App from './App';
import router from './router';
// import axios from 'axios';
import axios from './components/common/axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/icon.css';
import "babel-polyfill";
//
import echarts from 'echarts';

Vue.prototype.echarts = echarts;
//
import {
    Message
} from 'element-ui';
import {
    postRequest
} from './components/common/axios';

Vue.prototype.postRequest = postRequest;
import {
    getGatewayList
} from './components/common/axios';

Vue.prototype.getGatewayList = getGatewayList;
//
Vue.use(ElementUI, {
    size: 'small'
});
axios.defaults.timeout = 14400000;
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
////////////////////
//验证登录
// router.beforeEach((to, from, next) => {
//     if (to.path !== '/login' && !Boolean(sessionStorage.admin_token)) {
//         router.push('/login')
//     }
//     else {
//         next();// 继续执行
//     }
// });
////////////////
router.onError(error => {
    const pattern = /loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});
//////////////////////
const resAlert = (res) => {
    if (res.success === true) Message.success(res.message);
    else Message.error(res.message); //根绝返回数据结构，res.data不如res合理，但是省力，但是确实不合理
};
Vue.prototype.resAlert = resAlert;

const formatDate = function (target) {
    if (target !== "" && target !== null) {
        let year = target.getFullYear();
        let month = target.getMonth() < 9 ? `0${target.getMonth() + 1}` : target.getMonth() + 1;
        let day = target.getDate() < 10 ? `0${target.getDate()}` : target.getDate();
        return `${year}-${month}-${day}`
    } else {
        return ""
    }

}
const formatDate2 = function (target) {
    if (target !== "" && target !== null) {
        let year = target.getFullYear();
        let month = target.getMonth() < 9 ? `0${target.getMonth() + 1}` : target.getMonth() + 1;
        let day = target.getDate() < 10 ? `0${target.getDate()}` : target.getDate();
        let hour = target.getHours() < 10 ? `0${target.getHours()}` : target.getHours();
        let minute = target.getMinutes() < 10 ? `0${target.getMinutes()}` : target.getMinutes();
        let second = target.getSeconds() < 10 ? `0${target.getSeconds()}` : target.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    } else {
        return ""
    }

}

Vue.prototype.formatDate = formatDate;


Vue.prototype.formatDate2 = formatDate2;
// const formatNumber = n => {
//     n = n.toString()
//     return n[1] ? n : '0' + n
// }

// const exportData = ((url, params) => {
//     postRequest(url, params).then(function (res) {
//         resAlert(res.data);
//     })
// });
// Vue.prototype.exportData = exportData;


new Vue({
    router,
    render: h => h(App)
}).$mount('#app'); //挂来挂去
