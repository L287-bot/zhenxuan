<template>
  <div class="layout_container">
    <!--左侧菜单-->
    <div
      class="layout_slider"
      :class="{ fold: useLayoutStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!--滚动组件-->
      <el-scrollbar class="scrollbar">
        <!--菜单-->
        <el-menu
          background-color="rgb(60, 63, 65)"
          text-color="white"
          active-text-color="rgb(91, 143, 249)"
          :default-active="$route.path"
          :collapse="useLayoutStore.fold ? true : false"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航-->
    <div
      class="layout_tabbar"
      :class="{ fold: useLayoutStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!--内容展示区-->
    <div
      class="layout_main"
      :class="{ fold: useLayoutStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup>
import Logo from "../../src/layout/logo/index.vue";
import Menu from "./menu/index.vue";
import useUserStore from "../store/modules/user.ts";
import Main from "./main/index.vue";
import Tabbar from "./tabbar/index.vue";
import { useRoute } from "vue-router";
import useLayoutSettingStore from "/src/store/modules/setting.ts";

const useLayoutStore = useLayoutSettingStore();
const $route = useRoute();
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    background: white;
    width: $base-menu-width;
    height: 100vh;
    background: rgb(60, 63, 65);
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-width);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: 50px;
    top: 0px;
    background-color: antiquewhite;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - 50px);
    left: $base-menu-width;
    top: 50px;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
