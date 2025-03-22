<template>
  <!--      顶部右侧静态-->
  <el-button size="small" :icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button size="small" :icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button size="small" :icon="Setting" circle></el-button>
  <img :src="userStore.avatar" style="width: 20px;height: 20px;margin: 0px 10px;border-radius: 50%">
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {Refresh, FullScreen, Setting} from '@element-plus/icons-vue'
import useLayoutSettingStore from "../../../store/modules/setting";
import useUserStore from "../../../store/modules/user";
import {useRoute, useRouter} from "vue-router";
import router from "../../../router";

const userStore = useUserStore();
const useLayoutStore = useLayoutSettingStore();
const updateRefresh = () => {
  useLayoutStore.refresh = !useLayoutStore.refresh;
}
const $route = useRoute();
const $router = useRouter();
//全屏点击的回调
const fullScreen = () => {
  //DOM对象的一个属性，判断现在是不是全屏模式 全屏返回true，非全屏返回false
  let full = document.fullscreenElement;
  if (!full) {
    //文档根节点的方法实现全屏模式
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
const logout = () => {
  //需要向服务器发请求
  //仓库中关于用户的数据清空
  userStore.userLogout();
  //跳转到登录页面
  $router.push({path: "/login", query: {redirect: $route.path}});
}
</script>
<script lang="ts">
export default {
  name: "TabbarRight"
}
</script>
<style scoped>

</style>