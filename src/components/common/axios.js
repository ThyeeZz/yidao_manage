import axios from 'axios'
import {Message} from 'element-ui'
import router from '../../router'

axios.interceptors.request.use(
    config => {
            return config;
    },
    err => {
        // console.log('err');
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        if (response.data.resultCode === "10000") {
            router.push('/login');//go是history的跳转，失败效果很鬼畜
            Message.warning('登陆超时，请重新登陆');
        }
        else return response;
    },
    error => {
        // router.push('/login');
        Message.warning('请求出错，请联系后台');
    });
////////////////////////////
// const getBaseUrl = async function () {
//     let baseURL = await axios.get("config.json");
//     return baseURL;
// };
//
// sessionStorage.base='http://test-api-admin.yunrongt.com:8010/';///////////////////////
// // sessionStorage.base='http://192.168.1.204:8010/';///////////////////////
//
//
// getBaseUrl().then(res => {
//     sessionStorage.base = res.data.baseURL;
// });

////////////////////////
export const postRequest = (url, params) => {
    // console.log(sessionStorage.base);
    return axios({
        method: 'post',
        url: `${sessionStorage.base}${url}`,//ES6的模板字符串语法
        headers: {
            token: sessionStorage.admin_token
        },
        data: params,
    });
};

export const getGatewayList = async function () { //需求变了，没什么乱用
    let gatewaylist = await axios({
        method: 'post',
        url: `${sessionStorage.base}` + 'admin/getGatewayList',
        headers: {
            token: sessionStorage.admin_token
        },
        data: {
            t: ''
        }
    })
    return gatewaylist;
};

export const getCodeList = async function () {
    let codeList = await axios({
        method: 'post',
        url: `${sessionStorage.base}` + 'admin/listCode',
        headers: {
            token: sessionStorage.admin_token
        },
        data: {
            t: ''
        }
    })
    return codeList;
};
// export const listGeneralSubAccount = async function () {
//     let subAccount = await axios({
//         method: 'post',
//         url: `${base}` + 'listGeneralSubAccount',
//         headers: {
//             token: sessionStorage.ms_token
//         },
//         data: {
//             t: ''
//         }
//     });
//     return subAccount;
// }
export default axios;
