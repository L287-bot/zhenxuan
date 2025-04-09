//路由鉴权，某一个路由什么条件下可以访问，什么条件下不可以访问
import router from "./router/index";
import nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false });
import pinia from "./store/index";
import useUserStore from "./store/modules/user";
//获取用户小仓库相关的内部token，判断用户是否登录
import setting from "./setting";

let userStore = useUserStore(pinia);

//全局守卫:
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`;
  //to:你将要访问的那个路由
  //from:你从哪个路由而来
  //next:路由的放行函数
  nprogress.start();
  let username = userStore.username;
  let token = userStore.token;
  //已登录
  if (token) {
    //不能返回到登录页面，转到主页
    if (to.path == "login") {
      next({ path: "/home" });
    } else {
      //登录其余六个路由
      //有用户信息，放行
      if (username) {
        next();
      } else {
        //没有用户信息，使用仓库中的方法去拿
        try {
          await userStore.userInfo();
          next();
        } catch (error) {
          //获取用户信息失败
          //token国企或者用户手动修改了本地存储的token
          //退出登录
          await userStore.userLogout();
          next({ path: "/login", redirect: to.path });
        }
      }
    }
  }
  //未登录
  else {
    //去登录，放行
    if (to.path == "/login") {
      next();
    } else {
      //去往其他页面，想去哪拿到路由信息，去到登录页面
      next({
        path: "/login",
        query: {
          redirect: to.path,
        },
      });
    }
  }
  next();
});
//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done();
});
//用户未登录，只能访问登录页面
//用户登录成功，不可以返回login,其余的路由可以访问
//
