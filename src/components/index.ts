import SvgIcon from "./SvgIcon/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//全局对象
const allGlobalComponent = { SvgIcon };
//对外暴露插件对象
export default {
  /**
   * 遍历 allGlobalComponent 对象的所有键（即组件名称）。
   * 使用 app.component(key, allGlobalComponent[key]) 将每个组件注册到 Vue 应用实例 app 中，使其成为全局可用的组件
   * @param app
   */
  install(app) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
