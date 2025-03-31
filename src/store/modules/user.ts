//创建用户相关的小仓库
import {defineStore} from "pinia";
import type {LoginFormData, loginResponseData, userInfoResponseData} from "../../api/user/type";
import {reqLogin, reqLogOut, reqUserInfo} from "../../api/user";
import type {UserState} from "./types/type";
import {GET_TOKEN, REMOVE_TOKEN, SET_TOKEN} from "../../utils/token";
import {routes} from "../../router/routes";
//创建用户小仓库
const useUserStore = defineStore("User", {
    //存储数据
    state: (): UserState => {
        return {
            token: GET_TOKEN(), //用户唯一标识
            menuRoutes: routes, //仓库存储生成菜单需要的数组,
            username: "",
            avatar: "",
        };
    },
    //异步逻辑
    actions: {
        //用户登录的方法
        async userLogin(data: LoginFormData) {
            //登录请求
            let result: loginResponseData = await reqLogin(data);
            //登录成功->token
            if (result.code == 200) {
                this.token = result.data as string;
                //token持久化
                SET_TOKEN(result.data as string);
                //保证当前async函数返回一个成功的promise
                return "ok";
            }
            //失败->错误信息
            return Promise.reject(new Error(result.data));
        },
        async userInfo() {
            //获取信息请求
            let result: userInfoResponseData = await reqUserInfo();
            //登录成功->token
            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar;
                console.log(this.avatar);
                return "ok";
            }
            //失败->错误信息
            return Promise.reject(new Error(result.message));
        },
        async userLogout() {
            let result: any = await reqLogOut();
            if (result.code == 200) {
                this.token = "";
                this.username = "";
                REMOVE_TOKEN;
                this.avatar = "";
                return "ok";
            }
            return Promise.reject(new Error(result.message));


        },
    },
    getters: {},
});

export default useUserStore;
