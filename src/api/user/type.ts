//登录接口需要携带参数ts类型
// export interface LoginForm {
//     username: string,
//     password: string
// }
//
// interface dataType {
//     token?: string,
//     message?: string
// }
//
// //登录接口返回数据类型
// export interface loginResponseData {
//     code: number,
//     data: dataType
//
// }
//
// interface userInfo {
//     userId: number,
//     avatar: string,
//     username: string,
//     password: string,
//     desc: string,
//     roles: string[],
//     buttons: string[],
//     routes: string[],
//     token: string
// }
//
// //定义服务器返回用户相关的数据类型
// interface user {
//     checkUser: userInfo
// }
//
// export interface userResponseData {
//     code: number,
//     data: user
// }

// 登录接口需要携带参数ts类型
export interface LoginFormData {
    username?: string
    password?: string
}

export interface ResponseData {
    code?: number
    message?: string
    ok?: boolean
}

export interface LoginResponseData extends ResponseData {
    data?: string
}

export interface userInfoResponseData extends ResponseData {
    data: {
        routes: string[]
        buttons: string[]
        roles: string[]
        name: string
        avatar: string
    }
}
