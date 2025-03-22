<template>
  <!--      顶部左侧静态-->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="useLayoutStore.fold?'Fold':'Expand'"></component>
  </el-icon>
  <!--      顶部左侧面包屑-->
  <el-breadcrumb :separator-icon=" ArrowRight
    ">
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="$route.path" v-show="item.meta.title"
                        :to="{ path: item.path }">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script setup lang="ts">
import {Expand, ArrowRight, Connection} from "@element-plus/icons-vue";
import useLayoutSettingStore from "../../../store/modules/setting";
import {useRoute} from "vue-router";

let $route = useRoute();
const useLayoutStore = useLayoutSettingStore();
const changeIcon = () => {
  useLayoutStore.fold = !useLayoutStore.fold;
}
</script>
<script lang="ts">
export default {
  name: "TabbarLeft"
}
</script>
<style scoped>

</style>