import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "@/App.vue";
//引入模版的全局样式
import "@/styles/index.scss";
const app = createApp(App);
//svg插件需要配置代码
import "virtual:svg-icons-register";
//从 ./components/index.ts 文件中导入了插件对象 globalComponent。
import globalComponent from "./components";
import axios from "axios";
import * as url from "url";
import router from "./router/index";
import pinia from "./store/index";
import "./permission";
//调用了 Vue 应用实例 app 的 use 方法，传入 globalComponent 插件对象。
//触发 globalComponent 的 install 方法，将所有定义在 allGlobalComponent 中的组件注册为全局组件
app.use(globalComponent).use(router).use(pinia);

app.use(ElementPlus).mount("#app");
