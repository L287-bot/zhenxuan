import axios from "axios";
import {ElMessage} from "element-plus";
//第一步：利用axios对象的create方法，创建axios实例(其他的配置)
const request = axios.create({
    //基础路劲
    baseURL: import.meta.env.VITE_APP_BASE_API,//基础路径会携带/api
    timeout: 5000
})
//引用用户相关的仓库
import useUserStore from "../store/modules/user";

//添加请求响应拦截器
request.interceptors.request.use((config) => {
    //获取用户相关的小仓库:获取仓库内的token，登录成功后携带给服务器
    let userStore = useUserStore();
    if (userStore) {
        config.headers.token = userStore.token;
    }
    console.log(config);
    return config;
});
//添加响应拦截器
request.interceptors.response.use((response) => {
    //成功回调
    //简化数据
    return response.data;
}, (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
            message = '未登录'
            break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
            message = '登录过期，请重新登录'
            break
        case 404:
            message = '网络请求不存在'
            break
        case 500:
            message = '服务器出现问题'
            break
        default:
            message = error.response.data.message
            break
    }
    ElMessage({
        type: 'error',
        message,
    })
    return Promise.reject(error)
})

//对外暴露请求拦截器
export default request;