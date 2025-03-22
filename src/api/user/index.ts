/**
 * 统一管理项目用户相关的接口
 */
// import type {LoginForm, loginResponseData, userResponseData} from "./type";
//
//
// //统一管理接口
// enum API {
//     LOGIN_URL = "/user/login",
//     USERINFO_URL = "/user/info"
// }
//
// //暴露请求函数
// //登录接口方法
// export const reqLogin = (data: LoginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
// //获取用户接口方法
// export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL);

import request from "../../utils/request";
// 统一管理用户相关接口
import type {
    LoginFormData,
    LoginResponseData,
    userInfoResponseData,
} from './type'

enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqLogin = (data: LoginFormData) =>
    request.post<any, LoginResponseData>(API.LOGIN_URL, data)

export const reqUserInfo = () =>
    request.get<any, userInfoResponseData>(API.USERINFO_URL)

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)