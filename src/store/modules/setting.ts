//关于layout配置仓库
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是展开
      refresh: false, //控制刷新效果
    };
  },
});

export default useLayoutSettingStore;
